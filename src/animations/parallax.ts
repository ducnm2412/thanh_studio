import { gsap } from "./gsapConfig";

/** Ảnh trôi rất nhẹ theo cuộn. `data-parallax="6"` = lệch tối đa ±6% chiều cao của chính nó. */
export function parallax(els: Element[]) {
  els.forEach((el) => {
    const amount = Number(el.getAttribute("data-parallax")) || 6;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });
}

/** Ảnh thu nhẹ về đúng cỡ khi cuộn tới (`data-scale-scrub`) */
export function scaleOnScroll(els: Element[]) {
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 1.14 },
      { scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom 60%", scrub: true } },
    );
  });
}

/** Khối trôi nhẹ ra khi section sắp cuộn qua (`data-exit`) */
export function driftOut(els: Element[], scope: Element) {
  els.forEach((el) => {
    gsap.fromTo(el, { y: 0 }, { y: -36, ease: "none", scrollTrigger: { trigger: scope, start: "bottom 70%", end: "bottom top", scrub: true } });
  });
}

/** Nền của section chuyển dần sang màu khác khi cuộn tới (`data-bg-from` / `data-bg-to`) */
export function backgroundShift(scope: HTMLElement) {
  const from = scope.getAttribute("data-bg-from");
  const to = scope.getAttribute("data-bg-to");
  if (!from || !to) return;
  gsap.fromTo(
    scope,
    { backgroundColor: from },
    { backgroundColor: to, ease: "none", scrollTrigger: { trigger: scope, start: "top 98%", end: "top 55%", scrub: true } },
  );
}
