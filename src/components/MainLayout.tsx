import { Link, Outlet, useNavigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';
import { Box, Button, Slide, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { MainMenuItemList } from '../constants/mainMenuItemList';

const MainLayout: React.FC = () => {
  const [idx, setIdx] = useState<string>(localStorage.getItem('navIdx') || '/');
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
    if (!matches) {
      setShowSideMenu(false);
    }
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('navIdx', idx);
  }, [idx]);

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
      <SideMenuContainer mountOnEnter unmountOnExit direction="left" in={showSideMenu}>
        <Box>
          {MainMenuItemList.map(item => (
            <Fragment key={item.url}>
              <CustomLink
                onClick={() => {
                  handleShowSideMenu();
                  setIdx(item.url);
                }}
                to={item.url}
              >
                <Typography
                  fontWeight={'bold'}
                  color={item.url === idx ? 'red' : 'black'}
                  variant="h4"
                  gutterBottom
                >
                  {item.name}
                </Typography>
              </CustomLink>
            </Fragment>
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
  padding: 20px;
  padding-top: 48px;
  background-color: white;
  box-shadow: 4px 2px 10px #dddd inset;
  border-radius: 8px;
`;

const NavBarContainer = styled(Box)`
  flex-grow: 1;
  background-color: white;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 24px;
`;
