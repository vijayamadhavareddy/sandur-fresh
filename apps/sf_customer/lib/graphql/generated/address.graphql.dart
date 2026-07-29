import 'package:gql/ast.dart';

class Fragment$AddressFields {
  Fragment$AddressFields({
    required this.id,
    required this.label,
    required this.line1,
    this.line2,
    required this.city,
    required this.pincode,
    required this.phone,
    required this.lat,
    required this.lng,
    required this.isDefault,
    this.$__typename = 'AppAddress',
  });

  factory Fragment$AddressFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$label = json['label'];
    final l$line1 = json['line1'];
    final l$line2 = json['line2'];
    final l$city = json['city'];
    final l$pincode = json['pincode'];
    final l$phone = json['phone'];
    final l$lat = json['lat'];
    final l$lng = json['lng'];
    final l$isDefault = json['isDefault'];
    final l$$__typename = json['__typename'];
    return Fragment$AddressFields(
      id: (l$id as String),
      label: (l$label as String),
      line1: (l$line1 as String),
      line2: (l$line2 as String?),
      city: (l$city as String),
      pincode: (l$pincode as String),
      phone: (l$phone as String),
      lat: (l$lat as num).toDouble(),
      lng: (l$lng as num).toDouble(),
      isDefault: (l$isDefault as bool),
      $__typename: (l$$__typename as String),
    );
  }

  final String id;

  final String label;

  final String line1;

  final String? line2;

  final String city;

  final String pincode;

  final String phone;

  final double lat;

  final double lng;

  final bool isDefault;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$id = id;
    _resultData['id'] = l$id;
    final l$label = label;
    _resultData['label'] = l$label;
    final l$line1 = line1;
    _resultData['line1'] = l$line1;
    final l$line2 = line2;
    _resultData['line2'] = l$line2;
    final l$city = city;
    _resultData['city'] = l$city;
    final l$pincode = pincode;
    _resultData['pincode'] = l$pincode;
    final l$phone = phone;
    _resultData['phone'] = l$phone;
    final l$lat = lat;
    _resultData['lat'] = l$lat;
    final l$lng = lng;
    _resultData['lng'] = l$lng;
    final l$isDefault = isDefault;
    _resultData['isDefault'] = l$isDefault;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$label = label;
    final l$line1 = line1;
    final l$line2 = line2;
    final l$city = city;
    final l$pincode = pincode;
    final l$phone = phone;
    final l$lat = lat;
    final l$lng = lng;
    final l$isDefault = isDefault;
    final l$$__typename = $__typename;
    return Object.hashAll([
      l$id,
      l$label,
      l$line1,
      l$line2,
      l$city,
      l$pincode,
      l$phone,
      l$lat,
      l$lng,
      l$isDefault,
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$AddressFields || runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$label = label;
    final lOther$label = other.label;
    if (l$label != lOther$label) {
      return false;
    }
    final l$line1 = line1;
    final lOther$line1 = other.line1;
    if (l$line1 != lOther$line1) {
      return false;
    }
    final l$line2 = line2;
    final lOther$line2 = other.line2;
    if (l$line2 != lOther$line2) {
      return false;
    }
    final l$city = city;
    final lOther$city = other.city;
    if (l$city != lOther$city) {
      return false;
    }
    final l$pincode = pincode;
    final lOther$pincode = other.pincode;
    if (l$pincode != lOther$pincode) {
      return false;
    }
    final l$phone = phone;
    final lOther$phone = other.phone;
    if (l$phone != lOther$phone) {
      return false;
    }
    final l$lat = lat;
    final lOther$lat = other.lat;
    if (l$lat != lOther$lat) {
      return false;
    }
    final l$lng = lng;
    final lOther$lng = other.lng;
    if (l$lng != lOther$lng) {
      return false;
    }
    final l$isDefault = isDefault;
    final lOther$isDefault = other.isDefault;
    if (l$isDefault != lOther$isDefault) {
      return false;
    }
    final l$$__typename = $__typename;
    final lOther$$__typename = other.$__typename;
    if (l$$__typename != lOther$$__typename) {
      return false;
    }
    return true;
  }
}

extension UtilityExtension$Fragment$AddressFields on Fragment$AddressFields {
  CopyWith$Fragment$AddressFields<Fragment$AddressFields> get copyWith =>
      CopyWith$Fragment$AddressFields(this, (i) => i);
}

abstract class CopyWith$Fragment$AddressFields<TRes> {
  factory CopyWith$Fragment$AddressFields(
    Fragment$AddressFields instance,
    TRes Function(Fragment$AddressFields) then,
  ) = _CopyWithImpl$Fragment$AddressFields;

  factory CopyWith$Fragment$AddressFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$AddressFields;

  TRes call({
    String? id,
    String? label,
    String? line1,
    String? line2,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
    String? $__typename,
  });
}

