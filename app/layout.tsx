import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import GlobalThemeProvider from '@/components/GlobalThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'
import StoreProvider from './store/StoreProvider'
import './globals.css'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <StoreProvider>
            <GlobalThemeProvider>
              <CssBaseline />
              {props.children}
            </GlobalThemeProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
