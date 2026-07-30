ALTER TABLE `stores` ADD `type` text DEFAULT 'DARK_STORE' NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD `partner_name` text;--> statement-breakpoint
ALTER TABLE `stores` ADD `contact_phone` text;--> statement-breakpoint
ALTER TABLE `stores` ADD `contact_email` text;--> statement-breakpoint
ALTER TABLE `stores` ADD `commission_pct` integer;