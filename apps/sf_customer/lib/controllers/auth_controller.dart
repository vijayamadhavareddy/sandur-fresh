import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import '../graphql/generated/auth.graphql.dart';
import '../providers/graphql_provider.dart';
import '../services/push_service.dart';
import '../theme/app_colors.dart';
import 'address_controller.dart';
import 'cart_controller.dart';

class AuthController extends GetxController {
  static const String keyPhone = 'user_phone';
  static const String keyName = 'user_name';
  static const String keyToken = 'auth_token';

  final GraphQLProvider gqlProvider = Get.put(GraphQLProvider());

  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();
  final TextEditingController nameController = TextEditingController();

  final RxBool isLoggedIn = false.obs;
  final RxString name = ''.obs;
  final RxString phone = ''.obs;
  final RxnString generatedOtp = RxnString();
  final RxBool otpSent = false.obs;
  final RxBool editingName = false.obs;
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    final box = GetStorage();
    final storedPhone = box.read<String>(keyPhone);
    final storedName = box.read<String>(keyName);
    final storedToken = box.read<String>(keyToken);

    if (storedPhone != null && storedPhone.isNotEmpty) {
      phone.value = storedPhone;
    }
    if (storedName != null && storedName.isNotEmpty) {
      name.value = storedName;
    }
    if (storedToken != null && storedToken.isNotEmpty) {
      gqlProvider.authToken = storedToken;
      isLoggedIn.value = true;
    }
  }

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
      await gqlProvider.execute(
        document: documentNodeMutationRequestOtp,
        fromJson: Mutation$RequestOtp.fromJson,
        variables: Variables$Mutation$RequestOtp(phone: number).toJson(),
      );
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
    final enteredPhone = phone.value.isNotEmpty ? phone.value : phoneController.text.trim();

    try {
      final res = await gqlProvider.execute(
        document: documentNodeMutationVerifyOtp,
        fromJson: Mutation$VerifyOtp.fromJson,
        variables: Variables$Mutation$VerifyOtp(
          phone: enteredPhone,
          code: code,
        ).toJson(),
      );

      final token = res.verifyOtp.token;
      final user = res.verifyOtp.user;

      gqlProvider.authToken = token;
      phone.value = enteredPhone;
      final box = GetStorage();
      box.write(keyToken, token);
      box.write(keyPhone, enteredPhone);
      if (user.name.isNotEmpty) {
        name.value = user.name;
        box.write(keyName, user.name);
      }
      isLoggedIn.value = true;
      isLoading.value = false;
      // Register for order-status pushes now that we have an auth token.
      if (Get.isRegistered<PushService>()) {
        unawaited(Get.find<PushService>().start());
      }

      // Sync address and cart on login
      if (Get.isRegistered<AddressController>()) {
        final addressController = Get.find<AddressController>();
        await addressController.fetchAddresses();
        if (Get.isRegistered<CartController>()) {
          await Get.find<CartController>().fetchCart();
        }

        if (addressController.addresses.isEmpty) {
          addressController.beginAdd();
          Get.offAllNamed('/addresses/new', arguments: {'fromLogin': true});
          return true;
        }
      }

      Get.offAllNamed('/');
      return true;
    } catch (e) {
      // Offline / fallback verification
      if (generatedOtp.value != null && code == generatedOtp.value) {
        phone.value = enteredPhone;
        final box = GetStorage();
        box.write(keyPhone, enteredPhone);
        isLoggedIn.value = true;
        isLoading.value = false;

        if (Get.isRegistered<AddressController>()) {
          final addressController = Get.find<AddressController>();
          if (addressController.addresses.isEmpty) {
            addressController.beginAdd();
            Get.offAllNamed('/addresses/new', arguments: {'fromLogin': true});
            return true;
          }
        }

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
      await gqlProvider.execute(
        document: documentNodeMutationUpdateProfile,
        fromJson: Mutation$UpdateProfile.fromJson,
        variables: Variables$Mutation$UpdateProfile(name: trimmed).toJson(),
      );
      name.value = trimmed;
      GetStorage().write(keyName, trimmed);
    } catch (e) {
      name.value = trimmed;
      GetStorage().write(keyName, trimmed);
    } finally {
      editingName.value = false;
    }
  }

  void cancelEditName() => editingName.value = false;

  void logout() {
    if (Get.isRegistered<PushService>()) {
      unawaited(Get.find<PushService>().stop());
    }
    isLoggedIn.value = false;
    gqlProvider.authToken = null;
    phone.value = '';
    name.value = 'Sandur Customer';
    resetOtpFlow();
    phoneController.clear();
    final box = GetStorage();
    box.remove(keyPhone);
    box.remove(keyName);
    box.remove(keyToken);
    if (Get.isRegistered<AddressController>()) {
      Get.find<AddressController>().clear();
    }
    if (Get.isRegistered<CartController>()) {
      Get.find<CartController>().clear();
    }
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
