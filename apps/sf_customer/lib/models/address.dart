class Address {
  final String id;
  final String label; // 'Home' / 'Work' / 'Other'
  final String line;
  final String city;
  final String pincode;
  final String phone;
  final double lat;
  final double lng;
  final bool isDefault;

  const Address({
    required this.id,
    required this.label,
    required this.line,
    required this.city,
    required this.pincode,
    required this.phone,
    this.lat = 15.0821,
    this.lng = 76.5492,
    this.isDefault = false,
  });

  factory Address.fromGraphQL(Map<String, dynamic> json) {
    final line1 = json['line1'] as String? ?? json['line'] as String? ?? '';
    final line2 = json['line2'] as String?;
    final fullLine = (line2 != null && line2.isNotEmpty) ? '$line1, $line2' : line1;

    return Address(
      id: json['id'] as String? ?? '',
      label: json['label'] as String? ?? 'Home',
      line: fullLine,
      city: json['city'] as String? ?? '',
      pincode: json['pincode'] as String? ?? '',
      phone: json['phone'] as String? ?? '',
      lat: (json['lat'] as num?)?.toDouble() ?? 15.0821,
      lng: (json['lng'] as num?)?.toDouble() ?? 76.5492,
      isDefault: json['isDefault'] as bool? ?? false,
    );
  }

  String get summary => '$line, $city — $pincode';

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      id: json['id'] as String? ?? '',
      label: json['label'] as String? ?? 'Home',
      line: json['line'] as String? ?? '',
      city: json['city'] as String? ?? '',
      pincode: json['pincode'] as String? ?? '',
      phone: json['phone'] as String? ?? '',
      lat: (json['lat'] as num?)?.toDouble() ?? 15.0821,
      lng: (json['lng'] as num?)?.toDouble() ?? 76.5492,
      isDefault: json['isDefault'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'label': label,
        'line': line,
        'city': city,
        'pincode': pincode,
        'phone': phone,
        'lat': lat,
        'lng': lng,
        'isDefault': isDefault,
      };

  Address copyWith({
    String? label,
    String? line,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
  }) {
    return Address(
      id: id,
      label: label ?? this.label,
      line: line ?? this.line,
      city: city ?? this.city,
      pincode: pincode ?? this.pincode,
      phone: phone ?? this.phone,
      lat: lat ?? this.lat,
      lng: lng ?? this.lng,
      isDefault: isDefault ?? this.isDefault,
    );
  }
}
