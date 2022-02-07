import FormValidator from "./formValidator.js";
import Card from "./card.js";
import { openPopup, closePopup } from "./utils.js";

//popup open & close realted
const popupProfileForm = document.querySelector(".popup_type_profile");
const popupProfileButton = document.querySelector(".profile__popup-button");
const popupProfileClose = document.querySelector(".popup__close_type_profile");
const addPlacePopup = document.querySelector(".popup_type_place");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeAddPlaceButton = document.querySelector(".popup__close_type_place");

//text content submition related
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
//const submitCardButton = document.querySelector(".popup__button_type_place");

//forms
const profileForm = document.querySelector(".popup__form_type_profile");
const profileFormNameInput = profileForm.elements.name;
const profileFormJobInput = profileForm.elements.job;
const cardTitleInput = addPlacePopup.querySelector(
  ".popup__input_field_heading"
);
const cardImageInput = addPlacePopup.querySelector(".popup__input_field_img");
const cardForm = document.querySelector(".popup__form_type_place");

//cards
const cardContainer = document.querySelector(".cards");
const imagePreview = document.querySelector(".popup_type_preview");
const previewClose = document.querySelector(".popup__close_type_preview");
const imageDisplayed = document.querySelector(".popup__image");
const imageDisplayedHeading = document.querySelector(
  ".popup__heading_type_preview"
);

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  imagePreview: ".popup_type_preview",
};

///card related functions///
//send cards to container

const randerCard = (card) => {
  document.querySelector(".cards").prepend(card);
};

//use initial cards
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card-template", openPopup);
  randerCard(card.generateCard());
});

const cardFormValidator = new FormValidator(settings, cardForm);
cardFormValidator.enableValidation();

//function to open card form
addPlaceButton.addEventListener("click", () => {
  openPopup(addPlacePopup), cardFormValidator.resetValidation();
});

//function to close card form
closeAddPlaceButton.addEventListener("click", () => closePopup(addPlacePopup));

//form submit
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardImageInput.value };

  const card = new Card(newCard, "#card-template", openPopup);
  randerCard(card.generateCard());
  cardForm.reset();
  closePopup(addPlacePopup);
});

///profile form function///

const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

//opening profile form
popupProfileButton.addEventListener("click", () => {
  openPopup(popupProfileForm);
  profileFormNameInput.value = profileName.textContent;
  profileFormJobInput.value = profileJob.textContent;
});

//closing profile form window without submit
popupProfileClose.addEventListener("click", () => closePopup(popupProfileForm));
previewClose.addEventListener("click", () => closePopup(imagePreview));

//submitting & closing profile form
function submitProfileFrom(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileJob.textContent = profileFormJobInput.value;
  closePopup(popupProfileForm);
}
//listner submit button
profileForm.addEventListener("submit", submitProfileFrom);

export { settings, randerCard };
