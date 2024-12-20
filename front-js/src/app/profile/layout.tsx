import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier mon mot de passe",
  description: "Networkers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body>{children}</body>;
}
