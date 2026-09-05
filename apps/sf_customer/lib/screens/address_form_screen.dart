import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../models/address.dart';
import '../theme/app_colors.dart';

class AddressFormScreen extends GetView<AddressController> {
  const AddressFormScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final isFromLogin = Get.arguments is Map && Get.arguments['fromLogin'] == true;
    final isEditing = Get.arguments is Address || (Get.arguments is Map && Get.arguments['isEditing'] == true);

    return Scaffold(
      appBar: AppBar(
        title: Text(isEditing
            ? 'Edit address'
            : isFromLogin
                ? 'Add delivery address'
                : 'New address'),
        automaticallyImplyLeading: !isFromLogin,
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          if (isFromLogin) ...[
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              margin: const EdgeInsets.only(bottom: AppSpacing.lg),
              decoration: BoxDecoration(
                color: AppColors.primaryContainer,
                borderRadius: BorderRadius.circular(AppRadius.md),
              ),
              child: Row(
                children: [
                  const Icon(Icons.location_on, color: AppColors.primaryDark),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Text(
                      'Please provide your delivery address to start shopping.',
                      style: textTheme.bodySmall?.copyWith(
                        color: AppColors.primaryDark,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
          Text('Address label', style: textTheme.titleLarge),
          const SizedBox(height: AppSpacing.sm),
          Obx(() => Wrap(
                spacing: AppSpacing.sm,
                children: AddressController.labels.map((label) {
                  return ChoiceChip(
                    label: Text(label),
                    selected: controller.formLabel.value == label,
                    onSelected: (_) =>
                    controller.formLabel.value = label,
                  );
                }).toList(),
              )),
          const SizedBox(height: AppSpacing.xl),
          TextField(
            controller: controller.lineController,
            maxLines: 2,
            decoration: const InputDecoration(
              labelText: 'Address',
              prefixIcon: Icon(Icons.home_outlined),
              alignLabelWithHint: true,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: controller.cityController,
            decoration: const InputDecoration(
              labelText: 'City',
              prefixIcon: Icon(Icons.location_city_outlined),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: controller.pincodeController,
            keyboardType: TextInputType.number,
            maxLength: 6,
            decoration: const InputDecoration(
              labelText: 'Pincode',
              prefixIcon: Icon(Icons.pin_drop_outlined),
              counterText: '',
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: controller.phoneController,
            keyboardType: TextInputType.phone,
            maxLength: 10,
            decoration: const InputDecoration(
              labelText: 'Phone number',
              prefixIcon: Icon(Icons.phone_outlined),
              counterText: '',
            ),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: ElevatedButton(
            onPressed: () {
              if (controller.saveForm()) {
                if (isFromLogin) {
                  Get.offAllNamed('/');
                } else {
                  Get.back();
                }
              }
            },
            child: const Text('Save address'),
          ),
        ),
      ),
    );
  }
}
