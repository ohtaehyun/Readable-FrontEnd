import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

const MainLayout: React.FC = () => {
  const [idx, setIdx] = useState<string>('/');
  const navigation = useNavigate();

  const handleIndexChange = (event: React.SyntheticEvent<Element, Event>, newIdx: string) => {
    setIdx(newIdx);
    navigation(newIdx);
  };

  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Tabs
          orientation="horizontal"
          value={idx}
          variant="scrollable"
          onChange={handleIndexChange}
          aria-label="Horizontal tabs"
        >
          <Tab label="Home" value={'/'} />
          <Tab label="Register" value={'/register'} />
          <Tab label="Item Three" value={'/dd'} />
          <Tab label="Item Four" value={'/test'} />
        </Tabs>
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
