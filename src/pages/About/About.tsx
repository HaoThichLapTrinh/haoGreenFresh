import anh1 from "../../assets/images/greenfresh.jpg"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Giới thiệu về GreenFresh</h1>

      <p className="mb-4">
        <strong>GreenFresh</strong> là thương hiệu chuyên cung cấp rau củ quả sạch và an toàn cho sức khỏe,
        được nuôi trồng theo tiêu chuẩn hữu cơ. Chúng tôi mong muốn mang đến cho người tiêu dùng nguồn thực phẩm
        tươi ngon nhất – từ nông trại đến bàn ăn.
      </p>

      <p className="mb-4">
        Tất cả sản phẩm đều được kiểm định chất lượng kỹ lưỡng, thu hoạch và vận chuyển nhanh chóng trong ngày
        để giữ nguyên độ tươi ngon. Chúng tôi cam kết <strong>“Sạch từ tâm – Xanh mỗi ngày”</strong>.
      </p>

      <div className="mt-8">
        <img
          src={anh1} 
          alt="Giới thiệu GreenFresh"
          className="rounded-2xl shadow-lg w-full max-w-3xl mx-auto"
        />
      </div>
    </div>
  )
}