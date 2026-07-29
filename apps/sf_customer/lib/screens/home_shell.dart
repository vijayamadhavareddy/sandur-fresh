import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/cart_controller.dart';
import '../controllers/home_controller.dart';
import '../theme/app_colors.dart';
import '../widgets/cart_summary_bar.dart';
import 'cart_screen.dart';
import 'categories_screen.dart';
import 'home_screen.dart';
import 'profile_screen.dart';

class HomeShell extends StatelessWidget {
  const HomeShell({super.key});

  @override
  Widget build(BuildContext context) {
    final home = Get.find<HomeController>();
    final cart = Get.find<CartController>();

    return Obx(() => Scaffold(
          body: IndexedStack(
            index: home.tabIndex.value,
            children: const [
              HomeScreen(),
              CategoriesScreen(),
              CartScreen(),
              ProfileScreen(),
            ],
          ),
          bottomNavigationBar: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (home.tabIndex.value != 2)
                CartSummaryBar(onViewCart: () => home.setTab(2)),
              _BottomNav(home: home, cart: cart),
            ],
          ),
        ));
  }
}

class _BottomNav extends StatelessWidget {
  final HomeController home;
  final CartController cart;

  const _BottomNav({required this.home, required this.cart});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
            currentIndex: home.tabIndex.value,
            onTap: home.setTab,
            items: [
              const BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined),
                activeIcon: Icon(Icons.home),
                label: 'Home',
              ),
              const BottomNavigationBarItem(
                icon: Icon(Icons.grid_view_outlined),
                activeIcon: Icon(Icons.grid_view),
                label: 'Categories',
              ),
              BottomNavigationBarItem(
                icon: Obx(() => Badge(
                      isLabelVisible: cart.itemCount > 0,
                      label: Text('${cart.itemCount}'),
                      backgroundColor: AppColors.primary,
                      textColor: AppColors.primaryDark,
                      child: const Icon(Icons.shopping_cart_outlined),
                    )),
                activeIcon: Obx(() => Badge(
                      isLabelVisible: cart.itemCount > 0,
                      label: Text('${cart.itemCount}'),
                      backgroundColor: AppColors.primary,
                      textColor: AppColors.primaryDark,
                      child: const Icon(Icons.shopping_cart),
                    )),
                label: 'Cart',
              ),
              const BottomNavigationBarItem(
                icon: Icon(Icons.person_outline),
                activeIcon: Icon(Icons.person),
                label: 'Profile',
              ),
            ],
          );
  }
}
