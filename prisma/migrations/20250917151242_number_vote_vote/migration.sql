/*
  Warnings:

  - Added the required column `number_vote` to the `vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vote` ADD COLUMN `number_vote` INTEGER NOT NULL;
