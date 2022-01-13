const showInputError = (input, formElement) => {
  const errorSpan = formElement.querySelector("#" + input.id + "-error");
  const errorUnderLine = formElement.querySelector("#" + input.id);
  errorUnderLine.classList.add("popup__input_type_error");
  errorSpan.classList.add("popup__error_visible");
  errorSpan.textContent = input.validationMessage;
};

const hideInputError = (input, formElement) => {
  const errorSpan = formElement.querySelector("#" + input.id + "-error");
  const errorUnderLine = formElement.querySelector("#" + input.id);
  errorUnderLine.classList.remove("popup__input_type_error");
  errorSpan.classList.remove("popup__error_visible");
  errorSpan.textContent = "";
};

const checkInputValidity = (formElement, input) => {
  if (input.validity.valid) {
    hideInputError(input, formElement);
  } else {
    showInputError(input, formElement);
  }
};

const hasValidInputs = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButton = (inputList, button) => {
  if (hasValidInputs(inputList)) {
    button.classList.add("popup__button_disabled");
    button.disable = true;
  } else {
    button.classList.remove("popup__button_disabled");
    button.disable = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  const button = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(formElement, input, settings);
      toggleButton(inputList, button, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
