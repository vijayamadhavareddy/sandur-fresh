import 'package:gql/ast.dart';

class Fragment$OrderItemFields {
  Fragment$OrderItemFields({
    required this.id,
    required this.productId,
    required this.name,
    required this.unit,
    required this.unitPrice,
    required this.mrp,
    required this.quantity,
    this.$__typename = 'AppOrderItem',
  });

  factory Fragment$OrderItemFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$productId = json['productId'];
    final l$name = json['name'];
    final l$unit = json['unit'];
    final l$unitPrice = json['unitPrice'];
    final l$mrp = json['mrp'];
    final l$quantity = json['quantity'];
    final l$$__typename = json['__typename'];
    return Fragment$OrderItemFields(
      id: (l$id as String),
      productId: (l$productId as String),
      name: (l$name as String),
      unit: (l$unit as String),
      unitPrice: (l$unitPrice as int),
      mrp: (l$mrp as int),
      quantity: (l$quantity as int),
      $__typename: (l$$__typename as String),
    );
  }

  final String id;

  final String productId;

  final String name;

  final String unit;

  final int unitPrice;

  final int mrp;

  final int quantity;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$id = id;
    _resultData['id'] = l$id;
    final l$productId = productId;
    _resultData['productId'] = l$productId;
    final l$name = name;
    _resultData['name'] = l$name;
    final l$unit = unit;
    _resultData['unit'] = l$unit;
    final l$unitPrice = unitPrice;
    _resultData['unitPrice'] = l$unitPrice;
    final l$mrp = mrp;
    _resultData['mrp'] = l$mrp;
    final l$quantity = quantity;
    _resultData['quantity'] = l$quantity;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$productId = productId;
    final l$name = name;
    final l$unit = unit;
    final l$unitPrice = unitPrice;
    final l$mrp = mrp;
    final l$quantity = quantity;
    final l$$__typename = $__typename;
    return Object.hashAll([
      l$id,
      l$productId,
      l$name,
      l$unit,
      l$unitPrice,
      l$mrp,
      l$quantity,
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$OrderItemFields ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$productId = productId;
    final lOther$productId = other.productId;
    if (l$productId != lOther$productId) {
      return false;
    }
    final l$name = name;
    final lOther$name = other.name;
    if (l$name != lOther$name) {
      return false;
    }
    final l$unit = unit;
    final lOther$unit = other.unit;
    if (l$unit != lOther$unit) {
      return false;
    }
    final l$unitPrice = unitPrice;
    final lOther$unitPrice = other.unitPrice;
    if (l$unitPrice != lOther$unitPrice) {
      return false;
    }
    final l$mrp = mrp;
    final lOther$mrp = other.mrp;
    if (l$mrp != lOther$mrp) {
      return false;
    }
    final l$quantity = quantity;
    final lOther$quantity = other.quantity;
    if (l$quantity != lOther$quantity) {
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

extension UtilityExtension$Fragment$OrderItemFields
    on Fragment$OrderItemFields {
  CopyWith$Fragment$OrderItemFields<Fragment$OrderItemFields> get copyWith =>
      CopyWith$Fragment$OrderItemFields(this, (i) => i);
}

abstract class CopyWith$Fragment$OrderItemFields<TRes> {
  factory CopyWith$Fragment$OrderItemFields(
    Fragment$OrderItemFields instance,
    TRes Function(Fragment$OrderItemFields) then,
  ) = _CopyWithImpl$Fragment$OrderItemFields;

  factory CopyWith$Fragment$OrderItemFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$OrderItemFields;

  TRes call({
    String? id,
    String? productId,
    String? name,
    String? unit,
    int? unitPrice,
    int? mrp,
    int? quantity,
    String? $__typename,
  });
}

class _CopyWithImpl$Fragment$OrderItemFields<TRes>
    implements CopyWith$Fragment$OrderItemFields<TRes> {
  _CopyWithImpl$Fragment$OrderItemFields(this._instance, this._then);

  final Fragment$OrderItemFields _instance;

  final TRes Function(Fragment$OrderItemFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? productId = _undefined,
    Object? name = _undefined,
    Object? unit = _undefined,
    Object? unitPrice = _undefined,
    Object? mrp = _undefined,
    Object? quantity = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$OrderItemFields(
      id: id == _undefined || id == null ? _instance.id : (id as String),
      productId: productId == _undefined || productId == null
          ? _instance.productId
          : (productId as String),
      name: name == _undefined || name == null
          ? _instance.name
          : (name as String),
      unit: unit == _undefined || unit == null
          ? _instance.unit
          : (unit as String),
      unitPrice: unitPrice == _undefined || unitPrice == null
          ? _instance.unitPrice
          : (unitPrice as int),
      mrp: mrp == _undefined || mrp == null ? _instance.mrp : (mrp as int),
      quantity: quantity == _undefined || quantity == null
          ? _instance.quantity
          : (quantity as int),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );
}

class _CopyWithStubImpl$Fragment$OrderItemFields<TRes>
    implements CopyWith$Fragment$OrderItemFields<TRes> {
  _CopyWithStubImpl$Fragment$OrderItemFields(this._res);

  TRes _res;

  call({
    String? id,
    String? productId,
    String? name,
    String? unit,
    int? unitPrice,
    int? mrp,
    int? quantity,
    String? $__typename,
  }) => _res;
}

const fragmentDefinitionOrderItemFields = FragmentDefinitionNode(
  name: NameNode(value: 'OrderItemFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(name: NameNode(value: 'AppOrderItem'), isNonNull: false),
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
        name: NameNode(value: 'productId'),
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
        name: NameNode(value: 'unit'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'unitPrice'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'mrp'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'quantity'),
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
const documentNodeFragmentOrderItemFields = DocumentNode(
  definitions: [fragmentDefinitionOrderItemFields],
);

class Fragment$OrderFields {
  Fragment$OrderFields({
    required this.id,
    required this.userId,
    required this.storeId,
    required this.addressId,
    required this.status,
    required this.subtotal,
    required this.deliveryFee,
    required this.discount,
    required this.total,
    required this.paymentMethod,
    required this.idempotencyKey,
    required this.placedAt,
    required this.items,
    this.$__typename = 'AppOrder',
  });

  factory Fragment$OrderFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$userId = json['userId'];
    final l$storeId = json['storeId'];
    final l$addressId = json['addressId'];
    final l$status = json['status'];
    final l$subtotal = json['subtotal'];
    final l$deliveryFee = json['deliveryFee'];
    final l$discount = json['discount'];
    final l$total = json['total'];
    final l$paymentMethod = json['paymentMethod'];
    final l$idempotencyKey = json['idempotencyKey'];
    final l$placedAt = json['placedAt'];
    final l$items = json['items'];
    final l$$__typename = json['__typename'];
    return Fragment$OrderFields(
      id: (l$id as String),
      userId: (l$userId as String),
      storeId: (l$storeId as String),
      addressId: (l$addressId as String),
      status: (l$status as String),
      subtotal: (l$subtotal as int),
      deliveryFee: (l$deliveryFee as int),
      discount: (l$discount as int),
      total: (l$total as int),
      paymentMethod: (l$paymentMethod as String),
      idempotencyKey: (l$idempotencyKey as String),
      placedAt: (l$placedAt as String),
      items: (l$items as List<dynamic>)
          .map(
            (e) =>
                Fragment$OrderItemFields.fromJson((e as Map<String, dynamic>)),
          )
          .toList(),
      $__typename: (l$$__typename as String),
    );
  }

  final String id;

  final String userId;

  final String storeId;

  final String addressId;

  final String status;

  final int subtotal;

  final int deliveryFee;

  final int discount;

  final int total;

  final String paymentMethod;

  final String idempotencyKey;

  final String placedAt;

  final List<Fragment$OrderItemFields> items;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$id = id;
    _resultData['id'] = l$id;
    final l$userId = userId;
    _resultData['userId'] = l$userId;
    final l$storeId = storeId;
    _resultData['storeId'] = l$storeId;
    final l$addressId = addressId;
    _resultData['addressId'] = l$addressId;
    final l$status = status;
    _resultData['status'] = l$status;
    final l$subtotal = subtotal;
    _resultData['subtotal'] = l$subtotal;
    final l$deliveryFee = deliveryFee;
    _resultData['deliveryFee'] = l$deliveryFee;
    final l$discount = discount;
    _resultData['discount'] = l$discount;
    final l$total = total;
    _resultData['total'] = l$total;
    final l$paymentMethod = paymentMethod;
    _resultData['paymentMethod'] = l$paymentMethod;
    final l$idempotencyKey = idempotencyKey;
    _resultData['idempotencyKey'] = l$idempotencyKey;
    final l$placedAt = placedAt;
    _resultData['placedAt'] = l$placedAt;
    final l$items = items;
    _resultData['items'] = l$items.map((e) => e.toJson()).toList();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$userId = userId;
    final l$storeId = storeId;
    final l$addressId = addressId;
    final l$status = status;
    final l$subtotal = subtotal;
    final l$deliveryFee = deliveryFee;
    final l$discount = discount;
    final l$total = total;
    final l$paymentMethod = paymentMethod;
    final l$idempotencyKey = idempotencyKey;
    final l$placedAt = placedAt;
    final l$items = items;
    final l$$__typename = $__typename;
    return Object.hashAll([
      l$id,
      l$userId,
      l$storeId,
      l$addressId,
      l$status,
      l$subtotal,
      l$deliveryFee,
      l$discount,
      l$total,
      l$paymentMethod,
      l$idempotencyKey,
      l$placedAt,
      Object.hashAll(l$items.map((v) => v)),
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$OrderFields || runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$userId = userId;
    final lOther$userId = other.userId;
    if (l$userId != lOther$userId) {
      return false;
    }
    final l$storeId = storeId;
    final lOther$storeId = other.storeId;
    if (l$storeId != lOther$storeId) {
      return false;
    }
    final l$addressId = addressId;
    final lOther$addressId = other.addressId;
    if (l$addressId != lOther$addressId) {
      return false;
    }
    final l$status = status;
    final lOther$status = other.status;
    if (l$status != lOther$status) {
      return false;
    }
    final l$subtotal = subtotal;
    final lOther$subtotal = other.subtotal;
    if (l$subtotal != lOther$subtotal) {
      return false;
    }
    final l$deliveryFee = deliveryFee;
    final lOther$deliveryFee = other.deliveryFee;
    if (l$deliveryFee != lOther$deliveryFee) {
      return false;
    }
    final l$discount = discount;
    final lOther$discount = other.discount;
    if (l$discount != lOther$discount) {
      return false;
    }
    final l$total = total;
    final lOther$total = other.total;
    if (l$total != lOther$total) {
      return false;
    }
    final l$paymentMethod = paymentMethod;
    final lOther$paymentMethod = other.paymentMethod;
    if (l$paymentMethod != lOther$paymentMethod) {
      return false;
    }
    final l$idempotencyKey = idempotencyKey;
    final lOther$idempotencyKey = other.idempotencyKey;
    if (l$idempotencyKey != lOther$idempotencyKey) {
      return false;
    }
    final l$placedAt = placedAt;
    final lOther$placedAt = other.placedAt;
    if (l$placedAt != lOther$placedAt) {
      return false;
    }
    final l$items = items;
    final lOther$items = other.items;
    if (l$items.length != lOther$items.length) {
      return false;
    }
    for (int i = 0; i < l$items.length; i++) {
      final l$items$entry = l$items[i];
      final lOther$items$entry = lOther$items[i];
      if (l$items$entry != lOther$items$entry) {
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

extension UtilityExtension$Fragment$OrderFields on Fragment$OrderFields {
  CopyWith$Fragment$OrderFields<Fragment$OrderFields> get copyWith =>
      CopyWith$Fragment$OrderFields(this, (i) => i);
}

abstract class CopyWith$Fragment$OrderFields<TRes> {
  factory CopyWith$Fragment$OrderFields(
    Fragment$OrderFields instance,
    TRes Function(Fragment$OrderFields) then,
  ) = _CopyWithImpl$Fragment$OrderFields;

  factory CopyWith$Fragment$OrderFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$OrderFields;

  TRes call({
    String? id,
    String? userId,
    String? storeId,
    String? addressId,
    String? status,
    int? subtotal,
    int? deliveryFee,
    int? discount,
    int? total,
    String? paymentMethod,
    String? idempotencyKey,
    String? placedAt,
    List<Fragment$OrderItemFields>? items,
    String? $__typename,
  });
  TRes items(
    Iterable<Fragment$OrderItemFields> Function(
      Iterable<CopyWith$Fragment$OrderItemFields<Fragment$OrderItemFields>>,
    )
    _fn,
  );
}

class _CopyWithImpl$Fragment$OrderFields<TRes>
    implements CopyWith$Fragment$OrderFields<TRes> {
  _CopyWithImpl$Fragment$OrderFields(this._instance, this._then);

  final Fragment$OrderFields _instance;

  final TRes Function(Fragment$OrderFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? userId = _undefined,
    Object? storeId = _undefined,
    Object? addressId = _undefined,
    Object? status = _undefined,
    Object? subtotal = _undefined,
    Object? deliveryFee = _undefined,
    Object? discount = _undefined,
    Object? total = _undefined,
    Object? paymentMethod = _undefined,
    Object? idempotencyKey = _undefined,
    Object? placedAt = _undefined,
    Object? items = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$OrderFields(
      id: id == _undefined || id == null ? _instance.id : (id as String),
      userId: userId == _undefined || userId == null
          ? _instance.userId
          : (userId as String),
      storeId: storeId == _undefined || storeId == null
          ? _instance.storeId
          : (storeId as String),
      addressId: addressId == _undefined || addressId == null
          ? _instance.addressId
          : (addressId as String),
      status: status == _undefined || status == null
          ? _instance.status
          : (status as String),
      subtotal: subtotal == _undefined || subtotal == null
          ? _instance.subtotal
          : (subtotal as int),
      deliveryFee: deliveryFee == _undefined || deliveryFee == null
          ? _instance.deliveryFee
          : (deliveryFee as int),
      discount: discount == _undefined || discount == null
          ? _instance.discount
          : (discount as int),
      total: total == _undefined || total == null
          ? _instance.total
          : (total as int),
      paymentMethod: paymentMethod == _undefined || paymentMethod == null
          ? _instance.paymentMethod
          : (paymentMethod as String),
      idempotencyKey: idempotencyKey == _undefined || idempotencyKey == null
          ? _instance.idempotencyKey
          : (idempotencyKey as String),
      placedAt: placedAt == _undefined || placedAt == null
          ? _instance.placedAt
          : (placedAt as String),
      items: items == _undefined || items == null
          ? _instance.items
          : (items as List<Fragment$OrderItemFields>),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  TRes items(
    Iterable<Fragment$OrderItemFields> Function(
      Iterable<CopyWith$Fragment$OrderItemFields<Fragment$OrderItemFields>>,
    )
    _fn,
  ) => call(
    items: _fn(
      _instance.items.map(
        (e) => CopyWith$Fragment$OrderItemFields(e, (i) => i),
      ),
    ).toList(),
  );
}

class _CopyWithStubImpl$Fragment$OrderFields<TRes>
    implements CopyWith$Fragment$OrderFields<TRes> {
  _CopyWithStubImpl$Fragment$OrderFields(this._res);

  TRes _res;

  call({
    String? id,
    String? userId,
    String? storeId,
    String? addressId,
    String? status,
    int? subtotal,
    int? deliveryFee,
    int? discount,
    int? total,
    String? paymentMethod,
    String? idempotencyKey,
    String? placedAt,
    List<Fragment$OrderItemFields>? items,
    String? $__typename,
  }) => _res;

  items(_fn) => _res;
}

const fragmentDefinitionOrderFields = FragmentDefinitionNode(
  name: NameNode(value: 'OrderFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(name: NameNode(value: 'AppOrder'), isNonNull: false),
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
        name: NameNode(value: 'userId'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'storeId'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'addressId'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'status'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'subtotal'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'deliveryFee'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'discount'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'total'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'paymentMethod'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'idempotencyKey'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'placedAt'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'items'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: SelectionSetNode(
          selections: [
            FragmentSpreadNode(
              name: NameNode(value: 'OrderItemFields'),
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
);
const documentNodeFragmentOrderFields = DocumentNode(
  definitions: [
    fragmentDefinitionOrderFields,
    fragmentDefinitionOrderItemFields,
  ],
);

class Variables$Query$MyOrders {
  factory Variables$Query$MyOrders({int? page, int? limit}) =>
      Variables$Query$MyOrders._({
        if (page != null) r'page': page,
        if (limit != null) r'limit': limit,
      });

  Variables$Query$MyOrders._(this._$data);

  factory Variables$Query$MyOrders.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    if (data.containsKey('page')) {
      final l$page = data['page'];
      result$data['page'] = (l$page as int?);
    }
    if (data.containsKey('limit')) {
      final l$limit = data['limit'];
      result$data['limit'] = (l$limit as int?);
    }
    return Variables$Query$MyOrders._(result$data);
  }

  Map<String, dynamic> _$data;

  int? get page => (_$data['page'] as int?);

  int? get limit => (_$data['limit'] as int?);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    if (_$data.containsKey('page')) {
      final l$page = page;
      result$data['page'] = l$page;
    }
    if (_$data.containsKey('limit')) {
      final l$limit = limit;
      result$data['limit'] = l$limit;
    }
    return result$data;
  }

  CopyWith$Variables$Query$MyOrders<Variables$Query$MyOrders> get copyWith =>
      CopyWith$Variables$Query$MyOrders(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Query$MyOrders ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$page = page;
    final lOther$page = other.page;
    if (_$data.containsKey('page') != other._$data.containsKey('page')) {
      return false;
    }
    if (l$page != lOther$page) {
      return false;
    }
    final l$limit = limit;
    final lOther$limit = other.limit;
    if (_$data.containsKey('limit') != other._$data.containsKey('limit')) {
      return false;
    }
    if (l$limit != lOther$limit) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$page = page;
    final l$limit = limit;
    return Object.hashAll([
      _$data.containsKey('page') ? l$page : const {},
      _$data.containsKey('limit') ? l$limit : const {},
    ]);
  }
}

abstract class CopyWith$Variables$Query$MyOrders<TRes> {
  factory CopyWith$Variables$Query$MyOrders(
    Variables$Query$MyOrders instance,
    TRes Function(Variables$Query$MyOrders) then,
  ) = _CopyWithImpl$Variables$Query$MyOrders;

  factory CopyWith$Variables$Query$MyOrders.stub(TRes res) =
      _CopyWithStubImpl$Variables$Query$MyOrders;

  TRes call({int? page, int? limit});
}

class _CopyWithImpl$Variables$Query$MyOrders<TRes>
    implements CopyWith$Variables$Query$MyOrders<TRes> {
  _CopyWithImpl$Variables$Query$MyOrders(this._instance, this._then);

  final Variables$Query$MyOrders _instance;

  final TRes Function(Variables$Query$MyOrders) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? page = _undefined, Object? limit = _undefined}) => _then(
    Variables$Query$MyOrders._({
      ..._instance._$data,
      if (page != _undefined) 'page': (page as int?),
      if (limit != _undefined) 'limit': (limit as int?),
    }),
  );
}

class _CopyWithStubImpl$Variables$Query$MyOrders<TRes>
    implements CopyWith$Variables$Query$MyOrders<TRes> {
  _CopyWithStubImpl$Variables$Query$MyOrders(this._res);

  TRes _res;

  call({int? page, int? limit}) => _res;
}

class Query$MyOrders {
  Query$MyOrders({required this.myOrders, this.$__typename = 'Query'});

  factory Query$MyOrders.fromJson(Map<String, dynamic> json) {
    final l$myOrders = json['myOrders'];
    final l$$__typename = json['__typename'];
    return Query$MyOrders(
      myOrders: Query$MyOrders$myOrders.fromJson(
        (l$myOrders as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Query$MyOrders$myOrders myOrders;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$myOrders = myOrders;
    _resultData['myOrders'] = l$myOrders.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$myOrders = myOrders;
    final l$$__typename = $__typename;
    return Object.hashAll([l$myOrders, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Query$MyOrders || runtimeType != other.runtimeType) {
      return false;
    }
    final l$myOrders = myOrders;
    final lOther$myOrders = other.myOrders;
    if (l$myOrders != lOther$myOrders) {
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

extension UtilityExtension$Query$MyOrders on Query$MyOrders {
  CopyWith$Query$MyOrders<Query$MyOrders> get copyWith =>
      CopyWith$Query$MyOrders(this, (i) => i);
}

abstract class CopyWith$Query$MyOrders<TRes> {
  factory CopyWith$Query$MyOrders(
    Query$MyOrders instance,
    TRes Function(Query$MyOrders) then,
  ) = _CopyWithImpl$Query$MyOrders;

  factory CopyWith$Query$MyOrders.stub(TRes res) =
      _CopyWithStubImpl$Query$MyOrders;

  TRes call({Query$MyOrders$myOrders? myOrders, String? $__typename});
  CopyWith$Query$MyOrders$myOrders<TRes> get myOrders;
}

class _CopyWithImpl$Query$MyOrders<TRes>
    implements CopyWith$Query$MyOrders<TRes> {
  _CopyWithImpl$Query$MyOrders(this._instance, this._then);

  final Query$MyOrders _instance;

  final TRes Function(Query$MyOrders) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? myOrders = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Query$MyOrders(
      myOrders: myOrders == _undefined || myOrders == null
          ? _instance.myOrders
          : (myOrders as Query$MyOrders$myOrders),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Query$MyOrders$myOrders<TRes> get myOrders {
    final local$myOrders = _instance.myOrders;
    return CopyWith$Query$MyOrders$myOrders(
      local$myOrders,
      (e) => call(myOrders: e),
    );
  }
}

class _CopyWithStubImpl$Query$MyOrders<TRes>
    implements CopyWith$Query$MyOrders<TRes> {
  _CopyWithStubImpl$Query$MyOrders(this._res);

  TRes _res;

  call({Query$MyOrders$myOrders? myOrders, String? $__typename}) => _res;

  CopyWith$Query$MyOrders$myOrders<TRes> get myOrders =>
      CopyWith$Query$MyOrders$myOrders.stub(_res);
}

const documentNodeQueryMyOrders = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.query,
      name: NameNode(value: 'MyOrders'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'page')),
          type: NamedTypeNode(name: NameNode(value: 'Int'), isNonNull: false),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'limit')),
          type: NamedTypeNode(name: NameNode(value: 'Int'), isNonNull: false),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'myOrders'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'page'),
                value: VariableNode(name: NameNode(value: 'page')),
              ),
              ArgumentNode(
                name: NameNode(value: 'limit'),
                value: VariableNode(name: NameNode(value: 'limit')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FieldNode(
                  name: NameNode(value: 'items'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: SelectionSetNode(
                    selections: [
                      FragmentSpreadNode(
                        name: NameNode(value: 'OrderFields'),
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
                  name: NameNode(value: 'page'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: null,
                ),
                FieldNode(
                  name: NameNode(value: 'limit'),
                  alias: null,
                  arguments: [],
                  directives: [],
                  selectionSet: null,
                ),
                FieldNode(
                  name: NameNode(value: 'total'),
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
    fragmentDefinitionOrderFields,
    fragmentDefinitionOrderItemFields,
  ],
);

class Query$MyOrders$myOrders {
  Query$MyOrders$myOrders({
    required this.items,
    required this.page,
    required this.limit,
    required this.total,
    this.$__typename = 'AppOrdersPage',
  });

  factory Query$MyOrders$myOrders.fromJson(Map<String, dynamic> json) {
    final l$items = json['items'];
    final l$page = json['page'];
    final l$limit = json['limit'];
    final l$total = json['total'];
    final l$$__typename = json['__typename'];
    return Query$MyOrders$myOrders(
      items: (l$items as List<dynamic>)
          .map(
            (e) => Fragment$OrderFields.fromJson((e as Map<String, dynamic>)),
          )
          .toList(),
      page: (l$page as int),
      limit: (l$limit as int),
      total: (l$total as int),
      $__typename: (l$$__typename as String),
    );
  }

  final List<Fragment$OrderFields> items;

  final int page;

  final int limit;

  final int total;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$items = items;
    _resultData['items'] = l$items.map((e) => e.toJson()).toList();
    final l$page = page;
    _resultData['page'] = l$page;
    final l$limit = limit;
    _resultData['limit'] = l$limit;
    final l$total = total;
    _resultData['total'] = l$total;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$items = items;
    final l$page = page;
    final l$limit = limit;
    final l$total = total;
    final l$$__typename = $__typename;
    return Object.hashAll([
      Object.hashAll(l$items.map((v) => v)),
      l$page,
      l$limit,
      l$total,
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Query$MyOrders$myOrders || runtimeType != other.runtimeType) {
      return false;
    }
    final l$items = items;
    final lOther$items = other.items;
    if (l$items.length != lOther$items.length) {
      return false;
    }
    for (int i = 0; i < l$items.length; i++) {
      final l$items$entry = l$items[i];
      final lOther$items$entry = lOther$items[i];
      if (l$items$entry != lOther$items$entry) {
        return false;
      }
    }
    final l$page = page;
    final lOther$page = other.page;
    if (l$page != lOther$page) {
      return false;
    }
    final l$limit = limit;
    final lOther$limit = other.limit;
    if (l$limit != lOther$limit) {
      return false;
    }
    final l$total = total;
    final lOther$total = other.total;
    if (l$total != lOther$total) {
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

extension UtilityExtension$Query$MyOrders$myOrders on Query$MyOrders$myOrders {
  CopyWith$Query$MyOrders$myOrders<Query$MyOrders$myOrders> get copyWith =>
      CopyWith$Query$MyOrders$myOrders(this, (i) => i);
}

abstract class CopyWith$Query$MyOrders$myOrders<TRes> {
  factory CopyWith$Query$MyOrders$myOrders(
    Query$MyOrders$myOrders instance,
    TRes Function(Query$MyOrders$myOrders) then,
  ) = _CopyWithImpl$Query$MyOrders$myOrders;

  factory CopyWith$Query$MyOrders$myOrders.stub(TRes res) =
      _CopyWithStubImpl$Query$MyOrders$myOrders;

  TRes call({
    List<Fragment$OrderFields>? items,
    int? page,
    int? limit,
    int? total,
    String? $__typename,
  });
  TRes items(
    Iterable<Fragment$OrderFields> Function(
      Iterable<CopyWith$Fragment$OrderFields<Fragment$OrderFields>>,
    )
    _fn,
  );
}

class _CopyWithImpl$Query$MyOrders$myOrders<TRes>
    implements CopyWith$Query$MyOrders$myOrders<TRes> {
  _CopyWithImpl$Query$MyOrders$myOrders(this._instance, this._then);

  final Query$MyOrders$myOrders _instance;

  final TRes Function(Query$MyOrders$myOrders) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? items = _undefined,
    Object? page = _undefined,
    Object? limit = _undefined,
    Object? total = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Query$MyOrders$myOrders(
      items: items == _undefined || items == null
          ? _instance.items
          : (items as List<Fragment$OrderFields>),
      page: page == _undefined || page == null ? _instance.page : (page as int),
      limit: limit == _undefined || limit == null
          ? _instance.limit
          : (limit as int),
      total: total == _undefined || total == null
          ? _instance.total
          : (total as int),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  TRes items(
    Iterable<Fragment$OrderFields> Function(
      Iterable<CopyWith$Fragment$OrderFields<Fragment$OrderFields>>,
    )
    _fn,
  ) => call(
    items: _fn(
      _instance.items.map((e) => CopyWith$Fragment$OrderFields(e, (i) => i)),
    ).toList(),
  );
}

class _CopyWithStubImpl$Query$MyOrders$myOrders<TRes>
    implements CopyWith$Query$MyOrders$myOrders<TRes> {
  _CopyWithStubImpl$Query$MyOrders$myOrders(this._res);

  TRes _res;

  call({
    List<Fragment$OrderFields>? items,
    int? page,
    int? limit,
    int? total,
    String? $__typename,
  }) => _res;

  items(_fn) => _res;
}

class Variables$Mutation$Checkout {
  factory Variables$Mutation$Checkout({
    required String addressId,
    String? paymentMethod,
    required String idempotencyKey,
  }) => Variables$Mutation$Checkout._({
    r'addressId': addressId,
    if (paymentMethod != null) r'paymentMethod': paymentMethod,
    r'idempotencyKey': idempotencyKey,
  });

  Variables$Mutation$Checkout._(this._$data);

  factory Variables$Mutation$Checkout.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    final l$addressId = data['addressId'];
    result$data['addressId'] = (l$addressId as String);
    if (data.containsKey('paymentMethod')) {
      final l$paymentMethod = data['paymentMethod'];
      result$data['paymentMethod'] = (l$paymentMethod as String?);
    }
    final l$idempotencyKey = data['idempotencyKey'];
    result$data['idempotencyKey'] = (l$idempotencyKey as String);
    return Variables$Mutation$Checkout._(result$data);
  }

  Map<String, dynamic> _$data;

  String get addressId => (_$data['addressId'] as String);

  String? get paymentMethod => (_$data['paymentMethod'] as String?);

  String get idempotencyKey => (_$data['idempotencyKey'] as String);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$addressId = addressId;
    result$data['addressId'] = l$addressId;
    if (_$data.containsKey('paymentMethod')) {
      final l$paymentMethod = paymentMethod;
      result$data['paymentMethod'] = l$paymentMethod;
    }
    final l$idempotencyKey = idempotencyKey;
    result$data['idempotencyKey'] = l$idempotencyKey;
    return result$data;
  }

  CopyWith$Variables$Mutation$Checkout<Variables$Mutation$Checkout>
  get copyWith => CopyWith$Variables$Mutation$Checkout(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$Checkout ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$addressId = addressId;
    final lOther$addressId = other.addressId;
    if (l$addressId != lOther$addressId) {
      return false;
    }
    final l$paymentMethod = paymentMethod;
    final lOther$paymentMethod = other.paymentMethod;
    if (_$data.containsKey('paymentMethod') !=
        other._$data.containsKey('paymentMethod')) {
      return false;
    }
    if (l$paymentMethod != lOther$paymentMethod) {
      return false;
    }
    final l$idempotencyKey = idempotencyKey;
    final lOther$idempotencyKey = other.idempotencyKey;
    if (l$idempotencyKey != lOther$idempotencyKey) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$addressId = addressId;
    final l$paymentMethod = paymentMethod;
    final l$idempotencyKey = idempotencyKey;
    return Object.hashAll([
      l$addressId,
      _$data.containsKey('paymentMethod') ? l$paymentMethod : const {},
      l$idempotencyKey,
    ]);
  }
}

abstract class CopyWith$Variables$Mutation$Checkout<TRes> {
  factory CopyWith$Variables$Mutation$Checkout(
    Variables$Mutation$Checkout instance,
    TRes Function(Variables$Mutation$Checkout) then,
  ) = _CopyWithImpl$Variables$Mutation$Checkout;

  factory CopyWith$Variables$Mutation$Checkout.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$Checkout;

  TRes call({String? addressId, String? paymentMethod, String? idempotencyKey});
}

class _CopyWithImpl$Variables$Mutation$Checkout<TRes>
    implements CopyWith$Variables$Mutation$Checkout<TRes> {
  _CopyWithImpl$Variables$Mutation$Checkout(this._instance, this._then);

  final Variables$Mutation$Checkout _instance;

  final TRes Function(Variables$Mutation$Checkout) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? addressId = _undefined,
    Object? paymentMethod = _undefined,
    Object? idempotencyKey = _undefined,
  }) => _then(
    Variables$Mutation$Checkout._({
      ..._instance._$data,
      if (addressId != _undefined && addressId != null)
        'addressId': (addressId as String),
      if (paymentMethod != _undefined)
        'paymentMethod': (paymentMethod as String?),
      if (idempotencyKey != _undefined && idempotencyKey != null)
        'idempotencyKey': (idempotencyKey as String),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$Checkout<TRes>
    implements CopyWith$Variables$Mutation$Checkout<TRes> {
  _CopyWithStubImpl$Variables$Mutation$Checkout(this._res);

  TRes _res;

  call({String? addressId, String? paymentMethod, String? idempotencyKey}) =>
      _res;
}

class Mutation$Checkout {
  Mutation$Checkout({required this.checkout, this.$__typename = 'Mutation'});

  factory Mutation$Checkout.fromJson(Map<String, dynamic> json) {
    final l$checkout = json['checkout'];
    final l$$__typename = json['__typename'];
    return Mutation$Checkout(
      checkout: Fragment$OrderFields.fromJson(
        (l$checkout as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$OrderFields checkout;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$checkout = checkout;
    _resultData['checkout'] = l$checkout.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$checkout = checkout;
    final l$$__typename = $__typename;
    return Object.hashAll([l$checkout, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$Checkout || runtimeType != other.runtimeType) {
      return false;
    }
    final l$checkout = checkout;
    final lOther$checkout = other.checkout;
    if (l$checkout != lOther$checkout) {
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

extension UtilityExtension$Mutation$Checkout on Mutation$Checkout {
  CopyWith$Mutation$Checkout<Mutation$Checkout> get copyWith =>
      CopyWith$Mutation$Checkout(this, (i) => i);
}

abstract class CopyWith$Mutation$Checkout<TRes> {
  factory CopyWith$Mutation$Checkout(
    Mutation$Checkout instance,
    TRes Function(Mutation$Checkout) then,
  ) = _CopyWithImpl$Mutation$Checkout;

  factory CopyWith$Mutation$Checkout.stub(TRes res) =
      _CopyWithStubImpl$Mutation$Checkout;

  TRes call({Fragment$OrderFields? checkout, String? $__typename});
  CopyWith$Fragment$OrderFields<TRes> get checkout;
}

class _CopyWithImpl$Mutation$Checkout<TRes>
    implements CopyWith$Mutation$Checkout<TRes> {
  _CopyWithImpl$Mutation$Checkout(this._instance, this._then);

  final Mutation$Checkout _instance;

  final TRes Function(Mutation$Checkout) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? checkout = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$Checkout(
      checkout: checkout == _undefined || checkout == null
          ? _instance.checkout
          : (checkout as Fragment$OrderFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$OrderFields<TRes> get checkout {
    final local$checkout = _instance.checkout;
    return CopyWith$Fragment$OrderFields(
      local$checkout,
      (e) => call(checkout: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$Checkout<TRes>
    implements CopyWith$Mutation$Checkout<TRes> {
  _CopyWithStubImpl$Mutation$Checkout(this._res);

  TRes _res;

  call({Fragment$OrderFields? checkout, String? $__typename}) => _res;

  CopyWith$Fragment$OrderFields<TRes> get checkout =>
      CopyWith$Fragment$OrderFields.stub(_res);
}

const documentNodeMutationCheckout = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'Checkout'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'addressId')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'paymentMethod')),
          type: NamedTypeNode(
            name: NameNode(value: 'String'),
            isNonNull: false,
          ),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'idempotencyKey')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'checkout'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'addressId'),
                value: VariableNode(name: NameNode(value: 'addressId')),
              ),
              ArgumentNode(
                name: NameNode(value: 'paymentMethod'),
                value: VariableNode(name: NameNode(value: 'paymentMethod')),
              ),
              ArgumentNode(
                name: NameNode(value: 'idempotencyKey'),
                value: VariableNode(name: NameNode(value: 'idempotencyKey')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'OrderFields'),
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
    fragmentDefinitionOrderFields,
    fragmentDefinitionOrderItemFields,
  ],
);
