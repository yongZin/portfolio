import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const Time = styled.div`
	font-size:2.5em;
	font-weight:600;
	/* color:#0a3c2f; */
	color:orange;
`;

const Timer = ({ run, recordValue }) => {
	const [seconds, setSeconds] = useState(0); //시간
	const [record, setRecord] = useState("00:00"); //기록

	const formatTime = (time) => { //타이머 두자릿수(10보다 작으면 0 붙여주기)
		return time < 10 ? "0" + time : time.toString();
	}

	useEffect(() => { //게임 시작시 타이머 작동(run=true인 경우)
		let timer;
		if(run) { //타이머 시작
			timer = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds + 1);
			}, 1000);

			const minutes = Math.floor(seconds / 60); //60초가 되면 1분으로 표시
			const remainingSeconds = seconds % 60; //60초 이후 다시 0부터 초단위 시작(seconds % 60 = 누적시간에서 60을 나누고 남은 값)
			const progress = formatTime(minutes) + ":" + formatTime(remainingSeconds);
			setRecord(progress);
			recordValue(progress);
		} else if(!run) { //종료시 초기화
			setSeconds(0);
			setRecord("00:00");
		}

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [seconds, run, recordValue]);
	
	return (
		<Time>
			{record}
			{/* run(게임시작) 이 true일때 타이머 작동 */}
		</Time>
	)
}

export default Timer