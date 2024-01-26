import axios from 'axios';

const loginUser = async (username, password) => {  
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, { userName: username, password });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.error || 'Login failed' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, error: 'Internal Server Error' };
  }
};

export { loginUser };
