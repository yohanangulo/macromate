CREATE TABLE `meals` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`calories` real DEFAULT 0 NOT NULL,
	`protein` real DEFAULT 0 NOT NULL,
	`carbs` real DEFAULT 0 NOT NULL,
	`fat` real DEFAULT 0 NOT NULL,
	`synced` integer DEFAULT false NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
