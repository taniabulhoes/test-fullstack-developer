import { makeRequest } from './handleServicesCall';

export const loginUser = async (email: string, password: string) => {
  const config = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    data: { userEmail: email, password },
  }
  

  return makeRequest(config);
};

export const registerUser = async (userName: string, password: string, userEmail: string) => {
  const config = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
    data: { userName, password, userEmail },
  }

  return makeRequest(config);
};