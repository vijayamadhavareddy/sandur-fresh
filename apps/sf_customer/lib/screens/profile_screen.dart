import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/auth_controller.dart';
import '../theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Get.find<AuthController>();
    final textTheme = Theme.of(context).textTheme;

    String maskedPhone() {
      final phone = auth.phone.value;
      if (phone.length < 10) return phone.isEmpty ? 'Not signed in' : phone;
      return '+91 ${phone.substring(0, 2)}****${phone.substring(6)}';
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Row(
                children: [
                  Container(
                    width: 56,
                    height: 56,
                    decoration: const BoxDecoration(
                      color: AppColors.primaryContainer,
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: Obx(() => Text(
                          auth.name.value.isEmpty
                              ? 'S'
                              : auth.name.value[0].toUpperCase(),
                          style: textTheme.headlineLarge
                              ?.copyWith(color: AppColors.primaryDark),
                        )),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Obx(() {
                      if (auth.editingName.value) {
                        return TextField(
                          controller: auth.nameController,
                          autofocus: true,
                          textCapitalization: TextCapitalization.words,
                          style: textTheme.titleLarge,
                          decoration: const InputDecoration(
                            hintText: 'Your name',
                            isDense: true,
                            contentPadding: EdgeInsets.symmetric(
                              horizontal: AppSpacing.md,
                              vertical: AppSpacing.sm,
                            ),
                          ),
                          onSubmitted: (_) => auth.saveName(),
                        );
                      }
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(auth.name.value, style: textTheme.titleLarge),
                          const SizedBox(height: AppSpacing.xs),
                          Text(maskedPhone(), style: textTheme.bodySmall),
                        ],
                      );
                    }),
                  ),
                  Obx(() => auth.editingName.value
                      ? Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.check,
                                  color: AppColors.success),
                              tooltip: 'Save name',
                              onPressed: auth.saveName,
                            ),
                            IconButton(
                              icon: const Icon(Icons.close,
                                  color: AppColors.textSecondary),
                              tooltip: 'Cancel',
                              onPressed: auth.cancelEditName,
                            ),
                          ],
                        )
                      : IconButton(
                          icon: const Icon(Icons.edit_outlined,
                              color: AppColors.textSecondary),
                          tooltip: 'Edit name',
                          onPressed: auth.beginEditName,
                        )),
                ],
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _MenuRow(
            icon: Icons.receipt_long_outlined,
            title: 'My Orders',
            onTap: () => Get.toNamed('/orders'),
          ),
          const SizedBox(height: AppSpacing.sm),
          _MenuRow(
            icon: Icons.location_on_outlined,
            title: 'My Addresses',
            onTap: () => Get.toNamed('/addresses'),
          ),
          const SizedBox(height: AppSpacing.sm),
          _MenuRow(
            icon: Icons.logout,
            title: 'Logout',
            color: AppColors.error,
            onTap: () {
              Get.defaultDialog(
                title: 'Logout',
                middleText: 'Are you sure you want to logout?',
                textConfirm: 'Logout',
                textCancel: 'Cancel',
                confirmTextColor: AppColors.surface,
                buttonColor: AppColors.error,
                onConfirm: auth.logout,
              );
            },
          ),
        ],
      ),
    );
  }
}

class _MenuRow extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  final Color? color;

  const _MenuRow({
    required this.icon,
    required this.title,
    required this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveColor = color ?? AppColors.textPrimary;
    return Card(
      child: ListTile(
        leading: Icon(icon, color: effectiveColor),
        title: Text(
          title,
          style: Theme.of(context)
              .textTheme
              .bodyMedium
              ?.copyWith(fontWeight: FontWeight.w600, color: effectiveColor),
        ),
        trailing: const Icon(Icons.chevron_right,
            color: AppColors.textSecondary),
        onTap: onTap,
      ),
    );
  }
}