class _CopyWithImpl$Fragment$AddressFields<TRes>
    implements CopyWith$Fragment$AddressFields<TRes> {
  _CopyWithImpl$Fragment$AddressFields(this._instance, this._then);

  final Fragment$AddressFields _instance;

  final TRes Function(Fragment$AddressFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? label = _undefined,
    Object? line1 = _undefined,
    Object? line2 = _undefined,
    Object? city = _undefined,
    Object? pincode = _undefined,
    Object? phone = _undefined,
    Object? lat = _undefined,
    Object? lng = _undefined,
    Object? isDefault = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$AddressFields(
      id: id == _undefined || id == null ? _instance.id : (id as String),
      label: label == _undefined || label == null
          ? _instance.label
          : (label as String),
      line1: line1 == _undefined || line1 == null
          ? _instance.line1
          : (line1 as String),
      line2: line2 == _undefined ? _instance.line2 : (line2 as String?),
      city: city == _undefined || city == null
          ? _instance.city
          : (city as String),
      pincode: pincode == _undefined || pincode == null
          ? _instance.pincode
          : (pincode as String),
      phone: phone == _undefined || phone == null
          ? _instance.phone
          : (phone as String),
      lat: lat == _undefined || lat == null ? _instance.lat : (lat as double),
      lng: lng == _undefined || lng == null ? _instance.lng : (lng as double),
      isDefault: isDefault == _undefined || isDefault == null
          ? _instance.isDefault
          : (isDefault as bool),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );
}

class _CopyWithStubImpl$Fragment$AddressFields<TRes>
    implements CopyWith$Fragment$AddressFields<TRes> {
  _CopyWithStubImpl$Fragment$AddressFields(this._res);

  TRes _res;

  call({
    String? id,
    String? label,
    String? line1,
    String? line2,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
    String? $__typename,
  }) => _res;
}

const fragmentDefinitionAddressFields = FragmentDefinitionNode(
  name: NameNode(value: 'AddressFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(name: NameNode(value: 'AppAddress'), isNonNull: false),
  ),
  directives: [],
  selectionSet: SelectionSetNode(
    selections: [
      FieldNode(
        name: NameNode(value: 'id'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'label'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'line1'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'line2'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'city'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'pincode'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'phone'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'lat'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'lng'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'isDefault'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: '__typename'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
    ],
  ),
);
const documentNodeFragmentAddressFields = DocumentNode(
  definitions: [fragmentDefinitionAddressFields],
);

class Query$MyAddresses {
  Query$MyAddresses({required this.myAddresses, this.$__typename = 'Query'});

  factory Query$MyAddresses.fromJson(Map<String, dynamic> json) {
    final l$myAddresses = json['myAddresses'];
    final l$$__typename = json['__typename'];
    return Query$MyAddresses(
      myAddresses: (l$myAddresses as List<dynamic>)
          .map(
            (e) => Fragment$AddressFields.fromJson((e as Map<String, dynamic>)),
          )
          .toList(),
      $__typename: (l$$__typename as String),
    );
  }

  final List<Fragment$AddressFields> myAddresses;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$myAddresses = myAddresses;
    _resultData['myAddresses'] = l$myAddresses.map((e) => e.toJson()).toList();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$myAddresses = myAddresses;
    final l$$__typename = $__typename;
    return Object.hashAll([
      Object.hashAll(l$myAddresses.map((v) => v)),
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Query$MyAddresses || runtimeType != other.runtimeType) {
      return false;
    }
    final l$myAddresses = myAddresses;
    final lOther$myAddresses = other.myAddresses;
    if (l$myAddresses.length != lOther$myAddresses.length) {
      return false;
    }
    for (int i = 0; i < l$myAddresses.length; i++) {
      final l$myAddresses$entry = l$myAddresses[i];
      final lOther$myAddresses$entry = lOther$myAddresses[i];
      if (l$myAddresses$entry != lOther$myAddresses$entry) {
        return false;
      }
    }
    final l$$__typename = $__typename;
    final lOther$$__typename = other.$__typename;
    if (l$$__typename != lOther$$__typename) {
      return false;
    }
    return true;
  }
}

extension UtilityExtension$Query$MyAddresses on Query$MyAddresses {
  CopyWith$Query$MyAddresses<Query$MyAddresses> get copyWith =>
      CopyWith$Query$MyAddresses(this, (i) => i);
}

abstract class CopyWith$Query$MyAddresses<TRes> {
  factory CopyWith$Query$MyAddresses(
    Query$MyAddresses instance,
    TRes Function(Query$MyAddresses) then,
  ) = _CopyWithImpl$Query$MyAddresses;

  factory CopyWith$Query$MyAddresses.stub(TRes res) =
      _CopyWithStubImpl$Query$MyAddresses;

  TRes call({List<Fragment$AddressFields>? myAddresses, String? $__typename});
  TRes myAddresses(
    Iterable<Fragment$AddressFields> Function(
      Iterable<CopyWith$Fragment$AddressFields<Fragment$AddressFields>>,
    )
    _fn,
  );
}

class _CopyWithImpl$Query$MyAddresses<TRes>
    implements CopyWith$Query$MyAddresses<TRes> {
  _CopyWithImpl$Query$MyAddresses(this._instance, this._then);

  final Query$MyAddresses _instance;

  final TRes Function(Query$MyAddresses) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? myAddresses = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Query$MyAddresses(
      myAddresses: myAddresses == _undefined || myAddresses == null
          ? _instance.myAddresses
          : (myAddresses as List<Fragment$AddressFields>),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  TRes myAddresses(
    Iterable<Fragment$AddressFields> Function(
      Iterable<CopyWith$Fragment$AddressFields<Fragment$AddressFields>>,
    )
    _fn,
  ) => call(
    myAddresses: _fn(
      _instance.myAddresses.map(
        (e) => CopyWith$Fragment$AddressFields(e, (i) => i),
      ),
    ).toList(),
  );
}

class _CopyWithStubImpl$Query$MyAddresses<TRes>
    implements CopyWith$Query$MyAddresses<TRes> {
  _CopyWithStubImpl$Query$MyAddresses(this._res);

  TRes _res;

  call({List<Fragment$AddressFields>? myAddresses, String? $__typename}) =>
      _res;

  myAddresses(_fn) => _res;
}

const documentNodeQueryMyAddresses = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.query,
      name: NameNode(value: 'MyAddresses'),
      variableDefinitions: [],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'myAddresses'),
            alias: null,
            arguments: [],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'AddressFields'),
                  directives: [],
                ),
                FieldNode(
                  name: NameNode(value: '__typename'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: null,
                ),
              ],
            ),
          ),
          FieldNode(
            name: NameNode(value: '__typename'),
            alias: null,
            arguments: [],
            directives: [],
            selectionSet: null,
          ),
        ],
      ),
    ),
    fragmentDefinitionAddressFields,
  ],
);

