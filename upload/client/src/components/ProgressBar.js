//이미지 업로드 현황 컴포넌트
import React from "react";
import styled from "styled-components";

const Boundary2 = styled.div`
		line-height:38px;
		text-align:center;
		color:#fff;
		background-color:green;
		border-radius:8px;
		transition:0.3s;
`;

const ProgressBar = ({ percent }) => { 
	return(
		<Boundary2 style={{width: `${percent}%`}}>{percent}%</Boundary2>
	)
}

export default ProgressBar;