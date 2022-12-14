// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "https://webdev-project-two.uk/wp-json/wp/v2/posts/";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const contentContainer = document.querySelector("[data-main-post-content]");
const titleTag = document.querySelector("title");
const metaTag = document.getElementsByTagName("meta");

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
      singlePost._embedded["wp:term"].forEach(function (term) {
         term.forEach(function (slugs) {
            console.log(slugs.slug);
            metaTag.keywords.content += `,${slugs.slug}`;
         });
      });
      singlePost._embedded["author"].forEach(function (authorArray) {
         titleTag.innerText = `My Blog | ${singlePost.title.rendered}`;
         metaTag.description.content = `${singlePost.title.rendered}`;
         contentContainer.innerHTML += `
               <nav class="breadcrumb flex flex-gap-10 center-vertical text-cap">
                  <a href="index.html" class="breadcrumb__link">Home</a>
                  <i class="fa-sharp fa-solid fa-angle-right"></i>
                  <a href="posts.html" class="breadcrumb__link">Posts</a>
                  <i class="fa-sharp fa-solid fa-angle-right"></i>
                  <p class="font-size-p3">${singlePost.title.rendered}</p>
               </nav>
               <div class="post-image">
                  <img class="img-cover" src="${imageArray.source_url}" alt="Strength Workout" />
               </div>
               <div class="modal flex padding-w-20 hide-modal">
                  <div class="modal__wrapper">
                     <img class="modal__image" src="${imageArray.source_url}" alt="${imageArray.alt_text}" />
                     <div class="modal__image-description"><span class="font-size-p3">${imageArray.caption.rendered}</span></div>
                     <button class="modal__close-menu-btn"><i class="fa-solid fa-xmark modal__close-menu-btn-icon"></i></button>
                  </div>
               </div>   
               <div class="post-description flex-col flex-gap-20 padding-w-20">
                  <h1>${singlePost.title.rendered}</h1>
                  <p class="post-description__metadata font-size-p3">Written by: ${authorArray.name} </p>
                  <span class="post-description__story flex-col flex-gap-40 font-size-p2">${singlePost.content.rendered}</span>
                  <span class="post-description__date flex-col flex-gap-40">Posted on: ${new Date(singlePost.date)}</span>
               </div>
          
      `;
      });
   });
}

getWpPostData();

// Listening for click event to toggle modal

contentContainer.addEventListener("click", function (event) {
   const modalContainer = document.querySelector(".modal");
   if (event.target.classList.contains("img-cover")) {
      modalContainer.classList.remove("hide-modal");
   } else if (event.target.classList.contains("modal__close-menu-btn")) {
      modalContainer.classList.add("hide-modal");
   } else if (event.target.classList.contains("modal__close-menu-btn-icon")) {
      modalContainer.classList.add("hide-modal");
   } else if (event.target.classList.contains("modal")) {
      modalContainer.classList.add("hide-modal");
   }
});
