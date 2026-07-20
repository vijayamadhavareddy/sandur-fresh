import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../theme/app_colors.dart';

class AuthController extends GetxController {
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();
  final TextEditingController nameController = TextEditingController();

  final RxBool isLoggedIn = false.obs;
  final RxString name = 'Sandur Customer'.obs;
  final RxString phone = ''.obs;
  final RxnString generatedOtp = RxnString();
  final RxBool otpSent = false.obs;
  final RxBool editingName = false.obs;

  bool sendOtp() {
    final number = phoneController.text.trim();
    if (!RegExp(r'^\d{10}$').hasMatch(number)) {
      Get.snackbar(
        'Invalid phone number',
        'Enter a valid 10-digit mobile number',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.error,
        colorText: AppColors.surface,
      );
      return false;
    }
    final otp = (1000 + Random().nextInt(9000)).toString();
    generatedOtp.value = otp;
    phone.value = number;
    otpController.clear();
    otpSent.value = true;
    Get.snackbar(
      'OTP sent',
      'Simulated SMS: your OTP is $otp',
      snackPosition: SnackPosition.BOTTOM,
      backgroundColor: AppColors.primaryDark,
      colorText: AppColors.surface,
    );
    return true;
  }

  bool verifyOtp() {
    if (otpController.text.trim() == generatedOtp.value) {
      isLoggedIn.value = true;
      Get.offAllNamed('/');
      return true;
    }
    Get.snackbar(
      'Incorrect OTP',
      'Please check the code and try again',
      snackPosition: SnackPosition.BOTTOM,
      backgroundColor: AppColors.error,
      colorText: AppColors.surface,
    );
    return false;
  }

  void resetOtpFlow() {
    otpSent.value = false;
    generatedOtp.value = null;
    otpController.clear();
  }

  void beginEditName() {
    nameController.text = name.value;
    editingName.value = true;
  }

  void saveName() {
    final trimmed = nameController.text.trim();
    if (trimmed.isNotEmpty) name.value = trimmed;
    editingName.value = false;
  }

  void cancelEditName() => editingName.value = false;

  void logout() {
    isLoggedIn.value = false;
    phone.value = '';
    name.value = 'Sandur Customer';
    resetOtpFlow();
    phoneController.clear();
    Get.offAllNamed('/login');
  }

  @override
  void onClose() {
    phoneController.dispose();
    otpController.dispose();
    nameController.dispose();
    super.onClose();
  }
}
