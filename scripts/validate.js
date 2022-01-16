const showInputError = (
  input,
  formElement,
  { errorClass, inputErrorClass }
) => {
  const errorSpan = formElement.querySelector("#" + input.id + "-error");
  const errorUnderLine = formElement.querySelector("#" + input.id);
  errorUnderLine.classList.add(inputErrorClass);
  errorSpan.classList.add(errorClass);
  errorSpan.textContent = input.validationMessage;
};

const hideInputError = (
  input,
  formElement,
  { errorClass, inputErrorClass }
) => {
  const errorSpan = formElement.querySelector("#" + input.id + "-error");
  const errorUnderLine = formElement.querySelector("#" + input.id);
  errorUnderLine.classList.remove(inputErrorClass);
  errorSpan.classList.remove(errorClass);
  errorSpan.textContent = "";
};

const checkInputValidity = (formElement, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formElement, settings);
  } else {
    showInputError(input, formElement, settings);
  }
};

const hasValidInputs = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButton = (inputList, button, { inactiveButtonClass }) => {
  if (hasValidInputs(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
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

function enableValidation(settings) {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
