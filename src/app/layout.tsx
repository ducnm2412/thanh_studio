import type { Metadata } from "next";
import { Cormorant_Garamond, Oswald, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const condensed = Oswald({
  variable: "--font-condensed",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

// Serif thanh cho tiêu đề các section editorial và chữ in trên thiệp
const display = Cormorant_Garamond({
  variable: "--font-story",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Thanh Studio Wedding – Huế | Ảnh cưới, make up, váy cưới",
  description:
    "Ảnh cưới chuyên nghiệp – make up thời thượng – lưu giữ khoảnh khắc. Chụp pre-wedding Huế, Lăng Cô, Đà Nẵng, phóng sự ngày cưới và combo trọn gói.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} ${condensed.variable} ${script.variable} ${display.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
