'use client'
import { useMemo } from 'react'
import { PaletteMode } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { amber, deepOrange, grey } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: deepOrange[900],
        paper: deepOrange[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
})

const GlobalThemeProvider = (props: { children: React.ReactNode }) => {
  const { mode } = useSelector((state: RootState) => state.mode)
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  // const theme = useMemo(() => createTheme(getDesignTokens('light')), [])

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

export default GlobalThemeProvider
