import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../models/order.dart';
import '../models/product.dart';
import '../providers/graphql_provider.dart';
import '../theme/app_colors.dart';
import 'address_controller.dart';
import 'auth_controller.dart';
import 'cart_controller.dart';
import 'orders_controller.dart';

class CheckoutController extends GetxController {
  final GraphQLProvider gqlProvider = Get.find<GraphQLProvider>();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();

  final RxString paymentMethod = 'COD'.obs;
  final RxnString lastOrderId = RxnString();
  final RxBool isLoading = false.obs;

  static const List<String> paymentMethods = ['COD', 'UPI', 'Card'];

  @override
  void onInit() {
    super.onInit();
    phoneController.text = Get.find<AuthController>().phone.value;
  }

  void setPaymentMethod(String method) => paymentMethod.value = method;

  Future<void> placeOrder() async {
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
    if (cart.items.isEmpty) {
      Get.snackbar(
        'Empty Cart',
        'Add items to your cart before checking out',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.error,
        colorText: AppColors.surface,
      );
      return;
    }

    isLoading.value = true;
    final idempotencyKey = 'sf-idemp-${DateTime.now().millisecondsSinceEpoch}';

    if (gqlProvider.authToken != null) {
      try {
        const doc = '''
          mutation Checkout(\$addressId: String!, \$paymentMethod: String, \$idempotencyKey: String!) {
            checkout(addressId: \$addressId, paymentMethod: \$paymentMethod, idempotencyKey: \$idempotencyKey) {
              id
              userId
              storeId
              addressId
              status
              subtotal
              deliveryFee
              discount
              total
              paymentMethod
              idempotencyKey
              placedAt
              items {
                id
                productId
                name
                unit
                unitPrice
                mrp
                quantity
              }
            }
          }
        ''';

        final res = await gqlProvider.sendQuery(doc, variables: {
          'addressId': address.id,
          'paymentMethod': paymentMethod.value,
          'idempotencyKey': idempotencyKey,
        });

        final rawOrder = res['checkout'] as Map<String, dynamic>?;
        if (rawOrder != null) {
          final createdOrder = Order.fromGraphQL(rawOrder);
          Get.find<OrdersController>().addOrder(createdOrder);
          lastOrderId.value = createdOrder.id;
          cart.clear();
          isLoading.value = false;
          Get.offNamed('/order-success');
          return;
        }
      } catch (e) {
        // Fallback below if server request fails
      }
    }

    // Local / Offline fallback order creation
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
    isLoading.value = false;
    Get.offNamed('/order-success');
  }

  @override
  void onClose() {
    nameController.dispose();
    phoneController.dispose();
    super.onClose();
  }
}
