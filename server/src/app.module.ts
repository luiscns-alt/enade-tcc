import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { CategoriesModule } from './categories/categories.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UserGamificationModule } from './user-gamification/user-gamification.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    QuizModule,
    CategoriesModule,
    QuestionModule,
    AnswerModule,
    UserGamificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