class Variables$Mutation$AddAddress {
  factory Variables$Mutation$AddAddress({
    required String label,
    required String line1,
    String? line2,
    required String city,
    required String pincode,
    required String phone,
    required double lat,
    required double lng,
    bool? isDefault,
  }) => Variables$Mutation$AddAddress._({
    r'label': label,
    r'line1': line1,
    if (line2 != null) r'line2': line2,
    r'city': city,
    r'pincode': pincode,
    r'phone': phone,
    r'lat': lat,
    r'lng': lng,
    if (isDefault != null) r'isDefault': isDefault,
  });

  Variables$Mutation$AddAddress._(this._$data);

  factory Variables$Mutation$AddAddress.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    final l$label = data['label'];
    result$data['label'] = (l$label as String);
    final l$line1 = data['line1'];
    result$data['line1'] = (l$line1 as String);
    if (data.containsKey('line2')) {
      final l$line2 = data['line2'];
      result$data['line2'] = (l$line2 as String?);
    }
    final l$city = data['city'];
    result$data['city'] = (l$city as String);
    final l$pincode = data['pincode'];
    result$data['pincode'] = (l$pincode as String);
    final l$phone = data['phone'];
    result$data['phone'] = (l$phone as String);
    final l$lat = data['lat'];
    result$data['lat'] = (l$lat as num).toDouble();
    final l$lng = data['lng'];
    result$data['lng'] = (l$lng as num).toDouble();
    if (data.containsKey('isDefault')) {
      final l$isDefault = data['isDefault'];
      result$data['isDefault'] = (l$isDefault as bool?);
    }
    return Variables$Mutation$AddAddress._(result$data);
  }

  Map<String, dynamic> _$data;

  String get label => (_$data['label'] as String);

  String get line1 => (_$data['line1'] as String);

  String? get line2 => (_$data['line2'] as String?);

  String get city => (_$data['city'] as String);

  String get pincode => (_$data['pincode'] as String);

  String get phone => (_$data['phone'] as String);

  double get lat => (_$data['lat'] as double);

  double get lng => (_$data['lng'] as double);

  bool? get isDefault => (_$data['isDefault'] as bool?);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$label = label;
    result$data['label'] = l$label;
    final l$line1 = line1;
    result$data['line1'] = l$line1;
    if (_$data.containsKey('line2')) {
      final l$line2 = line2;
      result$data['line2'] = l$line2;
    }
    final l$city = city;
    result$data['city'] = l$city;
    final l$pincode = pincode;
    result$data['pincode'] = l$pincode;
    final l$phone = phone;
    result$data['phone'] = l$phone;
    final l$lat = lat;
    result$data['lat'] = l$lat;
    final l$lng = lng;
    result$data['lng'] = l$lng;
    if (_$data.containsKey('isDefault')) {
      final l$isDefault = isDefault;
      result$data['isDefault'] = l$isDefault;
    }
    return result$data;
  }

  CopyWith$Variables$Mutation$AddAddress<Variables$Mutation$AddAddress>
  get copyWith => CopyWith$Variables$Mutation$AddAddress(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$AddAddress ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$label = label;
    final lOther$label = other.label;
    if (l$label != lOther$label) {
      return false;
    }
    final l$line1 = line1;
    final lOther$line1 = other.line1;
    if (l$line1 != lOther$line1) {
      return false;
    }
    final l$line2 = line2;
    final lOther$line2 = other.line2;
    if (_$data.containsKey('line2') != other._$data.containsKey('line2')) {
      return false;
    }
    if (l$line2 != lOther$line2) {
      return false;
    }
    final l$city = city;
    final lOther$city = other.city;
    if (l$city != lOther$city) {
      return false;
    }
    final l$pincode = pincode;
    final lOther$pincode = other.pincode;
    if (l$pincode != lOther$pincode) {
      return false;
    }
    final l$phone = phone;
    final lOther$phone = other.phone;
    if (l$phone != lOther$phone) {
      return false;
    }
    final l$lat = lat;
    final lOther$lat = other.lat;
    if (l$lat != lOther$lat) {
      return false;
    }
    final l$lng = lng;
    final lOther$lng = other.lng;
    if (l$lng != lOther$lng) {
      return false;
    }
    final l$isDefault = isDefault;
    final lOther$isDefault = other.isDefault;
    if (_$data.containsKey('isDefault') !=
        other._$data.containsKey('isDefault')) {
      return false;
    }
    if (l$isDefault != lOther$isDefault) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$label = label;
    final l$line1 = line1;
    final l$line2 = line2;
    final l$city = city;
    final l$pincode = pincode;
    final l$phone = phone;
    final l$lat = lat;
    final l$lng = lng;
    final l$isDefault = isDefault;
    return Object.hashAll([
      l$label,
      l$line1,
      _$data.containsKey('line2') ? l$line2 : const {},
      l$city,
      l$pincode,
      l$phone,
      l$lat,
      l$lng,
      _$data.containsKey('isDefault') ? l$isDefault : const {},
    ]);
  }
}

