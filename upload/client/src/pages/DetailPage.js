// 상품 상세 컴포넌트
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ImageContext } from "../context/ImageContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbTrash, TbTrashX } from "react-icons/tb";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DetailInfo from "../components/DetailInfo";
const ADMIN_ID = process.env.REACT_APP_ADMIN_ID; //관리자 확인용
const GUEST_ID = process.env.REACT_APP_GUEST_ID; //게스트 확인용

const Wrap = styled.div`
	>div{
		max-width:1000px;
		margin-left:auto;
		margin-right:auto;
		padding:0 30px;
	}
	@media ${props => props.theme.tablet} {
		>div{
			padding:0 20px;
		}
  }
`;
const BthCont = styled.div`
	display:flex;
	justify-content:space-between;
`;
const ImgCont = styled.div`
	text-align:center;
	img{
		width:50%;
		max-width:450px;
		margin:7px 0;
	}
`;
const LikeBth = styled.div`
	/* width:80px; */
	display:inline-flex;
	align-items:flex-start;
	justify-content:center;
	padding:3px 4px 1px;
	font-size:16px;
	border-radius:4px;
	border:2px solid #bbb;
	color:#777;
	cursor:pointer;
	transition:0.2s;
	svg{
		transition:0.2s;
	}
	span{
		margin:0 3px;
	}
	&:hover{
		border-color:#999;
		svg{
			color:red;
		}
	}
`;
const Notice = styled.div`
	width:180px;
	display:none;
	padding:15px 20px;
	text-align:center;
	border-radius:8px;
	background-color:rgba(0,0,0,0.6);
	backdrop-filter:blur(3px);
	position:absolute;
	top:40px;
	right:0;
	z-index:100;
	cursor:default;
	&::before{
		content:"";
		border-right:8px solid transparent;
		border-left:8px solid transparent;
		border-bottom:10px solid rgba(0,0,0,0.6);
		position:absolute;
		top:-10px;
		right:20px;
	}
	p{
		font-size:13px;
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
		background-color:rgba(0,0,0,0.4);
		position:absolute;
		top:-10px;
		left:-20px;
		transition:0.3s;
		&::before,
		&::after{
			content:"";
			width:10px;
			height:2px;
			background-color:#fff;
			position:absolute;
			top:9px;
			left:5px;
			transform:rotate(45deg);
		}
		&:after{
			transform:rotate(-45deg);
		}
	}
`;
const DelBth = styled.div`
	display:inline-block;
	padding:3px 4px 1px;
	font-size:16px;
	border-radius:4px;
	border:2px solid #bbb;
	color:#777;
	cursor:pointer;
	transition:0.3s;
	position:relative;
	svg{
		font-size:18px;
		position:absolute;
		top:2px;
		left:4px;
		transition:0.2s;
		&:nth-of-type(2){
			opacity:0;
		}
	}
	span{
		margin-left:19px;
	}
	&:hover{
		border-color:#999;
		svg{
			opacity:0;
			&:nth-of-type(2){
				opacity:1;
			}
		}
	}
	&.block{
		border-color:rgba(187, 187, 187, 0.5);
		cursor:no-drop;
		&::before{
			content:"";
			width:100%;
			height:100%;
			background-color:#fff;
			opacity:0.5;
			position:absolute;
			top:0;
			left:0;
			z-index:10;
		}
		${Notice}{
			display:block;
		}
	}
`;


