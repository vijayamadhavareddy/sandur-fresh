import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../controllers/auth_controller.dart';

class AuthMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    final auth = Get.find<AuthController>();
    if (!auth.isLoggedIn.value) {
      return const RouteSettings(name: '/login');
    }
    if (Get.isRegistered<AddressController>()) {
      final addresses = Get.find<AddressController>();
      if (addresses.addresses.isEmpty) {
        addresses.beginAdd();
        return const RouteSettings(
          name: '/addresses/new',
          arguments: {'fromLogin': true},
        );
      }
    }
    return null;
  }
}
