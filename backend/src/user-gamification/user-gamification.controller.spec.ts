import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserGamificationDto } from './dto/create-user-gamification.dto';
import { UserGamificationController } from './user-gamification.controller';
import { UserGamificationService } from './user-gamification.service';

describe('UserGamificationController', () => {
  let controller: UserGamificationController;
  let service: UserGamificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGamificationController],
      providers: [
        {
          provide: UserGamificationService,
          useValue: {
            createUserGamification: jest
              .fn()
              .mockResolvedValue({ success: true }),
            updateUserGamification: jest
              .fn()
              .mockResolvedValue({ success: true }),
            getUserGamification: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserGamificationController>(
      UserGamificationController,
    );
    service = module.get<UserGamificationService>(UserGamificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUserGamification', () => {
    it('should create user gamification', async () => {
      const dto: CreateUserGamificationDto = {
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
      };
      expect(await controller.createUserGamification(dto)).toEqual({
        success: true,
      });
      expect(service.createUserGamification).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if creation fails', async () => {
      jest
        .spyOn(service, 'createUserGamification')
        .mockResolvedValueOnce({ success: false, message: 'Error message' });
      const dto: CreateUserGamificationDto = {
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
      };
      await expect(controller.createUserGamification(dto)).rejects.toThrow(
        'Error message',
      );
    });
  });

  describe('updateUserGamification', () => {
    it('should update user gamification', async () => {
      const userId = 'f03342c3-52af-4351-910b-b2f466934567';
      const dto: CreateUserGamificationDto = {
        points: 100,
        level: 2,
        dailyChallengesCompleted: 3,
        currentStreak: 4,
        rewardPoints: 50,
        lastQuizTaken: new Date('2023-09-14T00:00:00Z'),
        quizzesCompleted: 5,
        userId: 'f03342c3-52af-4351-910b-b2f466934567',
      };
      expect(await controller.updateUserGamification(userId, dto)).toEqual({
        success: true,
      });
      expect(service.updateUserGamification).toHaveBeenCalledWith(userId, dto);
    });
  });

  describe('getUserGamification', () => {
    it('should get user gamification', async () => {
      const userId = 'f03342c3-52af-4351-910b-b2f466934567';
      expect(await controller.getUserGamification(userId)).toEqual({
        success: true,
      });
      expect(service.getUserGamification).toHaveBeenCalledWith(userId);
    });
  });
});
