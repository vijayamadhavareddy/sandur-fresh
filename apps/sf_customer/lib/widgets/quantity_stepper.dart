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
              onTap: () => cart.decrement(product.id),
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: AppSpacing.sm),
              child: Text(
                '$qty',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.primaryDark,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ),
            _StepperButton(
              icon: Icons.add,
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
  final VoidCallback onTap;

  const _StepperButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadius.pill),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.sm),
        child: Icon(icon, size: 16, color: AppColors.primaryDark),
      ),
    );
  }
}
