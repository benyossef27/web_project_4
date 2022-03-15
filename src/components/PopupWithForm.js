import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleSubmit, buttonText) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._button = this._form.querySelector(".popup__button");
    this._buttonText = buttonText;
  }

  saving() {
    this._button.textContent = "saving...";
  }
  hideSaving() {
    this._button.textContent = this._buttonText;
  }
  getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
