import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const CategorySlider = () => {
  return (
    <div className='my-20'>
            <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
         
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-32 rounded-full">
                    <span className="text-xl">Electronics</span>
                 </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default CategorySlider
