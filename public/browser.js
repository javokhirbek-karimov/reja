console.log("FrontEnd JS ishga tushdi");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal-delete");
const noDelete = document.getElementById("no-delete");
const yesDelete = document.getElementById("yes-delete");
let createField = document.getElementById("create-field");
let createForm = document.getElementById("create-form");

// Rejani ko'rsatish
function itemTamplete(item) {
  return `<li
          class="list-group-item list-group-item-action list-group-item-info d-flex align-items-center justify-content-between"
        >
          <span class="item-text">${item.reja}</span>
          <div>
          <span class="text-muted ml-2x  me-2">${item.time}</span>
            <button
              data-id="${item._id}"
              class="edit-me btn btn-outline-success btn-sm mr-1"
            >
              O‘zgartirish
            </button>
            <button
              data-id="${item._id}"
              class="delete-me btn btn-outline-danger btn-sm"
            >
              O‘chirish
            </button>
          </div>
        </li>`;
}

// Xatoni ko'rsatish
function noMessage(message) {
  document.getElementById("message-edit").textContent = message;

  createField.addEventListener("input", () => {
    document.getElementById("message-edit").textContent = "";
  });
  setTimeout(() => {
    document.getElementById("message-edit").textContent = "";
  }, 5000);
}

// Element qo'shish
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
      .catch((err) => {
        console.log("Iltimos, qaytadan harakat qiling");
      });
  } else {
    noMessage("Iltimos, reja kiriting");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-me")) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    yesDelete.addEventListener("click", () => {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((response) => {
          console.log(response.data);
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("Iltimos, qaytadan harakat qiling!");
        });

      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });

    noDelete.addEventListener("click", () => {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  }

  if (e.target.classList.contains("edit-me")) {
    alert("Siz edit tugmasini bosdingiz");
  }
});
