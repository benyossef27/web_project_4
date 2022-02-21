export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._name = this._data.name;
    this._link = this._data.link;
    this.handleCardClick = handleCardClick;
  }
  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_black");
  }
  _handleDeleteButton() {
    const card = this._element;
    card.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._cardimage.addEventListener("click", this.handleCardClick);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardimage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__name").textContent = this._name;
    this._cardimage.src = `${this._link}`;
    this._cardimage.alt = `${this._name}`;
    this._setEventListeners();
    return this._element;
  }
}
