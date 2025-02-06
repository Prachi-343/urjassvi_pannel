import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace 'API_BASE_URL' with the actual base URL of your backend API.
const API_BASE_URL = 'http://localhost:5000/api';

// Async thunk to fetch blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get(`${API_BASE_URL}/blogs`);
  return response.data;
});

// Async thunk to add a new blog
export const addBlog = createAsyncThunk('blogs/addBlog', async (blog) => {
  const response = await axios.post(`${API_BASE_URL}/blogs`, blog);
  return response.data;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      });
  },
});

export default blogSlice.reducer;