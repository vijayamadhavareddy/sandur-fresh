import 'dart:async';

import 'package:flutter/material.dart';

import '../theme/app_colors.dart';

/// "Ends in MM:SS" chip for the deals shelf. Counts down from a fixed
/// duration set the first time the shelf is built.
class DealCountdown extends StatefulWidget {
  const DealCountdown({super.key});

  @override
  State<DealCountdown> createState() => _DealCountdownState();
}

class _DealCountdownState extends State<DealCountdown> {
  late DateTime _endsAt;
  late Timer _timer;
  Duration _remaining = Duration.zero;

  @override
  void initState() {
    super.initState();
    _endsAt = DateTime.now().add(const Duration(minutes: 29, seconds: 41));
    _tick();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => _tick());
  }

  void _tick() {
    final left = _endsAt.difference(DateTime.now());
    setState(() => _remaining = left.isNegative ? Duration.zero : left);
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final mins = _remaining.inMinutes;
    final secs = _remaining.inSeconds % 60;
    final label = '$mins:${secs.toString().padLeft(2, '0')}';
    return Container(
      padding:
          const EdgeInsets.symmetric(horizontal: AppSpacing.sm + 2, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.discount,
        borderRadius: BorderRadius.circular(AppRadius.sm),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.timer, size: 14, color: Colors.white),
          const SizedBox(width: 4),
          Text(
            'Ends in $label',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                  fontSize: 11,
                ),
          ),
        ],
      ),
    );
  }
}
