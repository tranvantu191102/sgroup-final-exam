let dataRender = [
  {
    id: 1,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "todo",
  },
  {
    id: 2,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "todo",
  },
  {
    id: 3,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "todo",
  },
  {
    id: 4,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "doing",
  },
  {
    id: 5,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "doing",
  },
  {
    id: 6,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "doing",
  },
  {
    id: 7,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "finished",
  },
  {
    id: 8,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "finished",
  },
  {
    id: 9,
    category: "Maketing",
    title: "Write SEO article for new product",
    content:
      "This is an existential moment for effective altruism and the rationalist community writ-large.",
    time: "June 30, 2022",
    type: "finished",
  },
];

// let dataRender = [];

const listTodoEl = document.querySelector(
  ".section-todo > .content__section__list"
);
const listDoingEl = document.querySelector(
  ".section-doing > .content__section__list"
);
const listFinishedEl = document.querySelector(
  ".section-finished > .content__section__list"
);

const newTaskEl = document.querySelector(".add_new-task");
const modalEditEl = document.querySelector(".modal-edit");
const modalAddEl = document.querySelector(".modal-add");
const formEditEl = document.querySelector(".form-edit");
const inputAddEls = document.querySelectorAll(".input-add");
const inputEditEls = document.querySelectorAll(".input-edit");
const inputRadioEls = document.querySelectorAll(".input-radio");

function render(id) {
  let htmlTodo = "";
  let htmlDoing = "";
  let htmlFinished = "";

  dataRender.forEach((data) => {
    const htmlTemp = `
        <div class="content__section__list__item">
        <div class="item-top">
          <div class="item-top__title">
            <h4>${data.category}</h4>
            <div>${data.title}</div>
          </div>
          <div class="item-top__btn">
            <button class="btn-edit" 
            onclick="handleEditItem(${data.id})"
            >
              <i class="bx bx-edit-alt"></i>
            </button>
            <button class="btn-delete" 
            onclick="handleDeleteItem(${data.id})"
            >
              <i class="bx bx-trash-alt"></i>
            </button>
          </div>
        </div>
        <div class="item-bottom">
          <p>
            ${data.content}
          </p>
          <div class="item-bottom__time">
            <i class="fa-regular fa-clock"></i>
            <span>${data.time}</span>
          </div>
        </div>
      </div>
        `;

    if (data.type === "todo") {
      htmlTodo += htmlTemp;
    }
    if (data.type === "doing") {
      htmlDoing += htmlTemp;
    }
    if (data.type === "finished") {
      htmlFinished += htmlTemp;
    }
  });

  if (id === "todo") {
    listTodoEl.innerHTML = htmlTodo;
    return;
  }

  if (id === "doing") {
    listTodoEl.innerHTML = htmlDoing;
    return;
  }

  if (id === "finished") {
    listTodoEl.innerHTML = htmlFinished;
    return;
  }

  listDoingEl.innerHTML = htmlDoing;
  listFinishedEl.innerHTML = htmlFinished;
  listTodoEl.innerHTML = htmlTodo;
}

render("all");

function handleDeleteItem(id) {
  const dataCopy = [...dataRender];
  dataRender = dataCopy.filter((data) => data.id !== id);
  render("all");
}

function handleOpenNewTask() {
  modalAddEl.classList.add("active");
}

function handleHiddenNewTask() {
  modalAddEl.classList.remove("active");
  hideCheckInputEmpty();
  document.querySelector('input[name="category"]').value = "";
  document.querySelector('input[name="title"]').value = "";
  document.querySelector('textarea[name="content"]').value = "";
}

newTaskEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.querySelector('input[name="category"]').value;
  const title = document.querySelector('input[name="title"]').value;
  const content = document.querySelector('textarea[name="content"]').value;

  inputAddEls.forEach((element) => {
    checkInputEmpty(element);
  });

  if (!category || !title || !content) {
    return;
  }

  const time = getCurrentTime();
  const data = {
    id: Math.floor(Math.random() * 1000000),
    category,
    title,
    content,
    time,
    type: "todo",
  };

  dataRender.push(data);
  render("todo");
  modalAddEl.classList.remove("active");
  document.querySelector('input[name="category"]').value = "";
  document.querySelector('input[name="title"]').value = "";
  document.querySelector('textarea[name="content"]').value = "";
});

function handleEditItem(id) {
  modalEditEl.classList.add("active");

  const data = dataRender.filter((item) => item.id === id);

  const category = document.querySelector('input[name="category-edit"]');
  const title = document.querySelector('input[name="title-edit"]');
  const content = document.querySelector('textarea[name="content-edit"]');
  const time = getCurrentTime();

  category.value = data[0].category;
  title.value = data[0].title;
  content.value = data[0].content;

  inputRadioEls.forEach((el) => {
    el.checked = el.name === data[0].type;
  });
  inputEditEls.forEach((element) => {
    element.addEventListener("blur", () => {
      checkInputEmpty(element);
    });
  });

  formEditEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.querySelector(
      'input[name="category-edit"]'
    ).value;
    const title = document.querySelector('input[name="title-edit"]').value;
    const content = document.querySelector(
      'textarea[name="content-edit"]'
    ).value;
    const type = document.querySelector("input:checked").name;

    if (!category || !title || !content || !type) {
      alert("Please enter your edit!");
      return;
    }

    dataRender.forEach((item) => {
      if (item.id === id) {
        item.category = category;
        item.title = title;
        item.content = content;
        item.time = time;
        item.type = type;
      }
    });
    render("all");
    modalEditEl.classList.remove("active");
  });
}

function handleHideModal() {
  modalEditEl.classList.remove("active");
  hideCheckInputEmpty();
}

function getCurrentTime() {
  const currentTime = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentTime.getDate();
  const month = monthNames[currentTime.getMonth()];
  const year = currentTime.getFullYear();

  return `${month} ${day}, ${year}`;
}

function checkInputEmpty(element) {
  if (!element.value) {
    element.classList.remove("input-not-empty");
    element.classList.add("input-empty");
    return;
  }
  element.classList.remove("input-empty");
  element.classList.add("input-not-empty");
}

inputAddEls.forEach((el) => {
  el.addEventListener("blur", () => {
    checkInputEmpty(el);
  });
});

function handleOnChangeType(type) {
  console.log(type);
  inputRadioEls.forEach((el) => {
    el.checked = false;
  });
  document.querySelector(`input[name="${type}"]`).checked = true;
}

function hideCheckInputEmpty() {
  const inputEmptyEls = document.querySelectorAll(".input-empty");
  const inputNotEmptyEls = document.querySelectorAll(".input-not-empty");
  if (inputEmptyEls) {
    inputEmptyEls.forEach((el) => {
      el.classList.remove("input-empty");
    });
  }
  if (inputNotEmptyEls) {
    inputNotEmptyEls.forEach((el) => {
      el.classList.remove("input-not-empty");
    });
  }
}
