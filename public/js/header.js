const menuHamb = document.querySelector(".hmb-menu-container");
const openMenuHamb = document.querySelector(".icon-hmb-menu");
const closeMenuHamb = document.querySelector(".icon-close-hmb-menu");

closeMenuHamb.addEventListener("click", function () {
  menuHamb.classList.add("hmb-menu-out");
});

openMenuHamb.addEventListener("click", function () {
  menuHamb.classList.remove("hmb-menu-out");
});
