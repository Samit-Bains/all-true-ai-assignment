import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    supportForm: null,
};

const supportSlice = createSlice({
    name: 'support',
    initialState,
    reducers: {
        saveForm: (state, action) => {
            state.supportForm = action.payload;
        },
        clearForm: (state) => {
            state.supportForm = null;
        },
    },
});

export const { saveForm, clearForm } = supportSlice.actions;
export default supportSlice.reducer;