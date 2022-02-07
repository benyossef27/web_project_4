class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings._formSelector;
    this._inputSelector = settings.InputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.erorClass;

    this._form = formElement;
  }

  _showInputError(errorUnderLine) {
    const errorSpan = this._form.querySelector("#" + input.id + "-error");
    errorUnderLine.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
    errorSpan.textContent = erorMessage.validationMessage;
  }

  _hideInputError(errorUnderLine) {
    const errorSpan = this._form.querySelector("#" + input.id + "-error");
    errorUnderLine.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = "";
  }

  _hasValidInputs = () =>
    this._inputList.some((input) => !input.validity.valid);

  _checkInputValidity(input) {
    if (input.validity.valid) this._hideInputError(errorUnderLine);
    else this._showInputError(errorUnderLine, errorSpan);
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
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(errorUnderLine);
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

export default FormValidator;
