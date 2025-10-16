import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputAdornment,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  TextField,
  Avatar,
} from '@mui/material';
import {
  Search,
  Notifications,
  AccountCircle,
  Language,
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { t, language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    handleLanguageMenuClose();
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { lg: 'none' } }}
        >
          <AccountCircle />
        </IconButton>

        <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
          <TextField
            fullWidth
            size="small"
            placeholder={t('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'grey.50',
                borderRadius: 3,
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Language Toggle */}
          <Box>
            <IconButton onClick={handleLanguageMenuOpen} color="inherit">
              <Language />
            </IconButton>
            <Menu
              anchorEl={languageAnchorEl}
              open={Boolean(languageAnchorEl)}
              onClose={handleLanguageMenuClose}
            >
              <MenuItem 
                onClick={() => handleLanguageChange('ar')}
                selected={language === 'ar'}
              >
                {t('arabic')}
              </MenuItem>
              <MenuItem 
                onClick={() => handleLanguageChange('en')}
                selected={language === 'en'}
              >
                {t('english')}
              </MenuItem>
            </Menu>
          </Box>

          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 40, height: 40, mr: 1 }}>
              SA
            </Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" fontWeight="bold">
                {t('sultanAlAhmed')}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t('assetManager')}
              </Typography>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>{t('profile')}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{t('settings')}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{t('logout')}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};