"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { p, testimonials } from "@/lib/data";
import EditorialSection, { SectionHeading } from "./editorial/EditorialSection";

// Dải ảnh nhỏ cuối section
const strip = [30, 34, 13, 24, 1];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(0);
  const n = testimonials.length;
  const t = testimonials[cur];
  const others = testimonials.map((x, i) => ({ ...x, i })).filter((x) => x.i !== cur);
  const go = (i: number) => {
    setPrev(cur); // ảnh cũ nằm lại bên dưới trong lúc ảnh mới quét vào
    setCur(((i % n) + n) % n);
  };
  // Mỗi câu của lời nhận xét là một dòng, hiện lần lượt
  const lines = t.quote.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [t.quote];

  return (
    <EditorialSection id="cam-nhan" className="bg-paper py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Real stories, real love."
          lines={["Thư từ các cặp đôi"]}
          note="Cảm nhận mẫu cho bản demo – sẽ thay bằng đánh giá thật từ fanpage."
        />

        <div data-scene className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
          {/* Ảnh lớn của câu chuyện đang xem */}
          <div data-img="left" className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:min-h-[640px]">
            <div data-parallax="5" className="absolute -inset-y-[7%] inset-x-0">
              <Image src={testimonials[prev].img} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <Image
                key={cur}
                src={t.img}
                alt={`Ảnh cưới của ${t.who.toLowerCase()}`}
                fill
                quality={92}
                sizes="(min-width:1024px) 55vw, 100vw"
                className="ed-swap-img object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div data-reveal className="flex items-center justify-between">
              <p className="font-display text-2xl font-medium">
                {String(cur + 1).padStart(2, "0")} <span className="text-muted">/ {String(n).padStart(2, "0")}</span>
              </p>
              <div className="flex gap-2">
                {[-1, 1].map((d) => (
                  <button
                    key={d}
                    onClick={() => go(cur + d)}
                    aria-label={d < 0 ? "Câu chuyện trước" : "Câu chuyện sau"}
                    className="flex h-11 w-11 items-center justify-center border border-line text-lg transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {d < 0 ? "←" : "→"}
                  </button>
                ))}
              </div>
            </div>

            <figure data-reveal className="relative mt-8 flex-1 lg:mt-12">
              <span aria-hidden className="ed-quote-mark font-display text-[9rem] leading-[0.6] text-line">
                &ldquo;
              </span>
              <blockquote key={cur} aria-live="polite" className="font-display text-3xl italic leading-[1.25] sm:text-4xl xl:text-[2.6rem]">
                {lines.map((l, i) => (
                  <span key={l} className="ed-swap-line block" style={{ "--i": i } as CSSProperties}>
                    {l}
                  </span>
                ))}
              </blockquote>
              <figcaption key={`who-${cur}`} className="ed-swap-line eyebrow mt-7 text-muted" style={{ "--i": lines.length } as CSSProperties}>
                — {t.who}
              </figcaption>
            </figure>

            {/* Hai câu chuyện còn lại: bấm để xem */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
              {others.map((o) => (
                <button key={o.who} onClick={() => go(o.i)} className="group text-left" aria-label={`Xem cảm nhận của ${o.who.toLowerCase()}`}>
                  <div data-img="up" className="relative aspect-[4/3] overflow-hidden">
                    <div data-parallax="4" className="absolute -inset-y-[6%] inset-x-0">
                      <Image
                        src={o.img}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 20vw, 45vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <p className="eyebrow mt-3 !text-[11px] text-muted transition-colors group-hover:text-ink">
                    {String(o.i + 1).padStart(2, "0")} · {o.who}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dải ảnh ngang tối giản */}
        <div data-scene className="mt-14 grid grid-cols-5 gap-2 sm:gap-4 lg:mt-20">
          {strip.map((s) => (
            <div key={s} data-img="up" className="group relative aspect-[3/4] overflow-hidden">
              <Image
                src={p(s)}
                alt=""
                fill
                sizes="20vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>
      </div>
    </EditorialSection>
  );
}
