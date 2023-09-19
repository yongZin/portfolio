import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App'; //비동기 처리
import { ImageProvider }  from "./context/ImageContext";
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Loading from './components/Loading';
import GlobalStyle from "./components/style/GlobalStyle";
import theme from "./components/style/theme";



const App = lazy(() => import('./App')); // App 컴포넌트를 비동기적으로 로드
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode> //useEffect가 두번 호출되는 문제로 주석처리
    <BrowserRouter>
      <AuthProvider>
        <ImageProvider>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<Loading />}>
              <App />
            </Suspense>
            <GlobalStyle />
          </ThemeProvider>
        </ImageProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
