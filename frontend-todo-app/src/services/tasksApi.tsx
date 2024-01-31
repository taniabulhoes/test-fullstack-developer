import { makeRequest } from './handleServicesCall';

export const userTasks = async (userId: number, token: string) => {
  const config = {
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}/tasks/user-tasks`,
    headers: { Authorization: token },
    params: { userId },
  };

  return makeRequest(config);
};

export const createTask = async (userId: number | undefined, title: string, token: string | undefined) => {  
  const config = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}/tasks/create`,
    data: { userId, title },
    headers: { Authorization: token },
  };

  return makeRequest(config);
};

export const editTask = async (taskId: number, newTitle: string, userId: number, token: string) => {
  const config = {
    method: 'put',
    url: `${process.env.NEXT_PUBLIC_API_URL}/tasks/edit`,
    data: { taskId, newTitle, userId },
    headers: { Authorization: token },
  };

  return makeRequest(config);
};

export const deleteTask = async (taskId: number, userId: number, token: string) => {
  const config = {
    method: 'delete',
    url: `${process.env.NEXT_PUBLIC_API_URL}/tasks/delete`,
    headers: { Authorization: token },
    data: { taskId, userId },
  };

  return makeRequest(config);
};