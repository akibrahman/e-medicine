import { Poppins } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./providers/TanstackProvider";
import ContextProvider from "./providers/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "@/components/Navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Home || E-Medicine",
  description: "E-medicine digital shop created by MD. Akib Rahman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <TanstackProvider>
          <ContextProvider>
            <ToastContainer />
            <Navbar />
            <div className="">{children}</div>
          </ContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
