import 'package:get/get.dart';

import '../models/order.dart';

class OrdersController extends GetxController {
  final RxList<Order> orders = <Order>[].obs;

  void addOrder(Order order) => orders.insert(0, order);
}
