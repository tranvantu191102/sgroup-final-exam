// let dataRender = [
//   {
//     id: 1,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "todo",
//   },
//   {
//     id: 2,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "todo",
//   },
//   {
//     id: 3,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "todo",
//   },
//   {
//     id: 4,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "doing",
//   },
//   {
//     id: 5,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "doing",
//   },
//   {
//     id: 6,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "doing",
//   },
//   {
//     id: 7,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "finished",
//   },
//   {
//     id: 8,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "finished",
//   },
//   {
//     id: 9,
//     category: "Maketing",
//     title: "Write SEO article for new product",
//     content:
//       "This is an existential moment for effective altruism and the rationalist community writ-large.",
//     time: "June 30, 2022",
//     type: "finished",
//   },
// ];

let dataRender = window.localStorage.getItem("data")
  ? JSON.parse(window.localStorage.getItem("data"))
  : [];

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
const quantityTodo = document.querySelector(
  ".content__section__title .quantity"
);
const quantityDoing = document.querySelector(
  ".content__section__title.doing .quantity"
);
const quantityFinished = document.querySelector(
  ".content__section__title.finished .quantity"
);
let idEdit;
render();
function render() {
  // dataRender = window.localStorage.getItem("data")
  //   ? JSON.parse(window.localStorage.getItem("data"))
  //   : [];
  let htmlTodo = "";
  let htmlDoing = "";
  let htmlFinished = "";
  let todoNum = 0;
  let doingNum = 0;
  let finishedNum = 0;

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
      todoNum += 1;
    }
    if (data.type === "doing") {
      htmlDoing += htmlTemp;
      doingNum += 1;
    }
    if (data.type === "finished") {
      htmlFinished += htmlTemp;
      finishedNum += 1;
    }
  });

  quantityTodo.innerHTML = todoNum;
  quantityDoing.innerHTML = doingNum;
  quantityFinished.innerHTML = finishedNum;
  listDoingEl.innerHTML = htmlDoing;
  listFinishedEl.innerHTML = htmlFinished;
  listTodoEl.innerHTML = htmlTodo;
}

function handleDeleteItem(id) {
  const dataCopy = [...dataRender];
  dataRender = dataCopy.filter((data) => data.id !== id);
  window.localStorage.setItem("data", JSON.stringify(dataRender));
  render();
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
  window.localStorage.setItem("data", JSON.stringify(dataRender));
  modalAddEl.classList.remove("active");
  document.querySelector('input[name="category"]').value = "";
  document.querySelector('input[name="title"]').value = "";
  document.querySelector('textarea[name="content"]').value = "";
  hideCheckInputEmpty();
  render();
});
formEditEl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (idEdit) {
    const categoryEdit = document.querySelector(
      'input[name="category-edit"]'
    ).value;
    const titleEdit = document.querySelector('input[name="title-edit"]').value;
    const contentEdit = document.querySelector(
      'textarea[name="content-edit"]'
    ).value;
    const type = document.querySelector("input:checked").name;
    const time = getCurrentTime();

    if (!categoryEdit || !titleEdit || !contentEdit || !type) {
      alert("Please enter your edit!");
      return;
    }

    dataRender = dataRender.map((item) => {
      if (item.id === idEdit) {
        console.log("haha", idEdit);
        const newData = {
          ...item,
          category: categoryEdit,
          title: titleEdit,
          content: contentEdit,
          time,
          type,
        };
        return newData;
      }
      return item;
    });
    // const newData = {
    //   id: id,
    //   category: categoryEdit,
    //   title: titleEdit,
    //   content: contentEdit,
    //   time,
    //   type,
    // };
    // dataRender = [...dataRender, newData];
    window.localStorage.setItem("data", JSON.stringify(dataRender));
    modalEditEl.classList.remove("active");
    hideCheckInputEmpty();
    render();
  }
});

function handleEditItem(id) {
  modalEditEl.classList.add("active");
  idEdit = id;

  const data = dataRender.filter((item) => item.id === id);
  // dataRender = dataRender.filter((item) => item.id !== id);

  document.querySelector('input[name="category-edit"]').value =
    data[0].category;
  document.querySelector('input[name="title-edit"]').value = data[0].title;
  document.querySelector('textarea[name="content-edit"]').value =
    data[0].content;

  inputRadioEls.forEach((el) => {
    el.checked = el.name === data[0].type;
  });
  inputEditEls.forEach((element) => {
    element.addEventListener("blur", () => {
      checkInputEmpty(element);
    });
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
