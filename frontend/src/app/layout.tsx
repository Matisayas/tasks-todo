import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TUS TAREAS",
  description: "Descripción de tu aplicación",
};

export default function RootLayout(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="es" translate="no">
      <body>{children}</body>
    </html>
  );
}
