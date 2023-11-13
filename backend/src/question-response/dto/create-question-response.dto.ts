import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quizResponseId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  selectedAnswerId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  discursiveAnswer?: string;
}
