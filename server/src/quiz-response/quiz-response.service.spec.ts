import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateQuizResponseDto } from './dto/create-quiz-response.dto';
import { QuizResponseService } from './quiz-response.service';

describe('QuizResponseService', () => {
  let service: QuizResponseService;
  let prismaService: PrismaService;

  const SAMPLE_USER_ID = 'f03342c3-52af-4351-910b-b2f466934567';
  const SAMPLE_QUIZ_ID = 'a02f6fd4-0150-4103-bc7f-c16fbb51302a';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizResponseService,
        {
          provide: PrismaService,
          useValue: {
            quizResponse: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<QuizResponseService>(QuizResponseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('QuizResponse Creation', () => {
    let createQuizResponseDto: CreateQuizResponseDto;
    let mockResponse: any;

    beforeEach(() => {
      createQuizResponseDto = {
        userId: SAMPLE_USER_ID,
        quizId: SAMPLE_QUIZ_ID,
        questionsResponse: [
          {
            questionId: '9de89607-b185-47df-b0fd-aee5ef11e9e4',
            selectedAnswerId: 'dd4ebe4f-8672-464f-afa3-ce7fd648d6f4',
          },
        ],
      };

      mockResponse = {
        id: '3aa1a58a-e1db-41b0-acd7-7c90d968abc5',
        userId: SAMPLE_USER_ID,
        quizId: SAMPLE_QUIZ_ID,
        answeredAt: new Date('2023-10-17T01:54:22.703Z'),
        questionsResponse: [
          {
            id: '40f23836-b24b-4bd2-94ef-17841d216c7c',
            quizResponseId: '3aa1a58a-e1db-41b0-acd7-7c90d968abc5',
            questionId: '9de89607-b185-47df-b0fd-aee5ef11e9e4',
            selectedAnswerId: 'dd4ebe4f-8672-464f-afa3-ce7fd648d6f4',
            discursiveAnswer: null,
          },
        ],
      };

      jest
        .spyOn(prismaService.quizResponse, 'create')
        .mockResolvedValue(mockResponse);
    });

    it('should successfully create a quiz response', async () => {
      const result = await service.create(createQuizResponseDto);
      expect(result.success).toBe(true);
      expect(result.message).toBe('QUIZ_RESPONSE_CREATE_SUCCESS');
      expect(result.data).toEqual(mockResponse);
      expect(prismaService.quizResponse.create).toHaveBeenCalledWith({
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
    });
  });

  describe('Fetch All Quiz Responses', () => {
    let mockData: any;

    beforeEach(() => {
      mockData = [
        {
          id: '3aa1a58a-e1db-41b0-acd7-7c90d968abc5',
          userId: SAMPLE_USER_ID,
          quizId: SAMPLE_QUIZ_ID,
          answeredAt: new Date('2023-10-17T01:54:22.703Z'),
          user: {
            id: SAMPLE_USER_ID,
            name: 'John Doe',
          },
          quiz: {
            id: SAMPLE_QUIZ_ID,
            title: 'Sample Quiz',
          },
          questionsResponse: [
            {
              id: '40f23836-b24b-4bd2-94ef-17841d216c7c',
              question: {
                id: '9de89607-b185-47df-b0fd-aee5ef11e9e4',
                text: 'What is 2 + 2?',
                answers: [
                  {
                    id: 'dd4ebe4f-8672-464f-afa3-ce7fd648d6f4',
                    text: '3',
                  },
                  {
                    id: 'cdd35fe8-23a7-421c-9e95-f758d0b14496',
                    text: '4',
                  },
                ],
              },
              selectedAnswerId: 'cdd35fe8-23a7-421c-9e95-f758d0b14496',
              discursiveAnswer: null,
            },
          ],
        },
      ];
      jest
        .spyOn(prismaService.quizResponse, 'findMany')
        .mockResolvedValue(mockData);
      jest
        .spyOn(prismaService.quizResponse, 'count')
        .mockResolvedValue(mockData.length);
    });

    it('should successfully fetch all quiz responses', async () => {
      const result = await service.findAll();
      expect(result.success).toBe(true);
      expect(result.message).toBe('QUIZ_RESPONSE_FIND_ALL_SUCCESS');
      expect(result.data).toEqual(mockData);
      expect(result.total).toEqual(mockData.length);
    });

    it('should handle errors when fetching all quiz responses', async () => {
      const mockError = new Error('An error occurred');
      jest
        .spyOn(prismaService.quizResponse, 'findMany')
        .mockRejectedValue(mockError);

      const result = await service.findAll();
      expect(result.success).toBe(false);
      expect(result.message).toEqual(mockError);
    });
  });

  describe('Fetch Quiz Response by ID', () => {
    let mockData: any;

    beforeEach(() => {
      mockData = {
        id: '3aa1a58a-e1db-41b0-acd7-7c90d968abc5',
        userId: SAMPLE_USER_ID,
        quizId: SAMPLE_QUIZ_ID,
        answeredAt: new Date('2023-10-17T01:54:22.703Z'),
        user: {
          id: SAMPLE_USER_ID,
          name: 'John Doe',
        },
        quiz: {
          id: SAMPLE_QUIZ_ID,
          title: 'Sample Quiz',
        },
        questionsResponse: [
          {
            id: '40f23836-b24b-4bd2-94ef-17841d216c7c',
            question: {
              id: '9de89607-b185-47df-b0fd-aee5ef11e9e4',
              text: 'What is 2 + 2?',
              answers: [
                {
                  id: 'dd4ebe4f-8672-464f-afa3-ce7fd648d6f4',
                  text: '3',
                },
                {
                  id: 'cdd35fe8-23a7-421c-9e95-f758d0b14496',
                  text: '4',
                },
              ],
            },
            selectedAnswerId: 'cdd35fe8-23a7-421c-9e95-f758d0b14496',
            discursiveAnswer: null,
          },
        ],
      };
      jest
        .spyOn(prismaService.quizResponse, 'findUnique')
        .mockResolvedValue(mockData);
    });

    it('should successfully fetch quiz response by ID', async () => {
      const sampleId = '3aa1a58a-e1db-41b0-acd7-7c90d968abc5';
      const result = await service.findOne(sampleId);
      expect(prismaService.quizResponse.findUnique).toHaveBeenCalledWith({
        where: { id: sampleId },
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
      expect(result.success).toBe(true);
      expect(result.message).toBe('QUIZ_RESPONSE_FIND_ONE_SUCCESS');
      expect(result.data).toEqual(mockData);
    });

    it('should handle errors when fetching quiz response by ID', async () => {
      const mockError = new Error('An error occurred');
      jest
        .spyOn(prismaService.quizResponse, 'findUnique')
        .mockRejectedValue(mockError);

      const sampleId = '3aa1a58a-e1db-41b0-acd7-7c90d968abc5';
      const result = await service.findOne(sampleId);
      expect(result.success).toBe(false);
      expect(result.message).toEqual(mockError);
    });
  });
});
