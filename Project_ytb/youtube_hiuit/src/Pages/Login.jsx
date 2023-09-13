import React, { useState } from 'react'
import { styled } from 'styled-components'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loginError, loginStart, loginSuccess } from '../redux/useSlice';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../firebase.js"

import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
    position:relative;
    height: 93vh;

`
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #666;
    width: 320px;
    height: 550px;
`
const LoginWrapper = styled.div`
    height: 90%;
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

`
const Title = styled.div`
    text-align: center;
    text-transform:uppercase;
    font-size: 25px;
    font-weight: bold;
`
const InputLogin = styled.input`
    margin: 12px;
    width: 90%;
    color: ${({ theme }) => theme.colorText};
    background-color: transparent;
    border: 1px solid #666;        
    outline: none;
`
const ButtonSign = styled.button`
  color: ${({ theme }) => theme.colorText};
  background: transparent;
  border: 1px solid #666;
`
function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const dispatch = useDispatch();
  const hanldeSignnIn = async (e) => {
    // preventDefault giúp khi click vào được bỏ hành vì mặc định (trong trường hợp này không cần tải lại trang)
    e.preventDefault();

    // dispatch là một thành phần quan trong của redux giúp gửi các hoạt động đến store
    // Ơ đây giúp gửi loginStart, loginSuccess, loginError
    dispatch(loginStart());
    try {

      // Dùng axios thực hiện một yêu cầu post của client mới thông tin  username, password
      const res = await axios.post("/auth/signin", { username, password });

      // Giup xử lý dữ liệu đăng nhập
      dispatch(loginSuccess(res.data))
      history("/")
    } catch (error) {
      dispatch(loginError())
    }
  }
  const hanldeSignUp = async (e) => {
    // preventDefault giúp khi click vào được bỏ hành vì mặc định (trong trường hợp này không cần tải lại trang)
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", { username, email, password });
      console.log(res.data);
    } catch (error) {
      console.log("Lỗi ở auth/signin" + error);
    }
  }
  const hanldeGoogle = async () => {

    dispatch(loginStart())

    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
      axios.post("/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        imgUlr: result.user.photoURL
      }).then(res => {
        dispatch(loginSuccess(res.data))


      })
      history("/");
    }).catch((error) => {
      dispatch(loginError())
    })
  }
  return (
    <Container>
      <Wrapper>
        <LoginWrapper>
          <Title>Login</Title>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "-10", margin: "10px 0px" }}>
            <ButtonSign onClick={hanldeGoogle}>Google</ButtonSign>
          </div>
          <InputLogin placeholder='username' onChange={e => setUsername(e.target.value)} />
          <InputLogin placeholder='password' onChange={e => setPassword(e.target.value)} />
          <div style={{ textAlign: "center", margin: "6px", border: "1px solid #666", padding: "10px 0px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "-10", margin: "10px 0px" }}>
              <ButtonSign onClick={hanldeSignnIn}>Đăng nhập</ButtonSign>
            </div>
            Or</div>
          <InputLogin placeholder='username' onChange={e => setUsername(e.target.value)} />
          <InputLogin placeholder='email' onChange={e => setEmail(e.target.value)} />
          <InputLogin placeholder='password' onChange={e => setPassword(e.target.value)} />
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "-10" }}>
            <ButtonSign onClick={hanldeSignUp} >Đăng Ký</ButtonSign>
          </div>
        </LoginWrapper>
      </Wrapper>
    </Container>
  )
}

export default Login
