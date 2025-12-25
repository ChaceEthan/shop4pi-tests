import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;

    script.onload = () => {
      if (window.Pi) {
        window.Pi.init({
          version: "2.0",
          sandbox: process.env.NEXT_PUBLIC_SANDBOX === "true",
        });
      }
    };

    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
