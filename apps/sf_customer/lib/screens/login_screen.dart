import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/auth_controller.dart';
import '../theme/app_colors.dart';

class LoginScreen extends GetView<AuthController> {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            Container(
              width: double.infinity,
              color: AppColors.primaryDark,
              padding: const EdgeInsets.fromLTRB(AppSpacing.xl,
                  AppSpacing.xxl, AppSpacing.xl, AppSpacing.xxl),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 56,
                    height: 56,
                    decoration: const BoxDecoration(
                      color: AppColors.primary,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.bolt,
                        color: AppColors.primaryDark, size: 32),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    'Sandur Fresh',
                    style: textTheme.displayLarge
                        ?.copyWith(color: AppColors.surface),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    'Groceries delivered in 12 minutes',
                    style: textTheme.bodyMedium
                        ?.copyWith(color: AppColors.primary),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(AppSpacing.xl),
              child: Obx(() => Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text('Login with OTP', style: textTheme.headlineMedium),
                      const SizedBox(height: AppSpacing.xs),
                      Text(
                        controller.otpSent.value
                            ? 'Enter the 6-digit code sent to ${controller.phone.value}'
                            : 'We\'ll send a one-time password to your number',
                        style: textTheme.bodySmall,
                      ),
                      const SizedBox(height: AppSpacing.xl),
                      if (!controller.otpSent.value) ...[
                        TextField(
                          controller: controller.phoneController,
                          keyboardType: TextInputType.phone,
                          maxLength: 10,
                          decoration: const InputDecoration(
                            labelText: 'Phone number',
                            prefixIcon: Icon(Icons.phone_outlined),
                            prefixText: '+91 ',
                            counterText: '',
                          ),
                        ),
                        const SizedBox(height: AppSpacing.xl),
                        ElevatedButton(
                          onPressed: controller.sendOtp,
                          child: const Text('Send OTP'),
                        ),
                      ] else ...[
                        TextField(
                          controller: controller.otpController,
                          keyboardType: TextInputType.number,
                          maxLength: 6,
                          decoration: const InputDecoration(
                            labelText: '6-digit OTP',
                            prefixIcon: Icon(Icons.lock_outline),
                            counterText: '',
                          ),
                        ),
                        const SizedBox(height: AppSpacing.xl),
                        ElevatedButton(
                          onPressed: controller.verifyOtp,
                          child: const Text('Verify & Continue'),
                        ),
                        const SizedBox(height: AppSpacing.sm),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            TextButton(
                              onPressed: controller.sendOtp,
                              child: const Text('Resend OTP'),
                            ),
                            TextButton(
                              onPressed: controller.resetOtpFlow,
                              child: const Text('Change number'),
                            ),
                          ],
                        ),
                      ],
                    ],
                  )),
            ),
          ],
        ),
      ),
    );
  }
}
