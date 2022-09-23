// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "http://localhost:80/wordpress/wp-json/wp/v2/posts?_embed&&per_page=";
const viewMoreBtn = document.querySelector(".diamond-icon");
let per_page = 2;

async function getWpPostData() {
   try {
      const response = await fetch(API_URL + per_page.toString());
      const posts = await response.json();
      console.log(posts.length);
      displayPostsOnIndex(posts);
   } catch {
      console.log("error");
   }
}

getWpPostData();

const postsContainer = document.querySelector(".posts-container");
let postHtmlData = "";

function displayPostsOnIndex(posts) {
   posts.forEach(function (singlePost) {
      singlePost._embedded["wp:featuredmedia"].forEach(function (imageArray) {
         singlePost._embedded["author"].forEach(function (authorArray) {
            postHtmlData += `
              <div class="slide-post">
              <img class="slide-post__img" src="${imageArray.source_url}" alt="post-1-img" />
              <div class="slide-post__description">
              <p class="slide-post__title font-size-p1">${singlePost.title.rendered}</p>
              <p class="slide-post__metadata font-size-p4">written by: ${authorArray.name}</p>
              <span class="slide-post__content">${singlePost.excerpt.rendered}</span>
              <a class="slide-post__link font-size-p3" href="single-post.html">Read more</a>
              </div>
              </div>
              `;
         });
      });
   });

   postsContainer.innerHTML = postHtmlData;
}

const addMorePosts = function () {
   per_page += 2;
   postHtmlData = "";
   getWpPostData();
};

viewMoreBtn.addEventListener("click", addMorePosts);
