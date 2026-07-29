import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/auth_controller.dart';
import '../theme/app_colors.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      backgroundColor: AppColors.primaryDark,
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.xxl),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 72,
                      height: 72,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppColors.primary, width: 2),
                      ),
                      child: const Icon(Icons.bolt,
                          size: 34, color: AppColors.primary),
                    ),
                    const SizedBox(height: AppSpacing.lg + 2),
                    Text(
                      'Groceries, delivered\nin minutes.',
                      textAlign: TextAlign.center,
                      style: textTheme.displayMedium?.copyWith(
                        color: Colors.white,
                        fontSize: 30,
                        height: 1.25,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Sandur Delivery — fresh from Sandur, Karnataka',
                      textAlign: TextAlign.center,
                      style: textTheme.bodyMedium?.copyWith(
                        color: Colors.white.withValues(alpha: 0.6),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                color: AppColors.primaryDarker,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(AppRadius.xl),
                  topRight: Radius.circular(AppRadius.xl),
                ),
              ),
              padding: const EdgeInsets.fromLTRB(
                  AppSpacing.xl, AppSpacing.xl, AppSpacing.xl, AppSpacing.xl + 4),
              child: Column(
                children: [
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () => _openAuthSheet(context),
                      child: const Text('Login'),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md + 2),
                  Text.rich(
                    TextSpan(
                      style: textTheme.bodySmall?.copyWith(
                        color: Colors.white.withValues(alpha: 0.5),
                      ),
                      children: [
                        const TextSpan(text: 'By continuing, I accept the '),
                        TextSpan(
                          text: 'Privacy Policy',
                          style: const TextStyle(
                              color: AppColors.primary,
                              fontWeight: FontWeight.w700),
                        ),
                        const TextSpan(text: ' and '),
                        TextSpan(
                          text: 'Sandur Delivery Terms of Use',
                          style: const TextStyle(
                              color: AppColors.primary,
                              fontWeight: FontWeight.w700),
                        ),
                      ],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _openAuthSheet(BuildContext context) {
    final controller = Get.find<AuthController>();
    controller.resetOtpFlow();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => const _AuthSheet(),
    );
  }
}

class _AuthSheet extends StatefulWidget {
  const _AuthSheet();

  @override
  State<_AuthSheet> createState() => _AuthSheetState();
}

class _AuthSheetState extends State<_AuthSheet> {
  static const _otpLength = 6;

  final controller = Get.find<AuthController>();
  late final List<TextEditingController> _digitControllers =
      List.generate(_otpLength, (_) => TextEditingController());
  late final List<FocusNode> _digitNodes =
      List.generate(_otpLength, (_) => FocusNode());

  @override
  void dispose() {
    for (final c in _digitControllers) {
      c.dispose();
    }
    for (final n in _digitNodes) {
      n.dispose();
    }
    super.dispose();
  }

  void _onDigitChanged(int index, String value) {
    controller.otpController.text =
        _digitControllers.map((c) => c.text).join();
    if (value.isNotEmpty && index < _otpLength - 1) {
      _digitNodes[index + 1].requestFocus();
    } else if (value.isEmpty && index > 0) {
      _digitNodes[index - 1].requestFocus();
    }
  }

  void _resetDigits() {
    for (final c in _digitControllers) {
      c.clear();
    }
    controller.otpController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
      child: Container(
        decoration: const BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(AppRadius.xl),
            topRight: Radius.circular(AppRadius.xl),
          ),
        ),
        padding: const EdgeInsets.fromLTRB(
            AppSpacing.xl, AppSpacing.sm + 2, AppSpacing.xl, AppSpacing.xl + 4),
        child: SafeArea(
          top: false,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 36,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.border,
                  borderRadius: BorderRadius.circular(AppRadius.pill),
                ),
              ),
              const SizedBox(height: AppSpacing.lg + 2),
              Obx(() {
                return controller.otpSent.value
                    ? _buildOtpStep(textTheme)
                    : _buildPhoneStep(textTheme);
              }),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPhoneStep(TextTheme textTheme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Enter your phone number',
            style: textTheme.headlineMedium?.copyWith(fontSize: 20)),
        const SizedBox(height: AppSpacing.xs),
        Text("We'll send a one-time password to verify",
            style: textTheme.bodyMedium),
        const SizedBox(height: AppSpacing.xl),
        Container(
          padding: const EdgeInsets.only(bottom: AppSpacing.sm + 2),
          decoration: const BoxDecoration(
            border: Border(
              bottom: BorderSide(color: AppColors.primary, width: 1.5),
            ),
          ),
          child: Row(
            children: [
              Text('🇮🇳 +91',
                  style: textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700)),
              const SizedBox(width: AppSpacing.sm),
              const SizedBox(
                  height: 20, child: VerticalDivider(color: AppColors.border, width: 1)),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: ValueListenableBuilder<TextEditingValue>(
                  valueListenable: controller.phoneController,
                  builder: (context, value, _) {
                    return TextField(
                      controller: controller.phoneController,
                      autofocus: true,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      style: textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
                      decoration: const InputDecoration(
                        isDense: true,
                        counterText: '',
                        border: InputBorder.none,
                        enabledBorder: InputBorder.none,
                        focusedBorder: InputBorder.none,
                        hintText: '',
                        filled: false,
                        contentPadding: EdgeInsets.zero,
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.xl),
        ValueListenableBuilder<TextEditingValue>(
          valueListenable: controller.phoneController,
          builder: (context, value, _) {
            final invalid = value.text.replaceAll(RegExp(r'\D'), '').length != 10;
            return Obx(() {
              final disabled = invalid || controller.isLoading.value;
              return SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: disabled ? null : () => controller.sendOtp(),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: AppColors.primaryDark,
                    disabledBackgroundColor: AppColors.surfaceVariant,
                    disabledForegroundColor: AppColors.textSecondary,
                  ),
                  child: controller.isLoading.value
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Continue'),
                ),
              );
            });
          },
        ),
      ],
    );
  }

  Widget _buildOtpStep(TextTheme textTheme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Enter OTP', style: textTheme.headlineMedium?.copyWith(fontSize: 20)),
        const SizedBox(height: AppSpacing.xs),
        Obx(() => Text.rich(
              TextSpan(
                style: textTheme.bodyMedium,
                children: [
                  TextSpan(text: 'Sent to +91 ${controller.phone.value} · '),
                  TextSpan(
                    text: 'Change number',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () {
                        _resetDigits();
                        controller.resetOtpFlow();
                      },
                  ),
                ],
              ),
            )),
        const SizedBox(height: AppSpacing.xl),
        Row(
          children: List.generate(_otpLength, (i) {
            return Expanded(
              child: Padding(
                padding: EdgeInsets.only(right: i == _otpLength - 1 ? 0 : AppSpacing.sm + 2),
                child: TextField(
                  controller: _digitControllers[i],
                  focusNode: _digitNodes[i],
                  autofocus: i == 0,
                  onChanged: (v) => setState(() => _onDigitChanged(i, v)),
                  keyboardType: TextInputType.number,
                  maxLength: 1,
                  textAlign: TextAlign.center,
                  style: textTheme.headlineMedium?.copyWith(fontSize: 20),
                  decoration: const InputDecoration(
                    counterText: '',
                    contentPadding: EdgeInsets.symmetric(vertical: AppSpacing.md + 2),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(14)),
                      borderSide: BorderSide(color: AppColors.border, width: 1.5),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(14)),
                      borderSide: BorderSide(color: AppColors.border, width: 1.5),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(14)),
                      borderSide: BorderSide(color: AppColors.primaryDark, width: 1.5),
                    ),
                  ),
                ),
              ),
            );
          }),
        ),
        const SizedBox(height: AppSpacing.xl),
        Builder(builder: (context) {
          final allFilled = _digitControllers.every((c) => c.text.isNotEmpty);
          return Obx(() {
            final disabled = !allFilled || controller.isLoading.value;
            return SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: disabled ? null : () => controller.verifyOtp(),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: AppColors.primaryDark,
                  disabledBackgroundColor: AppColors.surfaceVariant,
                  disabledForegroundColor: AppColors.textSecondary,
                ),
                child: controller.isLoading.value
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Verify & continue'),
              ),
            );
          });
        }),
        const SizedBox(height: AppSpacing.sm),
        Center(
          child: TextButton(
            onPressed: () => controller.sendOtp(),
            child: Text(
              'Resend OTP',
              style: textTheme.bodyMedium?.copyWith(
                color: AppColors.success,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
