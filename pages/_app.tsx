import "../styles/globals.css";
import { BoosterProvider } from "../context/boosterContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <BoosterProvider>
      <Component {...pageProps} />
      <Toaster />
    </BoosterProvider>
  );
}

export default MyApp;
