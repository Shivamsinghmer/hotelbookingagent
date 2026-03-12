import { Fjalla_One, Roboto_Slab } from "next/font/google";
import "./globals.css";

const fjallaOne = Fjalla_One({
  weight: '400',
  variable: "--font-heading",
  subsets: ["latin"],
  display: 'swap',
});

const robotoSlab = Roboto_Slab({
  variable: "--font-body",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "StayEase – Luxury Hotel & Flight Booking",
  description: "Find and book your next dream vacation with StayEase. Use our AI agent for a personalized booking experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fjallaOne.variable} ${robotoSlab.variable}`}>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
