export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.InputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.erorClass;

    this._form = formElement;
  }

  _showInputError(inputElement) {
    const errorSpan = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
    errorSpan.textContent = erorMessage.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorSpan = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = "";
  }

  _hasValidInputs = () =>
    this._inputList.some((input) => !input.validity.valid);

  _checkInputValidity(input) {
    if (input.validity.valid) this._hideInputError(inputElement);
    else this._showInputError(inputElement, errorSpan);
  }

  _toggleButton() {
    if (this._hasValidInputs()) {
      this._button.classList.add(popup__button_disabled);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(popup__button_disabled);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton();
      });
    });
  }

  resetValidation() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._inputList.forEach((inputElement) => {
      inputElement.value = "";
      this._showInputError(inputElement);
      this._toggleButton();
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => event.preventDefault());
    this._setEventListeners();
  }
}
