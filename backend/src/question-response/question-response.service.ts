import { Body, Injectable } from '@nestjs/common';
import { QuestionResponse } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateQuestionResponseDto } from './dto/create-question-response.dto';
import { UpdateQuestionResponseDto } from './dto/update-question-response.dto';

@Injectable()
export class QuestionResponseService {
  constructor(private prisma: PrismaService) {}
  async create(@Body() createQuestionResponseDto: CreateQuestionResponseDto) {
    let status: QuestionResponseStatus = {
      success: true,
      message: 'CREATE_QUESTION_RESPONSE_SUCCESS',
    };
    try {
      status.data = await this.prisma.questionResponse.create({
        data: createQuestionResponseDto,
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  findAll() {
    return `This action returns all questionResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionResponse`;
  }

  update(id: number, updateQuestionResponseDto: UpdateQuestionResponseDto) {
    return `This action updates a #${id} questionResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionResponse`;
  }
}

export interface QuestionResponseStatus {
  success: boolean;
  message: string;
  data?: QuestionResponse;
}
