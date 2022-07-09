import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import http from '../../utils/api/index';
import { API } from '../../utils/api/api';

type UserType = {
  id: number;
  username: string;
};

type UserDataType = {
  username: string;
  password: string;
};

type AuthStateType = {
  user: UserType | null;
  authenticated: boolean;
};

const initialState: AuthStateType = {
  user: null,
  authenticated: false,
};

export const register = createAsyncThunk(
  'register',
  async (data: UserDataType, thunkApi) => {
    try {
      const res = await http.post(API.register, {
        username: data.username,
        password: data.password,
      });
      return JSON.stringify(res);
    } catch (error) {
      return thunkApi.rejectWithValue(
        JSON.stringify((error as AxiosError).response)
      );
    }
  }
);

export const login = createAsyncThunk(
  'login',
  async (data: UserDataType, thunkApi) => {
    try {
      const res = await http.post(API.login, data);
      return JSON.stringify(res);
    } catch (error) {
      return thunkApi.rejectWithValue(
        JSON.stringify((error as AxiosError).response)
      );
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // register states
    [register.pending.type]: () => {},
    [register.fulfilled.type]: () => {},
    [register.rejected.type]: () => {},
    // login states
    [login.pending.type]: () => {},
    [login.fulfilled.type]: (state, action: PayloadAction<string>) => {
      const { data } = JSON.parse(action.payload);
      localStorage.setItem('token', data.access);
      state.authenticated = true;
    },
    [login.rejected.type]: () => {},
  },
});

export default authSlice.reducer;
