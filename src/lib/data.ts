export const studio = {
  name: "Thanh Studio Wedding",
  city: "Huế",
  slogan: "Làm cho đúng, cho đủ tình",
  bio: "Ảnh cưới chuyên nghiệp – make up thời thượng – lưu giữ khoảnh khắc",
  phone: "0905661736",
  phoneDisplay: "0905 661 736",
  email: "thanhstudio121dn@gmail.com",
  facebook: "https://www.facebook.com/thanh.studiowedding",
  messenger: "https://m.me/thanh.studiowedding",
  zalo: "https://zalo.me/0905661736",
  mapsLink: "https://maps.app.goo.gl/nyuKuRj85g3ExT2f7",
};

// Studio chỉ có một cơ sở tại Huế
export const location = {
  name: "Thanh Studio Wedding – Huế",
  address: "Lô CM4, căn 08, Lê Đức Anh, KĐT Ecogarden, TP Huế",
  hours: "Luôn mở cửa",
  map: "https://www.google.com/maps?q=KĐT+Ecogarden+Lê+Đức+Anh+Vỹ+Dạ+Huế&output=embed",
  link: "https://maps.app.goo.gl/nyuKuRj85g3ExT2f7",
};

export const p = (n: number) => `/photos/${String(n).padStart(2, "0")}.jpg`;

export const heroSlides = [
  { src: p(7), caption: "Sông Hương, Huế" },
  { src: p(26), caption: "Bờ biển Lăng Cô" },
  { src: p(30), caption: "Rừng thông" },
  { src: p(20), caption: "Phim trường cổ điển" },
  { src: p(14), caption: "Chùa Thiên Mụ, Huế" },
];

export const services = [
  {
    no: "01",
    title: "Chụp ảnh cưới pre-wedding",
    desc: "Huế, Lăng Cô, Đà Nẵng và phim trường. Chụp chậm, theo đúng câu chuyện của hai bạn.",
    img: p(5),
  },
  {
    no: "02",
    title: "Chụp & quay phóng sự ngày cưới",
    desc: "Ghi lại trọn vẹn lễ gia tiên, lễ rước dâu và tiệc cưới bằng ảnh và phim.",
    img: p(3),
  },
  {
    no: "03",
    title: "Trang điểm cô dâu",
    desc: "Make up thời thượng, nhẹ nhàng, giữ nét tự nhiên suốt cả ngày dài.",
    img: p(1),
  },
  {
    no: "04",
    title: "Váy cưới, áo dài, vest",
    desc: "Bộ sưu tập váy cưới, áo dài truyền thống và vest chú rể cho thuê.",
    img: p(15),
  },
  {
    no: "05",
    title: "Combo trọn gói",
    desc: "Chụp + make up + váy. Một đầu mối lo hết, hai bạn chỉ cần yêu nhau.",
    img: p(37),
  },
];

export type Album = {
  key: string;
  title: string;
  note: string;
  photos: number[];
  cover: string; // ảnh đã tách nền làm nhân vật chính
  bg: number; // ảnh làm nền (làm mờ)
  tint: string; // màu phủ theo tông ảnh, dạng "r g b"
  mono?: boolean;
  tagline: string;
  desc: string;
};

