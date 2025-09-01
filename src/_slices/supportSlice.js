import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchYesNoAPI } from "../_api/supportAPI";

const initialState = {
    supportForm: null,
    yesNo: null,
    loading: false,
    error: null,
};

// Async thunk for fetching yes/no
export const fetchYesNo = createAsyncThunk(
    "support/fetchYesNo",
    async () => {
        const data = await fetchYesNoAPI();
        return data.answer; // the API returns { answer: "yes" | "no", ... }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchYesNo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchYesNo.fulfilled, (state, action) => {
                state.loading = false;
                state.yesNo = action.payload; // "yes" or "no"
            })
            .addCase(fetchYesNo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { saveForm, clearForm } = supportSlice.actions;
export default supportSlice.reducer;