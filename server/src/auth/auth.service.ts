import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserGamificationDto } from '../user-gamification/dto/create-user-gamification.dto';
import { UserGamificationService } from '../user-gamification/user-gamification.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from 'src/users/users.user.dto';
import { JwtPayload } from './jwt.strategy';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
// import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly userGamificationService: UserGamificationService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      status.data = await this.usersService.create(userDto);
      const userGamificationData: CreateUserGamificationDto = {
        userId: status.data.id,
        points: 0,
        level: 0,
        dailyChallengesCompleted: 0,
        currentStreak: 0,
        rewardPoints: 0,
        quizzesCompleted: 0,
      };
      const gamificationStatus =
        await this.userGamificationService.createUserGamification(
          userGamificationData,
        );

      if (!gamificationStatus.success) {
        status = {
          success: false,
          message: gamificationStatus.message,
        };
        return status;
      }
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  private _createToken({ login }): any {
    const user: JwtPayload = { login };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
