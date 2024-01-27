import axios from 'axios';

const loginUser = async (email, password) => {  
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, { userEmail: email, password });

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

const registerUser = async ( userName, password, userEmail ) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
      userName,
      password,
      userEmail,
    });

    if (response.status === 201) {
      return { success: true, data: response.data.newUser, message: 'User registered successfully' };
    } else {
      return { success: false, error: response.data.error || 'Registration failed' };
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    return { success: false, error: error.response.data};
  }
};

export { loginUser, registerUser };

