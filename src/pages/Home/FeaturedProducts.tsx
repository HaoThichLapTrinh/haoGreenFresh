import { productsData } from '../../data/products' // import từ .ts, không phải .json
import ProductCard from '../../components/ProductCard'

export default function FeaturedProducts() {
  const featured = productsData.slice(0, 4) // Lấy 4 sản phẩm đầu tiên

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 via-green-50 to-green-100/30 rounded-full blur-3xl -z-10" />
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-700 tracking-tight drop-shadow-md font-serif">
          🌿 <span className="text-green-800">Sản phẩm nổi bật</span> 🥕
        </h2>
        <div className="mt-4 h-1 w-32 bg-gradient-to-r from-green-400 to-lime-500 mx-auto rounded-full" />
        <p className="mt-3 text-gray-600 text-lg italic">Tươi – sạch – an toàn cho mỗi bữa ăn gia đình</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </section>
  )
}
