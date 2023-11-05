import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResponseController } from './question-response.controller';
import { QuestionResponseService } from './question-response.service';

describe('QuestionResponseController', () => {
  let controller: QuestionResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionResponseController],
      providers: [QuestionResponseService],
    }).compile();

    controller = module.get<QuestionResponseController>(
      QuestionResponseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
