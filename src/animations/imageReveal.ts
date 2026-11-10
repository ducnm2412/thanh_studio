import { MOTION } from "./gsapConfig";

const FROM: Record<string, string> = {
  left: "inset(0% 100% 0% 0%)", // mở từ trái sang phải
  right: "inset(0% 0% 0% 100%)",
  up: "inset(100% 0% 0% 0%)", // mở từ dưới lên
  down: "inset(0% 0% 100% 0%)",
};

/** Ảnh lộ ra bằng mặt nạ clip-path; hướng lấy từ `data-img="left|right|up|down"` */
export function revealImages(tl: gsap.core.Timeline, els: Element[], at: number) {
  els.forEach((el, i) => {
    const dir = el.getAttribute("data-img") || "up";
    tl.fromTo(
      el,
      { clipPath: FROM[dir] ?? FROM.up },
      { clipPath: "inset(0% 0% 0% 0%)", duration: MOTION.duration * 1.2, ease: "power3.inOut" },
      at + i * MOTION.stagger * 1.2,
    );
  });
}
