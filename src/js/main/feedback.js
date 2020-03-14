import Swiper from '../vendor/swiper';

const feedbackSection = document.querySelector('.feedback');

if (feedbackSection) {
  const feedbackSlider = new Swiper('.feedback-slider', {
    slidesPerView: 'auto'
  })
}
