import AlbumPage, { PageSurface, type PageContent } from "./AlbumPage";
import { introAssets } from "./introAssets";

// Các tờ giấy theo thứ tự lật. Trang nền (bên phải, dưới cùng) là ảnh cuối.
const leaves: { front: PageContent; back: PageContent }[] = [
  { front: { kind: "title" }, back: { kind: "quote" } },
  { front: { kind: "photo", index: 0 }, back: { kind: "photo", index: 1 } },
  { front: { kind: "photo", index: 2 }, back: { kind: "photo", index: 3 } },
];
const lastPage: PageContent = { kind: "photo", index: 4 };

/** Cuốn album dựng bằng các lớp CSS 3D: bìa sau, ruột giấy, gáy, bìa trước, các tờ lật */
export default function Album3D() {
  const linen = { backgroundImage: `url(${introAssets.linen})` };
  return (
    <div className="wi-cam">
      <div className="wi-book">
        <div className="wi-shadow" />
        <div className="wi-shadow wi-shadow-l" />

        {/* Bìa sau */}
        <div className="wi-back" style={linen}>
          <div className="wi-edge-b wi-board" style={linen} />
          <div className="wi-edge-r wi-board" style={linen} />
        </div>

        {/* Ruột giấy: mặt trên là trang cuối, quanh là mép giấy */}
        <div className="wi-block">
          <div className="wi-face">
            <PageSurface content={lastPage} side="right" final />
          </div>
          <div className="wi-cast" />
          <div className="wi-edge-b wi-paper-b" />
          <div className="wi-edge-r wi-paper-r" />
          <div className="wi-edge-l wi-paper-l" />
        </div>

        {/* Các tờ giấy lật */}
        {leaves.map((l, i) => (
          <AlbumPage key={i} index={i} front={l.front} back={l.back} />
        ))}

        {/* Gáy + bìa trước: bìa gắn vào đỉnh gáy, gáy xoay quanh mép dưới */}
        <div className="wi-spine-g">
          <div className="wi-spine">
            <div className="wi-spine-out" style={linen} />
            <div className="wi-spine-in" />
          </div>
          <div className="wi-cover-w">
            <div className="wi-cover">
              <div className="wi-cover-front" style={{ backgroundImage: `url(${introAssets.cover})` }}>
                <div className="wi-cover-title">
                  <p>THANH STUDIO</p>
                  <span />
                  <p>WEDDING COLLECTION</p>
                </div>
                <div className="wi-edge-b wi-board" style={linen} />
                <div className="wi-edge-r wi-board" style={linen} />
              </div>
              <div className="wi-cover-in" style={linen}>
                <div style={{ backgroundImage: `url(${introAssets.paper})` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
