import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../controllers/cart_controller.dart';
import '../controllers/checkout_controller.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';

class CheckoutScreen extends StatelessWidget {
  const CheckoutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final checkout = Get.find<CheckoutController>();
    final cart = Get.find<CartController>();
    final addresses = Get.find<AddressController>();
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(title: const Text('Checkout')),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          Text('Delivery address', style: textTheme.titleLarge),
          const SizedBox(height: AppSpacing.md),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Obx(() {
                final selected = addresses.selected;
                if (selected == null) {
                  return Row(
                    children: [
                      const Icon(Icons.location_off_outlined,
                          color: AppColors.error),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: Text('No address selected',
                            style: textTheme.bodyMedium),
                      ),
                      TextButton(
                        onPressed: () => Get.toNamed('/addresses'),
                        child: const Text('Add'),
                      ),
                    ],
                  );
                }
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.location_on_outlined,
                        color: AppColors.primaryDark),
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(selected.label,
                              style: textTheme.titleLarge),
                          const SizedBox(height: AppSpacing.xs),
                          Text(selected.summary,
                              style: textTheme.bodySmall),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () => Get.toNamed('/addresses'),
                      child: const Text('Change'),
                    ),
                  ],
                );
              }),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
          Text('Contact details', style: textTheme.titleLarge),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: checkout.nameController,
            decoration: const InputDecoration(
              labelText: 'Full name (optional)',
              prefixIcon: Icon(Icons.person_outline),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: checkout.phoneController,
            readOnly: true,
            decoration: const InputDecoration(
              labelText: 'Phone number',
              prefixIcon: Icon(Icons.phone_outlined),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
          Text('Payment method', style: textTheme.titleLarge),
          const SizedBox(height: AppSpacing.sm),
          Card(
            child: Obx(() => RadioGroup<String>(
                  groupValue: checkout.paymentMethod.value,
                  onChanged: (v) {
                    if (v != null) checkout.setPaymentMethod(v);
                  },
                  child: Column(
                    children:
                        CheckoutController.paymentMethods.map((m) {
                      final labels = {
                        'COD': 'Cash on delivery',
                        'UPI': 'UPI',
                        'Card': 'Credit / Debit card',
                      };
                      return RadioListTile<String>(
                        value: m,
                        activeColor: AppColors.primaryDark,
                        title: Text(labels[m] ?? m,
                            style: textTheme.bodyMedium),
                      );
                    }).toList(),
                  ),
                )),
          ),
          const SizedBox(height: AppSpacing.xl),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Obx(() => ElevatedButton(
                onPressed: cart.items.isEmpty
                    ? null
                    : () => checkout.placeOrder(),
                child:
                    Text('Place Order • ${formatPrice(cart.total)}'),
              )),
        ),
      ),
    );
  }
}
