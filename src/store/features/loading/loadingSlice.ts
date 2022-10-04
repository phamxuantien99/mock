import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    isRedirecting: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRedirecting: (state, action) => {
      state.isRedirecting = action.payload;
    },
  },
});

export const { setLoading, setRedirecting } = loadingSlice.actions;

export default loadingSlice.reducer;
