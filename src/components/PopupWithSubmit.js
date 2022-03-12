import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement, handleDeleteCardSubmit) {
    super(popupElement);
    this._handleSubmit = handleDeleteCardSubmit;
  }

  openWithCardInfo(data) {
    super.open();
    this._data = data;
  }

  close() {
    super.close();
  }
  SetEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._data);
      this.close();
    });
  }
}
