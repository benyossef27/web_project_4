export default class Card {
  constructor({ item, handleCardClick }, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
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
    this._cardimage.addEventListener("click", this._handleCardClick);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardimage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__name").textContent = this._name;
    this._cardimage.src = `${this._link}`;
    this._cardimage.alt = `${this._name}`;
    this._setEventListeners();
    return this._element;
  }
}
