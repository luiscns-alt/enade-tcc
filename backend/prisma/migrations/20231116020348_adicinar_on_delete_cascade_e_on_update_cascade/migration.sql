-- DropForeignKey
ALTER TABLE `question_response` DROP FOREIGN KEY `question_response_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `question_response` DROP FOREIGN KEY `question_response_selectedAnswerId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz_response` DROP FOREIGN KEY `quiz_response_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz_response` DROP FOREIGN KEY `quiz_response_userId_fkey`;

-- AddForeignKey
ALTER TABLE `quiz_response` ADD CONSTRAINT `quiz_response_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_response` ADD CONSTRAINT `quiz_response_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_response` ADD CONSTRAINT `question_response_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_response` ADD CONSTRAINT `question_response_selectedAnswerId_fkey` FOREIGN KEY (`selectedAnswerId`) REFERENCES `Answer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
