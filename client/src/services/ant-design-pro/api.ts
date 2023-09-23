// @ts-ignore
/* eslint-disable */
import {
  ANSWER_ENDPOINT,
  AUTH_LOGIN_ENDPOINT,
  CATEGORIES_ENDPOINT,
  QUESTION_ENDPOINT,
  QUIZ_ENDPOINT,
  USER_ME_ENDPOINT,
} from '@/services/ant-design-pro/endpoints';
import { request } from '@umijs/max';
import { Params } from 'react-router';

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(AUTH_LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export const TOKEN_KEY = '@userToken';
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/** 获取当前的用户 GET /api/currentUser */
export async function getUser(options?: { [key: string]: any }) {
  const token = getToken();
  console.log(getToken());
  return request<API.CurrentUser>(USER_ME_ENDPOINT, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function getQuestionnaires(
  title?: string,
  order?: any,
  options?: { [key: string]: any },
) {
  const token = getToken();
  return request<API.QuestionsApiResponse>(QUIZ_ENDPOINT, {
    method: 'GET',
    params: { title, order },
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function deleteQuestionnaires(options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.DeleteApiResponse>(QUIZ_ENDPOINT, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function getQuizId(body: Readonly<Params<string>>, options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.QuizApiResponse>(`${QUIZ_ENDPOINT}/${body.id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function createQuiz(body: API.LoginParams, options?: { [key: string]: any }) {
  const token = getToken();
  return request(`${QUIZ_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteQuestions(options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.DeleteApiResponse>(QUESTION_ENDPOINT, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function updateQuiz(body: API.QuizDTO, options?: { [key: string]: any }) {
  const token = getToken();
  return request(`${QUIZ_ENDPOINT}/${body.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function createQuestion(body: any, options?: { [key: string]: any }) {
  const token = getToken();
  return request(QUESTION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateQuestion(body: API.QuestionDTO, options?: { [key: string]: any }) {
  const token = getToken();
  return request(`${QUESTION_ENDPOINT}/${body.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function createOption(
  body: { questionId: any; text: any; isCorrect: any },
  options?: { [key: string]: any },
) {
  const token = getToken();
  return request(`${ANSWER_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateOption(body: API.AnswerDTO, options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.QuestionUpdateResult>(`${ANSWER_ENDPOINT}/${body.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function getAnswer(options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.NoticeIconList>('http://localhost:3000/student', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function getCategory(options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.CategoryList>(`${CATEGORIES_ENDPOINT}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function getByIdAnswer(body: API.LoginParams, options?: { [key: string]: any }) {
  console.log(body);
  const token = getToken();
  return request(`http://localhost:3000/student/${body}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
