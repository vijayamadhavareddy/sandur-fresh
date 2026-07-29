import 'package:gql/ast.dart';

class Fragment$ProductFields {
  Fragment$ProductFields({
    required this.id,
    required this.categoryId,
    required this.name,
    this.description,
    required this.unit,
    required this.mrp,
    required this.price,
    this.emoji,
    this.imageUrl,
    required this.isActive,
    this.$__typename = 'ProductsSelectItem',
  });

  factory Fragment$ProductFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$categoryId = json['categoryId'];
    final l$name = json['name'];
    final l$description = json['description'];
    final l$unit = json['unit'];
    final l$mrp = json['mrp'];
    final l$price = json['price'];
    final l$emoji = json['emoji'];
    final l$imageUrl = json['imageUrl'];
    final l$isActive = json['isActive'];
    final l$$__typename = json['__typename'];
    return Fragment$ProductFields(
      id: (l$id as String),
      categoryId: (l$categoryId as String),
      name: (l$name as String),
      description: (l$description as String?),
      unit: (l$unit as String),
      mrp: (l$mrp as int),
      price: (l$price as int),
      emoji: (l$emoji as String?),
      imageUrl: (l$imageUrl as String?),
      isActive: (l$isActive as bool),
      $__typename: (l$$__typename as String),
    );
  }

  final String id;

  final String categoryId;

  final String name;

  final String? description;

  final String unit;

  final int mrp;

  final int price;

  final String? emoji;

  final String? imageUrl;

  final bool isActive;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$id = id;
    _resultData['id'] = l$id;
    final l$categoryId = categoryId;
    _resultData['categoryId'] = l$categoryId;
    final l$name = name;
    _resultData['name'] = l$name;
    final l$description = description;
    _resultData['description'] = l$description;
    final l$unit = unit;
    _resultData['unit'] = l$unit;
    final l$mrp = mrp;
    _resultData['mrp'] = l$mrp;
    final l$price = price;
    _resultData['price'] = l$price;
    final l$emoji = emoji;
    _resultData['emoji'] = l$emoji;
    final l$imageUrl = imageUrl;
    _resultData['imageUrl'] = l$imageUrl;
    final l$isActive = isActive;
    _resultData['isActive'] = l$isActive;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$categoryId = categoryId;
    final l$name = name;
    final l$description = description;
    final l$unit = unit;
    final l$mrp = mrp;
    final l$price = price;
    final l$emoji = emoji;
    final l$imageUrl = imageUrl;
    final l$isActive = isActive;
    final l$$__typename = $__typename;
    return Object.hashAll([
      l$id,
      l$categoryId,
      l$name,
      l$description,
      l$unit,
      l$mrp,
      l$price,
      l$emoji,
      l$imageUrl,
      l$isActive,
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$ProductFields || runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$categoryId = categoryId;
    final lOther$categoryId = other.categoryId;
    if (l$categoryId != lOther$categoryId) {
      return false;
    }
    final l$name = name;
    final lOther$name = other.name;
    if (l$name != lOther$name) {
      return false;
    }
    final l$description = description;
    final lOther$description = other.description;
    if (l$description != lOther$description) {
      return false;
    }
    final l$unit = unit;
    final lOther$unit = other.unit;
    if (l$unit != lOther$unit) {
      return false;
    }
    final l$mrp = mrp;
    final lOther$mrp = other.mrp;
    if (l$mrp != lOther$mrp) {
      return false;
    }
    final l$price = price;
    final lOther$price = other.price;
    if (l$price != lOther$price) {
      return false;
    }
    final l$emoji = emoji;
    final lOther$emoji = other.emoji;
    if (l$emoji != lOther$emoji) {
      return false;
    }
    final l$imageUrl = imageUrl;
    final lOther$imageUrl = other.imageUrl;
    if (l$imageUrl != lOther$imageUrl) {
      return false;
    }
    final l$isActive = isActive;
    final lOther$isActive = other.isActive;
    if (l$isActive != lOther$isActive) {
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

extension UtilityExtension$Fragment$ProductFields on Fragment$ProductFields {
  CopyWith$Fragment$ProductFields<Fragment$ProductFields> get copyWith =>
      CopyWith$Fragment$ProductFields(this, (i) => i);
}

abstract class CopyWith$Fragment$ProductFields<TRes> {
  factory CopyWith$Fragment$ProductFields(
    Fragment$ProductFields instance,
    TRes Function(Fragment$ProductFields) then,
  ) = _CopyWithImpl$Fragment$ProductFields;

  factory CopyWith$Fragment$ProductFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$ProductFields;

  TRes call({
    String? id,
    String? categoryId,
    String? name,
    String? description,
    String? unit,
    int? mrp,
    int? price,
    String? emoji,
    String? imageUrl,
    bool? isActive,
    String? $__typename,
  });
}

class _CopyWithImpl$Fragment$ProductFields<TRes>
    implements CopyWith$Fragment$ProductFields<TRes> {
  _CopyWithImpl$Fragment$ProductFields(this._instance, this._then);

  final Fragment$ProductFields _instance;

  final TRes Function(Fragment$ProductFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? categoryId = _undefined,
    Object? name = _undefined,
    Object? description = _undefined,
    Object? unit = _undefined,
    Object? mrp = _undefined,
    Object? price = _undefined,
    Object? emoji = _undefined,
    Object? imageUrl = _undefined,
    Object? isActive = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$ProductFields(
      id: id == _undefined || id == null ? _instance.id : (id as String),
      categoryId: categoryId == _undefined || categoryId == null
          ? _instance.categoryId
          : (categoryId as String),
      name: name == _undefined || name == null
          ? _instance.name
          : (name as String),
      description: description == _undefined
          ? _instance.description
          : (description as String?),
      unit: unit == _undefined || unit == null
          ? _instance.unit
          : (unit as String),
      mrp: mrp == _undefined || mrp == null ? _instance.mrp : (mrp as int),
      price: price == _undefined || price == null
          ? _instance.price
          : (price as int),
      emoji: emoji == _undefined ? _instance.emoji : (emoji as String?),
      imageUrl: imageUrl == _undefined
          ? _instance.imageUrl
          : (imageUrl as String?),
      isActive: isActive == _undefined || isActive == null
          ? _instance.isActive
          : (isActive as bool),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );
}

class _CopyWithStubImpl$Fragment$ProductFields<TRes>
    implements CopyWith$Fragment$ProductFields<TRes> {
  _CopyWithStubImpl$Fragment$ProductFields(this._res);

  TRes _res;

  call({
    String? id,
    String? categoryId,
    String? name,
    String? description,
    String? unit,
    int? mrp,
    int? price,
    String? emoji,
    String? imageUrl,
    bool? isActive,
    String? $__typename,
  }) => _res;
}

const fragmentDefinitionProductFields = FragmentDefinitionNode(
  name: NameNode(value: 'ProductFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(
      name: NameNode(value: 'ProductsSelectItem'),
      isNonNull: false,
    ),
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
        name: NameNode(value: 'categoryId'),
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
        name: NameNode(value: 'description'),
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
        name: NameNode(value: 'mrp'),
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
        name: NameNode(value: 'emoji'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'imageUrl'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'isActive'),
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
const documentNodeFragmentProductFields = DocumentNode(
  definitions: [fragmentDefinitionProductFields],
);

class Fragment$CategoryFields {
  Fragment$CategoryFields({
    required this.id,
    required this.name,
    required this.slug,
    required this.sortOrder,
    this.$__typename = 'CategoriesSelectItem',
  });

  factory Fragment$CategoryFields.fromJson(Map<String, dynamic> json) {
    final l$id = json['id'];
    final l$name = json['name'];
    final l$slug = json['slug'];
    final l$sortOrder = json['sortOrder'];
    final l$$__typename = json['__typename'];
    return Fragment$CategoryFields(
      id: (l$id as String),
      name: (l$name as String),
      slug: (l$slug as String),
      sortOrder: (l$sortOrder as int),
      $__typename: (l$$__typename as String),
    );
  }

  final String id;

  final String name;

  final String slug;

  final int sortOrder;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$id = id;
    _resultData['id'] = l$id;
    final l$name = name;
    _resultData['name'] = l$name;
    final l$slug = slug;
    _resultData['slug'] = l$slug;
    final l$sortOrder = sortOrder;
    _resultData['sortOrder'] = l$sortOrder;
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$id = id;
    final l$name = name;
    final l$slug = slug;
    final l$sortOrder = sortOrder;
    final l$$__typename = $__typename;
    return Object.hashAll([l$id, l$name, l$slug, l$sortOrder, l$$__typename]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Fragment$CategoryFields || runtimeType != other.runtimeType) {
      return false;
    }
    final l$id = id;
    final lOther$id = other.id;
    if (l$id != lOther$id) {
      return false;
    }
    final l$name = name;
    final lOther$name = other.name;
    if (l$name != lOther$name) {
      return false;
    }
    final l$slug = slug;
    final lOther$slug = other.slug;
    if (l$slug != lOther$slug) {
      return false;
    }
    final l$sortOrder = sortOrder;
    final lOther$sortOrder = other.sortOrder;
    if (l$sortOrder != lOther$sortOrder) {
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

extension UtilityExtension$Fragment$CategoryFields on Fragment$CategoryFields {
  CopyWith$Fragment$CategoryFields<Fragment$CategoryFields> get copyWith =>
      CopyWith$Fragment$CategoryFields(this, (i) => i);
}

abstract class CopyWith$Fragment$CategoryFields<TRes> {
  factory CopyWith$Fragment$CategoryFields(
    Fragment$CategoryFields instance,
    TRes Function(Fragment$CategoryFields) then,
  ) = _CopyWithImpl$Fragment$CategoryFields;

  factory CopyWith$Fragment$CategoryFields.stub(TRes res) =
      _CopyWithStubImpl$Fragment$CategoryFields;

  TRes call({
    String? id,
    String? name,
    String? slug,
    int? sortOrder,
    String? $__typename,
  });
}

class _CopyWithImpl$Fragment$CategoryFields<TRes>
    implements CopyWith$Fragment$CategoryFields<TRes> {
  _CopyWithImpl$Fragment$CategoryFields(this._instance, this._then);

  final Fragment$CategoryFields _instance;

  final TRes Function(Fragment$CategoryFields) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? id = _undefined,
    Object? name = _undefined,
    Object? slug = _undefined,
    Object? sortOrder = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Fragment$CategoryFields(
      id: id == _undefined || id == null ? _instance.id : (id as String),
      name: name == _undefined || name == null
          ? _instance.name
          : (name as String),
      slug: slug == _undefined || slug == null
          ? _instance.slug
          : (slug as String),
      sortOrder: sortOrder == _undefined || sortOrder == null
          ? _instance.sortOrder
          : (sortOrder as int),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );
}

class _CopyWithStubImpl$Fragment$CategoryFields<TRes>
    implements CopyWith$Fragment$CategoryFields<TRes> {
  _CopyWithStubImpl$Fragment$CategoryFields(this._res);

  TRes _res;

  call({
    String? id,
    String? name,
    String? slug,
    int? sortOrder,
    String? $__typename,
  }) => _res;
}

const fragmentDefinitionCategoryFields = FragmentDefinitionNode(
  name: NameNode(value: 'CategoryFields'),
  typeCondition: TypeConditionNode(
    on: NamedTypeNode(
      name: NameNode(value: 'CategoriesSelectItem'),
      isNonNull: false,
    ),
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
        name: NameNode(value: 'name'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'slug'),
        alias: null,
        arguments: [],
        directives: [],
        selectionSet: null,
      ),
      FieldNode(
        name: NameNode(value: 'sortOrder'),
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
const documentNodeFragmentCategoryFields = DocumentNode(
  definitions: [fragmentDefinitionCategoryFields],
);

class Query$GetCatalog {
  Query$GetCatalog({
    required this.products,
    required this.categories,
    this.$__typename = 'Query',
  });

  factory Query$GetCatalog.fromJson(Map<String, dynamic> json) {
    final l$products = json['products'];
    final l$categories = json['categories'];
    final l$$__typename = json['__typename'];
    return Query$GetCatalog(
      products: (l$products as List<dynamic>)
          .map(
            (e) => Fragment$ProductFields.fromJson((e as Map<String, dynamic>)),
          )
          .toList(),
      categories: (l$categories as List<dynamic>)
          .map(
            (e) =>
                Fragment$CategoryFields.fromJson((e as Map<String, dynamic>)),
          )
          .toList(),
      $__typename: (l$$__typename as String),
    );
  }

  final List<Fragment$ProductFields> products;

  final List<Fragment$CategoryFields> categories;

  final String $__typename;

  Map<String, dynamic> toJson() {
    final _resultData = <String, dynamic>{};
    final l$products = products;
    _resultData['products'] = l$products.map((e) => e.toJson()).toList();
    final l$categories = categories;
    _resultData['categories'] = l$categories.map((e) => e.toJson()).toList();
    final l$$__typename = $__typename;
    _resultData['__typename'] = l$$__typename;
    return _resultData;
  }

  @override
  int get hashCode {
    final l$products = products;
    final l$categories = categories;
    final l$$__typename = $__typename;
    return Object.hashAll([
      Object.hashAll(l$products.map((v) => v)),
      Object.hashAll(l$categories.map((v) => v)),
      l$$__typename,
    ]);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    if (other is! Query$GetCatalog || runtimeType != other.runtimeType) {
      return false;
    }
    final l$products = products;
    final lOther$products = other.products;
    if (l$products.length != lOther$products.length) {
      return false;
    }
    for (int i = 0; i < l$products.length; i++) {
      final l$products$entry = l$products[i];
      final lOther$products$entry = lOther$products[i];
      if (l$products$entry != lOther$products$entry) {
        return false;
      }
    }
    final l$categories = categories;
    final lOther$categories = other.categories;
    if (l$categories.length != lOther$categories.length) {
      return false;
    }
    for (int i = 0; i < l$categories.length; i++) {
      final l$categories$entry = l$categories[i];
      final lOther$categories$entry = lOther$categories[i];
      if (l$categories$entry != lOther$categories$entry) {
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

extension UtilityExtension$Query$GetCatalog on Query$GetCatalog {
  CopyWith$Query$GetCatalog<Query$GetCatalog> get copyWith =>
      CopyWith$Query$GetCatalog(this, (i) => i);
}

abstract class CopyWith$Query$GetCatalog<TRes> {
  factory CopyWith$Query$GetCatalog(
    Query$GetCatalog instance,
    TRes Function(Query$GetCatalog) then,
  ) = _CopyWithImpl$Query$GetCatalog;

  factory CopyWith$Query$GetCatalog.stub(TRes res) =
      _CopyWithStubImpl$Query$GetCatalog;

  TRes call({
    List<Fragment$ProductFields>? products,
    List<Fragment$CategoryFields>? categories,
    String? $__typename,
  });
  TRes products(
    Iterable<Fragment$ProductFields> Function(
      Iterable<CopyWith$Fragment$ProductFields<Fragment$ProductFields>>,
    )
    _fn,
  );
  TRes categories(
    Iterable<Fragment$CategoryFields> Function(
      Iterable<CopyWith$Fragment$CategoryFields<Fragment$CategoryFields>>,
    )
    _fn,
  );
}

class _CopyWithImpl$Query$GetCatalog<TRes>
    implements CopyWith$Query$GetCatalog<TRes> {
  _CopyWithImpl$Query$GetCatalog(this._instance, this._then);

  final Query$GetCatalog _instance;

  final TRes Function(Query$GetCatalog) _then;

  static const _undefined = <dynamic, dynamic>{};

  TRes call({
    Object? products = _undefined,
    Object? categories = _undefined,
    Object? $__typename = _undefined,
  }) => _then(
    Query$GetCatalog(
      products: products == _undefined || products == null
          ? _instance.products
          : (products as List<Fragment$ProductFields>),
      categories: categories == _undefined || categories == null
          ? _instance.categories
          : (categories as List<Fragment$CategoryFields>),
      $__typename: $__typename == _undefined || $__typename == null
          ? _instance.$__typename
          : ($__typename as String),
    ),
  );

  TRes products(
    Iterable<Fragment$ProductFields> Function(
      Iterable<CopyWith$Fragment$ProductFields<Fragment$ProductFields>>,
    )
    _fn,
  ) => call(
    products: _fn(
      _instance.products.map(
        (e) => CopyWith$Fragment$ProductFields(e, (i) => i),
      ),
    ).toList(),
  );

  TRes categories(
    Iterable<Fragment$CategoryFields> Function(
      Iterable<CopyWith$Fragment$CategoryFields<Fragment$CategoryFields>>,
    )
    _fn,
  ) => call(
    categories: _fn(
      _instance.categories.map(
        (e) => CopyWith$Fragment$CategoryFields(e, (i) => i),
      ),
    ).toList(),
  );
}

class _CopyWithStubImpl$Query$GetCatalog<TRes>
    implements CopyWith$Query$GetCatalog<TRes> {
  _CopyWithStubImpl$Query$GetCatalog(this._res);

  TRes _res;

  call({
    List<Fragment$ProductFields>? products,
    List<Fragment$CategoryFields>? categories,
    String? $__typename,
  }) => _res;

  products(_fn) => _res;

  categories(_fn) => _res;
}

const documentNodeQueryGetCatalog = DocumentNode(
  definitions: [
    OperationDefinitionNode(
      type: OperationType.query,
      name: NameNode(value: 'GetCatalog'),
      variableDefinitions: [],
      directives: [],
      selectionSet: SelectionSetNode(
        selections: [
          FieldNode(
            name: NameNode(value: 'products'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'limit'),
                value: IntValueNode(value: '100'),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'ProductFields'),
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
            name: NameNode(value: 'categories'),
            alias: null,
            arguments: [
              ArgumentNode(
                name: NameNode(value: 'limit'),
                value: IntValueNode(value: '100'),
              ),
            ],
            directives: [],
            selectionSet: SelectionSetNode(
              selections: [
                FragmentSpreadNode(
                  name: NameNode(value: 'CategoryFields'),
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
    fragmentDefinitionProductFields,
    fragmentDefinitionCategoryFields,
  ],
);
