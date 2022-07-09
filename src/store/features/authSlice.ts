import { createSlice } from '@reduxjs/toolkit';

type UserType = {
  id: number;
  username: string;
};

type AuthStateType = {
  user: UserType | null;
  authenticated: boolean;
};

const initialState: AuthStateType = {
  user: null,
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
