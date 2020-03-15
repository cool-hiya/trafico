import Swiper from '../vendor/swiper';

const feedbackSection = document.querySelector('.feedback');

if (feedbackSection) {
  const feedbackTemplate = document.querySelector('#feedback').content.children[0];
  const feedbackSlider = new Swiper('.feedback-slider', {
    slidesPerView: 'auto'
  });

  const createFeedbacks = (feedbacks) => {
    const slides = [];
    feedbacks.forEach((f, i) => slides.push(createFeedback(f, i)));

    feedbackSlider.appendSlide(slides);
  }

  const createFeedback = (data, index) => {
    const feedback = feedbackTemplate.cloneNode(true);
    const text = feedback.querySelector('.feedback__text');
    const name = feedback.querySelector('.feedback__client');
    const img = feedback.querySelector('.feedback__img');

    text.textContent = data.body;
    name.textContent = data.email;
    img.src = `https://picsum.photos/200/200?random=${index}`;

    return feedback;
  }

  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(json => createFeedbacks(json.slice(0, 5)));
}
