//profile related
export const popupProfileForm = document.querySelector(".popup_type_profile");
export const popupProfileButton = document.querySelector(
  ".profile__popup-button"
);
export const popupProfileClose = document.querySelector(
  ".popup__close_type_profile"
);
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const formAvatar = document.querySelector(".popup__form_type_avatar");
export const profileAvatar = document.querySelector(".profile__avatar");
export const popupAvatarEdit = document.querySelector(".profile__avatar-box");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const profileForm = document.querySelector(".popup__form_type_profile");
export const profileFormNameInput = profileForm.elements.name;
export const profileFormJobInput = profileForm.elements.about;

//card related
export const addPlacePopup = document.querySelector(".popup_type_place");
export const addPlaceButton = document.querySelector(".profile__add-button");
export const closeAddPlaceButton = document.querySelector(
  ".popup__close_type_place"
);
export const cardTitleInput = addPlacePopup.querySelector(
  ".popup__input_field_heading"
);
export const cardImageInput = addPlacePopup.querySelector(
  ".popup__input_field_img"
);
export const cardForm = document.querySelector(".popup__form_type_place");
export const avatarImageInput = formAvatar.querySelector(
  ".popup__input_field_img"
);
export const cardTemplate = document.querySelector("#card-template").content;
export const cardContainer = document.querySelector(".cards");
export const imagePreview = document.querySelector(".popup_type_preview");
export const previewClose = document.querySelector(
  ".popup__close_type_preview"
);
export const cardImage = document.querySelector(".popup__image");
export const cardHeading = document.querySelector(".popup__heading");
export const popupCardDelete = document.querySelector(".popup_type_delete");
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
// popup related
export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  imagePreview: ".popup_type_preview",
};
export const popups = document.querySelectorAll(".popup");
