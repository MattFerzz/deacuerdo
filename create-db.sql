-- ambassador_details definition

CREATE TABLE `decision_rooms` (
`id` INTEGER PRIMARY KEY AUTOINCREMENT,
`settings` JSON,
`users` JSON,
`created_at` DATETIME NOT NULL,
`updated_at` DATETIME NOT NULL
);