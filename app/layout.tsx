import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import GlobalThemeProvider from "@/components/GlobalThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<GlobalThemeProvider>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						{props.children}
					</GlobalThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
