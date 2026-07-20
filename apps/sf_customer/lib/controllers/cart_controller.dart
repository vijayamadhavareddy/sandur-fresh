import 'package:get/get.dart';

import '../models/product.dart';

class CartController extends GetxController {
  static const double freeDeliveryThreshold = 199;
  static const double deliveryFeeBelow = 25;

  final RxMap<String, CartItem> items = <String, CartItem>{}.obs;

  void add(Product product) {
    final existing = items[product.id];
    if (existing != null) {
      existing.qty.value++;
    } else {
      items[product.id] = CartItem(product: product);
    }
  }

  void remove(String productId) => items.remove(productId);

  void increment(String productId) {
    items[productId]?.qty.value++;
  }

  void decrement(String productId) {
    final item = items[productId];
    if (item == null) return;
    if (item.qty.value <= 1) {
      items.remove(productId);
    } else {
      item.qty.value--;
    }
  }

  int quantityOf(String productId) => items[productId]?.qty.value ?? 0;

  int get itemCount =>
      items.values.fold(0, (sum, item) => sum + item.qty.value);

  double get subtotal =>
      items.values.fold(0, (sum, item) => sum + item.lineTotal);

  double get savings =>
      items.values.fold(0, (sum, item) => sum + item.lineSavings);

  double get deliveryFee =>
      subtotal >= freeDeliveryThreshold || subtotal == 0 ? 0 : deliveryFeeBelow;

  double get total => subtotal + deliveryFee;

  double get amountToFreeDelivery =>
      subtotal >= freeDeliveryThreshold ? 0 : freeDeliveryThreshold - subtotal;

  void clear() => items.clear();
}
