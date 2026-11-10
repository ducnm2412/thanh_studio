import Image from "next/image";
import { services } from "@/lib/data";
import ServicesScroll from "./ServicesScroll";

export default function Services() {
  return (
    <section id="dich-vu" className="bg-cream motion-reduce:py-16 sm:motion-reduce:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Tiêu đề chỉ hiện ở bản tĩnh; bản cuộn video vào thẳng cảnh quay */}
        <div className="sr-only flex-col items-center pb-10 text-center motion-reduce:not-sr-only motion-reduce:flex sm:pb-14">
          <h2 className="font-serif text-4xl font-semibold sm:text-6xl">dịch vụ của chúng tôi</h2>
          <p className="mt-2 text-sm text-muted">Tất cả những gì một đám cưới cần, ở cùng một nơi.</p>
        </div>

        {/* Bản tĩnh cho người tắt hiệu ứng chuyển động */}
        <div className="hidden gap-px overflow-hidden motion-reduce:grid border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.no}
              className={`group relative bg-paper p-6 sm:p-8 ${i === services.length - 1 ? "lg:col-span-1 sm:col-span-2" : ""}`}
            >
              <span className="font-script text-5xl text-gold">{s.no}.</span>
              <div className="relative mt-3 aspect-[4/3] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </article>
          ))}
          <div className="hidden bg-blush/60 p-8 lg:flex lg:flex-col lg:justify-center">
            <p className="font-script text-4xl text-ink">just for you</p>
            <p className="mt-3 font-serif text-xl leading-snug">
              Chưa biết chọn gói nào? Kể cho chúng tôi nghe về ngày cưới của hai bạn.
            </p>
            <a href="#dat-lich" className="eyebrow mt-6 inline-block self-start border-b border-ink pb-1">
              Đặt lịch tư vấn →
            </a>
          </div>
        </div>
      </div>

      {/* Cuộn để video tiến dần, lần lượt hiện từng dịch vụ rồi tới cô dâu chú rể */}
      <div className="motion-reduce:hidden">
        <ServicesScroll />
      </div>
    </section>
  );
}
