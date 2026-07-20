import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../theme/app_colors.dart';

class AddressFormScreen extends StatelessWidget {
  const AddressFormScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final addresses = Get.find<AddressController>();
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
                    selected: addresses.formLabel.value == label,
                    onSelected: (_) =>
                        addresses.formLabel.value = label,
                  );
                }).toList(),
              )),
          const SizedBox(height: AppSpacing.xl),
          TextField(
            controller: addresses.lineController,
            maxLines: 2,
            decoration: const InputDecoration(
              labelText: 'Address',
              prefixIcon: Icon(Icons.home_outlined),
              alignLabelWithHint: true,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: addresses.cityController,
            decoration: const InputDecoration(
              labelText: 'City',
              prefixIcon: Icon(Icons.location_city_outlined),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          TextField(
            controller: addresses.pincodeController,
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
            controller: addresses.phoneController,
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
              if (addresses.saveForm()) Get.back();
            },
            child: const Text('Save address'),
          ),
        ),
      ),
    );
  }
}
