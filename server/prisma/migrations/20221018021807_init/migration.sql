-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_categoryId_fkey`;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
