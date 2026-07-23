import 'product.dart';

enum OrderStatus { onTheWay, delivered, cancelled }

extension OrderStatusX on OrderStatus {
  String get label => switch (this) {
        OrderStatus.onTheWay => 'On the way',
        OrderStatus.delivered => 'Delivered',
        OrderStatus.cancelled => 'Cancelled',
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
  final String? rawStatus;

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
    this.rawStatus,
  });

  factory Order.fromGraphQL(Map<String, dynamic> json) {
    final subtotalVal = ((json['subtotal'] as num?) ?? 0) / 100.0;
    final deliveryFeeVal = ((json['deliveryFee'] as num?) ?? 0) / 100.0;
    final totalVal = ((json['total'] as num?) ?? 0) / 100.0;
    final discountVal = ((json['discount'] as num?) ?? 0) / 100.0;

    final rawItems = json['items'] as List<dynamic>? ?? [];
    final itemsList = rawItems.map((itemJson) {
      final m = itemJson as Map<String, dynamic>;
      final unitPriceVal = ((m['unitPrice'] as num?) ?? 0) / 100.0;
      final mrpVal = ((m['mrp'] as num?) ?? 0) / 100.0;
      final qty = (m['quantity'] as num?)?.toInt() ?? 1;

      final prod = Product(
        id: m['productId'] as String? ?? m['id'] as String? ?? '',
        name: m['name'] as String? ?? '',
        category: 'General',
        price: unitPriceVal,
        mrp: mrpVal > 0 ? mrpVal : unitPriceVal,
        unit: m['unit'] as String? ?? '1 unit',
        emoji: '📦',
      );

      return CartItem(id: m['id'] as String?, product: prod, qty: qty);
    }).toList();

    DateTime parsedDate;
    if (json['placedAt'] is String) {
      parsedDate = DateTime.tryParse(json['placedAt'] as String) ?? DateTime.now();
    } else {
      parsedDate = DateTime.now();
    }

    return Order(
      id: json['id'] as String? ?? '',
      items: itemsList,
      subtotal: subtotalVal,
      savings: discountVal,
      deliveryFee: deliveryFeeVal,
      total: totalVal,
      paymentMethod: json['paymentMethod'] as String? ?? 'COD',
      addressLine: json['addressId'] as String? ?? 'Delivery Address',
      placedAt: parsedDate,
      rawStatus: json['status'] as String?,
    );
  }

  OrderStatus get status {
    if (rawStatus == 'DELIVERED') return OrderStatus.delivered;
    if (rawStatus == 'CANCELLED') return OrderStatus.cancelled;
    if (rawStatus == 'OUT_FOR_DELIVERY' || rawStatus == 'PACKED' || rawStatus == 'PLACED') {
      return OrderStatus.onTheWay;
    }
    return DateTime.now().difference(placedAt).inMinutes < 15
        ? OrderStatus.onTheWay
        : OrderStatus.delivered;
  }

  int get itemCount => items.fold(0, (sum, item) => sum + item.qty.value);
}
