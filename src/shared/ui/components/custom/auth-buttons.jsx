import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Container } from '@mui/material';
import { Login as LoginIcon, PersonAdd as PersonAddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useScreenSizes } from '../../../shared/constants/screen-width';
import { startLogout } from '../../../store/auth';

export const AuthButtons = () => {
  const { isMd } = useScreenSizes();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(startLogout(navigate));

  if (status === 'authenticated') {
    return (
      <Box sx={{ flexGrow: 0, mx: { md: -3, xs: 0 } }}>
        {isMd ? (
          <Button 
            variant="outlined" 
            startIcon={<LogoutIcon />} 
            color="text" 
            sx={{ border: 'none', mx: 2 }} 
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        ) : (
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: 'text.primary' }} />
          </IconButton>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 0, mx: { md: -3, xs: 0 } }}>
      {isMd ? (
        <Container>
          {[
            { to: '/auth/login', icon: <LoginIcon />, text: 'Iniciar Sesión' },
            { to: '/auth/register', icon: <PersonAddIcon />, text: 'Registrarse' }
          ].map(({ to, icon, text }) => (
            <Button 
              key={to} 
              variant="outlined" 
              startIcon={icon} 
              color="text" 
              sx={{ border: 'none', p: 1 }} 
              component={Link} 
              to={to}
            >
              {text}
            </Button>
          ))}
        </Container>
      ) : (
        <IconButton component={Link} to="/auth/login">
          <LoginIcon sx={{ color: 'text.primary' }} />
        </IconButton>
      )}
    </Box>
  );
};
