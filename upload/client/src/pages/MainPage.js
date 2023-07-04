//메인페이지-상품리스트 및 업로드
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UploadForm from "../components/UploadForm";
import Product from "../components/Product";
import { AuthContext } from "../context/AuthContext";
const ADMIN_ID = process.env.REACT_APP_ADMIN_ID; //관리자 확인용
const GUEST_ID = process.env.REACT_APP_GUEST_ID; //게스트 확인용

const Wrap = styled.div`
  max-width:1000px;
  margin:0 auto;
  padding:0 30px;
  @media ${props => props.theme.tablet} {
		padding:0 20px;
  }
`;
const TitleExBold = styled.h2`
  margin-bottom:5px;
  font-size:50px;
  font-family:var(--f-ebold);
  color:#111;
  @media ${props => props.theme.tablet} {
		font-size:44px;
  }
`;
const TitleBold = styled.h3`
  margin-bottom:20px;
  font-size:26px;
  font-family:var(--f-ebold);
  color:#111;
  span{
    margin-left:20px;
  }
  @media ${props => props.theme.tablet} {
		font-size:23px;
    span{
      margin-left:10px;
    }
  }
  @media ${props => props.theme.mobile} {
    span{
      display:block;
      margin:2px 0 0;
    }
  }
`;
const Notice = styled.div`
  width:calc(100% - 60px);
  max-width:940px;
  position:absolute;
  top:130px;
  left:50%;
  z-index:99;
  transform:translateX(-50%);
  transition:0.3s;
  p{
    width:100%;
    max-width:300px;
    display:inline-block;
    padding:15px 20px;
    font-size:13px;
    line-height:1.35;
    text-align:center;
    border-radius:8px;
    word-break:keep-all;
    color:#fff;
    background-color:rgba(0,0,0,0.6);
    backdrop-filter:blur(3px);
    position:absolute;
    top:0;
    right:0;
    &::before{
      content:"";
      border-top:10px solid rgba(0,0,0,0.6);
      border-right:8px solid transparent;
      border-left:8px solid transparent;
      position:absolute;
      bottom:-10px;
      right:100px;
    }
    span{
      display:block;
      padding-top:8px;
      font-size:0.82em;
      color:#aaa;
    }
  }
  button{
    width:20px;
    height:20px;
    font-size:0;
    border-radius:50%;
    border:0;
    background-color:rgba(0,0,0,0.4);
    position:absolute;
    top:-20px;
    right:-15px;
    transition:0.3s;
    &::before,
    &::after{
      content:"";
      width:10px;
      height:2px;
      background-color:#fff;
      position:absolute;
      top:9px;
      left:5px;
      transform:rotate(45deg);
    }
    &:after{
      transform:rotate(-45deg);
    }
  }
	@media ${props => props.theme.tablet} {
    top:120px;
  }
  @media ${props => props.theme.mobile} {
    top:372px;
    p{
      right:50%;
      transform:translateX(50%);
      &::before{
        border-top:0;
        border-bottom:10px solid rgba(0,0,0,0.6);
        bottom:auto;
        top:-10px;
      }
    }
    button{
      top:-5px;
      right:calc(50% - 172px);
    }
  }
  @media ${props => props.theme.mobile_xs} {
    p{
      max-width:200px;
      &::before{
        right:50%;
        transform:translateX(50%);
      }
    }
    button{
      right:calc(50% - 122px);
    }
  }
`;

const MainPage = ({ setLocate }) =>{
  const [me] = useContext(AuthContext);
  const [notice, setNotice] = useState(false); //툴팁

  useEffect(() => { //로그인정보 권한 찾기
		if(me && (me.userId) === GUEST_ID) setNotice(true);
		else setNotice(false);
	}, [me]);

  useEffect(() => { //관리자권한 로그인 유도
    setLocate({});
  }, [setLocate]);
    
	return(
		<Wrap>
			<TitleExBold>F203 BOB</TitleExBold>
      <TitleBold>TOTE BAG MEDIUM<span>₩364,000</span></TitleBold>

      {me && ((me.userId) === ADMIN_ID || (me.userId) === GUEST_ID) &&
        <>
          <UploadForm setNotice={setNotice} />

          {notice && 
            <Notice>
              <p>"이미지 파일 선택하기" 를 클릭하여 원하는 상품을 업로드 해보세요!<span>* 새로고침 및 브라우저 종료시 업로드한 상품은 삭제됩니다.</span></p>
              <button onClick={() => setNotice(!notice)}>닫기</button>
            </Notice>
          }
        </>
      }
      
			<Product />
		</Wrap>
	)
}

export default MainPage;