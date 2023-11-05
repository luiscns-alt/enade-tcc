import { Injectable } from '@nestjs/common';
import { UserGamification } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserGamificationDto } from './dto/create-user-gamification.dto';

@Injectable()
export class UserGamificationService {
  constructor(private prisma: PrismaService) {}

  async createUserGamification(
    data: CreateUserGamificationDto,
  ): Promise<UserGamificationStatus> {
    let status: UserGamificationStatus = {
      success: true,
      message: 'USER_GAMIFICATION_CREATE_SUCCESS',
    };

    try {
      status.data = await this.prisma.userGamification.create({ data });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async updateUserGamification(
    userId: string,
    data: CreateUserGamificationDto,
  ): Promise<UserGamificationStatus> {
    let status: UserGamificationStatus = {
      success: true,
      message: 'USER_GAMIFICATION_UPDATE_SUCCESS',
    };

    try {
      status.data = await this.prisma.userGamification.update({
        where: { userId },
        data,
      });
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async getUserGamification(userId: string): Promise<UserGamificationStatus> {
    let status: UserGamificationStatus = {
      success: true,
      message: 'USER_GAMIFICATION_FETCH_SUCCESS',
    };

    try {
      status.data = await this.prisma.userGamification.findUnique({
        where: { userId },
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

export interface UserGamificationStatus {
  success: boolean;
  message: string;
  data?: UserGamification;
}
