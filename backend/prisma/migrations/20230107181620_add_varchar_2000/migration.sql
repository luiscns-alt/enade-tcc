/*
  Warnings:

  - You are about to alter the column `title` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(2000)`.

*/
-- AlterTable
ALTER TABLE `Question` MODIFY `title` VARCHAR(2000) NOT NULL;
