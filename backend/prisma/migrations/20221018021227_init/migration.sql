/*
  Warnings:

  - You are about to drop the `_CategoryToQuiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToQuiz` DROP FOREIGN KEY `_CategoryToQuiz_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToQuiz` DROP FOREIGN KEY `_CategoryToQuiz_B_fkey`;

-- AlterTable
ALTER TABLE `Quiz` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_CategoryToQuiz`;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
