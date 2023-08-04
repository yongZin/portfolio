import React, { useState } from 'react';
import { styled } from 'styled-components';
import Timer from './Timer';
import MemoryGame from './MemoryGame';
import ResetBtn from './ResetBtn';

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
const Save = styled.div`
	width:100%;
	height:100%;
	display:flex;
	justify-content:center;
	align-items:center;
	background-color:rgba(255,255,255,0.3);
	position:fixed;
	inset:0;
	backdrop-filter:blur(3px);
	>div{
		width:calc(100% - 60px);
		max-width:550px;
		padding:40px;
		border-radius:6px;
		color:#fff;
		background-color:#042b21;
		h3{
			margin-bottom:30px;
			font-size:2.5em;
			font-weight:bold;
		}
		button{
			width:40%;
			min-width:100px;
			margin-top:40px;
			padding:10px;
			font-size:1.13em;
			border-radius:6px;
			border:1px solid #12614c;
			color:#fff;
			background-color:#12614c;
			transition:0.3s;
			cursor:pointer;
			&:hover{
				border-color:#fff;
			}
		}
	}
`;
const User = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	border-radius:6px;
	overflow:hidden;
	background-color:#fff;
	position:relative;
	&::before{
		content:"";
		width:2px;
		height:50%;
		background-color:#042b21;
		position:absolute;
		top:25%;
		left:calc(50% - 1px);
	}
	ul{
		width:50%;
		padding:20px;
		color:#042b21;
		&:last-child{
			li{
				&:last-child{
					color:orange;
				}
			}
		}
		li{
			font-size:1.5em;
			font-weight:bold;
			&:first-child{
				margin-bottom:10px;
				font-size:1.13em;
			}
			input{
				width:100%;
				font-size:1.5rem;
				font-weight:bold;
				text-align:center;
				color:#042b21;
				&::placeholder{
					opacity:0.5;
				}
				&:hover{
					&::placeholder{
						opacity:1;
					}
				}
				&:focus{
					&::placeholder{
						opacity:0;
					}
				}
			}
		}
	}
`;

const Content = () => {
	const [run, setRun] = useState(false);
	const [finish, setFinish] = useState(false);
	const [userRecord, setUserRecord] = useState("00:00");
	const [resetCount, setResetCount] = useState(0);
	// const [userName, setUserName] = useState();
	// const [userRecord, setUserRecord] = useState();
	const [rank, setRank] = useState([
		{nickname: "네글자", rankRecord: "00:01"},
		{nickname: "까지만", rankRecord: "00:02"},
		{nickname: "가능합니", rankRecord: "00:03"},
		{nickname: "다특수문", rankRecord: "00:04"},
		{nickname: "자는불가", rankRecord: "00:05"},
	]);

	const recordValue = (record) => setUserRecord(record);

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
						{rank.map(({ nickname, rankRecord }) => (
							<li key={nickname}>
								<span>{nickname}</span>
								<span>{rankRecord}</span>
							</li>
						))}
					</ul>
				</Rank>

				{finish && !run &&
					// 게임이 종료되면 기록 DB에 저장
					<Save>
						<div>
							<h3>게임 결과</h3>
							<User>
								<ul>
									<li>이름</li>
									<li><input type="text"  placeholder="입력해주세요." /></li>
								</ul>
								<ul>
									<li>내 기록</li>
									<li>{userRecord}</li>
								</ul>
							</User>

							<button onClick={resetGame}>확인</button>
						</div>
					</Save>
				}
			</div>
		</Wrap>
	)
}

export default Content