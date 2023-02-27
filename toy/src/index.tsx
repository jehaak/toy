import React from 'react';
import ReactDOM from 'react-dom/client';

// 라우터
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// 리덕스, saga
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas";

import './index.css';
import Main from './pages/Main';


// 라우터
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Main />}/>
  )
);

// 리덕스 persist (스토리지에 저장해서 새로고침해도 데이터 유지됨)
let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals