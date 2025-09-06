/*
  Warnings:

  - You are about to drop the `ElectoralSlate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ElectoralSlate`;

-- CreateTable
CREATE TABLE `electoral_slate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number_vote` INTEGER NOT NULL,
    `candidate_names` JSON NOT NULL,

    UNIQUE INDEX `electoral_slate_number_vote_key`(`number_vote`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
