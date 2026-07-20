import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../models/order.dart';
import '../models/product.dart';
import '../theme/app_colors.dart';
import 'address_controller.dart';
import 'auth_controller.dart';
import 'cart_controller.dart';
import 'orders_controller.dart';

class CheckoutController extends GetxController {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();

  final RxString paymentMethod = 'COD'.obs;
  final RxnString lastOrderId = RxnString();

  static const List<String> paymentMethods = ['COD', 'UPI', 'Card'];

  @override
  void onInit() {
    super.onInit();
    phoneController.text = Get.find<AuthController>().phone.value;
  }

  void setPaymentMethod(String method) => paymentMethod.value = method;

  void placeOrder() {
    final address = Get.find<AddressController>().selected;
    if (address == null) {
      Get.snackbar(
        'No address selected',
        'Add a delivery address to place your order',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.error,
        colorText: AppColors.surface,
      );
      return;
    }

    final cart = Get.find<CartController>();
    final id = 'SF${DateTime.now().millisecondsSinceEpoch % 1000000}';
    final order = Order(
      id: id,
      items: cart.items.values
          .map((item) =>
              CartItem(product: item.product, qty: item.qty.value))
          .toList(),
      subtotal: cart.subtotal,
      savings: cart.savings,
      deliveryFee: cart.deliveryFee,
      total: cart.total,
      paymentMethod: paymentMethod.value,
      addressLine: '${address.label} — ${address.summary}',
      placedAt: DateTime.now(),
    );
    Get.find<OrdersController>().addOrder(order);
    lastOrderId.value = id;
    cart.clear();
    Get.offNamed('/order-success');
  }

  @override
  void onClose() {
    nameController.dispose();
    phoneController.dispose();
    super.onClose();
  }
}
