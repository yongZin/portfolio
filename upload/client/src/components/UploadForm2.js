// 파일 업로드 컴포넌트
import React, { useState, useContext, useRef } from 'react';
import styled from "styled-components";
import { toast } from "react-toastify"; //alert 라이브러리
import axios from "axios";
import { ImageContext } from "../context/ImageContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 시트

const UploadReactQuill = styled(ReactQuill)`
  height:500px;
  margin-bottom:30px;
  border-radius:15px;
  border:1px solid #ccc;
  background-color:rgba(255,255,255,0.5);
  .ql{
    &-toolbar{
      height:42px !important;
      padding:8px !important;
      border:0 !important;
      font-family:var(--f-bold) !important;
      input{
        &.ql-image[type=file]{
          display:none;
        }
      }
    }
    &-container{
      height:calc(100% - 42px);
      border:0 !important;
      border-top:1px solid #ccc !important;
      font-family:var(--f-bold) !important;
    }
    &-editor{
      p{
        font-size:16px !important;
        strong{
          font-size:20px !important;
          font-family:var(--f-ebold) !important;
        }
      }
      img{
        max-width:40% !important;
      }
    }
  }
`;
const ItemInfo = styled.div`
  width:100%;
  ul{
    display:flex;
    border-radius:15px;
    border:1px solid #ccc;
    background-color:rgba(255, 255, 255, 0.5);
    & + ul{
      margin-top:8px;
    }
    li{
      width:25%;
      padding:18px 20px;
      font-size:14px;
      &:last-child{
        width:75%;
        padding:10px 20px;
        border-left:1px solid #ccc;
        &:hover{
          input{
            border-bottom-color:rgba(0, 0, 0, 0.7);
          }
        }
      }
      input{
        width:50%;
        min-width:250px;
        padding:8px 0;
        font-size:14px;
        border:0;
        border-bottom:2px solid rgba(0, 0, 0, 0.2);
        background-color:transparent;
        transition:0.2s;
        &::placeholder{
          font-style:italic;
        }
        &:focus{
          border-bottom-color:rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
`;
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

