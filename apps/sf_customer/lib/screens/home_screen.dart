import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/address_controller.dart';
import '../controllers/auth_controller.dart';
import '../controllers/cart_controller.dart';
import '../controllers/catalog_controller.dart';
import '../models/product.dart';
import '../theme/app_colors.dart';
import '../utils/format.dart';
import '../widgets/deal_countdown.dart';
import '../widgets/delivery_badge.dart';
import '../widgets/product_card.dart';
import '../widgets/quantity_stepper.dart';
import '../widgets/section_header.dart';
import '../widgets/veggie_bento_card.dart';

class HomeScreen extends GetView<CatalogController> {
  const HomeScreen({super.key});

  String _greeting() {
    final h = DateTime.now().hour;
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  @override
  Widget build(BuildContext context) {
    final auth = Get.find<AuthController>();
    final address = Get.find<AddressController>();

    return Column(
      children: [
        _Header(greeting: _greeting(), auth: auth, address: address),
        Expanded(
          child: SingleChildScrollView(
            child: Obx(() {
              final query = controller.searchQuery.value.trim();
              final category = controller.selectedCategory.value;
              final showResults = query.isNotEmpty || category != null;

              return Padding(
                padding: const EdgeInsets.fromLTRB(
                    AppSpacing.lg, AppSpacing.md, AppSpacing.lg, AppSpacing.xl),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const _CategoryChips(),
                    const SizedBox(height: AppSpacing.md),
                    if (showResults)
                      _ResultsSection(query: query, category: category)
                    else
                      const _Shelves(),
                  ],
                ),
              );
            }),
          ),
        ),
      ],
    );
  }
}

class _Header extends StatelessWidget {
  final String greeting;
  final AuthController auth;
  final AddressController address;

  const _Header({
    required this.greeting,
    required this.auth,
    required this.address,
  });

  @override
  Widget build(BuildContext context) {
    final topPad = MediaQuery.of(context).padding.top;
    final catalog = Get.find<CatalogController>();
    final textTheme = Theme.of(context).textTheme;

    return Container(
      width: double.infinity,
      color: AppColors.primaryDark,
      padding:
          EdgeInsets.fromLTRB(AppSpacing.lg, topPad + AppSpacing.md, AppSpacing.lg, AppSpacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Icon(Icons.location_on, color: AppColors.primary, size: 20),
              const SizedBox(width: AppSpacing.xs + 2),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Obx(() {
                      final addr = address.selected;
                      return Text(
                        '${addr?.label ?? 'Home'} — Sandur, Karnataka',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: textTheme.bodyMedium
                            ?.copyWith(color: Colors.white, fontWeight: FontWeight.w700),
                      );
                    }),
                    Obx(() {
                      final addr = address.selected;
                      return Text(
                        addr?.line ?? 'Add a delivery address',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: textTheme.bodySmall
                            ?.copyWith(color: Colors.white.withValues(alpha: 0.55)),
                      );
                    }),
                  ],
                ),
              ),
              const DeliveryBadge(),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Obx(() => Text(
                '$greeting, ${auth.name.value.split(' ').first}',
                style: textTheme.displayMedium?.copyWith(color: Colors.white),
              )),
          const SizedBox(height: AppSpacing.md),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 2),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.md),
            ),
            child: TextField(
              controller: catalog.searchController,
              onChanged: (v) => catalog.searchQuery.value = v,
              decoration: const InputDecoration(
                hintText: 'Search groceries, snacks, pharmacy…',
                prefixIcon: Icon(Icons.search),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                filled: false,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _CategoryChips extends GetView<CatalogController> {
  const _CategoryChips();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 40,
      child: Obx(() {
        final selected = controller.selectedCategory.value;
        return ListView(
          scrollDirection: Axis.horizontal,
          children: [
            _Pill(
              label: 'All',
              selected: selected == null,
              onTap: () => controller.setCategory(null),
            ),
            ...controller.categories.map((c) => _Pill(
                  label: c,
                  selected: selected == c,
                  onTap: () => controller.setCategory(selected == c ? null : c),
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

  const _Pill({required this.label, required this.selected, required this.onTap});

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
            border: Border.all(color: selected ? AppColors.primary : AppColors.border),
          ),
          child: Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: selected ? AppColors.primaryDark : AppColors.textPrimary,
                  fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                ),
          ),
        ),
      ),
    );
  }
}

class _ResultsSection extends GetView<CatalogController> {
  final String query;
  final String? category;

  const _ResultsSection({required this.query, required this.category});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final title = query.isNotEmpty ? 'Results for "$query"' : (category ?? '');
    final results = controller.filteredProducts;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(title, style: textTheme.headlineMedium),
            ),
            TextButton(
              onPressed: () {
                controller.searchController.clear();
                controller.searchQuery.value = '';
                controller.setCategory(null);
              },
              style: TextButton.styleFrom(
                padding: EdgeInsets.zero,
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              child: const Text('Clear'),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        if (results.isEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: AppSpacing.xxl),
            child: Center(
              child: Column(
                children: [
                  const Text('🧺', style: TextStyle(fontSize: 40)),
                  const SizedBox(height: AppSpacing.sm),
                  Text('Nothing found', style: textTheme.titleLarge),
                  Text('Try a different name or browse the shelves',
                      style: textTheme.bodySmall),
                ],
              ),
            ),
          )
        else
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            padding: EdgeInsets.zero,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: AppSpacing.md,
            crossAxisSpacing: AppSpacing.md,
            childAspectRatio: 0.79,
            children: results.map((p) => ProductCard(product: p)).toList(),
          ),
      ],
    );
  }
}

