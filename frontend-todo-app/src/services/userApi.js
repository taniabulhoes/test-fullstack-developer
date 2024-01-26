import axios from 'axios';

const API_URL = 'http://localhost:2000/api/users';

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { userName: username, password });

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
