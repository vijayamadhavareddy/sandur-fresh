import 'product.dart';

enum OrderStatus { onTheWay, delivered }

extension OrderStatusX on OrderStatus {
  String get label => switch (this) {
        OrderStatus.onTheWay => 'On the way',
        OrderStatus.delivered => 'Delivered',
      };
}

class Order {
  final String id;
  final List<CartItem> items;
  final double subtotal;
  final double savings;
  final double deliveryFee;
  final double total;
  final String paymentMethod;
  final String addressLine;
  final DateTime placedAt;

  Order({
    required this.id,
    required this.items,
    required this.subtotal,
    required this.savings,
    required this.deliveryFee,
    required this.total,
    required this.paymentMethod,
    required this.addressLine,
    required this.placedAt,
  });

  OrderStatus get status =>
      DateTime.now().difference(placedAt).inMinutes < 15
          ? OrderStatus.onTheWay
          : OrderStatus.delivered;

  int get itemCount =>
      items.fold(0, (sum, item) => sum + item.qty.value);
}
