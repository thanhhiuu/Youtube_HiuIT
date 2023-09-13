
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import axios from 'axios';
import { useState } from 'react';
import Upload from './Upload';


const Container = styled.div`
    position: sticky;
    top: 0;
    height: 50px;
    border-bottom: 1px solid #887878;
    z-index: 1;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.colorText};
    /* overflow-y: hidden; */
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`
const StyledInput = styled.input`
  outline: none;
  width: 450px;
  height: 26px;
  background-color: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.colorText};
  cursor: pointer;
  left: 23%;
  padding-left: 6px;
  border: 1px solid #666 ;
`
const StyledSignt = styled.button`
  text-transform: uppercase;
  width: 80px;
  height: 26px;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid blue;
  color: blue;   
  cursor: pointer;
  right: 2%;
`
const User = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`
const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* background-color: #999; */
`
const LognOut = styled.button`

`
function Navbar({ theme, setTheme }) {
  const { currentUser } = useSelector((state) => state.user);

  const [lognOut, setLognOut] = useState(true);

  const history = useNavigate();
  const handlLognOut = async (e) => {
    e.preventDefault();
    try {
      const out = await axios.post("/auth/lognout");
      console.log(out.data);

      setLognOut(false)
    } catch (error) {
      console.log(error);
    }
    history("/login");
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container>
        <Wrapper>
          <StyledInput placeholder="search..." />
          <Wrapper>
            {currentUser ? (
              <User >
                <VideoCallIcon onClick={() => setOpen(!open)} />
                <Avatar src={currentUser.imgUlr} />
                {currentUser.username}
                <LognOut className='btn btn-danger' onClick={handlLognOut}>Đăng Xuất </LognOut>
              </User>
            ) : (
              <StyledSignt ><Link to="/login" style={{ textDecoration: "none" }}>Login</Link></StyledSignt>
            )}

          </Wrapper>
        </Wrapper>
        {open && <Upload setOpen={setOpen} />}
      </Container >

    </>
  )
}

export default Navbar