abstract class CopyWith$Variables$Mutation$AddAddress<TRes> {
  factory CopyWith$Variables$Mutation$AddAddress(
    Variables$Mutation$AddAddress instance,
    TRes Function(Variables$Mutation$AddAddress) then,
  ) = _CopyWithImpl$Variables$Mutation$AddAddress;

  factory CopyWith$Variables$Mutation$AddAddress.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$AddAddress;

  TRes call({
    String? label,
    String? line1,
    String? line2,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
  });
}

class _CopyWithImpl$Variables$Mutation$AddAddress<TRes>
    implements CopyWith$Variables$Mutation$AddAddress<TRes> {
  _CopyWithImpl$Variables$Mutation$AddAddress(this._instance, this._then);

  final Variables$Mutation$AddAddress _instance;

  final TRes Function(Variables$Mutation$AddAddress) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? label = _undefined,
    Object? line1 = _undefined,
    Object? line2 = _undefined,
    Object? city = _undefined,
    Object? pincode = _undefined,
    Object? phone = _undefined,
    Object? lat = _undefined,
    Object? lng = _undefined,
    Object? isDefault = _undefined,
  }) => _then(
    Variables$Mutation$AddAddress._({
      ..._instance._$data,
      if (label != _undefined && label != null) 'label': (label as String),
      if (line1 != _undefined && line1 != null) 'line1': (line1 as String),
      if (line2 != _undefined) 'line2': (line2 as String?),
      if (city != _undefined && city != null) 'city': (city as String),
      if (pincode != _undefined && pincode != null)
        'pincode': (pincode as String),
      if (phone != _undefined && phone != null) 'phone': (phone as String),
      if (lat != _undefined && lat != null) 'lat': (lat as double),
      if (lng != _undefined && lng != null) 'lng': (lng as double),
      if (isDefault != _undefined) 'isDefault': (isDefault as bool?),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$AddAddress<TRes>
    implements CopyWith$Variables$Mutation$AddAddress<TRes> {
  _CopyWithStubImpl$Variables$Mutation$AddAddress(this._res);

  TRes _res;

  call({
    String? label,
    String? line1,
    String? line2,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
  }) => _res;
}

class Mutation$AddAddress {
  Mutation$AddAddress({
    required this.addAddress,
    this.$__typename = 'Mutation',
  });

  factory Mutation$AddAddress.fromJson(Map<String, dynamic> json) {
    final l$addAddress = json['addAddress'];
    final l$$__typename = json['__typename'];
    return Mutation$AddAddress(
      addAddress: Fragment$AddressFields.fromJson(
        (l$addAddress as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$AddressFields addAddress;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$addAddress = addAddress;
    _resultData['addAddress'] = l$addAddress.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$addAddress = addAddress;
    final l$$__typename = $__typename;
    return Object.hashAll([l$addAddress, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$AddAddress || runtimeType != other.runtimeType) {
      return false;
    }
    final l$addAddress = addAddress;
    final lOther$addAddress = other.addAddress;
    if (l$addAddress != lOther$addAddress) {
      return false;
    }
    final l$$__typename = $__typename;
    final lOther$$__typename = other.$__typename;
    if (l$$__typename != lOther$$__typename) {
      return false;
    }
    return true;
  }
}

extension UtilityExtension$Mutation$AddAddress on Mutation$AddAddress {
  CopyWith$Mutation$AddAddress<Mutation$AddAddress> get copyWith =>
      CopyWith$Mutation$AddAddress(this, (i) => i);
}

abstract class CopyWith$Mutation$AddAddress<TRes> {
  factory CopyWith$Mutation$AddAddress(
    Mutation$AddAddress instance,
    TRes Function(Mutation$AddAddress) then,
  ) = _CopyWithImpl$Mutation$AddAddress;

  factory CopyWith$Mutation$AddAddress.stub(TRes res) =
      _CopyWithStubImpl$Mutation$AddAddress;

  TRes call({Fragment$AddressFields? addAddress, String? $__typename});
  CopyWith$Fragment$AddressFields<TRes> get addAddress;
}

class _CopyWithImpl$Mutation$AddAddress<TRes>
    implements CopyWith$Mutation$AddAddress<TRes> {
  _CopyWithImpl$Mutation$AddAddress(this._instance, this._then);

  final Mutation$AddAddress _instance;

  final TRes Function(Mutation$AddAddress) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? addAddress = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$AddAddress(
      addAddress: addAddress == _undefined || addAddress == null
          ? _instance.addAddress
          : (addAddress as Fragment$AddressFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$AddressFields<TRes> get addAddress {
    final local$addAddress = _instance.addAddress;
    return CopyWith$Fragment$AddressFields(
      local$addAddress,
      (e) => call(addAddress: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$AddAddress<TRes>
    implements CopyWith$Mutation$AddAddress<TRes> {
  _CopyWithStubImpl$Mutation$AddAddress(this._res);

  TRes _res;

  call({Fragment$AddressFields? addAddress, String? $__typename}) => _res;

  CopyWith$Fragment$AddressFields<TRes> get addAddress =>
      CopyWith$Fragment$AddressFields.stub(_res);
}

const documentNodeMutationAddAddress = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'AddAddress'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'label')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'line1')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'line2')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'city')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'pincode')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'phone')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'lat')),
          type: NamedTypeNode(name: NameNode(value: 'Float'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'lng')),
          type: NamedTypeNode(name: NameNode(value: 'Float'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'isDefault')),
          type: NamedTypeNode(
            name: NameNode(value: 'Boolean'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'addAddress'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'label'),
                value: VariableNode(name: NameNode(value: 'label')),
              ),
              ArgumentNode(
                name: NameNode(value: 'line1'),
                value: VariableNode(name: NameNode(value: 'line1')),
              ),
              ArgumentNode(
                name: NameNode(value: 'line2'),
                value: VariableNode(name: NameNode(value: 'line2')),
              ),
              ArgumentNode(
                name: NameNode(value: 'city'),
                value: VariableNode(name: NameNode(value: 'city')),
              ),
              ArgumentNode(
                name: NameNode(value: 'pincode'),
                value: VariableNode(name: NameNode(value: 'pincode')),
              ),
              ArgumentNode(
                name: NameNode(value: 'phone'),
                value: VariableNode(name: NameNode(value: 'phone')),
              ),
              ArgumentNode(
                name: NameNode(value: 'lat'),
                value: VariableNode(name: NameNode(value: 'lat')),
              ),
              ArgumentNode(
                name: NameNode(value: 'lng'),
                value: VariableNode(name: NameNode(value: 'lng')),
              ),
              ArgumentNode(
                name: NameNode(value: 'isDefault'),
                value: VariableNode(name: NameNode(value: 'isDefault')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'AddressFields'),
                  directives: [],
                ),
                FieldNode(
                  name: NameNode(value: '__typename'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: null,
                ),
              ],
            ),
          ),
          FieldNode(
            name: NameNode(value: '__typename'),
            alias: null,
            arguments: [],
            directives: [],
            selectionSet: null,
          ),
        ],
      ),
    ),
    fragmentDefinitionAddressFields,
  ],
);

