import 'dart:async';
import 'dart:convert';
import 'dart:io' show Platform;

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart' show debugPrint, kIsWeb;
import 'package:get/get.dart';

import '../controllers/orders_controller.dart';
import '../providers/graphql_provider.dart';

/// REST base URL, derived from the GraphQL endpoint so both follow the same
/// host rules (notably 10.0.2.2 for the Android emulator).
String get _apiBase => GraphQLProvider.endpoint.replaceAll(RegExp(r'/graphql/?$'), '');

/// Handles background messages. Must be a top-level function: the Flutter
/// engine spins up a fresh isolate for these, so anything captured from the
/// app's normal scope is unavailable here.
@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  debugPrint('[push] background message: ${message.data}');
}

/// FCM registration and inbound message handling for the customer app.
///
/// The Dart SDK only exposes legacy registration tokens (there is no FID API in
/// firebase_messaging), so the API stores these with kind "TOKEN". The admin
/// web console registers FIDs instead — the backend accepts both.
class PushService extends GetxService {
  /// Plain REST client for the v1 endpoints (the app's other calls are GraphQL).
  final GetConnect _http = GetConnect(timeout: const Duration(seconds: 10));

  final RxnString token = RxnString();
  final RxBool enabled = false.obs;

  StreamSubscription<String>? _refreshSub;
  StreamSubscription<RemoteMessage>? _messageSub;
  StreamSubscription<RemoteMessage>? _openedSub;

  /// Ask for permission and register this device. Call once the user is signed
  /// in — the API needs an authenticated request to attach the token to them.
  Future<void> start() async {
    try {
      final messaging = FirebaseMessaging.instance;

      final settings = await messaging.requestPermission();
      enabled.value =
          settings.authorizationStatus == AuthorizationStatus.authorized ||
          settings.authorizationStatus == AuthorizationStatus.provisional;
      if (!enabled.value) return;

      // iOS delivers nothing until APNs has handed over a token.
      if (!kIsWeb && Platform.isIOS) {
        await messaging.getAPNSToken();
      }

      final value = await messaging.getToken();
      if (value != null) {
        token.value = value;
        await _register(value);
      }

      // Tokens rotate; re-register so we never push to a dead one.
      _refreshSub = messaging.onTokenRefresh.listen((next) {
        token.value = next;
        _register(next);
      });

      _messageSub = FirebaseMessaging.onMessage.listen(_handleMessage);
      _openedSub = FirebaseMessaging.onMessageOpenedApp.listen(_handleOpened);
    } catch (e) {
      debugPrint('[push] start failed: $e');
    }
  }

  /// Drop this device's registration, so a signed-out phone stops receiving
  /// another user's order updates.
  Future<void> stop() async {
    final value = token.value;
    _refreshSub?.cancel();
    _messageSub?.cancel();
    _openedSub?.cancel();
    _refreshSub = _messageSub = null;
    _openedSub = null;
    if (value == null) return;
    try {
      await _http.delete('$_apiBase/api/v1/me/devices/$value', headers: _headers());
    } catch (e) {
      debugPrint('[push] unregister failed: $e');
    }
    token.value = null;
  }

  Map<String, String> _headers() {
    final auth = Get.find<GraphQLProvider>().authToken;
    return {
      'content-type': 'application/json',
      if (auth != null) 'authorization': 'Bearer $auth',
    };
  }

  Future<void> _register(String value) async {
    try {
      final response = await _http.post(
        '$_apiBase/api/v1/me/devices',
        jsonEncode({
          'target': value,
          'kind': 'TOKEN',
          'platform': kIsWeb
              ? 'web'
              : Platform.isIOS
                  ? 'ios'
                  : 'android',
        }),
        headers: _headers(),
      );
      if ((response.statusCode ?? 0) >= 400) {
        debugPrint('[push] register rejected: ${response.statusCode} ${response.body}');
      }
    } catch (e) {
      debugPrint('[push] register failed: $e');
    }
  }

  /// Foreground message: refresh whatever it referred to so the UI is current.
  void _handleMessage(RemoteMessage message) {
    debugPrint('[push] foreground message: ${message.data}');
    _refreshFor(message.data);
  }

  /// The user tapped the notification — refresh, then jump to the order.
  void _handleOpened(RemoteMessage message) {
    _refreshFor(message.data);
    final orderId = message.data['orderId'];
    if (orderId is String && orderId.isNotEmpty) {
      Get.toNamed('/orders');
    }
  }

  void _refreshFor(Map<String, dynamic> data) {
    if (data['type'] != 'ORDER_STATUS') return;
    if (Get.isRegistered<OrdersController>()) {
      Get.find<OrdersController>().fetchOrders();
    }
  }

  @override
  void onClose() {
    _refreshSub?.cancel();
    _messageSub?.cancel();
    _openedSub?.cancel();
    super.onClose();
  }
}
