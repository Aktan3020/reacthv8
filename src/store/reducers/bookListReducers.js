import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "../actions/bookListCreator";

const initialState = {
  books: [],
  isLoading: false,
  error: "",
  total:0,
};

export const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.books = [];
      state.isLoading = true;
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default bookListSlice.reducer;
