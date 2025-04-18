import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/config/mui/theme";
import SnackbarProvider from "@/config/mui/snackbar";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AuthProvider from "@/config/auth";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Ukraine Logistic",
  description: "This is a brand new website for handling logistics in Ukraine",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <html lang="en">
      <body className={roboto.variable} style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <SnackbarProvider>
                <Box
                  component="main"
                  display="flex"
                  flexDirection="column"
                  minHeight="100vh"
                >
                  <Navigation />
                  <Box flex={1}>{children}</Box>
                  <Footer />
                </Box>
              </SnackbarProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
