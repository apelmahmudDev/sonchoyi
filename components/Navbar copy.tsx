'use client'
import { useState, useMemo } from 'react'
import { Button, PaletteMode } from '@mui/material'

const Navbar = () => {
  const [mode, setMode] = useState<PaletteMode>('light')

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  return (
    <Button variant="contained" onClick={colorMode.toggleColorMode} sx={{ mb: 2 }}>
      Theme
    </Button>
  )
}

export default Navbar
