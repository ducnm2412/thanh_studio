import { introAssets } from "./introAssets";

export type PageContent =
  | { kind: "title" }
  | { kind: "quote" }
  | { kind: "photo"; index: number };

/** Bề mặt một trang giấy: `side` cho biết trang nằm bên trái hay phải gáy sách */
export function PageSurface({ content, side, final }: { content: PageContent; side: "left" | "right"; final?: boolean }) {
  return (
    <div className={`wi-pg wi-pg-${side}`} style={{ backgroundImage: `url(${introAssets.paper})` }}>
      {content.kind === "photo" && (
        <div
          className="wi-photo"
          data-final={final ? "" : undefined}
          style={{
            backgroundImage: `url(${introAssets.photos[content.index].src})`,
            backgroundPosition: introAssets.photos[content.index].pos,
          }}
        />
      )}
      {content.kind === "title" && (
        <div className="wi-titlepage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" />
          <p className="wi-tp-name">THANH STUDIO</p>
          <p className="wi-tp-sub">Wedding Collection</p>
          <span className="wi-tp-rule" />
          <p className="wi-tp-city">Huế</p>
        </div>
      )}
      {content.kind === "quote" && (
        <div className="wi-titlepage">
          <p className="wi-tp-quote">
            Làm cho đúng,
            <br />
            cho đủ tình.
          </p>
        </div>
      )}
    </div>
  );
}

/** Số dải dọc của một tờ giấy – các dải lồng nhau để tờ giấy cong được khi lật */
const SEGS = 6;

function Segment({ i, front, back, leaf }: { i: number; front: PageContent; back: PageContent; leaf?: number }) {
  return (
    <div className={i === 0 ? "wi-seg wi-leaf" : "wi-seg wi-seg-child"} data-leaf={i === 0 ? leaf : undefined}>
      <div className="wi-face">
        <div className="wi-slice" style={{ left: `calc(var(--W) / ${SEGS} * ${-i})` }}>
          <PageSurface content={front} side="right" />
        </div>
      </div>
      <div className="wi-face wi-face-back">
        <div className="wi-slice" style={{ left: `calc(var(--W) / ${SEGS} * ${-(SEGS - 1 - i)})` }}>
          <PageSurface content={back} side="left" />
        </div>
      </div>
      {i < SEGS - 1 && <Segment i={i + 1} front={front} back={back} />}
    </div>
  );
}

/** Một tờ giấy lật được: mặt trước là trang phải, mặt sau là trang trái sau khi lật */
export default function AlbumPage({ index, front, back }: { index: number; front: PageContent; back: PageContent }) {
  return <Segment i={0} leaf={index} front={front} back={back} />;
}
