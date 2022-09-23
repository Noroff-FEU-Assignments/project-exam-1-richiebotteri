// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "http://localhost:80/wordpress/wp-json/wp/v2/posts?_embed&&per_page=";

let per_page = 10;

async function getWpPostData() {
   try {
      const response = await fetch(API_URL + per_page.toString());
      const posts = await response.json();
      displayPostsOnIndex(posts);
   } catch {
      console.log("error");
   }
}

getWpPostData();

const sliderPostsContainer = document.querySelector("[data-posts-slider-container]");
let postHtmlData = "";
function displayPostsOnIndex(posts) {
   posts.forEach(function (singlePost) {
      singlePost._embedded["wp:featuredmedia"].forEach(function (imageArray) {
         singlePost._embedded["author"].forEach(function (authorArray) {
            postHtmlData += `
            <div class="slide-post">
            <a href="single-post.html?id=${singlePost.id}" class="slide-post__link" >
            <img class="slide-post__img" src="${imageArray.source_url}" alt="post-1-img" />
            <div class="slide-post__description">
            <p class="slide-post__title font-size-p1">${singlePost.title.rendered}</p>
            <p class="slide-post__metadata font-size-p4">written by: ${authorArray.name}</p>
            <span class="slide-post__content ">${singlePost.excerpt.rendered}</span>
            <p class="slide-post__read-more font-size-p3">Read more</p>
            </div>
            </a>
            </div>
            `;
         });
      });
   });

   sliderPostsContainer.innerHTML = postHtmlData;
}

// Setting up functional buttons for slider on index.html

let numberOfSlider = 0;

setTimeout(function () {
   numberOfSlider = sliderPostsContainer.children.length - 1;
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
