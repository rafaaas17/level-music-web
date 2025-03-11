import { Container } from '@mui/material'
import React from 'react'

export const LandingLayout = ({ children }) => {
  return (
    <Container 
      sx={{ 
        minHeight: "calc(100vh - 64px)",
        paddingTop: 1,
        backgroundColor: 'background.default',
      }}
    > 
      { children }
    </Container>
  )
}
