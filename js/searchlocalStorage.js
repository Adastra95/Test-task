//вывод общего списка//
let mainBlock = document.querySelector("main");
let articles = JSON.parse(localStorage.getItem("articles")) || [];

articles.forEach((article, index) => {
  let block = document.createElement("article");

  block.innerHTML = `
        <div class="article-header">
            <h4>${article.title}</h4>
              <div class="buttons">
            <button class="viewPost-btn" data-index="${index}">View</button>
            <button class="edit-btn" data-index="${index}">Edit</button>
            </div>
        </div>

        <div class="article-dates">
            <time class="created">Создано: ${article.created}</time>
            <time class="updated">Обновлено: ${article.updated}</time>
        </div>
    `;

  mainBlock.appendChild(block);
});
//форма сохранения//
let edit_form = document.getElementById("edit-form");
let close_btn = document.getElementById("close-editForm");
let edit_buttons = document.querySelectorAll(".edit-btn");

edit_buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    edit_form.style.display = "block";

    let index = btn.dataset.index;
    let article = articles[index];

    edit_form.querySelector("#title").value = article.title;
    edit_form.querySelector("#content").value = article.content;

    edit_form.dataset.index = index;
  });
});

close_btn.addEventListener("click", () => {
  edit_form.style.display = "none";
});

let save_btn = document.getElementById("save-article");

save_btn.addEventListener("click", () => {
  let index = edit_form.dataset.index;

  articles[index].title = edit_form.querySelector("#title").value;
  articles[index].content = edit_form.querySelector("#content").value;

  let now = new Date().toLocaleString();
  articles[index].updated = now;

  localStorage.setItem("articles", JSON.stringify(articles));

  edit_form.style.display = "none";

  mainBlock.children[index].querySelector("h4").textContent =
    articles[index].title;
});

//просмотр статьи//
const viewBtn = document.querySelectorAll(".viewPost-btn");

viewBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = btn.dataset.index;
    const article = articles[index];

    const Sectiontrue = document.querySelector(
      `section.info-block[data-index="${index}"]`
    );
    if (Sectiontrue) {
      return;
    }

    const section = document.createElement("section");
    section.className = "info-block";
    section.dataset.index = index;

    section.innerHTML = `
            <div class="section-header">
                <h4>${article.title}</h4>
                <div class="buttons">
            <button class="close-btn" data-index="${index}">Close</button>
            </div>
            </div>
            <div class="section-content">
                ${article.content}
            </div>
            <div class="section-dates">
                <time class="created">Создано: ${article.created}</time>
                <time class="updated">Обновлено: ${article.updated}</time>
            </div>
        `;

    const articleElement = btn.closest("article");
    articleElement.insertAdjacentElement("afterend", section);

    const closebtn = section.querySelector(".close-btn");
    closebtn.addEventListener("click", () => {
      section.remove();
    });
  });
});
