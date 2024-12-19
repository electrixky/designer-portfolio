import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

new Swiper('.slider', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
