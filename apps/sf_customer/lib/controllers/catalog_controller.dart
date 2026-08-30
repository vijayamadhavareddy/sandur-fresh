import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../graphql/generated/catalog.graphql.dart';
import '../models/product.dart';
import '../providers/graphql_provider.dart';
import 'orders_controller.dart';

/// A curated shelf that surfaces at a given time of day. The definitions
/// (title, window, whether it is live now) come from the API; membership is
/// driven by each product's `timeBoundSection` tag set in admin.
class TimeBoundSection {
  final String id;
  final String title;
  final String window;
  final bool isNow;
  final List<Product> items;

  const TimeBoundSection({
    required this.id,
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
  final RxList<TimeBoundSection> fetchedSections = <TimeBoundSection>[].obs;
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    debugPrint('dgdfgdf');
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
          timeBoundSections: (p.timeBoundSections as List?)?.map((e) => e.toString()).toList() ?? const [],
        );
      }).toList();

      final sectionDefs = res.timeBoundSections
          .map((s) => TimeBoundSection(
                id: s.id.name,
                title: s.title,
                window: s.window,
                isNow: s.isNow,
                items: const [],
              ))
          .toList();

      fetchedProducts.assignAll(prodList);
      fetchedCategories.assignAll(catNames);
      fetchedSections.assignAll(sectionDefs);
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

  /// Time-bound shelves, built from each product's admin-assigned tags.
  /// A section only renders when at least one product is tagged to it.
  List<TimeBoundSection> get timeBoundSections {
    return fetchedSections
        .map((section) {
          final items = products
              .where((p) => p.inStock && p.timeBoundSections.contains(section.id))
              .take(6)
              .toList();
          return TimeBoundSection(
            id: section.id,
            title: section.title,
            window: section.window,
            isNow: section.isNow,
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
