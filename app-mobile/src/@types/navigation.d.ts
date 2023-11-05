import { QuizDTO } from '@src/@types/index';

export type QuestionnairesNavigationProps = {
  quiz: QuizDTO;
};

export type ListCompletedQuestionnairesNavigationProps = {
  questionnairesId: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      SignIn: undefined;
      Register: undefined;
      QuestionnairesScreen: QuestionnairesNavigationProps;
      ListCompletedQuestionnairesScreen: ListCompletedQuestionnairesNavigationProps;
    }
  }
}
