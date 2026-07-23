import 'package:get/get.dart';
import '../models/product.dart';
import '../providers/graphql_provider.dart';

class CartController extends GetxController {
  static const double freeDeliveryThreshold = 199;
  static const double deliveryFeeBelow = 25;

  final GraphQLProvider gqlProvider = Get.find<GraphQLProvider>();

  final RxMap<String, CartItem> items = <String, CartItem>{}.obs;
  final RxBool isLoading = false.obs;

  final RxDouble serverSubtotal = 0.0.obs;
  final RxDouble serverSavings = 0.0.obs;
  final RxDouble serverDeliveryFee = 0.0.obs;
  final RxDouble serverTotal = 0.0.obs;

  Future<void> fetchCart() async {
    if (gqlProvider.authToken == null) return;
    isLoading.value = true;
    try {
      const doc = '''
        query MyCart {
          myCart {
            id
            storeId
            items {
              id
              productId
              name
              unit
              emoji
              price
              mrp
              quantity
              lineTotal
              lineSavings
            }
            subtotal
            savings
            deliveryFee
            total
          }
        }
      ''';
      final res = await gqlProvider.sendQuery(doc);
      final cartData = res['myCart'] as Map<String, dynamic>?;
      if (cartData != null) {
        _updateCartFromResponse(cartData);
      }
    } catch (_) {
      // Ignore if offline
    } finally {
      isLoading.value = false;
    }
  }

  void _updateCartFromResponse(Map<String, dynamic> cartData) {
    serverSubtotal.value = ((cartData['subtotal'] as num?) ?? 0) / 100.0;
    serverSavings.value = ((cartData['savings'] as num?) ?? 0) / 100.0;
    serverDeliveryFee.value = ((cartData['deliveryFee'] as num?) ?? 0) / 100.0;
    serverTotal.value = ((cartData['total'] as num?) ?? 0) / 100.0;

    final rawItems = cartData['items'] as List<dynamic>? ?? [];
    final map = <String, CartItem>{};
    for (final item in rawItems) {
      final m = item as Map<String, dynamic>;
      final pid = m['productId'] as String;
      final priceVal = ((m['price'] as num?) ?? 0) / 100.0;
      final mrpVal = ((m['mrp'] as num?) ?? 0) / 100.0;

      final prod = Product(
        id: pid,
        name: m['name'] as String? ?? '',
        category: 'General',
        price: priceVal,
        mrp: mrpVal,
        unit: m['unit'] as String? ?? '1 unit',
        emoji: m['emoji'] as String? ?? '🛒',
      );
      final qty = (m['quantity'] as num?)?.toInt() ?? 1;
      map[pid] = CartItem(id: m['id'] as String?, product: prod, qty: qty);
    }
    items.assignAll(map);
  }

  Future<void> add(Product product) async {
    final existing = items[product.id];
    if (existing != null) {
      existing.qty.value++;
    } else {
      items[product.id] = CartItem(product: product);
    }

    if (gqlProvider.authToken != null) {
      try {
        const doc = '''
          mutation AddToCart(\$productId: String!, \$quantity: Int!) {
            addToCart(productId: \$productId, quantity: \$quantity) {
              id
              items { id productId name unit emoji price mrp quantity lineTotal lineSavings }
              subtotal savings deliveryFee total
            }
          }
        ''';
        final res = await gqlProvider.sendQuery(doc, variables: {
          'productId': product.id,
          'quantity': existing != null ? existing.qty.value : 1,
        });
        if (res['addToCart'] != null) {
          _updateCartFromResponse(res['addToCart'] as Map<String, dynamic>);
        }
      } catch (_) {}
    }
  }

  Future<void> remove(String productId) async {
    final item = items.remove(productId);
    if (item?.id != null && gqlProvider.authToken != null) {
      try {
        const doc = '''
          mutation RemoveCartItem(\$itemId: String!) {
            removeCartItem(itemId: \$itemId) {
              id
              items { id productId name unit emoji price mrp quantity lineTotal lineSavings }
              subtotal savings deliveryFee total
            }
          }
        ''';
        final res = await gqlProvider.sendQuery(doc, variables: {'itemId': item!.id});
        if (res['removeCartItem'] != null) {
          _updateCartFromResponse(res['removeCartItem'] as Map<String, dynamic>);
        }
      } catch (_) {}
    }
  }

  Future<void> increment(String productId) async {
    final item = items[productId];
    if (item != null) {
      item.qty.value++;
      if (gqlProvider.authToken != null) {
        if (item.id != null) {
          try {
            const doc = '''
              mutation UpdateCartItem(\$itemId: String!, \$quantity: Int!) {
                updateCartItem(itemId: \$itemId, quantity: \$quantity) {
                  id
                  items { id productId name unit emoji price mrp quantity lineTotal lineSavings }
                  subtotal savings deliveryFee total
                }
              }
            ''';
            final res = await gqlProvider.sendQuery(doc, variables: {
              'itemId': item.id,
              'quantity': item.qty.value,
            });
            if (res['updateCartItem'] != null) {
              _updateCartFromResponse(res['updateCartItem'] as Map<String, dynamic>);
            }
          } catch (_) {}
        } else {
          add(item.product);
        }
      }
    }
  }

  Future<void> decrement(String productId) async {
    final item = items[productId];
    if (item == null) return;
    if (item.qty.value <= 1) {
      remove(productId);
    } else {
      item.qty.value--;
      if (gqlProvider.authToken != null && item.id != null) {
        try {
          const doc = '''
            mutation UpdateCartItem(\$itemId: String!, \$quantity: Int!) {
              updateCartItem(itemId: \$itemId, quantity: \$quantity) {
                id
                items { id productId name unit emoji price mrp quantity lineTotal lineSavings }
                subtotal savings deliveryFee total
              }
            }
          ''';
          final res = await gqlProvider.sendQuery(doc, variables: {
            'itemId': item.id,
            'quantity': item.qty.value,
          });
          if (res['updateCartItem'] != null) {
            _updateCartFromResponse(res['updateCartItem'] as Map<String, dynamic>);
          }
        } catch (_) {}
      }
    }
  }

  int quantityOf(String productId) => items[productId]?.qty.value ?? 0;

  int get itemCount =>
      items.values.fold(0, (sum, item) => sum + item.qty.value);

  double get subtotal =>
      items.values.fold(0, (sum, item) => sum + item.lineTotal);

  double get savings =>
      items.values.fold(0, (sum, item) => sum + item.lineSavings);

  double get deliveryFee =>
      subtotal >= freeDeliveryThreshold || subtotal == 0 ? 0 : deliveryFeeBelow;

  double get total => subtotal + deliveryFee;

  double get amountToFreeDelivery =>
      subtotal >= freeDeliveryThreshold ? 0 : freeDeliveryThreshold - subtotal;

  void clear() => items.clear();
}
