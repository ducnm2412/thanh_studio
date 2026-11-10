import Image from "next/image";
import { location, studio } from "@/lib/data";
import EditorialSection from "./editorial/EditorialSection";

const nav = [
  { href: "#cau-chuyen", label: "Câu chuyện" },
  { href: "#dich-vu", label: "Dịch vụ" },
  { href: "#album", label: "Album" },
  { href: "#bang-gia", label: "Bảng giá" },
  { href: "#cam-nhan", label: "Cảm nhận" },
  { href: "#dat-lich", label: "Đặt lịch" },
];

/** Footer kiêm phần liên hệ: địa chỉ, giờ mở cửa, hotline và chỉ đường nằm gọn ở đây */
export function Footer() {
  return (
    <EditorialSection as="footer" id="lien-he" data-scene className="relative overflow-hidden bg-ink text-paper">
      {/* Nền: cổng Ngọ Môn, Đại Nội Huế. Lớp phủ charcoal đậm để chữ đọc rõ, ảnh là nền chìm. */}
      <div data-img="up" className="absolute inset-0">
        <Image src="/images/footer-hue.webp" alt="" fill quality={92} sizes="100vw" className="object-cover object-[50%_30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/85 to-ink/75" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-5 pt-8 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:px-8 sm:pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div data-reveal className="col-span-2 flex items-center gap-4 lg:col-span-1 lg:block">
            <Image src="/logo-crop.png" alt="Thanh Studio Wedding" width={1248} height={696} className="h-16 w-auto shrink-0 lg:h-20" />
            <p className="max-w-sm font-display text-xl italic leading-snug sm:text-2xl lg:mt-6 lg:text-3xl">Every love story deserves to be remembered.</p>
            <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-paper lg:block">{studio.bio}</p>
          </div>

          <nav data-reveal aria-label="Chân trang">
            <p className="eyebrow !text-[11px] text-paper/90">Khám phá</p>
            <ul className="mt-3 space-y-2 text-sm lg:mt-5 lg:space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="ed-link">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal>
            <p className="eyebrow !text-[11px] text-paper/90">Ghé thăm studio</p>
            <ul className="mt-3 space-y-2 text-sm lg:mt-5 lg:space-y-3">
              <li>
                <a href={`tel:${studio.phone}`} className="ed-link whitespace-nowrap font-display text-xl lg:text-2xl">{studio.phoneDisplay}</a>
              </li>
              <li className="break-all">
                <a href={`mailto:${studio.email}`} className="ed-link">{studio.email}</a>
              </li>
              <li className="max-w-[16rem] leading-relaxed text-paper/90">{location.address}</li>
              <li className="text-paper/90">{location.hours}</li>
              <li>
                <a href={location.link} target="_blank" rel="noreferrer" className="ed-link eyebrow !text-[11px]">Chỉ đường →</a>
              </li>
            </ul>
          </div>

          <div data-reveal className="col-span-2 lg:col-span-1">
            <p className="eyebrow hidden !text-[11px] text-paper/90 lg:block">Kết nối</p>
            <ul className="flex gap-5 text-sm lg:mt-5 lg:block lg:space-y-3">
              <li><a href={studio.facebook} target="_blank" rel="noreferrer" className="ed-link">Facebook</a></li>
              <li><a href={studio.messenger} target="_blank" rel="noreferrer" className="ed-link">Messenger</a></li>
              <li><a href={studio.zalo} target="_blank" rel="noreferrer" className="ed-link">Zalo</a></li>
            </ul>
          </div>
        </div>

        <span data-divider className="mt-6 block lg:mt-8 h-px w-full bg-paper/25" />
        <div data-reveal className="mt-4 flex justify-between gap-4 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-paper/90 sm:tracking-[0.3em]">
          <p>© 2026 Thanh Studio</p>
          <p>Huế · Việt Nam</p>
        </div>
      </div>
    </EditorialSection>
  );
}
