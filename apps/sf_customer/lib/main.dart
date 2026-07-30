import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'firebase_options.dart';

import 'bindings/app_binding.dart';
import 'middlewares/auth_middleware.dart';
import 'screens/address_form_screen.dart';
import 'screens/addresses_screen.dart';
import 'screens/checkout_screen.dart';
import 'screens/home_shell.dart';
import 'screens/login_screen.dart';
import 'screens/order_success_screen.dart';
import 'screens/orders_screen.dart';
import 'screens/product_detail_screen.dart';
import 'services/push_service.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform
  );
  // Must be registered before runApp so pushes that arrive while the app is
  // terminated still reach a handler.
  FirebaseMessaging.onBackgroundMessage(firebaseMessagingBackgroundHandler);
  runApp(const SandurFreshApp());
}

class SandurFreshApp extends StatelessWidget {
  const SandurFreshApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Sandur Delivery',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      initialRoute: '/',
      initialBinding: AppBinding(),
      getPages: [
        GetPage(
          name: '/',
          page: () => const HomeShell(),
          middlewares: [AuthMiddleware()],
        ),
        GetPage(
            name: '/product/:id',
            page: () => const ProductDetailScreen()),
        GetPage(name: '/checkout', page: () => const CheckoutScreen()),
        GetPage(
            name: '/order-success',
            page: () => const OrderSuccessScreen()),
        GetPage(name: '/login', page: () => const LoginScreen()),
        GetPage(name: '/orders', page: () => const OrdersScreen()),
        GetPage(
            name: '/addresses', page: () => const AddressesScreen()),
        GetPage(
            name: '/addresses/new',
            page: () => const AddressFormScreen()),
      ],
    );
  }
}
