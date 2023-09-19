import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify"; //alert 라이브러리
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import Nav from "./components/Nav";
import Foot from "./components/Foot";

const Container = styled.div`
  margin:0 auto;
  padding:100px 0 0;
  @media ${props => props.theme.tablet} {
		padding:100px 0 0;
  }
`;

const App = () => {
  const [locate, setLocate] = useState({}); //관리자권한 로그인 유도
  
  return (
    <Container>
      <ToastContainer />
      <Nav locate={locate} />
      <Routes>
        <Route path="/images/:imageId" element={<DetailPage setLocate={setLocate} />} />
        <Route path="/auth/register" element={<RegisterPage setLocate={setLocate} />} />
        <Route path="/auth/login" element={<LoginPage setLocate={setLocate} />} />
        <Route path="/" element={<MainPage setLocate={setLocate} />} />
      </Routes>
      <Foot />
    </Container>
  );
}

export default App;