const UploadForm2 = ({ setModalView }) => {
  const {setImages} = useContext(ImageContext); //이미지 리스트
  const [files, setFiles] = useState([]); //업로드 파일 리스트
  const [productMainImg, setProductMainImg] = useState([]); //업로드할 파일 미리보기
  const [mainImgChecked, setMainImgChecked] = useState(0);
  const inputRef = useRef();
  const [productInfo, setProductInfo] = useState([
    { key: "name", value: "" },
    { key: "price", value: "" },
    { key: "image", value: [] },
    { key: "details", value: "" },
    { key: "type", value: "" },
    { key: "material", value: "" },
    { key: "color", value: "" },
    { key: "size", value: "" }
  ]);

  const quillModules = {
    toolbar: [
      ["bold"], ["image"]
    ]
  };
  const quillFormats = ["bold", "image"];

  const imgHandler = async (e) => {
    const imgFiles = e.target.files; //파일정보 가져오기
    const currentPreviews = productMainImg; //현재 프리뷰 목록 가져오기
    const newPreviews = []; //추가로 선택된 파일정보 저장

    for (const imgFile of imgFiles) {
      try {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(imgFile);

        const imgSrc = await new Promise((resolve, reject) => {
          fileReader.onload = (e) => resolve(e.target.result);
          fileReader.onerror = (err) => reject(err);
        });

        newPreviews.push({ imgSrc, fileName: imgFile.name });
      } catch (err) {
        console.error(err);
      }
    }

    if (currentPreviews.length + newPreviews.length > 4) {
      toast.error("대표 이미지는 최대 4개까지 업로드 가능합니다.");
      return;
    }
    
    setProductMainImg([...currentPreviews, ...newPreviews]);
    setFiles([...currentPreviews, ...newPreviews])
    updateProductInfo("image", [...currentPreviews, ...newPreviews]);
  };

  const imgDeleteHandler = (index) => {
    const updatedPreviews = [...productMainImg];

    updatedPreviews.splice(index, 1);

    setProductMainImg(updatedPreviews);
    setFiles(updatedPreviews);
  };

  const updateProductInfo = (key, value) => {
    setProductInfo((prevProductInfo) => {
      const updatedProductInfo = prevProductInfo.map((info) => {
        if (info.key === key) return { ...info, value: value };

        // if (key === "details") return { ...info, value: value }

        return info;
      });

      return updatedProductInfo;
    });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();

    // const productData = {};
    // productData.forEach((info) => {
    //   productData[info.key] = info.value;
    // });

    const productData = {
      "name": "하파오",
      "price": "248,000",
      "image": [
        { "fileName": "bob_101.jpg", "imgSrc": "data:image/jpeg;base64,/aaaa" },
        { "fileName": "bob_102.jpg", "imgSrc": "data:image/jpeg;base64,/bbbb" },
        { "fileName": "bob_103.jpg", "imgSrc": "data:image/jpeg;base64,/ccccc" }
      ],
      "details": "<p>상세내용입니다.</p><p>상세내용입니다.2</p>",
      "type": "메신저백",
      "material": "타프원단",
      "color": "핑크",
      "size": "300"
    };

    try {
      const presignedData = await axios.post("/images/presigned", {
        contentTypes: productData.image.map((image) => image.type)
      });

      await Promise.all(productData.image.map((file, index) => {
        const { presigned } = presignedData.data[index];
        const formData = new FormData();

        for (const key in presigned.fields) {
          formData.append(key, presigned.fields[key]);
        }

        formData.append("Content-Type", file.type);
        formData.append("file", file);

        return axios.post(presigned.url, formData);
      }));

      const res = await axios.post("/images", {
        images: productData.image.map((file, index) => ({
          imageKey: presignedData.data[index].imageKey,
          originalname: file.name,
        })),

        productInfo: {
          name: productData.name,
          price: productData.price,
          details: productData.details,
          type: productData.type,
          material: productData.material,
          color: productData.color,
          size: productData.size,
        }
      })

    } catch (err) {
      toast.error(err.response.data.message);
      setProductMainImg([]);
      inputRef.current.value = null;
      console.log(err);
    }
  };

  const priceCommaToNumber = (e) => {
    let value = e.target.value;
    const numberCheck = /^[0-9,]+$/.test(value);

    if (!numberCheck && value) return; //값이 없거나 숫자가 아니면 리턴

    if (numberCheck) { //숫자인 경우
      const numberValue = value.replaceAll(",", ""); //모든 컴마 제거
      value = numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    updateProductInfo("price", value);
  };

  const previewsImg = productMainImg.map((preview,index) => (
    <li key={preview.imgSrc}>
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
      <button onClick={() => imgDeleteHandler(index)}></button>
    </li>
  ));

  return (
    <form onSubmit={onSubmit}>
      <ItemInfo>
        <ul>
          <li>상품명</li>
          <li>
            <input
              id="name"
              type="text"
              placeholder="ex) F41 HAWAII FIVE-O"
              onChange={(e) => updateProductInfo(e.target.id, e.target.value)}
            />
          </li>
        </ul>

        <ul>
          <li>상품가격</li>
          <li>
            <input
              id="price"
              type="text"
              placeholder="ex) 248000"
              value={productInfo.find((e) => e.key === "price").value}
              onChange={priceCommaToNumber}
            />
          </li>
        </ul>
      </ItemInfo>
      
      <ImgWrap>
        <ImgUploader>
          <div>
            <input
              ref={ref => (inputRef.current = ref)}
              id="image"
              type="file"
              multiple
              accept="image/*"
              onChange={imgHandler}
            />
          </div>
        </ImgUploader>

        <ImgPreview>
          {previewsImg}
        </ImgPreview>
      </ImgWrap>

      <UploadReactQuill
        theme="snow"
        onChange={(value) => updateProductInfo("details", value)}
        modules={quillModules}
        formats={quillFormats}
        placeholder="상세 이미지 및 설명을 작성하세요."
      />

      <ItemInfo>
        <ul>
          <li>종류</li>
          <li>
            <input
              id="type"
              type="text"
              placeholder="ex) 메신저백"
              onChange={(e) => updateProductInfo(e.target.id, e.target.value)}
            />
          </li>
        </ul>

        <ul>
          <li>소재</li>
          <li>
            <input
              id="material"
              type="text"
              placeholder="ex) 타프원단"
              onChange={(e) => updateProductInfo(e.target.id, e.target.value)}
            />
          </li>
        </ul>

        <ul>
          <li>색상</li>
          <li>
            <input
              id="color"
              type="text"
              placeholder="ex) 검정"
              onChange={(e) => updateProductInfo(e.target.id, e.target.value)}
            />
          </li>
        </ul>

        <ul>
          <li>크기</li>
          <li>
            <input
              id="size"
              type="text"
              placeholder="ex) 300 x 90 x 170 mm"
              onChange={(e) => updateProductInfo(e.target.id, e.target.value)}
            />
          </li>
        </ul>
      </ItemInfo>

      <BtnBox>
        <button type="button" onClick={() => setModalView(false)}>닫기</button>
        <button type="button" onClick={() => console.log({productInfo})}>업로드</button>
      </BtnBox>
    </form>
  );
};

export default UploadForm2;