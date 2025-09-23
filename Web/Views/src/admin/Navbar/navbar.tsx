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
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import './navbar.css';

type Props = {
  onSelectPage: (page: string) => void;
};

// Logo SVG JSX au lieu d'emoji
const StockPilotLogo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="url(#logoGradient)" />
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Icône de boîte/stock */}
    <rect x="12" y="16" width="24" height="20" rx="2" fill="#fff" fillOpacity="0.9" />
    <rect x="14" y="18" width="20" height="3" fill="#1976d2" fillOpacity="0.7" />
    <rect x="14" y="23" width="16" height="2" fill="#1976d2" fillOpacity="0.5" />
    <rect x="14" y="27" width="12" height="2" fill="#1976d2" fillOpacity="0.5" />
    <circle cx="32" cy="20" r="3" fill="#43a047" />
    <path d="M30.5 20L31.5 21L33.5 19" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
    setMobileNavOpen(false);
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
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "register", label: "Inscrire Admin", icon: <PersonAddIcon /> },
    { id: "client", label: "Clients", icon: <GroupIcon /> },
    { id: "createclient", label: "Créer Client", icon: <AddBoxIcon /> }
  ];

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
        elevation: 12,
        sx: {
          borderRadius: 3,
          mt: 1,
          minWidth: 200,
          background: 'linear-gradient(145deg, #ffffff, #f8fbff)',
          border: '1px solid rgba(25, 118, 210, 0.1)',
          '& .MuiMenuItem-root': {
            fontSize: '0.95rem',
            fontWeight: 500,
            py: 1.5,
            px: 2.5,
            borderRadius: 1,
            mx: 1,
            my: 0.5,
            '&:hover': {
              backgroundColor: '#e3f2fd',
              transform: 'translateX(4px)',
              transition: 'all 0.2s ease'
            }
          }
        }
      }}
    >
      <MenuItem onClick={handleProfile} sx={{ color: '#1565c0' }}>
        <PersonIcon sx={{ mr: 1.5 }} /> Profil
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
        <LogoutIcon sx={{ mr: 1.5 }} /> Déconnexion
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
      PaperProps={{
        elevation: 12,
        sx: {
          borderRadius: 3,
          mt: 1,
          minWidth: 250,
          background: 'linear-gradient(145deg, #ffffff, #f8fbff)',
        }
      }}
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
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
            borderRadius: 1,
            mx: 1,
            my: 0.5,
            '&:hover': {
              backgroundColor: '#e3f2fd',
              transform: 'translateX(4px)',
            }
          }}
        >
          {item.icon} {item.label}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 35%, #0d47a1 70%, #0277bd 100%)',
          boxShadow: '0 8px 32px rgba(21, 101, 192, 0.25)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          minHeight: '75px !important',
          px: { xs: 2, md: 4 }
        }}>
          {/* Logo et titre améliorés */}
          <Box className="topbar-brand" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05) rotate(5deg)'
                }
              }}
            >
              <StockPilotLogo />
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.75rem',
                  color: '#fff',
                  letterSpacing: '0.5px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                StockPilot
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  marginTop: '-2px',
                  display: 'block'
                }}
              >
                Gestion d'inventaire
              </Typography>
            </Box>
          </Box>

          {/* Navigation desktop améliorée */}
          <Box 
            sx={{ 
              display: { xs: 'none', lg: 'flex' }, 
              gap: 0.5,
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderRadius: '30px',
              padding: '6px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`navbar__link${selectedPage === item.id ? " active-nav-link" : ""}`}
                onClick={() => handlePageSelect(item.id)}
                style={{
                  background: selectedPage === item.id 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))' 
                    : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px 18px',
                  fontWeight: selectedPage === item.id ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Poppins", sans-serif',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  boxShadow: selectedPage === item.id 
                    ? '0 4px 12px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)' 
                    : 'none',
                  transform: selectedPage === item.id ? 'translateY(-1px)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedPage !== item.id) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPage !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </Box>

          {/* Bouton menu mobile amélioré */}
          <IconButton
            sx={{ 
              display: { xs: 'flex', lg: 'none' },
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.25)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease'
            }}
            onClick={toggleMobileNav}
          >
            <MenuIcon />
          </IconButton>

          {/* Section profil améliorée */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {adminName && (
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  borderRadius: '30px',
                  padding: '10px 18px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: '#fff',
                    fontSize: '0.95rem',
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    fontFamily: '"Poppins", sans-serif'
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
                backgroundColor: 'rgba(255,255,255,0.18)',
                color: '#fff',
                width: 50,
                height: 50,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  transform: 'scale(1.08)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <AccountCircle sx={{ fontSize: 28 }} />
            </IconButton>
            <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                sx={{ 
                  color: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' }
                }}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>

        {/* Menu mobile amélioré */}
        {mobileNavOpen && (
          <Box
            sx={{
              display: { xs: 'block', lg: 'none' },
              background: 'linear-gradient(180deg, rgba(13, 71, 161, 0.98), rgba(25, 118, 210, 0.95))',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              py: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            {navigationItems.map((item) => (
              <Box
                key={item.id}
                onClick={() => handlePageSelect(item.id)}
                sx={{
                  py: 2,
                  px: 3,
                  cursor: 'pointer',
                  backgroundColor: selectedPage === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(8px)'
                  },
                  borderLeft: selectedPage === item.id ? '4px solid #fff' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: selectedPage === item.id ? 700 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '1rem',
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)'
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
      
      <Toolbar sx={{ minHeight: '75px !important' }} />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
