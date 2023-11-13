import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateQuestionResponseDto } from '../../question-response/dto/create-question-response.dto';

export class CreateQuizResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  questionsResponse?: CreateQuestionResponseDto[];
}
