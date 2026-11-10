import InvitationPanel from "./InvitationPanel";
import { storyAssets } from "./storyConfig";

/**
 * Thiệp cưới gập ba dựng bằng CSS 3D.
 * Khi gập: tấm phải gập vào trước, tấm trái (bìa) gập đè lên trên.
 * Mặc định thiệp mở sẵn và là nội dung của section; các phần tử .bs-rv hiện dần sau khi thiệp mở hết.
 */
export default function Invitation3D() {
  return (
    <div className="bs-scene">
      <div className="bs-card">
        <div className="bs-shadow" aria-hidden />

        {/* Tấm giữa: tiêu đề và ảnh chính */}
        <InvitationPanel side="center">
          <div className="bs-inner">
            <p className="bs-label bs-rv">Câu chuyện thương hiệu</p>
            <h2 className="bs-heading">
              <span className="bs-title bs-rv">Hành trình</span>
              <span className="bs-oflove bs-rv">of love</span>
            </h2>
            <div className="bs-arch">
              <div className="bs-arch-photo" style={{ backgroundImage: `url(${storyAssets.main})` }} />
            </div>
            <p className="bs-label bs-small bs-rv">Thanh Studio Wedding · Huế</p>
          </div>
          <span className="bs-cast bs-cast-l" />
          <span className="bs-cast bs-cast-r" />
        </InvitationPanel>

        {/* Tấm phải */}
        <InvitationPanel side="right" outside={<div className="bs-out-plain"><span /></div>}>
          <div className="bs-inner">
            <p className="bs-label bs-rv">Hành trình</p>
            <p className="bs-serif bs-rv">Cố đô Huế trầm mặc</p>
            <p className="bs-serif bs-rv">Sông Hương lặng sóng</p>
            <p className="bs-serif bs-rv">Biển Lăng Cô lộng gió</p>
            <span className="bs-rule bs-rv" />
            <p className="bs-label bs-rv">Trọn vẹn</p>
            <p className="bs-serif bs-rv">Chụp ảnh · Trang điểm</p>
            <p className="bs-serif bs-rv">Váy cưới · Ngày trọng đại</p>
          </div>
        </InvitationPanel>

        {/* Tấm trái: mặt ngoài là bìa thiệp */}
        <InvitationPanel
          side="left"
          outside={
            <div className="bs-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={storyAssets.ornament} alt="" />
              <p className="bs-cover-name">Thanh Studio</p>
              <span className="bs-rule" />
              <p className="bs-cover-sub">Hành trình <em>of love</em></p>
              <p className="bs-label bs-small">Wedding · Huế</p>
            </div>
          }
        >
          <div className="bs-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bs-ornament bs-rv" src={storyAssets.ornament} alt="" />
            <p className="bs-label bs-rv">Niềm tin</p>
            <p className="bs-quote bs-rv">&ldquo;Làm cho đúng, cho đủ tình&rdquo;</p>
            <span className="bs-rule bs-rv" />
            <p className="bs-serif bs-rv">
              Mỗi chuyện tình đều đẹp,
              <br />
              nhưng chuyện của bạn là duy nhất.
            </p>
          </div>
        </InvitationPanel>
      </div>
    </div>
  );
}
