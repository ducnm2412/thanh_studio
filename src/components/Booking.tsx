"use client";

import Image from "next/image";
import { useState } from "react";
import { p, packages, studio } from "@/lib/data";
import EditorialSection, { Lines } from "./editorial/EditorialSection";

const field =
  "mt-0.5 w-full border-b border-ink/40 bg-transparent py-1.5 text-sm outline-none transition-colors focus:border-ink placeholder:text-muted/70";
const label = "block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted";

export default function Booking() {
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Bản demo chưa có backend: chỉ xác nhận trên giao diện.
    setSent(String(fd.get("name") || "hai bạn"));
    e.currentTarget.reset();
  }

  return (
    <EditorialSection id="dat-lich" data-scene className="relative overflow-hidden bg-ink">
      {/* Ảnh nền phủ kín phía sau cả section */}
      <div data-img="up" className="absolute inset-0 overflow-hidden">
        <div data-parallax="5" className="absolute -inset-y-[7%] inset-x-0">
          <Image
            src={p(41)}
            alt="Cô dâu chú rể bên bờ biển Lăng Cô"
            fill
            quality={92}
            sizes="100vw"
            className="origin-[18%_100%] scale-[1.32] object-cover object-bottom"
          />
        </div>
        <div className="absolute inset-0 bg-ink/5" />
      </div>
      <p className="absolute bottom-8 right-8 hidden font-script text-6xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] lg:block">save the date</p>

      <div className="relative flex px-5 py-14 sm:px-8 sm:py-20 lg:min-h-[86svh] lg:items-center lg:px-[6vw]">
        {/* Phiếu tư vấn gọn: tấm giấy ivory đặt trên ảnh */}
        <div data-exit className="w-full bg-paper px-6 py-8 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)] sm:px-9 sm:py-10 lg:max-w-[460px]">
          <p data-reveal className="eyebrow !text-[10px] text-gold">Let&rsquo;s begin your story</p>
          <h2 className="mt-3 font-display text-[2rem] font-medium leading-[1.08] sm:text-4xl">
            <Lines lines={["Viết nên câu chuyện", "của bạn."]} />
          </h2>
          <p data-reveal className="mt-3 text-[13px] leading-relaxed text-muted">
            Để lại thông tin, studio sẽ gọi lại trong ngày. Hoặc gọi ngay{" "}
            <a className="border-b border-ink/40 text-ink hover:border-ink" href={`tel:${studio.phone}`}>{studio.phoneDisplay}</a>.
          </p>

          {sent ? (
            <div className="mt-7 border-y border-line py-8 text-center" role="status">
              <p className="font-script text-4xl text-gold">thank you</p>
              <p className="mt-2 font-display text-xl">Cảm ơn {sent}! Thanh Studio sẽ liên hệ sớm.</p>
              <button onClick={() => setSent(null)} className="eyebrow mt-4 border-b border-ink pb-1 !text-[10px]">Gửi phiếu khác</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
              <label data-reveal className="col-span-2">
                <span className={label}>Tên hai bạn</span>
                <input name="name" required className={field} placeholder="Minh & Lan" />
              </label>
              <label data-reveal>
                <span className={label}>Điện thoại / Zalo</span>
                <input name="phone" required type="tel" pattern="[0-9 +]{9,13}" className={field} placeholder="09xx xxx xxx" />
              </label>
              <label data-reveal>
                <span className={label}>Ngày cưới dự kiến</span>
                <input name="date" type="date" className={field} />
              </label>
              <label data-reveal>
                <span className={label}>Gói quan tâm</span>
                <select name="package" className={field} defaultValue="">
                  <option value="" disabled>Chọn gói</option>
                  {packages.map((pk) => <option key={pk.name}>{pk.name}</option>)}
                  <option>Make up / thuê váy lẻ</option>
                </select>
              </label>
              <label data-reveal>
                <span className={label}>Khu vực</span>
                <select name="area" className={field} defaultValue="Huế">
                  <option>Huế</option>
                  <option>Đà Nẵng</option>
                  <option>Lăng Cô</option>
                </select>
              </label>
              <label data-reveal className="col-span-2">
                <span className={label}>Lời nhắn</span>
                <input name="note" className={field} placeholder="Kể đôi chút về ý tưởng của hai bạn…" />
              </label>
              <div data-reveal className="col-span-2 mt-1">
                <button type="submit" className="ed-fill w-full border border-ink bg-ink py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper">
                  <span>Gửi yêu cầu tư vấn</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </EditorialSection>
  );
}
