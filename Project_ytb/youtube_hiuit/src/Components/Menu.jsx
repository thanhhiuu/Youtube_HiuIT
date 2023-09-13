
import { styled } from 'styled-components'
import HiuIT from '../img/logo2.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 180px;
    height: 100vh;
    background: ${({ theme }) => theme.bg};
    position: sticky;
    top: 0%;
    border-right: 1px solid #f3dddd;

    /* overflow-y: hidden; */
`

const Wrapper = styled.div`
 
`
const Logo = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 5px;
    font-size: 17px;
    text-transform: uppercase;
    padding-bottom: 4px;
`
const Img = styled.img`
    height: 25px;
`
const Items = styled.div`
  display: flex;
  justify-content: left;
  margin: 0px 10px;
  align-items: center;
  color: ${({ theme }) => theme.colorText};
  padding: 3.5px;
  &:hover{
    background-color: #d6d2d2;
  }
`
const Login = styled.div`
  font-size: 16px;
  
`
const HR = styled.hr`
  border-bottom: 1px solid #000;
`
const ButtonLogin = styled.button`
  background: transparent;
  padding: 5px 15px;
  color: ${({ theme }) => theme.colorText};
  margin: 5px 0px;
  border: 1px solid #3e56ee;
  cursor: pointer;
  border-radius: 3px;
`
function Menu({ theme, setTheme }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Items>
          <Logo  >
            <Img src={HiuIT} />
            <Link to="" style={{ textDecoration: "none", color: "currentcolor" }}>HiuIT</Link>
          </Logo>
        </Items>
        <Items>
          <Link to="" style={{ textDecoration: "none", color: "currentcolor" }}>Trang chủ</Link>
        </Items>
        <Items>
          <Link to="trends" style={{ textDecoration: "none", color: "currentcolor" }}>Mới nhất</Link>
        </Items>
        <Items>
          <Link to="/sub" style={{ textDecoration: "none", color: "currentcolor" }}>  Kênh đăng ký</Link>
        </Items>
        <HR />
        <Items>
          Đã xem
        </Items>
        <Items>
          Lịch sử
        </Items>
        <Items>
          Âm nhạc
        </Items>
        {!currentUser && <>
          <HR />
          <Items>
            <Login>
              Đăng nhập tài khoản để có nhiều ưu đãi
              <ButtonLogin>
                Đăng nhập
              </ButtonLogin>
            </Login>
          </Items>
          <HR />
        </>}
        <Items>
          Tin
        </Items>
        <Items>
          Điện tử
        </Items>
        <Items>
          Phim
        </Items>
        <Items>
          Tin mới
        </Items>
        <Items>
          Trực tiếp
        </Items>
        <HR />
        <Items>
          Cài đặt
        </Items>
        <Items>
          Trung tâm
        </Items>
        <Items>
          Hỗ trợ
        </Items>
        <Items onClick={() => { setTheme(!theme) }}>
          Chế độ: {theme ? "Tối" : "Sáng"}
        </Items>
      </Wrapper>
    </Container>
  )
}

export default Menu
