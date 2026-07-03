const themeButtons = document.querySelectorAll("[data-theme-option]");
const programButtons = document.querySelectorAll("[data-program]");
const pickerButton = document.querySelector("[data-open-picker]");
const form = document.querySelector(".lead-form");
const programInput = form?.elements.program;
const formMessage = document.querySelector(".form-message");

function scrollToForm() {
  document.querySelector("#form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.themeOption;
    document.body.dataset.theme = theme;

    themeButtons.forEach((item) => {
      const isCurrent = item === button;
      item.classList.toggle("is-active", isCurrent);
      item.setAttribute("aria-pressed", String(isCurrent));
    });
  });
});

programButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (programInput) {
      programInput.value = button.dataset.program || "";
    }

    if (formMessage) {
      formMessage.textContent = `Выбрана программа: ${programInput.value}. Заполните контакты, и подбор будет готов.`;
      formMessage.classList.remove("error");
    }

    scrollToForm();
  });
});

pickerButton?.addEventListener("click", scrollToForm);

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formMessage.textContent = "Заполните имя, контакт, цель и программу.";
    formMessage.classList.add("error");
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const name = String(formData.get("name")).trim();
  const goal = String(formData.get("goal")).trim();
  const program = String(formData.get("program")).trim();
  const place = String(formData.get("place")).trim();

  formMessage.textContent = `${name}, заявка принята: ${program}, ${place.toLowerCase()}, цель - ${goal.toLowerCase()}.`;
  formMessage.classList.remove("error");
  form.reset();

  if (programInput) {
    programInput.value = program;
  }
});
