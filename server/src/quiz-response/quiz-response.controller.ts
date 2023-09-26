import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuizResponseService } from './quiz-response.service';
import { CreateQuizResponseDto } from './dto/create-quiz-response.dto';
import { UpdateQuizResponseDto } from './dto/update-quiz-response.dto';

@Controller('quiz-response')
export class QuizResponseController {
  constructor(private readonly quizResponseService: QuizResponseService) {}

  @Post()
  async create(@Body() createQuizResponseDto: CreateQuizResponseDto) {
    const result = await this.quizResponseService.create(createQuizResponseDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.quizResponseService.findAll();
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.quizResponseService.findOne(id);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
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

  @Delete()
  async removes(@Body('ids') ids: string[]) {
    const result = await this.quizResponseService.removes(ids);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
