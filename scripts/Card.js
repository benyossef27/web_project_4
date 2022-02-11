import { openPopup } from "./utils/utils.js";

export default class Card {
  constructor(card, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._cardImage.addEventListener("click", this._handlePreviewImage);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
  }

  _handleDeleteButton = () => {
    this._element.remove();
  };

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_black");
  };

  _handlePreviewImage = () => {
    this._openPopup(this._imagePreview);

    this._imageDisplayed.src = this._link;
    this._imageDisplayed.alt = this._name;
    this._imageDisplayedHeading.textContent = this._name;
  };
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardName = this._element.querySelector(".card__name");
    this._imagePreview = document.querySelector(".popup_type_preview");
    this._imageDisplayed = document.querySelector(".popup__image");
    this._imageDisplayedHeading = document.querySelector(
      ".popup__heading_type_preview"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
