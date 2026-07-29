import 'package:gql/ast.dart';

class Fragment$UserFields {
  Fragment$UserFields({
    required this.id,
    required this.phone,
    required this.name,
    this.email,
    required this.role,
    this.$__typename = 'AppUser',
  });

  factory Fragment$UserFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$phone = json['phone'];
    final l$name = json['name'];
    final l$email = json['email'];
    final l$role = json['role'];
    final l$$__typename = json['__typename'];
    return Fragment$UserFields(
      id: (l$id as String),
      phone: (l$phone as String),
      name: (l$name as String),
      email: (l$email as String?),
      role: (l$role as String),
      $__typename: (l$$__typename as String),
    );
  }

  final String id;

  final String phone;

  final String name;

  final String? email;

  final String role;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$id = id;
    _resultData['id'] = l$id;
    final l$phone = phone;
    _resultData['phone'] = l$phone;
    final l$name = name;
    _resultData['name'] = l$name;
    final l$email = email;
    _resultData['email'] = l$email;
    final l$role = role;
    _resultData['role'] = l$role;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$phone = phone;
    final l$name = name;
    final l$email = email;
    final l$role = role;
    final l$$__typename = $__typename;
    return Object.hashAll([
      l$id,
      l$phone,
      l$name,
      l$email,
      l$role,
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$UserFields || runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$phone = phone;
    final lOther$phone = other.phone;
    if (l$phone != lOther$phone) {
      return false;
    }
    final l$name = name;
    final lOther$name = other.name;
    if (l$name != lOther$name) {
      return false;
    }
    final l$email = email;
    final lOther$email = other.email;
    if (l$email != lOther$email) {
      return false;
    }
    final l$role = role;
    final lOther$role = other.role;
    if (l$role != lOther$role) {
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

extension UtilityExtension$Fragment$UserFields on Fragment$UserFields {
  CopyWith$Fragment$UserFields<Fragment$UserFields> get copyWith =>
      CopyWith$Fragment$UserFields(this, (i) => i);
}

abstract class CopyWith$Fragment$UserFields<TRes> {
  factory CopyWith$Fragment$UserFields(
    Fragment$UserFields instance,
    TRes Function(Fragment$UserFields) then,
  ) = _CopyWithImpl$Fragment$UserFields;

  factory CopyWith$Fragment$UserFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$UserFields;

  TRes call({
    String? id,
    String? phone,
    String? name,
    String? email,
    String? role,
    String? $__typename,
  });
}

class _CopyWithImpl$Fragment$UserFields<TRes>
    implements CopyWith$Fragment$UserFields<TRes> {
  _CopyWithImpl$Fragment$UserFields(this._instance, this._then);

  final Fragment$UserFields _instance;

  final TRes Function(Fragment$UserFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? phone = _undefined,
    Object? name = _undefined,
    Object? email = _undefined,
    Object? role = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$UserFields(
      id: id == _undefined || id == null ? _instance.id : (id as String),
      phone: phone == _undefined || phone == null
          ? _instance.phone
          : (phone as String),
      name: name == _undefined || name == null
          ? _instance.name
          : (name as String),
      email: email == _undefined ? _instance.email : (email as String?),
      role: role == _undefined || role == null
          ? _instance.role
          : (role as String),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );
}

class _CopyWithStubImpl$Fragment$UserFields<TRes>
    implements CopyWith$Fragment$UserFields<TRes> {
  _CopyWithStubImpl$Fragment$UserFields(this._res);

  TRes _res;

  call({
    String? id,
    String? phone,
    String? name,
    String? email,
    String? role,
    String? $__typename,
  }) => _res;
}

const fragmentDefinitionUserFields = FragmentDefinitionNode(
  name: NameNode(value: 'UserFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(name: NameNode(value: 'AppUser'), isNonNull: false),
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
        name: NameNode(value: 'phone'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'name'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'email'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'role'),
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
const documentNodeFragmentUserFields = DocumentNode(
  definitions: [fragmentDefinitionUserFields],
);

class Variables$Mutation$RequestOtp {
  factory Variables$Mutation$RequestOtp({required String phone}) =>
      Variables$Mutation$RequestOtp._({r'phone': phone});

  Variables$Mutation$RequestOtp._(this._$data);

  factory Variables$Mutation$RequestOtp.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    final l$phone = data['phone'];
    result$data['phone'] = (l$phone as String);
    return Variables$Mutation$RequestOtp._(result$data);
  }

  Map<String, dynamic> _$data;

  String get phone => (_$data['phone'] as String);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$phone = phone;
    result$data['phone'] = l$phone;
    return result$data;
  }

  CopyWith$Variables$Mutation$RequestOtp<Variables$Mutation$RequestOtp>
  get copyWith => CopyWith$Variables$Mutation$RequestOtp(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$RequestOtp ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$phone = phone;
    final lOther$phone = other.phone;
    if (l$phone != lOther$phone) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$phone = phone;
    return Object.hashAll([l$phone]);
  }
}

abstract class CopyWith$Variables$Mutation$RequestOtp<TRes> {
  factory CopyWith$Variables$Mutation$RequestOtp(
    Variables$Mutation$RequestOtp instance,
    TRes Function(Variables$Mutation$RequestOtp) then,
  ) = _CopyWithImpl$Variables$Mutation$RequestOtp;

  factory CopyWith$Variables$Mutation$RequestOtp.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$RequestOtp;

  TRes call({String? phone});
}

class _CopyWithImpl$Variables$Mutation$RequestOtp<TRes>
    implements CopyWith$Variables$Mutation$RequestOtp<TRes> {
  _CopyWithImpl$Variables$Mutation$RequestOtp(this._instance, this._then);

  final Variables$Mutation$RequestOtp _instance;

  final TRes Function(Variables$Mutation$RequestOtp) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? phone = _undefined}) => _then(
    Variables$Mutation$RequestOtp._({
      ..._instance._$data,
      if (phone != _undefined && phone != null) 'phone': (phone as String),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$RequestOtp<TRes>
    implements CopyWith$Variables$Mutation$RequestOtp<TRes> {
  _CopyWithStubImpl$Variables$Mutation$RequestOtp(this._res);

  TRes _res;

  call({String? phone}) => _res;
}

class Mutation$RequestOtp {
  Mutation$RequestOtp({
    required this.requestOtp,
    this.$__typename = 'Mutation',
  });

  factory Mutation$RequestOtp.fromJson(Map<String, dynamic> json) {
    final l$requestOtp = json['requestOtp'];
    final l$$__typename = json['__typename'];
    return Mutation$RequestOtp(
      requestOtp: Mutation$RequestOtp$requestOtp.fromJson(
        (l$requestOtp as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Mutation$RequestOtp$requestOtp requestOtp;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$requestOtp = requestOtp;
    _resultData['requestOtp'] = l$requestOtp.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$requestOtp = requestOtp;
    final l$$__typename = $__typename;
    return Object.hashAll([l$requestOtp, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$RequestOtp || runtimeType != other.runtimeType) {
      return false;
    }
    final l$requestOtp = requestOtp;
    final lOther$requestOtp = other.requestOtp;
    if (l$requestOtp != lOther$requestOtp) {
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

extension UtilityExtension$Mutation$RequestOtp on Mutation$RequestOtp {
  CopyWith$Mutation$RequestOtp<Mutation$RequestOtp> get copyWith =>
      CopyWith$Mutation$RequestOtp(this, (i) => i);
}

abstract class CopyWith$Mutation$RequestOtp<TRes> {
  factory CopyWith$Mutation$RequestOtp(
    Mutation$RequestOtp instance,
    TRes Function(Mutation$RequestOtp) then,
  ) = _CopyWithImpl$Mutation$RequestOtp;

  factory CopyWith$Mutation$RequestOtp.stub(TRes res) =
      _CopyWithStubImpl$Mutation$RequestOtp;

  TRes call({Mutation$RequestOtp$requestOtp? requestOtp, String? $__typename});
  CopyWith$Mutation$RequestOtp$requestOtp<TRes> get requestOtp;
}

class _CopyWithImpl$Mutation$RequestOtp<TRes>
    implements CopyWith$Mutation$RequestOtp<TRes> {
  _CopyWithImpl$Mutation$RequestOtp(this._instance, this._then);

  final Mutation$RequestOtp _instance;

  final TRes Function(Mutation$RequestOtp) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? requestOtp = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$RequestOtp(
      requestOtp: requestOtp == _undefined || requestOtp == null
          ? _instance.requestOtp
          : (requestOtp as Mutation$RequestOtp$requestOtp),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Mutation$RequestOtp$requestOtp<TRes> get requestOtp {
    final local$requestOtp = _instance.requestOtp;
    return CopyWith$Mutation$RequestOtp$requestOtp(
      local$requestOtp,
      (e) => call(requestOtp: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$RequestOtp<TRes>
    implements CopyWith$Mutation$RequestOtp<TRes> {
  _CopyWithStubImpl$Mutation$RequestOtp(this._res);

  TRes _res;

  call({Mutation$RequestOtp$requestOtp? requestOtp, String? $__typename}) =>
      _res;

  CopyWith$Mutation$RequestOtp$requestOtp<TRes> get requestOtp =>
      CopyWith$Mutation$RequestOtp$requestOtp.stub(_res);
}

const documentNodeMutationRequestOtp = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'RequestOtp'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'phone')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'requestOtp'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'phone'),
                value: VariableNode(name: NameNode(value: 'phone')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FieldNode(
                  name: NameNode(value: 'message'),
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

class Mutation$RequestOtp$requestOtp {
  Mutation$RequestOtp$requestOtp({
    required this.message,
    this.$__typename = 'AppRequestOtpPayload',
  });

  factory Mutation$RequestOtp$requestOtp.fromJson(Map<String, dynamic> json) {
    final l$message = json['message'];
    final l$$__typename = json['__typename'];
    return Mutation$RequestOtp$requestOtp(
      message: (l$message as String),
      $__typename: (l$$__typename as String),
    );
  }

  final String message;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$message = message;
    _resultData['message'] = l$message;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$message = message;
    final l$$__typename = $__typename;
    return Object.hashAll([l$message, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$RequestOtp$requestOtp ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$message = message;
    final lOther$message = other.message;
    if (l$message != lOther$message) {
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

extension UtilityExtension$Mutation$RequestOtp$requestOtp
    on Mutation$RequestOtp$requestOtp {
  CopyWith$Mutation$RequestOtp$requestOtp<Mutation$RequestOtp$requestOtp>
  get copyWith => CopyWith$Mutation$RequestOtp$requestOtp(this, (i) => i);
}

abstract class CopyWith$Mutation$RequestOtp$requestOtp<TRes> {
  factory CopyWith$Mutation$RequestOtp$requestOtp(
    Mutation$RequestOtp$requestOtp instance,
    TRes Function(Mutation$RequestOtp$requestOtp) then,
  ) = _CopyWithImpl$Mutation$RequestOtp$requestOtp;

  factory CopyWith$Mutation$RequestOtp$requestOtp.stub(TRes res) =
      _CopyWithStubImpl$Mutation$RequestOtp$requestOtp;

  TRes call({String? message, String? $__typename});
}

class _CopyWithImpl$Mutation$RequestOtp$requestOtp<TRes>
    implements CopyWith$Mutation$RequestOtp$requestOtp<TRes> {
  _CopyWithImpl$Mutation$RequestOtp$requestOtp(this._instance, this._then);

  final Mutation$RequestOtp$requestOtp _instance;

  final TRes Function(Mutation$RequestOtp$requestOtp) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? message = _undefined, Object? $__typename = _undefined}) =>
      _then(
        Mutation$RequestOtp$requestOtp(
          message: message == _undefined || message == null
              ? _instance.message
              : (message as String),
          $__typename: $__typename == _undefined || $__typename == null
              ? _instance.$__typename
              : ($__typename as String),
        ),
      );
}

class _CopyWithStubImpl$Mutation$RequestOtp$requestOtp<TRes>
    implements CopyWith$Mutation$RequestOtp$requestOtp<TRes> {
  _CopyWithStubImpl$Mutation$RequestOtp$requestOtp(this._res);

  TRes _res;

  call({String? message, String? $__typename}) => _res;
}

class Variables$Mutation$VerifyOtp {
  factory Variables$Mutation$VerifyOtp({
    required String phone,
    required String code,
  }) => Variables$Mutation$VerifyOtp._({r'phone': phone, r'code': code});

  Variables$Mutation$VerifyOtp._(this._$data);

  factory Variables$Mutation$VerifyOtp.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    final l$phone = data['phone'];
    result$data['phone'] = (l$phone as String);
    final l$code = data['code'];
    result$data['code'] = (l$code as String);
    return Variables$Mutation$VerifyOtp._(result$data);
  }

  Map<String, dynamic> _$data;

  String get phone => (_$data['phone'] as String);

  String get code => (_$data['code'] as String);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$phone = phone;
    result$data['phone'] = l$phone;
    final l$code = code;
    result$data['code'] = l$code;
    return result$data;
  }

  CopyWith$Variables$Mutation$VerifyOtp<Variables$Mutation$VerifyOtp>
  get copyWith => CopyWith$Variables$Mutation$VerifyOtp(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$VerifyOtp ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$phone = phone;
    final lOther$phone = other.phone;
    if (l$phone != lOther$phone) {
      return false;
    }
    final l$code = code;
    final lOther$code = other.code;
    if (l$code != lOther$code) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$phone = phone;
    final l$code = code;
    return Object.hashAll([l$phone, l$code]);
  }
}

abstract class CopyWith$Variables$Mutation$VerifyOtp<TRes> {
  factory CopyWith$Variables$Mutation$VerifyOtp(
    Variables$Mutation$VerifyOtp instance,
    TRes Function(Variables$Mutation$VerifyOtp) then,
  ) = _CopyWithImpl$Variables$Mutation$VerifyOtp;

  factory CopyWith$Variables$Mutation$VerifyOtp.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$VerifyOtp;

  TRes call({String? phone, String? code});
}

class _CopyWithImpl$Variables$Mutation$VerifyOtp<TRes>
    implements CopyWith$Variables$Mutation$VerifyOtp<TRes> {
  _CopyWithImpl$Variables$Mutation$VerifyOtp(this._instance, this._then);

  final Variables$Mutation$VerifyOtp _instance;

  final TRes Function(Variables$Mutation$VerifyOtp) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? phone = _undefined, Object? code = _undefined}) => _then(
    Variables$Mutation$VerifyOtp._({
      ..._instance._$data,
      if (phone != _undefined && phone != null) 'phone': (phone as String),
      if (code != _undefined && code != null) 'code': (code as String),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$VerifyOtp<TRes>
    implements CopyWith$Variables$Mutation$VerifyOtp<TRes> {
  _CopyWithStubImpl$Variables$Mutation$VerifyOtp(this._res);

  TRes _res;

  call({String? phone, String? code}) => _res;
}

class Mutation$VerifyOtp {
  Mutation$VerifyOtp({required this.verifyOtp, this.$__typename = 'Mutation'});

  factory Mutation$VerifyOtp.fromJson(Map<String, dynamic> json) {
    final l$verifyOtp = json['verifyOtp'];
    final l$$__typename = json['__typename'];
    return Mutation$VerifyOtp(
      verifyOtp: Mutation$VerifyOtp$verifyOtp.fromJson(
        (l$verifyOtp as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Mutation$VerifyOtp$verifyOtp verifyOtp;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$verifyOtp = verifyOtp;
    _resultData['verifyOtp'] = l$verifyOtp.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$verifyOtp = verifyOtp;
    final l$$__typename = $__typename;
    return Object.hashAll([l$verifyOtp, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$VerifyOtp || runtimeType != other.runtimeType) {
      return false;
    }
    final l$verifyOtp = verifyOtp;
    final lOther$verifyOtp = other.verifyOtp;
    if (l$verifyOtp != lOther$verifyOtp) {
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

extension UtilityExtension$Mutation$VerifyOtp on Mutation$VerifyOtp {
  CopyWith$Mutation$VerifyOtp<Mutation$VerifyOtp> get copyWith =>
      CopyWith$Mutation$VerifyOtp(this, (i) => i);
}

abstract class CopyWith$Mutation$VerifyOtp<TRes> {
  factory CopyWith$Mutation$VerifyOtp(
    Mutation$VerifyOtp instance,
    TRes Function(Mutation$VerifyOtp) then,
  ) = _CopyWithImpl$Mutation$VerifyOtp;

  factory CopyWith$Mutation$VerifyOtp.stub(TRes res) =
      _CopyWithStubImpl$Mutation$VerifyOtp;

  TRes call({Mutation$VerifyOtp$verifyOtp? verifyOtp, String? $__typename});
  CopyWith$Mutation$VerifyOtp$verifyOtp<TRes> get verifyOtp;
}

class _CopyWithImpl$Mutation$VerifyOtp<TRes>
    implements CopyWith$Mutation$VerifyOtp<TRes> {
  _CopyWithImpl$Mutation$VerifyOtp(this._instance, this._then);

  final Mutation$VerifyOtp _instance;

  final TRes Function(Mutation$VerifyOtp) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? verifyOtp = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$VerifyOtp(
      verifyOtp: verifyOtp == _undefined || verifyOtp == null
          ? _instance.verifyOtp
          : (verifyOtp as Mutation$VerifyOtp$verifyOtp),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Mutation$VerifyOtp$verifyOtp<TRes> get verifyOtp {
    final local$verifyOtp = _instance.verifyOtp;
    return CopyWith$Mutation$VerifyOtp$verifyOtp(
      local$verifyOtp,
      (e) => call(verifyOtp: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$VerifyOtp<TRes>
    implements CopyWith$Mutation$VerifyOtp<TRes> {
  _CopyWithStubImpl$Mutation$VerifyOtp(this._res);

  TRes _res;

  call({Mutation$VerifyOtp$verifyOtp? verifyOtp, String? $__typename}) => _res;

  CopyWith$Mutation$VerifyOtp$verifyOtp<TRes> get verifyOtp =>
      CopyWith$Mutation$VerifyOtp$verifyOtp.stub(_res);
}

const documentNodeMutationVerifyOtp = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'VerifyOtp'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'phone')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'code')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'verifyOtp'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'phone'),
                value: VariableNode(name: NameNode(value: 'phone')),
              ),
              ArgumentNode(
                name: NameNode(value: 'code'),
                value: VariableNode(name: NameNode(value: 'code')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FieldNode(
                  name: NameNode(value: 'token'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: null,
                ),
                FieldNode(
                  name: NameNode(value: 'user'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: SelectionSetNode(
                    selections: [
                      FragmentSpreadNode(
                        name: NameNode(value: 'UserFields'),
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
    fragmentDefinitionUserFields,
  ],
);

class Mutation$VerifyOtp$verifyOtp {
  Mutation$VerifyOtp$verifyOtp({
    required this.token,
    required this.user,
    this.$__typename = 'AppAuthPayload',
  });

  factory Mutation$VerifyOtp$verifyOtp.fromJson(Map<String, dynamic> json) {
    final l$token = json['token'];
    final l$user = json['user'];
    final l$$__typename = json['__typename'];
    return Mutation$VerifyOtp$verifyOtp(
      token: (l$token as String),
      user: Fragment$UserFields.fromJson((l$user as Map<String, dynamic>)),
      $__typename: (l$$__typename as String),
    );
  }

  final String token;

  final Fragment$UserFields user;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$token = token;
    _resultData['token'] = l$token;
    final l$user = user;
    _resultData['user'] = l$user.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$token = token;
    final l$user = user;
    final l$$__typename = $__typename;
    return Object.hashAll([l$token, l$user, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$VerifyOtp$verifyOtp ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$token = token;
    final lOther$token = other.token;
    if (l$token != lOther$token) {
      return false;
    }
    final l$user = user;
    final lOther$user = other.user;
    if (l$user != lOther$user) {
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

extension UtilityExtension$Mutation$VerifyOtp$verifyOtp
    on Mutation$VerifyOtp$verifyOtp {
  CopyWith$Mutation$VerifyOtp$verifyOtp<Mutation$VerifyOtp$verifyOtp>
  get copyWith => CopyWith$Mutation$VerifyOtp$verifyOtp(this, (i) => i);
}

abstract class CopyWith$Mutation$VerifyOtp$verifyOtp<TRes> {
  factory CopyWith$Mutation$VerifyOtp$verifyOtp(
    Mutation$VerifyOtp$verifyOtp instance,
    TRes Function(Mutation$VerifyOtp$verifyOtp) then,
  ) = _CopyWithImpl$Mutation$VerifyOtp$verifyOtp;

  factory CopyWith$Mutation$VerifyOtp$verifyOtp.stub(TRes res) =
      _CopyWithStubImpl$Mutation$VerifyOtp$verifyOtp;

  TRes call({String? token, Fragment$UserFields? user, String? $__typename});
  CopyWith$Fragment$UserFields<TRes> get user;
}

class _CopyWithImpl$Mutation$VerifyOtp$verifyOtp<TRes>
    implements CopyWith$Mutation$VerifyOtp$verifyOtp<TRes> {
  _CopyWithImpl$Mutation$VerifyOtp$verifyOtp(this._instance, this._then);

  final Mutation$VerifyOtp$verifyOtp _instance;

  final TRes Function(Mutation$VerifyOtp$verifyOtp) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? token = _undefined,
    Object? user = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$VerifyOtp$verifyOtp(
      token: token == _undefined || token == null
          ? _instance.token
          : (token as String),
      user: user == _undefined || user == null
          ? _instance.user
          : (user as Fragment$UserFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$UserFields<TRes> get user {
    final local$user = _instance.user;
    return CopyWith$Fragment$UserFields(local$user, (e) => call(user: e));
  }
}

class _CopyWithStubImpl$Mutation$VerifyOtp$verifyOtp<TRes>
    implements CopyWith$Mutation$VerifyOtp$verifyOtp<TRes> {
  _CopyWithStubImpl$Mutation$VerifyOtp$verifyOtp(this._res);

  TRes _res;

  call({String? token, Fragment$UserFields? user, String? $__typename}) => _res;

  CopyWith$Fragment$UserFields<TRes> get user =>
      CopyWith$Fragment$UserFields.stub(_res);
}

class Variables$Mutation$UpdateProfile {
  factory Variables$Mutation$UpdateProfile({String? name, String? email}) =>
      Variables$Mutation$UpdateProfile._({
        if (name != null) r'name': name,
        if (email != null) r'email': email,
      });

  Variables$Mutation$UpdateProfile._(this._$data);

  factory Variables$Mutation$UpdateProfile.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    if (data.containsKey('name')) {
      final l$name = data['name'];
      result$data['name'] = (l$name as String?);
    }
    if (data.containsKey('email')) {
      final l$email = data['email'];
      result$data['email'] = (l$email as String?);
    }
    return Variables$Mutation$UpdateProfile._(result$data);
  }

  Map<String, dynamic> _$data;

  String? get name => (_$data['name'] as String?);

  String? get email => (_$data['email'] as String?);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    if (_$data.containsKey('name')) {
      final l$name = name;
      result$data['name'] = l$name;
    }
    if (_$data.containsKey('email')) {
      final l$email = email;
      result$data['email'] = l$email;
    }
    return result$data;
  }

  CopyWith$Variables$Mutation$UpdateProfile<Variables$Mutation$UpdateProfile>
  get copyWith => CopyWith$Variables$Mutation$UpdateProfile(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$UpdateProfile ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$name = name;
    final lOther$name = other.name;
    if (_$data.containsKey('name') != other._$data.containsKey('name')) {
      return false;
    }
    if (l$name != lOther$name) {
      return false;
    }
    final l$email = email;
    final lOther$email = other.email;
    if (_$data.containsKey('email') != other._$data.containsKey('email')) {
      return false;
    }
    if (l$email != lOther$email) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$name = name;
    final l$email = email;
    return Object.hashAll([
      _$data.containsKey('name') ? l$name : const {},
      _$data.containsKey('email') ? l$email : const {},
    ]);
  }
}

abstract class CopyWith$Variables$Mutation$UpdateProfile<TRes> {
  factory CopyWith$Variables$Mutation$UpdateProfile(
    Variables$Mutation$UpdateProfile instance,
    TRes Function(Variables$Mutation$UpdateProfile) then,
  ) = _CopyWithImpl$Variables$Mutation$UpdateProfile;

  factory CopyWith$Variables$Mutation$UpdateProfile.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$UpdateProfile;

  TRes call({String? name, String? email});
}

class _CopyWithImpl$Variables$Mutation$UpdateProfile<TRes>
    implements CopyWith$Variables$Mutation$UpdateProfile<TRes> {
  _CopyWithImpl$Variables$Mutation$UpdateProfile(this._instance, this._then);

  final Variables$Mutation$UpdateProfile _instance;

  final TRes Function(Variables$Mutation$UpdateProfile) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? name = _undefined, Object? email = _undefined}) => _then(
    Variables$Mutation$UpdateProfile._({
      ..._instance._$data,
      if (name != _undefined) 'name': (name as String?),
      if (email != _undefined) 'email': (email as String?),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$UpdateProfile<TRes>
    implements CopyWith$Variables$Mutation$UpdateProfile<TRes> {
  _CopyWithStubImpl$Variables$Mutation$UpdateProfile(this._res);

  TRes _res;

  call({String? name, String? email}) => _res;
}

class Mutation$UpdateProfile {
  Mutation$UpdateProfile({
    required this.updateProfile,
    this.$__typename = 'Mutation',
  });

  factory Mutation$UpdateProfile.fromJson(Map<String, dynamic> json) {
    final l$updateProfile = json['updateProfile'];
    final l$$__typename = json['__typename'];
    return Mutation$UpdateProfile(
      updateProfile: Fragment$UserFields.fromJson(
        (l$updateProfile as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$UserFields updateProfile;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$updateProfile = updateProfile;
    _resultData['updateProfile'] = l$updateProfile.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$updateProfile = updateProfile;
    final l$$__typename = $__typename;
    return Object.hashAll([l$updateProfile, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$UpdateProfile || runtimeType != other.runtimeType) {
      return false;
    }
    final l$updateProfile = updateProfile;
    final lOther$updateProfile = other.updateProfile;
    if (l$updateProfile != lOther$updateProfile) {
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

extension UtilityExtension$Mutation$UpdateProfile on Mutation$UpdateProfile {
  CopyWith$Mutation$UpdateProfile<Mutation$UpdateProfile> get copyWith =>
      CopyWith$Mutation$UpdateProfile(this, (i) => i);
}

abstract class CopyWith$Mutation$UpdateProfile<TRes> {
  factory CopyWith$Mutation$UpdateProfile(
    Mutation$UpdateProfile instance,
    TRes Function(Mutation$UpdateProfile) then,
  ) = _CopyWithImpl$Mutation$UpdateProfile;

  factory CopyWith$Mutation$UpdateProfile.stub(TRes res) =
      _CopyWithStubImpl$Mutation$UpdateProfile;

  TRes call({Fragment$UserFields? updateProfile, String? $__typename});
  CopyWith$Fragment$UserFields<TRes> get updateProfile;
}

class _CopyWithImpl$Mutation$UpdateProfile<TRes>
    implements CopyWith$Mutation$UpdateProfile<TRes> {
  _CopyWithImpl$Mutation$UpdateProfile(this._instance, this._then);

  final Mutation$UpdateProfile _instance;

  final TRes Function(Mutation$UpdateProfile) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? updateProfile = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$UpdateProfile(
      updateProfile: updateProfile == _undefined || updateProfile == null
          ? _instance.updateProfile
          : (updateProfile as Fragment$UserFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$UserFields<TRes> get updateProfile {
    final local$updateProfile = _instance.updateProfile;
    return CopyWith$Fragment$UserFields(
      local$updateProfile,
      (e) => call(updateProfile: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$UpdateProfile<TRes>
    implements CopyWith$Mutation$UpdateProfile<TRes> {
  _CopyWithStubImpl$Mutation$UpdateProfile(this._res);

  TRes _res;

  call({Fragment$UserFields? updateProfile, String? $__typename}) => _res;

  CopyWith$Fragment$UserFields<TRes> get updateProfile =>
      CopyWith$Fragment$UserFields.stub(_res);
}

const documentNodeMutationUpdateProfile = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'UpdateProfile'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'name')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'email')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
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
            name: NameNode(value: 'updateProfile'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'name'),
                value: VariableNode(name: NameNode(value: 'name')),
              ),
              ArgumentNode(
                name: NameNode(value: 'email'),
                value: VariableNode(name: NameNode(value: 'email')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'UserFields'),
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
    fragmentDefinitionUserFields,
  ],
);

class Query$Me {
  Query$Me({required this.me, this.$__typename = 'Query'});

  factory Query$Me.fromJson(Map<String, dynamic> json) {
    final l$me = json['me'];
    final l$$__typename = json['__typename'];
    return Query$Me(
      me: Fragment$UserFields.fromJson((l$me as Map<String, dynamic>)),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$UserFields me;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$me = me;
    _resultData['me'] = l$me.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$me = me;
    final l$$__typename = $__typename;
    return Object.hashAll([l$me, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Query$Me || runtimeType != other.runtimeType) {
      return false;
    }
    final l$me = me;
    final lOther$me = other.me;
    if (l$me != lOther$me) {
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

extension UtilityExtension$Query$Me on Query$Me {
  CopyWith$Query$Me<Query$Me> get copyWith => CopyWith$Query$Me(this, (i) => i);
}

abstract class CopyWith$Query$Me<TRes> {
  factory CopyWith$Query$Me(Query$Me instance, TRes Function(Query$Me) then) =
      _CopyWithImpl$Query$Me;

  factory CopyWith$Query$Me.stub(TRes res) = _CopyWithStubImpl$Query$Me;

  TRes call({Fragment$UserFields? me, String? $__typename});
  CopyWith$Fragment$UserFields<TRes> get me;
}

class _CopyWithImpl$Query$Me<TRes> implements CopyWith$Query$Me<TRes> {
  _CopyWithImpl$Query$Me(this._instance, this._then);

  final Query$Me _instance;

  final TRes Function(Query$Me) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? me = _undefined, Object? $__typename = _undefined}) =>
      _then(
        Query$Me(
          me: me == _undefined || me == null
              ? _instance.me
              : (me as Fragment$UserFields),
          $__typename: $__typename == _undefined || $__typename == null
              ? _instance.$__typename
              : ($__typename as String),
        ),
      );

  CopyWith$Fragment$UserFields<TRes> get me {
    final local$me = _instance.me;
    return CopyWith$Fragment$UserFields(local$me, (e) => call(me: e));
  }
}

class _CopyWithStubImpl$Query$Me<TRes> implements CopyWith$Query$Me<TRes> {
  _CopyWithStubImpl$Query$Me(this._res);

  TRes _res;

  call({Fragment$UserFields? me, String? $__typename}) => _res;

  CopyWith$Fragment$UserFields<TRes> get me =>
      CopyWith$Fragment$UserFields.stub(_res);
}

const documentNodeQueryMe = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.query,
      name: NameNode(value: 'Me'),
      variableDefinitions: [],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'me'),
            alias: null,
            arguments: [],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'UserFields'),
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
    fragmentDefinitionUserFields,
  ],
);
