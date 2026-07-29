import 'package:get/get.dart';
import '../graphql/generated/cart.graphql.dart';
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
      final res = await gqlProvider.execute(
        document: documentNodeQueryMyCart,
        fromJson: Query$MyCart.fromJson,
      );
      _updateCartFromTypedData(res.myCart);
    } catch (_) {
      // Ignore if offline
    } finally {
      isLoading.value = false;
    }
  }

  void _updateCartFromTypedData(Fragment$CartFields cartData) {
    serverSubtotal.value = cartData.subtotal / 100.0;
    serverSavings.value = cartData.savings / 100.0;
    serverDeliveryFee.value = cartData.deliveryFee / 100.0;
    serverTotal.value = cartData.total / 100.0;

    final map = <String, CartItem>{};
    for (final item in cartData.items) {
      final pid = item.productId;
      final priceVal = item.price / 100.0;
      final mrpVal = item.mrp / 100.0;

      final prod = Product(
        id: pid,
        name: item.name,
        category: 'General',
        price: priceVal,
        mrp: mrpVal,
        unit: item.unit,
        emoji: item.emoji ?? '🛒',
      );
      map[pid] = CartItem(id: item.id, product: prod, qty: item.quantity);
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
        final res = await gqlProvider.execute(
          document: documentNodeMutationAddToCart,
          fromJson: Mutation$AddToCart.fromJson,
          variables: Variables$Mutation$AddToCart(
            productId: product.id,
            quantity: existing != null ? existing.qty.value : 1,
          ).toJson(),
        );
        _updateCartFromAddToCart(res.addToCart);
      } catch (_) {}
    }
  }

  void _updateCartFromAddToCart(Fragment$CartFields cartData) {
    serverSubtotal.value = cartData.subtotal / 100.0;
    serverSavings.value = cartData.savings / 100.0;
    serverDeliveryFee.value = cartData.deliveryFee / 100.0;
    serverTotal.value = cartData.total / 100.0;

    final map = <String, CartItem>{};
    for (final item in cartData.items) {
      final pid = item.productId;
      final priceVal = item.price / 100.0;
      final mrpVal = item.mrp / 100.0;

      final prod = Product(
        id: pid,
        name: item.name,
        category: 'General',
        price: priceVal,
        mrp: mrpVal,
        unit: item.unit,
        emoji: item.emoji ?? '🛒',
      );
      map[pid] = CartItem(id: item.id, product: prod, qty: item.quantity);
    }
    items.assignAll(map);
  }

  Future<void> remove(String productId) async {
    final item = items.remove(productId);
    if (item?.id != null && gqlProvider.authToken != null) {
      try {
        final res = await gqlProvider.execute(
          document: documentNodeMutationRemoveCartItem,
          fromJson: Mutation$RemoveCartItem.fromJson,
          variables: Variables$Mutation$RemoveCartItem(itemId: item!.id!).toJson(),
        );
        _updateCartFromRemoveCartItem(res.removeCartItem);
      } catch (_) {}
    }
  }

  void _updateCartFromRemoveCartItem(Fragment$CartFields cartData) {
    serverSubtotal.value = cartData.subtotal / 100.0;
    serverSavings.value = cartData.savings / 100.0;
    serverDeliveryFee.value = cartData.deliveryFee / 100.0;
    serverTotal.value = cartData.total / 100.0;

    final map = <String, CartItem>{};
    for (final item in cartData.items) {
      final pid = item.productId;
      final priceVal = item.price / 100.0;
      final mrpVal = item.mrp / 100.0;

      final prod = Product(
        id: pid,
        name: item.name,
        category: 'General',
        price: priceVal,
        mrp: mrpVal,
        unit: item.unit,
        emoji: item.emoji ?? '🛒',
      );
      map[pid] = CartItem(id: item.id, product: prod, qty: item.quantity);
    }
    items.assignAll(map);
  }

  Future<void> increment(String productId) async {
    final item = items[productId];
    if (item != null) {
      item.qty.value++;
      if (gqlProvider.authToken != null) {
        if (item.id != null) {
          try {
            final res = await gqlProvider.execute(
              document: documentNodeMutationUpdateCartItem,
              fromJson: Mutation$UpdateCartItem.fromJson,
              variables: Variables$Mutation$UpdateCartItem(
                itemId: item.id!,
                quantity: item.qty.value,
              ).toJson(),
            );
            _updateCartFromUpdateCartItem(res.updateCartItem);
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
          final res = await gqlProvider.execute(
            document: documentNodeMutationUpdateCartItem,
            fromJson: Mutation$UpdateCartItem.fromJson,
            variables: Variables$Mutation$UpdateCartItem(
              itemId: item.id!,
              quantity: item.qty.value,
            ).toJson(),
          );
          _updateCartFromUpdateCartItem(res.updateCartItem);
        } catch (_) {}
      }
    }
  }

  void _updateCartFromUpdateCartItem(Fragment$CartFields cartData) {
    serverSubtotal.value = cartData.subtotal / 100.0;
    serverSavings.value = cartData.savings / 100.0;
    serverDeliveryFee.value = cartData.deliveryFee / 100.0;
    serverTotal.value = cartData.total / 100.0;

    final map = <String, CartItem>{};
    for (final item in cartData.items) {
      final pid = item.productId;
      final priceVal = item.price / 100.0;
      final mrpVal = item.mrp / 100.0;

      final prod = Product(
        id: pid,
        name: item.name,
        category: 'General',
        price: priceVal,
        mrp: mrpVal,
        unit: item.unit,
        emoji: item.emoji ?? '🛒',
      );
      map[pid] = CartItem(id: item.id, product: prod, qty: item.quantity);
    }
    items.assignAll(map);
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
