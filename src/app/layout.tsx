import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My Side App",
  description: "App to mySide challenge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" type="image/png" href="/my-side-logo.png" />
      </head>
      <body>
        <Suspense>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
