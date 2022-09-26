// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "https://webdev-project-two.uk/wp-json/wp/v2/posts?_embed&&per_page=";

let per_page = 10;

const sliderPostsContainer = document.querySelector("[data-posts-slider-container]");
async function getWpPostData() {
   try {
      const response = await fetch(API_URL + per_page.toString());
      const posts = await response.json();
      displayPostsOnIndex(posts);
   } catch {
      console.log("error");
      sliderPostsContainer.innerHTML = "";
      sliderPostsContainer.innerHTML += `
      <div class="error flex-col flex-gap-20">
          <p class="font-size-p3">Oh now, something went wrong :/</p>
          <p class="font-size-p3">Come back later and try again!</p>
      </div>`;
   }
}

getWpPostData();

let postHtmlData = "";
function displayPostsOnIndex(posts) {
   posts.forEach(function (singlePost) {
      singlePost._embedded["wp:featuredmedia"].forEach(function (imageArray) {
         singlePost._embedded["author"].forEach(function (authorArray) {
            console.dir(singlePost);

            postHtmlData += `
            <div class="slide-post">
            <a href="single-post.html?id=${singlePost.id}" class="slide-post__link" >
            <img class="slide-post__img" src="${imageArray.source_url}" alt="post-1-img" />
            <div class="slide-post__description">
            <p class="slide-post__title font-size-p2">${singlePost.title.rendered}</p>
            <span class="slide-post__content">${singlePost.excerpt.rendered}</span>
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

// Api has a data transfer delay. Adding this as fix
setTimeout(function () {
   numberOfSlider = sliderPostsContainer.children.length - 2;
}, 1000);

const nextPostBtn = document.querySelector("[data-slider-button-next]");
const previousPostBtn = document.querySelector("[data-slider-button-last]");
let activeSlide = 0;

function moveToNextSlide() {
   if (activeSlide > -numberOfSlider) {
      activeSlide -= 1;
      let currentTransform = activeSlide * 370;
      sliderPostsContainer.style.transform = `translateX(${currentTransform}px)`;
      console.log(currentTransform);
   } else {
      console.log("error");
      contentContainer.innerHTML = "";
      contentContainer.innerHTML += `
      <div class="error flex-col flex-gap-20">
          <p class="font-size-p3">Oh now, something went wrong :/</p>
          <p class="font-size-p3">Come back later and try again!</p>
      </div>`;
   }
}

function moveToPreviousSlide() {
   if (activeSlide < 0) {
      activeSlide += 1;
      console.log(activeSlide);
      sliderPostsContainer.style.transform = `translateX(${activeSlide * 370}px)`;
   } else {
      console.log("Can't go past first slide");
   }
}

nextPostBtn.addEventListener("click", moveToNextSlide);
previousPostBtn.addEventListener("click", moveToPreviousSlide);
