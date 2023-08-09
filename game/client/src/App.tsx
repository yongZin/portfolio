import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Timer from './component/Timer';
import MemoryGame from './component/MemoryGame';
import ResetBtn from './component/ResetBtn';
import Record from './component/Record';
import axios from 'axios';

const Wrap = styled.div`
	min-height:100vh;
	padding:0 15px;
	display:flex;
	justify-content:center;
	align-items:center;
	gap:5%;
	background-color:#0a3c2f;
	>div{
		width:100%;
		text-align:center;
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
			padding:5px;
			line-height:1.2;
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
				&::before{
					content:"1st";
					color:orange;
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
						height:2px;
						background-color:#fff;
						position:absolute;
						left:-8px;
						top:50%;
						transform:translateY(-50%);
					}
				}
			}
		}
	}
`;

const App: React.FC = () => {
	const [run, setRun] = useState<boolean>(false);
	const [finish, setFinish] = useState<boolean>(false);
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
	}, [])

	const resetGame = () => {
		setRun(false);
		setFinish(false);
		setUserRecord("00:00");
		setResetCount(prevCount => prevCount + 1); //리셋감지
	}
	
	return (
		<Wrap>
			<div>
				<Board>
					<h1>같은그림찾기</h1>
					{run || resetCount > 0
						? <Timer run={run} setFinish={setFinish} recordValue={recordValue} />
						: <Notice>&#8251; 카드 선택 시 게임시작 &#8251;</Notice>
					}
					
					<MemoryGame setRun={setRun} setFinish={setFinish} resetCount={resetCount} />
					<ResetBtn resetGame={resetGame} />
				</Board>

				<Rank>
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

export default App