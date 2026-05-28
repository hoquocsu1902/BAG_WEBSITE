// ===== DỮ LIỆU SẢN PHẨM =====
const products = [
  {
    id: 1,
    name: "Túi Tote Aqua Campus",
    category: "tote",
    price: 350000,
    oldPrice: 420000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1713425886695-7772d1498b11?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi tote form rộng, phối gradient xanh HUIT, phù hợp đi học, đi làm và mang tài liệu hằng ngày.",
    material: "Canvas phủ chống thấm",
    color: "Aqua/Kem",
    size: "38 x 32 cm",
    stock: 18,
    rating: 4.8,
    isFeatured: true,
    isNew: true
  },
  {
    id: 2,
    name: "Túi Đeo Chéo Pearl Mini",
    category: "crossbody",
    price: 520000,
    oldPrice: 680000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1691480150204-66dd1eb77391?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi đeo chéo mini nhỏ gọn, màu xanh ngọc nhẹ, dây đeo điều chỉnh được, hợp đi chơi và cafe.",
    material: "Da PU mềm",
    color: "Xanh ngọc",
    size: "20 x 14 cm",
    stock: 12,
    rating: 4.7,
    isFeatured: true,
    isNew: false
  },
  {
    id: 3,
    name: "Túi Công Sở Azure Pro",
    category: "office",
    price: 890000,
    oldPrice: 1100000,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1612902456551-b8e586e516af?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1743324690280-62c0699f46d2?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi công sở dáng đứng, có ngăn laptop 13 inch, quai xách chắc chắn và phong cách xanh navy thanh lịch.",
    material: "Da PU cao cấp",
    color: "Navy/Aqua",
    size: "39 x 29 cm",
    stock: 7,
    rating: 4.9,
    isFeatured: true,
    isNew: false
  },
  {
    id: 4,
    name: "Clutch Crystal Night",
    category: "clutch",
    price: 280000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1566150902887-9679ecc155ba?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566150902887-9679ecc155ba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596149615176-50ced4d6b3b3?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Clutch dự tiệc ánh xanh pha trắng, kiểu dáng nhỏ gọn, tạo điểm nhấn cho đầm tối màu.",
    material: "Satin ánh kim",
    color: "Aqua bạc",
    size: "24 x 13 cm",
    stock: 16,
    rating: 4.6,
    isFeatured: false,
    isNew: true
  },
  {
    id: 5,
    name: "Balo Mini Sky Lite",
    category: "backpack",
    price: 450000,
    oldPrice: 550000,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Balo mini trẻ trung, chống thấm nhẹ, phù hợp đi học, dạo phố và du lịch ngắn ngày.",
    material: "Vải dù chống thấm",
    color: "Sky blue",
    size: "28 x 23 cm",
    stock: 20,
    rating: 4.5,
    isFeatured: false,
    isNew: true
  },
  {
    id: 6,
    name: "Túi Tote Wave Summer",
    category: "tote",
    price: 290000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi tote phong cách mùa hè, nhẹ, rộng và dễ phối với outfit xanh-trắng.",
    material: "Cotton canvas",
    color: "Xanh/Trắng",
    size: "36 x 31 cm",
    stock: 22,
    rating: 4.4,
    isFeatured: false,
    isNew: false
  },
  {
    id: 7,
    name: "Túi Đeo Chéo Chain Cyan",
    category: "crossbody",
    price: 680000,
    oldPrice: 850000,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1691480150204-66dd1eb77391?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi đeo chéo dây xích thanh lịch, điểm nhấn kim loại bạc, hợp đi làm lẫn đi tiệc nhẹ.",
    material: "Da PU + xích hợp kim",
    color: "Xanh navy",
    size: "22 x 15 cm",
    stock: 9,
    rating: 4.8,
    isFeatured: true,
    isNew: false
  },
  {
    id: 8,
    name: "Clutch Aurora Blue",
    category: "clutch",
    price: 320000,
    oldPrice: 380000,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566150902887-9679ecc155ba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Clutch màu xanh cực nhạt, phù hợp tiệc sinh nhật, tiệc cưới và các set đồ nữ tính.",
    material: "Satin mềm",
    color: "Xanh băng",
    size: "25 x 14 cm",
    stock: 15,
    rating: 4.6,
    isFeatured: false,
    isNew: true
  },
  {
    id: 9,
    name: "Túi Công Sở Structure Navy",
    category: "office",
    price: 750000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1612902456551-b8e586e516af?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612902456551-b8e586e516af?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1743324690280-62c0699f46d2?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi công sở form cứng, giữ dáng tốt, tông xanh navy chuyên nghiệp.",
    material: "Da tổng hợp cao cấp",
    color: "Navy",
    size: "37 x 27 cm",
    stock: 10,
    rating: 4.7,
    isFeatured: false,
    isNew: false
  },
  {
    id: 10,
    name: "Balo Mini Cloud",
    category: "backpack",
    price: 620000,
    oldPrice: 780000,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Balo mini phối xanh mây, nhiều ngăn phụ, chống nhăn và phù hợp di chuyển hằng ngày.",
    material: "Da PU mềm",
    color: "Xanh mây",
    size: "29 x 24 cm",
    stock: 11,
    rating: 4.7,
    isFeatured: true,
    isNew: false
  },
  {
    id: 11,
    name: "Túi Tote Linen Ocean",
    category: "tote",
    price: 310000,
    oldPrice: 370000,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1713425886695-7772d1498b11?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi tote vải lanh phối xanh biển, thân thiện môi trường và dễ tái sử dụng.",
    material: "Vải lanh",
    color: "Ocean linen",
    size: "39 x 33 cm",
    stock: 28,
    rating: 4.3,
    isFeatured: false,
    isNew: false
  },
  {
    id: 12,
    name: "Clutch Silver Aqua",
    category: "clutch",
    price: 350000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566150902887-9679ecc155ba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Clutch bạc ánh xanh sang trọng, dễ phối với trang phục tối màu hoặc váy trắng.",
    material: "Vải metallic",
    color: "Bạc aqua",
    size: "25 x 14 cm",
    stock: 14,
    rating: 4.5,
    isFeatured: false,
    isNew: true
  },
  {
    id: 13,
    name: "Túi Vai Moonlight",
    category: "crossbody",
    price: 590000,
    oldPrice: 720000,
    image: "https://images.unsplash.com/photo-1691480150204-66dd1eb77391?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1691480150204-66dd1eb77391?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi vai dáng mềm, quai đeo ngắn, hợp phong cách tối giản khi đi làm hoặc gặp bạn bè.",
    material: "Da PU hạt",
    color: "Xanh trăng",
    size: "27 x 18 cm",
    stock: 13,
    rating: 4.6,
    isFeatured: true,
    isNew: true
  },
  {
    id: 14,
    name: "Túi Tote HUIT Signature",
    category: "tote",
    price: 430000,
    oldPrice: 520000,
    image: "https://images.unsplash.com/photo-1713425886695-7772d1498b11?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1713425886695-7772d1498b11?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Dòng tote signature của HUIT với phối màu #99FFFF, quai dày và đường may nổi.",
    material: "Canvas dày",
    color: "HUIT cyan",
    size: "40 x 34 cm",
    stock: 19,
    rating: 4.9,
    isFeatured: true,
    isNew: true
  },
  {
    id: 15,
    name: "Túi Công Sở Laptop 13",
    category: "office",
    price: 980000,
    oldPrice: 1250000,
    image: "https://images.unsplash.com/photo-1743324690280-62c0699f46d2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1743324690280-62c0699f46d2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1612902456551-b8e586e516af?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Túi công sở có ngăn laptop, ngăn phụ đựng sạc, chuột và tài liệu A4.",
    material: "Da microfiber",
    color: "Deep aqua",
    size: "40 x 30 cm",
    stock: 6,
    rating: 4.9,
    isFeatured: true,
    isNew: true
  },
  {
    id: 16,
    name: "Mini Bag Candy Blue",
    category: "crossbody",
    price: 390000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1691480150204-66dd1eb77391?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Mini bag màu xanh kẹo ngọt, nhẹ và nổi bật, phù hợp đi chơi cuối tuần.",
    material: "Da PU bóng nhẹ",
    color: "Candy blue",
    size: "18 x 12 cm",
    stock: 21,
    rating: 4.4,
    isFeatured: false,
    isNew: true
  },
  {
    id: 17,
    name: "Clutch Party Ice",
    category: "clutch",
    price: 410000,
    oldPrice: 500000,
    image: "https://images.unsplash.com/photo-1596149615176-50ced4d6b3b3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596149615176-50ced4d6b3b3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566150902887-9679ecc155ba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Clutch dự tiệc tông xanh băng, chi tiết viền nổi giúp tổng thể sang và sáng hơn.",
    material: "Satin + khung kim loại",
    color: "Ice cyan",
    size: "23 x 12 cm",
    stock: 12,
    rating: 4.7,
    isFeatured: false,
    isNew: true
  },
  {
    id: 18,
    name: "Balo Mini Urban",
    category: "backpack",
    price: 540000,
    oldPrice: 690000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Balo mini đô thị, phom gọn, màu xanh đậm sang trọng và có nhiều ngăn tiện dụng.",
    material: "Nylon chống thấm",
    color: "Urban navy",
    size: "30 x 24 cm",
    stock: 17,
    rating: 4.6,
    isFeatured: false,
    isNew: false
  }
];

