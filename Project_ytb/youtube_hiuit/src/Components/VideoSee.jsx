import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import Comment from './Comment';

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { subscription } from '../redux/useSlice';
import moment from 'moment';
const Container = styled.div`

`
const Content = styled.div`
    display: flex;
    /* overflow-y:scroll;   */

`
const ContentVideo = styled.div`

    flex: 5;
`
const SliderVideo = styled.div`
    height: 100%;
    margin-top: 20px;
    flex: 2;
`
const VideoYTB = styled.div`
    width: 95%;
    height: 70vh;
    margin: 20px auto;
    /* background-color: #ccc; */
`
const TitleVideo = styled.div`
    font-size: 16;
    font-weight: 500px;
    width: 95%;
    height: 90px;;
    /* background-color: #ccc; */
    margin: 1px auto;
`
const ChannelVideo = styled.div`
    display: flex;
    justify-content: space-between;
`
const NameVideo = styled.h5`
    font-size: 16px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colorText};
`
const ViewVideo = styled.div`
    color: ${({ theme }) => theme.colorText};
    font-size: 12px;
`
const DateVideo = styled.span`
    margin: 0px 5px;
`
const WrapperChannel = styled.div`
        display: flex;
        gap: 5px;
        z-index: 1;
`
const ButtonVideo = styled.button`
    font-size: 15px;
    display: flex;  
    gap: 5px;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colorText};
    background-color: transparent;

`
const HR = styled.hr`
    border: 0.8px solid #8a8383;
`
const VideoIfarm = styled.video`
    height: 100%;
    width: 100%;
    object-fit: cover;
    /* background-color: #333;  */
    z-index: 1;
`
function VideoSee() {

    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);

    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    const [video, setVideos] = useState({});
    const [channel, setChannel] = useState({});


    useEffect(() => {
        const fetch = async () => {
            try {
                const videos = await axios.get(`/video/find/${path}`);
                const channels = await axios.get(`/user/find/${videos.data.userId} `);
                setChannel(channels.data);
                dispatch(fetchSuccess(videos.data));
            } catch (error) {
                console.log(" UseFetch - VideoSee" + error);
            }
        }
        fetch();
    }, [path, dispatch])

    const hanldLike = async () => {
        await axios.put(`/user/like/${currentVideo._id} `);
        dispatch(like(currentUser._id));
    }
    const hanldDisLike = async () => {
        await axios.put(`/user/dislike/${currentVideo._id} `);
        dispatch(dislike(currentUser._id));
    }
    return (
        <Container>
            <Content>
                <ContentVideo>
                    <VideoYTB><VideoIfarm src={currentVideo.videoUlr} controls /></VideoYTB>
                    {/* <img height="100%" width="100%" src={currentVideo.imgUlr} alt="" /> */}
                    <TitleVideo>
                        <NameVideo>{currentVideo.title}</NameVideo>
                        <ChannelVideo>
                            <ViewVideo>{currentVideo.views} views -<DateVideo>{moment((currentVideo.createdAt)).startOf('millisecond').fromNow()}</DateVideo></ViewVideo>
                            < WrapperChannel>
                                <ButtonVideo onClick={hanldLike}>{currentVideo.like?.includes(currentUser._id) ? (< ThumbUpAltIcon />) : (< ThumbUpOffAltIcon />)} {""} {currentVideo.like?.length} </ButtonVideo>
                                <ButtonVideo onClick={hanldDisLike}>{currentVideo.dislike?.includes(currentUser._id) ? (<ThumbDownAltIcon />) : (< ThumbDownOffAltIcon />)} {""} {currentVideo.dislike?.length} </ButtonVideo>
                                <ButtonVideo> <ShareIcon />Share</ButtonVideo>
                                <ButtonVideo> <SaveIcon />Save</ButtonVideo>
                            </WrapperChannel>
                        </ChannelVideo>
                        < HR />
                    </TitleVideo>
                    {/*  Phần Bình luận */}
                    <Comment videoId={currentVideo._id} />
                </ContentVideo>
                {/* <SliderVideo>
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                    <Card type="sm" />
                </SliderVideo> */}
            </Content>
        </Container >
    )
}

export default VideoSee
