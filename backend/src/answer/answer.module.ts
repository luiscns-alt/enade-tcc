import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [PrismaModule],
})
export class AnswerModule {}
