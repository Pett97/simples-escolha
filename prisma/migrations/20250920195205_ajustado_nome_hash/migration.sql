/*
  Warnings:

  - You are about to drop the column `hash` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash_token]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash_token]` on the table `vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash_token` to the `token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash_token` to the `vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `token` DROP COLUMN `hash`,
    ADD COLUMN `hash_token` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vote` DROP COLUMN `hash`,
    ADD COLUMN `hash_token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `token_token_key` ON `token`(`token`);

-- CreateIndex
CREATE UNIQUE INDEX `token_hash_token_key` ON `token`(`hash_token`);

-- CreateIndex
CREATE UNIQUE INDEX `vote_hash_token_key` ON `vote`(`hash_token`);
