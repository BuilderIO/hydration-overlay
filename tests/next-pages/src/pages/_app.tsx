import "@/styles/globals.css";
import { HydrationChecker } from "@builder.io/react-hydration-overlay";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HydrationChecker>
      <Component {...pageProps} />
    </HydrationChecker>
  );
}
