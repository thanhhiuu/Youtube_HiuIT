import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import axios from 'axios'
const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px; 
    width: 90%;
    margin: auto;
    margin-top: 20px;
`

function Items({ type }) {
    const [videos, setVideo] = useState([])

    useEffect(() => {
        const getVideo = async () => {
            const res = await axios.get(`/video/${type}`);
            setVideo(res.data)
        }
        getVideo();
    }, [type])
    return (
        <Container>
            <Wrapper>
                {videos.map((video) => (
                    <Card key={video._id} video={video} />
                ))}
            </Wrapper>

        </Container>
    )
}

export default Items
