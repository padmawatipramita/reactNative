import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostItem } from '../../interfaces';

interface PostState {
    posts: PostItem[];
}

const initialState = { 
    posts: []
} as PostState

const post = createSlice({
    name: 'post',
    initialState,
    reducers: {
        savePost(state, action: PayloadAction<PostItem[]>) {
            state.posts = action.payload;
    }  
  }
})

export const {savePost} = post.actions
export default post.reducer