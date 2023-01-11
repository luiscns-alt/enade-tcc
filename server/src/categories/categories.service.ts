import { Body, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() createCategoryDto: CreateCategoryDto) {
    let status: CategoryStatus = {
      success: true,
      message: 'CATEGORY_CREATE_SUCCESS',
    };

    try {
      status.data = await this.prisma.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async findAll(): Promise<CategoryFind> {
    let status: CategoryFind = {
      success: true,
      message: 'CATEGORY_FIND_ALL_SUCCESS',
    };
    try {
      status.data = await this.prisma.category.findMany();
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async findOne(id: string): Promise<CategoryStatus> {
    let status: CategoryStatus = {
      success: true,
      message: 'CATEGORY_FIND_ONE_SUCCESS',
    };
    try {
      status.data = await this.prisma.category.findUnique({
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    let status: CategoryStatus = {
      success: true,
      message: 'CATEGORY_REMOVE_SUCCESS',
    };
    try {
      status.data = await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }
}

export interface CategoryStatus {
  success: boolean;
  message: string;
  data?: Category;
}

export interface CategoryFind {
  success: boolean;
  message: string;
  data?: Category[];
}
