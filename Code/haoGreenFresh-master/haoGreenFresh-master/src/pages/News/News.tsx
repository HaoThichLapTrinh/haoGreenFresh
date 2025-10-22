// News.js

// --- 1. IMPORT CÁC ẢNH MỚI TỪ THƯ MỤC ASSETS ---
// Đảm bảo đường dẫn này đúng với vị trí file News.js của bạn
import newsImage1 from "../../assets/images/baoquantulanh.jpg"
import newsImage2 from "../../assets/images/rauhuuco.jpg"
import newsImage3 from "../../assets/images/namloairaucu.jpg"


// --- 2. CẬP NHẬT newsList SỬ DỤNG BIẾN ẢNH ĐÃ IMPORT ---
const newsList = [
  {
    id: 1,
    title: 'Bí quyết bảo quản rau củ tươi lâu trong tủ lạnh',
    date: '12/10/2025',
    img: newsImage1, // Dùng ảnh baoquantulanh.jpg
    desc: 'Cùng GreenFresh tìm hiểu những cách đơn giản để giữ rau củ luôn tươi ngon trong nhiều ngày mà vẫn đảm bảo dinh dưỡng.',
  },
  {
    id: 2,
    title: 'Rau hữu cơ – Xu hướng sống xanh hiện đại',
    date: '05/10/2025',
    img: newsImage2, // Dùng ảnh rauhuuco.jpg
    desc: 'Khám phá lý do vì sao ngày càng nhiều người lựa chọn rau hữu cơ để bảo vệ sức khỏe và môi trường.',
  },
  {
    id: 3,
    title: 'Top 5 loại rau củ nên dùng mỗi ngày',
    date: '01/10/2025',
    img: newsImage3, // Dùng ảnh namloairaucu.jpg
    desc: 'Cải bó xôi, cà rốt, bông cải xanh... đều là những loại rau quen thuộc nhưng cực kỳ giàu dinh dưỡng.',
  },
];

// --- COMPONENT NEWS ---
export default function News() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Tin tức & Mẹo hay</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsList.map((n) => (
          <div key={n.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
            <img
              src={n.img}
              alt={n.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold text-green-700 mb-2">{n.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{n.date}</p>
            <p className="text-gray-700 text-sm">{n.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}