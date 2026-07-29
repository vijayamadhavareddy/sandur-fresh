import 'package:flutter/material.dart';

import '../theme/app_colors.dart';

class PromoBanner extends StatelessWidget {
  final Color color;
  final String title;
  final String subtitle;
  final String emoji;

  const PromoBanner({
    super.key,
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
                Text(title, style: Theme.of(context).textTheme.headlineMedium),
                const SizedBox(height: AppSpacing.xs),
                Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
              ],
            ),
          ),
          Text(emoji, style: const TextStyle(fontSize: 40)),
        ],
      ),
    );
  }
}