const Detail = ({ setLocate }) => {
	const navigate = useNavigate();
	const [hasLiked, setHasLiked] = useState(false); //좋아요 유무
	const [me] = useContext(AuthContext); //유저정보 가져오기
	const { imageId } = useParams(); //파라미터
	const {images, setImages} = useContext(ImageContext); //이미지정보 가져오기
	const [error, setError] = useState(false);
	const [image, setImage] = useState();
	const [guest, setGuest] = useState(); //상품 업로드한 유저의 id
	const [notice, setNotice] = useState(false); //툴팁

  useEffect(() => { //로그인정보 권한 찾기
		if(me && GUEST_ID !== guest) {
			setTimeout(() => {
				setNotice(true);
			}, 100)
		}
		else setNotice(false);
	}, [me, guest]);
	
	useEffect(() => { //관리자권한 로그인 유도
		setLocate({})
  }, [setLocate]);

	useEffect(() => { //images 배열이 바뀔때 마다 이미지 가져오기
		const img = images.find((image) => image._id === imageId); //이미지 가져오기
		if(img) setImage(img);
	}, [imageId, images]);

	useEffect(() => { //첫 로드시
		if(image && image._id === imageId) return;//배열에 이미지가 존재할 때
		else 
			axios //배열에 이미지가 존재하지 않으면 무조건 서버 호출
				.get(`/images/${imageId}`)
				.then(({ data }) => {
					setImage(data);
					setError(false);
					setGuest(data.user._id);
				})
				.catch((err) => {
					setError(true);
					toast.error(err.response.data.message)
				});
	}, [imageId, image]);

	useEffect(() => {
		if(me && image && image.likes.includes(me.userId)) setHasLiked(true); //해당 아이디가 좋아요를 눌렀으면 true
	}, [me, image]);

	if(error) return <h3>Error...</h3> //이미지 가져오기 전 로딩
	else if(!image) return <h3>Loading...</h3> //이미지 가져오기 전 로딩

	const onSubmit = async () => { //좋아요 버튼
		const result = await axios.patch(`/images/${imageId}/${hasLiked ? "unlike" : "like"}`);
		setImages([
			...images.filter((image) => image._id !== imageId),
			result.data
		].sort((a, b) => {
			// new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
			if(a._id < b._id) return 1;
			else return -1;
		}));
		setHasLiked(!hasLiked);
	}

	const deleteHandler = async () => { //삭제 버튼
		try {
			if(!window.confirm("정말 삭제 하시겠습니까?")) return;
			const result = await axios.delete(`/images/${imageId}`);

			toast.success(result.data.message);

			setImages(images.filter(image => image._id !== imageId)); //삭제후 바로 리스트에서 제거
			navigate("/"); //완료시 홈 화면으로 이동
		} catch (err) {
			console.error(err.message);
		}
	}
	
	const detailImg = image.details.map((image) => {
		return(
			<img
				alt=""
				key={image.filename}
				// src={`http://localhost:4000/uploads/${image.filename}`}
				src={`https://yongzin3.s3.ap-northeast-2.amazonaws.com/raw/${image.filename}`}
			/>
		)
	})
	
	return(
		<Wrap>
			<BthCont>
				<LikeBth onClick={onSubmit}>
					{hasLiked ? <AiFillHeart style={{color: "red"}} /> : <AiOutlineHeart />}
					<span>좋아요</span>
					{image.likes.length}
				</LikeBth>

				{me && 
					(((me.userId) === ADMIN_ID) || ((me.userId) === GUEST_ID)) &&
					<DelBth
						onClick={(me.userId) === GUEST_ID ? ((me.userId) !== guest ? null : deleteHandler) : deleteHandler}
						// className={(me.userId) === GUEST_ID && ((me.userId) !== guest ? "block" : "")}
					>
						<TbTrash />
						<TbTrashX />
						<span>삭제</span>

						{notice &&
							<Notice>
								<p>임시 관리자로 업로드한 상품만 삭제 가능합니다</p>
								<button onClick={() => setNotice(!notice)}></button>
							</Notice>
						}
					</DelBth>
				}
				{/* 관리자는 모든 이미지 삭제권한 부여 */}
				{/* 게스트는 본인이 올린 이미지만 삭제권한 부여(<DelBth>에 "block" 클래스가 붙으면 삭제버튼 클릭불가능) */}
			</BthCont>

			<ImgCont>
				{detailImg}
			</ImgCont>

			<DetailInfo />
		</Wrap>
	)
}

export default Detail;