// 파일 업로드 컴포넌트
import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify"; //alert 라이브러리
import axios from "axios";
import { ImageContext } from "../context/ImageContext";
// import ProgressBar from "./ProgressBar"; //사용보류

const FileDropper = styled.div`
  min-height:100px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  margin:20px 0;
  padding:15px;
  text-align:center;
  border:1px dashed #111;
  border-radius:10px;
  background-color:bisque;
  /* overflow:hidden; */
  position:relative;
  transition:0.3s;
  &:hover{
    color:#fff;
    background-color:gray;
  }
  input{
    width:100%;
    height:100%;
    opacity:0;
    cursor:pointer;
    position:absolute;
    top:0;
    left:0;
  }
  /* p{
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  } */
  @media ${props => props.theme.mobile} {
    font-size:14px;
  }
`;
const ImgPreview = styled.div`
  display:flex;
  justify-content:space-around;
  flex-wrap:wrap;
  font-size:0;
  img{
    width:0;
    font-size:0;
    border-radius:10px;
    opacity:0;
    transition:0.3s;
    &.show{
      width:24%;
      border:5px solid #ccc;
      opacity:1;
    }
  }
  @media ${props => props.theme.mobile_xs} {
		img{
      &.show{
        width:40%;
        margin:5px;
      }
    }
  }
`;
const Boundary = styled.div`
  position:relative;
  div{
    height:100%;
    line-height:40px;
		text-align:center;
		color:#333;
		background-color:green;
		border-radius:8px;
		transition:0.3s;
    position:absolute;
    top:0;
    left:0;
    &.on{
      color:#fff;
    }
  }
  button{
    width:100%;
    height:40px;
    border:0;
    border-radius:8px;
    color:#fff;
    background-color:#333;
    transition:0.3s;
  }
  &.off{
    pointer-events:none;
    div{
      color:#cfcfcf;
    }
    button{
      background-color:#cfcfcf;
      cursor:not-allowed;
    }
  }
  &:hover{
    div{
      color:#555;
      &.on{
        color:#fff;
      }
    }
    button{
      background-color:#555;
    }
  }
`;

const UploadForm = () => {
  const {setImages} = useContext(ImageContext); //이미지 리스트
  const [files, setFiles] = useState(null); //업로드 파일 리스트
  const [previews, setPreviews] = useState([]); //업로드할 파일 미리보기
  const [percent, setPercent] = useState(0); //업로드 현황
  const inputRef = useRef();

  const imgHandler = async (e) => {
    const imgFiles = e.target.files; //파일정보 가져오기
    setFiles(imgFiles);

    if(e.target.files.length > 4) {
      toast.error("최대 4개의 이미지만 업로드 가능합니다.");
    } else{
      /* 업로드 프리뷰 */
      const imgPreviews = await Promise.all(
        [...imgFiles].map(async (imgFile) => {
          return new Promise((resolve, reject) => {
            try {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(imgFile);
              fileReader.onload = (e) => 
              resolve({ imgSrc: e.target.result, fileName: imgFile.name});
            } catch (err) {
              reject(err);
            }
          });
        })
      );
      /* //업로드 프리뷰 */

      setPreviews(imgPreviews);
    }

    
  }

  const onSubmitV2 = async (e) => {
    e.preventDefault();

    try {
      const presignedData = await axios.post("/images/presigned", {
        contentTypes: [...files].map((file) => file.type),
      });
      
      await Promise.all([...files].map((file, index) => {
        const { presigned } = presignedData.data[index];
        const formData = new FormData();

        for (const key in presigned.fields) {
          formData.append(key, presigned.fields[key]);
        }

        formData.append("Content-Type", file.type);
        formData.append("file", file);
        return axios.post(presigned.url, formData);
      }))

      const res = await axios.post("/images", {
        images: [...files].map((file, index) => ({
          imageKey: presignedData.data[index].imageKey,
          originalname: file.name,
        })),
      });

      setImages((prevData) => [res.data, ...prevData]); //실시간 업로드 반영

      toast.success("업로드 성공");
      
      setTimeout(() =>{ //초기화
        setPercent(0);
        setPreviews([]);
        inputRef.current.value = null;
      }, 1500);
    } catch (err) {
      toast.error(err.response.data.message);
      setPercent(0);
      setPreviews([]);
      inputRef.current.value = null;
      console.log(err);
    }
  }

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   for(let file of files){
  //     formData.append("image", file);
  //   }

  //   try {
  //     const res = await axios.post("/images", formData, {
  //       Headers: {"Content-Type":"multipart/form-data"},
  //       onUploadProgress: (e) => {
  //         setPercent(Math.round(100 * e.loaded/e.total)); //진행도 (ProgressEvent 참고)
  //       }
  //     });
  //     setImages((prevData) => [res.data, ...prevData]); //실시간 업로드 반영

  //     toast.success("업로드 성공");
      
  //     setTimeout(() =>{ //초기화
  //       setPercent(0);
  //       setPreviews([]);
  //       inputRef.current.value = null;
  //     }, 3000);

  //   } catch (err) {
  //     toast.error(err.response.data.message);
  //     setPercent(0);
  //     setPreviews([]);
  //     inputRef.current.value = null;
  //     console.log(err);
  //   }
  // }

  const previewsImg = previews.map((preview) => (
    <img 
      alt=""
      key={preview.imgSrc}
      src={preview.imgSrc}
      className={`${preview.imgSrc && "show"}`}
    />
  ));

  const fileName =
    previews.length === 0
      ? "이미지 파일 선택하기"
      : "다른 이미지 파일 선택하기"
      /* 파일명으로 미리보기 */ 
      // previews.map((el) => {
      //   return(
      //     <p key={el.fileName}>{el.fileName}</p>
      //   )
      // })
      // : previews.reduce(
      //     (previous, current) => previous + `${current.fileName},`,
      //     ""
      //   );
      /* //파일명으로 미리보기 */ 

  return(
    <form onSubmit={onSubmitV2}>
      <ImgPreview>
        {previewsImg}
      </ImgPreview>

      <FileDropper>
        {fileName}
        <input
          ref={ref => (inputRef.current = ref)}
          id="image"
          type="file"
          multiple
          accept="image/*"
          onChange={imgHandler}
        />
      </FileDropper>
      
      {/* <ProgressBar percent={percent} /> */}
      <Boundary className={`${previews.length === 0 && "off"}`}>
        <div
          style={{width: `${percent}%`}}
          className={percent > 0 ? "on" : ""}
        >
          {percent}%
        </div>
        <button>업로드</button>
      </Boundary>
    </form>
  )
}

export default UploadForm;