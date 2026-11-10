import { MOTION } from "./gsapConfig";

/**
 * Hiện dần + trượt nhẹ. `data-reveal="right"` thì trượt vào từ bên phải, còn lại trượt từ dưới lên.
 * `distance` nhỏ hơn trên điện thoại.
 */
export function revealUp(tl: gsap.core.Timeline, els: Element[], at: number, distance: number) {
  if (!els.length) return;
  const fromRight = els.filter((e) => e.getAttribute("data-reveal") === "right");
  const fromBelow = els.filter((e) => e.getAttribute("data-reveal") !== "right");
  if (fromBelow.length)
    tl.from(fromBelow, { opacity: 0, y: distance, duration: MOTION.duration * 0.9, stagger: MOTION.stagger * 0.9, ease: MOTION.ease }, at);
  if (fromRight.length)
    tl.from(fromRight, { opacity: 0, x: distance * 1.6, duration: MOTION.duration * 1.1, stagger: MOTION.stagger, ease: MOTION.ease }, at);
}

/** Đường kẻ mảnh giãn ra theo chiều ngang */
export function expandDivider(tl: gsap.core.Timeline, els: Element[], at: number) {
  if (!els.length) return;
  tl.from(els, { scaleX: 0, transformOrigin: "left center", duration: MOTION.duration * 1.2, ease: "power2.inOut" }, at);
}

/** Giá tiền đếm nhẹ lên tới con số thật (`data-count`, nội dung dạng "6.900.000") */
export function countUp(tl: gsap.core.Timeline, els: Element[], at: number) {
  els.forEach((el) => {
    const final = el.textContent ?? "";
    const target = Number(final.replace(/\D/g, ""));
    if (!target) return;
    const state = { v: target * 0.7 };
    tl.to(
      state,
      {
        v: target,
        duration: MOTION.duration * 1.5,
        ease: "power2.out",
        onUpdate: () => { el.textContent = (Math.round(state.v / 100000) * 100000).toLocaleString("vi-VN"); },
        onComplete: () => { el.textContent = final; },
      },
      at,
    );
  });
}
