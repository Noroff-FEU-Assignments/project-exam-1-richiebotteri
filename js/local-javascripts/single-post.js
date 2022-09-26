// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "https://webdev-project-two.uk/wp-json/wp/v2/posts/";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const contentContainer = document.querySelector("[data-main-post-content]");

async function getWpPostData() {
   try {
      const response = await fetch(API_URL + id + "?_embed");
      const singlePost = await response.json();
      console.log(singlePost);
      displaySinglePost(singlePost);
   } catch {
      console.log("error");
      contentContainer.innerHTML = "";
      contentContainer.innerHTML += `
      <div class="error flex-col flex-gap-20">
          <p class="font-size-p3">Oh now, something went wrong :/</p>
          <p class="font-size-p3">Come back later and try again!</p>
      </div>`;
   }
}

// Display API single post data as HTML on posts.html

function displaySinglePost(singlePost) {
   contentContainer.innerHTML = "";
   singlePost._embedded["wp:featuredmedia"].forEach(function (imageArray) {
      singlePost._embedded["author"].forEach(function (authorArray) {
         console.dir(singlePost);
         contentContainer.innerHTML += `
               <nav class="breadcrumb flex flex-gap-10 center-vertical text-cap">
                  <a href="index.html" class="breadcrumb__link">Home</a>
                  <i class="fa-sharp fa-solid fa-angle-right"></i>
                  <a href="posts.html" class="breadcrumb__link">Posts</a>
                  <i class="fa-sharp fa-solid fa-angle-right"></i>
                  <p class="font-size-p4">Single Post</p>
               </nav>
               <div class="post-image">
                  <img class="img-cover" src="${imageArray.source_url}" alt="Strength Workout" />
               </div>
               <div class="modal flex padding-w-20 hide-modal">
                  <div class="modal__wrapper">
                     <img class="modal__image" src="${imageArray.source_url}" alt="Strength Workout" />
                     <div class="modal__image-description"><p class="font-size-p4">Image description</p></div>
                     <button class="modal__close-menu-btn"><i class="fa-solid fa-xmark modal__close-menu-btn-icon"></i></button>
                  </div>
               </div>   
               <div class="post-description flex-col flex-gap-10 padding-w-20">
                  <h1 class="font-size-h3">${singlePost.title.rendered}</h1>
                  <p class="post-description__metadata font-size-p4">Written by: ${authorArray.name} </p>
                  <span class="post-description__story flex-col flex-gap-40">${singlePost.content.rendered}</span>
               </div>
          
      `;
      });
   });
}

getWpPostData();

contentContainer.addEventListener("click", function (event) {
   const modalContainer = document.querySelector(".modal");
   if (event.target.classList.contains("img-cover")) {
      modalContainer.classList.remove("hide-modal");
   } else if (event.target.classList.contains("modal__close-menu-btn")) {
      console.log(event.target);
      modalContainer.classList.add("hide-modal");
   } else if (event.target.classList.contains("modal__close-menu-btn-icon")) {
      console.log(event.target);
      modalContainer.classList.add("hide-modal");
   }
});

// Show modal
