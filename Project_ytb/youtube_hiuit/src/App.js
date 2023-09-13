import { styled } from 'styled-components';
import './App.css';
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { DarkModes, LightModes } from './ultil/Theme';
import Items from './Pages/Items';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoSee from './Components/VideoSee';
import Login from './Pages/Login';

const Container = styled.div`
  display: flex;
  color: #fff;
  /* max-height: 100vh; */
  /* height: 100vh; */
`;

const Main = styled.div`
  flex: 2;
  max-height: 100%;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.colorText};
`;

function App() {
  const [theme, setTheme] = useState(true);
  return (
    <Router>
      <ThemeProvider theme={theme ? DarkModes : LightModes}>
        <Container>
          <Menu theme={theme} setTheme={setTheme} />
          <Main>
            <Navbar theme={theme} setTheme={setTheme} />

            <Routes>
              <Route index element={<Items type="random" />} />
              <Route path='sub' element={<Items type="sub" />} />
              <Route path='trends' element={<Items type="trend" />} />

              <Route path='/login' element={<Login />} />
              <Route path='video'>
                <Route path=':id' element={<VideoSee />} />
              </Route>
              {/* Thêm các Route khác nếu cần */}
            </Routes>

          </Main>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
