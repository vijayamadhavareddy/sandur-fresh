import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../theme/app_colors.dart';

class AddressFormScreen extends GetView<AddressController> {
  const AddressFormScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final isEditing = Get.arguments != null;

    return Scaffold(
      appBar: AppBar(
          title: Text(isEditing ? 'Edit address' : 'New address')),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
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
              if (controller.saveForm()) Get.back();
            },
            child: const Text('Save address'),
          ),
        ),
      ),
    );
  }
}
