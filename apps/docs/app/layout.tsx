import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blips UI",
  description:
    "A modern React component library built with Radix UI and Tailwind CSS",
  // favicon/app-icons da marca (sincronizados de @blips/brand → public/brand)
  icons: {
    icon: [
      { url: "/brand/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: {
      url: "/brand/favicon/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/brand/favicon/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider
          theme={{ defaultTheme: "light", enableSystem: false }}
          i18n={{
            locale: "pt-BR",
            translations: {
              search: "Buscar",
              searchNoResult: "Nenhum resultado encontrado",
              toc: "Nesta página",
              tocNoHeadings: "Sem seções",
              lastUpdate: "Última atualização",
              nextPage: "Próxima página",
              previousPage: "Página anterior",
              chooseTheme: "Escolher tema",
              chooseLanguage: "Escolher idioma",
              editOnGithub: "Editar no GitHub",
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
