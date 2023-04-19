import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { clearStore } from '../features/user/userSlice';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();

  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }

  return config;
});

export const checkForUnauthorizedResponse = function (error, thunkAPI) {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  thunkAPI.rejectWithValue(error.response.message);
};

export default customFetch;
