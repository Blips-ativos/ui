import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blips UI",
  description:
    "A modern React component library built with Radix UI and Tailwind CSS",
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
