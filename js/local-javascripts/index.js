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

// Display Posts on index

let postHtmlData = "";

function displayPostsOnIndex(posts) {
   posts.forEach(function (singlePost) {
      singlePost._embedded["wp:featuredmedia"].forEach(function (imageArray) {
         singlePost._embedded["author"].forEach(function (authorArray) {
            console.dir(singlePost);

            postHtmlData += `
            <div class="slide-post">
               <a href="single-post.html?id=${singlePost.id}" class="slide-post__link" >
                  <img class="slide-post__img" src="${imageArray.source_url}" alt="${imageArray.alt_text}" />
                  <div class="slide-post__description flex-col">
                     <h3 class="slide-post__title">${singlePost.title.rendered}</h3>
                     <span class="slide-post__content">${singlePost.excerpt.rendered}</span>
                     <p class="slide-post__read-more font-size-p2">Read more</p>
                  </div>
               </a>
            </div>
            `;
         });
      });
   });

   sliderPostsContainer.innerHTML = postHtmlData;
   activateSlider(sliderPostsContainer);
}

// Setting up functional buttons for slider on index.html

function activateSlider(updatedSliderContainer) {
   let numberOfSlider = 0;
   numberOfSlider = updatedSliderContainer.children.length - 2;

   const nextPostBtn = document.querySelector("[data-slider-button-next]");
   const previousPostBtn = document.querySelector("[data-slider-button-last]");
   let activeSlide = 0;

   function moveToNextSlide() {
      if (activeSlide > -numberOfSlider) {
         activeSlide -= 1;
         let currentTransform = activeSlide * 370;
         sliderPostsContainer.style.transform = `translateX(${currentTransform}px)`;
         console.log(currentTransform);
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
}
