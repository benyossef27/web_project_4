import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._data = {};
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }
}
