import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, Button, Menu, Slide, Tab, Tabs, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';

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
    setShowSideMenu(!showSideMenu);
  };

  useEffect(() => {
    if (!matches) {
      setShowSideMenu(false);
    }
  }, [matches]);

  const CommonLineBarNav = () => {
    return (
      <>
        <Box sx={{ paddingLeft: '24px' }}>
          <Tabs orientation="horizontal" value={idx} onChange={handleIndexChange}>
            <Tab label="Home" value={'/'} />
            <Tab label="Register" value={'/register'} />
            <Tab label="Item Three" value={'/dd'} />
            <Tab label="Item Four" value={'/test'} />
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
      <SideMenu direction="left" in={showSideMenu}>
        <Box>hi</Box>
      </SideMenu>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          width: '100vw',
          height: '48px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {matches ? (
          <Button onClick={() => handleShowSideMenu()}>showSideMenu</Button>
        ) : (
          <CommonLineBarNav />
        )}
      </Box>

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

const SideMenu = styled(Slide)`
  position: fixed;
  width: 120px;
  height: 100%;
  right: 0px;
  background-color: black;
`;
