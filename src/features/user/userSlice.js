import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async function (user, thunkAPI) {
    console.log(`Register user: ${JSON.stringify(user)}`);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async function (user, thunkAPI) {
    console.log(`Login user: ${JSON.stringify(user)}`);
  }
);

export default userSlice.reducer;
