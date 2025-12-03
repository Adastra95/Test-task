/*сохранение в localstorage*/
let input_title = document.getElementById("title");
let input_content = document.getElementById("content");
let ad_article = document.getElementById("ad-article");

ad_article.addEventListener("click", () => {
  let titleValue = input_title.value;
  let contentValue = input_content.value;

  if (!titleValue || !contentValue) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }
  let articles = JSON.parse(localStorage.getItem("articles")) || [];
  articles.unshift({
    title: titleValue,
    content: contentValue,
    created: new Date().toLocaleString(),
    updated: new Date().toLocaleString(),
  });
  localStorage.setItem("articles", JSON.stringify(articles));

  alert("Статья сохранена!");
});
