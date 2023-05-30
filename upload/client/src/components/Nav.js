import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import logo from "./images/logo.svg"
const GUEST_ID = process.env.REACT_APP_GUEST_ID; //게스트 확인용

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
const Notice = styled.div`
	width:86%;
	padding:15px 20px;
	text-align:center;
	border-radius:8px;
	background-color:rgba(0,0,0,0.4);
	position:fixed;
	bottom:5%;
	left:7%;
	z-index:100;
	transition:0.3s;
	p{
		font-size:14px;
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
		background-color:rgba(180,180,180,0.4);
		position:absolute;
		top:-20px;
		right:-15px;
		transition:0.3s;
		&::before,
		&::after{
			content:"";
			width:66%;
			height:2px;
			background-color:#fff;
			position:absolute;
			top:9px;
			left:17%;
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
		width:92%;
		left:4%;
		button{
			top:-24px;
			right:-6px;
		}
  }
`;

const Nav = () => {
	const [me, setMe] = useContext(AuthContext);
	const [notice, setNotice] = useState(false);

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

	useEffect(() => {
		if(me && (me.userId) === GUEST_ID) setNotice(true);
		else setNotice(false);
	}, [me])

	return(
		<>
			{notice &&
				<Notice>
					<p>새로고침 및 브라우저 종료시 업로드한 데이터는 사라지며, 삭제 기능은 현재 아이디로 업로드한 상품만 가능합니다.</p>
					<button onClick={() => setNotice(!notice)}>닫기</button>
				</Notice>
			}

			<Wrap>
				<Content>
					<Link to="/">홈</Link>

					{me ? (
						<span onClick={logoutHandler}>
							LOGOUT<span className="user">({me.name})</span>
						</span>
					) : (
						<div>
							<Link to="/auth/login">LOGIN</Link>
							<Link to="/auth/register">JOIN</Link>
						</div>
					)
					}
				</Content>
			</Wrap>
		</>
	)
}

export default Nav;