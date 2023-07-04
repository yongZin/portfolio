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
// import { AuthContext } from "./context/AuthContext";
// import { ImageContext } from "./context/ImageContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const GUEST_ID = process.env.REACT_APP_GUEST_ID; //게스트 확인용

const Container = styled.div`
  margin:0 auto;
  padding:100px 0 0;
  @media ${props => props.theme.tablet} {
		padding:100px 0 0;
  }
`;

const App = () => {
  // const navigate = useNavigate();
  // const [me] = useContext(AuthContext);
  // const {images, setImages} = useContext(ImageContext); //업로드된 이미지 목록
	// const [confirm, setConfirm] = useState(false); //로그인 정보에서 권한 확인
  // const [guestImg, setGuestImg] = useState([]); //관리자권한으로 업로드한 이미지 목록
  const [locate, setLocate] = useState({}); //관리자권한 로그인 유도

  // useEffect(() => {
	// 	setTimeout(() => {
  //     if(me && ((me.userId) === GUEST_ID)) {
  //       axios
  //         .get("/users/me/images") //이미지 데이터 가져오기
  //         .then((result) => setGuestImg(result.data))
  //         .catch((err) => {
  //           console.error(err);
  //         })
  //     } else{
  //       setGuestImg([]);
  //     }
  //   }, 100)
	// }, [me, images]);
  
  // const preventClose = (e) => {
  //   e.preventDefault();
  //   e.returnValue = ""; //Chrome에서 동작하도록;

	// 	setConfirm(true);
  // };
  
  // useEffect(() => {
  //   if(me && (me.userId === GUEST_ID)) {
  //     (() => {
  //       window.addEventListener("beforeunload", preventClose);
  //     })();

  //     return () => {
  //       window.removeEventListener("beforeunload", preventClose);
  //     };
  //   }
  // }, [me]);

  // if(confirm) {
  //   guestImg.map(async (id) => {
  //     const result = await axios.delete(`/images/${id._id}`);
  //     setImages(images.filter(image => image._id !== id._id));
  //     navigate("/");

  //     return result;
  //   })
  // }
  
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