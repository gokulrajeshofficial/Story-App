import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCharacter } from '../context/CharacterContext';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  AutoStories as StoryIcon,
  People as CharacterIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import ThemeToggle from '../components/ThemeToggle';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { selectedCharacter, clearSelectedCharacter } = useCharacter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggleDesktop = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Characters', icon: <CharacterIcon />, path: '/characters' },
    { text: 'Stories', icon: <StoryIcon />, path: '/stories' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{
            background: 'linear-gradient(45deg, #FF69B4 30%, #9370DB 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            opacity: drawerOpen ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          Story App
        </Typography>
        <IconButton 
          onClick={handleDrawerToggleDesktop}
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(255, 105, 180, 0.08)',
            },
            transform: drawerOpen ? 'none' : 'rotate(180deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: isSelected ? '4px' : '0',
                    background: 'linear-gradient(45deg, #FF69B4 30%, #9370DB 90%)',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::before': {
                    width: '4px',
                  },
                  backgroundColor: isSelected ? 'rgba(255, 105, 180, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 105, 180, 0.12)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isSelected ? 'primary.main' : 'inherit',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    color: isSelected ? 'primary.main' : 'inherit',
                    fontWeight: isSelected ? 600 : 400,
                    transition: 'all 0.3s ease',
                    opacity: drawerOpen ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 64}px)` },
          ml: { sm: `${drawerOpen ? drawerWidth : 64}px` },
          background: 'linear-gradient(45deg, #FF69B4 30%, #9370DB 90%)',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
              Story App
            </Typography>
            {selectedCharacter && (
              <Chip
                label={selectedCharacter.name}
                onDelete={clearSelectedCharacter}
                color="default"
                variant="outlined"
                size="small"
                sx={{
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    borderColor: 'rgba(0, 0, 0, 0.38)',
                  },
                  '& .MuiChip-deleteIcon': {
                    color: 'rgba(0, 0, 0, 0.54)',
                    '&:hover': {
                      color: 'rgba(0, 0, 0, 0.87)',
                    },
                  },
                  '& .MuiChip-label': {
                    px: 1,
                    fontSize: '0.875rem',
                  },
                }}
              />
            )}
          </Stack>
          <ThemeToggle />
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ ml: 1 }}
            aria-label="logout"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerOpen ? drawerWidth : 64 }, 
          flexShrink: { sm: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                borderRight: '1px solid rgba(255, 105, 180, 0.12)',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerOpen ? drawerWidth : 64,
                borderRight: '1px solid rgba(255, 105, 180, 0.12)',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 64}px)` },
          mt: '64px',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout; 