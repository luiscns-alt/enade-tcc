import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizResponseService } from './quiz-response.service';
import { QuizResponseController } from './quiz-response.controller';

@Module({
  controllers: [QuizResponseController],
  providers: [QuizResponseService],
  imports: [PrismaModule],
})
export class QuizResponseModule {}
