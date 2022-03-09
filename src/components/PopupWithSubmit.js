import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }
  close() {
    super.close();
  }
  SetEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }
}
