import axios from 'axios';

const hanldeApiCall = (response: any) => {
  if (response.status === 200 || response.status === 201) {
    return { success: true, data: response.data };
  } else {
    return { success: false, data: '', error: response.data?.error || 'An unexpected API error occurred' };
  }
};

const handleNetworkError = (error: any) => {
  if (error.response) {
    // Handle API response errors
    return { success: false, data: '', error: error.response.data?.error || 'An unexpected API error occurred' };
  } else if (error.request) {
    // Handle network errors (no response from the server)
    return { success: false, data: '', error: 'Network error occurred. Please check your internet connection.' };
  } else {
    // Handle other types of errors (e.g., code or request setup errors)
    return { success: false, data: '', error: 'An unexpected error occurred during the request.' };
  }
};

export const makeRequest = async (config: any) => {
  try {
    const response = await axios(config);
    return hanldeApiCall(response);
  } catch (error) {
    console.error('Request error:', error);
    return handleNetworkError(error);
  }
};