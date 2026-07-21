import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/home_controller.dart';
import '../controllers/orders_controller.dart';
import '../models/order.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';

class OrdersScreen extends GetView<OrdersController> {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(title: const Text('My Orders')),
      body: Obx(() {
        if (controller.orders.isEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.xl),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('📦', style: TextStyle(fontSize: 56)),
                  const SizedBox(height: AppSpacing.lg),
                  Text('No orders yet', style: textTheme.headlineMedium),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Your placed orders will show up here.',
                    style: textTheme.bodySmall,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  ElevatedButton(
                    onPressed: () {
                      Get.find<HomeController>().setTab(0);
                      Get.offAllNamed('/');
                    },
                    child: const Text('Start shopping'),
                  ),
                ],
              ),
            ),
          );
        }

        return ListView.separated(
          padding: const EdgeInsets.all(AppSpacing.lg),
          itemCount: controller.orders.length,
          separatorBuilder: (_, _) => const SizedBox(height: AppSpacing.md),
          itemBuilder: (context, index) {
            final order = controller.orders[index];
            return _OrderCard(order: order);
          },
        );
      }),
    );
  }
}

class _OrderCard extends StatelessWidget {
  final Order order;

  const _OrderCard({required this.order});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final isOnTheWay = order.status == OrderStatus.onTheWay;

    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadius.lg),
        onTap: () => _showOrderDetails(context, order),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(order.id, style: textTheme.titleLarge),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.md,
                        vertical: AppSpacing.xs),
                    decoration: BoxDecoration(
                      color: isOnTheWay
                          ? AppColors.secondaryContainer
                          : AppColors.primaryContainer,
                      borderRadius:
                          BorderRadius.circular(AppRadius.pill),
                    ),
                    child: Text(
                      order.status.label,
                      style: textTheme.bodySmall?.copyWith(
                        color: isOnTheWay
                            ? AppColors.secondary
                            : AppColors.success,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(_formatDate(order.placedAt), style: textTheme.bodySmall),
              const SizedBox(height: AppSpacing.md),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${order.itemCount} item${order.itemCount == 1 ? '' : 's'} • ${formatPrice(order.total)}',
                    style: textTheme.bodyMedium
                        ?.copyWith(fontWeight: FontWeight.w600),
                  ),
                  Text(
                    order.items.map((e) => e.product.emoji).join(' '),
                    style: const TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static String _formatDate(DateTime date) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    final hour = date.hour % 12 == 0 ? 12 : date.hour % 12;
    final minute = date.minute.toString().padLeft(2, '0');
    final period = date.hour < 12 ? 'AM' : 'PM';
    return '${date.day} ${months[date.month - 1]} ${date.year}, $hour:$minute $period';
  }

  void _showOrderDetails(BuildContext context, Order order) {
    final textTheme = Theme.of(context).textTheme;
    Get.bottomSheet(
      Container(
        decoration: const BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.vertical(
              top: Radius.circular(AppRadius.xl)),
        ),
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(order.id, style: textTheme.headlineMedium),
              const SizedBox(height: AppSpacing.md),
              ...order.items.map((item) => Padding(
                    padding: const EdgeInsets.symmetric(
                        vertical: AppSpacing.xs),
                    child: Row(
                      children: [
                        Text(item.product.emoji,
                            style: const TextStyle(fontSize: 20)),
                        const SizedBox(width: AppSpacing.sm),
                        Expanded(
                          child: Text(
                            '${item.product.name} × ${item.qty.value}',
                            style: textTheme.bodyMedium,
                          ),
                        ),
                        Text(formatPrice(item.lineTotal),
                            style: textTheme.bodyMedium),
                      ],
                    ),
                  )),
              const Divider(height: AppSpacing.xl),
              _billRow(textTheme, 'Subtotal', formatPrice(order.subtotal)),
              if (order.savings > 0)
                _billRow(textTheme, 'Savings',
                    '-${formatPrice(order.savings)}',
                    color: AppColors.success),
              _billRow(
                  textTheme, 'Delivery fee',
                  order.deliveryFee == 0
                      ? 'FREE'
                      : formatPrice(order.deliveryFee)),
              const Divider(height: AppSpacing.xl),
              _billRow(textTheme, 'Total', formatPrice(order.total),
                  bold: true),
              const SizedBox(height: AppSpacing.sm),
              Text('Paid via ${order.paymentMethod}',
                  style: textTheme.bodySmall),
              Text(order.addressLine, style: textTheme.bodySmall),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _billRow(TextTheme textTheme, String label, String value,
      {bool bold = false, Color? color}) {
    final style = (bold ? textTheme.titleLarge : textTheme.bodyMedium)
        ?.copyWith(color: color);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [Text(label, style: style), Text(value, style: style)],
      ),
    );
  }
}