export const albums: Album[] = [
  { key: "hue", title: "Cố đô Huế", note: "Lăng tẩm, vườn xưa, áo dài đỏ", photos: [1, 4, 5, 6, 8, 14],
    bg: 8,
    tint: "92 62 48",
    cover: "/cutouts/01.png",
    tagline: "Huế dịu dàng trong tà áo đỏ",
    desc: "Lăng tẩm rêu phong, cầu gỗ và những tà áo dài đỏ – một bộ ảnh mang trọn vẻ trầm mặc, thanh lịch của cố đô.",
  },
  { key: "song-huong", title: "Sông Hương", note: "Thuyền rồng, mặt nước buổi sớm", photos: [7, 13, 11],
    bg: 13,
    tint: "88 96 104",
    cover: "/cutouts/11.png",
    tagline: "Lặng như mặt nước sông Hương",
    desc: "Ngồi thuyền xuôi dòng Hương lúc sớm mai, khi mặt nước phẳng lặng và ánh sáng mềm nhất trong ngày.",
  },
  { key: "lang-co", title: "Lăng Cô – biển", note: "Đá, sóng và hoàng hôn", photos: [26, 27, 28, 29, 40, 41],
    bg: 27,
    tint: "150 104 78",
    cover: "/cutouts/26-soft.png", // khăn voan tràn khỏi khung ảnh gốc → làm mờ dần mép trái
    tagline: "Gió biển, đá và hoàng hôn",
    desc: "Vịnh Lăng Cô lúc hoàng hôn – sóng vỗ ghềnh đá, váy cưới bay trong gió và bầu trời rực nắng cuối ngày.",
  },
  { key: "rung-thong", title: "Rừng thông", note: "Ánh nắng xuyên tán lá", photos: [24, 25, 30, 31, 32, 33, 34, 35, 37, 38],
    bg: 33,
    tint: "58 78 52",
    cover: "/cutouts/35.png",
    tagline: "Nắng xuyên qua tán thông",
    desc: "Rừng thông xanh mướt, ánh nắng lọc qua tán lá – khung cảnh cổ tích cho những cặp đôi yêu thiên nhiên.",
  },
  { key: "phim-truong", title: "Phim trường", note: "Cổ điển, sang trọng, ấm áp", photos: [0, 2, 3, 10, 12, 15, 16, 20, 21, 23],
    bg: 20,
    tint: "110 78 46",
    cover: "/cutouts/21.png",
    tagline: "Cổ điển, sang trọng, ấm áp",
    desc: "Không gian phim trường mang hơi hướng cổ điển châu Âu, chụp được mọi thời tiết, ánh sáng luôn chuẩn.",
  },
  { key: "editorial", title: "Đen trắng", note: "Bố cục kiểu tạp chí", photos: [9, 17, 18, 19, 22, 36, 39],
    bg: 25,
    tint: "70 70 70",
    mono: true,
    cover: "/cutouts/32.png",
    tagline: "Đen trắng là ngôn ngữ của cảm xúc",
    desc: "Bỏ đi màu sắc để chỉ còn ánh nhìn, cái chạm tay – những khung hình kiểu tạp chí, vượt thời gian.",
  },
];

// Giá tham khảo dựng cho bản demo – cần khách xác nhận
export const packages = [
  {
    name: "Pre-wedding Huế",
    price: "6.900.000",
    img: p(6),
    items: ["1 bối cảnh nội thành Huế", "2 váy cưới + 1 áo dài", "Make up cô dâu", "30 ảnh chỉnh sửa", "1 ảnh phóng 60×90"],
  },
  {
    name: "Pre-wedding Lăng Cô",
    price: "9.900.000",
    img: p(29),
    items: ["Biển Lăng Cô + rừng thông", "3 váy cưới + 1 vest", "Make up 2 lần thay đổi", "45 ảnh chỉnh sửa", "Album 25×35 cm"],
  },
  {
    name: "Combo trọn gói",
    price: "18.900.000",
    img: p(37),
    featured: true,
    items: ["Pre-wedding 2 bối cảnh", "Phóng sự ngày cưới (chụp + quay)", "Make up cô dâu ngày cưới", "Váy cưới, áo dài, vest", "Album + phim highlight 3–5 phút"],
  },
  {
    name: "Phóng sự ngày cưới",
    price: "5.500.000",
    img: p(3),
    items: ["1 thợ chụp + 1 thợ quay", "Lễ gia tiên & tiệc cưới", "Toàn bộ file gốc", "Phim highlight 3 phút"],
  },
];

// Cảm nhận mẫu – thay bằng đánh giá thật từ fanpage khi khách cho phép
export const testimonials = [
  {
    quote: "Ekip chụp rất chậm rãi, hướng dẫn tạo dáng nhẹ nhàng. Bộ ảnh ở Lăng Cô đẹp hơn mong đợi.",
    who: "Cặp đôi ở Đà Nẵng",
    img: p(27),
  },
  {
    quote: "Làm combo nên mọi thứ gọn gàng, từ váy, make up đến ngày cưới đều một đầu mối lo.",
    who: "Cặp đôi ở Huế",
    img: p(21),
  },
  {
    quote: "Ở xa về Huế chụp chỉ hai ngày, studio lên lịch kỹ nên không bị vội.",
    who: "Cặp đôi ở TP.HCM",
    img: p(6),
  },
];
