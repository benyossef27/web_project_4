import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open({ item }) {
    this.image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__heading");
    this.image.src = item.link;
    this.image.alt = `${item.name} photo`;
    this._caption.textContent = item.name;
    super.open();
  }
}
