import { MainProvider } from "../context/MainContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <Component {...pageProps} />
    </MainProvider>
  );
}

export default MyApp;