class Variables$Mutation$UpdateAddress {
  factory Variables$Mutation$UpdateAddress({
    required String id,
    String? label,
    String? line1,
    String? line2,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
  }) => Variables$Mutation$UpdateAddress._({
    r'id': id,
    if (label != null) r'label': label,
    if (line1 != null) r'line1': line1,
    if (line2 != null) r'line2': line2,
    if (city != null) r'city': city,
    if (pincode != null) r'pincode': pincode,
    if (phone != null) r'phone': phone,
    if (lat != null) r'lat': lat,
    if (lng != null) r'lng': lng,
    if (isDefault != null) r'isDefault': isDefault,
  });

  Variables$Mutation$UpdateAddress._(this._$data);

  factory Variables$Mutation$UpdateAddress.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    final l$id = data['id'];
    result$data['id'] = (l$id as String);
    if (data.containsKey('label')) {
      final l$label = data['label'];
      result$data['label'] = (l$label as String?);
    }
    if (data.containsKey('line1')) {
      final l$line1 = data['line1'];
      result$data['line1'] = (l$line1 as String?);
    }
    if (data.containsKey('line2')) {
      final l$line2 = data['line2'];
      result$data['line2'] = (l$line2 as String?);
    }
    if (data.containsKey('city')) {
      final l$city = data['city'];
      result$data['city'] = (l$city as String?);
    }
    if (data.containsKey('pincode')) {
      final l$pincode = data['pincode'];
      result$data['pincode'] = (l$pincode as String?);
    }
    if (data.containsKey('phone')) {
      final l$phone = data['phone'];
      result$data['phone'] = (l$phone as String?);
    }
    if (data.containsKey('lat')) {
      final l$lat = data['lat'];
      result$data['lat'] = (l$lat as num?)?.toDouble();
    }
    if (data.containsKey('lng')) {
      final l$lng = data['lng'];
      result$data['lng'] = (l$lng as num?)?.toDouble();
    }
    if (data.containsKey('isDefault')) {
      final l$isDefault = data['isDefault'];
      result$data['isDefault'] = (l$isDefault as bool?);
    }
    return Variables$Mutation$UpdateAddress._(result$data);
  }

  Map<String, dynamic> _$data;

  String get id => (_$data['id'] as String);

  String? get label => (_$data['label'] as String?);

  String? get line1 => (_$data['line1'] as String?);

  String? get line2 => (_$data['line2'] as String?);

  String? get city => (_$data['city'] as String?);

  String? get pincode => (_$data['pincode'] as String?);

  String? get phone => (_$data['phone'] as String?);

  double? get lat => (_$data['lat'] as double?);

  double? get lng => (_$data['lng'] as double?);

  bool? get isDefault => (_$data['isDefault'] as bool?);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$id = id;
    result$data['id'] = l$id;
    if (_$data.containsKey('label')) {
      final l$label = label;
      result$data['label'] = l$label;
    }
    if (_$data.containsKey('line1')) {
      final l$line1 = line1;
      result$data['line1'] = l$line1;
    }
    if (_$data.containsKey('line2')) {
      final l$line2 = line2;
      result$data['line2'] = l$line2;
    }
    if (_$data.containsKey('city')) {
      final l$city = city;
      result$data['city'] = l$city;
    }
    if (_$data.containsKey('pincode')) {
      final l$pincode = pincode;
      result$data['pincode'] = l$pincode;
    }
    if (_$data.containsKey('phone')) {
      final l$phone = phone;
      result$data['phone'] = l$phone;
    }
    if (_$data.containsKey('lat')) {
      final l$lat = lat;
      result$data['lat'] = l$lat;
    }
    if (_$data.containsKey('lng')) {
      final l$lng = lng;
      result$data['lng'] = l$lng;
    }
    if (_$data.containsKey('isDefault')) {
      final l$isDefault = isDefault;
      result$data['isDefault'] = l$isDefault;
    }
    return result$data;
  }

  CopyWith$Variables$Mutation$UpdateAddress<Variables$Mutation$UpdateAddress>
  get copyWith => CopyWith$Variables$Mutation$UpdateAddress(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$UpdateAddress ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$label = label;
    final lOther$label = other.label;
    if (_$data.containsKey('label') != other._$data.containsKey('label')) {
      return false;
    }
    if (l$label != lOther$label) {
      return false;
    }
    final l$line1 = line1;
    final lOther$line1 = other.line1;
    if (_$data.containsKey('line1') != other._$data.containsKey('line1')) {
      return false;
    }
    if (l$line1 != lOther$line1) {
      return false;
    }
    final l$line2 = line2;
    final lOther$line2 = other.line2;
    if (_$data.containsKey('line2') != other._$data.containsKey('line2')) {
      return false;
    }
    if (l$line2 != lOther$line2) {
      return false;
    }
    final l$city = city;
    final lOther$city = other.city;
    if (_$data.containsKey('city') != other._$data.containsKey('city')) {
      return false;
    }
    if (l$city != lOther$city) {
      return false;
    }
    final l$pincode = pincode;
    final lOther$pincode = other.pincode;
    if (_$data.containsKey('pincode') != other._$data.containsKey('pincode')) {
      return false;
    }
    if (l$pincode != lOther$pincode) {
      return false;
    }
    final l$phone = phone;
    final lOther$phone = other.phone;
    if (_$data.containsKey('phone') != other._$data.containsKey('phone')) {
      return false;
    }
    if (l$phone != lOther$phone) {
      return false;
    }
    final l$lat = lat;
    final lOther$lat = other.lat;
    if (_$data.containsKey('lat') != other._$data.containsKey('lat')) {
      return false;
    }
    if (l$lat != lOther$lat) {
      return false;
    }
    final l$lng = lng;
    final lOther$lng = other.lng;
    if (_$data.containsKey('lng') != other._$data.containsKey('lng')) {
      return false;
    }
    if (l$lng != lOther$lng) {
      return false;
    }
    final l$isDefault = isDefault;
    final lOther$isDefault = other.isDefault;
    if (_$data.containsKey('isDefault') !=
        other._$data.containsKey('isDefault')) {
      return false;
    }
    if (l$isDefault != lOther$isDefault) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$label = label;
    final l$line1 = line1;
    final l$line2 = line2;
    final l$city = city;
    final l$pincode = pincode;
    final l$phone = phone;
    final l$lat = lat;
    final l$lng = lng;
    final l$isDefault = isDefault;
    return Object.hashAll([
      l$id,
      _$data.containsKey('label') ? l$label : const {},
      _$data.containsKey('line1') ? l$line1 : const {},
      _$data.containsKey('line2') ? l$line2 : const {},
      _$data.containsKey('city') ? l$city : const {},
      _$data.containsKey('pincode') ? l$pincode : const {},
      _$data.containsKey('phone') ? l$phone : const {},
      _$data.containsKey('lat') ? l$lat : const {},
      _$data.containsKey('lng') ? l$lng : const {},
      _$data.containsKey('isDefault') ? l$isDefault : const {},
    ]);
  }
}

