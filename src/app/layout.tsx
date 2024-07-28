import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Heading } from "~/components/home/Heading";
import Meteors from "~/components/magicui/meteors";
import Particles from "~/components/magicui/particles";

export const metadata = {
  title: "Summarise",
  description: "Summarise and talk to Youtube Videos",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="dark">
        <div className="grid h-screen grid-rows-[auto_1fr] ">
          <Meteors number={30} />
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color={"#ffffff"}
            refresh
          />
          <Heading />
          {children}
        </div>
      </body>
    </html>
  );
}
