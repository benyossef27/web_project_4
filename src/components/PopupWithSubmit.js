import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement, handleSubmit) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
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
