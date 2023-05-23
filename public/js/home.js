let carrousel = document.querySelector(".carrousel-container-inner");
let imagesArr = document.querySelectorAll(".carrousel-img");

let currentImg = 0;
setInterval(function () {
  let transition = currentImg * -100;
  carrousel.style.transform = `translateX(${transition}%)`;
  currentImg++;

  if (currentImg > imagesArr.length - 1) {
    currentImg = 0;
  }
}, 2500);
