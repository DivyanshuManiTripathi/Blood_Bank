import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // ✅ correct import

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ no ".reducer" here anymore
  },
});

export default store;