// Mã giảm giá
const discountCodes = {
  "SALE10": 10,
  "HUIT20": 20,
  "NEWUSER": 15,
  "FASHION5": 5
};

// Chuẩn hóa dữ liệu để website tĩnh vẫn có đủ thuộc tính cho detail/admin.
(function hydrateProductCatalog() {
  const categoryNames = {
    tote: "Túi Tote",
    crossbody: "Túi Đeo Chéo",
    office: "Túi Công Sở",
    clutch: "Clutch",
    backpack: "Balo Mini"
  };

  const accentByColor = {
    "Kem": "#f1dfc4",
    "Nâu": "#7a4e2d",
    "Đen": "#1f1a17",
    "Vàng ánh": "#c9a227",
    "Hồng pastel": "#e9a9b5",
    "Xanh/Trắng": "#7da0a8",
    "Be": "#d8c3a5",
    "Nâu đậm": "#4c2e1f",
    "Nâu tự nhiên": "#9a704e",
    "Bạc": "#b9bec5",
    "Hồng": "#d98599"
  };

  const defaultAddOns = [
    { id: "scarf", name: "Khăn lụa quai túi", price: 120000 },
    { id: "charm", name: "Charm kim loại HUIT", price: 90000 },
    { id: "care", name: "Bộ vệ sinh da/vải", price: 150000 }
  ];

  function safeParseStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("Không đọc được dữ liệu", key, error);
      return null;
    }
  }

  const HUIT_CATALOG_VERSION = "2026-05-28-online-image-fix-v2";
  const savedCatalogVersion = localStorage.getItem("mlCatalogVersion");
  if (savedCatalogVersion !== HUIT_CATALOG_VERSION) {
    localStorage.removeItem("mlProducts");
    localStorage.setItem("mlCatalogVersion", HUIT_CATALOG_VERSION);
  }

  const managedProducts = safeParseStorage("mlProducts");
  const hasOldLocalImageRefs = Array.isArray(managedProducts) && managedProducts.some(product => {
    const imageValues = [product.image, ...(Array.isArray(product.gallery) ? product.gallery : [])].filter(Boolean);
    return imageValues.some(value => String(value).includes("assets/images/"));
  });

  if (Array.isArray(managedProducts) && managedProducts.length > 0 && !hasOldLocalImageRefs) {
    products.splice(0, products.length, ...managedProducts);
  } else if (hasOldLocalImageRefs) {
    localStorage.removeItem("mlProducts");
  }

  products.forEach((product, index) => {
    product.id = Number(product.id) || index + 1;
    product.price = Number(product.price) || 0;
    product.oldPrice = product.oldPrice ? Number(product.oldPrice) : null;
    product.stock = Number(product.stock) || 0;
    product.rating = Number(product.rating) || 4.5;
    product.category = product.category || "tote";
    product.material = product.material || "Da PU cao cấp";
    product.color = product.color || "Kem";
    product.size = product.size || "28 x 20 cm";
    product.gallery = Array.isArray(product.gallery) && product.gallery.length ? product.gallery : [product.image];
    product.sizes = Array.isArray(product.sizes) && product.sizes.length
      ? product.sizes
      : [product.size, "Mini", "Standard"].filter((value, i, arr) => value && arr.indexOf(value) === i);
    product.colors = Array.isArray(product.colors) && product.colors.length
      ? product.colors
      : [
          { name: product.color, hex: accentByColor[product.color] || "#c9a227" },
          { name: "Đen", hex: "#1f1a17" },
          { name: "Nâu", hex: "#7a4e2d" }
        ].filter((value, i, arr) => arr.findIndex(item => item.name === value.name) === i);
    product.components = product.components || {
      "Dòng sản phẩm": categoryNames[product.category] || product.category,
      "Chất liệu chính": product.material,
      "Lót trong": "Microfiber mềm, chống xước vật dụng",
      "Phụ kiện": "Khóa kéo kim loại, quai đeo điều chỉnh",
      "Bảo hành": "3 tháng lỗi sản xuất"
    };
    product.addOns = Array.isArray(product.addOns) && product.addOns.length ? product.addOns : defaultAddOns;
  });
})();

