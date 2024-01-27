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
    console.log("entrei aqui")
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

const createTask = async (userId, title, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/create`,
      { userId, title },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.error || 'Could not create task, please try again' };
    }
  } catch (error) {
    console.error('Error during createTask request:', error);
    return { success: false, error: 'Internal Server Error' };
  }
};


const editTask = async (taskId, newTitle, userId, token) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/edit`,
      { taskId, newTitle, userId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.error || 'Could not edit task, please try again' };
    }
  } catch (error) {
    console.error('Error during editTask request:', error);
    return { success: false, error: 'Internal Server Error' };
  }
};

const deleteTask = async (taskId, userId, token) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/delete`,
      {
        headers: {
          Authorization: token,
        },
        data: { taskId, userId },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.error || 'Could not delete task, please try again' };
    }
  } catch (error) {
    console.error('Error during deleteTask request:', error);
    return { success: false, error: 'Internal Server Error' };
  }
};

export { createTask, deleteTask, editTask, userTasks };

