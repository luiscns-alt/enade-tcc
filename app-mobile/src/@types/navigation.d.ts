import { QuizDTO } from '@src/@types/index';

export type QuestionnairesNavigationProps = {
  quiz: QuizDTO;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      SignIn: undefined;
      Register: undefined;
      QuestionnairesScreen: QuestionnairesNavigationProps;
    }
  }
}
