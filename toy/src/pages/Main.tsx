import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { chatGPTActions } from '../redux/chatGPT/chatGPTSlice';
import './Main.css';


function App() {
  const dispatch = useAppDispatch()
  const texts = useAppSelector((state) => state.chatGPT.chatResponse)
  const inputText = useRef('')

  const changeInput = (newInputText :string) => {
    inputText.current = newInputText
  }

  const addResponse = (t :string) => {
    dispatch(chatGPTActions.createResponse({text: t}))
  }

  return (
    <>
      <h1 className='title'>Chat GPT를 사용해보세요</h1>

      <textarea 
      name="inputText" 
      id="inputText" 
      placeholder='질문을 입력해주세요' 
      className='inputText' 
      onChange={(event) => {changeInput(event.target.value)}}></textarea>

      <button onClick={() => {addResponse('asd')}}>전송</button>

      <h1 className='chatGPTResponse'></h1>
      {texts.map((text: string, idx: number) => <h1 key={idx}>{text}</h1>)}
    </>
  );
}

export default App;
