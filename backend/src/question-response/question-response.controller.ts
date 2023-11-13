import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuestionResponseService } from './question-response.service';
import { CreateQuestionResponseDto } from './dto/create-question-response.dto';
import { UpdateQuestionResponseDto } from './dto/update-question-response.dto';

@ApiTags('question-response')
@Controller('question-response')
export class QuestionResponseController {
  constructor(
    private readonly questionResponseService: QuestionResponseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createQuestionResponseDto: CreateQuestionResponseDto) {
    return this.questionResponseService.create(createQuestionResponseDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.questionResponseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionResponseService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionResponseDto: UpdateQuestionResponseDto,
  ) {
    return this.questionResponseService.update(+id, updateQuestionResponseDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionResponseService.remove(+id);
  }
}
