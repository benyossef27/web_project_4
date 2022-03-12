export default class Card {
  constructor(
    { item, handleCardClick },
    handellikeClick,
    handelBinClick,
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._handleCardClick = handleCardClick;
    this._hadlebinClick = handelBinClick;
    this._handleLikeClick = handellikeClick;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }
  _crossId(data) {
    console.log(this._ownerId, data._id);
    if (this._ownerId !== data._id) {
      this._binButton.style.display = "none";
    }
  }
  _countLikes() {
    if (this._likes.length < 1) {
      this._likeCounter.textContent = "";
    } else {
      this._likeCounter.textContent = this._likes.length;
    }
  }
  _checkForLikes(data) {
    if (this._likes.some((item) => item._id == data._id)) {
      this._likeButton.classList.add("card__like-button_black");
    }
  }
  _handleLikeButton = () => {
    this._handleLikeClick(this);
  };
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._binButton.addEventListener("click", this._hadlebinClick);
  }
  generateCard(data) {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._binButton = this._element.querySelector(".card__delete-button");
    this._deleteButton = document.querySelector(".popup__button_type_delete");
    this._cardImage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._crossId(data);
    this._checkForLikes(data);
    this._countLikes();
    this._setEventListeners();
    return this._element;
  }
}
