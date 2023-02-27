// 리덕스 툴킷 스토어관리
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer} from 'redux-persist'
import { all } from 'redux-saga/effects';
import chatGPTreducer from './chatGPT/chatGPTSlice'

const rootReducer = combineReducers({
    chatGPT: chatGPTreducer
})

const persistConfig = {
    key: 'root',
    // 로컬스토리지를 사용
    storage,
    // 새로고침시 유지할 항목
    whitelist: ['chatGPT'],
    // 새로고침시 유지안할 항목
    blacklist: [],
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}),
})

export default store
// 커스텀 훅을 만들기 위함
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch