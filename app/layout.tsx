import ThumbNav from "components/ThumbNav";
import { Metadata } from "next";
import React from "react";

import "cssremedy/css/remedy.css";
import "styles/App.css";
import StyledComponentsRegistry from "lib/registry";

const TITLE = "Citi Bike Planner";

export const metadata: Metadata = {
  title: TITLE,
  openGraph: {
    title: TITLE,
    description: "The React Framework for the Web",
    url: "https://citibikeplanner.netlify.app",
    siteName: "Next.js",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StyledComponentsRegistry>
        <html lang="en">
          <body>{children}</body>
        </html>
      </StyledComponentsRegistry>
    </>
  );
}
