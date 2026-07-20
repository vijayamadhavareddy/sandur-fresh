import '../models/product.dart';

const List<String> kCategories = [
  'Fruits & Veg',
  'Dairy',
  'Snacks',
  'Beverages',
  'Household',
  'Personal Care',
  'Pharmacy',
  'Bakery',
];

const List<Product> kCatalog = [
  // Fruits & Veg
  Product(id: 'p1', name: 'Banana Robusta', category: 'Fruits & Veg', price: 32, mrp: 40, unit: '500 g', emoji: '🍌'),
  Product(id: 'p2', name: 'Tomato Desi', category: 'Fruits & Veg', price: 24, mrp: 30, unit: '500 g', emoji: '🍅'),
  Product(id: 'p3', name: 'Onion', category: 'Fruits & Veg', price: 38, mrp: 45, unit: '1 kg', emoji: '🧅'),
  Product(id: 'p4', name: 'Apple Shimla', category: 'Fruits & Veg', price: 145, mrp: 145, unit: '4 pcs', emoji: '🍎'),
  Product(id: 'p5', name: 'Spinach Bunch', category: 'Fruits & Veg', price: 18, mrp: 25, unit: '250 g', emoji: '🥬', inStock: false),
  // Dairy
  Product(id: 'p6', name: 'Amul Taaza Milk', category: 'Dairy', price: 27, mrp: 28, unit: '500 ml', emoji: '🥛'),
  Product(id: 'p7', name: 'Curd Cup', category: 'Dairy', price: 35, mrp: 40, unit: '400 g', emoji: '🍶'),
  Product(id: 'p8', name: 'Butter Salted', category: 'Dairy', price: 58, mrp: 60, unit: '100 g', emoji: '🧈'),
  Product(id: 'p9', name: 'Paneer Fresh', category: 'Dairy', price: 92, mrp: 110, unit: '200 g', emoji: '🧀'),
  Product(id: 'p10', name: 'Eggs Brown', category: 'Dairy', price: 84, mrp: 84, unit: '6 pcs', emoji: '🥚'),
  // Snacks
  Product(id: 'p11', name: 'Potato Chips', category: 'Snacks', price: 20, mrp: 20, unit: '52 g', emoji: '🍟'),
  Product(id: 'p12', name: 'Chocolate Bar', category: 'Snacks', price: 45, mrp: 50, unit: '1 pc', emoji: '🍫'),
  Product(id: 'p13', name: 'Cookies Cream', category: 'Snacks', price: 30, mrp: 35, unit: '120 g', emoji: '🍪'),
  Product(id: 'p14', name: 'Instant Noodles', category: 'Snacks', price: 14, mrp: 14, unit: '70 g', emoji: '🍜'),
  // Beverages
  Product(id: 'p15', name: 'Cola Drink', category: 'Beverages', price: 40, mrp: 45, unit: '750 ml', emoji: '🥤'),
  Product(id: 'p16', name: 'Orange Juice', category: 'Beverages', price: 110, mrp: 125, unit: '1 L', emoji: '🧃'),
  Product(id: 'p17', name: 'Green Tea', category: 'Beverages', price: 145, mrp: 180, unit: '25 bags', emoji: '🍵'),
  Product(id: 'p18', name: 'Cold Coffee', category: 'Beverages', price: 60, mrp: 60, unit: '200 ml', emoji: '🧋', inStock: false),
  // Household
  Product(id: 'p19', name: 'Dishwash Gel', category: 'Household', price: 99, mrp: 115, unit: '500 ml', emoji: '🧴'),
  Product(id: 'p20', name: 'Floor Cleaner', category: 'Household', price: 120, mrp: 140, unit: '1 L', emoji: '🧹'),
  Product(id: 'p21', name: 'Garbage Bags', category: 'Household', price: 75, mrp: 75, unit: '30 pcs', emoji: '🛍️'),
  Product(id: 'p22', name: 'Laundry Detergent', category: 'Household', price: 210, mrp: 240, unit: '2 kg', emoji: '🧺'),
  // Personal Care
  Product(id: 'p23', name: 'Shampoo Anti-Dandruff', category: 'Personal Care', price: 165, mrp: 199, unit: '340 ml', emoji: '🧴'),
  Product(id: 'p24', name: 'Toothpaste', category: 'Personal Care', price: 85, mrp: 95, unit: '150 g', emoji: '🪥'),
  Product(id: 'p25', name: 'Handwash Refill', category: 'Personal Care', price: 72, mrp: 89, unit: '750 ml', emoji: '🧼'),
  Product(id: 'p26', name: 'Face Moisturizer', category: 'Personal Care', price: 199, mrp: 199, unit: '100 g', emoji: '🧖'),
  // Pharmacy
  Product(id: 'p27', name: 'Paracetamol 500mg', category: 'Pharmacy', price: 22, mrp: 26, unit: '15 tabs', emoji: '💊'),
  Product(id: 'p28', name: 'Vitamin C Chewable', category: 'Pharmacy', price: 95, mrp: 110, unit: '20 tabs', emoji: '🍊'),
  Product(id: 'p29', name: 'First Aid Bandages', category: 'Pharmacy', price: 40, mrp: 40, unit: '10 pcs', emoji: '🩹'),
  // Bakery
  Product(id: 'p30', name: 'Whole Wheat Bread', category: 'Bakery', price: 45, mrp: 50, unit: '400 g', emoji: '🍞'),
  Product(id: 'p31', name: 'Croissant', category: 'Bakery', price: 55, mrp: 55, unit: '2 pcs', emoji: '🥐'),
  Product(id: 'p32', name: 'Chocolate Muffin', category: 'Bakery', price: 38, mrp: 45, unit: '1 pc', emoji: '🧁'),
];
