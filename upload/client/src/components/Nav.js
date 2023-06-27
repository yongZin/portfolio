//헤더 컴포넌트
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import logo from "./images/logo.svg"

const Wrap = styled.div`
	width:100%;
	/* background-color:rgba(0,29,58,.18); */
	background-image: linear-gradient(to bottom, #ffffff, transparent);
	backdrop-filter:blur(2px);
	position:fixed;
	top:0;
	left:0;
	z-index:100;
	transition:0.1s;
	background-color:transparent;
`;
const Content = styled.div`
	width:100%;
	max-width:1000px;
	display:flex;
	align-items:center;
	justify-content:space-between;
	margin:0 auto;
	padding:15px 30px;
	a, span{
		font-size:16px;
		font-family:var(--f-ebold);
		color:#414141;
		text-decoration:none;
		cursor:pointer;
		&:hover{
			text-decoration:underline;
		}
		& + a{
			margin-left:14px;
		}
	}
	> a{
		width:102px;
		height:34px;
		font-size:0 !important;
		background:url(${logo}) no-repeat;
		background-size:cover;
	}
	>div{
		position:relative;
	}
	@media ${props => props.theme.tablet} {
		padding:15px 20px;
  }
	@media ${props => props.theme.mobile_xs} {
		a, span{
			font-size:14px;
			text-align:center;
			.user{
				display:block;
				font-size:13px;
			}
		}
  }
`
const Empty = styled.div`
	width:280px;
	padding:15px 20px;
	text-align:center;
	border-radius:8px;
	background-color:rgba(0,0,0,0.6);
	backdrop-filter:blur(3px);
	position:absolute;
	top:calc(100% + 20px);
	right:0;
	transition:opacity 0.5s;
	z-index:100;
	&::before{
		content:"";
		border-right:8px solid transparent;
		border-left:8px solid transparent;
		border-bottom:10px solid rgba(0,0,0,0.6);
		position:absolute;
		top:-10px;
		right:60px;
	}
	p{
		font-size:13px;
		line-height:1.35;
		word-break:keep-all;
		color:#fff;
	}
	button{
		width:20px;
		height:20px;
		font-size:0;
		border-radius:50%;
		border:0;
		background-color:rgba(0,0,0,0.4);
		position:absolute;
		top:-10px;
		right:-20px;
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
	@media ${props => props.theme.mobile} {
		padding:15px 10px;
		p{
			font-size:13px;
		}
  }
	@media ${props => props.theme.mobile_xs} {
		&:not(.empty){
			width:92%;
			left:4%;
			button{
				top:-24px;
				right:-6px;
			}
		}
  }
`;

const Nav = ({ locate }) => {
	const [me, setMe] = useContext(AuthContext);
	const [close, setClose] = useState(false);

	useEffect(() => { //로그인정보 권한 찾기
		if(!me) setClose(false);
		else setClose(true);
	}, [me])

	const logoutHandler = async () => {
		try {
			await axios.patch("/users/logout");
			
			setMe();
			toast.success("로그아웃");
		} catch (err) {
			console.error(err);
			toast.error(err.message);
		}
	}

	return(
		<>
			<Wrap>
				<Content>
					<Link to="/">홈</Link>
				
					{me ? (
						<span onClick={logoutHandler}>
							LOGOUT<span className="user">({me.name})</span>
						</span>
					) : (

						<div>
							<Link to="/auth/login" onClick={() => {
								if(!me) setTimeout(() => {
									setClose(false);
								}, 100);
							}}>LOGIN</Link>
							<Link to="/auth/register">JOIN</Link>

							{!close &&
								<Empty style={locate}>
									<p>관리자권한으로 다양한 기능을 사용해보세요!</p>
									<button onClick={() => setClose(!close)}>닫기</button>
								</Empty>
							} {/* 로그인정보가 없을 경우 로그인 유도 */}
						</div>

					)} {/* 로그인유무에 따라 버튼변경 */}

					
				</Content>
			</Wrap>
		</>
	)
}

export default Nav;