class _HorizontalShelf extends StatelessWidget {
  final List<Widget> children;

  const _HorizontalShelf({required this.children});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 236,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: children.length,
        separatorBuilder: (_, _) => const SizedBox(width: AppSpacing.md),
        itemBuilder: (_, i) => children[i],
      ),
    );
  }
}

class _Shelves extends GetView<CatalogController> {
  const _Shelves();

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final buyAgain = controller.buyAgain;
    final veggies = controller.freshFromFarm;
    final deals = controller.dealsForYou;
    final snacks = controller.snackPicks;
    final timedSections = controller.timeBoundSections;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (buyAgain.isNotEmpty) ...[
          const SectionHeader(title: 'Buy again'),
          const SizedBox(height: AppSpacing.sm),
          SizedBox(
            height: 152,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: buyAgain.length,
              separatorBuilder: (_, _) => const SizedBox(width: AppSpacing.sm),
              itemBuilder: (_, i) => _BuyAgainTile(product: buyAgain[i]),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
        ],
        if (veggies.isNotEmpty) ...[
          Row(
            children: [
              Expanded(
                child: Text('Fresh off the farm', style: textTheme.headlineMedium),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.sm + 2, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.primaryContainer,
                  borderRadius: BorderRadius.circular(AppRadius.pill),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.eco, size: 14, color: AppColors.success),
                    const SizedBox(width: 4),
                    Text('Harvested today',
                        style: textTheme.bodySmall?.copyWith(
                          color: AppColors.success,
                          fontWeight: FontWeight.w800,
                          fontSize: 11,
                        )),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          SizedBox(
            height: 236,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: veggies.length,
              separatorBuilder: (_, _) => const SizedBox(width: AppSpacing.sm),
              itemBuilder: (_, i) => VeggieBentoCard(product: veggies[i]),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
        ],
        if (deals.isNotEmpty) ...[
          Row(
            children: [
              Expanded(child: Text('Deals for you', style: textTheme.headlineMedium)),
              const DealCountdown(),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          _HorizontalShelf(
            children: deals
                .map((p) => SizedBox(width: 160, child: ProductCard(product: p)))
                .toList(),
          ),
          const SizedBox(height: AppSpacing.xl),
        ],
        for (final section in timedSections) ...[
          Row(
            children: [
              Expanded(child: Text(section.title, style: textTheme.headlineMedium)),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: AppSpacing.sm + 2, vertical: 4),
                decoration: BoxDecoration(
                  color: section.isNow ? AppColors.primary : AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(AppRadius.pill),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.schedule,
                        size: 14,
                        color:
                            section.isNow ? AppColors.primaryDark : AppColors.textSecondary),
                    const SizedBox(width: 4),
                    Text(
                      section.isNow
                          ? 'Now · till ${section.window.split('– ').last}'
                          : section.window,
                      style: textTheme.bodySmall?.copyWith(
                        color:
                            section.isNow ? AppColors.primaryDark : AppColors.textSecondary,
                        fontWeight: FontWeight.w700,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          _HorizontalShelf(
            children: section.items
                .map((p) => SizedBox(width: 160, child: ProductCard(product: p)))
                .toList(),
          ),
          const SizedBox(height: AppSpacing.xl),
        ],
        if (snacks.isNotEmpty) ...[
          SectionHeader(
            title: "Snack o'clock",
            actionLabel: 'See all',
            onAction: () => controller.setCategory('Snacks'),
          ),
          const SizedBox(height: AppSpacing.sm),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            padding: EdgeInsets.zero,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: AppSpacing.md,
            crossAxisSpacing: AppSpacing.md,
            childAspectRatio: 0.79,
            children: snacks.map((p) => ProductCard(product: p)).toList(),
          ),
          const SizedBox(height: AppSpacing.xl),
        ],
        // Padding(
        //   padding: const EdgeInsets.only(top: AppSpacing.sm),
        //   child: Column(
        //     crossAxisAlignment: CrossAxisAlignment.start,
        //     children: [
        //       Text(
        //         'Groceries in 12 minutes.',
        //         style: textTheme.displayLarge?.copyWith(color: AppColors.border),
        //       ),
        //       Text(
        //         'Sandur Fresh · Sandur, Karnataka',
        //         style: textTheme.bodyMedium?.copyWith(
        //           color: AppColors.textSecondary,
        //           fontWeight: FontWeight.w700,
        //         ),
        //       ),
        //     ],
        //   ),
        // ),
      ],
    );
  }
}

class _BuyAgainTile extends StatelessWidget {
  final Product product;

  const _BuyAgainTile({required this.product});

  @override
  Widget build(BuildContext context) {
    final cart = Get.find<CartController>();
    final textTheme = Theme.of(context).textTheme;

    return Container(
      width: 136,
      padding: const EdgeInsets.all(AppSpacing.sm + 2),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border.all(color: AppColors.border, width: 0.8),
        borderRadius: BorderRadius.circular(AppRadius.lg),
      ),
      child: InkWell(
        onTap: () => Get.toNamed('/product/${product.id}'),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: double.infinity,
              height: 56,
              decoration: BoxDecoration(
                color: AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(AppRadius.md),
              ),
              clipBehavior: Clip.antiAlias,
              alignment: Alignment.center,
              child: product.resolvedImageUrl != null
                  ? Image.network(
                      product.resolvedImageUrl!,
                      fit: BoxFit.cover,
                      width: double.infinity,
                      height: double.infinity,
                      errorBuilder: (context, error, stackTrace) => Text(
                        product.emoji,
                        style: const TextStyle(fontSize: 30),
                      ),
                    )
                  : Text(product.emoji, style: const TextStyle(fontSize: 30)),
            ),
            const SizedBox(height: 3),
            Text(
              product.name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: textTheme.bodyMedium
                  ?.copyWith(fontWeight: FontWeight.w700, fontSize: 12.5),
            ),
            // Always reserved (blank when there's no store) so every tile
            // in the shelf keeps the same height, whether or not it has a
            // store subtitle.
            SizedBox(
              height: 13,
              child: (product.storeName != null && product.storeName!.isNotEmpty)
                  ? Text(
                      'by ${product.storeName}',
                      style: textTheme.bodySmall?.copyWith(
                        fontSize: 9.5,
                        color: AppColors.textSecondary,
                        fontWeight: FontWeight.w500,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    )
                  : null,
            ),
            const SizedBox(height: 3),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: Text(
                    formatPrice(product.price),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: textTheme.bodyMedium
                        ?.copyWith(fontWeight: FontWeight.w800),
                  ),
                ),
                const SizedBox(width: 4),
                Obx(() {
                  final qty = cart.quantityOf(product.id);
                  if (qty > 0) {
                    return QuantityStepper(product: product, height: 26);
                  }
                  return InkWell(
                    onTap: () => cart.add(product),
                    borderRadius: BorderRadius.circular(AppRadius.pill),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: AppSpacing.sm + 2, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius: BorderRadius.circular(AppRadius.pill),
                      ),
                      child: Text(
                        'ADD',
                        style: textTheme.bodySmall?.copyWith(
                          color: AppColors.primaryDark,
                          fontWeight: FontWeight.w800,
                          fontSize: 11,
                        ),
                      ),
                    ),
                  );
                }),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
