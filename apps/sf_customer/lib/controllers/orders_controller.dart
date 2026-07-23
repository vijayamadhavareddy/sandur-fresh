import 'package:get/get.dart';
import '../models/order.dart';
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
      const doc = '''
        query MyOrders {
          myOrders(page: 1, limit: 20) {
            items {
              id
              userId
              storeId
              addressId
              status
              subtotal
              deliveryFee
              discount
              total
              paymentMethod
              idempotencyKey
              placedAt
              items {
                id
                productId
                name
                unit
                unitPrice
                mrp
                quantity
              }
            }
            page
            limit
            total
          }
        }
      ''';
      final res = await gqlProvider.sendQuery(doc);
      final ordersPage = res['myOrders'] as Map<String, dynamic>?;
      if (ordersPage != null) {
        final rawItems = ordersPage['items'] as List<dynamic>? ?? [];
        final parsedOrders = rawItems
            .map((item) => Order.fromGraphQL(item as Map<String, dynamic>))
            .toList();
        orders.assignAll(parsedOrders);
      }
    } catch (_) {
      // Offline fallback
    } finally {
      isLoading.value = false;
    }
  }

  void addOrder(Order order) => orders.insert(0, order);
}
