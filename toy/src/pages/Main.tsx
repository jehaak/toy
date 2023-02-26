import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import './Main.css';



function App() {

  const inputText = useRef('')

  const changeInput = (newInputText :string) => {
    inputText.current = newInputText
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

      <button onClick={() => {}}>전송</button>

      <h1 className='chatGPTResponse'></h1>
    </>
  );
}

export default App;
