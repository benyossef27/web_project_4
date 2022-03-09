import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  SetEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }
}
