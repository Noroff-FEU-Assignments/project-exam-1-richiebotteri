import { apiPostData } from "../global-javascripts/fetchWpApi.js";

setTimeout(function () {
   displayPostsOnIndex(apiPostData);
}, 1000);

// Add posts from API to index.html

const sliderPostsContainer = document.querySelector("[data-posts-slider-container]");

function displayPostsOnIndex(apiPostData) {
   apiPostData.forEach(function (singlePost) {
      singlePost._embedded["wp:featuredmedia"].forEach(function (imageArray) {
         singlePost._embedded["author"].forEach(function (authorArray) {
            console.log(singlePost);
            sliderPostsContainer.innerHTML += `
               <div class="slide-post">
                  <img class="slide-post__img" src="${imageArray.source_url}" alt="post-1-img" />
                  <div class="slide-post__description">
                     <p class="slide-post__title font-size-p1">${singlePost.title.rendered}</p>
                     <p class="slide-post__metadata font-size-p4">written by: ${authorArray.name}</p>
                     <p class="font-size-p3">${singlePost.excerpt.rendered}</p>
                     <a class="slide-post__link font-size-p3" href="single-post.html">Read more</a>
                  </div>
               </div>
            `;
         });
      });
   });
}

let numberOfSlider = 0;

setTimeout(function () {
   numberOfSlider = sliderPostsContainer.children.length - 2;
}, 1000);

const nextPostBtn = document.querySelector("[data-slider-button-next]");
const previousPostBtn = document.querySelector("[data-slider-button-last]");
let activeSlide = 0;

function moveToNextSlide() {
   if (activeSlide > -numberOfSlider) {
      activeSlide -= 1;
      let currentTransform = activeSlide * 340;
      sliderPostsContainer.style.transform = `translateX(${currentTransform}px)`;
      console.log(currentTransform);
   } else {
      console.log("Can't go past length of slides");
   }
}

function moveToPreviousSlide() {
   if (activeSlide < 0) {
      activeSlide += 1;
      console.log(activeSlide);
      sliderPostsContainer.style.transform = `translateX(${activeSlide * 340}px)`;
   } else {
      console.log("Can't go past first slide");
   }
}

nextPostBtn.addEventListener("click", moveToNextSlide);
previousPostBtn.addEventListener("click", moveToPreviousSlide);

// sliderPostsContainer.style.transform = "translateX(-20%)";