abstract class CopyWith$Variables$Mutation$UpdateAddress<TRes> {
  factory CopyWith$Variables$Mutation$UpdateAddress(
    Variables$Mutation$UpdateAddress instance,
    TRes Function(Variables$Mutation$UpdateAddress) then,
  ) = _CopyWithImpl$Variables$Mutation$UpdateAddress;

  factory CopyWith$Variables$Mutation$UpdateAddress.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$UpdateAddress;

  TRes call({
    String? id,
    String? label,
    String? line1,
    String? line2,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
  });
}

class _CopyWithImpl$Variables$Mutation$UpdateAddress<TRes>
    implements CopyWith$Variables$Mutation$UpdateAddress<TRes> {
  _CopyWithImpl$Variables$Mutation$UpdateAddress(this._instance, this._then);

  final Variables$Mutation$UpdateAddress _instance;

  final TRes Function(Variables$Mutation$UpdateAddress) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? label = _undefined,
    Object? line1 = _undefined,
    Object? line2 = _undefined,
    Object? city = _undefined,
    Object? pincode = _undefined,
    Object? phone = _undefined,
    Object? lat = _undefined,
    Object? lng = _undefined,
    Object? isDefault = _undefined,
  }) => _then(
    Variables$Mutation$UpdateAddress._({
      ..._instance._$data,
      if (id != _undefined && id != null) 'id': (id as String),
      if (label != _undefined) 'label': (label as String?),
      if (line1 != _undefined) 'line1': (line1 as String?),
      if (line2 != _undefined) 'line2': (line2 as String?),
      if (city != _undefined) 'city': (city as String?),
      if (pincode != _undefined) 'pincode': (pincode as String?),
      if (phone != _undefined) 'phone': (phone as String?),
      if (lat != _undefined) 'lat': (lat as double?),
      if (lng != _undefined) 'lng': (lng as double?),
      if (isDefault != _undefined) 'isDefault': (isDefault as bool?),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$UpdateAddress<TRes>
    implements CopyWith$Variables$Mutation$UpdateAddress<TRes> {
  _CopyWithStubImpl$Variables$Mutation$UpdateAddress(this._res);

  TRes _res;

  call({
    String? id,
    String? label,
    String? line1,
    String? line2,
    String? city,
    String? pincode,
    String? phone,
    double? lat,
    double? lng,
    bool? isDefault,
  }) => _res;
}

class Mutation$UpdateAddress {
  Mutation$UpdateAddress({
    required this.updateAddress,
    this.$__typename = 'Mutation',
  });

  factory Mutation$UpdateAddress.fromJson(Map<String, dynamic> json) {
    final l$updateAddress = json['updateAddress'];
    final l$$__typename = json['__typename'];
    return Mutation$UpdateAddress(
      updateAddress: Fragment$AddressFields.fromJson(
        (l$updateAddress as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$AddressFields updateAddress;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$updateAddress = updateAddress;
    _resultData['updateAddress'] = l$updateAddress.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$updateAddress = updateAddress;
    final l$$__typename = $__typename;
    return Object.hashAll([l$updateAddress, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$UpdateAddress || runtimeType != other.runtimeType) {
      return false;
    }
    final l$updateAddress = updateAddress;
    final lOther$updateAddress = other.updateAddress;
    if (l$updateAddress != lOther$updateAddress) {
      return false;
    }
    final l$$__typename = $__typename;
    final lOther$$__typename = other.$__typename;
    if (l$$__typename != lOther$$__typename) {
      return false;
    }
    return true;
  }
}

extension UtilityExtension$Mutation$UpdateAddress on Mutation$UpdateAddress {
  CopyWith$Mutation$UpdateAddress<Mutation$UpdateAddress> get copyWith =>
      CopyWith$Mutation$UpdateAddress(this, (i) => i);
}

abstract class CopyWith$Mutation$UpdateAddress<TRes> {
  factory CopyWith$Mutation$UpdateAddress(
    Mutation$UpdateAddress instance,
    TRes Function(Mutation$UpdateAddress) then,
  ) = _CopyWithImpl$Mutation$UpdateAddress;

  factory CopyWith$Mutation$UpdateAddress.stub(TRes res) =
      _CopyWithStubImpl$Mutation$UpdateAddress;

  TRes call({Fragment$AddressFields? updateAddress, String? $__typename});
  CopyWith$Fragment$AddressFields<TRes> get updateAddress;
}

class _CopyWithImpl$Mutation$UpdateAddress<TRes>
    implements CopyWith$Mutation$UpdateAddress<TRes> {
  _CopyWithImpl$Mutation$UpdateAddress(this._instance, this._then);

  final Mutation$UpdateAddress _instance;

  final TRes Function(Mutation$UpdateAddress) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? updateAddress = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$UpdateAddress(
      updateAddress: updateAddress == _undefined || updateAddress == null
          ? _instance.updateAddress
          : (updateAddress as Fragment$AddressFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$AddressFields<TRes> get updateAddress {
    final local$updateAddress = _instance.updateAddress;
    return CopyWith$Fragment$AddressFields(
      local$updateAddress,
      (e) => call(updateAddress: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$UpdateAddress<TRes>
    implements CopyWith$Mutation$UpdateAddress<TRes> {
  _CopyWithStubImpl$Mutation$UpdateAddress(this._res);

  TRes _res;

  call({Fragment$AddressFields? updateAddress, String? $__typename}) => _res;

  CopyWith$Fragment$AddressFields<TRes> get updateAddress =>
      CopyWith$Fragment$AddressFields.stub(_res);
}

const documentNodeMutationUpdateAddress = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'UpdateAddress'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'id')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'label')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'line1')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'line2')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'city')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'pincode')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'phone')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'lat')),
          type: NamedTypeNode(name: NameNode(value: 'Float'), isNonNull: false),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'lng')),
          type: NamedTypeNode(name: NameNode(value: 'Float'), isNonNull: false),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'isDefault')),
          type: NamedTypeNode(
            name: NameNode(value: 'Boolean'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'updateAddress'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'id'),
                value: VariableNode(name: NameNode(value: 'id')),
              ),
              ArgumentNode(
                name: NameNode(value: 'label'),
                value: VariableNode(name: NameNode(value: 'label')),
              ),
              ArgumentNode(
                name: NameNode(value: 'line1'),
                value: VariableNode(name: NameNode(value: 'line1')),
              ),
              ArgumentNode(
                name: NameNode(value: 'line2'),
                value: VariableNode(name: NameNode(value: 'line2')),
              ),
              ArgumentNode(
                name: NameNode(value: 'city'),
                value: VariableNode(name: NameNode(value: 'city')),
              ),
              ArgumentNode(
                name: NameNode(value: 'pincode'),
                value: VariableNode(name: NameNode(value: 'pincode')),
              ),
              ArgumentNode(
                name: NameNode(value: 'phone'),
                value: VariableNode(name: NameNode(value: 'phone')),
              ),
              ArgumentNode(
                name: NameNode(value: 'lat'),
                value: VariableNode(name: NameNode(value: 'lat')),
              ),
              ArgumentNode(
                name: NameNode(value: 'lng'),
                value: VariableNode(name: NameNode(value: 'lng')),
              ),
              ArgumentNode(
                name: NameNode(value: 'isDefault'),
                value: VariableNode(name: NameNode(value: 'isDefault')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'AddressFields'),
                  directives: [],
                ),
                FieldNode(
                  name: NameNode(value: '__typename'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: null,
                ),
              ],
            ),
          ),
          FieldNode(
            name: NameNode(value: '__typename'),
            alias: null,
            arguments: [],
            directives: [],
            selectionSet: null,
          ),
        ],
      ),
    ),
    fragmentDefinitionAddressFields,
  ],
);

