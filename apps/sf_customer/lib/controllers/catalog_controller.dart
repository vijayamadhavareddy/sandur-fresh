import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../models/product.dart';
import '../providers/graphql_provider.dart';

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
      const doc = '''
        query GetCatalog {
          products(limit: 100) {
            id
            categoryId
            name
            description
            unit
            mrp
            price
            emoji
            imageUrl
            isActive
          }
          categories(limit: 100) {
            id
            name
            slug
            sortOrder
          }
        }
      ''';

      final res = await gqlProvider.sendQuery(doc);
      final rawCatList = res['categories'] as List<dynamic>? ?? [];
      final categoryMap = <String, String>{};
      final catNames = <String>[];

      for (final item in rawCatList) {
        final c = item as Map<String, dynamic>;
        final id = c['id'] as String;
        final name = c['name'] as String;
        categoryMap[id] = name;
        if (!catNames.contains(name)) catNames.add(name);
      }

      final rawProdList = res['products'] as List<dynamic>? ?? [];
      final prodList = rawProdList.map((item) {
        final p = item as Map<String, dynamic>;
        final catId = p['categoryId'] as String? ?? '';
        final catName = categoryMap[catId] ?? 'General';
        return Product.fromGraphQL(p, categoryName: catName);
      }).toList();

      if (prodList.isNotEmpty) {
        fetchedProducts.assignAll(prodList);
      }

      if (catNames.isNotEmpty) {
        fetchedCategories.assignAll(catNames);
      }
    } catch (e) {
      // Offline / fallback to static data
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

  @override
  void onClose() {
    searchController.dispose();
    super.onClose();
  }
}
