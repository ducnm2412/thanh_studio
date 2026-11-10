"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { p } from "@/lib/data";

// Thời điểm (giây) phần tử bắt đầu xuất hiện – xem các lớp .he trong globals.css
const at = (t: number) => ({ "--t": t }) as CSSProperties;
// d = độ sâu: lớp càng gần (d lớn) càng trôi nhiều theo chuột và khi cuộn
const depth = (d: number) => ({ "--d": d }) as CSSProperties;
// Ảnh đơn sắc tông ấm cho hai thẻ ảnh
const warm = "grayscale sepia-[0.28] contrast-105";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Chữ "THANH" và hai thẻ ảnh trôi nhẹ theo chuột và khi cuộn; ảnh nền và cặp đôi đứng yên cùng nhau
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;
      el.style.setProperty("--mx", cur.x.toFixed(4));
      el.style.setProperty("--my", cur.y.toFixed(4));
      el.style.setProperty("--sy", Math.min(Math.max(0, -el.getBoundingClientRect().top), 1200).toFixed(1));
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Thanh Studio Wedding"
      className="relative isolate h-[100svh] min-h-[680px] max-h-[1050px] overflow-hidden bg-[#2f3a26] text-paper"
    >
      <div className="he he-fade he-scene absolute inset-0" style={at(0)}>
        {/* 1. Ảnh gốc làm nền, tràn màn hình */}
        <div className="hero-photo">
          <Image src={p(31)} alt="Cô dâu chú rể Thanh Studio Wedding trong lễ cưới giữa rừng" fill priority quality={92} sizes="max(100vw, 149svh)" className="object-cover" />
        </div>

        {/* 2. Chữ THANH nằm giữa nền và cặp đôi */}
        <div className="layer absolute inset-x-0 top-[10.5%] text-center sm:top-[13%]" style={depth(0.5)}>
          <h1
            aria-label="Thanh Studio Wedding Huế"
            className="inline-block font-didone text-[23vw] font-light leading-[0.8] tracking-[0.02em] drop-shadow-[0_4px_40px_rgba(20,30,15,0.35)] sm:text-[19vw] lg:text-[17vw] xl:text-[250px]"
          >
            {[..."THANH"].map((ch, i) => (
              <span key={i} aria-hidden className="he he-char inline-block" style={at(0.25 + i * 0.1)}>
                {ch}
              </span>
            ))}
          </h1>
        </div>

        {/* 3. Cặp đôi cắt từ chính ảnh nền, đặt trùng khít lên trên để che một phần chữ */}
        <div className="hero-photo pointer-events-none">
          <div className="he-couple absolute left-[26.953%] top-[14.099%] h-[77.398%] w-[61.035%]">
            <Image src="/hero-couple-2.png" alt="" fill priority quality={92} sizes="max(61vw, 91svh)" />
          </div>
        </div>

        {/* 4. Thẻ ảnh bên phải */}
        <div className="layer absolute right-[4%] top-[35%] hidden w-[21%] lg:block" style={depth(0.9)}>
          <div className="he he-card-r" style={at(0.7)}>
            <div className="floaty rotate-[3deg] rounded-xl bg-white p-2.5 shadow-[0_30px_60px_-15px_rgba(15,25,10,0.6)]">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-md">
                <Image src={p(12)} alt="" fill sizes="22vw" className={`object-cover ${warm}`} />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Thẻ ảnh bên trái */}
        <div className="layer absolute left-[3%] top-[40%] hidden w-[18%] lg:block" style={depth(1.1)}>
          <div className="he he-card-l" style={at(0.85)}>
            <div
              className="floaty -rotate-[2deg] rounded-xl bg-white p-2.5 shadow-[0_30px_60px_-15px_rgba(15,25,10,0.6)]"
              style={{ animationDelay: "-3s" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image src={p(32)} alt="" fill sizes="18vw" className={`object-cover ${warm}`} />
              </div>
            </div>
          </div>
        </div>

        {/* 6. Dòng ghi tên người chụp */}
        <p
          className="he he-up absolute bottom-[3%] left-[4%] font-didone text-[11px] font-bold italic leading-tight drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] sm:text-xs"
          style={at(1.2)}
        >
          Photographed
          <br />
          by Thanh Studio
        </p>
      </div>
    </section>
  );
}
