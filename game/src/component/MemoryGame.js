import React, {useState, useEffect} from 'react';
import { styled } from 'styled-components';

const Wrap = styled.div`
	width:100%;
	max-width:440px;
	margin:10px auto 20px;
	padding-top:100%;
	position:relative;
	>div{
		width:100%;
		height:100%;
		display:flex;
		flex-wrap:wrap;
		gap:3.33%;
		transform-style:preserve-3d;
		perspective:500px;
		position:absolute;
		inset:0;
	}
`;
const Card = styled.div`
	width:22.5%;
	padding-top:22.5%;
	display:flex;
	justify-content:center;
	align-items:center;
	position:relative;
	>div{
		width:100%;
		height:100%;
		display:flex;
		justify-content:center;
		align-items:center;
		font-size:3em;
		background-color:#fff;
		transition:0.25s;
		transform:rotateY(180deg);
		cursor:pointer;
		position:absolute;
		inset:0;
		&:after{
			content:"";
			position:absolute;
			inset:0;
			background-color:#209d70;
			transform:rotateY(0deg);
			backface-visibility:hidden;
		}
		&.open{
			transform:rotateY(0deg);
			&:after{
				transform: rotateY(180deg);
			}
		}
		&.match{
			pointer-events:none;
			&:after{
				transform: rotateY(180deg);
			}
		}
	}
`;

const MemoryGame = ({ setRun, setFinish }) => {
	const [randomEmojis, setRandomEmojis] = useState([]);
	const [open, setOpen] = useState([]);
	const [match, setMatch] = useState([]);
	const [start, setStart] = useState(false);
	
	useEffect(() => { //랜덤순으로 이모지 카드 만들기
		const emojis = ["😁", "😁", "🤪", "🤪", "🥳", "🥳", "😭", "😭", "🤢", "🤢", "🥵", "🥵", "😱", "😱", "🥶", "🥶"];
    const shuffled = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
    setRandomEmojis(shuffled);
  }, []);

	useEffect(() => {
		if(open.length === 2) { //두장의 카드를 오픈한 경우
			const [idx1, idx2] = open;
			const emoji1 = randomEmojis[idx1];
			const emoji2 = randomEmojis[idx2];

			if(emoji1 === emoji2) { //두 카드의 이모지가 동일한 경우
				setTimeout(() => {
					setMatch([...match, idx1, idx2]);
					setOpen([]);
				}, 500)
			} else{ //두 카드의 이모지가 다른 경우
				setTimeout(() => {
					setOpen([]);
				}, 500)
			}
		}

		if(randomEmojis.length > 0 && match.length > 0 && randomEmojis.length === match.length) {
			//모든 카드의 이모지가 동일한 경우
			setTimeout(() => {
				if(start) {
					setRun(false); //시작 props
					setFinish(true); //종료 props
					setStart(false);
				}
			}, 300);
		}
	}, [open, randomEmojis, match, start, setRun, setFinish])

	const select = (idx) => { //카드 오픈 이벤트
		if(open.length >= 2) return; //2개의 카드가 열려있으면 이벤트 무시
		if(open.includes(idx)) return; //이미 선택된 카드면 이벤트 무시
		if(!start) {
			setRun(true);
			setStart(true);
		}

		setOpen([...open, idx]) //선택된 카드 배열에 추가
	}

	return (
		<Wrap>
			<div>
				{randomEmojis.map((emoji, idx) => (
					<Card key={idx}>
						<div
							onClick={() => select(idx)}
							className={
								open.includes(idx)
								? "open"
								: match.includes(idx)
								? "match"
								: ""
							}
						>
							{emoji}
						</div>
					</Card>
				))}
			</div>
    </Wrap>
	)
}

export default MemoryGame