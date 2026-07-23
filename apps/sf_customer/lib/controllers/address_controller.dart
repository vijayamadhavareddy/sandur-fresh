import 'package:flutter/material.dart';
import 'package:get/get.dart';
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
      const doc = '''
        query MyAddresses {
          myAddresses {
            id
            label
            line1
            line2
            city
            pincode
            phone
            lat
            lng
            isDefault
          }
        }
      ''';
      final res = await gqlProvider.sendQuery(doc);
      final rawList = res['myAddresses'] as List<dynamic>? ?? [];
      if (rawList.isNotEmpty) {
        final list = rawList
            .map((item) => Address.fromGraphQL(item as Map<String, dynamic>))
            .toList();
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
      const doc = '''
        mutation AddAddress(
          \$label: String!, \$line1: String!, \$city: String!,
          \$pincode: String!, \$phone: String!, \$lat: Float!, \$lng: Float!
        ) {
          addAddress(
            label: \$label, line1: \$line1, city: \$city,
            pincode: \$pincode, phone: \$phone, lat: \$lat, lng: \$lng
          ) {
            id label line1 line2 city pincode phone lat lng isDefault
          }
        }
      ''';
      final res = await gqlProvider.sendQuery(doc, variables: {
        'label': address.label,
        'line1': address.line,
        'city': address.city,
        'pincode': address.pincode,
        'phone': address.phone,
        'lat': address.lat,
        'lng': address.lng,
      });
      if (res['addAddress'] != null) {
        final created = Address.fromGraphQL(res['addAddress'] as Map<String, dynamic>);
        final idx = addresses.indexWhere((a) => a.id == address.id);
        if (idx != -1) {
          addresses[idx] = created;
        } else {
          addresses.add(created);
        }
        selectedId.value = created.id;
      }
    } catch (_) {}
  }

  Future<void> _saveUpdateGraphQL(Address address) async {
    if (gqlProvider.authToken == null) return;
    try {
      const doc = '''
        mutation UpdateAddress(
          \$id: String!, \$label: String, \$line1: String,
          \$city: String, \$pincode: String, \$phone: String
        ) {
          updateAddress(
            id: \$id, label: \$label, line1: \$line1,
            city: \$city, pincode: \$pincode, phone: \$phone
          ) {
            id label line1 line2 city pincode phone lat lng isDefault
          }
        }
      ''';
      await gqlProvider.sendQuery(doc, variables: {
        'id': address.id,
        'label': address.label,
        'line1': address.line,
        'city': address.city,
        'pincode': address.pincode,
        'phone': address.phone,
      });
    } catch (_) {}
  }

  Future<void> delete(String id) async {
    addresses.removeWhere((a) => a.id == id);
    if (selectedId.value == id) {
      selectedId.value = addresses.isNotEmpty ? addresses.first.id : null;
    }

    if (gqlProvider.authToken != null) {
      try {
        const doc = '''
          mutation DeleteAddress(\$id: String!) {
            deleteAddress(id: \$id)
          }
        ''';
        await gqlProvider.sendQuery(doc, variables: {'id': id});
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
