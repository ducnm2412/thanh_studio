import type { ReactNode } from "react";
import { storyAssets } from "./storyConfig";

type Props = {
  side: "left" | "center" | "right";
  /** Mặt trong – nhìn thấy khi thiệp đã mở */
  children: ReactNode;
  /** Mặt ngoài – nhìn thấy khi tấm này còn gập lại */
  outside?: ReactNode;
};

/** Một tấm của thiệp gập ba. Mỗi tấm là phần tử riêng, tự xoay quanh nếp gập của nó. */
export default function InvitationPanel({ side, children, outside }: Props) {
  const paper = { backgroundImage: `url(${storyAssets.paper})` };
  return (
    <div className={`bs-panel bs-${side}`}>
      <div className="bs-face bs-face-in" style={paper}>
        {children}
        <span className="bs-fold" />
        <span className="bs-shade" />
      </div>
      {outside !== undefined && (
        <div className="bs-face bs-face-out" style={paper} aria-hidden>
          {outside}
        </div>
      )}
    </div>
  );
}