const reviewData = [
  { productId: 14, name: "Nguyễn Thanh Hà", avatar: "TH", rating: 5, date: "12/05/2026", title: "Thiết kế HUIT rất tinh tế", content: "Túi tote signature rộng, tông #99FFFF lên ảnh sạch và sang. Đường may chắc, đựng laptop và tài liệu vẫn gọn." },
  { productId: 2, name: "Trần Minh Châu", avatar: "MC", rating: 5, date: "16/05/2026", title: "Mini bag nhỏ nhưng tiện", content: "Túi nhẹ, dây đeo chắc, tông aqua phối đồ trắng hoặc jean đều hợp." },
  { productId: 15, name: "Lê Phương Uyên", avatar: "UY", rating: 5, date: "18/05/2026", title: "Rất hợp đi làm", content: "Ngăn laptop 13 inch vừa đẹp, form cứng nên nhìn chuyên nghiệp. Giao hàng đóng gói cẩn thận." },
  { productId: 4, name: "Phạm Mai Anh", avatar: "MA", rating: 4, date: "20/05/2026", title: "Clutch lên hình sáng", content: "Màu xanh băng bắt sáng tốt, đi tiệc rất hợp. Nếu thêm dây đeo rời thì hoàn hảo hơn." },
  { productId: 7, name: "Đỗ Khánh Linh", avatar: "KL", rating: 5, date: "22/05/2026", title: "Dây xích nhìn cao cấp", content: "Chi tiết kim loại đẹp, túi không quá nặng. Mình thích nhất phần phối màu thanh lịch." },
  { productId: 18, name: "Võ Ngọc Trâm", avatar: "NT", rating: 5, date: "24/05/2026", title: "Balo mini gọn", content: "Đi học mang vừa sổ, ví, sạc và vài món nhỏ. Tông màu đậm sạch và dễ phối." },
  { productId: 11, name: "Huỳnh Bảo An", avatar: "BA", rating: 4, date: "25/05/2026", title: "Tote vải lanh đẹp", content: "Chất vải nhẹ, hợp đi cafe hoặc đi biển. Shop tư vấn nhanh và dễ thương." },
  { productId: 13, name: "Mai Thảo Vy", avatar: "TV", rating: 5, date: "26/05/2026", title: "Túi vai rất xinh", content: "Dáng túi mềm, tông sáng nhẹ nhàng. Mình dùng hằng ngày thấy tiện." }
];

