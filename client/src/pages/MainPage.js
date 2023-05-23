import React, { useContext } from "react";
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

  const MainPage = () =>{
    const [me] = useContext(AuthContext);
    
	return(
		<Wrap>
			<TitleExBold>F203 BOB</TitleExBold>
      <TitleBold>TOTE BAG MEDIUM<span>₩364,000</span></TitleBold>

      {me && ((me.userId) === ADMIN_ID || (me.userId) === GUEST_ID) &&
        <UploadForm />
      }
      
			<Product />
		</Wrap>
	)
}

export default MainPage;