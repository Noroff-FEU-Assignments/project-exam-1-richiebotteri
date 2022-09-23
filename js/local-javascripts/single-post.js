// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "http://localhost:80/wordpress/wp-json/wp/v2/posts/";

const queryString = window.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

async function getWpPostData() {
   try {
      const response = await fetch(API_URL + id + "?_embed");
      const singlePost = await response.json();
      console.log(singlePost);
      displaySinglePost(singlePost);
   } catch {
      console.log("error");
   }
}

// Display API single post data as HTML on posts.html

const contentContainer = document.querySelector("[data-main-post-content]");

function displaySinglePost(singlePost) {
   singlePost._embedded["wp:featuredmedia"].forEach(function (imageArray) {
      singlePost._embedded["author"].forEach(function (authorArray) {
         contentContainer.innerHTML += `
                <nav class="breadcrumb flex flex-gap-10 center-vertical text-cap">
                   <a href="index.html" class="breadcrumb__link">Home</a>
                   <i class="fa-sharp fa-solid fa-angle-right"></i>
                   <a href="posts.html" class="breadcrumb__link">Posts</a>
                   <i class="fa-sharp fa-solid fa-angle-right"></i>
                   <p class="font-size-p4">${singlePost.title.rendered}</p>
                </nav>
                <div class="post-image">
                   <img class="img-cover" src="${imageArray.source_url}" alt="Strength Workout" />
                </div>
                <div class="post-description flex-col flex-gap-10 padding-w-20">
                   <h1 class="font-size-h3">${singlePost.title.rendered}</h1>
                   <p class="post-description__metadata font-size-p4">Written by: ${authorArray.name} </p>
                   <span class="post-description__story">${singlePost.excerpt.rendered}</span>
                </div>
          
      `;
      });
   });
}

getWpPostData();
