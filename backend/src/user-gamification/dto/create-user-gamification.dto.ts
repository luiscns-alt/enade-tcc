import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserGamificationDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  points?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  level?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  dailyChallengesCompleted?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  currentStreak?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  rewardPoints?: number;

  @ApiProperty()
  @IsOptional()
  lastQuizTaken?: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  quizzesCompleted?: number;

  @ApiProperty()
  @IsString()
  userId: string;
}
