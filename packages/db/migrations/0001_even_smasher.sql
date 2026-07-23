CREATE TABLE `admin_credentials` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_credentials_user_id_unique` ON `admin_credentials` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `admin_credentials_email_unique` ON `admin_credentials` (`email`);--> statement-breakpoint
CREATE TABLE `inventory_adjustments` (
	`id` text PRIMARY KEY NOT NULL,
	`inventory_id` text NOT NULL,
	`delta` integer NOT NULL,
	`reason` text NOT NULL,
	`adjusted_by` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`inventory_id`) REFERENCES `inventory`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`adjusted_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `order_status_history` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`from_status` text,
	`to_status` text NOT NULL,
	`changed_by` text,
	`reason` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `order_status_history` (`id`, `order_id`, `from_status`, `to_status`, `changed_by`, `reason`, `created_at`)
SELECT `id` || '-initial', `id`, NULL, `status`, NULL, 'Backfilled current status', `placed_at` FROM `orders`;--> statement-breakpoint
ALTER TABLE `inventory` ADD `low_stock_threshold` integer DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD `address` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD `updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL;
