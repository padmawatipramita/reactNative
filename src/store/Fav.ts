import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostItem } from '../../interfaces';

interface Fav {
    fav: PostItem[];
}

const initialState = { 
    fav: []
} as Fav

const favs = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        addFav(state, action: PayloadAction<PostItem>) {
            state.fav.unshift(action.payload);
        },
        deleteFav(state, action: PayloadAction<PostItem>){
            state.fav = state.fav.filter(favs => favs.id != action.payload.id); 
        }
    } 
})

export const {addFav, deleteFav} = favs.actions
export default favs.reducer