import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../models/address.dart';
import '../theme/app_colors.dart';

class AddressController extends GetxController {
  static const List<String> labels = ['Home', 'Work', 'Other'];

  final RxList<Address> addresses = <Address>[
    const Address(
      id: 'addr-1',
      label: 'Home',
      line: '42, 2nd Cross, Sandur',
      city: 'Ballari',
      pincode: '583119',
      phone: '9876543210',
    ),
  ].obs;

  final RxnString selectedId = RxnString();

  final TextEditingController lineController = TextEditingController();
  final TextEditingController cityController = TextEditingController();
  final TextEditingController pincodeController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final RxString formLabel = 'Home'.obs;

  String? _editingId;

  @override
  void onInit() {
    super.onInit();
    selectedId.value = addresses.first.id;
  }

  Address? get selected {
    final id = selectedId.value;
    for (final address in addresses) {
      if (address.id == id) return address;
    }
    return addresses.isNotEmpty ? addresses.first : null;
  }

  void select(String id) => selectedId.value = id;

  void beginAdd() {
    _editingId = null;
    formLabel.value = 'Home';
    lineController.clear();
    cityController.clear();
    pincodeController.clear();
    phoneController.clear();
  }

  void beginEdit(Address address) {
    _editingId = address.id;
    formLabel.value = address.label;
    lineController.text = address.line;
    cityController.text = address.city;
    pincodeController.text = address.pincode;
    phoneController.text = address.phone;
  }

  bool saveForm() {
    final line = lineController.text.trim();
    final city = cityController.text.trim();
    final pincode = pincodeController.text.trim();
    final phone = phoneController.text.trim();
    if (line.isEmpty ||
        city.isEmpty ||
        !RegExp(r'^\d{6}$').hasMatch(pincode) ||
        !RegExp(r'^\d{10}$').hasMatch(phone)) {
      Get.snackbar(
        'Incomplete address',
        'Fill all fields — 6-digit pincode and 10-digit phone',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.error,
        colorText: AppColors.surface,
      );
      return false;
    }

    if (_editingId != null) {
      final index = addresses.indexWhere((a) => a.id == _editingId);
      if (index != -1) {
        addresses[index] = addresses[index].copyWith(
          label: formLabel.value,
          line: line,
          city: city,
          pincode: pincode,
          phone: phone,
        );
      }
    } else {
      final address = Address(
        id: 'addr-${DateTime.now().millisecondsSinceEpoch}',
        label: formLabel.value,
        line: line,
        city: city,
        pincode: pincode,
        phone: phone,
      );
      addresses.add(address);
      selectedId.value ??= address.id;
    }
    _editingId = null;
    return true;
  }

  void delete(String id) {
    addresses.removeWhere((a) => a.id == id);
    if (selectedId.value == id) {
      selectedId.value = addresses.isNotEmpty ? addresses.first.id : null;
    }
  }

  @override
  void onClose() {
    lineController.dispose();
    cityController.dispose();
    pincodeController.dispose();
    phoneController.dispose();
    super.onClose();
  }
}
