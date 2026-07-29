import 'package:gql/ast.dart';

class Fragment$CartItemFields {
  Fragment$CartItemFields({
    required this.id,
    required this.productId,
    required this.name,
    required this.unit,
    this.emoji,
    required this.price,
    required this.mrp,
    required this.quantity,
    required this.lineTotal,
    required this.lineSavings,
    this.$__typename = 'AppCartItem',
  });

  factory Fragment$CartItemFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$productId = json['productId'];
    final l$name = json['name'];
    final l$unit = json['unit'];
    final l$emoji = json['emoji'];
    final l$price = json['price'];
    final l$mrp = json['mrp'];
    final l$quantity = json['quantity'];
    final l$lineTotal = json['lineTotal'];
    final l$lineSavings = json['lineSavings'];
    final l$$__typename = json['__typename'];
    return Fragment$CartItemFields(
      id: (l$id as String),
      productId: (l$productId as String),
      name: (l$name as String),
      unit: (l$unit as String),
      emoji: (l$emoji as String?),
      price: (l$price as int),
      mrp: (l$mrp as int),
      quantity: (l$quantity as int),
      lineTotal: (l$lineTotal as int),
      lineSavings: (l$lineSavings as int),
      $__typename: (l$$__typename as String),
    );
  }

  final String id;

  final String productId;

  final String name;

  final String unit;

  final String? emoji;

  final int price;

  final int mrp;

  final int quantity;

  final int lineTotal;

  final int lineSavings;

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
    final l$emoji = emoji;
    _resultData['emoji'] = l$emoji;
    final l$price = price;
    _resultData['price'] = l$price;
    final l$mrp = mrp;
    _resultData['mrp'] = l$mrp;
    final l$quantity = quantity;
    _resultData['quantity'] = l$quantity;
    final l$lineTotal = lineTotal;
    _resultData['lineTotal'] = l$lineTotal;
    final l$lineSavings = lineSavings;
    _resultData['lineSavings'] = l$lineSavings;
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
    final l$emoji = emoji;
    final l$price = price;
    final l$mrp = mrp;
    final l$quantity = quantity;
    final l$lineTotal = lineTotal;
    final l$lineSavings = lineSavings;
    final l$$__typename = $__typename;
    return Object.hashAll([
      l$id,
      l$productId,
      l$name,
      l$unit,
      l$emoji,
      l$price,
      l$mrp,
      l$quantity,
      l$lineTotal,
      l$lineSavings,
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$CartItemFields || runtimeType != other.runtimeType) {
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
    final l$emoji = emoji;
    final lOther$emoji = other.emoji;
    if (l$emoji != lOther$emoji) {
      return false;
    }
    final l$price = price;
    final lOther$price = other.price;
    if (l$price != lOther$price) {
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
    final l$lineTotal = lineTotal;
    final lOther$lineTotal = other.lineTotal;
    if (l$lineTotal != lOther$lineTotal) {
      return false;
    }
    final l$lineSavings = lineSavings;
    final lOther$lineSavings = other.lineSavings;
    if (l$lineSavings != lOther$lineSavings) {
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

extension UtilityExtension$Fragment$CartItemFields on Fragment$CartItemFields {
  CopyWith$Fragment$CartItemFields<Fragment$CartItemFields> get copyWith =>
      CopyWith$Fragment$CartItemFields(this, (i) => i);
}

abstract class CopyWith$Fragment$CartItemFields<TRes> {
  factory CopyWith$Fragment$CartItemFields(
    Fragment$CartItemFields instance,
    TRes Function(Fragment$CartItemFields) then,
  ) = _CopyWithImpl$Fragment$CartItemFields;

  factory CopyWith$Fragment$CartItemFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$CartItemFields;

  TRes call({
    String? id,
    String? productId,
    String? name,
    String? unit,
    String? emoji,
    int? price,
    int? mrp,
    int? quantity,
    int? lineTotal,
    int? lineSavings,
    String? $__typename,
  });
}

class _CopyWithImpl$Fragment$CartItemFields<TRes>
    implements CopyWith$Fragment$CartItemFields<TRes> {
  _CopyWithImpl$Fragment$CartItemFields(this._instance, this._then);

  final Fragment$CartItemFields _instance;

  final TRes Function(Fragment$CartItemFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? productId = _undefined,
    Object? name = _undefined,
    Object? unit = _undefined,
    Object? emoji = _undefined,
    Object? price = _undefined,
    Object? mrp = _undefined,
    Object? quantity = _undefined,
    Object? lineTotal = _undefined,
    Object? lineSavings = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$CartItemFields(
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
      emoji: emoji == _undefined ? _instance.emoji : (emoji as String?),
      price: price == _undefined || price == null
          ? _instance.price
          : (price as int),
      mrp: mrp == _undefined || mrp == null ? _instance.mrp : (mrp as int),
      quantity: quantity == _undefined || quantity == null
          ? _instance.quantity
          : (quantity as int),
      lineTotal: lineTotal == _undefined || lineTotal == null
          ? _instance.lineTotal
          : (lineTotal as int),
      lineSavings: lineSavings == _undefined || lineSavings == null
          ? _instance.lineSavings
          : (lineSavings as int),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );
}

class _CopyWithStubImpl$Fragment$CartItemFields<TRes>
    implements CopyWith$Fragment$CartItemFields<TRes> {
  _CopyWithStubImpl$Fragment$CartItemFields(this._res);

  TRes _res;

  call({
    String? id,
    String? productId,
    String? name,
    String? unit,
    String? emoji,
    int? price,
    int? mrp,
    int? quantity,
    int? lineTotal,
    int? lineSavings,
    String? $__typename,
  }) => _res;
}

const fragmentDefinitionCartItemFields = FragmentDefinitionNode(
  name: NameNode(value: 'CartItemFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(name: NameNode(value: 'AppCartItem'), isNonNull: false),
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
        name: NameNode(value: 'emoji'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'price'),
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
        name: NameNode(value: 'lineTotal'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'lineSavings'),
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
const documentNodeFragmentCartItemFields = DocumentNode(
  definitions: [fragmentDefinitionCartItemFields],
);

class Fragment$CartFields {
  Fragment$CartFields({
    this.id,
    this.storeId,
    required this.items,
    required this.subtotal,
    required this.savings,
    required this.deliveryFee,
    required this.discount,
    required this.total,
    this.$__typename = 'AppCart',
  });

  factory Fragment$CartFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$storeId = json['storeId'];
    final l$items = json['items'];
    final l$subtotal = json['subtotal'];
    final l$savings = json['savings'];
    final l$deliveryFee = json['deliveryFee'];
    final l$discount = json['discount'];
    final l$total = json['total'];
    final l$$__typename = json['__typename'];
    return Fragment$CartFields(
      id: (l$id as String?),
      storeId: (l$storeId as String?),
      items: (l$items as List<dynamic>)
          .map(
            (e) =>
                Fragment$CartItemFields.fromJson((e as Map<String, dynamic>)),
          )
          .toList(),
      subtotal: (l$subtotal as int),
      savings: (l$savings as int),
      deliveryFee: (l$deliveryFee as int),
      discount: (l$discount as int),
      total: (l$total as int),
      $__typename: (l$$__typename as String),
    );
  }

  final String? id;

  final String? storeId;

  final List<Fragment$CartItemFields> items;

  final int subtotal;

  final int savings;

  final int deliveryFee;

  final int discount;

  final int total;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$id = id;
    _resultData['id'] = l$id;
    final l$storeId = storeId;
    _resultData['storeId'] = l$storeId;
    final l$items = items;
    _resultData['items'] = l$items.map((e) => e.toJson()).toList();
    final l$subtotal = subtotal;
    _resultData['subtotal'] = l$subtotal;
    final l$savings = savings;
    _resultData['savings'] = l$savings;
    final l$deliveryFee = deliveryFee;
    _resultData['deliveryFee'] = l$deliveryFee;
    final l$discount = discount;
    _resultData['discount'] = l$discount;
    final l$total = total;
    _resultData['total'] = l$total;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$storeId = storeId;
    final l$items = items;
    final l$subtotal = subtotal;
    final l$savings = savings;
    final l$deliveryFee = deliveryFee;
    final l$discount = discount;
    final l$total = total;
    final l$$__typename = $__typename;
    return Object.hashAll([
      l$id,
      l$storeId,
      Object.hashAll(l$items.map((v) => v)),
      l$subtotal,
      l$savings,
      l$deliveryFee,
      l$discount,
      l$total,
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$CartFields || runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$storeId = storeId;
    final lOther$storeId = other.storeId;
    if (l$storeId != lOther$storeId) {
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
    final l$subtotal = subtotal;
    final lOther$subtotal = other.subtotal;
    if (l$subtotal != lOther$subtotal) {
      return false;
    }
    final l$savings = savings;
    final lOther$savings = other.savings;
    if (l$savings != lOther$savings) {
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
    final l$$__typename = $__typename;
    final lOther$$__typename = other.$__typename;
    if (l$$__typename != lOther$$__typename) {
      return false;
    }
    return true;
  }
}

extension UtilityExtension$Fragment$CartFields on Fragment$CartFields {
  CopyWith$Fragment$CartFields<Fragment$CartFields> get copyWith =>
      CopyWith$Fragment$CartFields(this, (i) => i);
}

abstract class CopyWith$Fragment$CartFields<TRes> {
  factory CopyWith$Fragment$CartFields(
    Fragment$CartFields instance,
    TRes Function(Fragment$CartFields) then,
  ) = _CopyWithImpl$Fragment$CartFields;

  factory CopyWith$Fragment$CartFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$CartFields;

  TRes call({
    String? id,
    String? storeId,
    List<Fragment$CartItemFields>? items,
    int? subtotal,
    int? savings,
    int? deliveryFee,
    int? discount,
    int? total,
    String? $__typename,
  });
  TRes items(
    Iterable<Fragment$CartItemFields> Function(
      Iterable<CopyWith$Fragment$CartItemFields<Fragment$CartItemFields>>,
    )
    _fn,
  );
}

class _CopyWithImpl$Fragment$CartFields<TRes>
    implements CopyWith$Fragment$CartFields<TRes> {
  _CopyWithImpl$Fragment$CartFields(this._instance, this._then);

  final Fragment$CartFields _instance;

  final TRes Function(Fragment$CartFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? storeId = _undefined,
    Object? items = _undefined,
    Object? subtotal = _undefined,
    Object? savings = _undefined,
    Object? deliveryFee = _undefined,
    Object? discount = _undefined,
    Object? total = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$CartFields(
      id: id == _undefined ? _instance.id : (id as String?),
      storeId: storeId == _undefined ? _instance.storeId : (storeId as String?),
      items: items == _undefined || items == null
          ? _instance.items
          : (items as List<Fragment$CartItemFields>),
      subtotal: subtotal == _undefined || subtotal == null
          ? _instance.subtotal
          : (subtotal as int),
      savings: savings == _undefined || savings == null
          ? _instance.savings
          : (savings as int),
      deliveryFee: deliveryFee == _undefined || deliveryFee == null
          ? _instance.deliveryFee
          : (deliveryFee as int),
      discount: discount == _undefined || discount == null
          ? _instance.discount
          : (discount as int),
      total: total == _undefined || total == null
          ? _instance.total
          : (total as int),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  TRes items(
    Iterable<Fragment$CartItemFields> Function(
      Iterable<CopyWith$Fragment$CartItemFields<Fragment$CartItemFields>>,
    )
    _fn,
  ) => call(
    items: _fn(
      _instance.items.map((e) => CopyWith$Fragment$CartItemFields(e, (i) => i)),
    ).toList(),
  );
}

class _CopyWithStubImpl$Fragment$CartFields<TRes>
    implements CopyWith$Fragment$CartFields<TRes> {
  _CopyWithStubImpl$Fragment$CartFields(this._res);

  TRes _res;

  call({
    String? id,
    String? storeId,
    List<Fragment$CartItemFields>? items,
    int? subtotal,
    int? savings,
    int? deliveryFee,
    int? discount,
    int? total,
    String? $__typename,
  }) => _res;

  items(_fn) => _res;
}

const fragmentDefinitionCartFields = FragmentDefinitionNode(
  name: NameNode(value: 'CartFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(name: NameNode(value: 'AppCart'), isNonNull: false),
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
        name: NameNode(value: 'storeId'),
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
              name: NameNode(value: 'CartItemFields'),
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
        name: NameNode(value: 'subtotal'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'savings'),
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
        name: NameNode(value: '__typename'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
    ],
  ),
);
const documentNodeFragmentCartFields = DocumentNode(
  definitions: [fragmentDefinitionCartFields, fragmentDefinitionCartItemFields],
);

class Query$MyCart {
  Query$MyCart({required this.myCart, this.$__typename = 'Query'});

  factory Query$MyCart.fromJson(Map<String, dynamic> json) {
    final l$myCart = json['myCart'];
    final l$$__typename = json['__typename'];
    return Query$MyCart(
      myCart: Fragment$CartFields.fromJson((l$myCart as Map<String, dynamic>)),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$CartFields myCart;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$myCart = myCart;
    _resultData['myCart'] = l$myCart.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$myCart = myCart;
    final l$$__typename = $__typename;
    return Object.hashAll([l$myCart, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Query$MyCart || runtimeType != other.runtimeType) {
      return false;
    }
    final l$myCart = myCart;
    final lOther$myCart = other.myCart;
    if (l$myCart != lOther$myCart) {
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

extension UtilityExtension$Query$MyCart on Query$MyCart {
  CopyWith$Query$MyCart<Query$MyCart> get copyWith =>
      CopyWith$Query$MyCart(this, (i) => i);
}

abstract class CopyWith$Query$MyCart<TRes> {
  factory CopyWith$Query$MyCart(
    Query$MyCart instance,
    TRes Function(Query$MyCart) then,
  ) = _CopyWithImpl$Query$MyCart;

  factory CopyWith$Query$MyCart.stub(TRes res) = _CopyWithStubImpl$Query$MyCart;

  TRes call({Fragment$CartFields? myCart, String? $__typename});
  CopyWith$Fragment$CartFields<TRes> get myCart;
}

class _CopyWithImpl$Query$MyCart<TRes> implements CopyWith$Query$MyCart<TRes> {
  _CopyWithImpl$Query$MyCart(this._instance, this._then);

  final Query$MyCart _instance;

  final TRes Function(Query$MyCart) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? myCart = _undefined, Object? $__typename = _undefined}) =>
      _then(
        Query$MyCart(
          myCart: myCart == _undefined || myCart == null
              ? _instance.myCart
              : (myCart as Fragment$CartFields),
          $__typename: $__typename == _undefined || $__typename == null
              ? _instance.$__typename
              : ($__typename as String),
        ),
      );

  CopyWith$Fragment$CartFields<TRes> get myCart {
    final local$myCart = _instance.myCart;
    return CopyWith$Fragment$CartFields(local$myCart, (e) => call(myCart: e));
  }
}

class _CopyWithStubImpl$Query$MyCart<TRes>
    implements CopyWith$Query$MyCart<TRes> {
  _CopyWithStubImpl$Query$MyCart(this._res);

  TRes _res;

  call({Fragment$CartFields? myCart, String? $__typename}) => _res;

  CopyWith$Fragment$CartFields<TRes> get myCart =>
      CopyWith$Fragment$CartFields.stub(_res);
}

const documentNodeQueryMyCart = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.query,
      name: NameNode(value: 'MyCart'),
      variableDefinitions: [],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'myCart'),
            alias: null,
            arguments: [],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'CartFields'),
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
    fragmentDefinitionCartFields,
    fragmentDefinitionCartItemFields,
  ],
);

class Variables$Mutation$AddToCart {
  factory Variables$Mutation$AddToCart({
    required String productId,
    required int quantity,
    String? storeId,
  }) => Variables$Mutation$AddToCart._({
    r'productId': productId,
    r'quantity': quantity,
    if (storeId != null) r'storeId': storeId,
  });

  Variables$Mutation$AddToCart._(this._$data);

  factory Variables$Mutation$AddToCart.fromJson(Map<String, dynamic> data) {
    final result$data = <String, dynamic>{};
    final l$productId = data['productId'];
    result$data['productId'] = (l$productId as String);
    final l$quantity = data['quantity'];
    result$data['quantity'] = (l$quantity as int);
    if (data.containsKey('storeId')) {
      final l$storeId = data['storeId'];
      result$data['storeId'] = (l$storeId as String?);
    }
    return Variables$Mutation$AddToCart._(result$data);
  }

  Map<String, dynamic> _$data;

  String get productId => (_$data['productId'] as String);

  int get quantity => (_$data['quantity'] as int);

  String? get storeId => (_$data['storeId'] as String?);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$productId = productId;
    result$data['productId'] = l$productId;
    final l$quantity = quantity;
    result$data['quantity'] = l$quantity;
    if (_$data.containsKey('storeId')) {
      final l$storeId = storeId;
      result$data['storeId'] = l$storeId;
    }
    return result$data;
  }

  CopyWith$Variables$Mutation$AddToCart<Variables$Mutation$AddToCart>
  get copyWith => CopyWith$Variables$Mutation$AddToCart(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$AddToCart ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$productId = productId;
    final lOther$productId = other.productId;
    if (l$productId != lOther$productId) {
      return false;
    }
    final l$quantity = quantity;
    final lOther$quantity = other.quantity;
    if (l$quantity != lOther$quantity) {
      return false;
    }
    final l$storeId = storeId;
    final lOther$storeId = other.storeId;
    if (_$data.containsKey('storeId') != other._$data.containsKey('storeId')) {
      return false;
    }
    if (l$storeId != lOther$storeId) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$productId = productId;
    final l$quantity = quantity;
    final l$storeId = storeId;
    return Object.hashAll([
      l$productId,
      l$quantity,
      _$data.containsKey('storeId') ? l$storeId : const {},
    ]);
  }
}

abstract class CopyWith$Variables$Mutation$AddToCart<TRes> {
  factory CopyWith$Variables$Mutation$AddToCart(
    Variables$Mutation$AddToCart instance,
    TRes Function(Variables$Mutation$AddToCart) then,
  ) = _CopyWithImpl$Variables$Mutation$AddToCart;

  factory CopyWith$Variables$Mutation$AddToCart.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$AddToCart;

  TRes call({String? productId, int? quantity, String? storeId});
}

class _CopyWithImpl$Variables$Mutation$AddToCart<TRes>
    implements CopyWith$Variables$Mutation$AddToCart<TRes> {
  _CopyWithImpl$Variables$Mutation$AddToCart(this._instance, this._then);

  final Variables$Mutation$AddToCart _instance;

  final TRes Function(Variables$Mutation$AddToCart) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? productId = _undefined,
    Object? quantity = _undefined,
    Object? storeId = _undefined,
  }) => _then(
    Variables$Mutation$AddToCart._({
      ..._instance._$data,
      if (productId != _undefined && productId != null)
        'productId': (productId as String),
      if (quantity != _undefined && quantity != null)
        'quantity': (quantity as int),
      if (storeId != _undefined) 'storeId': (storeId as String?),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$AddToCart<TRes>
    implements CopyWith$Variables$Mutation$AddToCart<TRes> {
  _CopyWithStubImpl$Variables$Mutation$AddToCart(this._res);

  TRes _res;

  call({String? productId, int? quantity, String? storeId}) => _res;
}

class Mutation$AddToCart {
  Mutation$AddToCart({required this.addToCart, this.$__typename = 'Mutation'});

  factory Mutation$AddToCart.fromJson(Map<String, dynamic> json) {
    final l$addToCart = json['addToCart'];
    final l$$__typename = json['__typename'];
    return Mutation$AddToCart(
      addToCart: Fragment$CartFields.fromJson(
        (l$addToCart as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$CartFields addToCart;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$addToCart = addToCart;
    _resultData['addToCart'] = l$addToCart.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$addToCart = addToCart;
    final l$$__typename = $__typename;
    return Object.hashAll([l$addToCart, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$AddToCart || runtimeType != other.runtimeType) {
      return false;
    }
    final l$addToCart = addToCart;
    final lOther$addToCart = other.addToCart;
    if (l$addToCart != lOther$addToCart) {
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

extension UtilityExtension$Mutation$AddToCart on Mutation$AddToCart {
  CopyWith$Mutation$AddToCart<Mutation$AddToCart> get copyWith =>
      CopyWith$Mutation$AddToCart(this, (i) => i);
}

abstract class CopyWith$Mutation$AddToCart<TRes> {
  factory CopyWith$Mutation$AddToCart(
    Mutation$AddToCart instance,
    TRes Function(Mutation$AddToCart) then,
  ) = _CopyWithImpl$Mutation$AddToCart;

  factory CopyWith$Mutation$AddToCart.stub(TRes res) =
      _CopyWithStubImpl$Mutation$AddToCart;

  TRes call({Fragment$CartFields? addToCart, String? $__typename});
  CopyWith$Fragment$CartFields<TRes> get addToCart;
}

class _CopyWithImpl$Mutation$AddToCart<TRes>
    implements CopyWith$Mutation$AddToCart<TRes> {
  _CopyWithImpl$Mutation$AddToCart(this._instance, this._then);

  final Mutation$AddToCart _instance;

  final TRes Function(Mutation$AddToCart) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? addToCart = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$AddToCart(
      addToCart: addToCart == _undefined || addToCart == null
          ? _instance.addToCart
          : (addToCart as Fragment$CartFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$CartFields<TRes> get addToCart {
    final local$addToCart = _instance.addToCart;
    return CopyWith$Fragment$CartFields(
      local$addToCart,
      (e) => call(addToCart: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$AddToCart<TRes>
    implements CopyWith$Mutation$AddToCart<TRes> {
  _CopyWithStubImpl$Mutation$AddToCart(this._res);

  TRes _res;

  call({Fragment$CartFields? addToCart, String? $__typename}) => _res;

  CopyWith$Fragment$CartFields<TRes> get addToCart =>
      CopyWith$Fragment$CartFields.stub(_res);
}

const documentNodeMutationAddToCart = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'AddToCart'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'productId')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'quantity')),
          type: NamedTypeNode(name: NameNode(value: 'Int'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'storeId')),
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
            name: NameNode(value: 'addToCart'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'productId'),
                value: VariableNode(name: NameNode(value: 'productId')),
              ),
              ArgumentNode(
                name: NameNode(value: 'quantity'),
                value: VariableNode(name: NameNode(value: 'quantity')),
              ),
              ArgumentNode(
                name: NameNode(value: 'storeId'),
                value: VariableNode(name: NameNode(value: 'storeId')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'CartFields'),
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
    fragmentDefinitionCartFields,
    fragmentDefinitionCartItemFields,
  ],
);

class Variables$Mutation$UpdateCartItem {
  factory Variables$Mutation$UpdateCartItem({
    required String itemId,
    required int quantity,
  }) => Variables$Mutation$UpdateCartItem._({
    r'itemId': itemId,
    r'quantity': quantity,
  });

  Variables$Mutation$UpdateCartItem._(this._$data);

  factory Variables$Mutation$UpdateCartItem.fromJson(
    Map<String, dynamic> data,
  ) {
    final result$data = <String, dynamic>{};
    final l$itemId = data['itemId'];
    result$data['itemId'] = (l$itemId as String);
    final l$quantity = data['quantity'];
    result$data['quantity'] = (l$quantity as int);
    return Variables$Mutation$UpdateCartItem._(result$data);
  }

  Map<String, dynamic> _$data;

  String get itemId => (_$data['itemId'] as String);

  int get quantity => (_$data['quantity'] as int);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$itemId = itemId;
    result$data['itemId'] = l$itemId;
    final l$quantity = quantity;
    result$data['quantity'] = l$quantity;
    return result$data;
  }

  CopyWith$Variables$Mutation$UpdateCartItem<Variables$Mutation$UpdateCartItem>
  get copyWith => CopyWith$Variables$Mutation$UpdateCartItem(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$UpdateCartItem ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$itemId = itemId;
    final lOther$itemId = other.itemId;
    if (l$itemId != lOther$itemId) {
      return false;
    }
    final l$quantity = quantity;
    final lOther$quantity = other.quantity;
    if (l$quantity != lOther$quantity) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$itemId = itemId;
    final l$quantity = quantity;
    return Object.hashAll([l$itemId, l$quantity]);
  }
}

abstract class CopyWith$Variables$Mutation$UpdateCartItem<TRes> {
  factory CopyWith$Variables$Mutation$UpdateCartItem(
    Variables$Mutation$UpdateCartItem instance,
    TRes Function(Variables$Mutation$UpdateCartItem) then,
  ) = _CopyWithImpl$Variables$Mutation$UpdateCartItem;

  factory CopyWith$Variables$Mutation$UpdateCartItem.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$UpdateCartItem;

  TRes call({String? itemId, int? quantity});
}

class _CopyWithImpl$Variables$Mutation$UpdateCartItem<TRes>
    implements CopyWith$Variables$Mutation$UpdateCartItem<TRes> {
  _CopyWithImpl$Variables$Mutation$UpdateCartItem(this._instance, this._then);

  final Variables$Mutation$UpdateCartItem _instance;

  final TRes Function(Variables$Mutation$UpdateCartItem) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? itemId = _undefined, Object? quantity = _undefined}) =>
      _then(
        Variables$Mutation$UpdateCartItem._({
          ..._instance._$data,
          if (itemId != _undefined && itemId != null)
            'itemId': (itemId as String),
          if (quantity != _undefined && quantity != null)
            'quantity': (quantity as int),
        }),
      );
}

class _CopyWithStubImpl$Variables$Mutation$UpdateCartItem<TRes>
    implements CopyWith$Variables$Mutation$UpdateCartItem<TRes> {
  _CopyWithStubImpl$Variables$Mutation$UpdateCartItem(this._res);

  TRes _res;

  call({String? itemId, int? quantity}) => _res;
}

class Mutation$UpdateCartItem {
  Mutation$UpdateCartItem({
    required this.updateCartItem,
    this.$__typename = 'Mutation',
  });

  factory Mutation$UpdateCartItem.fromJson(Map<String, dynamic> json) {
    final l$updateCartItem = json['updateCartItem'];
    final l$$__typename = json['__typename'];
    return Mutation$UpdateCartItem(
      updateCartItem: Fragment$CartFields.fromJson(
        (l$updateCartItem as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$CartFields updateCartItem;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$updateCartItem = updateCartItem;
    _resultData['updateCartItem'] = l$updateCartItem.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$updateCartItem = updateCartItem;
    final l$$__typename = $__typename;
    return Object.hashAll([l$updateCartItem, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$UpdateCartItem || runtimeType != other.runtimeType) {
      return false;
    }
    final l$updateCartItem = updateCartItem;
    final lOther$updateCartItem = other.updateCartItem;
    if (l$updateCartItem != lOther$updateCartItem) {
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

extension UtilityExtension$Mutation$UpdateCartItem on Mutation$UpdateCartItem {
  CopyWith$Mutation$UpdateCartItem<Mutation$UpdateCartItem> get copyWith =>
      CopyWith$Mutation$UpdateCartItem(this, (i) => i);
}

abstract class CopyWith$Mutation$UpdateCartItem<TRes> {
  factory CopyWith$Mutation$UpdateCartItem(
    Mutation$UpdateCartItem instance,
    TRes Function(Mutation$UpdateCartItem) then,
  ) = _CopyWithImpl$Mutation$UpdateCartItem;

  factory CopyWith$Mutation$UpdateCartItem.stub(TRes res) =
      _CopyWithStubImpl$Mutation$UpdateCartItem;

  TRes call({Fragment$CartFields? updateCartItem, String? $__typename});
  CopyWith$Fragment$CartFields<TRes> get updateCartItem;
}

class _CopyWithImpl$Mutation$UpdateCartItem<TRes>
    implements CopyWith$Mutation$UpdateCartItem<TRes> {
  _CopyWithImpl$Mutation$UpdateCartItem(this._instance, this._then);

  final Mutation$UpdateCartItem _instance;

  final TRes Function(Mutation$UpdateCartItem) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? updateCartItem = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$UpdateCartItem(
      updateCartItem: updateCartItem == _undefined || updateCartItem == null
          ? _instance.updateCartItem
          : (updateCartItem as Fragment$CartFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$CartFields<TRes> get updateCartItem {
    final local$updateCartItem = _instance.updateCartItem;
    return CopyWith$Fragment$CartFields(
      local$updateCartItem,
      (e) => call(updateCartItem: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$UpdateCartItem<TRes>
    implements CopyWith$Mutation$UpdateCartItem<TRes> {
  _CopyWithStubImpl$Mutation$UpdateCartItem(this._res);

  TRes _res;

  call({Fragment$CartFields? updateCartItem, String? $__typename}) => _res;

  CopyWith$Fragment$CartFields<TRes> get updateCartItem =>
      CopyWith$Fragment$CartFields.stub(_res);
}

const documentNodeMutationUpdateCartItem = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'UpdateCartItem'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'itemId')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'quantity')),
          type: NamedTypeNode(name: NameNode(value: 'Int'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'updateCartItem'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'itemId'),
                value: VariableNode(name: NameNode(value: 'itemId')),
              ),
              ArgumentNode(
                name: NameNode(value: 'quantity'),
                value: VariableNode(name: NameNode(value: 'quantity')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'CartFields'),
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
    fragmentDefinitionCartFields,
    fragmentDefinitionCartItemFields,
  ],
);

class Variables$Mutation$RemoveCartItem {
  factory Variables$Mutation$RemoveCartItem({required String itemId}) =>
      Variables$Mutation$RemoveCartItem._({r'itemId': itemId});

  Variables$Mutation$RemoveCartItem._(this._$data);

  factory Variables$Mutation$RemoveCartItem.fromJson(
    Map<String, dynamic> data,
  ) {
    final result$data = <String, dynamic>{};
    final l$itemId = data['itemId'];
    result$data['itemId'] = (l$itemId as String);
    return Variables$Mutation$RemoveCartItem._(result$data);
  }

  Map<String, dynamic> _$data;

  String get itemId => (_$data['itemId'] as String);

  Map<String, dynamic> toJson() {
    final result$data = <String, dynamic>{};
    final l$itemId = itemId;
    result$data['itemId'] = l$itemId;
    return result$data;
  }

  CopyWith$Variables$Mutation$RemoveCartItem<Variables$Mutation$RemoveCartItem>
  get copyWith => CopyWith$Variables$Mutation$RemoveCartItem(this, (i) => i);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Variables$Mutation$RemoveCartItem ||
        runtimeType != other.runtimeType) {
      return false;
    }
    final l$itemId = itemId;
    final lOther$itemId = other.itemId;
    if (l$itemId != lOther$itemId) {
      return false;
    }
    return true;
  }

  @override
  int get hashCode {
    final l$itemId = itemId;
    return Object.hashAll([l$itemId]);
  }
}

abstract class CopyWith$Variables$Mutation$RemoveCartItem<TRes> {
  factory CopyWith$Variables$Mutation$RemoveCartItem(
    Variables$Mutation$RemoveCartItem instance,
    TRes Function(Variables$Mutation$RemoveCartItem) then,
  ) = _CopyWithImpl$Variables$Mutation$RemoveCartItem;

  factory CopyWith$Variables$Mutation$RemoveCartItem.stub(TRes res) =
      _CopyWithStubImpl$Variables$Mutation$RemoveCartItem;

  TRes call({String? itemId});
}

class _CopyWithImpl$Variables$Mutation$RemoveCartItem<TRes>
    implements CopyWith$Variables$Mutation$RemoveCartItem<TRes> {
  _CopyWithImpl$Variables$Mutation$RemoveCartItem(this._instance, this._then);

  final Variables$Mutation$RemoveCartItem _instance;

  final TRes Function(Variables$Mutation$RemoveCartItem) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({Object? itemId = _undefined}) => _then(
    Variables$Mutation$RemoveCartItem._({
      ..._instance._$data,
      if (itemId != _undefined && itemId != null) 'itemId': (itemId as String),
    }),
  );
}

class _CopyWithStubImpl$Variables$Mutation$RemoveCartItem<TRes>
    implements CopyWith$Variables$Mutation$RemoveCartItem<TRes> {
  _CopyWithStubImpl$Variables$Mutation$RemoveCartItem(this._res);

  TRes _res;

  call({String? itemId}) => _res;
}

class Mutation$RemoveCartItem {
  Mutation$RemoveCartItem({
    required this.removeCartItem,
    this.$__typename = 'Mutation',
  });

  factory Mutation$RemoveCartItem.fromJson(Map<String, dynamic> json) {
    final l$removeCartItem = json['removeCartItem'];
    final l$$__typename = json['__typename'];
    return Mutation$RemoveCartItem(
      removeCartItem: Fragment$CartFields.fromJson(
        (l$removeCartItem as Map<String, dynamic>),
      ),
      $__typename: (l$$__typename as String),
    );
  }

  final Fragment$CartFields removeCartItem;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$removeCartItem = removeCartItem;
    _resultData['removeCartItem'] = l$removeCartItem.toJson();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$removeCartItem = removeCartItem;
    final l$$__typename = $__typename;
    return Object.hashAll([l$removeCartItem, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Mutation$RemoveCartItem || runtimeType != other.runtimeType) {
      return false;
    }
    final l$removeCartItem = removeCartItem;
    final lOther$removeCartItem = other.removeCartItem;
    if (l$removeCartItem != lOther$removeCartItem) {
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

extension UtilityExtension$Mutation$RemoveCartItem on Mutation$RemoveCartItem {
  CopyWith$Mutation$RemoveCartItem<Mutation$RemoveCartItem> get copyWith =>
      CopyWith$Mutation$RemoveCartItem(this, (i) => i);
}

abstract class CopyWith$Mutation$RemoveCartItem<TRes> {
  factory CopyWith$Mutation$RemoveCartItem(
    Mutation$RemoveCartItem instance,
    TRes Function(Mutation$RemoveCartItem) then,
  ) = _CopyWithImpl$Mutation$RemoveCartItem;

  factory CopyWith$Mutation$RemoveCartItem.stub(TRes res) =
      _CopyWithStubImpl$Mutation$RemoveCartItem;

  TRes call({Fragment$CartFields? removeCartItem, String? $__typename});
  CopyWith$Fragment$CartFields<TRes> get removeCartItem;
}

class _CopyWithImpl$Mutation$RemoveCartItem<TRes>
    implements CopyWith$Mutation$RemoveCartItem<TRes> {
  _CopyWithImpl$Mutation$RemoveCartItem(this._instance, this._then);

  final Mutation$RemoveCartItem _instance;

  final TRes Function(Mutation$RemoveCartItem) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? removeCartItem = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Mutation$RemoveCartItem(
      removeCartItem: removeCartItem == _undefined || removeCartItem == null
          ? _instance.removeCartItem
          : (removeCartItem as Fragment$CartFields),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  CopyWith$Fragment$CartFields<TRes> get removeCartItem {
    final local$removeCartItem = _instance.removeCartItem;
    return CopyWith$Fragment$CartFields(
      local$removeCartItem,
      (e) => call(removeCartItem: e),
    );
  }
}

class _CopyWithStubImpl$Mutation$RemoveCartItem<TRes>
    implements CopyWith$Mutation$RemoveCartItem<TRes> {
  _CopyWithStubImpl$Mutation$RemoveCartItem(this._res);

  TRes _res;

  call({Fragment$CartFields? removeCartItem, String? $__typename}) => _res;

  CopyWith$Fragment$CartFields<TRes> get removeCartItem =>
      CopyWith$Fragment$CartFields.stub(_res);
}

const documentNodeMutationRemoveCartItem = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.mutation,
      name: NameNode(value: 'RemoveCartItem'),
      variableDefinitions: [
        VariableDefinitionNode(
          variable: VariableNode(name: NameNode(value: 'itemId')),
          type: NamedTypeNode(name: NameNode(value: 'String'), isNonNull: true),
          defaultValue: DefaultValueNode(value: null),
          directives: [],
        ),
      ],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'removeCartItem'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'itemId'),
                value: VariableNode(name: NameNode(value: 'itemId')),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'CartFields'),
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
    fragmentDefinitionCartFields,
    fragmentDefinitionCartItemFields,
  ],
);
