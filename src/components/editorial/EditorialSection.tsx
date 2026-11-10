"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { applyEditorialMotion } from "@/animations/editorial";

type Props = HTMLAttributes<HTMLElement> & { as?: "section" | "footer"; children: ReactNode };

/** Khung section dùng chung: gắn hệ chuyển động editorial cho mọi phần tử có data-* bên trong */
export default function EditorialSection({ as: Tag = "section", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return applyEditorialMotion(ref.current);
  }, []);

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}

/** Tiêu đề nhiều dòng; mỗi dòng trồi lên riêng khi section cuộn tới */
export function Lines({ lines }: { lines: string[] }) {
  return (
    <span data-lines className="block">
      {lines.map((l) => (
        <span key={l} className="ln">
          <span>{l}</span>
        </span>
      ))}
    </span>
  );
}

/** Phần mở đầu thống nhất của mọi section: đường kẻ, nhãn nhỏ tiếng Anh, tiêu đề serif lớn */
export function SectionHeading({ eyebrow, lines, note, dark }: { eyebrow: string; lines: string[]; note?: ReactNode; dark?: boolean }) {
  return (
    <header data-scene>
      <span data-divider className={`block h-px w-full ${dark ? "bg-paper/25" : "bg-line"}`} />
      <div className="mt-5 grid gap-3 sm:mt-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6">
        <div>
          <p data-reveal className="eyebrow text-gold">{eyebrow}</p>
          <h2 className="mt-2 whitespace-nowrap font-display text-[1.5rem] font-medium uppercase leading-[1.04] tracking-[0.04em] min-[420px]:text-3xl sm:mt-3 sm:text-5xl lg:text-6xl">
            <Lines lines={lines} />
          </h2>
        </div>
        {note && (
          <div data-reveal className={`max-w-xs text-sm leading-relaxed lg:pb-2 lg:text-right ${dark ? "text-paper" : "text-muted"}`}>
            {note}
          </div>
        )}
      </div>
    </header>
  );
}
