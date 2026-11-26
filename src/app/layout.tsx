import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Preloader } from "@/components/ui/preloader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SoundProvider } from "@/components/sound-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

/* Typography: Inter only — Maël Blanc styleguide (weights 400 / 500 / 600). */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
};

const themeInitScript = `(function(){try{var k='sagar-theme';var m=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=m==='dark'||(m!=='light'&&d);if(r)document.documentElement.classList.add('dark');document.documentElement.dataset.theme=r?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-axis="vertical"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll>
              <Preloader />
              <SiteHeader />
              <main className="flex-1 pt-14 tablet:pt-16">{children}</main>
              <SiteFooter />
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
