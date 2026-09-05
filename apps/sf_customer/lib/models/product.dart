import 'package:get/get.dart';
import '../providers/graphql_provider.dart';

class Product {
  final String id;
  final String name;
  final String category;
  final double price;
  final double mrp;
  final String unit;
  final String emoji;
  final String? imageUrl;
  final bool inStock;
  final bool trackInventory;
  final String? storeId;
  final String? storeName;

  /// Time-bound shelf tags set in admin (e.g. ['BREAKFAST', 'LUNCH']), or empty
  /// when the product isn't tagged to any shelf.
  final List<String> timeBoundSections;

  const Product({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.mrp,
    required this.unit,
    required this.emoji,
    this.imageUrl,
    this.inStock = true,
    this.trackInventory = false,
    this.storeId,
    this.storeName,
    this.timeBoundSections = const [],
  });

  String? get resolvedImageUrl {
    final url = imageUrl?.trim();
    if (url == null || url.isEmpty) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) {
      final base = Uri.tryParse(GraphQLProvider.endpoint)?.origin ?? '';
      if (base.isNotEmpty) return '$base$url';
    }
    return url;
  }

  factory Product.fromGraphQL(Map<String, dynamic> json, {String? categoryName}) {
    final rawPrice = json['price'];
    final rawMrp = json['mrp'];
    final priceVal = rawPrice is num ? (rawPrice > 1000 ? rawPrice / 100.0 : rawPrice.toDouble()) : 0.0;
    final mrpVal = rawMrp is num ? (rawMrp > 1000 ? rawMrp / 100.0 : rawMrp.toDouble()) : priceVal;

    final rawSections = json['timeBoundSections'] ?? json['timeBoundSection'];
    final List<String> sections = rawSections is List
        ? rawSections.map((e) => e.toString()).toList()
        : (rawSections is String && rawSections.isNotEmpty ? [rawSections] : const []);

    final storeObj = json['store'];
    final storeNameVal = storeObj is Map ? (storeObj['name'] as String?) : null;
    final storeIdVal = json['storeId'] as String? ?? (storeObj is Map ? (storeObj['id'] as String?) : null);

    return Product(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      category: categoryName ?? json['category'] as String? ?? json['categoryId'] as String? ?? 'General',
      price: priceVal,
      mrp: mrpVal,
      unit: json['unit'] as String? ?? '1 unit',
      emoji: json['emoji'] as String? ?? '🛒',
      imageUrl: json['imageUrl'] as String?,
      inStock: json['isActive'] as bool? ?? json['inStock'] as bool? ?? true,
      trackInventory: json['trackInventory'] as bool? ?? false,
      storeId: storeIdVal,
      storeName: storeNameVal,
      timeBoundSections: sections,
    );
  }

  bool get hasDiscount => mrp > price;

  double get savings => hasDiscount ? mrp - price : 0;

  int get discountPercent =>
      hasDiscount && mrp > 0 ? ((mrp - price) / mrp * 100).round() : 0;
}

class CartItem {
  final String? id;
  final Product product;
  final RxInt qty;

  CartItem({this.id, required this.product, int qty = 1}) : qty = qty.obs;

  double get lineTotal => product.price * qty.value;

  double get lineSavings => product.savings * qty.value;
}
