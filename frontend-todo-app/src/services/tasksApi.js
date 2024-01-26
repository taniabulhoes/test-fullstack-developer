import axios from 'axios';

const userTasks = async (userId, token) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/user-tasks`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          userId: userId,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.error || "Could not get user Tasks, please try again" };
    }
  } catch (error) {
    console.error('Error during userTasks request:', error);
    return { success: false, error: 'Internal Server Error' };
  }
};

export { userTasks };
