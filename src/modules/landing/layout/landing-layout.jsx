import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const LandingLayout = () => {
  return (
    <Container 
      sx={{ 
        minHeight: "calc(100vh - 64px)",
        paddingTop: 1,
        backgroundColor: 'background.default',
      }}
    > 
      <Outlet />
    </Container>
  )
}
