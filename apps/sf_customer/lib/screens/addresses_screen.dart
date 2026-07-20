import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../theme/app_colors.dart';

class AddressesScreen extends StatelessWidget {
  const AddressesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final addresses = Get.find<AddressController>();
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(title: const Text('My Addresses')),
      body: Obx(() {
        if (addresses.addresses.isEmpty) {
          return Center(
            child: Text('No saved addresses yet',
                style: textTheme.bodyMedium),
          );
        }
        return ListView.separated(
          padding: const EdgeInsets.all(AppSpacing.lg),
          itemCount: addresses.addresses.length,
          separatorBuilder: (_, _) => const SizedBox(height: AppSpacing.md),
          itemBuilder: (context, index) {
            final address = addresses.addresses[index];
            final isSelected = addresses.selectedId.value == address.id;
            return Card(
              child: InkWell(
                borderRadius: BorderRadius.circular(AppRadius.lg),
                onTap: () => addresses.select(address.id),
                child: Padding(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: AppSpacing.md,
                                      vertical: AppSpacing.xs),
                                  decoration: BoxDecoration(
                                    color: AppColors.primaryContainer,
                                    borderRadius: BorderRadius.circular(
                                        AppRadius.pill),
                                  ),
                                  child: Text(
                                    address.label,
                                    style: textTheme.bodySmall?.copyWith(
                                      color: AppColors.primaryDark,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ),
                                if (isSelected) ...[
                                  const SizedBox(width: AppSpacing.sm),
                                  const Icon(Icons.check_circle,
                                      color: AppColors.primary, size: 20),
                                ],
                              ],
                            ),
                            const SizedBox(height: AppSpacing.sm),
                            Text(address.summary,
                                style: textTheme.bodyMedium),
                            const SizedBox(height: AppSpacing.xs),
                            Text(address.phone,
                                style: textTheme.bodySmall),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.edit_outlined,
                            color: AppColors.textSecondary, size: 20),
                        onPressed: () {
                          addresses.beginEdit(address);
                          Get.toNamed('/addresses/new',
                              arguments: address);
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete_outline,
                            color: AppColors.error, size: 20),
                        onPressed: () =>
                            addresses.delete(address.id),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      }),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: ElevatedButton.icon(
            onPressed: () {
              addresses.beginAdd();
              Get.toNamed('/addresses/new');
            },
            icon: const Icon(Icons.add),
            label: const Text('Add new address'),
          ),
        ),
      ),
    );
  }
}
