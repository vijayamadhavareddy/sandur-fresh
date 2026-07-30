import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../controllers/auth_controller.dart';
import '../controllers/cart_controller.dart';
import '../controllers/catalog_controller.dart';
import '../controllers/checkout_controller.dart';
import '../controllers/home_controller.dart';
import '../controllers/orders_controller.dart';
import '../services/push_service.dart';

class AppBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(AuthController());
    Get.put(CartController());
    Get.put(CatalogController());
    Get.put(HomeController());
    Get.put(CheckoutController());
    Get.put(OrdersController());
    Get.put(AddressController());
    Get.put(PushService());
  }
}
