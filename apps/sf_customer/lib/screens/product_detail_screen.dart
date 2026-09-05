import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/cart_controller.dart';
import '../controllers/catalog_controller.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';
import '../widgets/delivery_badge.dart';
import '../widgets/quantity_stepper.dart';

class ProductDetailScreen extends StatelessWidget {
  const ProductDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final id = Get.parameters['id'] ?? '';
    final product = Get.find<CatalogController>().byId(id);
    final cart = Get.find<CartController>();
    final textTheme = Theme.of(context).textTheme;

    if (product == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Product')),
        body: const Center(child: Text('Product not found')),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(product.category),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 240,
              width: double.infinity,
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(AppRadius.xl),
                border: Border.all(color: AppColors.border, width: 0.8),
              ),
              clipBehavior: Clip.antiAlias,
              alignment: Alignment.center,
              child: product.resolvedImageUrl != null
                  ? Image.network(
                      product.resolvedImageUrl!,
                      fit: BoxFit.contain,
                      width: double.infinity,
                      height: double.infinity,
                      errorBuilder: (context, error, stackTrace) => Text(
                        product.emoji,
                        style: const TextStyle(fontSize: 120),
                      ),
                    )
                  : Text(product.emoji, style: const TextStyle(fontSize: 120)),
            ),
            const SizedBox(height: AppSpacing.lg),
            Text(product.name, style: textTheme.headlineLarge),
            if (product.storeName != null && product.storeName!.isNotEmpty) ...[
              const SizedBox(height: AppSpacing.xs),
              Text(
                'Sold by ${product.storeName}',
                style: textTheme.bodyMedium?.copyWith(
                  color: AppColors.primaryDark,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
            const SizedBox(height: AppSpacing.xs),
            Text(product.unit, style: textTheme.bodySmall),
            const SizedBox(height: AppSpacing.md),
            Row(
              crossAxisAlignment: CrossAxisAlignment.baseline,
              textBaseline: TextBaseline.alphabetic,
              children: [
                Text(
                  formatPrice(product.price),
                  style: textTheme.displayMedium,
                ),
                if (product.hasDiscount) ...[
                  const SizedBox(width: AppSpacing.sm),
                  Text(
                    formatPrice(product.mrp),
                    style: textTheme.bodyLarge?.copyWith(
                      color: AppColors.textSecondary,
                      decoration: TextDecoration.lineThrough,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Text(
                    'Save ${formatPrice(product.savings)}',
                    style: textTheme.bodyMedium?.copyWith(
                      color: AppColors.discount,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ],
            ),
            const SizedBox(height: AppSpacing.md),
            Row(
              children: [
                Icon(
                  product.inStock
                      ? Icons.check_circle
                      : Icons.cancel,
                  size: 16,
                  color: product.inStock
                      ? AppColors.success
                      : AppColors.error,
                ),
                const SizedBox(width: AppSpacing.xs),
                Text(
                  product.inStock ? 'In stock' : 'Out of stock',
                  style: textTheme.bodyMedium?.copyWith(
                    color: product.inStock
                        ? AppColors.success
                        : AppColors.error,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.lg),
            const Divider(),
            const SizedBox(height: AppSpacing.md),
            Text('About this item', style: textTheme.titleLarge),
            const SizedBox(height: AppSpacing.sm),
            Text(
              '${product.name} (${product.unit}) — handpicked for quality and delivered fresh to your doorstep. '
              'Store in a cool, dry place. Part of our ${product.category} range at Sandur Fresh.',
              style: textTheme.bodyMedium
                  ?.copyWith(color: AppColors.textSecondary),
            ),
            const SizedBox(height: AppSpacing.lg),
            const DeliveryBadge(),
            const SizedBox(height: AppSpacing.xxl),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: !product.inStock
              ? ElevatedButton(
                  onPressed: null,
                  child: const Text('Out of stock'),
                )
              : Obx(() {
                  final qty = cart.quantityOf(product.id);
                  if (qty > 0) {
                    return Row(
                      children: [
                        QuantityStepper(product: product, height: 44),
                        const Spacer(),
                        Text(
                          formatPrice(product.price * qty),
                          style: textTheme.headlineMedium,
                        ),
                      ],
                    );
                  }
                  return ElevatedButton(
                    onPressed: () {
                      cart.add(product);
                    },
                    child: const Text('Add to cart'),
                  );
                }),
        ),
      ),
    );
  }
}
