import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserGamificationDto } from './dto/create-user-gamification.dto';
import { UserGamificationService } from './user-gamification.service';

@Controller('user-gamification')
export class UserGamificationController {
  constructor(
    private readonly userGamificationService: UserGamificationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUserGamification(@Body() data: CreateUserGamificationDto) {
    const result = await this.userGamificationService.createUserGamification(
      data,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':userId')
  async updateUserGamification(
    @Param('userId') userId: string,
    @Body() data: CreateUserGamificationDto,
  ) {
    const result = await this.userGamificationService.updateUserGamification(
      userId,
      data,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async getUserGamification(@Param('userId') userId: string) {
    const result = await this.userGamificationService.getUserGamification(
      userId,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
