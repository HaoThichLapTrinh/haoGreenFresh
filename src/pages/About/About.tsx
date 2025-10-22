import { motion } from "framer-motion";
import anh1 from "../../assets/images/greenfresh.jpg";
import anh2 from "../../assets/images/namloairaucu.jpg";
import anh3 from "../../assets/images/banner9.jpg";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 text-gray-800">
      {/* Tiêu đề chính */}
      <motion.h1
        className="text-4xl font-extrabold text-green-600 mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Giới thiệu về GreenFresh 🌱
      </motion.h1>

      {/* Đoạn giới thiệu đầu */}
      <motion.div
        className="text-lg leading-relaxed max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="mb-4">
          <strong>GreenFresh</strong> là thương hiệu chuyên cung cấp rau củ quả sạch và an toàn cho sức khỏe,
          được nuôi trồng theo tiêu chuẩn hữu cơ. Chúng tôi mong muốn mang đến cho người tiêu dùng nguồn thực phẩm
          tươi ngon nhất – từ nông trại đến bàn ăn.
        </p>

        <p>
          Tất cả sản phẩm đều được kiểm định chất lượng kỹ lưỡng, thu hoạch và vận chuyển nhanh chóng trong ngày
          để giữ nguyên độ tươi ngon. Chúng tôi cam kết <strong>“Sạch từ tâm – Xanh mỗi ngày”</strong>.
        </p>
      </motion.div>

      {/* Ảnh chính */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={anh1}
          alt="Giới thiệu GreenFresh"
          className="rounded-2xl shadow-2xl w-full max-w-4xl"
        />
      </motion.div>

      {/* Các phần mở rộng */}
      <div className="grid md:grid-cols-2 gap-10 mt-16">
        {/* Sứ mệnh */}
        <motion.div
          className="bg-green-50 rounded-2xl shadow-lg p-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={anh2}
            alt="Trang trại GreenFresh"
            className="rounded-xl mb-4 w-full h-56 object-cover"
          />
          <h2 className="text-2xl font-semibold text-green-600 mb-2">🌿 Sứ mệnh</h2>
          <p>
            Mang đến cho mọi gia đình Việt nguồn thực phẩm tươi sạch, an toàn và thân thiện với môi trường.
            GreenFresh không chỉ là nơi bán rau củ, mà còn là người bạn đồng hành vì sức khỏe cộng đồng.
          </p>
        </motion.div>

        {/* Tầm nhìn */}
        <motion.div
          className="bg-green-50 rounded-2xl shadow-lg p-6"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={anh3}
            alt="Giao hàng tươi nhanh"
            className="rounded-xl mb-4 w-full h-56 object-cover"
          />
          <h2 className="text-2xl font-semibold text-green-600 mb-2">🚚 Tầm nhìn</h2>
          <p>
            Trở thành hệ thống phân phối thực phẩm sạch hàng đầu Việt Nam, giúp người tiêu dùng dễ dàng tiếp cận
            nguồn rau củ hữu cơ chất lượng với giá hợp lý, tiện lợi và nhanh chóng.
          </p>
        </motion.div>
      </div>

      {/* Giá trị cốt lõi */}
      <motion.div
        className="mt-16 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-green-600 mb-4">🌼 Giá trị cốt lõi</h2>
        <ul className="text-lg space-y-3">
          <li>✅ Chất lượng – Luôn đặt chất lượng sản phẩm lên hàng đầu.</li>
          <li>🌱 Bền vững – Bảo vệ môi trường, hướng đến nông nghiệp xanh.</li>
          <li>💚 Tận tâm – Phục vụ khách hàng bằng sự chân thành và minh bạch.</li>
        </ul>
      </motion.div>
    </div>
  );
}
