// ===== Cấu hình intro album cưới =====
// Thay ảnh: chép đè file trong public/images/wedding-intro/ hoặc sửa đường dẫn bên dưới.
// Không cần đụng tới code animation.

/** Khoá sessionStorage: intro chỉ chạy một lần cho mỗi tab trình duyệt */
export const INTRO_KEY = "thanh-studio-intro-completed";
/** Sự kiện phát ra trên window khi intro kết thúc hoặc bị bỏ qua */
export const INTRO_DONE_EVENT = "thanh-intro-done";
/** Tốc độ: 1 = khoảng 8 giây; 1.25 nhanh hơn 25%; 0.8 chậm hơn */
export const INTRO_SPEED = 1;

const dir = "/images/wedding-intro";

export const introAssets = {
  /** Mặt bìa trước, tỉ lệ 3:4 (900×1200) */
  cover: `${dir}/album-cover.webp`,
  /** Vải bọc gáy, bìa sau, mép bìa */
  linen: `${dir}/linen.webp`,
  /** Giấy trang trong */
  paper: `${dir}/paper-texture.webp`,
  /**
   * 5 ảnh cưới theo thứ tự xuất hiện.
   * Ảnh 1–4: khổ dọc, tỉ lệ rộng/cao ≈ 0,725 (800×1103).
   * Ảnh 5: ảnh cuối, sẽ phóng to hết màn hình nên dùng ảnh ngang, rộng ≥ 1920px.
   * `pos` là điểm neo khi ảnh bị cắt (giống CSS background-position).
   */
  photos: [
    { src: `${dir}/wedding-01.webp`, pos: "50% 50%" },
    { src: `${dir}/wedding-02.webp`, pos: "50% 50%" },
    { src: `${dir}/wedding-03.webp`, pos: "50% 50%" },
    { src: `${dir}/wedding-04.webp`, pos: "50% 50%" },
    { src: `${dir}/wedding-05.webp`, pos: "36% 50%" },
  ],
  /**
   * Khớp ảnh cuối với cặp đôi đã tách nền ở Hero (public/hero-couple-2.png) để chuyển cảnh liền mạch:
   * ảnh cuối lớn dần tới đúng vị trí cặp đôi của Hero, rồi nền ảnh tan đi còn cặp đôi đứng yên.
   * Các số là vùng ảnh tách nền nằm trong ảnh gốc, tính bằng pixel của ảnh gốc.
   * Nếu đổi ảnh cuối hoặc ảnh Hero mà hai ảnh không còn là một, đặt `heroMatch: null`
   * (khi đó ảnh cuối sẽ phóng to phủ kín màn hình như bình thường).
   */
  heroMatch: { photoW: 2048, photoH: 1376, x: 552, y: 194, w: 1250, h: 1065 } as
    | { photoW: number; photoH: number; x: number; y: number; w: number; h: number }
    | null,
};
