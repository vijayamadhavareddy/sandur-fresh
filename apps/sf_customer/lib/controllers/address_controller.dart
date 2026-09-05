import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import '../graphql/generated/address.graphql.dart';
import '../models/address.dart';
import '../providers/graphql_provider.dart';
import '../theme/app_colors.dart';
import 'auth_controller.dart';

class AddressController extends GetxController {
  static const List<String> labels = ['Home', 'Work', 'Other'];
  static const String keySavedAddresses = 'user_addresses';
  static const String keySelectedAddressId = 'selected_address_id';

  final GraphQLProvider gqlProvider = Get.find<GraphQLProvider>();

  final RxList<Address> addresses = <Address>[].obs;
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
    _loadFromStorage();
    fetchAddresses();
  }

  void _loadFromStorage() {
    final box = GetStorage();
    final rawList = box.read<List>(keySavedAddresses);
    if (rawList != null && rawList.isNotEmpty) {
      final loaded = rawList
          .whereType<Map>()
          .map((m) => Address.fromJson(Map<String, dynamic>.from(m)))
          .toList();
      if (loaded.isNotEmpty) {
        addresses.assignAll(loaded);
        final storedSelected = box.read<String>(keySelectedAddressId);
        if (storedSelected != null && addresses.any((a) => a.id == storedSelected)) {
          selectedId.value = storedSelected;
        } else {
          selectedId.value = addresses.first.id;
        }
      }
    }
  }

  void _persistToStorage() {
    final box = GetStorage();
    if (addresses.isEmpty) {
      box.remove(keySavedAddresses);
      box.remove(keySelectedAddressId);
    } else {
      box.write(
        keySavedAddresses,
        addresses.map((a) => a.toJson()).toList(),
      );
      if (selectedId.value != null) {
        box.write(keySelectedAddressId, selectedId.value);
      }
    }
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
        _persistToStorage();
      } else {
        if (addresses.isEmpty) {
          _persistToStorage();
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

  void select(String id) {
    selectedId.value = id;
    _persistToStorage();
  }

  void beginAdd() {
    _editingId = null;
    formLabel.value = 'Home';
    lineController.clear();
    cityController.clear();
    pincodeController.clear();

    // Auto-fill phone with logged-in user phone number
    final box = GetStorage();
    final storedPhone = box.read<String>(AuthController.keyPhone);
    final auth = Get.isRegistered<AuthController>() ? Get.find<AuthController>() : null;
    if (storedPhone != null && storedPhone.isNotEmpty) {
      phoneController.text = storedPhone;
    } else if (auth != null && auth.phone.value.isNotEmpty) {
      phoneController.text = auth.phone.value;
    } else {
      phoneController.clear();
    }
  }

  void beginEdit(Address address) {
    _editingId = address.id;
    formLabel.value = address.label;
    lineController.text = address.line;
    cityController.text = address.city;
    pincodeController.text = address.pincode;
    phoneController.text = address.phone;
  }

  static int _uuidCounter = 0;

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
        _persistToStorage();
        _saveUpdateGraphQL(updated);
      }
    } else {
      final address = Address(
        id: 'addr-${DateTime.now().millisecondsSinceEpoch}-${++_uuidCounter}',
        label: formLabel.value,
        line: line,
        city: city,
        pincode: pincode,
        phone: phone,
      );
      addresses.add(address);
      selectedId.value ??= address.id;
      _persistToStorage();
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
      _persistToStorage();
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
    _persistToStorage();

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

  void clear() {
    addresses.clear();
    selectedId.value = null;
    _persistToStorage();
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
