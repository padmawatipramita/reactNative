import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from './Post';
import Fav from './Fav';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['post']
};

const rootReducer = combineReducers({
    fav: Fav,
    post: Post
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
