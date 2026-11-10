import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Đăng ký plugin một lần cho cả trang
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Thông số chuyển động dùng chung cho mọi section – đổi ở đây là đổi toàn trang */
export const MOTION = {
  ease: "power3.out",
  duration: 1,
  stagger: 0.1,
  /** Section bắt đầu hiệu ứng khi mép trên của nó lên tới 78% chiều cao khung nhìn */
  start: "top 78%",
};

/** Chỉ chạy chuyển động khi người xem không bật "giảm chuyển động" */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
};

export { gsap, ScrollTrigger };
