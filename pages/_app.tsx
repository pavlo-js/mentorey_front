import "~/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
// Redux import
import { wrapper } from "~/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
// Next theme and MUI
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Loading
import LoadingScreen from "~/components/common/LoadingScreen";
// React-Query
import { QueryClient, QueryClientProvider } from "react-query";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

let theme = createTheme({
  palette: {
    primary: {
      main: "#059669",
      light: "#10b981",
    },
  },
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const store: any = useStore();
  const queryClient = new QueryClient();
  return getLayout(
    <>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={<LoadingScreen />} persistor={store.__persistor}>
          <ToastContainer position="top-center" />
          <MuiThemeProvider theme={theme}>
            <Component {...pageProps} />
          </MuiThemeProvider>
        </PersistGate>
      </QueryClientProvider>
    </>
  );
}
export default wrapper.withRedux(App);
