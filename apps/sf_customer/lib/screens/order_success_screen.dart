import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/checkout_controller.dart';
import '../theme/app_colors.dart';

class OrderSuccessScreen extends StatelessWidget {
  const OrderSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final checkout = Get.find<CheckoutController>();
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 96,
                height: 96,
                decoration: const BoxDecoration(
                  color: AppColors.primaryContainer,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check_circle,
                    color: AppColors.success, size: 56),
              ),
              const SizedBox(height: AppSpacing.xl),
              Text('Order placed!',
                  style: textTheme.displayMedium),
              const SizedBox(height: AppSpacing.sm),
              Obx(() => Text(
                    'Order ID: ${checkout.lastOrderId.value ?? '-'}',
                    style: textTheme.bodyMedium,
                  )),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Your groceries are on the way — arriving in 12 minutes.',
                style: textTheme.bodySmall,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.xxl),
              ElevatedButton(
                onPressed: () => Get.offAllNamed('/'),
                child: const Text('Continue shopping'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
