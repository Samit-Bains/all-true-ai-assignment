import { configureStore } from '@reduxjs/toolkit';
import supportReducer from '../_slices/supportSlice';

export const store = configureStore({
    reducer: {
        support: supportReducer,
    },
});
