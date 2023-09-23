import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateQuestionResponseDto } from '../../question-response/dto/create-question-response.dto';

export class CreateQuizResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsArray()
  @IsOptional()
  questionsResponse?: CreateQuestionResponseDto[];
}
