-- CreateTable
CREATE TABLE `quiz_response` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `answeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_response` (
    `id` VARCHAR(191) NOT NULL,
    `quizResponseId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `selectedAnswerId` VARCHAR(191) NULL,
    `discursiveAnswer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quiz_response` ADD CONSTRAINT `quiz_response_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_response` ADD CONSTRAINT `quiz_response_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_response` ADD CONSTRAINT `question_response_quizResponseId_fkey` FOREIGN KEY (`quizResponseId`) REFERENCES `quiz_response`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_response` ADD CONSTRAINT `question_response_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_response` ADD CONSTRAINT `question_response_selectedAnswerId_fkey` FOREIGN KEY (`selectedAnswerId`) REFERENCES `Answer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
