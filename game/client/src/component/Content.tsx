import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Timer from './Timer';
import MemoryGame from './MemoryGame';
import ResetBtn from './ResetBtn';
import Record from './Record';
import axios from 'axios';

const Wrap = styled.div`
	height:100vh;
	min-height:100vh;
	max-height:100vh;
	padding:0 15px;
	display:flex;
	justify-content:center;
	align-items:center;
	gap:5%;
	background-color:#0a3c2f;
	overflow:hidden;
	position:relative;
	>div{
		width:100%;
		padding:30px 0;
		text-align:center;
	}
`;
const Menu = styled.button`
	@media ${props => props.theme.L} {
		width:30px;
		height:26px;
		border-top:3px solid #fff;
		border-bottom:3px solid #fff;
		background-color:transparent;
		cursor:pointer;
		position:absolute;
		top:20px;
		right:20px;
		z-index:100;
		&::before,
		&::after{
			content:"";
			width:100%;
			height:3px;
			background-color:#fff;
			position:absolute;
			top:50%;
			left:0;
			transform:translateY(-50%);
			transition:0.3s;
		}
		&.on{
			border-color:transparent;
			&::before{
				transform:translateY(-50%) rotate(45deg);
			}
			&::after{
				transform:translateY(-50%) rotate(-45deg);
			}
		}
	}
`;
const Board = styled.div`
	width:65%;
	max-width:560px;
	padding:40px 60px;
	display:inline-block;
	vertical-align:top;
	border-radius:6px;
	background-color:#0d614b;
	position:relative;
	overflow:hidden;
	h1{
		line-height:1.2;
		font-size:3em;
		font-weight:bold;
		color:#fff;
		letter-spacing:0.1em;
	}
	@media ${props => props.theme.L} {
		width:100%;
		max-width:470px;
		padding:40px;
	}
`;
const Notice = styled.div`	
	line-height:2.5rem;
	font-size:1.3em;
	font-weight:bold;
	color:orange;
`;
const Rank = styled.div`
	width:30%;
	max-width:250px;
	display:inline-block;
	vertical-align:top;
	margin-left:5%;
	padding:10px;
	border-radius:6px;
	background-color:#12614c;
	>h2{
		text-align:center;
		font-size:2.2em;
		font-weight:bold;
		color:#fff;
	}
	>ul{
		display:flex;
		flex-direction:column;
		gap:6px;
		margin-top:10px;
		padding:10px;
		text-align:center;
		li{
			display:flex;
			justify-content:center;
			align-items:center;
			gap:6px;
			padding:8px 5px 5px;
			font-size:1em;
			border-radius:6px;
			color:#fff;
			background-color:#0c3c2f;
			&::before{
				width:30px;
				display:inline-block;
				vertical-align:middle;
				font-weight:bold;
				text-align:right;
			}
			&:nth-child(1){
				color:orange;
				&::before{
					content:"1st";
					color:orange;
				}
				span{
					&:last-child{
						&::before{
							background-color:orange;
						}
					}
				}
			}
			&:nth-child(2){
				&::before{
					content:"2nd";
				}
			}
			&:nth-child(3){
				&::before{
					content:"3rd";
				}
			}
			&:nth-child(4){
				&::before{
					content:"4th";
				}
			}
			&:nth-child(5){
				&::before{
					content:"5th";
				}
			}
			span{
				&:first-child{
					width:80px;
				}
				&:last-child{
					width:60px;
					position:relative;
					&::before{
						content:"";
						width:8px;
						height:3px;
						background-color:#fff;
						position:absolute;
						left:-7px;
						top:5px;
					}
				}
			}
		}
	}
	@media ${props => props.theme.L} {
		width:250px;
		height:100vh;
		margin:0;
		padding-top:75px;
		border-radius:0;
		box-shadow:-1px 0px 20px rgba(0,0,0,0.4);
		position:absolute;
		top:0;
		right:-250px;
		transition:0.3s;
		&.on{
			right:0;
		}
  }
`;

const Content: React.FC = () => {
	const [run, setRun] = useState<boolean>(false);
	const [finish, setFinish] = useState<boolean>(false);
	const [menu, setMenu] = useState<boolean>(false);
	const [userRecord, setUserRecord] = useState<string>("00:00");
	const [resetCount, setResetCount] = useState<number>(0);
	const [rank, setRank] = useState<Array<{ userName: string; userRecord: string; }>>([]);
	const recordValue = (record: string) => setUserRecord(record);

	useEffect(() => {
		const fetchRankData = async () => {
			try {
				const res = await axios.get("/ranks");
				const rankData = res.data;

				setRank(rankData);
			} catch (err) {
				console.error("랭크 데이터 가져오기 실패:", err);
			}
		}

		fetchRankData();
	}, []);

	const menuHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// 메뉴버튼 토글 이벤트
		setMenu((e) => !e);
	}

	const resetGame = () => {
		setRun(false);
		setFinish(false);
		setUserRecord("00:00");
		setResetCount(prevCount => prevCount + 1); //리셋감지
	};
	
	return (
		<Wrap>
			<div>
				<Menu onClick={menuHandler} className={menu ? "on" : ""}></Menu>

				<Board>
					<h1>같은그림찾기</h1>
					{run || resetCount > 0
						? <Timer run={run} setFinish={setFinish} recordValue={recordValue} />
						: <Notice>&#8251; 카드 선택 시 게임시작 &#8251;</Notice>
					}
					
					<MemoryGame setRun={setRun} setFinish={setFinish} resetCount={resetCount} />
					<ResetBtn resetGame={resetGame} />
				</Board>

				<Rank className={menu ? "on" : ""}>
					<h2>순위표</h2>
					<ul>
						{rank.map(({ userName, userRecord }, idx) => (
							<li key={idx}>
								<span>{userName}</span>
								<span>{userRecord}</span>
							</li>
						))}
					</ul>
				</Rank>

				{finish && !run &&
					// 게임이 종료되면 기록 DB에 저장
					<Record userRecord={userRecord} setRank={setRank} resetGame={resetGame} />
        }
			</div>
		</Wrap>
	)
}

export default Content