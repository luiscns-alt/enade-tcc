declare namespace API {
  type CurrentUser = {
    // name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
    access_token?: string;
    id: string;
    login: string;
    password: string;
    name: string;
    surname: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type getFakeCaptchaParams = {
    /** 手机号 */
    phone?: string;
  };

  type LoginParams = {
    login?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
    expiresIn: string;
    Authorization: string;
    data: {
      id: string;
      login: string;
      name: string;
      surname: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type CategoryItem = {
    id?: string;
    name?: string;
  };

  type CategoryList = {
    data?: CategoryItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    message?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type ruleParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  };

  type UUID = string;
  type Timestamp = string;

  interface TableListPagination {
    total: number;
    pageSize: number;
    current: number;
  }

  interface QuizDTO {
    id: UUID;
    title: string;
    description: string;
    published: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    userId: UUID | null;
    categoryId: UUID;
    question: QuestionDTO[];
  }

  interface DeleteApiResponse {
    success: boolean;
    message: string;
    data: {
      count: number;
    };
  }

  interface QuestionsApiResponse {
    success: boolean;
    message: string;
    data: QuizDTO[];
    totalItemCount?: number;
  }
  interface QuizApiResponse {
    success: boolean;
    message: string;
    data: QuizDTO;
    totalItemCount?: number;
  }

  enum QuestionTypeDTO {
    DISCURSIVE = 'DISCURSIVE',
    OBJECTIVE = 'OBJECTIVE',
  }

  interface AnswerDTO {
    id: UUID;
    text: string;
    isCorrect: boolean;
    questionId: UUID;
  }

  interface QuestionDTO {
    id: UUID;
    title: string;
    type: QuestionTypeDTO;
    image: null | string | undefined; // string URL or null.
    quizId: UUID;
    answers?: AnswerDTO[];
  }

  interface QuestionParams {
    id: string;
    quizId: string;
    title: string;
    type: string;
    image: string | null;
  }

  interface QuestionUpdateResult {
    success: boolean;
    message: string;
    data: {
      id: string;
      title: string;
      type: string;
      image: string | null;
      quizId: string;
    };
  }

  interface Question {
    id: UUID;
    title: string;
    type: QuestionType;
    answer_0: string;
    isCorrect_0: boolean;
    answer_1: string;
    isCorrect_1: boolean;
    answer_2?: string;
    isCorrect_2?: boolean;
    answer_3?: string;
    isCorrect_3?: boolean;
    answer_4?: string;
    isCorrect_4?: boolean;
  }
}
