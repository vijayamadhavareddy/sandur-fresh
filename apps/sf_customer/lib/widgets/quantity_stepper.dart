import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/cart_controller.dart';
import '../models/product.dart';
import '../theme/app_colors.dart';

class QuantityStepper extends StatelessWidget {
  final Product product;
  final double height;

  const QuantityStepper({super.key, required this.product, this.height = 36});

  @override
  Widget build(BuildContext context) {
    final cart = Get.find<CartController>();
    final isCompact = height < 32;
    final buttonPadding = isCompact
        ? const EdgeInsets.symmetric(horizontal: 5, vertical: 3)
        : const EdgeInsets.symmetric(horizontal: 7, vertical: 6);
    final iconSize = isCompact ? 13.0 : 15.0;
    final textPadding = isCompact
        ? const EdgeInsets.symmetric(horizontal: 4)
        : const EdgeInsets.symmetric(horizontal: 6);
    final textStyle = isCompact
        ? Theme.of(context).textTheme.bodySmall?.copyWith(
              color: AppColors.primaryDark,
              fontWeight: FontWeight.w800,
              fontSize: 12,
            )
        : Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppColors.primaryDark,
              fontWeight: FontWeight.w800,
            );

    return Container(
      height: height,
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.circular(AppRadius.pill),
      ),
      child: Obx(() {
        final qty = cart.quantityOf(product.id);
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            _StepperButton(
              icon: Icons.remove,
              iconSize: iconSize,
              padding: buttonPadding,
              onTap: () => cart.decrement(product.id),
            ),
            Padding(
              padding: textPadding,
              child: Text(
                '$qty',
                style: textStyle,
              ),
            ),
            _StepperButton(
              icon: Icons.add,
              iconSize: iconSize,
              padding: buttonPadding,
              onTap: () => cart.increment(product.id),
            ),
          ],
        );
      }),
    );
  }
}

class _StepperButton extends StatelessWidget {
  final IconData icon;
  final double iconSize;
  final EdgeInsetsGeometry padding;
  final VoidCallback onTap;

  const _StepperButton({
    required this.icon,
    this.iconSize = 16,
    this.padding = const EdgeInsets.all(AppSpacing.sm),
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadius.pill),
      child: Padding(
        padding: padding,
        child: Icon(icon, size: iconSize, color: AppColors.primaryDark),
      ),
    );
  }
}
