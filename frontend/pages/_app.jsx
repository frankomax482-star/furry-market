import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProvider from '../context/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff'
          }
        }}
      />
    </ThemeProvider>
  );
}