class Variables$Mutation$DeleteAddress {
  factory Variables$Mutation$DeleteAddress({required String id}) =>
      Variables$Mutation$DeleteAddress._({r'id': id});

  Variables$Mutation$DeleteAddress._(this._$data);

  factory Variables$Mutation$DeleteAddress.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    final l$id = data['id'];
    result$data['id'] = (l$id as String);
    return Variables$Mutation$DeleteAddress._(result$data);
  }

  Map<String, dynamic> _$data;

  String get id => (_$data['id'] as String);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$id = id;
    result$data['id'] = l$id;
    return result$data;
  }

  CopyWith$Variables$Mutation$DeleteAddress<Variables$Mutation$DeleteAddress>
  get copyWith => CopyWith$Variables$Mutation$DeleteAddress(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$DeleteAddress ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$id = id;
    return Object.hashAll([l$id]);
  }
}

abstract class CopyWith$Variables$Mutation$DeleteAddress<TRes> {
  factory CopyWith$Variables$Mutation$DeleteAddress(
    Variables$Mutation$DeleteAddress instance,
    TRes Function(Variables$Mutation$DeleteAddress) then,
  ) = _CopyWithImpl$Variables$Mutation$DeleteAddress;

  factory CopyWith$Variables$Mutation$DeleteAddress.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$DeleteAddress;

