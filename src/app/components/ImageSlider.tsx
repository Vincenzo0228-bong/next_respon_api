"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import styles from './slide.module.scss';

interface NewsItem {
  id: number;
  image: string;
  date: string;
  title: string;
  description: string;
}

interface ImageSliderProps {
  newsItems: NewsItem[];
}

export default function ImageSlider({ newsItems }: ImageSliderProps) {

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={30}
      slidesPerView={4}
      slidesPerGroup={1}
      loop={true}
      navigation
      className={styles.swiper}
      breakpoints={{
        // Start with 4 slides, reduce when slides exceed browser width
        // Each slide is 399px + 30px spacing, with 148px padding on each side
        // 4 slides: 399*4 + 30*3 = 1686px content + 296px padding = 1982px total
        1982: {
          slidesPerView: 4,
        },
        // 3 slides: 399*3 + 30*2 = 1257px content + 296px padding = 1553px total
        1553: {
          slidesPerView: 3,
        },
        // 2 slides: 399*2 + 30*1 = 828px content + 296px padding = 1124px total
        1124: {
          slidesPerView: 2,
        },
        // 1 slide: 399px content + 296px padding = 695px total
        695: {
          slidesPerView: 1,
        },
        // Below 695px, show 1 slide
        0: {
          slidesPerView: 1,
        },
      }}
    >
      {newsItems.map((item) => (
        <SwiperSlide key={item.id}>
          <Image src={item.image} alt={item.title} width={399} height={470} />
          <div className={styles.pro_details}>
            <p className={styles.price}>{item.date}</p>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.comment}>{item.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
