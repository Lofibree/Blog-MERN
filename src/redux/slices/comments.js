import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios.js'




export const createComment = createAsyncThunk('/comments/createComment', async (fields) => {
    const {data} = await axios.post(`/comments/${fields.postId}`, fields)
    return data
})
export const updateComment = createAsyncThunk('/comments/updateComment', async (fields) => {
    const {data} = await axios.patch(`/comments/${fields.postId}/${fields.commentId}`, fields)
    return data
})
export const removeComment = createAsyncThunk('/comments/removeComment', async (fields) => {
    const {data} = await axios.delete(`/comments/${fields.postId}/${fields.commentId}`)
    return data
})
export const fetchComments = createAsyncThunk('/comments/fetchComments', async (postId) => {
    const {data} = await axios.get(`/comments/${postId}`)
    return data
})
export const fetchLastComments = createAsyncThunk('/comments/fetchLastComments', async () => {
    const {data} = await axios.get('/comments')
    return data
})



const initialState = {
    comments: {
        items: [],
        status: 'loading'
    }
}





const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        
        // create Comment
        // [createComment.pending]: (state, action) => {
        //     state.comments.items = [],
        //     state.comments.status = 'loading'
        // },
        [createComment.fulfilled]: (state, action) => {
            state.comments.items = [...state.comments.items, action.payload]
            state.comments.status = 'loaded'
        },
        [createComment.rejected]: (state, action) => {
            state.comments.items = []
            state.comments.status = 'error'
        },

        // get Comments
        [fetchComments.pending]: (state, action) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchComments.rejected]: (state, action) => {
            state.comments.items = []
            state.comments.status = 'error'
        },

        // get last Comments
        [fetchLastComments.pending]: (state, action) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchLastComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchLastComments.rejected]: (state, action) => {
            state.comments.items = []
            state.comments.status = 'error'
        },

        // remove Comment
        [removeComment.fulfilled]: (state, action) => {
            state.comments.items = state.comments.items.filter(obj => obj._id !== action.meta.arg.commentId)
        },
        [removeComment.rejected]: (state, action) => {
            state.comments.items = []
            state.comments.status = 'error'
        },

        // update Comment
        [updateComment.fulfilled]: (state, action) => {
            const neededIndex = state.comments.items.findIndex(c => c._id === action.meta.arg.commentId)
            if (neededIndex !== -1) {
                state.comments.items[neededIndex].text = action.meta.arg.text
                return state   
            }
        },
        [updateComment.rejected]: (state, action) => {
            state.comments.items = []
            state.comments.status = 'error'
        },
    }
})


export const commentsReducer = commentSlice.reducer