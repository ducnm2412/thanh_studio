// ===== Cấu hình hiệu ứng mở thiệp ở section "Câu chuyện thương hiệu" =====

/**
 * Khi nào chạy hiệu ứng mở thiệp:
 * - "inview": khi người xem cuộn tới section
 * - "off": không chạy, hiện thẳng nội dung
 */
export const STORY_TRIGGER: "inview" | "off" = "inview";
/** true: mỗi tab trình duyệt chỉ chạy một lần (thêm ?story=1 vào URL để xem lại). false: lần tải trang nào cũng chạy. */
export const STORY_ONCE_PER_TAB = false;
export const STORY_KEY = "thanh-studio-story-opened";
/** Tốc độ: 1 ≈ 6 giây; 1.25 nhanh hơn 25% */
export const STORY_SPEED = 1;

export const storyAssets = {
  /** Ảnh chính nằm trong khung vòm ở tấm giữa của thiệp. Khổ dọc. */
  main: "/photos/05.jpg",
  paper: "/images/wedding-intro/paper-texture.webp",
  ornament: "/logo-mark-gold.png",
};
