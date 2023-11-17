import { getSession } from 'next-auth/react';
import { axiosAuth } from './axios';

const ApiClient = () => {

  const instance = axiosAuth;

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();

    console.log('se-', session)
    if (session) {
      request.headers.Authorization = `Bearer ${session.tokenAccess}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    },
  );

  return instance;
};

export default ApiClient();