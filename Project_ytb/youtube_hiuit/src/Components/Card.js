import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import moment from "moment"
import axios from 'axios'
const Container = styled.div`
   
`
const Wrapper = styled.div`
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 5px; 
`
const StyledCard = styled.div`
    height: ${(props) => props.type === "sm" ? "110px" : "220px"};
    width: ${(props) => props.type === "sm" ? "220px" : "280px"};
    background-color: #ccc;
`
const CardImage = styled.img`
    width: 100%;
    height: 100%;
`
const CardTextChannel = styled.div`
    height: 130px;
    width: 290px;
    /* background-color: #ccc; */
    margin-top: ${(props) => props.type === "sm" ? "0px" : "10px"};
    display: flex;
    justify-content: space-around;
    gap: 20px;
`
const ChannelImg = styled.img`
    width: ${(props) => props.type === "sm" && "0px"};  
    height: 35px;
    border-radius: 90%;
    background: ${({ theme }) => theme.bg};
`
const ChanneBlog = styled.div`
    width: 100%;
    height: 100px;
    /* background-color: #ccc; */
`
const BlogTitle = styled.h1`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colorText};
    text-transform: uppercase;
`
const BlogChannel = styled.h1`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colorText};
`
const BlogView = styled.h1`
    font-size: 16px;
    font-weight: normal;
    text-decoration: none
    ;
`
function Card({ type, video }) {
    const [channel, setChannel] = useState({});
    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/user/find/${video.userId}`)
            setChannel(res.data)
        }
        fetchChannel();
    }, [video.userId])
    return (
        <Link to={`video/${video._id}`} style={{ textDecoration: "none", color: "currentcolor" }}>
            <Container>
                <Wrapper type={type} >
                    <StyledCard type={type}>
                        <CardImage src={video.imgUlr} />
                    </StyledCard>
                    <CardTextChannel type={type} >
                        <ChannelImg type={type} src="https://yt3.googleusercontent.com/ytc/AOPolaToAOoB7zZaRe9kVmXGi6QWBBPrESpK8pcaWnBL=s176-c-k-c0x00ffffff-no-rj" />
                        <ChanneBlog>
                            <BlogTitle style={{ textDecoration: "none", color: "currentcolor" }}>{video.title}</BlogTitle>
                            <BlogChannel>{channel.username}</BlogChannel>
                            <BlogView>{video.views} views - {moment((video.createdAt)).startOf('minutes').fromNow()}</BlogView>
                        </ChanneBlog>
                    </CardTextChannel>
                </Wrapper>
            </Container >
        </Link >
    )
}

export default Card
