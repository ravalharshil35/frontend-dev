import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import Spinner from './Spinner';
import ErrorIcon from '@mui/icons-material/Error';
import type { Theme, CSSObject } from '@mui/material/styles';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  })
);

const LeftPanel = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || '{}');

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  console.log('headers lohout==>', headers)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  console.log(baseUrl);

  const handleLogout = async () => {
    setLoading(true);
    // const data: any = {
    //   AuthTokenId: user.tokenId,
    // }


    try {
      //const logout = await callApi(`${baseUrl}user/logout`, 'POST', data, headers);
      setLoading(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('profileId');
      navigate("/login");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

    //const studentCSV = await callApi('http://localhost:4000/t1slstudent/createCSV',

    // axios.post('http://localhost:4000/user/logout', {
    //     AuthTokenId: user.tokenId,
    // }).then(() => {
    //     setLoading(false);
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('profileId');
    //     navigate("/login");
    // }).catch(err => {
    //     console.error(err);
    //     setLoading(false);
    // });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    handleMenuClose();
    navigate('/changepassword');
  };

  const handleLogoutMenu = () => {
    handleMenuClose();
    handleLogout();
  };

  const navItems = [
    {
      text: 'Users',
      path: '/usermanager',
      icon: <PeopleAltIcon />,
      relatedRoutes: ['/usermanager', '/resetpassword']
    },
    // {
    //   text: 'Profiles',
    //   path: '/profilemanager',
    //   icon: <img src={profileicon} alt="Profile Icon" style={{ width: 20, height: 20 }} />,
    //   relatedRoutes: ['/profilemanager', '/editprofile']
    // },
    {
      text: 'Students',
      path: '/studentmanager',
      icon: <SchoolIcon />,
      relatedRoutes: ['/studentmanager', '/studentDetails']
    },
    {
      text: 'Loggers',
      path: '/loggers',
      icon: <ErrorIcon />,
      relatedRoutes: ['/loggers']
    }
  ];

  return (
    <>
      <AppBar position="fixed" open={open} sx={{ mb: 5, backgroundColor: '#182958' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              { marginRight: 5 },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ECA Connector
          </Typography>
          <Box
            color="#fff"
            sx={{
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '1.125rem'
            }}
            onClick={handleMenuClick}
          >
            <AccountCircleIcon />
            {user.firstName} {user.lastName}
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon><KeyIcon fontSize="small" /></ListItemIcon>
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLogoutMenu}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '-webkit-fill-available',
            gap: '24px',
            paddingLeft: '10px'
          }}>
            <HomeIcon />
            <Box>
              <Typography sx={{ fontSize: '14px' }}>
                Welcome to ECA
              </Typography>
            </Box>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item) => {
            const isActive = item.relatedRoutes.some((route) => location.pathname.startsWith(route));
            return (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      justifyContent: open ? 'initial' : 'center',
                      backgroundColor: isActive ? '#e0e0e0' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: '#333'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0, color: '#333' }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        {loading && <Spinner />}
      </Drawer>
    </>
  );
};

export default LeftPanel;
