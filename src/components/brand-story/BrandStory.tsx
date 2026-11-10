"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Invitation3D from "./Invitation3D";
import { STORY_KEY, STORY_ONCE_PER_TAB, STORY_SPEED, STORY_TRIGGER, storyAssets } from "./storyConfig";
import "./BrandStory.css";

/**
 * Section "Câu chuyện thương hiệu": một tấm thiệp cưới gập ba.
 * Mặc định (CSS) thiệp đã mở sẵn và là nội dung của section.
 * Trên màn hình rộng, lần đầu cuộn tới thì thiệp hiện ra ở dạng gập, tự mở rồi lớn lên và ở lại như vậy.
 */
export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || STORY_TRIGGER === "off") return;
    // Màn hình hẹp xếp ba tấm theo chiều dọc cho dễ đọc, không dựng 3D
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 899px)").matches) return;
    try {
      if (/[?&]story=1/.test(location.search)) sessionStorage.removeItem(STORY_KEY);
      if (STORY_ONCE_PER_TAB && sessionStorage.getItem(STORY_KEY)) return;
    } catch {
      /* không đọc được sessionStorage thì vẫn chạy bình thường */
    }

    const html = document.documentElement;
    const q = <T extends HTMLElement>(sel: string) => section.querySelector<T>(sel)!;
    const card = q(".bs-card");
    const left = q(".bs-left");
    const right = q(".bs-right");
    const archPhoto = q(".bs-arch-photo");

    section.classList.add("bs-armed");
    new Image().src = storyAssets.main; // tải sẵn ảnh chính

    let started = false;
    let finished = false;
    let prevOverflow = "";
    let failsafe: ReturnType<typeof setTimeout> | undefined;
    let snap: gsap.core.Tween | undefined;
    const ctx = gsap.context(() => {}, section);

    const finish = () => {
      if (finished) return;
      finished = true;
      io.disconnect();
      if (failsafe) clearTimeout(failsafe);
      try {
        sessionStorage.setItem(STORY_KEY, "1");
      } catch {
        /* bỏ qua */
      }
      snap?.kill();
      ctx.revert(); // về trạng thái mặc định của CSS: thiệp mở sẵn, cỡ lớn
      section.classList.remove("bs-armed");
      if (started) html.style.overflow = prevOverflow;
    };
    skipRef.current = finish;

    // Bóng theo góc gập: tấm dựng đứng thì tối nhất và đổ bóng dài nhất lên tấm giữa
    const shade = (panel: HTMLElement, cast: string) => () => {
      const lift = Math.sin((Math.abs(gsap.getProperty(panel, "rotationY") as number) * Math.PI) / 180);
      panel.style.setProperty("--sh", (0.2 * lift).toFixed(3));
      gsap.set(cast, { opacity: 0.6 * lift });
    };

    let tl: gsap.core.Timeline;
    ctx.add(() => {
      // Trạng thái gập: tấm phải nằm sát tấm giữa, tấm trái (bìa) đè lên trên và hơi hé
      gsap.set(card, { rotationX: 26, rotationY: -16, rotation: -5, scale: 0.6 });
      gsap.set(left, { rotationY: 176, z: 3 });
      gsap.set(right, { rotationY: -180, z: 1.5 });
      gsap.set(".bs-shadow", { z: -2, scaleX: 0.36 });
      gsap.set(".bs-rv", { opacity: 0, y: 10 });
      gsap.set(archPhoto, { clipPath: "inset(100% 0% 0% 0%)" });

      tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" }, onComplete: finish });

      // CẢNH 1 – thiệp gập hiện ra, máy quay tiến lại gần
      tl.to(".bs-veil", { autoAlpha: 0, duration: 0.8, ease: "power1.out" }, 0);
      tl.to(card, { scale: 0.68, rotationY: -10, rotationX: 22, duration: 1.5, ease: "power2.out" }, 0);

      // CẢNH 2 – mở thiệp: tấm trái mở trước, qua khỏi phương thẳng đứng thì tấm phải mới mở
      tl.to(left, { rotationY: 0, z: 0, duration: 1.45, onUpdate: shade(left, ".bs-cast-l") }, 1.5);
      tl.to(right, { rotationY: 0, z: 0, duration: 1.3, onUpdate: shade(right, ".bs-cast-r") }, 2.2);
      tl.to(card, { rotationX: 8, rotationY: 0, rotation: 0, scale: 0.8, duration: 2 }, 1.5);
      tl.to(".bs-shadow", { scaleX: 1, duration: 2 }, 1.5);

      // CẢNH 3 – nội dung hiện dần: ảnh chính, chữ tấm giữa, rồi hai tấm bên
      tl.to(archPhoto, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power2.out" }, 3.5);
      tl.to(".bs-center .bs-rv", { opacity: 1, y: 0, duration: 0.7, stagger: 0.13, ease: "power2.out" }, 3.55);
      tl.to(".bs-left .bs-rv, .bs-right .bs-rv", { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power2.out" }, 3.95);

      // CẢNH 4 – thiệp lớn lên, nằm thẳng trước mặt người xem và ở lại như vậy
      tl.to(card, { scale: 1, rotationX: 0, duration: 1.2 }, 5);
      tl.to(".bs-skip", { opacity: 0, duration: 0.4 }, 5);

      tl.timeScale(STORY_SPEED);
    });

    const start = () => {
      if (started || finished) return;
      started = true;
      io.disconnect();
      prevOverflow = html.style.overflow;
      html.style.overflow = "hidden"; // khoá cuộn chỉ trong lúc thiệp đang mở
      // Kéo nhẹ section về sát mép trên khung nhìn
      // (để ngoài gsap.context: revert sẽ kéo trang về lại vị trí cũ)
      const pos = { y: window.scrollY };
      snap = gsap.to(pos, {
        y: window.scrollY + section.getBoundingClientRect().top,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => window.scrollTo({ top: pos.y, behavior: "instant" }),
      });
      tl.play();
      failsafe = setTimeout(finish, (tl.duration() / STORY_SPEED) * 1000 + 2500);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        // Chờ intro album (nếu có) xong rồi mới chạy
        if (e.isIntersecting && e.intersectionRatio >= 0.7 && html.dataset.intro !== "playing") start();
      },
      { threshold: [0.7, 0.85, 1] },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      if (failsafe) clearTimeout(failsafe);
      if (!finished) {
        snap?.kill();
        ctx.revert();
        section.classList.remove("bs-armed");
        if (started) html.style.overflow = prevOverflow;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="cau-chuyen" aria-label="Câu chuyện thương hiệu" className="bs-section bg-paper">
      <Invitation3D />
      <div className="bs-veil" aria-hidden />
      <button type="button" className="bs-skip" onClick={() => skipRef.current()}>
        Skip
      </button>
    </section>
  );
}
