/*
  Warnings:

  - Added the required column `electionId` to the `electoral_slate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `electoral_slate` ADD COLUMN `electionId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `election` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voting_date` DATETIME(3) NOT NULL,
    `max_vote` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `electoral_slate` ADD CONSTRAINT `electoral_slate_electionId_fkey` FOREIGN KEY (`electionId`) REFERENCES `election`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
