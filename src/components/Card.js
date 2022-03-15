export default class Card {
  constructor(
    { item, handleCardClick, handleDeleteButton, handleLikeButton },
    cardSelector,
    userId
  ) {
    this._cardSelector = cardSelector;
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
    this._id = item._id;
    this._userId = userId;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }
  _crossId(data) {
    if (this._ownerId !== data._id) {
      this._binButton.style.display = "none";
    }
  }

  checkForLikes() {
    return this._likes.some((like) => like._id === this._userId);
  }
  handleLike = (newLikes) => {
    this._likes = newLikes;
    this._renderLikes();
  };
  _renderLikes() {
    this._likeCounter.textContent = this._likes.length;
    if (this.checkForLikes()) {
      this._likeButton.classList.add("card__like-button_black");
    } else {
      this._likeButton.classList.remove("card__like-button_black");
    }
  }

  deleteCard(_id) {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeButton(this._id)
    );
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._binButton.addEventListener("click", () => {
      this._handleDeleteButton(this._id);
    });
  }
  generateCard(data) {
    this._element = this._getTemplate();
    this._element.id = this._id;
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._binButton = this._element.querySelector(".card__delete-button");
    this._deleteButton = document.querySelector(".popup__button_type_delete");
    this._cardImage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._crossId(data);
    this._renderLikes();
    this._setEventListeners();
    return this._element;
  }
}
