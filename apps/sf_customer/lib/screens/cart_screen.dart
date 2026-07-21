import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/cart_controller.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';
import '../widgets/quantity_stepper.dart';

class CartScreen extends GetView<CartController> {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return SafeArea(
      child: Obx(() {
        if (controller.items.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('🛒', style: TextStyle(fontSize: 64)),
                const SizedBox(height: AppSpacing.lg),
                Text('Your cart is empty',
                    style: textTheme.headlineMedium),
                const SizedBox(height: AppSpacing.sm),
                Text('Add some fresh groceries to get started',
                    style: textTheme.bodySmall),
              ],
            ),
          );
        }

        final lineItems = controller.items.values.toList();
        return Column(
          children: [
            Expanded(
              child: ListView(
                padding: const EdgeInsets.all(AppSpacing.lg),
                children: [
                  Text('Your Cart', style: textTheme.headlineLarge),
                  const SizedBox(height: AppSpacing.lg),
                  if (controller.amountToFreeDelivery > 0)
                    Container(
                      margin: const EdgeInsets.only(
                          bottom: AppSpacing.md),
                      padding: const EdgeInsets.all(AppSpacing.md),
                      decoration: BoxDecoration(
                        color: AppColors.primaryContainer,
                        borderRadius:
                            BorderRadius.circular(AppRadius.md),
                      ),
                      child: Text(
                        'Add ${formatPrice(controller.amountToFreeDelivery)} more for FREE delivery',
                        style: textTheme.bodyMedium?.copyWith(
                          color: AppColors.primaryDark,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    )
                  else
                    Container(
                      margin: const EdgeInsets.only(
                          bottom: AppSpacing.md),
                      padding: const EdgeInsets.all(AppSpacing.md),
                      decoration: BoxDecoration(
                        color: AppColors.primaryContainer,
                        borderRadius:
                            BorderRadius.circular(AppRadius.md),
                      ),
                      child: Text(
                        '🎉 You unlocked FREE delivery',
                        style: textTheme.bodyMedium?.copyWith(
                          color: AppColors.primaryDark,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ...lineItems.map(
                    (item) => Card(
                      margin:
                          const EdgeInsets.only(bottom: AppSpacing.md),
                      child: Padding(
                        padding: const EdgeInsets.all(AppSpacing.md),
                        child: Row(
                          children: [
                            Container(
                              width: 56,
                              height: 56,
                              decoration: BoxDecoration(
                                color: AppColors.surfaceVariant,
                                borderRadius: BorderRadius.circular(
                                    AppRadius.md),
                              ),
                              alignment: Alignment.center,
                              child: Text(item.product.emoji,
                                  style:
                                      const TextStyle(fontSize: 28)),
                            ),
                            const SizedBox(width: AppSpacing.md),
                            Expanded(
                              child: Column(
                                crossAxisAlignment:
                                    CrossAxisAlignment.start,
                                children: [
                                  Text(item.product.name,
                                      style: textTheme.titleLarge,
                                      maxLines: 1,
                                      overflow:
                                          TextOverflow.ellipsis),
                                  Text(item.product.unit,
                                      style: textTheme.bodySmall),
                                  const SizedBox(
                                      height: AppSpacing.xs),
                                  Text(
                                    formatPrice(item.lineTotal),
                                    style:
                                        textTheme.titleLarge?.copyWith(
                                      fontWeight: FontWeight.w800,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            QuantityStepper(product: item.product),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(AppSpacing.lg),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Bill summary',
                              style: textTheme.titleLarge),
                          const SizedBox(height: AppSpacing.md),
                          _BillRow(
                            label: 'Subtotal',
                            value: formatPrice(controller.subtotal),
                          ),
                          _BillRow(
                            label: 'Savings',
                            value: '- ${formatPrice(controller.savings)}',
                            valueColor: AppColors.discount,
                          ),
                          _BillRow(
                            label: 'Delivery fee',
                            value: controller.deliveryFee == 0
                                ? 'FREE'
                                : formatPrice(controller.deliveryFee),
                            valueColor: controller.deliveryFee == 0
                                ? AppColors.success
                                : null,
                          ),
                          const Divider(),
                          _BillRow(
                            label: 'Total',
                            value: formatPrice(controller.total),
                            bold: true,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SafeArea(
              top: false,
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.lg),
                child: ElevatedButton(
                  onPressed: () => Get.toNamed('/checkout'),
                  child: Text(
                      'Checkout • ${formatPrice(controller.total)}'),
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}

class _BillRow extends StatelessWidget {
  final String label;
  final String value;
  final Color? valueColor;
  final bool bold;

  const _BillRow({
    required this.label,
    required this.value,
    this.valueColor,
    this.bold = false,
  });

  @override
  Widget build(BuildContext context) {
    final style = Theme.of(context).textTheme.bodyMedium?.copyWith(
          fontWeight: bold ? FontWeight.w800 : FontWeight.w500,
          color: valueColor ?? AppColors.textPrimary,
        );
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: style),
          Text(value, style: style),
        ],
      ),
    );
  }
}
