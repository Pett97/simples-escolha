/*
  Warnings:

  - Added the required column `id_election` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `token` ADD COLUMN `id_election` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_id_election_fkey` FOREIGN KEY (`id_election`) REFERENCES `election`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
