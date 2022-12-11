import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts/new')
    console.log(data)
    return data
})
export const fetchPopularPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts/popular')
    console.log(data)
    return data
})
export const fetchLastTags = createAsyncThunk('posts/fetchLastTags', async () => {
    const {data} = await axios.get('/tags/new')
    console.log(data)
    // debugger
    return data
})
export const fetchPopularTags = createAsyncThunk('posts/fetchPopularTags', async () => {
    const {data} = await axios.get('/tags/popular')
    console.log(data)
    // debugger
    return data
})
export const fetchPostsByTags = createAsyncThunk('posts/fetchPostsByTags', async (tag) => {
    const {data} = await axios.get(`/tags/${tag}`)
    console.log(data)
    // debugger
    return data
})
export const fetchSearchedPosts = createAsyncThunk('posts/fetchSearchedPosts', async (fields) => {
    const {data} = await axios.get(`search/${fields.title}`)
    console.log(data)
    // debugger
    return data
})
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => 
    await axios.delete(`/posts/${id}`)
)



const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
}


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {

        // getting Posts
        [fetchPosts.pending]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'error'
        },

        // getting Popular Posts
        [fetchPopularPosts.pending]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPopularPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'error'
        },

        // getting last Tags
        [fetchLastTags.pending]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchLastTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchLastTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'error'
        },

        // getting popular Tags
        [fetchPopularTags.pending]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchPopularTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchPopularTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'error'
        },

        // getting Posts by tags
        [fetchPostsByTags.pending]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPostsByTags.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPostsByTags.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'error'
        },

        // getting searched posts
        [fetchSearchedPosts.pending]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchSearchedPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchSearchedPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'error'
        },

        // removing Posts
        [fetchRemovePost.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
        [fetchRemovePost.rejected]: (state, action) => {
            state.posts.status = 'error'
        },
    }
})


export const postsReducer = postSlice.reducer