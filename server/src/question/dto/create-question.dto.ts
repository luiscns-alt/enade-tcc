import { ApiProperty } from '@nestjs/swagger';

export enum Type {
  OBJECTIVE = 'OBJECTIVE',
  DISCURSIVE = 'DISCURSIVE',
}

export class CreateQuestionDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  type: Type;

  @ApiProperty()
  image?: string;
}
