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
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuizResponseService } from './quiz-response.service';
import { CreateQuizResponseDto } from './dto/create-quiz-response.dto';
import { UpdateQuizResponseDto } from './dto/update-quiz-response.dto';

@Controller('quiz-response')
export class QuizResponseController {
  constructor(private readonly quizResponseService: QuizResponseService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createQuizResponseDto: CreateQuizResponseDto) {
    const result = await this.quizResponseService.create(createQuizResponseDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const result = await this.quizResponseService.findAll();
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.quizResponseService.findOne(id);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('quiz/:id')
  async findQuizOne(@Param('id') id: string) {
    const result = await this.quizResponseService.findByQuizId(id);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user/:id')
  async findUserOne(@Param('id') id: string) {
    const result = await this.quizResponseService.findByUserId(id);
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

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete()
  async removes(@Body('ids') ids: string[]) {
    const result = await this.quizResponseService.removes(ids);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
