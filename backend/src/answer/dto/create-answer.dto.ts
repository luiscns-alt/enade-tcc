import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty()
  text: string;

  @ApiProperty({ required: false, default: false })
  isCorrect?: boolean;
}
