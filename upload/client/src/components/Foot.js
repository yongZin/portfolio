//푸터 컴포넌트
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineGithub } from "react-icons/ai";
import { SiNotion } from "react-icons/si";

const Wrap = styled.div`
	margin-top:80px;
	background-color:#333;
	>div{
		max-width:1000px;
    margin:0px auto;
    padding:60px 30px 40px;
		color:#fff;
	}
	@media ${props => props.theme.mobile_xs} {
		>div{
			padding:40px 10px 20px;
		}
  }
`;
const Cont = styled.div`
	display:flex;
	justify-content:space-between;
	align-items:center;
	>h4{
		font-size:25px;
	}
	@media ${props => props.theme.mobile} {
		>h4{
			font-size:22px;
		}
  }
	@media ${props => props.theme.mobile_xs} {
		flex-direction:column;
    align-items:baseline;
		>h4{
			margin-bottom:10px;
		}
  }
`;
const Connect = styled.div`
	a{
		display:inline-block;
    vertical-align:top;
    margin:0px 3px;
    padding:5px;
    font-size:0px;
    border-radius:4px;
    color:transparent;
    background-color:#555;
    transition:0.2s ease;
		svg{
			font-size:25px;
			color:#fff;
		}
		&:last-child{
			svg{
				padding:1px;
			}
		}
		&:hover{
			transform:translate(-3px, -3px);
			box-shadow:3px 3px 2px rgba(0, 0, 0, 0.38);
		}
	}
`;
const Copy = styled.p`
	margin-top:30px;
	font-size:14px;
	font-family:var(--f-light);
`;

const Nav = () => {
	return(
		<Wrap>
			<div>
				<Cont>
					<h4>박용진 - 포트폴리오</h4>
					<Connect>
						<Link title="홈(랜딩페이지)" to="https://yongzin.github.io/" target="__balnk">
							<AiOutlineHome />
						</Link>
						<Link title="깃허브" to="https://github.com/yongZin/portfolio" target="__balnk">
							<AiOutlineGithub />
						</Link>
						<Link title="노션" to="https://nice-93.notion.site/UX-9bba5aa0e8d446ac9044fe18263f62b3?pvs=4" target="__balnk">
							<SiNotion />
						</Link>
					</Connect>
				</Cont>

				<Copy>Copyright © 2023 YongZin. All rights reserved.</Copy>
			</div>
		</Wrap>
	)
}

export default Nav;