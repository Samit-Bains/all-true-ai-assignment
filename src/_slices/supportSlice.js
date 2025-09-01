import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchYesNoAPI, fetchRandomJokeAPI } from "../_api/supportAPI";

const initialState = {
    supportForm: null,
    // Instead of one loading and error, give each async piece its own status and error
    yesNo: {
        value: null,
        status: "idle", // "idle" | "loading" | "succeeded" | "failed"
        error: null,
    },
    joke: {
        value: null,
        status: "idle",
        error: null,
    },
};

// Async thunk for fetching yes/no
export const fetchYesNo = createAsyncThunk(
    "support/fetchYesNo",
    async () => {
        const data = await fetchYesNoAPI();
        return data.answer; // the API returns { answer: "yes" | "no", ... }
    }
);

// Second async thunk (for fetching joke)
export const fetchRandomJoke = createAsyncThunk(
    "support/fetchRandomJoke",
    async () => {
        const data = await fetchRandomJokeAPI();
        return data; // returns { setup, punchline }
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
            // Yes/No API
            .addCase(fetchYesNo.pending, (state) => {
                state.yesNo.status = "loading";
                state.yesNo.error = null;
            })
            .addCase(fetchYesNo.fulfilled, (state, action) => {
                state.yesNo.status = "succeeded";
                state.yesNo.value = action.payload; // "yes" or "no"
            })
            .addCase(fetchYesNo.rejected, (state, action) => {
                state.yesNo.status = "failed";
                state.yesNo.error = action.error.message;
            })

            // Joke API
            .addCase(fetchRandomJoke.pending, (state) => {
                state.joke.status = "loading";
                state.joke.error = null;
            })
            .addCase(fetchRandomJoke.fulfilled, (state, action) => {
                state.joke.status = "succeeded";
                state.joke.value = action.payload; // { setup, punchline }
            })
            .addCase(fetchRandomJoke.rejected, (state, action) => {
                state.joke.status = "failed";
                state.joke.error = action.error.message;
            });
    }
});

export const { saveForm, clearForm } = supportSlice.actions;
export default supportSlice.reducer;