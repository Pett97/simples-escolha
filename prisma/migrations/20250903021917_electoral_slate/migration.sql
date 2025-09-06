-- CreateTable
CREATE TABLE `ElectoralSlate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numberVote` INTEGER NOT NULL,
    `candidateNames` JSON NOT NULL,

    UNIQUE INDEX `ElectoralSlate_numberVote_key`(`numberVote`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
