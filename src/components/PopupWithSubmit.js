import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }
  open(data) {
    super.open();
    this._data = data;
  }

  close() {
    super.close();
  }
}
