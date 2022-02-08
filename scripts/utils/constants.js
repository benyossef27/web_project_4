//popup open & close realted
export const popupProfileForm = document.querySelector(".popup_type_profile");
export const popupProfileButton = document.querySelector(
  ".profile__popup-button"
);
export const popupProfileClose = document.querySelector(
  ".popup__close_type_profile"
);
export const addPlacePopup = document.querySelector(".popup_type_place");
export const addPlaceButton = document.querySelector(".profile__add-button");
export const closeAddPlaceButton = document.querySelector(
  ".popup__close_type_place"
);

//text content submition related
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
//const submitCardButton = document.querySelector(".popup__button_type_place");

//forms
export const profileForm = document.querySelector(".popup__form_type_profile");
export const profileFormNameInput = profileForm.elements.name;
export const profileFormJobInput = profileForm.elements.job;
export const cardTitleInput = addPlacePopup.querySelector(
  ".popup__input_field_heading"
);
export const cardImageInput = addPlacePopup.querySelector(
  ".popup__input_field_img"
);
export const cardForm = document.querySelector(".popup__form_type_place");

//cards
export const cardContainer = document.querySelector(".cards");
export const imagePreview = document.querySelector(".popup_type_preview");
export const previewClose = document.querySelector(
  ".popup__close_type_preview"
);
export const imageDisplayed = document.querySelector(".popup__image");
export const imageDisplayedHeading = document.querySelector(
  ".popup__heading_type_preview"
);

export const initialCards = [
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

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  imagePreview: ".popup_type_preview",
};
