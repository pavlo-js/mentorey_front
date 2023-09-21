import '~/styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { wrapper } from '~/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import '~/styles/react-slick.css';

import LoadingScreen from '~/components/common/LoadingScreen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

let theme = createTheme({
  palette: {
    primary: {
      main: '#059669',
      light: '#10b981',
    },
    secondary: {
      main: '#FACC15',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const store: any = useStore();
  const queryClient = new QueryClient();
  return getLayout(
    <>
      <main className={notoSans.className}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={<LoadingScreen />} persistor={store.__persistor}>
            <ToastContainer position="top-center" />
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </PersistGate>
        </QueryClientProvider>
      </main>
    </>,
  );
}
export default wrapper.withRedux(App);
