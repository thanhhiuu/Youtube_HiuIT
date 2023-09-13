import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchError, fetchSuccess } from '../redux/videoSlice'
import axios from 'axios'
import { loginSuccess, subscription } from '../redux/useSlice'
import Comments from './Comments'


const Container = styled.div`
    width: 95%;
    margin: auto;
  z-index: 1;
`
const WrapperChannel = styled.div`
    /* height: 100%; */
    width: 100%;
    margin-bottom: 50px;
   /* background-color: #ccc; */
`
const DisPlayComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`
const LogoChannel = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`
const TitleChannel = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-weight: 500px;
  color: ${({ theme }) => theme.colorText};
  margin-left: 10px;
  text-transform: uppercase;
`
const SaveDisPlayComment = styled.div`
  display: flex;
`
const SaveSubriChannel = styled.div`
  
`
const ViewChannel = styled.div`
  text-transform: lowercase;
  color: ${({ theme }) => theme.colorText};
  font-size: 13px;
  font-weight: normal;

`
const ButtonSubChannel = styled.button`
  background-color: red;
  cursor: pointer;
  width: 110px;
  border-radius: 3px;
  height: max-content;
  padding: 5px;
  color: ${({ theme }) => theme.colorText};
  border: none;
`
const ChannelComment = styled.div`
  width: 90%;
  margin-left: 59px;
  font-size: 15px;
  text-align: justify;
  margin: 20px 60px;

`
const AddComment = styled.input`
width: 100%;  
    background: none;
    border: none;
  color: ${({ theme }) => theme.colorText};
    cursor: pointer;
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colorText};
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
`
const ImgChannel = styled.img`
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  object-fit: cover;
  `
function Comment({ videoId }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)

  const [comments, setComments] = useState([]);
  const [channel, setChannel] = useState({});

  const path = useLocation().pathname.split("/")[2];


  useEffect(() => {
    const fetch = async () => {
      try {
        const videos = await axios.get(`/video/find/${path}`);
        const channels = await axios.get(`/user/find/${videos.data.userId}`);
        const res = await axios.get(`/comment/${videoId}`);
        setComments(res.data);
        setChannel(channels.data)
        dispatch(fetchSuccess(videos.data));
      } catch (error) {
        console.log("UseFetch -  Comment", error);
      }
    }
    fetch();
  }, [path, dispatch, videoId])

  const hanlderSub = async () => {
    currentUser.subscribersUser.includes(channel._id)
      ? await axios.put(`/user/unsubscribe/${channel._id}`)
      : await axios.put(`/user/subscribe/${channel._id}`);
    dispatch(subscription(channel._id))
  };

  return (
    <Container>
      <WrapperChannel>
        <DisPlayComment>
          <SaveDisPlayComment>
            <LogoChannel src={channel.imgUlr}></LogoChannel>
            <TitleChannel>{channel.username} <ViewChannel > {channel.subscribers} subscribers</ViewChannel> </TitleChannel>

          </SaveDisPlayComment>
          <SaveSubriChannel>
            <ButtonSubChannel onClick={hanlderSub}>{currentUser.subscribersUser?.includes(channel._id) ? "Đã Đăng ký" : "Đăng ký"}</ButtonSubChannel>
          </SaveSubriChannel>
        </DisPlayComment>
        <ChannelComment>
          {currentVideo.desc}
        </ChannelComment>
        <Wrapper>
          <ImgChannel src={currentUser.imgUlr} />
          <AddComment placeholder='Thêm bình luận...'></AddComment>
        </Wrapper>
        <div style={{ margin: '20px 60px' }}>
          {comments.map(cmt => (
            < Comments key={cmt._id} comment={cmt} />
          ))}
        </div>
      </WrapperChannel>
    </Container >
  )
}

export default Comment
