ALTER TABLE `products` ADD `time_bound_sections` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `time_bound_section`;