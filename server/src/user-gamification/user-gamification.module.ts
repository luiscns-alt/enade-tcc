import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserGamificationController } from './user-gamification.controller';
import { UserGamificationService } from './user-gamification.service';

@Module({
  controllers: [UserGamificationController],
  providers: [UserGamificationService],
  imports: [PrismaModule],
})
export class UserGamificationModule {}
