/*
  Warnings:

  - You are about to drop the column `candidate_names` on the `electoral_slate` table. All the data in the column will be lost.
  - Added the required column `candidate_1` to the `electoral_slate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_2` to the `electoral_slate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `electoral_slate` DROP COLUMN `candidate_names`,
    ADD COLUMN `candidate_1` VARCHAR(191) NOT NULL,
    ADD COLUMN `candidate_2` VARCHAR(191) NOT NULL;
