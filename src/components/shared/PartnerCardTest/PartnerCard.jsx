import Image from "next/image";
import Link from "next/link";
import styles from './PartnerCard.module.scss'
import clsx from "clsx";
import { useSwiperSlide } from 'swiper/react';

export default function PartnerCard({ item }) {
  const { img, url } = item;
  const swiperSlide = useSwiperSlide();

  //console.log(swiperSlide)
// swiperSlide.isActive

//     "isVisible": true,
//     "isPrev": false,
//     "isNext": true

  return (
    <Link
      href={url}
      className={clsx(styles.partnerCardItem, swiperSlide.isActive ? styles._active: styles._disabled)}
      rel="noopener noreferrer"
      target="_blank">
      <div className={styles.img_wrap}>
        <Image
          className={styles.img}
          src={img}
          alt="Card image"
          fill
          sizes="100%"
          />
      </div>
    </Link>
  );
}
