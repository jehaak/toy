import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { DestructuringPattern } from "typescript";
// import { Action } from "@remix-run/router";


// 스테이트 커스텀 형식 만듦
interface chatResponseType {
  chatResponse: string[]
}

// 초기값 설정
const initialState: chatResponseType = {
  chatResponse: ['1', '2', '3'],
}

const chatGPTSlice = createSlice({
  name: 'chatGPTSlice',
  initialState,
  reducers: {
    // 받은 답변 저장
    createResponse: (state, action) => {
      console.log(action)
      state.chatResponse.push(action.payload.text)
    },

    // 답변 삭제
    deleteResponse: (state, action) => {
      if (state.chatResponse) {
        state.chatResponse.pop()
      }
    }
  }
})

export const chatGPTActions = chatGPTSlice.actions
export default chatGPTSlice.reducer