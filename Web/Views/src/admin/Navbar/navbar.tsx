import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    feather?: {
      replace: () => void;
    };
  }
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

type Props = {
  onSelectPage: (page: string) => void;
};

export default function PrimarySearchAppBar({ onSelectPage }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [adminName, setAdminName] = useState<string>("");

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

 const handleProfile = () => {
  handleMenuClose();
  onSelectPage("updateprofile");
};

  const handleLogout = () => {
    handleMenuClose();
    // Appelle l'API de logout si elle existe
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .finally(() => {
        // Nettoie le localStorage/sessionStorage et oublie le profil
        localStorage.clear();
        sessionStorage.clear();
        setAdminName(""); // <-- Oublie le nom affiché dans la navbar
        // Redirige vers la page de login
        window.location.href = "/login"; // <-- Redirection immédiate
      });
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  React.useEffect(() => {
    fetch("/api/admin/me", {
      credentials: "include"
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.adminName) setAdminName(data.adminName);
      })
      .catch(() => setAdminName(""));
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '10vh', bgcolor: '#eaeef6' }}>
      {/* Sidebar verticale */}
      <nav className="navbar" style={{
        position: 'fixed',
        top: 64,
        left: 0,
        height: 'calc(100vh - 64px)',
        width: 260,
        background: '#1976d2',
        boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
        borderRadius: '0 16px 16px 0',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '2rem'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
         </div>
        <ul className="navbar__menu" style={{ width: '100%' }}>
          <li className="navbar__item">
            <button
              className="navbar__link"
              style={{ background: "none", border: "none", color: "#fff", width: "100%", textAlign: "left", padding: "0.5rem 1.5rem", cursor: "pointer" }}
              onClick={() => onSelectPage("list")}
            >
              <i data-feather="users"></i>
              <span>Liste des admins</span>
            </button>
          </li>
          <li className="navbar__item">
            <button
              className="navbar__link"
              style={{ background: "none", border: "none", color: "#fff", width: "100%", textAlign: "left", padding: "0.5rem 1.5rem", cursor: "pointer" }}
              onClick={() => onSelectPage("register")}
            >
              <i data-feather="user-plus"></i>
              <span>Inscrire un admin</span>
            </button>
          </li>
          {/* Ajout du lien Client */}
          <li className="navbar__item">
            <button
              className="navbar__link"
              style={{ background: "none", border: "none", color: "#fff", width: "100%", textAlign: "left", padding: "0.5rem 1.5rem", cursor: "pointer" }}
              onClick={() => onSelectPage("client")}
            >
              <i data-feather="user"></i>
              <span>Client</span>
            </button>
          </li>
          <li className="navbar__item">
  <button
    className="navbar__link"
    style={{ background: "none", border: "none", color: "#fff", width: "100%", textAlign: "left", padding: "0.5rem 1.5rem", cursor: "pointer" }}
    onClick={() => onSelectPage("createclient")}
  >
    <i data-feather="user-plus"></i>
    <span>Créer Client</span>
  </button>
</li>
          <li className="navbar__item">
  <button
    className="navbar__link"
    style={{ background: "none", border: "none", color: "#fff", width: "100%", textAlign: "left", padding: "0.5rem 1.5rem", cursor: "pointer" }}
    onClick={() => onSelectPage("dashboard")}
  >
    <i data-feather="home"></i>
    <span style={{ marginLeft: 8 }}>Dashboard</span>
  </button>
</li>
          {/* ...autres liens... */}
        </ul>
        <div style={{ flexGrow: 1 }} />
        <div style={{ width: '100%', padding: '1rem 1.5rem', color: '#fff', fontSize: 13, opacity: 0.7 }}>
          © {new Date().getFullYear()} Admin
        </div>
      </nav>

      {/* AppBar horizontale */}
      <Box sx={{ flexGrow: 1, ml: { xs: 0, md: '260px' } }}>
        <AppBar position="fixed" sx={{ bgcolor: '#1976d2', color: '#fff', boxShadow: 3, zIndex: 1300 }}>
          <Toolbar>
            {/* Plus de bouton menu */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: '#fff',
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 700,
                fontSize: '1.3rem',
                letterSpacing: '0.07em',
                mr: 3
              }}
            >
              Admin Dashboard
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            {adminName && (
              <Typography
                variant="subtitle1"
                sx={{ marginRight: 2, fontWeight: 500 }}
              >
                {adminName}
              </Typography>
            )}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls="primary-search-account-menu-mobile"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
       
        
     
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
