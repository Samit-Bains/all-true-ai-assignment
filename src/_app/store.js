import { configureStore } from '@reduxjs/toolkit';
import supportReducer from '../_slices/supportSlice';

export const store = configureStore({
    reducer: {
        support: supportReducer,
    },
});

// Log state changes to console
// Can also get a chrome extension that does this instead (Redux DevTools)
store.subscribe(() => {
    console.log("Redux state updated:", store.getState());
});
