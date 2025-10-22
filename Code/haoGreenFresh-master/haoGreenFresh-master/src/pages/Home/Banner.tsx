import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css/bundle'

// ✅ Import ảnh trực tiếp
import banner1 from '../../assets/images/banner5.jpg'
import banner2 from '../../assets/images/banner9.jpg'
import banner3 from '../../assets/images/banner7.jpg'

export default function Banner() {
  const banners = [
    { img: banner1, text: 'Rau củ tươi sạch mỗi ngày' },
    { img: banner2, text: 'Nguồn thực phẩm xanh từ thiên nhiên' },
    { img: banner3, text: 'Cung cấp rau sạch cho mọi nhà' },
  ]

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-2xl overflow-hidden shadow-xl mb-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {banners.map((b, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              {/* Dùng thẻ img để load ảnh chuẩn */}
              <img
                src={b.img}
                alt={b.text}
                className="w-full h-full object-cover object-center select-none"
                loading="lazy"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

              {/* Text nổi bật ở giữa */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="
                    text-white text-2xl md:text-4xl lg:text-5xl font-bold 
                    px-6 py-3 rounded-lg bg-black/40 backdrop-blur-sm 
                    animate-fadeIn text-center
                  "
                >
                  {b.text}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
