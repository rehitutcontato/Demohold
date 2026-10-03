import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Buarque & Vasconcellos • Advocacia Empresarial & Gestão Patrimonial | OAB/SP 12.890',
  description: 'Estruturação de holdings familiares, blindagem patrimonial preventiva e planejamento sucessório para dinastias empresariais e produtores rurais da região de Campinas e São Paulo.',
  openGraph: {
    title: 'Buarque & Vasconcellos • Advocacia Empresarial & Gestão Patrimonial',
    description: 'A perpetuação segura do patrimônio familiar construída sobre sólida governança jurídica. OAB/SP 12.890.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buarque & Vasconcellos • Advocacia Empresarial & Gestão Patrimonial',
    description: 'A perpetuação segura do patrimônio familiar construída sobre sólida governança jurídica.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#090a0c] text-[#d6dbe4] antialiased selection:bg-[#c4a482]/20 selection:text-[#f4efe9]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

