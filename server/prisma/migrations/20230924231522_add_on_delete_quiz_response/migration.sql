-- DropForeignKey
ALTER TABLE `question_response` DROP FOREIGN KEY `question_response_quizResponseId_fkey`;

-- AddForeignKey
ALTER TABLE `question_response` ADD CONSTRAINT `question_response_quizResponseId_fkey` FOREIGN KEY (`quizResponseId`) REFERENCES `quiz_response`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
