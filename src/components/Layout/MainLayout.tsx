import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Sidebar, PermanentSidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentScreen, 
  onScreenChange 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Permanent Sidebar for Desktop */}
      <PermanentSidebar 
        currentScreen={currentScreen} 
        onScreenChange={onScreenChange} 
      />
      
      {/* Mobile Sidebar */}
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        currentScreen={currentScreen}
        onScreenChange={onScreenChange}
      />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - 280px)` },
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Header onMenuClick={handleDrawerToggle} />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};