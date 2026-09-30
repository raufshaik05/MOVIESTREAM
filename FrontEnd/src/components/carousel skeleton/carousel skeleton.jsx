import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CarouselSkeleton() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
      }}
    >
      {[...Array(8)].map((_, index) => (
        <SwiperSlide key={index}>
          <div className="movie-card-skeleton">
            <Skeleton height={280} borderRadius={12} />
            <Skeleton
              height={20}
              width="80%"
              style={{ marginTop: "10px" }}
            />
            <Skeleton height={16} width="50%" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarouselSkeleton;