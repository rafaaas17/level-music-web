import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store/theme';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export const ToogleTheme = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  return (
    <IconButton 
      onClick={() => dispatch(toggleTheme())}
      color="inherit"
    >
      { mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
    </IconButton>
  );
};