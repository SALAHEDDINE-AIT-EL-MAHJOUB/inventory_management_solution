import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import './navbar.css';

type Props = {
  onSelectPage: (page: string) => void;
};

export default function UnifiedNavbar({ onSelectPage }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [adminName, setAdminName] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState("dashboard");

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

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const handleProfile = () => {
    handleMenuClose();
    onSelectPage("updateprofile");
  };

  const handleLogout = () => {
    handleMenuClose();
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .finally(() => {
        localStorage.clear();
        sessionStorage.clear();
        setAdminName("");
        window.location.href = "/login";
      });
  };

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    onSelectPage(page);
    setMobileNavOpen(false); // Fermer le menu mobile après sélection
  };

  useEffect(() => {
    fetch("/api/admin/me", {
      credentials: "include"
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.adminName) setAdminName(data.adminName);
      })
      .catch(() => setAdminName(""));
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "register", label: "Inscrire Admin", icon: "👤" },
    { id: "client", label: "Clients", icon: "👥" },
    { id: "createclient", label: "Créer Client", icon: "➕" }
  ];

  // Menu pour le profil
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
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
      PaperProps={{
        elevation: 8,
        sx: {
          borderRadius: 3,
          mt: 1,
          minWidth: 180,
          '& .MuiMenuItem-root': {
            fontSize: '0.95rem',
            fontWeight: 500,
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: '#e3f2fd',
            }
          }
        }
      }}
    >
      <MenuItem onClick={handleProfile} sx={{ color: '#1565c0' }}>
        👤 Profil
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
        🚪 Déconnexion
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
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
      {navigationItems.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => {
            handlePageSelect(item.id);
            handleMobileMenuClose();
          }}
          sx={{
            backgroundColor: selectedPage === item.id ? '#e3f2fd' : 'transparent',
            color: selectedPage === item.id ? '#1565c0' : '#333',
            fontWeight: selectedPage === item.id ? 600 : 400,
          }}
        >
          {item.icon} {item.label}
        </MenuItem>
      ))}
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
        <p>Profil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 50%, #0277bd 100%)',
          boxShadow: '0 4px 20px rgba(21, 101, 192, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          minHeight: '70px !important',
          px: { xs: 2, md: 3 }
        }}>
          {/* Logo et titre */}
          <Box className="topbar-brand" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #ffffff20, #ffffff40)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              📦
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: '1.6rem',
                color: '#fff',
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              StockPilot
            </Typography>
          </Box>

          {/* Navigation desktop */}
          <Box 
            sx={{ 
              display: { xs: 'none', lg: 'flex' }, 
              gap: 1,
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '50px',
              padding: '8px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`navbar__link${selectedPage === item.id ? " active-nav-link" : ""}`}
                onClick={() => handlePageSelect(item.id)}
                style={{
                  background: selectedPage === item.id 
                    ? 'rgba(255,255,255,0.25)' 
                    : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  fontWeight: selectedPage === item.id ? 600 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  boxShadow: selectedPage === item.id 
                    ? '0 2px 8px rgba(255,255,255,0.2)' 
                    : 'none'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </Box>

          {/* Bouton menu mobile */}
          <IconButton
            sx={{ 
              display: { xs: 'flex', lg: 'none' },
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
            onClick={toggleMobileNav}
          >
            <MenuIcon />
          </IconButton>

          {/* Section profil */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {adminName && (
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '25px',
                  padding: '8px 16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: '#fff',
                    fontSize: '0.95rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  👋 {adminName}
                </Typography>
              </Box>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                width: 45,
                height: 45,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <AccountCircle />
            </IconButton>
            <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                sx={{ color: '#fff' }}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>

        {/* Menu mobile déroulant */}
        {mobileNavOpen && (
          <Box
            sx={{
              display: { xs: 'block', lg: 'none' },
              backgroundColor: 'rgba(13, 71, 161, 0.95)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              py: 2
            }}
          >
            {navigationItems.map((item) => (
              <Box
                key={item.id}
                onClick={() => handlePageSelect(item.id)}
                sx={{
                  py: 1.5,
                  px: 3,
                  cursor: 'pointer',
                  backgroundColor: selectedPage === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                  borderLeft: selectedPage === item.id ? '4px solid #fff' : 'none'
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: selectedPage === item.id ? 600 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </AppBar>
      
      {/* Décalage pour le contenu principal */}
      <Toolbar sx={{ minHeight: '70px !important' }} />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
