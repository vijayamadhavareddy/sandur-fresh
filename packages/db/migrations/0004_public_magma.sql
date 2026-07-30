CREATE TABLE `device_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`target` text NOT NULL,
	`kind` text NOT NULL,
	`platform` text NOT NULL,
	`user_agent` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_registrations_target_unique` ON `device_registrations` (`target`);--> statement-breakpoint
DROP TABLE `admin_devices`;