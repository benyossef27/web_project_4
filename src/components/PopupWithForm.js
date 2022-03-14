import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleSubmit) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._button = this._form.querySelector(".popup__button");
  }

  saving = () => {
    this._button.textContent = "saving...";
  };
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
      this.close();
    });
  }
}
