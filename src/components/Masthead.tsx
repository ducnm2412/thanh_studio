"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { studio } from "@/lib/data";

const nav = [
  { href: "#cau-chuyen", label: "Câu chuyện" },
  { href: "#dich-vu", label: "Dịch vụ" },
  { href: "#album", label: "Album" },
  { href: "#bang-gia", label: "Bảng giá" },
  { href: "#cam-nhan", label: "Cảm nhận" },
  { href: "#lien-he", label: "Liên hệ" },
];

export default function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ở đầu trang navbar nằm trong suốt trên ảnh Hero tối màu nên dùng chữ sáng
  const light = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        light ? "bg-transparent text-paper [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]" : "bg-paper/90 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <a href="#" className="flex items-center gap-3" aria-label="Thanh Studio Wedding – về đầu trang">
          <Image
            src="/logo-mark-ink.png"
            alt=""
            width={490}
            height={480}
            priority
            className={`w-auto transition-all duration-500 ${scrolled ? "h-12" : "h-14 sm:h-[72px]"} ${light ? "brightness-0 invert" : ""}`}
          />
          <span className="leading-none">
            <span className="block whitespace-nowrap font-didone text-xl font-bold tracking-wide sm:text-2xl">THANH STUDIO</span>
            <span className={`mt-1 block font-serif text-sm italic ${light ? "text-paper/80" : "text-muted"}`}>Wedding · Huế</span>
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Chính">
          <ul className="flex items-center gap-6 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.14em] xl:gap-8">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#dat-lich"
            className={`hidden whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-gold hover:text-paper sm:inline-block ${
              light ? "bg-paper text-ink [text-shadow:none]" : "bg-ink text-paper"
            }`}
          >
            Đặt lịch
          </a>
          <a href={`tel:${studio.phone}`} className="hidden whitespace-nowrap text-sm font-semibold xl:inline">
            {studio.phoneDisplay}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
          >
            <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-4 pb-6 lg:hidden" aria-label="Menu di động">
          <ul className="divide-y divide-line">
            {[...nav, { href: "#dat-lich", label: "Đặt lịch" }].map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block py-4 font-didone text-2xl">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`tel:${studio.phone}`} className="mt-4 block text-center text-sm font-semibold">
            Hotline {studio.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  );
}
