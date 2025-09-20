/*
  Warnings:

  - You are about to drop the column `id_token` on the `vote` table. All the data in the column will be lost.
  - Added the required column `token` to the `token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vote` DROP FOREIGN KEY `vote_id_token_fkey`;

-- DropIndex
DROP INDEX `vote_id_token_fkey` ON `vote`;

-- AlterTable
ALTER TABLE `token` ADD COLUMN `token` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vote` DROP COLUMN `id_token`,
    ADD COLUMN `hash` VARCHAR(191) NOT NULL;
