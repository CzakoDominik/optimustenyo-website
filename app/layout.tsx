import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptimusTenyo | Magyar Gangster Rapper",
  description: "OptimusTenyo hivatalos weboldala - Magyar Gangster Rapper Tiszatenyőről. Hallgasd meg a legújabb számokat, nézd meg a galériát és kövesd a social media csatornákon!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
