import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interface réseau",
  description: "Networkers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body>{children}</body>;
}
