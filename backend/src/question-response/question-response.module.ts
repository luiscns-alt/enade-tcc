import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionResponseService } from './question-response.service';
import { QuestionResponseController } from './question-response.controller';

@Module({
  controllers: [QuestionResponseController],
  providers: [QuestionResponseService],
  imports: [PrismaModule],
})
export class QuestionResponseModule {}
