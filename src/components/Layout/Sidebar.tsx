import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  Assignment,
  Assessment,
  TrendingUp,
  Settings,
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: Dashboard, key: 'dashboard' },
  { id: 'assets', icon: Inventory, key: 'assets' },
  { id: 'work-orders', icon: Assignment, key: 'workOrders' },
  { id: 'financial-reports', icon: Assessment, key: 'financialReports' },
  { id: 'predictive-analytics', icon: TrendingUp, key: 'predictiveAnalytics' },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, currentScreen, onScreenChange }) => {
  const { t } = useLanguage();

  const handleItemClick = (screenId: string) => {
    onScreenChange(screenId);
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
        display: { xs: 'block', lg: 'none' },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 48, height: 48 }}>
          <Inventory />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" color="white">
          OSSOL
        </Typography>
      </Box>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ p: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={currentScreen === item.id}
                onClick={() => handleItemClick(item.id)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={t(item.key as any)} 
                  primaryTypographyProps={{ 
                    fontWeight: 600,
                    fontSize: '1rem'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={currentScreen === 'settings'}
            onClick={() => handleItemClick('settings')}
            sx={{
              borderRadius: 2,
              '&.Mui-selected': {
                bgcolor: 'rgba(255,255,255,0.15)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <Settings />
            </ListItemIcon>
            <ListItemText 
              primary={t('settings')} 
              primaryTypographyProps={{ 
                fontWeight: 600,
                fontSize: '1rem'
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export const PermanentSidebar: React.FC<{ currentScreen: string; onScreenChange: (screen: string) => void }> = ({ currentScreen, onScreenChange }) => {
  const { t } = useLanguage();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', lg: 'block' },
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
        },
      }}
      open
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 48, height: 48 }}>
          <Inventory />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" color="white">
          OSSOL
        </Typography>
      </Box>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ p: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={currentScreen === item.id}
                onClick={() => onScreenChange(item.id)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={t(item.key as any)} 
                  primaryTypographyProps={{ 
                    fontWeight: 600,
                    fontSize: '1rem'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={currentScreen === 'settings'}
            onClick={() => onScreenChange('settings')}
            sx={{
              borderRadius: 2,
              '&.Mui-selected': {
                bgcolor: 'rgba(255,255,255,0.15)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <Settings />
            </ListItemIcon>
            <ListItemText 
              primary={t('settings')} 
              primaryTypographyProps={{ 
                fontWeight: 600,
                fontSize: '1rem'
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};