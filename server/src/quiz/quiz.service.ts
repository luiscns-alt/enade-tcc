import { Injectable } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { Quiz } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() createQuizDto: CreateQuizDto): Promise<QuizStatus> {
    let status: QuizStatus = {
      success: true,
      message: 'QUIZ_CREATE_SUCCESS',
    };

    try {
      status.data = await this.prisma.quiz.create({ data: createQuizDto });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async findAll(): Promise<QuizFind> {
    let status: QuizFind = {
      success: true,
      message: 'QUIZ_FIND_ALL_SUCCESS',
    };
    try {
      status.data = await this.prisma.quiz.findMany({
        where: { published: true },
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async findOne(id: string): Promise<QuizStatus> {
    let status: QuizStatus = {
      success: true,
      message: 'QUIZ_FIND_ONE_SUCCESS',
    };
    try {
      status.data = await this.prisma.quiz.findUnique({
        where: { id },
        include: {
          question: {
            include: { answers: true },
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

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<QuizStatus> {
    let status: QuizStatus = {
      success: true,
      message: 'QUIZ_UPDATE_SUCCESS',
    };
    try {
      status.data = await this.prisma.quiz.update({
        where: { id },
        data: updateQuizDto,
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async remove(id: string): Promise<QuizStatus> {
    let status: QuizStatus = {
      success: true,
      message: 'QUIZ_REMOVE_SUCCESS',
    };
    try {
      status.data = await this.prisma.quiz.delete({ where: { id } });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  findDrafts() {
    return this.prisma.quiz.findMany({ where: { published: false } });
  }
}

export interface QuizStatus {
  success: boolean;
  message: string;
  data?: Quiz;
}

export interface QuizFind {
  success: boolean;
  message: string;
  data?: Quiz[];
}
