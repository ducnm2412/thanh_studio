"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/data";

// Bản 1440p cho màn hình lớn / mật độ điểm ảnh cao, bản 1080p cho màn hình nhỏ
const VIDEO_SRC = "/video/dich-vu-scroll.mp4";
const VIDEO_SRC_1080 = "/video/dich-vu-scroll-1080.mp4";
const POSTER = "/video/dich-vu-poster.jpg";

/** Phần quãng cuộn dành cho các dịch vụ; sau mốc này là cảnh cô dâu chú rể. */
const FINALE_AT = 0.78;
/** Video chạy hết ở mốc này, đoạn cuộn còn lại giữ nguyên khung hình cuối. */
const VIDEO_END = 0.92;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function ServicesScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  // 0..services.length-1 = từng dịch vụ, services.length = cảnh kết
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;
    let target = 0;
    let current = 0;

    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;

      const d = video.duration;
      if (Number.isFinite(d) && d > 0 && !video.seeking) {
        const t = clamp01(current / VIDEO_END) * (d - 0.05);
        if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
      }

      if (current !== target || video.seeking) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const measure = () => {
      const rect = track.getBoundingClientRect();
      // 100vh cuối của track là đoạn section Album trượt lên phủ dần cảnh quay
      const vh = window.innerHeight;
      const dist = rect.height - vh * 2;
      const p = dist > 0 ? clamp01(-rect.top / dist) : 0;
      target = p;

      // Lối vào: cảnh quay hiện ra như một khung ảnh đặt trên nền giấy của phần
      // Câu chuyện, rồi nở dần ra tràn màn hình khi cuộn tới
      const enter = clamp01(1 - rect.top / vh);
      const rest = 1 - enter * enter * (3 - 2 * enter);
      if (stageRef.current) {
        stageRef.current.style.clipPath =
          rest > 0.001 ? `inset(${rest * 7}% ${rest * 12}% 0 ${rest * 12}% round ${rest * 32}px)` : "none";
      }
      if (cardWrapRef.current) cardWrapRef.current.style.opacity = String(clamp01((enter - 0.8) / 0.2));

      const exit = clamp01((-rect.top - dist) / vh);
      video.style.transform = `scale(${1 + exit * 0.08})`;
      if (dimRef.current) dimRef.current.style.opacity = String(exit * 0.6);
      if (finaleRef.current) {
        finaleRef.current.style.transform = `translate3d(0, ${-exit * 30}vh, 0)`;
        finaleRef.current.style.opacity = String(1 - clamp01(exit * 1.6));
      }

      const n = services.length;
      setStage(
        p >= FINALE_AT ? n : Math.min(n - 1, Math.floor((p / FINALE_AT) * n)),
      );
      if (barRef.current)
        barRef.current.style.scale = `${clamp01(p / FINALE_AT)} 1`;

      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    // Chỉ tải video khi người xem sắp cuộn tới section
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const px =
          Math.max(window.innerWidth, (window.innerHeight * 16) / 9) *
          window.devicePixelRatio;
        video.src = px > 1920 ? VIDEO_SRC : VIDEO_SRC_1080;
        video.load();
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(track);

    const onMeta = () => {
      // iOS chỉ cho tua khi video đã từng phát: phát câm rồi dừng ngay
      video
        .play()
        .then(() => video.pause())
        .catch(() => {});
      measure();
    };

    video.addEventListener("loadedmetadata", onMeta);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      video.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const finale = stage >= services.length;

  return (
    <div ref={trackRef} className="relative -mb-[100svh] h-[620vh]">
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden bg-ink">
        <video
          ref={videoRef}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />

        <div
          ref={dimRef}
          className="pointer-events-none absolute inset-0 bg-ink opacity-0"
        />

        {/* Thẻ dịch vụ */}
        <div ref={cardWrapRef} className="pointer-events-none absolute inset-0 mx-auto max-w-7xl">
          <div
            className={`absolute inset-x-4 bottom-6 bg-paper/92 p-6 pr-20 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-700 ease-out sm:inset-x-8 sm:p-8 sm:pr-24 lg:top-1/2 lg:pr-8 lg:left-auto lg:bottom-auto lg:w-[390px] lg:-translate-y-1/2 ${
              finale
                ? "translate-y-6 opacity-0 lg:-translate-y-[45%]"
                : "opacity-100"
            }`}
          >
            <p className="eyebrow flex items-center justify-between text-muted">
              <span>Dịch vụ</span>
              <span className="tabular-nums">
                {String(Math.min(stage, services.length - 1) + 1).padStart(
                  2,
                  "0",
                )}{" "}
                / {String(services.length).padStart(2, "0")}
              </span>
            </p>

            <div className="mt-3 grid">
              {services.map((s, i) => (
                <article
                  key={s.no}
                  className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${
                    i === stage || (finale && i === services.length - 1)
                      ? "translate-y-0 opacity-100 delay-150"
                      : i < stage
                        ? "-translate-y-4 opacity-0"
                        : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="font-script text-5xl leading-none text-gold">
                    {s.no}.
                  </span>
                  <div className="relative mt-3 hidden aspect-[16/10] overflow-hidden lg:[@media(min-height:760px)]:block">
                    <Image
                      src={s.img}
                      alt=""
                      fill
                      sizes="390px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold lg:mt-5">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.desc}
                  </p>
                </article>
              ))}
            </div>

            <span className="mt-6 block h-px bg-line">
              <span
                ref={barRef}
                className="block h-px origin-left scale-x-0 bg-gold"
              />
            </span>
          </div>
        </div>

        {/* Cảnh kết: cô dâu chú rể */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 via-ink/45 to-transparent pt-40 pr-20 pb-10 pl-6 text-paper sm:px-24 sm:text-center transition-all duration-1000 ease-out sm:pb-14 ${
            finale
              ? "translate-y-0 opacity-100 delay-300"
              : "pointer-events-none translate-y-6 opacity-0"
          }`}
        >
          <div ref={finaleRef} className="will-change-transform">
            <p className="font-script text-5xl sm:text-7xl">just for you</p>
            <p className="mt-3 max-w-xl sm:mx-auto font-serif text-lg leading-snug sm:text-xl">
              Chưa biết chọn gói nào? Kể cho chúng tôi nghe về ngày cưới của hai
              bạn.
            </p>
            <a
              href="#dat-lich"
              tabIndex={finale ? 0 : -1}
              className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-gold hover:text-paper"
            >
              Đặt lịch tư vấn →
            </a>
            <a
              href="#album"
              tabIndex={finale ? 0 : -1}
              className="eyebrow mt-6 block text-paper/80 transition-colors hover:text-paper sm:mt-8"
            >
              Cuộn tiếp để xem những câu chuyện chúng tôi đã kể ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
