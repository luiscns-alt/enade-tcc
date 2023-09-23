import { Body, Injectable } from '@nestjs/common';
import { QuizResponse } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateQuizResponseDto } from './dto/create-quiz-response.dto';
import { UpdateQuizResponseDto } from './dto/update-quiz-response.dto';

@Injectable()
export class QuizResponseService {
  constructor(private prisma: PrismaService) {}
  async create(@Body() createQuizResponseDto: CreateQuizResponseDto) {
    let status: QuizResponseStatus = {
      success: true,
      message: 'QUIZ_RESPONSE_CREATE_SUCCESS',
    };
    try {
      status.data = await this.prisma.quizResponse.create({
        data: createQuizResponseDto,
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
    return `This action returns all quizResponse`;
  }

  async findOne(id: string) {
    let status: QuizResponseStatus = {
      success: true,
      message: 'QUIZ_RESPONSE_FIND_ONE_SUCCESS',
    };
    try {
      status.data = await this.prisma.quizResponse.findUnique({
        where: { id },
        include: {
          questionsResponse: {
            include: {
              question: {
                include: {
                  answers: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  update(id: number, updateQuizResponseDto: UpdateQuizResponseDto) {
    return `This action updates a #${id} quizResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizResponse`;
  }
}
export interface QuizResponseStatus {
  success: boolean;
  message: string;
  data?: QuizResponse;
}
