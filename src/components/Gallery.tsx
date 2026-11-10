"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { albums, p, type Album } from "@/lib/data";

const labels = ["Tự nhiên", "Tinh tế", "Lãng mạn"];
const AUTOPLAY = 7000;

// Màn hình lớn: bìa album được ghim lại, cuộn trang để lật qua từng album
const DESKTOP = "(min-width: 1024px)";
const subscribeDesktop = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

type CoverProps = { album: Album; phase: "in" | "out" | "idle"; onOpen: (i: number) => void };

function Cover({ album, phase, onOpen }: CoverProps) {
  const photos = album.photos;
  const coverN = Number(album.cover.match(/(\d+)\.png$/)?.[1]);
  const cards = photos.filter((n) => n !== coverN).slice(0, 3);
  const vol = String(albums.indexOf(album) + 1).padStart(2, "0");

  return (
    <div
      aria-hidden={phase === "out"}
      style={{ ["--tint" as string]: album.tint }}
      className={`absolute inset-0 overflow-hidden bg-[rgb(var(--tint))] ${
        phase === "in" ? "cover-in" : phase === "out" ? "cover-out pointer-events-none" : ""
      }`}
    >
      {/* Nền: ảnh của chính album, làm mờ + phủ màu cùng tông */}
      <Image
        src={p(album.bg)}
        alt=""
        fill
        sizes="100vw"
        className={`rv-bg scale-105 object-cover blur-[3px] ${album.mono ? "grayscale" : ""}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--tint)/0.35)_0%,rgb(var(--tint)/0.55)_45%,rgb(var(--tint)/0.95)_100%)]" />



      {/* Tiêu đề lớn – co giãn vừa khít chiều ngang */}
      <h3
        className="absolute inset-x-[6%] top-[11%] origin-top scale-y-[1.75] lg:inset-x-[4%] lg:top-[14%] lg:scale-y-[1.3] lg:text-[length:var(--fs-lg)]! whitespace-nowrap text-center font-condensed font-medium uppercase leading-[1.1] tracking-[-0.02em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.25)]"
        style={{
          fontSize: `min(24cqw, ${Math.round(150 / [...album.title].length)}cqw)`,
          ["--fs-lg" as string]: `min(13cqw, ${Math.round(120 / [...album.title].length)}cqw)`,
        }}
      >
        {[...album.title].map((ch, i) => (
          <span key={i} className="rv-char inline-block" style={{ ["--i" as string]: i }}>
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </h3>

      <div className="rv-up absolute left-[8%] top-[42%] font-sans lg:left-[4%] lg:top-[6%] lg:hidden text-[3cqw] leading-tight sm:top-[48%] sm:text-[2.1cqw]">
        <p>Vol {vol}</p>
        <p>NO .{photos.length.toString().padStart(2, "0")}</p>
      </div>
      <p className="absolute right-[8%] top-[42%] font-sans lg:hidden text-[2.4cqw] sm:top-[48%] sm:text-[1.7cqw]">© THANH STUDIO</p>

      {/* Nhân vật chính đã tách nền */}
      <div className="rv-cutout absolute bottom-[20%] left-1/2 h-[66%] w-[86%] -translate-x-1/2 sm:bottom-[16%] sm:h-[70%] lg:bottom-0 lg:h-[84%] lg:w-[44%]">
        <Image src={album.cover} alt={album.title} fill quality={92} sizes="(min-width:1024px) 50vw, (min-width:640px) 760px, 90vw" className="object-contain object-bottom drop-shadow-2xl" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] lg:h-[30%] bg-gradient-to-t from-[rgb(var(--tint))] via-[rgb(var(--tint)/0.6)] to-transparent" />

      {/* 3 thẻ ảnh */}
      <div className="rv-up lg:hidden absolute inset-x-[5%] bottom-[22%] grid grid-cols-[1fr_1.35fr_1fr] items-end gap-[2.5cqw] sm:bottom-[19%]">
        {cards.map((n, i) => (
          <button
            key={n}
            onClick={() => onOpen(photos.indexOf(n))}
            aria-label={`Xem ảnh ${i + 1} – ${album.title}`}
            style={{ ["--i" as string]: i }}
            className={`rv-card group relative overflow-hidden rounded-[2.5cqw] bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm ${
              i === 1 ? "aspect-[4/3.3]" : "aspect-[4/5]"
            }`}
          >
            <Image src={p(n)} alt="" fill quality={92} sizes="(min-width:640px) 400px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </button>
        ))}
      </div>

      {/* Thanh + câu chú thích */}
      <div className="rv-up lg:hidden absolute inset-x-[5%] bottom-[11%] sm:bottom-[12%]">
        <div className="h-[1.2cqw] max-h-3 rounded-full border border-white/50" />
        <p className="mt-[1.6cqw] text-center font-sans text-[3cqw] font-semibold uppercase tracking-[0.3em] sm:text-[2.6cqw] sm:tracking-[0.35em]">
          {album.tagline}
        </p>
      </div>


      {/* Bố cục ngang (desktop): cột trái chữ, cột phải ảnh */}
      <div className="rv-up absolute bottom-[7%] left-[6.5%] hidden w-[25%] lg:block">
        <p className="font-sans text-[1.5cqw] font-semibold uppercase leading-snug tracking-[0.25em]">{album.tagline}</p>
        <p className="mt-[1.2cqw] text-[1.1cqw] leading-relaxed text-white/90">{album.desc}</p>
        <div className="mt-[1.4cqw] flex items-center gap-[1.4cqw]">
          <div className="text-[1cqw] leading-tight">
            <p className="font-semibold">THANH STUDIO</p>
            <p className="text-white/80">#anhcuoihue · #{album.key.replace("-", "")}</p>
          </div>
          <span className="w-px self-stretch bg-white/70" />
          <button
            onClick={() => onOpen(0)}
            className="rounded-full bg-white px-[1.6cqw] py-[0.7cqw] font-condensed text-[1.1cqw] uppercase tracking-wider text-ink transition-colors hover:bg-gold hover:text-white"
          >
            Xem {photos.length} ảnh →
          </button>
        </div>
      </div>

      <div className="absolute bottom-[7%] right-[4%] hidden w-[26%] grid-cols-2 gap-[1cqw] lg:grid">
        {cards.map((n, i) => (
          <button
            key={n}
            onClick={() => onOpen(photos.indexOf(n))}
            aria-label={`Xem ảnh ${i + 1} – ${album.title}`}
            style={{ ["--i" as string]: i }}
            className={`rv-card group relative overflow-hidden rounded-[1.2cqw] shadow-xl ring-1 ring-white/30 ${
              i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
            }`}
          >
            <Image src={p(n)} alt="" fill quality={92} sizes="(min-width:1024px) 30vw, 1px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </button>
        ))}
      </div>
      <p className="absolute right-[4%] top-[6%] hidden font-sans text-[1.1cqw] lg:hidden">© THANH STUDIO</p>
      {/* Chân trang */}
      <div className="rv-up lg:hidden absolute inset-x-[5%] bottom-[2.5%] grid grid-cols-[1.6fr_auto_1fr] items-center gap-[3cqw] sm:bottom-[3%]">
        <p className="text-[2.6cqw] leading-snug text-white/90 sm:text-[1.75cqw]">{album.desc}</p>
        <div className="flex items-center gap-[2cqw] self-stretch">
          <span className="w-px self-stretch bg-white/70" />
          <div className="text-[2.4cqw] leading-tight sm:text-[1.7cqw]">
            <p className="font-semibold">THANH STUDIO</p>
            <p className="text-white/80">#anhcuoihue</p>
            <p className="text-white/80">#{album.key.replace("-", "")}</p>
          </div>
        </div>
        <button
          onClick={() => onOpen(0)}
          className="justify-self-end rounded-full bg-white px-[3cqw] py-[1.4cqw] font-condensed text-[2.6cqw] uppercase tracking-wider text-ink transition-colors hover:bg-gold hover:text-white sm:text-[1.7cqw]"
        >
          Xem {photos.length} ảnh →
        </button>
      </div>
    </div>
  );
}


export default function Gallery() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const [tick, setTick] = useState(0);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollMode = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
  const swipeX = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const album = albums[cur];
  const photos = album.photos;
  const paused = open !== null || !inView;

  const go = useCallback(
    (target: number) => {
      const n = albums.length;
      const next = ((target % n) + n) % n;
      if (next === cur) return;
      // Hướng chuyển: tới = 1, lùi = -1 (chọn đường ngắn nhất trên vòng)
      const fwd = (next - cur + n) % n;
      setDir(fwd <= n / 2 ? 1 : -1);
      setPrev(cur);
      setCur(next);
      setTick((t) => t + 1);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setPrev(null), 1100);
    },
    [cur],
  );

  // Cuộn tới đâu, album tương ứng hiện tới đó
  useEffect(() => {
    const track = trackRef.current;
    if (!scrollMode || !track) return;
    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      if (dist <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / dist));
      const idx = Math.min(albums.length - 1, Math.floor(progress * albums.length));
      if (idx !== cur) go(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollMode, cur, go]);

  // Nút mũi tên / vạch tiến trình: ở chế độ cuộn thì đưa trang tới đúng đoạn của album đó
  const nav = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!scrollMode || !track) return go(target);
      const idx = Math.min(albums.length - 1, Math.max(0, target));
      const rect = track.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      window.scrollTo({ top: rect.top + window.scrollY + ((idx + 0.5) / albums.length) * dist, behavior: "smooth" });
    },
    [scrollMode, go],
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section id="album" className="relative z-10 bg-cream py-16 text-white shadow-[0_-24px_60px_rgba(0,0,0,0.35)] sm:py-24 lg:py-0">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:max-w-none lg:px-0">
        {/* Trang bìa tạp chí – các bìa chồng lên nhau để chuyển cảnh liền mạch */}
        <div ref={trackRef} className="lg:h-[460svh]">
        <div
          ref={stageRef}
          onPointerDown={(e) => (swipeX.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeX.current === null) return;
            const dx = e.clientX - swipeX.current;
            swipeX.current = null;
            if (Math.abs(dx) > 60) nav(cur + (dx < 0 ? 1 : -1));
          }}
          data-dir={dir}
          style={{ ["--dir" as string]: dir }}
          className="@container relative mx-auto aspect-[9/16] w-full max-w-[880px] touch-pan-y select-none overflow-hidden bg-ink shadow-2xl sm:aspect-[4/5] lg:sticky lg:top-0 lg:aspect-auto lg:h-[100svh] lg:min-h-[640px] lg:max-w-none lg:shadow-none"
        >
          {prev !== null && <Cover key={`out-${albums[prev].key}-${tick}`} album={albums[prev]} phase="out" onOpen={() => {}} />}
          <Cover key={`in-${album.key}-${tick}`} album={album} phase={prev !== null ? "in" : "idle"} onOpen={setOpen} />

          {/* Nhãn đầu trang – giữ cố định giữa các bìa */}
          {/* Nhãn đầu trang */}
          <div className="pointer-events-none absolute z-10 inset-x-[8%] top-[6%] flex justify-between lg:inset-x-[4%] lg:text-[1.1cqw] font-sans text-[2.6cqw] font-semibold uppercase tracking-wider sm:text-[1.9cqw]">
            {labels.map((l) => <span key={l}>{l}</span>)}
          </div>

          {/* Nút chuyển trước / sau */}
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => nav(cur + d)}
              disabled={scrollMode && (d < 0 ? cur === 0 : cur === albums.length - 1)}
              aria-label={d < 0 ? "Album trước" : "Album sau"}
              className={`group absolute disabled:pointer-events-none disabled:opacity-30 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white hover:text-ink lg:h-14 lg:w-14 ${
                d < 0 ? "left-3 lg:left-[1.5%]" : "right-3 lg:right-[1.5%]"
              }`}
            >
              <span className="transition-transform group-hover:scale-125">{d < 0 ? "‹" : "›"}</span>
            </button>
          ))}

          {/* Thanh tiến trình nối các album */}
          <div className="absolute inset-x-[30%] top-[2.5%] z-20 flex gap-1.5 lg:inset-x-[40%] lg:top-auto lg:bottom-[3%]">
            {albums.map((a, i) => (
              <button
                key={a.key}
                onClick={() => nav(i)}
                aria-label={`Chuyển tới ${a.title}`}
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
              >
                <span
                  key={i === cur ? `${cur}-${tick}` : i}
                  className={`absolute inset-y-0 left-0 rounded-full bg-white ${
                    i < cur || (scrollMode && i === cur) ? "w-full" : i === cur ? "progress-fill" : "w-0"
                  }`}
                  style={i === cur && !scrollMode ? { animationDuration: `${AUTOPLAY}ms`, animationPlayState: paused ? "paused" : "running" } : undefined}
                  onAnimationEnd={i === cur && !scrollMode ? () => go(cur + 1) : undefined}
                />
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Gắn thẳng vào body để nằm trên thanh menu và cụm nút liên hệ nổi */}
      {open !== null && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={album.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 text-white"
          onClick={close}
        >
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={p(photos[open])} alt={`${album.title} – ảnh ${open + 1}`} fill quality={92} sizes="100vw" className="object-contain" />
          </div>
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-11 items-center gap-2 rounded-full border border-white/50 bg-white/10 pr-4 pl-3 text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
            aria-label="Đóng xem ảnh"
          >
            <span className="text-2xl leading-none">×</span>
            <span className="font-condensed text-sm uppercase tracking-widest">Đóng</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-4xl text-white/70 hover:text-white sm:left-6"
            aria-label="Ảnh trước"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-4xl text-white/70 hover:text-white sm:right-6"
            aria-label="Ảnh sau"
          >
            ›
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 overflow-x-auto px-4" onClick={(e) => e.stopPropagation()}>
            {photos.map((n, i) => (
              <button
                key={n}
                onClick={() => setOpen(i)}
                aria-label={`Ảnh ${i + 1}`}
                className={`relative h-14 w-10 shrink-0 overflow-hidden transition-opacity ${i === open ? "opacity-100 ring-2 ring-white" : "opacity-50 hover:opacity-90"}`}
              >
                <Image src={p(n)} alt="" fill sizes="40px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
