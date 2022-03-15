import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__heading");
  }
  open({ item }) {
    this._image.src = item.link;
    this._image.alt = `${item.name} photo`;
    this._caption.textContent = item.name;
    super.open();
  }
}
