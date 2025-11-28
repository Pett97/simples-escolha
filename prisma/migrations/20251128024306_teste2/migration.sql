/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `election` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `electoral_slate` DROP FOREIGN KEY `electoral_slate_electionId_fkey`;

-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token_id_election_fkey`;

-- DropForeignKey
ALTER TABLE `vote` DROP FOREIGN KEY `vote_slate_id_fkey`;

-- DropIndex
DROP INDEX `electoral_slate_electionId_fkey` ON `electoral_slate`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `election`;

-- DropTable
DROP TABLE `token`;

-- DropTable
DROP TABLE `vote`;

-- CreateTable
CREATE TABLE `elections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voting_date` DATETIME(3) NOT NULL,
    `max_vote` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_expiration` DATETIME(3) NOT NULL,
    `used` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `hash_token` VARCHAR(191) NOT NULL,
    `id_election` INTEGER NOT NULL,

    UNIQUE INDEX `tokens_token_key`(`token`),
    UNIQUE INDEX `tokens_hash_token_key`(`hash_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash_token` VARCHAR(191) NOT NULL,
    `slate_id` INTEGER NOT NULL,
    `number_vote` INTEGER NOT NULL,

    UNIQUE INDEX `votes_hash_token_key`(`hash_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL,

    UNIQUE INDEX `users_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `electoral_slate` ADD CONSTRAINT `electoral_slate_electionId_fkey` FOREIGN KEY (`electionId`) REFERENCES `elections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_id_election_fkey` FOREIGN KEY (`id_election`) REFERENCES `elections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_slate_id_fkey` FOREIGN KEY (`slate_id`) REFERENCES `electoral_slate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
