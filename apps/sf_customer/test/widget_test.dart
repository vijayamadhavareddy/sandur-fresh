import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:sandur_fresh/controllers/address_controller.dart';
import 'package:sandur_fresh/controllers/auth_controller.dart';
import 'package:sandur_fresh/controllers/cart_controller.dart';
import 'package:sandur_fresh/controllers/checkout_controller.dart';
import 'package:sandur_fresh/controllers/orders_controller.dart';
import 'package:sandur_fresh/main.dart';
import 'package:sandur_fresh/models/product.dart';
import 'package:sandur_fresh/providers/graphql_provider.dart';

void main() {
  setUp(() {
    Get.testMode = true;
    final gql = Get.put(GraphQLProvider());
    gql.mockHandler = (query, variables) async {
      if (query.toLowerCase().contains('checkout')) {
        return {
          '__typename': 'Mutation',
          'checkout': {
            '__typename': 'AppOrder',
            'id': 'order-test-1',
            'userId': 'u1',
            'storeId': 's1',
            'addressId': 'addr-1',
            'status': 'PLACED',
            'subtotal': 5400,
            'deliveryFee': 0,
            'discount': 0,
            'total': 5400,
            'paymentMethod': 'COD',
            'idempotencyKey': 'sf-idemp-123',
            'placedAt': '2026-07-29T12:00:00Z',
            'items': [
              {
                '__typename': 'AppOrderItem',
                'id': 'oi1',
                'productId': 'm1',
                'name': 'Milk',
                'unit': '500 ml',
                'unitPrice': 2700,
                'mrp': 2800,
                'quantity': 2,
              }
            ]
          }
        };
      }
      return <String, dynamic>{};
    };
  });

  tearDown(Get.reset);

  group('SandurFreshApp smoke test', () {
    testWidgets('lands on login screen when logged out', (tester) async {
      await tester.pumpWidget(const SandurFreshApp());
      await tester.pumpAndSettle();

      expect(find.text('Sandur Fresh'), findsOneWidget);
      expect(find.text('Login with OTP'), findsOneWidget);
      expect(find.text('Send OTP'), findsOneWidget);
    });

    testWidgets('logged-in user lands on home', (tester) async {
      await tester.pumpWidget(const SandurFreshApp());
      await tester.pumpAndSettle();

      final auth = Get.find<AuthController>();
      auth.isLoggedIn.value = true;
      Get.offAllNamed('/');
      await tester.pumpAndSettle();

      expect(find.text('Delivery in 12 mins'), findsOneWidget);
      expect(find.text('Bestsellers'), findsOneWidget);
    });
  });

  group('CartController', () {
    const milk = Product(
      id: 'm1',
      name: 'Milk',
      category: 'Dairy',
      price: 27,
      mrp: 28,
      unit: '500 ml',
      emoji: '🥛',
    );
    const bread = Product(
      id: 'b1',
      name: 'Bread',
      category: 'Bakery',
      price: 45,
      mrp: 50,
      unit: '400 g',
      emoji: '🍞',
    );
    const detergent = Product(
      id: 'd1',
      name: 'Detergent',
      category: 'Household',
      price: 210,
      mrp: 240,
      unit: '2 kg',
      emoji: '🧺',
    );

    setUp(() {
      Get.put(CartController());
    });

    test('add inserts item and increments on repeat add', () async {
      final cart = Get.find<CartController>();
      await cart.add(milk);
      await cart.add(milk);

      expect(cart.items.length, 1);
      expect(cart.quantityOf('m1'), 2);
      expect(cart.itemCount, 2);
    });

    test('increment and decrement adjust quantity', () async {
      final cart = Get.find<CartController>();
      await cart.add(milk);
      await cart.increment('m1');
      expect(cart.quantityOf('m1'), 2);
      await cart.decrement('m1');
      expect(cart.quantityOf('m1'), 1);
      await cart.decrement('m1');
      expect(cart.items.containsKey('m1'), isFalse);
    });

    test('subtotal and savings math', () async {
      final cart = Get.find<CartController>();
      await cart.add(milk); // 27, mrp 28 → savings 1
      await cart.add(bread); // 45, mrp 50 → savings 5
      await cart.increment('b1'); // 2x bread

      expect(cart.subtotal, 27 + 45 * 2);
      expect(cart.savings, 1 + 5 * 2);
    });

    test('delivery fee applies below threshold, free above', () async {
      final cart = Get.find<CartController>();
      await cart.add(milk); // 27 < 199
      expect(cart.deliveryFee, 25);
      expect(cart.total, 27 + 25);

      await cart.add(detergent); // 27 + 210 = 237 >= 199
      expect(cart.deliveryFee, 0);
      expect(cart.total, 237);
    });

    test('clear empties the cart', () async {
      final cart = Get.find<CartController>();
      await cart.add(milk);
      await cart.add(bread);
      cart.clear();
      expect(cart.items, isEmpty);
      expect(cart.subtotal, 0);
    });
  });

  group('AuthController', () {
    Widget testApp() => GetMaterialApp(
          initialRoute: '/login',
          getPages: [
            GetPage(name: '/', page: () => const SizedBox()),
            GetPage(name: '/login', page: () => const SizedBox()),
          ],
        );

    testWidgets('sendOtp rejects invalid phone', (tester) async {
      await tester.pumpWidget(testApp());
      Get.put(AuthController());
      final auth = Get.find<AuthController>();

      auth.phoneController.text = '123';
      expect(await auth.sendOtp(), isFalse);
      expect(auth.otpSent.value, isFalse);
      expect(auth.generatedOtp.value, isNull);
      await tester.pump(const Duration(seconds: 4));
      await tester.pumpAndSettle();
    });

    testWidgets('sendOtp generates OTP for 10-digit number', (tester) async {
      await tester.pumpWidget(testApp());
      Get.put(AuthController());
      final auth = Get.find<AuthController>();

      auth.phoneController.text = '9876543210';
      expect(await auth.sendOtp(), isTrue);
      expect(auth.otpSent.value, isTrue);
      expect(auth.phone.value, '9876543210');
      await tester.pump(const Duration(seconds: 4));
      await tester.pumpAndSettle();
    });

    testWidgets('verifyOtp fails on mismatch, succeeds on match',
        (tester) async {
      await tester.pumpWidget(testApp());
      Get.put(AuthController());
      final auth = Get.find<AuthController>();

      auth.phoneController.text = '9876543210';
      await auth.sendOtp();

      auth.otpController.text = '0000' == auth.generatedOtp.value
          ? '0001'
          : '0000';
      expect(await auth.verifyOtp(), isFalse);
      expect(auth.isLoggedIn.value, isFalse);

      if (auth.generatedOtp.value != null) {
        auth.otpController.text = auth.generatedOtp.value!;
        expect(await auth.verifyOtp(), isTrue);
        expect(auth.isLoggedIn.value, isTrue);
      }
      await tester.pump(const Duration(seconds: 8));
      await tester.pumpAndSettle();
    });
  });

  group('AddressController', () {
    setUp(() {
      Get.put(AddressController());
    });

    void fillValidForm(AddressController c) {
      c.formLabel.value = 'Work';
      c.lineController.text = '10 MG Road';
      c.cityController.text = 'Ballari';
      c.pincodeController.text = '583101';
      c.phoneController.text = '9123456780';
    }

    test('seeded with one selected Home address', () {
      final addresses = Get.find<AddressController>();
      expect(addresses.addresses.length, 1);
      expect(addresses.selectedId.value, addresses.addresses.first.id);
      expect(addresses.selected?.label, 'Home');
    });

    test('beginAdd + saveForm adds and selects first address', () {
      final addresses = Get.find<AddressController>();
      addresses.delete(addresses.addresses.first.id);
      expect(addresses.selectedId.value, isNull);

      addresses.beginAdd();
      fillValidForm(addresses);
      expect(addresses.saveForm(), isTrue);
      expect(addresses.addresses.length, 1);
      expect(addresses.selected?.label, 'Work');
    });

    test('beginEdit + saveForm updates existing address', () {
      final addresses = Get.find<AddressController>();
      final original = addresses.addresses.first;
      addresses.beginEdit(original);
      expect(addresses.lineController.text, original.line);

      addresses.cityController.text = 'Hospet';
      expect(addresses.saveForm(), isTrue);
      expect(addresses.addresses.length, 1);
      expect(addresses.addresses.first.city, 'Hospet');
      expect(addresses.addresses.first.id, original.id);
    });

    testWidgets('saveForm rejects invalid input', (tester) async {
      await tester.pumpWidget(GetMaterialApp(home: Container()));
      final addresses = Get.find<AddressController>();
      addresses.beginAdd();
      addresses.lineController.text = 'Line';
      // city / pincode / phone left empty
      expect(addresses.saveForm(), isFalse);
      expect(addresses.addresses.length, 1);
      await tester.pump(const Duration(seconds: 4));
      await tester.pumpAndSettle();
    });

    test('delete re-selects remaining address', () {
      final addresses = Get.find<AddressController>();
      final firstId = addresses.addresses.first.id;
      addresses.beginAdd();
      fillValidForm(addresses);
      addresses.saveForm();
      final secondId = addresses.addresses.last.id;

      addresses.select(secondId);
      expect(addresses.selectedId.value, secondId);
      addresses.delete(secondId);
      expect(addresses.selectedId.value, firstId);
    });
  });

  group('Order flow', () {
    testWidgets('placeOrder creates an order and clears the cart',
        (tester) async {
      await tester.pumpWidget(GetMaterialApp(
        initialRoute: '/',
        getPages: [
          GetPage(name: '/', page: () => const SizedBox()),
          GetPage(name: '/order-success', page: () => const SizedBox()),
        ],
      ));

      Get.put(AuthController());
      Get.put(CartController());
      Get.put(OrdersController());
      Get.put(AddressController());
      Get.put(CheckoutController());

      const milk = Product(
        id: 'm1',
        name: 'Milk',
        category: 'Dairy',
        price: 27,
        mrp: 28,
        unit: '500 ml',
        emoji: '🥛',
      );

      final cart = Get.find<CartController>();
      final orders = Get.find<OrdersController>();
      final checkout = Get.find<CheckoutController>();

      await cart.add(milk);
      await cart.add(milk);
      await checkout.placeOrder();
      await tester.pumpAndSettle();

      expect(orders.orders.length, 1);
      final order = orders.orders.first;
      expect(order.items.length, 1);
      expect(order.items.first.qty.value, 2);
      expect(order.subtotal, 54);
      expect(order.total, 54);
      expect(order.paymentMethod, 'COD');
      expect(checkout.lastOrderId.value, order.id);
      expect(cart.items, isEmpty);
    });
  });
}
