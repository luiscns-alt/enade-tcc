import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    let status: QuestionStatus = {
      success: true,
      message: 'QUESTION_CREATE_SUCCESS',
    };

    try {
      status.data = await this.prisma.question.create({
        data: createQuestionDto,
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async findAll(): Promise<QuestionFind> {
    let status: QuestionFind = {
      success: true,
      message: 'QUESTION_FIND_ALL_SUCCESS',
    };
    try {
      status.data = await this.prisma.question.findMany();
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async findOne(id: string): Promise<QuestionStatus> {
    let status: QuestionStatus = {
      success: true,
      message: 'QUIZ_FIND_ONE_SUCCESS',
    };
    try {
      status.data = await this.prisma.question.findUnique({
        where: { id },
        include: { answers: true },
      });
    } catch (e) {
      status = {
        success: false,
        message: e,
      };
    }
    return status;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionStatus> {
    let status: QuestionStatus = {
      success: true,
      message: 'QUESTION_UPDATE_SUCCESS',
    };
    try {
      status.data = await this.prisma.question.update({
        where: { id },
        data: updateQuestionDto,
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async remove(id: string): Promise<QuestionStatus> {
    let status: QuestionStatus = {
      success: true,
      message: 'QUIZ_REMOVE_SUCCESS',
    };
    try {
      status.data = await this.prisma.question.delete({ where: { id } });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }
}

export interface QuestionStatus {
  success: boolean;
  message: string;
  data?: Question;
}

export interface QuestionFind {
  success: boolean;
  message: string;
  data?: Question[];
}
