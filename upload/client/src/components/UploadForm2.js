import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { v4 as uuid } from 'uuid';
import mime from "mime-types";
import { toast } from "react-toastify";
import { ImageContext } from "../context/ImageContext";
import Quill from "./Quill";
import UploadInput from "./UploadInput";

const ImgWrap = styled.div`
  margin:40px 0 30px;
  font-size:0;
`;
const ImgUploader = styled.div`
  width:19%;
  display:inline-block;
  vertical-align:middle;
  border-radius:10px;
  border:1px solid #ccc;
  background-color:rgba(255, 255, 255, 0.5);
  position:relative;
  div{
    padding-bottom:100%;
    &:before,
    &:after{
      content:"";
      width:30px;
      height:5px;
      background-color:#acacac;
      border-radius:5px;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
    }
    &:after{
      transform:translate(-50%, -50%) rotate(90deg);
    }
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
`;
const ImgPreview = styled.div`
  width:81%;
  display:inline-block;
  vertical-align:middle;
  li{
    width:calc(24.78% - 10px);
    display:inline-block;
    vertical-align:middle;
    margin-left:10px;
    position:relative;
    &:before{
      content:"";
      display:block;
      padding-bottom:100%;
    }
    button{
      width:22px;
      height:20px;
      border-radius:3px 3px 0 0;
      background-color:#ccc;
      position:absolute;
      top:-20px;
      right:0;
      z-index:2;
      &::before,
      &:after{
        content:"";
        width:10px;
        height:2px;
        background-color:#fff;
        position:absolute;
        top:10px;
        left:6px;
        transform:rotate(45deg);
      }
      &:after{
        transform:rotate(-45deg);
      }
    }
    input[type="radio"]{
      display:none;
      &:checked{
        & + label{
          border-color:orange;
          &:before{
            content:"대표";
            padding:2px 6px;
            display:block;
            font-size:12px;
            border-radius:0 0 3px 3px;
            color:#fff;
            background-color:orange;
            position:absolute;
            top:0;
            left:50%;
            transform:translateX(-50%);
          }
        }
        & ~ button{
          background-color:orange;
        }
      }
    }
    label{
      border-radius:10px 0 10px 10px;
      border:2px solid #ccc;
      overflow:hidden;
      position:absolute;
      inset:0;
      cursor:pointer;
      img{
        pointer-events:none;
      }
    }
  }
`;
const BtnBox = styled.div`
  width:65%;
  display:block;
  margin:30px auto 0;
  button{
    width:45%;
    padding:12px 0;
    font-size:18px;
    border-radius:6px;
    border:2px solid transparent;
    transition:0.2s;
    &:first-child{
      margin-right:5%;
      color:#555;
      background-color:rgba(255, 255, 255, 0.5);
      &:hover{
        color:#111;
        background-color:rgba(255, 255, 255, 0.65);
      }
    }
    &:last-child{
      color:#fff;
      background-color:rgba(0, 198, 4, 0.5);
      &:disabled{
        color:#bbb;
        background-color:rgba(204, 204, 204, 0.5);
        cursor:no-drop;
        &:hover{
          background-color:rgba(204, 204, 204, 0.5);
        }
      }
      &:hover{
        background-color:rgba(0, 198, 4, 0.65);
      }
    }
  }
`;

