import { MOTION } from "./gsapConfig";

/**
 * Tiêu đề hiện từng dòng: mỗi dòng trồi lên từ dưới mép che của nó.
 * Dùng với component <Lines> (mỗi dòng là .ln > span).
 */
export function revealLines(tl: gsap.core.Timeline, els: Element[], at: number) {
  const lines = els.flatMap((el) => Array.from(el.querySelectorAll(".ln > span")));
  if (!lines.length) return;
  tl.from(lines, { yPercent: 115, duration: MOTION.duration, stagger: MOTION.stagger * 1.2, ease: MOTION.ease }, at);
}
