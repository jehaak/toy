import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { chatGPTActions } from '../redux/chatGPT/chatGPTSlice';
import './Main.css';

// openAI 라이브러리
import { Configuration, OpenAIApi } from "openai";

// 소켓 연결함
// 텍스트 -> 이미지 모델 써서 사진 공유하고
// 무슨 텍스트 넣어서 만든건지 맞추는 게임
// 너무 작거나 많으면 안되니까 키워드 6개정도로 고정해야될듯
// 말도안되는거 넣으면 안되니까 키워드 목록 주고 거기서 고르게 하는게 좋아보임
// 키워드 제일 많이 맞춘 사람이 승리

function App() {
  const dispatch = useAppDispatch()
  const texts = useAppSelector((state) => state.chatGPT.chatResponse)
  const [inputText, setInputText] = useState('김치')
  const [imgURL, setImgUrl] = useState('')
  const [imgLoading, setImgLoading] = useState(false)
  const imgStyle = {
    width: "1000px", 
    height: "1000px"
  }
  
  const { Configuration, OpenAIApi } = require("openai");
  const chatGPTAPIKey = useMemo(() => {
    return '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'
  }, [])
  const configuration = new Configuration({
    organization: "org-fsOaSnDKFgtwqAGzVsVp8E5W",
    apiKey: chatGPTAPIKey,
  });


  // gpt 대화응답 보내는 함수 
  const addResponse = async() => {
    const configuration = new Configuration({
      apiKey: chatGPTAPIKey,
    });
    const openai = new OpenAIApi(configuration);
    await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputText,
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    }).then((response: any) => {
      dispatch(chatGPTActions.createResponse({text: response.data.choices[0].text}))
      throw Error
    }).catch((e: any) => {
      alert(e)
    }).finally(() => {
    })
    setInputText('')
  }


  // 이미지 생성해주는 함수
  const createImg = async() => {
    const configuration = new Configuration({
      apiKey: chatGPTAPIKey,
    });
    const openai = new OpenAIApi(configuration);
    setImgLoading(true)
    await openai.createImage({
      prompt: inputText,
      n: 1,
      size: "1024x1024",
    }).then((response: any) => {
      setImgUrl(response.data.data[0].url)
    }).catch((e: any) => {
      alert(e)
    }).finally(() => {
      // setImgLoading(false)
    })
    setInputText('')
  }


  // 대화삭제 함수
  const removeResponse = () => {
    dispatch(chatGPTActions.deleteResponse({}))
  }


  return (
    <>
    {
      imgURL?
      <img src={imgURL} alt='' onLoad={() => {console.log('로딩끝'); setImgLoading(false)}} style={imgStyle}/>
      : null
    }
    {
      imgLoading?
      <h1>로딩중</h1>
      : null
    }
      <h1 className='title'>Chat GPT를 사용해보세요</h1>

      <textarea 
      name="inputText" 
      id="inputText" 
      placeholder='질문을 입력해주세요' 
      className='inputText'
      value={inputText}
      onChange={(event) => {setInputText(event.target.value)}}></textarea>

      <button onClick={() => {addResponse()}}>전송</button>
      <button onClick={() => {removeResponse()}}>삭제</button>
      <button onClick={() => {createImg()}}>이미지 생성</button>

      <h1 className='chatGPTResponse'></h1>
      {texts.map((text: string, idx: number) => <h1 key={idx}>{text}</h1>)}
    </>
  );
}

export default App;