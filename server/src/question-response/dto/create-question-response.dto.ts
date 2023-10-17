import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionResponseDto {
  @IsString()
  @IsNotEmpty()
  quizResponseId?: string;

  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsOptional()
  selectedAnswerId?: string;

  @IsString()
  @IsOptional()
  discursiveAnswer?: string;
}
