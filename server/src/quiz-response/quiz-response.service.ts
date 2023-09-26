import { Body, Injectable } from '@nestjs/common';
import { Prisma, QuizResponse } from '@prisma/client';
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
      if (createQuizResponseDto.questionsResponse) {
        status.data = await this.prisma.quizResponse.create({
          data: {
            userId: createQuizResponseDto.userId,
            quizId: createQuizResponseDto.quizId,
            questionsResponse: {
              create: createQuizResponseDto.questionsResponse,
            },
          },
          include: {
            questionsResponse: true,
          },
        });
      } else {
        status.data = await this.prisma.quizResponse.create({
          data: {
            userId: createQuizResponseDto.userId,
            quizId: createQuizResponseDto.quizId,
          },
        });
      }
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }

    return status;
  }

  async findAll() {
    let status: QuizResponseStatus = {
      success: true,
      message: ' QUIZ_RESPONSE_FIND_ALL_SUCCESS',
    };
    try {
      status.data = await this.prisma.quizResponse.findMany({
        include: {
          user: true,
          quiz: true,
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

      status.total = await this.prisma.quizResponse.count();
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
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
  async removes(ids: string[]) {
    let status: QuizResponseStatus = {
      success: true,
      message: 'QUIZ_RESPONSE_REMOVES_SUCCESS',
    };
    try {
      status.data = await this.prisma.quizResponse.deleteMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }
}
export interface QuizResponseStatus {
  success: boolean;
  message: string;
  data?: QuizResponse | QuizResponse[] | Prisma.BatchPayload;
  total?: number;
}
