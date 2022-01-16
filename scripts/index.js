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
const submitButton = document.querySelector(".popup__button");

//forms
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormJobInput = profileForm.elements.job;
const cardTitleInput = addPlacePopup.querySelector(".popup__input_field_heading");
const cardImageInput = addPlacePopup.querySelector(".popup__input_field_img");
const cardForm = addPlacePopup.querySelector(".popup__form_type_place");

//cards
const cardTemplate = document.querySelector(".card-template").content.querySelector(".card");
const cardContainer = document.querySelector(".cards");
const createCard = document.querySelector(".popup__button_type_place");
const imagePreview = document.querySelector(".popup_type_preview");
const previewClose = document.querySelector(".popup__close_type_preview");
const imageDisplayed = document.querySelector(".popup__image");
const imageDisplayedHeading = document.querySelector(
  ".popup__heading_type_preview"
);

//opening popup window
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handlePopupCloseOnEsc);
  
}

//generic popup closing funcrion
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", handleOverlayClick);
  popup.removeEventListener("keydown", handlePopupCloseOnEsc);
}

//clsoe pupup on Esc
function handlePopupCloseOnEsc(event) {
  const popup = document.querySelector(".popup_opened");
  if (event.key === "Escape"){
    closePopup(popup);
}}


//close popup when clicking outside
function handleOverlayClick(event) {
  closePopup(event.target);
}


///profile form function///
//opening profile form
popupProfileButton.addEventListener("click", () => {
  openPopup(popupProfileForm);
  profileFormNameInput.value = profileName.textContent;
  profileFormJobInput.value = profileJob.textContent;
});

//closing profile form window without submit
popupProfileClose.addEventListener("click", () => closePopup(popupProfileForm));

//submitting & closing profile form
function submitProfileFrom(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileJob.textContent = profileFormJobInput.value;
  closePopup(popupProfileForm);
}
//listner submit button
profileForm.addEventListener("submit", submitProfileFrom);

///card related functions///

//function to open card form
addPlaceButton.addEventListener("click", () => openPopup(addPlacePopup));

//function to close card form
closeAddPlaceButton.addEventListener("click", () => closePopup(addPlacePopup));

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

//form submit
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardContainer.prepend(
    createCardElement({
      name: cardTitleInput.value,
      link: cardImageInput.value,
    })
  );
  cardForm.reset();
  closePopup(addPlacePopup);
});
//generating cards from form
function createCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDelete = cardElement.querySelector(".card__delete-button");
  const cardLike = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  //open preview picture
  cardImage.addEventListener("click", function () {
    imageDisplayed.src = card.link;
    imageDisplayed.alt = card.name;
    imageDisplayedHeading.textContent = card.name;
    openPopup(imagePreview);
  });

  //close preview picture
  previewClose.addEventListener("click", () => closePopup(imagePreview));

  //like and unlike cards
  cardLike.addEventListener("click", () => {
    cardLike.classList.toggle("card__like-button_black");
  });

  //deleting cards
  cardDelete.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

//send cards to container
function randerCard(card, cardContainer) {
  cardContainer.append(createCardElement(card));
}
//use initial cards
initialCards.forEach((card) => randerCard(card, cardContainer));
