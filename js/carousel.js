document.addEventListener("DOMContentLoaded", main);

function main() {
  let carousel = document.querySelector(".carousel");
  let carouselItems = carousel.querySelectorAll(".carousel-item");
  let carouselInner = carousel.querySelector(".carousel-inner");
  let carouselControlPrev = carousel.querySelector(".carousel-control-prev");
  let carouselControlNext = carousel.querySelector(".carousel-control-next");
  let carouselIndicators = carousel.querySelector('.carousel-indicators');

  let carouselItemWidth = carouselItems[0].offsetWidth;
  let carouselItemsCount = carouselItems.length;


  createIndicators(carouselItemsCount, carouselIndicators);

  let indicators = carouselIndicators.querySelectorAll('svg');


  // functions
  const getIndexWithClass = (items, className) => {
    return Array.from(items).findIndex((item) =>
      item.classList.contains(className)
    );
  };

  const move = (step) => {
    currentIndex =
      (currentIndex + step + carouselItemsCount) % carouselItemsCount;

    let offset = -currentIndex * carouselItemWidth;

    carouselInner.style.transform = `translateX(${offset}px)`;

    carouselItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });

    indicators.forEach((item, index) => {
      let circle = item.querySelector('circle');
      circle.setAttribute('fill', '#6B6B6B');

      if(index === currentIndex) {
        circle.setAttribute('fill', '#D9D9D9');
      }
    })
  };

  const pause = () => {
    clearInterval(interval);
  };

  const play = () => {
    currentIndex = getIndexWithClass(carouselItems, "active");
    interval = setInterval(() => move(1), 3000);

    return interval;
  };

  const updateDimensions = () => {
    carouselItemWidth = carouselItems[0].offsetWidth;
    move(0);
  };

  // logic
  let currentIndex;
  let interval;

  play();

  window.addEventListener("resize", updateDimensions);

  carousel.addEventListener("mouseover", pause);
  carousel.addEventListener("mouseout", play);

  carouselControlPrev.addEventListener("click", () => {
    move(-1);
  });
  carouselControlNext.addEventListener("click", () => {
    move(1);
  });
}

function createIndicators (count, conatiner) {
  const svg = `
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="#6B6B6B" />
    </svg>
  `;

  let svgs = '';

  for(let i=0; i< count; i++) {
    svgs += svg;
  }

  conatiner.innerHTML = svgs;

}
