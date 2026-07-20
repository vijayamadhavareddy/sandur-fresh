import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/catalog_controller.dart';
import '../controllers/home_controller.dart';
import '../theme/app_colors.dart';
import '../widgets/delivery_badge.dart';
import '../widgets/product_card.dart';
import '../widgets/section_header.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final catalog = Get.find<CatalogController>();

    return SafeArea(
      child: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.location_on,
                          color: AppColors.primaryDark, size: 20),
                      const SizedBox(width: AppSpacing.xs),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Sandur Fresh',
                                style: Theme.of(context)
                                    .textTheme
                                    .headlineMedium),
                            Text('Home — Sandur, Karnataka',
                                style:
                                    Theme.of(context).textTheme.bodySmall),
                          ],
                        ),
                      ),
                      const DeliveryBadge(),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  TextField(
                    controller: catalog.searchController,
                    onChanged: (v) => catalog.searchQuery.value = v,
                    decoration: const InputDecoration(
                      hintText: 'Search groceries, snacks, pharmacy…',
                      prefixIcon: Icon(Icons.search),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  const _CategoryPills(),
                  const SizedBox(height: AppSpacing.lg),
                  const _PromoBanner(
                    color: AppColors.primary,
                    title: 'Fresh veggies from ₹18',
                    subtitle: 'Farm to door in 12 minutes',
                    emoji: '🥬',
                  ),
                  const SizedBox(height: AppSpacing.md),
                  const _PromoBanner(
                    color: AppColors.secondaryContainer,
                    title: 'Free delivery above ₹199',
                    subtitle: 'On every order, every day',
                    emoji: '🛵',
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  const SectionHeader(title: 'Bestsellers'),
                  const SizedBox(height: AppSpacing.md),
                ],
              ),
            ),
          ),
          Obx(() {
            final products = catalog.filteredProducts;
            if (products.isEmpty) {
              return SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(AppSpacing.xl),
                  child: Center(
                    child: Text('No products found',
                        style: Theme.of(context).textTheme.bodyMedium),
                  ),
                ),
              );
            }
            return SliverPadding(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.lg),
              sliver: SliverGrid(
                gridDelegate:
                    const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: AppSpacing.md,
                  crossAxisSpacing: AppSpacing.md,
                  childAspectRatio: 0.72,
                ),
                delegate: SliverChildBuilderDelegate(
                  (context, i) => ProductCard(product: products[i]),
                  childCount: products.length,
                ),
              ),
            );
          }),
          const SliverToBoxAdapter(
            child: SizedBox(height: AppSpacing.xl),
          ),
        ],
      ),
    );
  }
}

class _CategoryPills extends StatelessWidget {
  const _CategoryPills();

  @override
  Widget build(BuildContext context) {
    final catalog = Get.find<CatalogController>();
    return SizedBox(
      height: 40,
      child: Obx(() {
        final selected = catalog.selectedCategory.value;
        return ListView(
          scrollDirection: Axis.horizontal,
          children: [
            _Pill(
              label: 'All',
              selected: selected == null,
              onTap: () {
                catalog.setCategory(null);
              },
            ),
            ...catalog.categories.map((c) => _Pill(
                  label: c,
                  selected: selected == c,
                  onTap: () {
                    catalog.setCategory(c);
                    Get.find<HomeController>().setTab(1);
                  },
                )),
          ],
        );
      }),
    );
  }
}

class _Pill extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _Pill({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: AppSpacing.sm),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.pill),
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.lg,
            vertical: AppSpacing.sm,
          ),
          decoration: BoxDecoration(
            color: selected ? AppColors.primary : AppColors.surface,
            borderRadius: BorderRadius.circular(AppRadius.pill),
            border: Border.all(
              color: selected ? AppColors.primary : AppColors.border,
            ),
          ),
          child: Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: selected
                      ? AppColors.primaryDark
                      : AppColors.textPrimary,
                  fontWeight:
                      selected ? FontWeight.w700 : FontWeight.w500,
                ),
          ),
        ),
      ),
    );
  }
}

class _PromoBanner extends StatelessWidget {
  final Color color;
  final String title;
  final String subtitle;
  final String emoji;

  const _PromoBanner({
    required this.color,
    required this.title,
    required this.subtitle,
    required this.emoji,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(AppRadius.lg),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style:
                        Theme.of(context).textTheme.headlineMedium),
                const SizedBox(height: AppSpacing.xs),
                Text(subtitle,
                    style: Theme.of(context).textTheme.bodySmall),
              ],
            ),
          ),
          Text(emoji, style: const TextStyle(fontSize: 40)),
        ],
      ),
    );
  }
}
