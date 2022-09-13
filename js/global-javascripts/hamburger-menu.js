const menuButton = document.querySelector(".header-menu-btn");
const closeMenuButton = document.querySelector(".close-menu-btn");

const toggleMenu = function (event) {
   if (event.target.classList.contains("header-menu-btn")) {
      toggleClass(event.target.nextElementSibling.nextElementSibling);
   } else if (event.target.classList.contains("close-menu-btn")) {
      toggleClass(event.target.parentElement);
   } else if (event.target.classList.contains("close-menu-btn__icon")) {
      toggleClass(event.target.parentElement.parentElement);
   } else if (event.target.classList.contains("header-menu-btn__icon")) {
      toggleClass(event.target.parentElement.nextElementSibling.nextElementSibling);
   }
};

function toggleClass(dropdownMenu) {
   return dropdownMenu.classList.toggle("hide-class");
}

menuButton.addEventListener("click", toggleMenu);
closeMenuButton.addEventListener("click", toggleMenu);
