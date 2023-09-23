import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizResponseService } from './quiz-response.service';
import { CreateQuizResponseDto } from './dto/create-quiz-response.dto';
import { UpdateQuizResponseDto } from './dto/update-quiz-response.dto';

@Controller('quiz-response')
export class QuizResponseController {
  constructor(private readonly quizResponseService: QuizResponseService) {}

  @Post()
  create(@Body() createQuizResponseDto: CreateQuizResponseDto) {
    return this.quizResponseService.create(createQuizResponseDto);
  }

  @Get()
  findAll() {
    return this.quizResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizResponseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizResponseDto: UpdateQuizResponseDto,
  ) {
    return this.quizResponseService.update(+id, updateQuizResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizResponseService.remove(+id);
  }
}
