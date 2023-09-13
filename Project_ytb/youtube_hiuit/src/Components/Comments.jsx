import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import VinhHaLong from '../img/Vịnh Hạ Long.jpg'
import axios from 'axios'


const Container = styled.div`
`
const WrapperComment = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 30px;
    background: ${({ theme }) => theme.bg};

`
const ImgChannel = styled.img`
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  object-fit: cover;
  `
const TitleComment = styled.div`
    font-size: 16px;
    display: flex;
  `

const TitleChannel = styled.div`
    font-size: 16px;
    display: inline-flex;
    gap: 10px;
  color: ${({ theme }) => theme.colorText};
  `
const DateChannel = styled.div`
    font-size: 13px;
  `

const CommentNewChannel = styled.div``
const ContentCommentVideo = styled.div``
// const Container = styled.div``
const Comments = ({ comment }) => {

  const [channel, setChannel] = useState({})

  useEffect(() => {
    const commentId = async () => {
      const res = await axios.get(`/user/find/${comment.userId}`);
      setChannel(res.data);
    }
    commentId();
  }, [comment.userId])

  return (
    <Container>
      <WrapperComment>
        <ImgChannel src={VinhHaLong} />
        <ContentCommentVideo>
          <TitleComment>
            <TitleChannel>{channel.username} <DateChannel></DateChannel></TitleChannel>
          </TitleComment>

          <CommentNewChannel>
            {comment.desc}
          </CommentNewChannel>
        </ContentCommentVideo>
      </WrapperComment>
    </Container>
  )
}

export default Comments
