//상세페이지 하단 가방정보 컴포넌트
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
const Wrap = styled.div`
	max-width:100% !important;
	padding:0 !important;
`;
const DetailWrap = styled.div`
	max-width:100% !important;
	margin-top:80px;
	padding:50px 30px;
	background-color:#e2e2e2;
	position:relative;
	h4{
		margin-bottom:20px;
		font-size:26px;
	}
	@media ${props => props.theme.mobile} {
		h4{
			font-size:20px;
		}
  }
`;
const VideoWrap = styled(Swiper)`
	div{
		&.video{
			position:relative;
			&::before{
				content:"";
				width:100%;
				height:0;
				display:block;
				padding-top:56.25%;
			}
			video{
				width:100%;
				height:100%;
				position:absolute;
				top:0;
				left:0;
			}
		}
		&.info{
			margin-top:20px;
			font-size:16px;
			&::before{
				content:"";
				width:4px;
				height:4px;
				display:inline-block;
				vertical-align:middle;
				margin-right:6px;
				background-color:#111;
			}
		}
	}
	.swiper{
		&-button{
			&-prev,&-next{
				color:#fff;
				opacity:0.6;
				transition:0.2s;
				&:hover{
					opacity:1;
				}
			}
		}
		&-pagination{
			bottom:25px;
			&-bullet{
				width:8px;
				height:8px;
				background-color:#fff;
				opacity:0.5;
				transition:0.2s;
				border-radius:4px;
				&-active{
					width:18px;
					background-color:#111;
					opacity:0.3;
				}
			}
		}
	}
	@media ${props => props.theme.tablet} {
		div{
			&.info{
				margin-top:30px;
			}
		}
  }
	@media ${props => props.theme.mobile} {
		div{
			&.info{
				font-size:14px;
			}
		}
  }
`;
const InfoTab = styled.div`
	width:300px;
	position:relative;
	z-index:1;
	button{
		width:50%;
		font-size:26px;
		padding:8px 5px 5px;
		border:0;
		color:#111;
		background-color:transparent;
		opacity:0.3;
		transition:0.3s;
		&:hover{
			opacity:1;
		}
		&.on{
			opacity:1;
		}
		&:nth-of-type(1){
			&.on{
				& ~ div{
					left:0;
				}
			}
		}
		&:nth-of-type(2){
			&.on{
				& ~ div{
					left:50%;
				}
			}
		}
	}
	>div{
		width:50%;
		height:125%;
		background-color:#f0f0f0;
		border-radius:10px 10px 0 0;
		transition:0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
		position:absolute;
		top:0;
		left:0;
		z-index:-1;
	}
	&.on{
		pointer-events:none;
	}
	@media ${props => props.theme.mobile} {
		width:100%;
		button{
			font-size:20px;
		}
  }
`;
const InfoWrap = styled.div`
	padding:20px;
	border-radius:10px;
	background-color:#f0f0f0;
	ul{
		li{
			line-height:1.45;
			&::before{
				content:"";
				width:4px;
				height:4px;
				display:inline-block;
				vertical-align:middle;
				margin-right:6px;
				background-color:#111;
			}
		}
		&.on{
			animation:view 0.4s ease;
		}
	}
	@keyframes view {
		0%{
			opacity:0;
			transform:translateY(10px);
		}
		100%{
			opacity:1;
			transform:translateY(0);
		}
	}

	@media ${props => props.theme.mobile} {
		ul{
			li{
				font-size:14px;
			}
		}
  }
`;

const DetailInfo = () => {
	const [info, setInfo] = useState("dimension"); //dimension material
	const [change, setChange] = useState(false);

	useEffect(() => {
		setChange(true);
		setTimeout(() => {
			setChange(false);
		}, 400)
	}, [info]);

	const videos = [
		{
			src: require("../components/videos/video_01.mp4"),
			info: "편리한 휴대 스트랩과 실용적인 손잡이"
		},
		{
			src: require("../components/videos/video_02.mp4"),
			info: "잠글 수 있는 숨겨진 내부 수납공간"
		},
		{
			src: require("../components/videos/video_03.mp4"),
			info: "지퍼로 눈과 비에 가방내부 오염방지"
		}
	];

	const information =
		info === "dimension" ? [
			"310 × 120 × 370mm(l × w × h)",
			"12.2 ×4.7 × 14.6인치(l × w × h)",
			"무게: 750g",
			"부피: 17L"
		]
		: info === "material" && [
			"이 독특한 제품은 약 91%의 재활용 소재로 만들어졌습니다.",
			"차량 안전벨트(폴리에스터), 100% B-stock",
			"안감(소모 후 페트병), 100% 재활용",
			"중고 트럭 방수포(폴리에스터 / PVC), 100% 재활용",
			"라벨(PVC), 25% 재활용",
			"삼각 버클(폴리아미드)",
			"바느질실(폴리아미드)",
			"타원형 링(폴리아미드)",
			"지퍼(폴리에스터 / 아연)",
			"라미네이트 폼",
			"우븐 라벨(폴리에스터)",
		];

	const videoMap = videos.map((video, idx) => {
		return(
			<SwiperSlide key={idx}>
					<div className="video">
						<video muted loop autoPlay>
							<source src={video.src} type="video/mp4" />
						</video>
					</div>

					<div className="info">{video.info}</div>
			</SwiperSlide>
		)
	});

	const infoMap = information.map((info, idx) => {
		return <li key={idx}>{info}</li>;
	});

	return(
			<Wrap>
				<DetailWrap>
					<h4>제품 특징</h4>

					<VideoWrap
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={15}
						slidesPerView={1}
						navigation
						pagination
						loop={true}
						autoplay= {{
							delay: 4000,
							disableOnInteraction: false
						}}
						breakpoints={{
							850: {
								slidesPerView: 3
							}
						}}
					>
						{videoMap}
					</VideoWrap>
				</DetailWrap>
				
				<DetailWrap>
					<InfoTab className={change ? "on" : ""}>
						<button
							className={info === "dimension" ? "on" : ""}
							onClick={() => setInfo("dimension")}
						>
								크기
						</button>
						
						<button
						className={info === "material" ? "on" : ""}
							onClick={() => setInfo("material")}
						>
							재료
						</button>
						<div></div>
					</InfoTab>

					<InfoWrap>
						<ul className={change ? "on" : ""}>
							{infoMap}
						</ul>
					</InfoWrap>
				</DetailWrap>
			</Wrap>
	)
}

export default DetailInfo;