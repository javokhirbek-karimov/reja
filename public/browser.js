console.log("FrontEnd JS ishga tushdi");
const overlay = document.getElementById("overlay");
const modalDelete = document.getElementById("modal-delete");
const modalEdit = document.getElementById("modal-edit");
const noDelete = document.getElementById("no-delete");
const yesDelete = document.getElementById("yes-delete");
const saveChangeBtn = document.querySelector("#save-change button"); // form ichidagi button
const inputChange = document.getElementById("input-edit");
const deleteAll = document.getElementById("clean-all");

let createField = document.getElementById("create-field");
let createForm = document.getElementById("create-form");
let currentEditId = null;

function itemTamplete(item) {
  return `<li class="list-group-item list-group-item-action list-group-item-info d-flex align-items-center justify-content-between">
      <span class="item-text">${item.reja}</span>
      <div>
        <span class="text-muted ml-2x me-2">${item.time}</span>
        <button data-id="${item._id}" class="edit-me btn btn-outline-success btn-sm mr-1">O‘zgartirish</button>
        <button data-id="${item._id}" class="delete-me btn btn-outline-danger btn-sm">O‘chirish</button>
      </div>
    </li>`;
}

function noMessage(where, message) {
  document.getElementById(where).textContent = message;
  setTimeout(() => {
    document.getElementById(where).textContent = "";
  }, 5000);
}

createForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (createField.value.trim()) {
    axios
      .post("/create-item", { reja: createField.value.trim() })
      .then((response) => {
        document
          .getElementById("item-list")
          .insertAdjacentHTML("beforeend", itemTamplete(response.data));
        createField.value = "";
        createField.focus();
      })
      .catch((err) => console.log("Iltimos, qaytadan harakat qiling"));
  } else {
    noMessage("message-edit", "Iltimos, reja kiriting");
  }
});

overlay.addEventListener("click", () => {
  modalEdit.classList.add("hidden");
  modalDelete.classList.add("hidden");
  overlay.classList.add("hidden");
  currentEditId = null;
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-me")) {
    modalDelete.classList.remove("hidden");
    overlay.classList.remove("hidden");
    currentEditId = e.target.getAttribute("data-id");

    yesDelete.onclick = () => {
      axios.post("/delete-item", { id: currentEditId }).then(() => {
        document
          .querySelector(`[data-id="${currentEditId}"]`)
          .parentElement.parentElement.remove();
        modalDelete.classList.add("hidden");
        overlay.classList.add("hidden");
      });
    };

    noDelete.onclick = () => {
      modalDelete.classList.add("hidden");
      overlay.classList.add("hidden");
    };
  }

  if (e.target.classList.contains("edit-me")) {
    modalEdit.classList.remove("hidden");
    overlay.classList.remove("hidden");
    currentEditId = e.target.getAttribute("data-id");
    inputChange.value =
      e.target.parentElement.parentElement.querySelector(
        ".item-text"
      ).textContent;
    inputChange.focus();
  }
});

saveChangeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentEditId) return;
  if (!inputChange.value.trim()) {
    noMessage("edit-message", "Iltimos, reja nomini o'zgartiring!");
    return;
  }

  axios
    .post("/edit-item", { id: currentEditId, new_input: inputChange.value })
    .then(() => {
      document
        .querySelector(`[data-id="${currentEditId}"]`)
        .parentElement.parentElement.querySelector(".item-text").textContent =
        inputChange.value;
      modalEdit.classList.add("hidden");
      overlay.classList.add("hidden");
      currentEditId = null;
    })
    .catch(() => console.log("Iltimos, qaytadan harakat qiling!"));
});

deleteAll.addEventListener("click", () => {
  axios.post("/delete-all", { delete_all: true }).then((response) => {
    alert(response.data.state);
    document.location.reload();
  });
});
