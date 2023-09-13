
import styled from 'styled-components'
import app from '../firebase';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage'; // Đảm bảo bạn import các phụ thuộc cần thiết từ Firebase
import { v4 } from 'uuid';



const Container = styled.div`
position: absolute;
top: 0%;
left:23%;
transform: translate(0%, 5%);
overflow-x: hidden;
z-index: 1;
`
const Wrapper = styled.div`
min-height: 620px;
width: 600px;
color: ${({ theme }) => theme.colorText};
border-radius: 10px;
background-color: ${({ theme }) => theme.bg};
border: 1px solid ${({ theme }) => theme.colorText};
`

const Close = styled.div`
font-size: 30px;
`
const Headers = styled.div`
display: flex;
align-items: center;
margin: 0px 10px 30px 10px;
justify-content: space-between;
`
const Rows = styled.div`
width: 90%;
margin: 30px auto;
max-height: 500px;
border: 1px solid ${({ theme }) => theme.colorText};
padding: 5px 0px;
`
const Textarea = styled.textarea`
width: 100%;
color: ${({ theme }) => theme.colorText};
background-color: ${({ theme }) => theme.bg};
outline: none;
border: none;
`
const InputFile = styled.input`
margin: 0px 5px;
outline: none;
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.colorText};
border: none;
width: 90%;
`
const ButtonUpload = styled.button`
padding: 5px;
width: 80px;
margin-bottom: 20px;
`


const Upload = ({ setOpen }) => {
    const [videos, setVideos] = useState(null);
    const [images, setImages] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [videoPer, setVideoPer] = useState(0);
    const [imagePer, setImagePer] = useState(0);
    const [inputs, setInputs] = useState({ title: '', desc: '', tags: [] });
    const [tag, setTag] = useState([]);
    const navigate = useNavigate();

    const UploadFile = async (file, urlType) => {
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `/files/${v4(file.name)}`);

            const uploadTask = uploadBytesResumable(storageRef, file);
            console.log(storageRef.fullPath);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    urlType === "imgUlr" ? setImagePer(progress) : setVideoPer(progress);
                },
                (error) => {
                    console.log("Lỗi ở loadingUpload " + error);
                },
                () => {
                    getDownloadURL(ref(storage, storageRef.fullPath)).then(url => {
                        // Gán url vào state
                        urlType === 'videoUlr' ? setVideoUrl(url) : setImageUrl(url);
                    })
                }
            );

        } catch (error) {
            console.log("Lỗi ở try catch loadingUpload " + error);
        }
    }

    const uploadVideo = useCallback(() => {
        if (videos) {
            UploadFile(videos, 'videoUlr');
        }
    }, [videos]);

    const uploadImage = useCallback(() => {
        if (images) {
            UploadFile(images, 'imgUlr');
        }
    }, [images]);

    useEffect(() => {
        if (videos) {
            videos && uploadVideo();
        }
    }, [uploadVideo]);

    useEffect(() => {
        if (images) {
            images && uploadImage();
        }
    }, [uploadImage]);
    const hanlderUpload = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/video", {
                ...inputs, tags: tag, videoUlr: videoUrl, imgUlr: imageUrl
            });
            console.log(res.data);
            navigate("/");
            setOpen(false);
            console.log("Videos:", videos);
            console.log("Images:", images);
        } catch (error) {
            console.error("Lỗi khi gọi API: " + error);
        }
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <Headers>
                        <h1 style={{ fontSize: "35px" }}>Tải Video Lên</h1>
                        <Close onClick={() => setOpen(false)}>X</Close>
                    </Headers>
                    <Rows>
                        {videoPer > 0 ? ("Uploading " + videoPer + " %") : (< InputFile type="file" accept='video/*' onChange={(e) => setVideos(e.target.files[0])} />)}
                    </Rows>

                    <Rows><InputFile type='text' placeholder='Title' name='title' onChange={(e) => setInputs({ ...inputs, title: e.target.value })} /></Rows>
                    <Rows><Textarea placeholder='Description' name='desc' rows={4} onChange={(e) => setInputs({ ...inputs, desc: e.target.value })} ></Textarea></Rows>
                    <Rows><InputFile placeholder='Tags' onChange={(e) => setTag(e.target.value.split(","))}></InputFile></Rows>
                    <Rows style={{ border: "none", height: "10px" }} ><Headers>Images:</Headers></Rows>
                    <Rows>
                        {imagePer > 0 ? ("Uploading " + imagePer + " %") : <InputFile type="file" accept='image/*' onChange={(e) => setImages(e.target.files[0])} />}
                    </Rows>
                    <Rows style={{ border: "none", height: "10px", textAlign: "center" }}><ButtonUpload onClick={hanlderUpload}>Upload</ButtonUpload></Rows>

                </Wrapper>
            </Container >
        </>
    )
}
export default Upload