  TRes call({String? id});
}

class _CopyWithImpl$Variables$Mutation$DeleteAddress<TRes>
    implements CopyWith$Variables$Mutation$DeleteAddress<TRes> {
  _CopyWithImpl$Variables$Mutation$DeleteAddress(this._instance, this._then);

  final Variables$Mutation$DeleteAddress _instance;

  final TRes Function(Variables$Mutation$DeleteAddress) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? id = _undefined}) => _then(
    Variables$Mutation$DeleteAddress._({
      ..._instance._$data,
      if (id != _undefined && id != null) 'id': (id as String),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$DeleteAddress<TRes>
    implements CopyWith$Variables$Mutation$DeleteAddress<TRes> {
  _CopyWithStubImpl$Variables$Mutation$DeleteAddress(this._res);

  TRes _res;

  call({String? id}) => _res;
}

class Mutation$DeleteAddress {
  Mutation$DeleteAddress({
    required this.deleteAddress,
    this.$__typename = 'Mutation',
  });

  factory Mutation$DeleteAddress.fromJson(Map<String, dynamic> json) {
    final l$deleteAddress = json['deleteAddress'];
    final l$$__typename = json['__typename'];
    return Mutation$DeleteAddress(
      deleteAddress: (l$deleteAddress as bool),
      $__typename: (l$$__typename as String),
    );
  }

  final bool deleteAddress;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$deleteAddress = deleteAddress;
    _resultData['deleteAddress'] = l$deleteAddress;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$deleteAddress = deleteAddress;
    final l$$__typename = $__typename;
    return Object.hashAll([l$deleteAddress, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$DeleteAddress || runtimeType != other.runtimeType) {
      return false;
    }
    final l$deleteAddress = deleteAddress;
    final lOther$deleteAddress = other.deleteAddress;
    if (l$deleteAddress != lOther$deleteAddress) {
      return false;
    }
    final l$$__typename = $__typename;
    final lOther$$__typename = other.$__typename;
    if (l$$__typename != lOther$$__typename) {
      return false;
    }
    return true;
  }
}

extension UtilityExtension$Mutation$DeleteAddress on Mutation$DeleteAddress {
  CopyWith$Mutation$DeleteAddress<Mutation$DeleteAddress> get copyWith =>
      CopyWith$Mutation$DeleteAddress(this, (i) => i);
}

abstract class CopyWith$Mutation$DeleteAddress<TRes> {
  factory CopyWith$Mutation$DeleteAddress(
    Mutation$DeleteAddress instance,
    TRes Function(Mutation$DeleteAddress) then,
  ) = _CopyWithImpl$Mutation$DeleteAddress;

  factory CopyWith$Mutation$DeleteAddress.stub(TRes res) =
      _CopyWithStubImpl$Mutation$DeleteAddress;

  TRes call({bool? deleteAddress, String? $__typename});
}

class _CopyWithImpl$Mutation$DeleteAddress<TRes>
    implements CopyWith$Mutation$DeleteAddress<TRes> {
  _CopyWithImpl$Mutation$DeleteAddress(this._instance, this._then);

  final Mutation$DeleteAddress _instance;

  final TRes Function(Mutation$DeleteAddress) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? deleteAddress = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$DeleteAddress(
      deleteAddress: deleteAddress == _undefined || deleteAddress == null
          ? _instance.deleteAddress
          : (deleteAddress as bool),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );
}

class _CopyWithStubImpl$Mutation$DeleteAddress<TRes>
    implements CopyWith$Mutation$DeleteAddress<TRes> {
  _CopyWithStubImpl$Mutation$DeleteAddress(this._res);

  TRes _res;

  call({bool? deleteAddress, String? $__typename}) => _res;
}

const documentNodeMutationDeleteAddress = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'DeleteAddress'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'id')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'deleteAddress'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'id'),
                value: VariableNode(name: NameNode(value: 'id')),
              ),
            ],
            directives: [],
            selectionSet: null,
          ),
          FieldNode(
            name: NameNode(value: '__typename'),
            alias: null,
            arguments: [],
            directives: [],
            selectionSet: null,
          ),
        ],
      ),
    ),
  ],
);
