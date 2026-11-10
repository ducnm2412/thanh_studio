import Image from "next/image";
import { packages } from "@/lib/data";
import EditorialSection, { Lines } from "./editorial/EditorialSection";

// Hai ảnh trang trí phủ gần hết nền, chỉ mờ dần vào nhau ở một dải hẹp giữa trang
const fadeRight = "[mask-image:linear-gradient(to_right,#000_45%,transparent)]";
const fadeLeft = "[mask-image:linear-gradient(to_left,#000_45%,transparent)]";
const wash = "object-cover opacity-[0.72] mix-blend-multiply grayscale sepia contrast-125";

export default function Pricing() {
  return (
    <EditorialSection id="bang-gia" className="relative overflow-hidden bg-[#d6b77c] py-16 sm:py-20 lg:py-24">
      {/* Hai mảng ảnh Huế nhạt màu ở hai bên, như hình in chìm trên giấy */}
      <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] sm:block ${fadeRight}`}>
        <Image src="/images/pricing/hue-branches.webp" alt="" fill sizes="46vw" className={`${wash} object-left-top`} />
      </div>
      <div aria-hidden className={`pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] sm:block ${fadeLeft}`}>
        <Image src="/images/pricing/hue-gate-dusk.webp" alt="" fill sizes="46vw" className={`${wash} object-[70%_60%]`} />
      </div>

      {/* Nắng vàng chiếu từ trên xuống trên nền vàng đất cổ kính; bốn góc sậm lại như giấy cũ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% -12%, rgba(240,208,140,0.4) 0%, rgba(226,184,104,0.18) 36%, transparent 70%), radial-gradient(ellipse 120% 100% at 50% 45%, transparent 52%, rgba(74,44,14,0.5) 100%), linear-gradient(to bottom, transparent 50%, rgba(96,60,20,0.32))",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Tiêu đề bên trái, đường kẻ mảnh chạy hết phần còn lại */}
        <header data-scene className="flex items-end gap-6 sm:gap-10 [text-shadow:0_0_6px_rgba(255,238,196,1),0_0_18px_rgba(255,238,196,0.95),0_0_34px_rgba(255,238,196,0.8)]">
          <div className="shrink-0">
            <p data-reveal className="eyebrow !text-[11px] text-[#4a2c0c]">The Wedding Experience</p>
            <h2 className="mt-2 font-display text-4xl font-semibold uppercase tracking-[0.06em] text-[#3a2410] sm:text-5xl">
              <Lines lines={["Bảng giá dịch vụ"]} />
            </h2>
          </div>
          <span data-divider className="mb-6 hidden h-[2px] flex-1 bg-gradient-to-r from-[#8a5a1e] to-[#8a5a1e]/0 sm:block" />
        </header>

        {/* Bốn gói trên một hàng; gói nổi bật nền charcoal và nhô cao hơn */}
        <div data-scene className="mt-8 grid grid-cols-2 items-start gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {packages.map((pk) => (
            <article
              key={pk.name}
              className={`group ${
                pk.featured
                  ? "bg-ink p-3 text-paper shadow-[0_34px_64px_-20px_rgba(40,25,8,0.9)] ring-1 ring-[#d9a94e] lg:-my-4 lg:p-4"
                  : "border border-[#a9792f]/60 bg-[#fffaf0] p-2.5 shadow-[0_24px_46px_-22px_rgba(70,42,12,0.75)]"
              }`}
            >
              <div data-img="up" className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pk.img}
                  alt={`Ảnh minh hoạ gói ${pk.name}`}
                  fill
                  sizes="(min-width:1024px) 300px, 45vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div data-reveal className={pk.featured ? "px-2 pb-3 pt-5 lg:pb-5 lg:pt-7" : "px-2 pb-3 pt-5"}>
                <h3 className="text-base font-medium leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-lg">
                  {pk.name}
                </h3>
                <p className={`mt-3 text-2xl font-semibold leading-none tracking-tight sm:text-[1.75rem] ${pk.featured ? "text-[#e6bb62]" : "text-[#3a2410]"}`}>
                  <span data-count>{pk.price}</span>đ
                </p>

                <a
                  href="#dat-lich"
                  className={`mt-5 block border py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                    pk.featured ? "border-paper bg-paper text-ink hover:bg-transparent hover:text-paper" : "border-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  Gửi yêu cầu
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-semibold text-[#3a2410] [text-shadow:0_0_6px_rgba(255,238,196,1),0_0_18px_rgba(255,238,196,0.95),0_0_34px_rgba(255,238,196,0.8)] lg:mt-12">
          Giá tham khảo, có thể thay đổi theo mùa cưới và bối cảnh. Liên hệ để nhận báo giá chi tiết.
        </p>
      </div>
    </EditorialSection>
  );
}
