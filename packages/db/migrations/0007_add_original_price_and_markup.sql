ALTER TABLE `products` ADD `original_price` integer;--> statement-breakpoint
ALTER TABLE `products` ADD `markup` integer;--> statement-breakpoint
ALTER TABLE `products` ADD `markup_type` text DEFAULT 'PERCENTAGE';