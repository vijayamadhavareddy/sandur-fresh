import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/cart_controller.dart';
import '../models/product.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';
import 'quantity_stepper.dart';

class ProductCard extends StatelessWidget {
  final Product product;

  const ProductCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final cart = Get.find<CartController>();
    final textTheme = Theme.of(context).textTheme;

    return Card(
      child: InkWell(
        onTap: () => Get.toNamed('/product/${product.id}'),
        borderRadius: BorderRadius.circular(AppRadius.lg),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.sm + 2),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Image
              Stack(
                children: [
                  Container(
                    height: 100,
                    width: double.infinity,
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
                              style: const TextStyle(fontSize: 38),
                            ),
                          )
                        : Text(
                            product.emoji,
                            style: const TextStyle(fontSize: 38),
                          ),
                  ),
                  if (product.hasDiscount)
                    Positioned(
                      top: 4,
                      left: 4,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: AppSpacing.sm,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: AppColors.discount,
                          borderRadius:
                              BorderRadius.circular(AppRadius.sm),
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
              const SizedBox(height: 4),
              // Text block: sized to its content, not stretched to fill.
              Text(
                product.unit,
                style: textTheme.bodySmall?.copyWith(fontSize: 11),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 2),
              // Fixed to a 2-line height so 1-line names don't leave a
              // bigger leftover gap below the card than 2-line names do.
              SizedBox(
                height: 32,
                child: Text(
                  product.name,
                  style: textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w700,
                        fontSize: 13.5,
                        height: 1.15,
                      ) ??
                      textTheme.titleLarge,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              // Always reserved (blank when there's no store) so every card
              // in a grid row keeps the same height, whether or not it has
              // a store subtitle.
              SizedBox(
                height: 15,
                child: (product.storeName != null && product.storeName!.isNotEmpty)
                    ? Text(
                        'by ${product.storeName}',
                        style: textTheme.bodySmall?.copyWith(
                          fontSize: 10,
                          color: AppColors.textSecondary,
                          fontWeight: FontWeight.w500,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      )
                    : null,
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
                          ),
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
                            return QuantityStepper(
                              product: product,
                              height: 30,
                            );
                          }
                          return InkWell(
                            onTap: () {
                              cart.add(product);
                            },
                            borderRadius:
                                BorderRadius.circular(AppRadius.pill),
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: AppSpacing.md,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: AppColors.primary,
                                borderRadius:
                                    BorderRadius.circular(AppRadius.pill),
                              ),
                              child: Text(
                                'ADD',
                                style: textTheme.bodySmall?.copyWith(
                                  color: AppColors.primaryDark,
                                  fontWeight: FontWeight.w800,
                                  fontSize: 12,
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
      ),
    );
  }
}
