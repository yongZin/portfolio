import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App'; //비동기 처리
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/Global';
import Theme from './style/Theme';
import Loading from './component/Loading';

const App = lazy(() => import('./App')); // App 컴포넌트를 비동기적으로 로드
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
      <GlobalStyle />
    </ThemeProvider>
  // </React.StrictMode>
);
