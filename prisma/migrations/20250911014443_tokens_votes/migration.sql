-- CreateTable
CREATE TABLE `token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_expiration` DATETIME(3) NOT NULL,
    `used` INTEGER NOT NULL,
    `hash` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_token` INTEGER NOT NULL,
    `slate_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vote` ADD CONSTRAINT `vote_id_token_fkey` FOREIGN KEY (`id_token`) REFERENCES `token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vote` ADD CONSTRAINT `vote_slate_id_fkey` FOREIGN KEY (`slate_id`) REFERENCES `electoral_slate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
