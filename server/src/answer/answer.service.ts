import { Injectable } from '@nestjs/common';
import { Answer } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async create(createAnswerDto: CreateAnswerDto) {
    let status: AnswerStatus = {
      success: true,
      message: 'ANSWER_CREATE_SUCCESS',
    };
    try {
      status.data = await this.prisma.answer.createMany({
        data: createAnswerDto,
      });
    } catch (e) {
      status = {
        success: false,
        message: e,
      };
    }
    return status;
  }

  async findAll() {
    let status: AnswerFind = {
      success: true,
      message: 'ANSWER_FIND_ALL_SUCCESS',
    };
    try {
      status.data = await this.prisma.answer.findMany();
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async findOne(id: string): Promise<AnswerStatus> {
    let status: AnswerStatus = {
      success: true,
      message: 'ANSWER_FIND_ONE_SUCCESS',
    };
    try {
      status.data = await this.prisma.answer.findUnique({
        where: { id },
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    let status: AnswerStatus = {
      success: true,
      message: 'ANSWER_UPDATE_SUCCESS',
    };
    try {
      status.data = await this.prisma.answer.update({
        where: { id },
        data: updateAnswerDto,
      });
    } catch (e) {
      status = {
        success: false,
        message: e,
      };
    }
    return status;
  }

  async remove(id: string): Promise<AnswerStatus> {
    let status: AnswerStatus = {
      success: true,
      message: 'ANSWER_REMOVE_SUCCESS',
    };
    try {
      status.data = await this.prisma.answer.delete({ where: { id } });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }
}

export interface AnswerStatus {
  success: boolean;
  message: string;
  data?: any;
}

export interface AnswerFind {
  success: boolean;
  message: string;
  data?: Answer[];
}
