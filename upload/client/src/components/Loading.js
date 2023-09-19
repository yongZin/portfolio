//푸터 컴포넌트
import React from "react";
import styled from "styled-components";

// const Load1 = styled.div`
// 	width:100%;
// 	height:100vh;
// 	display:flex;
// 	justify-content:center;
// 	align-items:center;
// 	background-color:#fff;
// 	position:fixed;
// 	inset:0;
// 	z-index:100000;
// 	ul{
// 		width:100px;
// 		height:60px;
// 		position:relative;
// 		li{
// 			width:20px;
// 			border-radius:50%;
// 			position:absolute;
// 			left:0;
// 			transform-origin:50%;
// 			&:nth-child(-n+3){ //1~3번째 li
// 				width:20px;
// 				height:20px;
// 				background-color:red;
// 				top:40px;
// 				animation:circle 0.4s alternate infinite ease;
// 			}
// 			&:nth-child(n+4){ //4~5번째 li
// 				width:20px;
// 				height:4px;
// 				background-color:rgba(0,0,0,0.5);
// 				top:62px;
// 				z-index:-1;
// 				backdrop-filter:blur(3px);
// 				animation:shadow 0.4s alternate infinite ease;
// 			}
// 			&:nth-child(2),&:nth-child(5){
// 					left:calc(50% - 10px);
// 					animation-delay:0.2s;
// 				}
// 				&:nth-child(3),&:nth-child(6){
// 					left:auto;
// 					right:0;
// 					animation-delay:0.3s;
// 				}
// 		}
// 	}
// 	@keyframes circle {
// 		0%{
// 			top:60px;
// 			height:5px;
// 			border-radius:50px 50px 25px 25px;
// 			transform:scaleX(1.7);
// 		}
// 		40%{
// 			height:20px;
// 			border-radius:50%;
// 			transform:scaleX(1);
// 		}
// 		100%{
// 			top:0;
// 		}
// 	}
// 	@keyframes shadow {
// 		0%{
// 			transform:scaleX(1.5);
// 		}
// 		40%{
// 			transform:scaleX(1);
// 			opacity:0.7;
// 		}
// 		100%{
// 			transform:scaleX(0.2);
// 			opacity:0.4;
// 		}
// 	}
// `;

const Skeleton = styled.div`
	background-color:rgba(255,255,255,1);
	display:flex;
	justify-content:center;
	position:fixed;
	inset:0;
	z-index:10000;
	div{
		width:1000px;
		ul{
			li{
				border-radius:5px;
				/* background-image:linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%); */ //연한 버전
				background-image:linear-gradient(to right, #ddd 0%, #f1f1f1 20%, #ddd 40%, #ddd 100%); //진한 버전
				background-size:1000px 104px;
				animation:skeleton 1s linear infinite forwards;
			}
			&.header{
				display:flex;
				justify-content:space-between;
				align-items:center;
				padding:15px 30px;
				li{
					&:first-child{
						width:102px;
						height:34px;
					}
					&:last-child{
						width:98px;
						height:20px;
					}
				}
			}
			&.title{
				margin-top:40px;
				padding:0 30px;
				li{
					&:first-child{
						height:50px;
					}
					&:last-child{
						height:30px;
						margin-top:10px;
					}
				}
			}
			&.content{
				padding:43px 30px 0;
				li{
					width:calc(33% - 6px);
					display:inline-block;
					vertical-align:top;
					margin:0 6px 5% 0;
					&::before{
						content:"";
						display:block;
						padding-bottom:100%;
					}
				}
			}
		}
	}
	@media ${props => props.theme.tablet} {
		div{
			ul{
				padding-left:20px !important;
				padding-right:20px !important;
				&.content{
					li{
						width:calc(50% - 6px);
					}
				}
			}
		}
  }
	@media ${props => props.theme.mobile} {
		div{
			ul{
				&.title{
				margin-top:40px;
				padding:0 30px;
				li{
					&:last-child{
						height:50px;
					}
				}
			}
			}
		}
	}
	@media ${props => props.theme.mobile_xs} {
		div{
			ul{
				&.content{
					li{
						width:100%;
						margin-right:0;
					}
				}
			}
		}
	}
	@keyframes skeleton {
		0%{
			background-position:-468px 0;
		}
		100%{
			background-position:468px 0;
		}
	}
`;
const Loading = () => {
	return(
		<Skeleton>
			<div>
				<ul className="header">
					<li></li>
					<li></li>
				</ul>

				<ul className="title">
					<li></li>
					<li></li>
				</ul>

				<ul className="content">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</Skeleton>
		// <Load1>
		// 	<ul>
		// 		<li></li>
		// 		<li></li>
		// 		<li></li>
		// 		<li></li>
		// 		<li></li>
		// 		<li></li>
		// 	</ul>
		// </Load1>
	)
}

export default Loading;