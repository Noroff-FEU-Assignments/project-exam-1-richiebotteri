// Fetching wordpress API to be used for index-, posts- and single-post page

const API_URL = "http://localhost:80/wordpress/wp-json/wp/v2/posts?_embed&&per_page=";

let per_page = 10;

export let postsArray;
async function getWpPostData() {
   try {
      const response = await fetch(API_URL + per_page.toString());
      const posts = await response.json();
      postsArray = posts;
   } catch {
      console.log("error");
   }
}

getWpPostData();
