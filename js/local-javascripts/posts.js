// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "https://webdev-project-two.uk/wp-json/wp/v2/posts?_embed&&per_page=";
const viewMoreBtn = document.querySelector(".diamond-icon");
let per_page = 10;
const postsContainer = document.querySelector(".posts-container");

async function getWpPostData() {
   try {
      const response = await fetch(API_URL + per_page.toString());
      const posts = await response.json();
      console.log(posts.length);
      displayPostsOnIndex(posts);
   } catch {
      console.log("error");
      postsContainer.innerHTML = "";
      postsContainer.innerHTML += `
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

   postsContainer.innerHTML = postHtmlData;
}

const addMorePosts = function () {
   per_page += 10;
   postHtmlData = "";
   getWpPostData();
};

viewMoreBtn.addEventListener("click", addMorePosts);
