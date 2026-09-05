import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/catalog_controller.dart';
import '../theme/app_colors.dart';
import '../widgets/product_card.dart';

class CategoriesScreen extends GetView<CatalogController> {
  const CategoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Text('Categories',
                style: Theme.of(context).textTheme.headlineLarge),
          ),
          SizedBox(
            height: 40,
            child: Obx(() {
              final selected = controller.selectedCategory.value;
              final labels = [null, ...controller.categories];
              return ListView.separated(
                scrollDirection: Axis.horizontal,
                padding:
                    const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                itemCount: labels.length,
                separatorBuilder: (_, _) =>
                    const SizedBox(width: AppSpacing.sm),
                itemBuilder: (context, i) {
                  final cat = labels[i];
                  final isSelected = selected == cat;
                  return InkWell(
                    onTap: () => controller.setCategory(cat),
                    borderRadius: BorderRadius.circular(AppRadius.pill),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.lg,
                        vertical: AppSpacing.sm,
                      ),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppColors.primary
                            : AppColors.surface,
                        borderRadius:
                            BorderRadius.circular(AppRadius.pill),
                        border: Border.all(
                          color: isSelected
                              ? AppColors.primary
                              : AppColors.border,
                        ),
                      ),
                      child: Text(
                        cat ?? 'All',
                        style: Theme.of(context)
                            .textTheme
                            .bodyMedium
                            ?.copyWith(
                              color: isSelected
                                  ? AppColors.primaryDark
                                  : AppColors.textPrimary,
                              fontWeight: isSelected
                                  ? FontWeight.w700
                                  : FontWeight.w500,
                            ),
                      ),
                    ),
                  );
                },
              );
            }),
          ),
          const SizedBox(height: AppSpacing.lg),
          Expanded(
            child: Obx(() {
              final products = controller.filteredProducts;
              if (products.isEmpty) {
                return Center(
                  child: Text('No products found',
                      style: Theme.of(context).textTheme.bodyMedium),
                );
              }
              return GridView.builder(
                padding:
                    const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                gridDelegate:
                    const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: AppSpacing.md,
                  crossAxisSpacing: AppSpacing.md,
                  childAspectRatio: 0.58,
                ),
                itemCount: products.length,
                itemBuilder: (context, i) =>
                    ProductCard(product: products[i]),
              );
            }),
          ),
        ],
      ),
    );
  }
}
