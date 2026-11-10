import { gsap, MOTION, MQ } from "./gsapConfig";
import { revealImages } from "./imageReveal";
import { backgroundShift, driftOut, parallax, scaleOnScroll } from "./parallax";
import { countUp, expandDivider, revealUp } from "./scrollReveal";
import { revealLines } from "./textReveal";

/**
 * Hệ chuyển động chung cho mọi section bên dưới Hero. Section chỉ cần gắn thuộc tính lên phần tử:
 *
 *   data-scene            một "cảnh": các phần tử bên trong cùng chạy khi cảnh cuộn tới (chạy một lần)
 *   data-divider          đường kẻ giãn ngang
 *   data-img="left|up…"   ảnh lộ ra bằng mặt nạ
 *   data-lines            tiêu đề hiện từng dòng (dùng <Lines>)
 *   data-reveal           hiện dần, trượt từ dưới lên ("right": từ phải sang)
 *   data-count            con số đếm nhẹ lên giá trị thật
 *   data-parallax="6"     trôi nhẹ theo cuộn (chỉ màn hình rộng)
 *   data-scale-scrub      thu nhẹ khi cuộn tới (chỉ màn hình rộng)
 *   data-exit             trôi nhẹ ra khi section cuộn qua (chỉ màn hình rộng)
 *   data-bg-from / -to    (đặt trên chính section) nền chuyển màu dần
 *
 * Thứ tự trong một cảnh luôn giống nhau: đường kẻ → ảnh → tiêu đề → chữ và chi tiết.
 * Trả về hàm dọn dẹp.
 */
export function applyEditorialMotion(scope: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(MQ.motion, () => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const scenes = Array.from(scope.querySelectorAll<HTMLElement>("[data-scene]"));
    if (scope.hasAttribute("data-scene")) scenes.unshift(scope);

    scenes.forEach((scene) => {
      // Chỉ lấy phần tử thuộc đúng cảnh này, không lấy của cảnh lồng bên trong
      const own = (sel: string) => Array.from(scene.querySelectorAll(sel)).filter((el) => el.closest("[data-scene]") === scene);
      const tl = gsap.timeline({ scrollTrigger: { trigger: scene, start: MOTION.start, once: true } });
      expandDivider(tl, own("[data-divider]"), 0);
      revealImages(tl, own("[data-img]"), 0.05);
      revealLines(tl, own("[data-lines]"), 0.15);
      revealUp(tl, own("[data-reveal]"), 0.3, wide ? 30 : 16);
      countUp(tl, own("[data-count]"), 0.45);
    });

    backgroundShift(scope);
  });

  mm.add(MQ.desktop, () => {
    parallax(Array.from(scope.querySelectorAll("[data-parallax]")));
    scaleOnScroll(Array.from(scope.querySelectorAll("[data-scale-scrub]")));
    driftOut(Array.from(scope.querySelectorAll("[data-exit]")), scope);
  });

  return () => mm.revert();
}
