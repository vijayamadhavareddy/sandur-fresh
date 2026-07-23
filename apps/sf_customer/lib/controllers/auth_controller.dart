import 'dart:math';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../providers/graphql_provider.dart';
import '../theme/app_colors.dart';

class AuthController extends GetxController {
  final GraphQLProvider gqlProvider = Get.put(GraphQLProvider());

  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();
  final TextEditingController nameController = TextEditingController();

  final RxBool isLoggedIn = false.obs;
  final RxString name = 'Sandur Customer'.obs;
  final RxString phone = ''.obs;
  final RxnString generatedOtp = RxnString();
  final RxBool otpSent = false.obs;
  final RxBool editingName = false.obs;
  final RxBool isLoading = false.obs;

  Future<bool> sendOtp() async {
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

    isLoading.value = true;
    try {
      const doc = '''
        mutation RequestOtp(\$phone: String!) {
          requestOtp(phone: \$phone) {
            message
          }
        }
      ''';
      await gqlProvider.sendQuery(doc, variables: {'phone': number});
      phone.value = number;
      otpController.clear();
      otpSent.value = true;
      isLoading.value = false;
      Get.snackbar(
        'OTP Sent',
        'Enter the OTP sent to your phone (Use 000000 in dev)',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.primaryDark,
        colorText: AppColors.surface,
      );
      return true;
    } catch (e) {
      // Fallback for offline/test mode
      final otp = (1000 + Random().nextInt(9000)).toString();
      generatedOtp.value = otp;
      phone.value = number;
      otpController.clear();
      otpSent.value = true;
      isLoading.value = false;
      Get.snackbar(
        'OTP sent',
        'Simulated SMS: your OTP is $otp',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.primaryDark,
        colorText: AppColors.surface,
      );
      return true;
    }
  }

  Future<bool> verifyOtp() async {
    final code = otpController.text.trim();
    isLoading.value = true;

    try {
      const doc = '''
        mutation VerifyOtp(\$phone: String!, \$code: String!) {
          verifyOtp(phone: \$phone, code: \$code) {
            token
            user {
              id
              phone
              name
              email
              role
            }
          }
        }
      ''';
      final res = await gqlProvider.sendQuery(doc, variables: {
        'phone': phone.value.isNotEmpty ? phone.value : phoneController.text.trim(),
        'code': code,
      });

      final authPayload = res['verifyOtp'] as Map<String, dynamic>;
      final token = authPayload['token'] as String;
      final user = authPayload['user'] as Map<String, dynamic>;

      gqlProvider.authToken = token;
      if ((user['name'] as String?)?.isNotEmpty == true) {
        name.value = user['name'] as String;
      }
      isLoggedIn.value = true;
      isLoading.value = false;
      Get.offAllNamed('/');
      return true;
    } catch (e) {
      // Offline / fallback verification
      if (generatedOtp.value != null && code == generatedOtp.value) {
        isLoggedIn.value = true;
        isLoading.value = false;
        Get.offAllNamed('/');
        return true;
      }
      isLoading.value = false;
      Get.snackbar(
        'Incorrect OTP',
        'Please check the code and try again',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.error,
        colorText: AppColors.surface,
      );
      return false;
    }
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

  Future<void> saveName() async {
    final trimmed = nameController.text.trim();
    if (trimmed.isEmpty) {
      editingName.value = false;
      return;
    }

    try {
      const doc = '''
        mutation UpdateProfile(\$name: String!) {
          updateProfile(name: \$name) {
            id
            name
          }
        }
      ''';
      await gqlProvider.sendQuery(doc, variables: {'name': trimmed});
      name.value = trimmed;
    } catch (e) {
      name.value = trimmed;
    } finally {
      editingName.value = false;
    }
  }

  void cancelEditName() => editingName.value = false;

  void logout() {
    isLoggedIn.value = false;
    gqlProvider.authToken = null;
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
