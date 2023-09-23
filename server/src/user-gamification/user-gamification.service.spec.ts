import { Test, TestingModule } from '@nestjs/testing';
import { UserGamificationService } from './user-gamification.service';
import { PrismaService } from '../prisma.service';
import { CreateUserGamificationDto } from './dto/create-user-gamification.dto';

describe('UserGamificationService', () => {
  let service: UserGamificationService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGamificationService,
        {
          provide: PrismaService,
          useValue: {
            userGamification: {
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserGamificationService>(UserGamificationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUserGamification', () => {
    it('should create a user gamification record', async () => {
      const data: CreateUserGamificationDto = {
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
      };
      const result = {
        id: '5bbb7f5a-c73d-45d0-85db-b06749384271',
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
      };

      jest
        .spyOn(prismaService.userGamification, 'create')
        .mockResolvedValue(result);

      expect(await service.createUserGamification(data)).toEqual({
        success: true,
        message: 'USER_GAMIFICATION_CREATE_SUCCESS',
        data: result,
      });
    });
  });

  describe('updateUserGamification', () => {
    it('should update a user gamification record', async () => {
      const userId = 'f03342c3-52af-4351-910b-b2f466934567';
      const data: CreateUserGamificationDto = {
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
      };
      const result = {
        id: '5bbb7f5a-c73d-45d0-85db-b06749384271',
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
      };

      jest
        .spyOn(prismaService.userGamification, 'update')
        .mockResolvedValue(result);

      expect(await service.updateUserGamification(userId, data)).toEqual({
        success: true,
        message: 'USER_GAMIFICATION_UPDATE_SUCCESS',
        data: result,
      });
    });
  });

  describe('getUserGamification', () => {
    it('should retrieve a user gamification record', async () => {
      const userId = 'f03342c3-52af-4351-910b-b2f466934567';
      const result = {
        id: '5bbb7f5a-c73d-45d0-85db-b06749384271',
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
      };

      jest
        .spyOn(prismaService.userGamification, 'findUnique')
        .mockResolvedValue(result);

      expect(await service.getUserGamification(userId)).toEqual({
        success: true,
        message: 'USER_GAMIFICATION_FETCH_SUCCESS',
        data: result,
      });
    });
  });
});
