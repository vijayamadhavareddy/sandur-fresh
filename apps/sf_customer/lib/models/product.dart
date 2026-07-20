import 'package:get/get.dart';

class Product {
  final String id;
  final String name;
  final String category;
  final double price;
  final double mrp;
  final String unit;
  final String emoji;
  final bool inStock;

  const Product({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.mrp,
    required this.unit,
    required this.emoji,
    this.inStock = true,
  });

  bool get hasDiscount => mrp > price;

  double get savings => hasDiscount ? mrp - price : 0;

  int get discountPercent =>
      hasDiscount ? ((mrp - price) / mrp * 100).round() : 0;
}

class CartItem {
  final Product product;
  final RxInt qty;

  CartItem({required this.product, int qty = 1}) : qty = qty.obs;

  double get lineTotal => product.price * qty.value;

  double get lineSavings => product.savings * qty.value;
}
