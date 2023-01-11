-- DropIndex
DROP INDEX `Question_title_key` ON `Question`;

-- AlterTable
ALTER TABLE `Question` MODIFY `title` LONGBLOB NOT NULL;
