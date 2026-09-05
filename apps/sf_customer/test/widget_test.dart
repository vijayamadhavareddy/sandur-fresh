import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:sandur_fresh/controllers/address_controller.dart';
import 'package:sandur_fresh/controllers/auth_controller.dart';
import 'package:sandur_fresh/controllers/cart_controller.dart';
import 'package:sandur_fresh/controllers/catalog_controller.dart';
import 'package:sandur_fresh/controllers/checkout_controller.dart';
import 'package:sandur_fresh/controllers/orders_controller.dart';
import 'package:sandur_fresh/main.dart';
import 'package:sandur_fresh/models/address.dart';
import 'package:sandur_fresh/models/product.dart';
import 'package:sandur_fresh/providers/graphql_provider.dart';
import 'package:sandur_fresh/screens/address_form_screen.dart';
import 'package:sandur_fresh/screens/categories_screen.dart';
import 'package:sandur_fresh/screens/checkout_screen.dart';
import 'package:sandur_fresh/screens/home_screen.dart';
import 'package:sandur_fresh/screens/login_screen.dart';
import 'package:sandur_fresh/widgets/product_card.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    const channel = MethodChannel('plugins.flutter.io/path_provider');
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(channel, (MethodCall methodCall) async {
      return '.';
    });
    await GetStorage.init();
  });

  setUp(() async {
    Get.testMode = true;
    GetStorage().erase();
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

      expect(find.text('Login'), findsOneWidget);
      expect(
          find.text('Sandur Delivery — fresh from Sandur, Karnataka'),
          findsOneWidget);
    });

    testWidgets('logged-in user lands on home', (tester) async {
      await tester.pumpWidget(const SandurFreshApp());
      await tester.pumpAndSettle();

      final auth = Get.find<AuthController>();
      final addresses = Get.find<AddressController>();
      addresses.addresses.assignAll([
        const Address(
          id: 'addr-1',
          label: 'Home',
          line: '42, 2nd Cross, Sandur',
          city: 'Ballari',
          pincode: '583119',
          phone: '9876543210',
        ),
      ]);
      addresses.selectedId.value = 'addr-1';
      auth.isLoggedIn.value = true;
      Get.offAllNamed('/');
      await tester.pumpAndSettle();

      expect(find.text('Delivery in 12 mins'), findsOneWidget);
      expect(
          find.text('Search groceries, snacks, pharmacy…'), findsOneWidget);
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
            GetPage(name: '/addresses/new', page: () => const SizedBox()),
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
      Get.put(AddressController());
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

    test('beginAdd + saveForm adds and selects first address', () {
      final addresses = Get.find<AddressController>();
      addresses.clear();
      expect(addresses.selectedId.value, isNull);

      addresses.beginAdd();
      fillValidForm(addresses);
      expect(addresses.saveForm(), isTrue);
      expect(addresses.addresses.length, 1);
      expect(addresses.selected?.label, 'Work');
    });

    test('beginEdit + saveForm updates existing address', () {
      final addresses = Get.find<AddressController>();
      addresses.clear();
      addresses.beginAdd();
      fillValidForm(addresses);
      addresses.saveForm();

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
      addresses.clear();
      addresses.beginAdd();
      addresses.lineController.text = 'Line';
      // city / pincode / phone left empty
      expect(addresses.saveForm(), isFalse);
      expect(addresses.addresses.length, 0);
      await tester.pump(const Duration(seconds: 4));
      await tester.pumpAndSettle();
    });

    test('delete re-selects remaining address', () {
      final addresses = Get.find<AddressController>();
      addresses.clear();
      addresses.beginAdd();
      fillValidForm(addresses);
      addresses.saveForm();
      final firstId = addresses.addresses.first.id;

      addresses.beginAdd();
      addresses.formLabel.value = 'Home';
      addresses.lineController.text = '20 Station Road';
      addresses.cityController.text = 'Sandur';
      addresses.pincodeController.text = '583119';
      addresses.phoneController.text = '9876543210';
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
      final addresses = Get.put(AddressController());
      addresses.addresses.assignAll([
        const Address(
          id: 'addr-order-test',
          label: 'Home',
          line: '42, 2nd Cross, Sandur',
          city: 'Ballari',
          pincode: '583119',
          phone: '9876543210',
        ),
      ]);
      addresses.selectedId.value = 'addr-order-test';
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

  group('CatalogController', () {
    test('filters products across multiple time-bound sections', () {
      final controller = Get.put(CatalogController());
      controller.fetchedSections.assignAll([
        const TimeBoundSection(
          id: 'BREAKFAST',
          title: 'Breakfast essentials',
          window: '5 – 11 AM',
          isNow: true,
          items: [],
        ),
        const TimeBoundSection(
          id: 'LUNCH',
          title: 'Lunch thali picks',
          window: '11 AM – 4 PM',
          isNow: true,
          items: [],
        ),
      ]);

      final allDayItem = const Product(
        id: 'p1',
        name: 'Eggs Pack',
        category: 'Dairy',
        price: 60,
        mrp: 70,
        unit: '6 pcs',
        emoji: '🥚',
        timeBoundSections: ['BREAKFAST', 'LUNCH'],
      );

      final breakfastOnly = const Product(
        id: 'p2',
        name: 'Bread',
        category: 'Bakery',
        price: 40,
        mrp: 45,
        unit: '400 g',
        emoji: '🍞',
        timeBoundSections: ['BREAKFAST'],
      );

      controller.fetchedProducts.assignAll([allDayItem, breakfastOnly]);

      final sections = controller.timeBoundSections;
      expect(sections.length, 2);

      final breakfastSection = sections.firstWhere((s) => s.id == 'BREAKFAST');
      expect(breakfastSection.items.map((p) => p.id), containsAll(['p1', 'p2']));

      final lunchSection = sections.firstWhere((s) => s.id == 'LUNCH');
      expect(lunchSection.items.map((p) => p.id), contains('p1'));
      expect(lunchSection.items.map((p) => p.id), isNot(contains('p2')));
    });

    testWidgets('ProductCard displays store name subtitle when present',
        (tester) async {
      Get.put(CartController());
      final productWithStore = const Product(
        id: 'p-store',
        name: 'Organic Bananas',
        category: 'Fruits',
        price: 45,
        mrp: 50,
        unit: '1 kg',
        emoji: '🍌',
        storeName: 'Sandur Organic Mart',
      );

      await tester.pumpWidget(
        GetMaterialApp(
          home: Scaffold(
            body: ProductCard(product: productWithStore),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.text('Organic Bananas'), findsOneWidget);
      expect(find.text('by Sandur Organic Mart'), findsOneWidget);
    });

    testWidgets('ProductCard displays image when imageUrl is present',
        (tester) async {
      Get.put(CartController());
      const productWithImage = Product(
        id: 'p-img',
        name: 'Fresh Apples',
        category: 'Fruits',
        price: 120,
        mrp: 140,
        unit: '1 kg',
        emoji: '🍎',
        imageUrl: 'https://images.example.com/apple.jpg',
      );

      await tester.pumpWidget(
        GetMaterialApp(
          home: Scaffold(
            body: ProductCard(product: productWithImage),
          ),
        ),
      );

      expect(find.byType(Image), findsOneWidget);
      final imageWidget = tester.widget<Image>(find.byType(Image));
      expect((imageWidget.image as NetworkImage).url, 'https://images.example.com/apple.jpg');
    });

    testWidgets('ProductCard falls back to emoji when imageUrl is null or empty',
        (tester) async {
      Get.put(CartController());
      const productNoImage = Product(
        id: 'p-no-img',
        name: 'Fresh Apples',
        category: 'Fruits',
        price: 120,
        mrp: 140,
        unit: '1 kg',
        emoji: '🍎',
        imageUrl: null,
      );

      await tester.pumpWidget(
        GetMaterialApp(
          home: Scaffold(
            body: ProductCard(product: productNoImage),
          ),
        ),
      );

      expect(find.byType(Image), findsNothing);
      expect(find.text('🍎'), findsOneWidget);
    });

    test('Product parses imageUrl from GraphQL and resolves relative URL', () {
      final pAbsolute = Product.fromGraphQL({
        'id': 'p1',
        'name': 'Milk',
        'price': 60,
        'imageUrl': 'https://example.com/milk.png',
      });
      expect(pAbsolute.imageUrl, 'https://example.com/milk.png');
      expect(pAbsolute.resolvedImageUrl, 'https://example.com/milk.png');

      final pRelative = Product.fromGraphQL({
        'id': 'p2',
        'name': 'Cheese',
        'price': 150,
        'imageUrl': '/uploads/cheese.png',
      });
      expect(pRelative.imageUrl, '/uploads/cheese.png');
      expect(pRelative.resolvedImageUrl, isNotNull);
      expect(pRelative.resolvedImageUrl, endsWith('/uploads/cheese.png'));

      final pNull = Product.fromGraphQL({
        'id': 'p3',
        'name': 'Butter',
        'price': 80,
      });
      expect(pNull.imageUrl, isNull);
      expect(pNull.resolvedImageUrl, isNull);
    });
  });

  group('Checkout phone auto-fill and editing', () {
    testWidgets('auto-fills phone number from local storage and allows editing',
        (tester) async {
      final box = GetStorage();
      await box.write(AuthController.keyPhone, '9876543210');
      await box.write(AuthController.keyName, 'Vijay Kumar');

      Get.put(AuthController());
      Get.put(CartController());
      Get.put(OrdersController());
      Get.put(AddressController());
      final checkout = Get.put(CheckoutController());

      await tester.pumpWidget(GetMaterialApp(
        initialRoute: '/checkout',
        getPages: [
          GetPage(name: '/checkout', page: () => const CheckoutScreen()),
          GetPage(name: '/addresses', page: () => const SizedBox()),
        ],
      ));
      await tester.pumpAndSettle();

      // Check phone number and name auto-filled
      expect(find.text('9876543210'), findsOneWidget);
      expect(find.text('Vijay Kumar'), findsOneWidget);

      // Verify the phone field is editable and accepts user input
      final phoneField = find.widgetWithText(TextField, '9876543210');
      expect(phoneField, findsOneWidget);
      await tester.enterText(phoneField, '9123456789');
      await tester.pumpAndSettle();

      expect(checkout.phoneController.text, '9123456789');
      expect(find.text('9123456789'), findsOneWidget);
    });
  });

  group('Small screen layout without overflow', () {
    testWidgets('HomeScreen buy again and deals shelves render without overflow on small screens',
        (tester) async {
      tester.view.physicalSize = const Size(320, 568);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() => tester.view.resetPhysicalSize());

      Get.put(AuthController());
      final cart = Get.put(CartController());
      final catalog = Get.put(CatalogController());
      Get.put(AddressController());

      const item1 = Product(
        id: 'p1',
        name: 'Fresh Farm Milk 500ml',
        category: 'Dairy',
        price: 27,
        mrp: 35,
        unit: '500 ml',
        emoji: '🥛',
      );
      const item2 = Product(
        id: 'p2',
        name: 'Organic Farm Tomatoes Premium',
        category: 'Vegetables',
        price: 45,
        mrp: 60,
        unit: '1 kg',
        emoji: '🍅',
      );

      catalog.fetchedProducts.assignAll([item1, item2]);

      await tester.pumpWidget(const GetMaterialApp(
        home: Scaffold(body: HomeScreen()),
      ));
      await tester.pumpAndSettle();

      // Ensure no exceptions or overflow errors were thrown
      expect(tester.takeException(), isNull);

      // Add item to cart to activate QuantityStepper
      await cart.add(item1);
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
    });

    testWidgets('CategoriesScreen grid renders without overflow on small screens',
        (tester) async {
      tester.view.physicalSize = const Size(320, 568);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() => tester.view.resetPhysicalSize());

      Get.put(AuthController());
      Get.put(CartController());
      final catalog = Get.put(CatalogController());
      Get.put(AddressController());

      const item1 = Product(
        id: 'p1',
        name: 'Fresh Farm Milk 500ml',
        category: 'Dairy',
        price: 27,
        mrp: 35,
        unit: '500 ml',
        emoji: '🥛',
      );
      const item2 = Product(
        id: 'p2',
        name: 'Organic Farm Tomatoes Premium',
        category: 'Dairy',
        price: 45,
        mrp: 60,
        unit: '1 kg',
        emoji: '🍅',
      );

      catalog.fetchedProducts.assignAll([item1, item2]);

      await tester.pumpWidget(const GetMaterialApp(
        home: Scaffold(body: CategoriesScreen()),
      ));
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
    });
  });

  group('Login, Address Sync, and Storage Persistence', () {
    testWidgets('login without address routes to new address form and auto-fills phone',
        (tester) async {
      final box = GetStorage();
      await box.erase();

      Get.put(AuthController());
      final addresses = Get.put(AddressController());
      addresses.clear();

      await tester.pumpWidget(GetMaterialApp(
        initialRoute: '/login',
        getPages: [
          GetPage(name: '/login', page: () => const LoginScreen()),
          GetPage(name: '/addresses/new', page: () => const AddressFormScreen()),
          GetPage(name: '/', page: () => const SizedBox()),
        ],
      ));
      await tester.pumpAndSettle();

      final auth = Get.find<AuthController>();
      auth.phoneController.text = '9876543210';
      await auth.sendOtp();
      await tester.pumpAndSettle();

      // Trigger verification
      if (auth.generatedOtp.value != null) {
        auth.otpController.text = auth.generatedOtp.value!;
        await auth.verifyOtp();
      }
      await tester.pumpAndSettle();

      // Should have navigated to /addresses/new because addresses was empty
      expect(find.text('Add delivery address'), findsOneWidget);
      expect(addresses.phoneController.text, '9876543210');
      await tester.pump(const Duration(seconds: 5));
      await tester.pumpAndSettle();
    });

    testWidgets('saving address persists phone and address into local memory and navigates to home',
        (tester) async {
      final box = GetStorage();
      await box.erase();
      await box.write(AuthController.keyPhone, '9876543210');
      await box.write(AuthController.keyToken, 'test-token');

      Get.put(AuthController());
      final addresses = Get.put(AddressController());
      addresses.clear();

      await tester.pumpWidget(GetMaterialApp(
        initialRoute: '/initial',
        getPages: [
          GetPage(name: '/initial', page: () => const SizedBox()),
          GetPage(name: '/addresses/new', page: () => const AddressFormScreen()),
          GetPage(name: '/', page: () => const Scaffold(body: Text('Home Landing Screen'))),
        ],
      ));
      Get.toNamed('/addresses/new', arguments: {'fromLogin': true});
      await tester.pumpAndSettle();

      addresses.beginAdd();
      addresses.lineController.text = '123 Station Road';
      addresses.cityController.text = 'Sandur';
      addresses.pincodeController.text = '583119';
      addresses.phoneController.text = '9876543210';

      final saveButton = find.widgetWithText(ElevatedButton, 'Save address');
      expect(saveButton, findsOneWidget);
      await tester.tap(saveButton);
      await tester.pumpAndSettle();

      // Should land on home
      expect(find.text('Home Landing Screen'), findsOneWidget);

      // Verify persistence in local memory
      expect(box.read<String>(AuthController.keyPhone), '9876543210');
      final savedAddresses = box.read<List>(AddressController.keySavedAddresses);
      expect(savedAddresses, isNotNull);
      expect(savedAddresses!.length, 1);
      expect(savedAddresses.first['city'], 'Sandur');
      expect(savedAddresses.first['pincode'], '583119');
    });

    testWidgets('persisted login and address are restored across app closures',
        (tester) async {
      final box = GetStorage();
      await box.erase();
      await box.write(AuthController.keyPhone, '9876543210');
      await box.write(AuthController.keyName, 'Vijay');
      await box.write(AuthController.keyToken, 'persistent-token');
      await box.write(AddressController.keySavedAddresses, [
        {
          'id': 'addr-persisted',
          'label': 'Home',
          'line': '50 Gandhi Chowk',
          'city': 'Sandur',
          'pincode': '583119',
          'phone': '9876543210',
          'lat': 15.0821,
          'lng': 76.5492,
          'isDefault': true,
        }
      ]);
      await box.write(AddressController.keySelectedAddressId, 'addr-persisted');

      Get.reset();
      final auth = Get.put(AuthController());
      final addresses = Get.put(AddressController());

      expect(auth.isLoggedIn.value, isTrue);
      expect(auth.phone.value, '9876543210');
      expect(auth.name.value, 'Vijay');
      expect(addresses.addresses.length, 1);
      expect(addresses.selected?.line, '50 Gandhi Chowk');
      expect(addresses.selectedId.value, 'addr-persisted');
    });

    testWidgets('logout clears persistent memory and redirects to login',
        (tester) async {
      final box = GetStorage();
      await box.write(AuthController.keyPhone, '9876543210');
      await box.write(AuthController.keyToken, 'token-to-delete');
      await box.write(AddressController.keySavedAddresses, [{'id': 'a1'}]);

      Get.reset();
      final auth = Get.put(AuthController());
      final addresses = Get.put(AddressController());
      Get.put(CartController());

      await tester.pumpWidget(GetMaterialApp(
        initialRoute: '/',
        getPages: [
          GetPage(name: '/', page: () => const SizedBox()),
          GetPage(name: '/login', page: () => const Scaffold(body: Text('Login Screen'))),
        ],
      ));
      await tester.pumpAndSettle();

      auth.logout();
      await tester.pumpAndSettle();

      expect(auth.isLoggedIn.value, isFalse);
      expect(box.read(AuthController.keyToken), isNull);
      expect(box.read(AuthController.keyPhone), isNull);
      expect(box.read(AddressController.keySavedAddresses), isNull);
      expect(addresses.addresses, isEmpty);
      expect(find.text('Login Screen'), findsOneWidget);
    });
  });
}
