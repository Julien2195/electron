getNews();

const main = document.querySelector("main");
const containerMain = document.getElementById("container-main");
const containerCard = document.getElementsByClassName("container-card");
const containerInfos = document.getElementsByClassName("container-infos");
const authorContainer = document.getElementsByClassName("container-author");
const search = document.getElementById("search");

search.addEventListener("input", () => {
  const searchVal = search.value.trim().toLowerCase();
  const articles = containerMain.querySelectorAll(".container-ul");

  articles.forEach(article => {
    const title = article.dataset.title.toLowerCase();
    if (title.includes(searchVal)) {
      article.classList.remove("hide");
    } else {
      article.classList.add("hide");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".nav-group-item");
  categories.forEach((category) => {
    category.addEventListener("click", function () {
      const categoryId = category.querySelector(".icon").getAttribute("id");
      getNews(categoryId);
    });
  });
});

async function getNews(category) {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=11e68ee7d9d5468ea5bbbd1da62f7508`
  )
    .then((res) => res.json())
    .then((data) => {
      data.articles.forEach((article) => {
        if (
          article.urlToImage !== null &&
          article.description !== null &&
          article.title !== null &&
          article.publishedAt !== null
        ) {
          const content = document.createElement("div");
          content.classList.add("container-ul");
          content.setAttribute("data-title", article.title);
          content.innerHTML = `
            <li><img class="img-container" src="${article.urlToImage}" alt="${article.title}"></li>
            <div class="container-card">
              <li class="custom-title">${article.title}</li>
              <div class="container-infos">
                <li class="custom-publish-at">${article.publishedAt}</li>
                <li class="container-author">${article.author}</li>
              </div>
              <li class="custom-description">${article.description}</li>
            </div>`;

          containerMain.appendChild(content);
        }
      });
    });
}
