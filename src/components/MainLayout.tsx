import { Link, Outlet, useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Menu,
  Slide,
  Switch,
  Tab,
  Tabs,
  useMediaQuery
} from '@mui/material';
import styled from '@emotion/styled';
import { MainMenuItemList } from '../constants/mainMenuItemList';

const MainLayout: React.FC = () => {
  const [idx, setIdx] = useState<string>('/');
  const [showSideMenu, setShowSideMenu] = useState(false);

  const matches = useMediaQuery('(max-width:650px)', { noSsr: true });
  const navigation = useNavigate();

  const handleIndexChange = (event: React.SyntheticEvent<Element, Event>, newIdx: string) => {
    setIdx(newIdx);
    navigation(newIdx);
  };

  const handleShowSideMenu = () => {
    setShowSideMenu(showSideMenu => !showSideMenu);
  };

  useEffect(() => {
    console.log('hi');
    if (!matches) {
      setShowSideMenu(false);
    }
  }, [matches]);

  const NavBar = () => {
    return (
      <>
        <Box sx={{ paddingLeft: '24px' }}>
          <Tabs orientation="horizontal" value={idx} onChange={handleIndexChange}>
            {MainMenuItemList.map(item => (
              <Tab key={item.url} label={item.name} value={item.url} />
            ))}
          </Tabs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '4px',
            paddingRight: '24px'
          }}
        >
          <Button>Login|UserInfo</Button>
        </Box>
      </>
    );
  };

  return (
    <Box>
      {/* 사이드메뉴, 따로 함수로 빼면 매번 재선언되어서 out animation이 정상 동작하지 않아 직접기입 */}
      <SideMenuContainer
        onExit={() => console.log('exit')}
        onExiting={() => console.log('exit')}
        mountOnEnter
        appear
        unmountOnExit
        direction="left"
        in={showSideMenu}
      >
        <Box>
          {MainMenuItemList.map(item => (
            <li key={item.url}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </Box>
      </SideMenuContainer>
      <NavBarContainer>
        {matches ? <Button onClick={handleShowSideMenu}>ShowSideMenu</Button> : <NavBar />}
      </NavBarContainer>

      <Box
        sx={{
          margin: '12px',
          padding: '12px'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;

const SideMenuContainer = styled(Slide)`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 100%;
  right: 0px;
  top: 49px;
  padding: 20px;
  background-color: white;
  border-left: 1px solid black;
`;

const NavBarContainer = styled(Box)`
  flex-grow: 1;
  background-color: white;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  height: 48px;
  border-bottom: 1px solid black;
`;
