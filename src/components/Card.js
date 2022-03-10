export default class Card {
  constructor({ item, handleCardClick, handelBinClick }, cardSelector, userId) {
    this._cardSelector = cardSelector;
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
    this._hadlebinClick = handelBinClick;
    this._likes = item.likes;
    this._id = item._id;
    this._userId = userId;
    this._ownerId = item.owner._id;
  }
  _countLike() {
    if (this._likes.length < 1) {
      this._likeCounter.textContent = "";
    } else {
      this._likeCounter.textContent = this._likes.length;
    }
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }
  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_black");
    this._handleLikeClick(this._id);
  };
  isLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._binButton.addEventListener("click", this._hadlebinClick);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._binButton = this._element.querySelector(".card__delete-button");
    this._deleteButton = document.querySelector(".popup__button_type_delete");
    this._cardImage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    // if (this._ownerId !== this._userId) {
    //   this._binButton.style.display = "none";
    // }

    if (this.isLiked()) {
      this.handleLikeCard(this._likes);
    }
    this._setEventListeners();
    return this._element;
  }
}
