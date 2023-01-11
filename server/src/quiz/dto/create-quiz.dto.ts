import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = true;

  @ApiProperty({ required: false })
  categoryId?: string;
}
