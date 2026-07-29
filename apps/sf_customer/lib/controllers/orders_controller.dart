import 'package:get/get.dart';
import '../graphql/generated/orders.graphql.dart';
import '../models/order.dart';
import '../models/product.dart';
import '../providers/graphql_provider.dart';

class OrdersController extends GetxController {
  final GraphQLProvider gqlProvider = Get.find<GraphQLProvider>();

  final RxList<Order> orders = <Order>[].obs;
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchOrders();
  }

  Future<void> fetchOrders() async {
    if (gqlProvider.authToken == null) return;
    isLoading.value = true;
    try {
      final res = await gqlProvider.execute(
        document: documentNodeQueryMyOrders,
        fromJson: Query$MyOrders.fromJson,
        variables: Variables$Query$MyOrders(page: 1, limit: 20).toJson(),
      );
      final rawItems = res.myOrders.items;
      final parsedOrders = rawItems.map((item) {
        final subtotalVal = item.subtotal / 100.0;
        final deliveryFeeVal = item.deliveryFee / 100.0;
        final totalVal = item.total / 100.0;
        final discountVal = item.discount / 100.0;

        final itemsList = item.items.map((itemJson) {
          final unitPriceVal = itemJson.unitPrice / 100.0;
          final mrpVal = itemJson.mrp / 100.0;
          final qty = itemJson.quantity;

          final prod = Product(
            id: itemJson.productId,
            name: itemJson.name,
            category: 'General',
            price: unitPriceVal,
            mrp: mrpVal > 0 ? mrpVal : unitPriceVal,
            unit: itemJson.unit,
            emoji: '📦',
          );

          return CartItem(id: itemJson.id, product: prod, qty: qty);
        }).toList();

        final parsedDate = DateTime.tryParse(item.placedAt) ?? DateTime.now();

        return Order(
          id: item.id,
          items: itemsList,
          subtotal: subtotalVal,
          savings: discountVal,
          deliveryFee: deliveryFeeVal,
          total: totalVal,
          paymentMethod: item.paymentMethod,
          addressLine: item.addressId,
          placedAt: parsedDate,
          rawStatus: item.status,
        );
      }).toList();

      orders.assignAll(parsedOrders);
    } catch (_) {
      // Offline fallback
    } finally {
      isLoading.value = false;
    }
  }

  void addOrder(Order order) => orders.insert(0, order);
}