const UploadForm = ({ setModalView }) => {
	const inputRef = useRef();
	// const {setImages} = useContext(ImageContext); //이미지 리스트
	// const [fileFormData,  setFileFormData] = useState(null);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [mainImages, setMainImages] = useState([]);
	const [details, setDetails] = useState([]);
	const [type, setType] = useState("");
	const [material, setMaterial] = useState("");
	const [color, setColor] = useState("");
  const [mainImgChecked, setMainImgChecked] = useState(0);

	const imageHandler = async (e) => {
    const imgFiles = e.target.files; //파일정보 가져오기
    const newPreviews = []; //추가로 선택된 파일정보 저장

    for (const imgFile of imgFiles) {
      try {
        const fileReader = new FileReader();
        const formData = new FormData();

        const uuidFileName = `${uuid()}.${mime.extension(imgFile.type)}`;

        formData.append("Content-Type", imgFile.type);
        formData.append("file", imgFile);
        formData.append("key", uuidFileName);
        formData.append("filename", uuidFileName);
        formData.append("originalname", imgFile.name);

        console.log(uuidFileName);

        fileReader.readAsDataURL(imgFile);

        const imgSrc = await new Promise((resolve, reject) => {
          fileReader.onload = (e) => resolve(e.target.result);
          fileReader.onerror = (err) => reject(err);
        });

        newPreviews.push({ imgSrc, fileName: imgFile.name });
        setMainImages((prevMainImages) => [...prevMainImages, formData]);
      } catch (err) {
        console.error(err);
      }
    }

    if (mainImages.length + newPreviews.length > 4) {
      toast.error("대표 이미지는 최대 4개까지 업로드 가능합니다.");
      return;
    }
    
    setMainImages([...mainImages, ...newPreviews]);
  };

  const imageDeleteHandler = (index) => {
    const updatedPreviews = [...mainImages];

    updatedPreviews.splice(index, 1);

    setMainImages(updatedPreviews);
  };

	const priceCommaToNumber = (e) => {
		let value = e.target.value;
		
		if (!value) return;

    const numberValue = value.replace(/[^0-9]/g, '');
		const numberWithCommas = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setPrice(numberWithCommas);
  };

	const onSubmit = async (e) => {
		e.preventDefault();
    
		try {
			const productData = {
        name: name,
        price: price,
        mainImages: mainImages,
        // mainImages: mainImages.map((image) => ({
        //   key: image.imgSrc,
        //   filename: image.fileName,
        //   originalname: image.fileName
        // })),
        details: details,
        type: type,
        material: material, 
        color: color,
      }

      const res = await axios.post("upload", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
			
			// setImages((prevData) => [res.data, ...prevData]); //상품 리스트 실시간 반영

      setTimeout(() =>{ //초기화
        setName("");
        setPrice("");
        setMainImages([]);
        setDetails([]);
        setType("");
        setMaterial("");
        setColor("");
        if (inputRef.current) inputRef.current.value = null;
      }, 1000);
		} catch (error) {
			console.error(error);
		}
	}

	const previewsImg = mainImages.map((preview,index) => (
    <li key={`previewsImg-` + index}>
      <input
        type="radio"
        name="previewsImg"
        id={`previewsImg-` + index}
        checked={mainImgChecked === index}
        onChange={() => setMainImgChecked(index)}
      />
      <label htmlFor={`previewsImg-` + index}>
        <img 
          alt="상품 이미지"
          src={preview.imgSrc}
        />
      </label>
      <button onClick={() => imageDeleteHandler(index)}></button>
    </li>
  ));

	return (
		<form onSubmit={onSubmit}>
			<UploadInput
				label="상품명"
				placeholder="ex) F41 HAWAII FIVE-O"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<UploadInput
				label="상품가격"
				placeholder="ex) 248000"
				value={price}
				onChange={(e) => priceCommaToNumber(e)}
			/>
      
      <ImgWrap>
        <ImgUploader>
          <div>
            <input
              ref={ref => (inputRef.current = ref)}
              id="mainImage"
              type="file"
              multiple
              accept="image/*"
              onChange={imageHandler}
              name="mainImages"
            />
          </div>
        </ImgUploader>

        <ImgPreview>
          {previewsImg}
        </ImgPreview>
      </ImgWrap>

			<Quill
				// setFileFormData={setFileFormData}
				details={details}
				setDetails={setDetails}
			/>

			<UploadInput
				label="종류"
				placeholder="ex) 메신저백"
				value={type}
				onChange={(e) => setType(e.target.value)}
			/>

			<UploadInput
				label="소재"
				placeholder="ex) 타프원단"
				value={material}
				onChange={(e) => setMaterial(e.target.value)}
			/>

			<UploadInput
				label="색상"
				placeholder="ex) 검정"
				value={color}
				onChange={(e) => setColor(e.target.value)}
			/>

      <BtnBox>
        <button type="button" onClick={() => setModalView(false)}>닫기</button>
        {/* <button type="submit">업로드</button> */}
        <button type="submit" onClick={() => console.log(
					// {name},
					// {price},
					// {mainImages},
					// {details},
					// {type},
					// {material},
					// {color},
				)}>업로드</button>
      </BtnBox>
		</form>
	)
}

export default UploadForm;