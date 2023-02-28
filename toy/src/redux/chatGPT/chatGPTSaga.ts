import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { chatGPTActions } from './chatGPTSlice'


// function* delayPush(t: string) {
//     try {
//         const text = setTimeout (() => {chatGPTActions.createResponse(t)}, 1000)
//     } catch(e) {
//         console.log(e)
//     }
// }

// function* watchchatGPTSaga() {
//     // "postActions.loadPostsRequest"의 요청이 오면 "loadPosts()" 실행
//     yield takeLatest(chatGPTActions.createResponse, delayPush);
//   }

// export default function* chatGPTSaga() {
//     yield all([fork(watchchatGPTSaga)]);
//   }