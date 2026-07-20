class Address {
  final String id;
  final String label; // 'Home' / 'Work' / 'Other'
  final String line;
  final String city;
  final String pincode;
  final String phone;

  const Address({
    required this.id,
    required this.label,
    required this.line,
    required this.city,
    required this.pincode,
    required this.phone,
  });

  String get summary => '$line, $city — $pincode';

  Address copyWith({
    String? label,
    String? line,
    String? city,
    String? pincode,
    String? phone,
  }) {
    return Address(
      id: id,
      label: label ?? this.label,
      line: line ?? this.line,
      city: city ?? this.city,
      pincode: pincode ?? this.pincode,
      phone: phone ?? this.phone,
    );
  }
}
