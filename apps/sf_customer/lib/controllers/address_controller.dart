import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../graphql/generated/address.graphql.dart';
import '../models/address.dart';
import '../providers/graphql_provider.dart';
import '../theme/app_colors.dart';

class AddressController extends GetxController {
  static const List<String> labels = ['Home', 'Work', 'Other'];

  final GraphQLProvider gqlProvider = Get.find<GraphQLProvider>();

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
  final RxBool isLoading = false.obs;

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
    fetchAddresses();
  }

  Future<void> fetchAddresses() async {
    if (gqlProvider.authToken == null) return;
    isLoading.value = true;
    try {
      final res = await gqlProvider.execute(
        document: documentNodeQueryMyAddresses,
        fromJson: Query$MyAddresses.fromJson,
      );
      final rawList = res.myAddresses;
      if (rawList.isNotEmpty) {
        final list = rawList.map((item) {
          final line2 = item.line2;
          final fullLine = (line2 != null && line2.isNotEmpty)
              ? '${item.line1}, $line2'
              : item.line1;
          return Address(
            id: item.id,
            label: item.label,
            line: fullLine,
            city: item.city,
            pincode: item.pincode,
            phone: item.phone,
            lat: item.lat,
            lng: item.lng,
            isDefault: item.isDefault,
          );
        }).toList();
        addresses.assignAll(list);
        if (selectedId.value == null || !addresses.any((a) => a.id == selectedId.value)) {
          selectedId.value = addresses.first.id;
        }
      }
    } catch (_) {
      // Offline fallback
    } finally {
      isLoading.value = false;
    }
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
        final updated = addresses[index].copyWith(
          label: formLabel.value,
          line: line,
          city: city,
          pincode: pincode,
          phone: phone,
        );
        addresses[index] = updated;
        _saveUpdateGraphQL(updated);
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
      _saveAddGraphQL(address);
    }
    _editingId = null;
    return true;
  }

  Future<void> _saveAddGraphQL(Address address) async {
    if (gqlProvider.authToken == null) return;
    try {
      final res = await gqlProvider.execute(
        document: documentNodeMutationAddAddress,
        fromJson: Mutation$AddAddress.fromJson,
        variables: Variables$Mutation$AddAddress(
          label: address.label,
          line1: address.line,
          city: address.city,
          pincode: address.pincode,
          phone: address.phone,
          lat: address.lat,
          lng: address.lng,
        ).toJson(),
      );
      final item = res.addAddress;
      final line2 = item.line2;
      final fullLine = (line2 != null && line2.isNotEmpty)
          ? '${item.line1}, $line2'
          : item.line1;

      final created = Address(
        id: item.id,
        label: item.label,
        line: fullLine,
        city: item.city,
        pincode: item.pincode,
        phone: item.phone,
        lat: item.lat,
        lng: item.lng,
        isDefault: item.isDefault,
      );

      final idx = addresses.indexWhere((a) => a.id == address.id);
      if (idx != -1) {
        addresses[idx] = created;
      } else {
        addresses.add(created);
      }
      selectedId.value = created.id;
    } catch (_) {}
  }

  Future<void> _saveUpdateGraphQL(Address address) async {
    if (gqlProvider.authToken == null) return;
    try {
      await gqlProvider.execute(
        document: documentNodeMutationUpdateAddress,
        fromJson: Mutation$UpdateAddress.fromJson,
        variables: Variables$Mutation$UpdateAddress(
          id: address.id,
          label: address.label,
          line1: address.line,
          city: address.city,
          pincode: address.pincode,
          phone: address.phone,
        ).toJson(),
      );
    } catch (_) {}
  }

  Future<void> delete(String id) async {
    addresses.removeWhere((a) => a.id == id);
    if (selectedId.value == id) {
      selectedId.value = addresses.isNotEmpty ? addresses.first.id : null;
    }

    if (gqlProvider.authToken != null) {
      try {
        await gqlProvider.execute(
          document: documentNodeMutationDeleteAddress,
          fromJson: Mutation$DeleteAddress.fromJson,
          variables: Variables$Mutation$DeleteAddress(id: id).toJson(),
        );
      } catch (_) {}
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
