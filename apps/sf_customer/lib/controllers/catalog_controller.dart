import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../data/catalog.dart';
import '../models/product.dart';

class CatalogController extends GetxController {
  final RxString searchQuery = ''.obs;
  final RxnString selectedCategory = RxnString();
  final TextEditingController searchController = TextEditingController();

  List<Product> get products => kCatalog;

  List<String> get categories => kCategories;

  Product? byId(String id) {
    for (final p in kCatalog) {
      if (p.id == id) return p;
    }
    return null;
  }

  List<Product> get filteredProducts {
    final query = searchQuery.value.trim().toLowerCase();
    final category = selectedCategory.value;
    return kCatalog.where((p) {
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
