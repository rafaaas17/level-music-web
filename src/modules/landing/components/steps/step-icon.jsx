import { CheckCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: ownerState.completed
    ? theme.palette.primary.main
    : ownerState.active
    ? theme.palette.primary.main
    : theme.palette.grey[600],
  color: '#fff',
}));

export const CustomStepIcon = ({ active, completed, icon }) => {
  return (
    <CustomStepIconRoot ownerState={{ completed, active }}>
      {completed ? <CheckCircle /> : icon}
    </CustomStepIconRoot>
  );
};
