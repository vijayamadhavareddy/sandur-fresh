import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/cart_controller.dart';
import '../models/product.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';
import 'quantity_stepper.dart';

/// A tile in the "Fresh off the farm" shelf — like [ProductCard] but with a
/// "Sandur farms" origin badge over the image.
class VeggieBentoCard extends StatelessWidget {
  final Product product;

  const VeggieBentoCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final cart = Get.find<CartController>();
    final textTheme = Theme.of(context).textTheme;

    return Container(
      width: 158,
      padding: const EdgeInsets.all(AppSpacing.sm + 2),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border.all(color: AppColors.border, width: 0.8),
        borderRadius: BorderRadius.circular(AppRadius.lg),
      ),
      child: InkWell(
        onTap: () => Get.toNamed('/product/${product.id}'),
        borderRadius: BorderRadius.circular(AppRadius.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                Container(
                  width: double.infinity,
                  height: 100,
                  decoration: BoxDecoration(
                    color: AppColors.surfaceVariant,
                    borderRadius: BorderRadius.circular(AppRadius.md),
                  ),
                  clipBehavior: Clip.antiAlias,
                  alignment: Alignment.center,
                  child: product.resolvedImageUrl != null
                      ? Image.network(
                          product.resolvedImageUrl!,
                          fit: BoxFit.cover,
                          width: double.infinity,
                          height: double.infinity,
                          errorBuilder: (context, error, stackTrace) => Text(
                            product.emoji,
                            style: const TextStyle(fontSize: 40),
                          ),
                        )
                      : Text(product.emoji, style: const TextStyle(fontSize: 40)),
                ),
                Positioned(
                  top: 6,
                  left: 6,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.sm,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.primaryDark,
                      borderRadius: BorderRadius.circular(AppRadius.pill),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.location_on,
                            size: 11, color: AppColors.primary),
                        const SizedBox(width: 3),
                        Text(
                          'Sandur farms',
                          style: textTheme.bodySmall?.copyWith(
                            color: AppColors.primary,
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                if (product.hasDiscount)
                  Positioned(
                    top: 6,
                    right: 6,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.sm,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.discount,
                        borderRadius: BorderRadius.circular(AppRadius.sm),
                      ),
                      child: Text(
                        '${product.discountPercent}% OFF',
                        style: textTheme.bodySmall?.copyWith(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 6),
            // Dynamic middle area: under image and above bottom row
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Flexible(
                    flex: 2,
                    child: Text(
                      product.name,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w700,
                            fontSize: 13.5,
                            height: 1.15,
                          ) ??
                          textTheme.titleLarge,
                    ),
                  ),
                  if (product.storeName != null && product.storeName!.isNotEmpty) ...[
                    const SizedBox(height: 1),
                    Flexible(
                      child: Text(
                        'by ${product.storeName}',
                        style: textTheme.bodySmall?.copyWith(
                          fontSize: 10,
                          color: AppColors.textSecondary,
                          fontWeight: FontWeight.w500,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                  const SizedBox(height: 2),
                  Flexible(
                    child: Text(
                      product.unit,
                      style: textTheme.bodySmall?.copyWith(fontSize: 11),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 4),
            // Bottom Action Row: Price on left, ADD / Stepper on right
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        formatPrice(product.price),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w800,
                              fontSize: 14.5,
                            ) ??
                            textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                      ),
                      if (product.hasDiscount)
                        Text(
                          formatPrice(product.mrp),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: textTheme.bodySmall?.copyWith(
                            decoration: TextDecoration.lineThrough,
                            fontSize: 11,
                            color: AppColors.textSecondary,
                          ),
                        ),
                    ],
                  ),
                ),
                const SizedBox(width: 4),
                !product.inStock
                    ? Center(
                        child: Text(
                          'Out of stock',
                          style: textTheme.bodySmall?.copyWith(
                            color: AppColors.error,
                            fontWeight: FontWeight.w700,
                            fontSize: 11,
                          ),
                        ),
                      )
                    : Obx(() {
                        final qty = cart.quantityOf(product.id);
                        if (qty > 0) {
                          return QuantityStepper(product: product, height: 28);
                        }
                        return InkWell(
                          onTap: () => cart.add(product),
                          borderRadius: BorderRadius.circular(AppRadius.pill),
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: AppSpacing.sm + 2,
                              vertical: 5,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.primary,
                              borderRadius: BorderRadius.circular(AppRadius.pill),
                            ),
                            child: Text(
                              'ADD',
                              style: textTheme.bodySmall?.copyWith(
                                color: AppColors.primaryDark,
                                fontWeight: FontWeight.w800,
                                fontSize: 11,
                              ),
                            ),
                          ),
                        );
                      }),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