const newsData = [
  {
    id: 1,
    title: "5 dáng túi HUIT nên có trong tủ đồ công sở",
    category: "Xu hướng",
    date: "24/05/2026",
    image: "https://images.unsplash.com/photo-1743324690280-62c0699f46d2?auto=format&fit=crop&w=900&q=80",
    excerpt: "Từ tote rộng rãi đến túi công sở có ngăn laptop, mỗi dáng túi giải quyết một nhu cầu khác nhau trong tuần làm việc.",
    content: "Một tủ đồ công sở cân bằng nên có túi tote cho ngày nhiều tài liệu, túi structured cho cuộc họp quan trọng và crossbody nhỏ cho cuối tuần. HUIT ưu tiên phom sạch, màu xanh đậm sang trọng và chất liệu dễ chăm sóc."
  },
  {
    id: 2,
    title: "Cách bảo quản túi xanh aqua trong mùa mưa",
    category: "Chăm sóc",
    date: "21/05/2026",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
    excerpt: "Một vài thói quen nhỏ giúp túi giữ phom, tránh ẩm mốc và bền màu hơn trong khí hậu nóng ẩm.",
    content: "Hãy lau túi bằng khăn mềm sau khi đi mưa, để nơi thoáng khí, tránh phơi nắng gắt. Với túi canvas, dùng bàn chải mềm và xà phòng nhẹ; với da PU, dùng dung dịch vệ sinh chuyên dụng."
  },
  {
    id: 3,
    title: "HUIT ra mắt phong cách Vẻ Đẹp Thuần Khiết Vượt Thời Gian",
    category: "Tin thương hiệu",
    date: "18/05/2026",
    image: "https://images.unsplash.com/photo-1713425886695-7772d1498b11?auto=format&fit=crop&w=900&q=80",
    excerpt: "Tinh thần thiết kế mới tập trung vào sự sạch mắt, thanh lịch và bền phong cách.",
    content: "Capsule mới lấy cảm hứng từ vẻ đẹp thuần khiết: nhẹ, bền, đủ thanh lịch cho văn phòng và đủ nổi bật cho buổi hẹn sau giờ làm."
  }
];

const maisonDemoAccount = {
  admin: { email: "admin@huit.vn", password: "admin123", name: "Admin HUIT", role: "admin" },
  customer: { email: "khach@huit.vn", password: "khach123", name: "Khách Demo", role: "customer" }
};
