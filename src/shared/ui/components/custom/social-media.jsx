import { Facebook, Instagram, WhatsApp } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export const SocialMedia = () => {
  return (
    <Box
      component={"div"}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        paddingTop: { md: 0, xs: 1 },
      }}
    >
      <Instagram />
      <Facebook />
      <WhatsApp />
      <Typography sx={{ fontSize: 14 }}>
        +51 989160593
      </Typography>
    </Box>
  )
}
