import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../graphql/generated/catalog.graphql.dart';
import '../models/product.dart';
import '../providers/graphql_provider.dart';
import 'orders_controller.dart';

class MealSection {
  final String title;
  final String window;
  final bool isNow;
  final List<Product> items;

  const MealSection({
    required this.title,
    required this.window,
    required this.isNow,
    required this.items,
  });
}

class CatalogController extends GetxController {
  final GraphQLProvider gqlProvider = Get.find<GraphQLProvider>();

  final RxString searchQuery = ''.obs;
  final RxnString selectedCategory = RxnString();
  final TextEditingController searchController = TextEditingController();

  final RxList<Product> fetchedProducts = <Product>[].obs;
  final RxList<String> fetchedCategories = <String>[].obs;
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchCatalog();
  }

  Future<void> fetchCatalog() async {
    isLoading.value = true;
    try {
      final res = await gqlProvider.execute(
        document: documentNodeQueryGetCatalog,
        fromJson: Query$GetCatalog.fromJson,
      );

      final categoryMap = <String, String>{};
      final catNames = <String>[];

      for (final c in res.categories) {
        categoryMap[c.id] = c.name;
        if (!catNames.contains(c.name)) catNames.add(c.name);
      }

      final prodList = res.products.map((p) {
        final catName = categoryMap[p.categoryId] ?? 'General';
        final rawPrice = p.price;
        final rawMrp = p.mrp;
        final priceVal = rawPrice > 1000 ? rawPrice / 100.0 : rawPrice.toDouble();
        final mrpVal = rawMrp > 1000 ? rawMrp / 100.0 : rawMrp.toDouble();

        return Product(
          id: p.id,
          name: p.name,
          category: catName,
          price: priceVal,
          mrp: mrpVal > 0 ? mrpVal : priceVal,
          unit: p.unit,
          emoji: p.emoji ?? '🛒',
          inStock: p.isActive,
        );
      }).toList();

      fetchedProducts.assignAll(prodList);
      fetchedCategories.assignAll(catNames);
    } catch (e) {
      // Offline / error
    } finally {
      isLoading.value = false;
    }
  }

  List<Product> get products => fetchedProducts;

  List<String> get categories => fetchedCategories;

  Product? byId(String id) {
    for (final p in products) {
      if (p.id == id) return p;
    }
    return null;
  }

  List<Product> get filteredProducts {
    final query = searchQuery.value.trim().toLowerCase();
    final category = selectedCategory.value;
    return products.where((p) {
      final matchesCategory = category == null || p.category == category;
      final matchesQuery =
          query.isEmpty || p.name.toLowerCase().contains(query);
      return matchesCategory && matchesQuery;
    }).toList();
  }

  void setCategory(String? category) => selectedCategory.value = category;

  /// Recently ordered products, most recent distinct item first.
  /// Falls back to a handful of catalog picks when there's no order history.
  List<Product> get buyAgain {
    final seen = <String>{};
    final result = <Product>[];
    if (Get.isRegistered<OrdersController>()) {
      final orders = Get.find<OrdersController>();
      for (final order in orders.orders) {
        for (final item in order.items) {
          if (result.length >= 6) break;
          if (!seen.add(item.product.id)) continue;
          final match = byId(item.product.id);
          if (match != null) result.add(match);
        }
      }
    }
    if (result.isEmpty) {
      result.addAll(products.take(6));
    }
    return result.take(6).toList();
  }

  /// Discounted products, biggest discount first.
  List<Product> get dealsForYou {
    final deals = products.where((p) => p.inStock && p.hasDiscount).toList()
      ..sort((a, b) => b.discountPercent.compareTo(a.discountPercent));
    return deals.take(6).toList();
  }

  /// Produce shelf — fruits & vegetables.
  List<Product> get freshFromFarm {
    return products
        .where((p) =>
            p.category.toLowerCase().contains('fruit') ||
            p.category.toLowerCase().contains('veg'))
        .take(7)
        .toList();
  }

  List<Product> get snackPicks =>
      products.where((p) => p.category.toLowerCase().contains('snack')).take(4).toList();

  /// Time-of-day meal shelves; a section only shows if the catalog actually
  /// has matching categories.
  List<MealSection> get mealSections {
    final hour = DateTime.now().hour;
    final defs = [
      (
        title: 'Breakfast essentials',
        from: 5,
        to: 11,
        window: '5 – 11 AM',
        keywords: ['dairy', 'bakery'],
      ),
      (
        title: 'Lunch thali picks',
        from: 11,
        to: 16,
        window: '11 AM – 4 PM',
        keywords: ['staples'],
      ),
      (
        title: 'Dinner staples',
        from: 16,
        to: 23,
        window: '4 – 11 PM',
        keywords: ['staples', 'dairy'],
      ),
    ];
    return defs
        .map((d) {
          final items = products
              .where((p) => d.keywords
                  .any((k) => p.category.toLowerCase().contains(k)))
              .take(4)
              .toList();
          return MealSection(
            title: d.title,
            window: d.window,
            isNow: hour >= d.from && hour < d.to,
            items: items,
          );
        })
        .where((s) => s.items.isNotEmpty)
        .toList();
  }

  @override
  void onClose() {
    searchController.dispose();
    super.onClose();
  }
}
