import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/cart_controller.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';

/// The floating "N items · ₹total — View cart" bar that sits above the
/// bottom nav bar whenever the cart has items and the user isn't already
/// on the cart tab.
class CartSummaryBar extends StatelessWidget {
  final VoidCallback onViewCart;

  const CartSummaryBar({super.key, required this.onViewCart});

  @override
  Widget build(BuildContext context) {
    final cart = Get.find<CartController>();
    final textTheme = Theme.of(context).textTheme;

    return Obx(() {
      final count = cart.itemCount;
      if (count == 0) return const SizedBox.shrink();

      final toFree = cart.amountToFreeDelivery;
      final pct = (cart.subtotal / CartController.freeDeliveryThreshold * 100)
          .clamp(0, 100)
          .toDouble();

      return Padding(
        padding: const EdgeInsets.fromLTRB(
            AppSpacing.md, AppSpacing.sm, AppSpacing.md, AppSpacing.sm),
        child: Container(
          padding:
              const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          decoration: BoxDecoration(
            color: AppColors.primary,
            borderRadius: BorderRadius.circular(AppRadius.lg),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '$count ${count == 1 ? 'item' : 'items'} · '
                      '${formatPrice(cart.subtotal)}',
                      style: textTheme.bodyMedium?.copyWith(
                        color: AppColors.primaryDark,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 6),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(AppRadius.pill),
                      child: LinearProgressIndicator(
                        value: pct / 100,
                        minHeight: 4,
                        backgroundColor: Colors.black.withValues(alpha: 0.15),
                        valueColor: const AlwaysStoppedAnimation(
                            AppColors.primaryDark),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      toFree <= 0
                          ? 'Free delivery unlocked 🎉'
                          : '${formatPrice(toFree)} away from free delivery',
                      style: textTheme.bodySmall?.copyWith(
                        color: AppColors.primaryDark,
                        fontWeight: FontWeight.w700,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              InkWell(
                onTap: onViewCart,
                borderRadius: BorderRadius.circular(AppRadius.pill),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.lg, vertical: 12),
                  decoration: const BoxDecoration(
                    color: AppColors.primaryDark,
                    borderRadius:
                        BorderRadius.all(Radius.circular(AppRadius.pill)),
                  ),
                  child: Text(
                    'View cart',
                    style: textTheme.bodyMedium?.copyWith(
                      color: AppColors.primary,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    });
  }
}
