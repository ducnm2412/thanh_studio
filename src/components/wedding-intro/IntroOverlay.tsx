"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Album3D from "./Album3D";
import { INTRO_DONE_EVENT, INTRO_KEY, INTRO_SPEED, introAssets } from "./introAssets";

const preload = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });

export default function IntroOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    // Script nội tuyến trong WeddingIntro đã quyết định trước khi trang được vẽ
    if (!root || html.dataset.intro === "done") return;

    let finished = false;
    let cancelled = false;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
    const cam = q(".wi-cam");
    const book = q(".wi-book");
    const block = q(".wi-block");
    const leaves = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".wi-leaf"));
    const finalPhoto = q("[data-final]");
    const flat = q(".wi-flat");

    // Kích thước thật của sách (px) – CSS đã tính theo khung nhìn
    const W = block.offsetWidth;
    const B = W * 0.012;
    const T = W * 0.11;
    const Ts = T + B * 2;

    const ctx = gsap.context(() => {}, root);
    let failsafe: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (failsafe) clearTimeout(failsafe);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* không lưu được thì thôi, trang chủ vẫn hiện bình thường */
      }
      html.dataset.intro = "done"; // CSS ẩn lớp phủ
      html.style.overflow = prevOverflow;
      ctx.revert(); // dừng mọi tween
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    };
    skipRef.current = finish;

    ctx.add(() => {
      gsap.set(cam, { rotationX: 50, scale: 0.85, y: -W * 0.1 });
      gsap.set(book, { rotation: -16, x: -W / 2 });
      leaves.forEach((leaf, i) => gsap.set(leaf, { z: B + T + (leaves.length - i) * 1.2, "--bend": 0, "--shade": 0 }));
      gsap.set(flat, { "--f": 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" }, onComplete: finish });

      // CẢNH 1 – album xuất hiện và đặt nhẹ xuống
      tl.to(".wi-veil", { autoAlpha: 0, duration: 0.9, ease: "power1.out" }, 0);
      tl.to(cam, { scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0);

      // CẢNH 2 – mở bìa cứng: bìa xoay quanh đỉnh gáy, gáy ngả xuống mặt bàn
      tl.to(".wi-cover", { rotationY: -90, duration: 1.35 }, 1.2);
      tl.to(".wi-spine-g", { rotationY: -90, duration: 1.3 }, 1.5);
      tl.to(book, { x: Ts / 2, rotation: -7, duration: 1.6 }, 1.2);
      tl.to(cam, { rotationX: 42, duration: 1.6 }, 1.2);
      tl.to(".wi-shadow-l", { opacity: 1, duration: 0.9 }, 1.9);

      // CẢNH 3 – lật từng tờ quanh gáy, tờ giấy cong nhẹ vì mép ngoài đi chậm hơn
      const turn = 1.05;
      const gap = 0.55;
      leaves.forEach((leaf, i) => {
        const t0 = 2.8 + i * gap;
        tl.to(
          leaf,
          {
            rotationY: -180,
            x: -Ts * 0.5,
            z: B + 1.5 + i * 1.2,
            duration: turn,
            // Độ cong và độ tối đi theo góc lật: bằng 0 khi tờ giấy nằm phẳng, lớn nhất khi dựng đứng.
            // Nhờ vậy mép giấy không bao giờ lún xuống dưới mặt trang bên dưới.
            onUpdate() {
              const lift = Math.sin((-(gsap.getProperty(leaf, "rotationY") as number) * Math.PI) / 180);
              leaf.style.setProperty("--bend", (7 * lift).toFixed(3));
              leaf.style.setProperty("--shade", (0.2 * lift).toFixed(3));
            },
          },
          t0,
        );
      });
      const turnsEnd = 2.8 + (leaves.length - 1) * gap + turn;
      tl.to(".wi-cast", { opacity: 0.6, duration: 0.45 }, 2.85);
      tl.to(".wi-cast", { opacity: 0, duration: 0.6 }, turnsEnd - 0.6);

      // CẢNH 4 – máy quay tiến lại gần ảnh cuối, ảnh lớn dần ra ngoài album
      // tới đúng chỗ cặp đôi của Hero đang đứng (hoặc phủ kín màn hình nếu không khớp được)
      const zoom = turnsEnd + 0.2;
      tl.to(cam, { rotationX: 0, scale: 1.22, duration: 0.75 }, zoom);
      tl.to(book, { rotation: 0, x: -W / 2, duration: 0.75 }, zoom);
      const rect = () => finalPhoto.getBoundingClientRect();
      const grow = zoom + 0.75;
      // Ảnh nền Hero hiện sẵn bên dưới lớp phủ để đo được đúng vị trí
      tl.call(() => void (html.dataset.hero = "ready"), [], grow - 0.05);
      tl.set(flat, { left: () => rect().left, top: () => rect().top, width: () => rect().width, height: () => rect().height }, grow);
      tl.to(flat, { autoAlpha: 1, duration: 0.12, ease: "none" }, grow);
      const target = () => {
        const m = introAssets.heroMatch;
        const layer = document.querySelector<HTMLElement>(".he-couple");
        if (!m || !layer) return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        // Khung .he-couple ở Hero chính là vùng cặp đôi nằm trong ảnh gốc
        const c = layer.getBoundingClientRect();
        const k = Math.min(c.width / m.w, c.height / m.h);
        const left = c.left + (c.width - m.w * k) / 2;
        const top = c.bottom - m.h * k;
        return { left: left - m.x * k, top: top - m.y * k, width: m.photoW * k, height: m.photoH * k };
      };
      tl.to(
        flat,
        { left: () => target().left, top: () => target().top, width: () => target().width, height: () => target().height, duration: 1.05 },
        grow + 0.08,
      );
      // Album lùi vào nền để không lộ ra quanh ảnh (màn hình hẹp thì ảnh không phủ hết khung nhìn)
      tl.to(".wi-stage", { opacity: 0, duration: 0.5, ease: "power1.in" }, grow + 0.5);

      // CẢNH 5 – ảnh cuối trùng khít ảnh nền Hero; lớp phủ tan đi, chữ THANH và menu hiện ra
      const reveal = grow + 1.15;
      // Hero tự chạy hiệu ứng xuất hiện của nó (CSS, các lớp .he) ngay lúc lớp phủ bắt đầu tan
      tl.call(() => void (html.dataset.hero = "go"), [], reveal);
      tl.to(root, { opacity: 0, duration: 1.1, ease: "power1.inOut" }, reveal + 0.05);
      tl.to({}, { duration: 0.2 }, reveal + 1.15);

      tl.timeScale(INTRO_SPEED);

      // Chờ ảnh tải xong (tối đa 3 giây) rồi mới chạy, để không lộ khung ảnh trống
      const sources = [introAssets.cover, introAssets.linen, introAssets.paper, ...introAssets.photos.map((p) => p.src)];
      Promise.race([Promise.all(sources.map(preload)), new Promise((r) => setTimeout(r, 3000))]).then(() => {
        if (cancelled || finished) return;
        tl.play();
        // Không bao giờ giữ chân người xem nếu có gì trục trặc
        failsafe = setTimeout(finish, (tl.duration() / INTRO_SPEED) * 1000 + 2500);
      });
    });

    return () => {
      cancelled = true;
      if (failsafe) clearTimeout(failsafe);
      if (!finished) {
        html.style.overflow = prevOverflow;
        ctx.revert();
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="wi-root" role="dialog" aria-label="Mở album cưới Thanh Studio">
      <div className="wi-stage" aria-hidden>
        <Album3D />
      </div>
      <div
        className="wi-flat"
        aria-hidden
        style={{ backgroundImage: `url(${introAssets.photos[4].src})`, backgroundPosition: introAssets.photos[4].pos }}
      />
      <div className="wi-veil" aria-hidden />
      <button type="button" className="wi-skip" onClick={() => skipRef.current()}>
        Skip intro
      </button>
    </div>
  );
}
