// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('http://localhost:3005/auth/login', {
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
export async function currentUser(options?: { [key: string]: any }) {
  const token = getToken();
  return request<{
    data: API.CurrentUser;
  }>('http://localhost:3005/auth/user', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function getQuestionnaires(options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.NoticeIconList>('http://localhost:3005/quiz', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function getQuizId(body, options?: { [key: string]: any }) {
  const token = getToken();
  return request<API.NoticeIconList>(`http://localhost:3005/quiz/${body.id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function createQuiz(body: API.LoginParams, options?: { [key: string]: any }) {
  const token = getToken();
  return request('http://localhost:3005/quiz/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateQuiz(body: API.LoginParams, options?: { [key: string]: any }) {
  const token = getToken();
  return request(`http://localhost:3005/quiz/${body.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function createQuestion(body, options?: { [key: string]: any }) {
  const token = getToken();
  return request('http://localhost:3005/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

export async function createOption(body, options?: { [key: string]: any }) {
  const token = getToken();
  return request('http://localhost:3005/question/option', {
    method: 'POST',
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
  return request<API.NoticeIconList>('http://localhost:3005/student', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    ...(options || {}),
  });
}

export async function getByIdAnswer(body: API.LoginParams, options?: { [key: string]: any }) {
  console.log(body);
  const token = getToken();
  return request(`http://localhost:3005/student/${body}`, {
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
