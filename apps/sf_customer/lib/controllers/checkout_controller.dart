import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../graphql/generated/orders.graphql.dart';
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

    try {
      final res = await gqlProvider.execute(
        document: documentNodeMutationCheckout,
        fromJson: Mutation$Checkout.fromJson,
        variables: Variables$Mutation$Checkout(
          addressId: address.id,
          paymentMethod: paymentMethod.value,
          idempotencyKey: idempotencyKey,
        ).toJson(),
      );

      final rawOrder = res.checkout;
      final subtotalVal = rawOrder.subtotal / 100.0;
      final deliveryFeeVal = rawOrder.deliveryFee / 100.0;
      final totalVal = rawOrder.total / 100.0;
      final discountVal = rawOrder.discount / 100.0;

      final itemsList = rawOrder.items.map((itemJson) {
        final unitPriceVal = itemJson.unitPrice / 100.0;
        final mrpVal = itemJson.mrp / 100.0;
        final qty = itemJson.quantity;

        final prod = Product(
          id: itemJson.productId,
          name: itemJson.name,
          category: 'General',
          price: unitPriceVal,
          mrp: mrpVal > 0 ? mrpVal : unitPriceVal,
          unit: itemJson.unit,
          emoji: '📦',
        );

        return CartItem(id: itemJson.id, product: prod, qty: qty);
      }).toList();

      final parsedDate = DateTime.tryParse(rawOrder.placedAt) ?? DateTime.now();

      final createdOrder = Order(
        id: rawOrder.id,
        items: itemsList,
        subtotal: subtotalVal,
        savings: discountVal,
        deliveryFee: deliveryFeeVal,
        total: totalVal,
        paymentMethod: rawOrder.paymentMethod,
        addressLine: rawOrder.addressId,
        placedAt: parsedDate,
        rawStatus: rawOrder.status,
      );

      Get.find<OrdersController>().addOrder(createdOrder);
      lastOrderId.value = createdOrder.id;
      cart.clear();
      isLoading.value = false;
      Get.offNamed('/order-success');
    } catch (e) {
      isLoading.value = false;
      Get.snackbar(
        'Checkout failed',
        e.toString().replaceAll('GraphQLException: ', ''),
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.error,
        colorText: AppColors.surface,
      );
    }
  }

  @override
  void onClose() {
    nameController.dispose();
    phoneController.dispose();
    super.onClose();
  }
}
