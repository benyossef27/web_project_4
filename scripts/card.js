import { openPopup, closePopup } from "./utils.js";

export default class Card {
  constructor(card, cardSelector, openPopup) {
    this._name = card.mame;
    this._link = card.link;
    this._openPopup = openPopup;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeButton);

    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardImage);

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton());

    this._element.querySelector("popup_opened");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handleLikeButton = () => {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_black");
  };

  _handleCardImage = () => {
    const imagePreview = document.querySelector(".popup_type_preview");
    const imageDisplayed = document.querySelector(".popup__image");
    const imageDisplayedHeading = document.querySelector(
      ".popup__heading_type_preview"
    );

    this._openPopup(imagePreview);

    imageDisplayed.src = this._link;
    imageDisplayed.alt = this._name;
    imageDisplayedHeading.textContent = this._name;
  };

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
