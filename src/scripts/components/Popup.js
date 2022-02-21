export default class Popup {
  constructor(popupSelector) {
    console.log(popupSelector);
    this._popupElement = popupSelector;
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  open() {
    this._popupElement.classList.add(".popup_opened");
  }
  close() {
    this._popupElement.classList.remove(".popup_opened");
  }
  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".popup__close");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(".popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
