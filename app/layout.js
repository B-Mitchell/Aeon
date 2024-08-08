import "./globals.css";
import { Providers } from './globalRedux/Provider'
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Computerized Land Management System",
  description: "created by Gloriaella",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers >
        <Navbar />
        {children}
      </Providers >
      </body>
    </html>
  );
}
