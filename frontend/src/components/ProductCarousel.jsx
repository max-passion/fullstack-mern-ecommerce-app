import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Message from './Message';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return null;
  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <div className="mb-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 2, spaceBetween: 30 },
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <Link
              to={`/product/${product._id}`}
              className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-500"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[420px] md:h-[460px] object-cover rounded-2xl transform group-hover:scale-105 transition duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

              {/* Glass Content */}
              <div className="absolute bottom-6 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md transition-transform duration-300 group-hover:translate-y-[-6px]">
                <h2 className="text-xl md:text-2xl font-semibold text-white drop-shadow-sm">
                  {product.name}
                </h2>
                <p className="mt-1 text-lg font-medium text-emerald-300">
                  ${product.price}
                </p>
                <button className="mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg shadow-sm transition">
                  View Details
                </button>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
