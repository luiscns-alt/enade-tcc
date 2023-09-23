import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserGamificationDto {
  @IsOptional()
  @IsInt()
  points?: number;

  @IsOptional()
  @IsInt()
  level?: number;

  @IsOptional()
  @IsInt()
  dailyChallengesCompleted?: number;

  @IsOptional()
  @IsInt()
  currentStreak?: number;

  @IsOptional()
  @IsInt()
  rewardPoints?: number;

  @IsOptional()
  lastQuizTaken?: Date;

  @IsOptional()
  @IsInt()
  quizzesCompleted?: number;

  @IsString()
  userId: string;
}
