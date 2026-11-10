import IntroOverlay from "./IntroOverlay";
import { INTRO_KEY } from "./introAssets";
import "./WeddingIntro.css";

// Chạy đồng bộ trước lần vẽ đầu tiên: nếu intro đã xem trong tab này (hoặc không nên chạy)
// thì ẩn lớp phủ ngay, không bị nháy. Thêm ?intro=1 vào URL để xem lại.
const boot = `(function(){var d=document.documentElement;try{var k=${JSON.stringify(INTRO_KEY)};if(/[?&]intro=1/.test(location.search))sessionStorage.removeItem(k);d.dataset.intro=(sessionStorage.getItem(k)||matchMedia("(prefers-reduced-motion: reduce)").matches)?"done":"playing"}catch(e){d.dataset.intro="done"}})()`;

/** Intro mở album cưới – lớp phủ lên trang chủ, không thay thế trang chủ */
export default function WeddingIntro() {
  return (
    <>
      {/* type đổi sang text/plain ở phía client để React không cảnh báo; script chỉ cần chạy lúc trình duyệt đọc HTML */}
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: boot }}
      />
      <noscript>
        <style>{`.wi-root{display:none}`}</style>
      </noscript>
      <IntroOverlay />
    </>
  );
}
