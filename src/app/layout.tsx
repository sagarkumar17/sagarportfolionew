import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { Preloader } from "@/components/ui/preloader";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SoundProvider } from "@/components/sound-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

/*
  Body: Inter (Maël). Hero display: Nunito (heavy rounded) for James-system fidelity.
  Chrome: dock + top-right cluster + SFX (SiteChrome).
*/

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
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

/** Skip preloader flash when already seen this session or reduced-motion. */
const pageReadyInitScript = `(function(){try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('sagar-preloader')==='1';if(r||s){document.documentElement.dataset.pageReady='1';}else{document.documentElement.dataset.pageReady='0';document.documentElement.dataset.preloader='active';}}catch(e){document.documentElement.dataset.pageReady='1';}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-axis="vertical"
      className={`${inter.variable} ${nunito.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: pageReadyInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll>
              <Preloader />
              <SiteChrome />
              <main className="flex-1 pb-24">{children}</main>
              <SiteFooter />
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
