import FormValidator from "./formValidator.js";
import Card from "./card.js";
import { openPopup, closePopup } from "./utils/utils.js";
import * as constant from "./utils/constants.js";

///card related functions///
//send cards to container

const randerCard = (card) => {
  constant.cardContainer.prepend(card);
};

//use initial cards
constant.initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card-template", openPopup);
  randerCard(card.generateCard());
});

const cardFormValidator = new FormValidator(
  constant.settings,
  constant.cardForm
);
cardFormValidator.enableValidation();

//function to open card form
constant.addPlaceButton.addEventListener("click", () => {
  openPopup(constant.addPlacePopup);
  cardFormValidator.resetValidation();
});

//function to close card form
constant.closeAddPlaceButton.addEventListener("click", () =>
  closePopup(constant.addPlacePopup)
);

//form submit
constant.cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: constant.cardTitleInput.value,
    link: constant.cardImageInput.value,
  };

  const card = new Card(newCard, "#card-template", openPopup);
  randerCard(card.generateCard());
  constant.cardForm.reset();
  cardFormValidator.resetValidation();
  closePopup(constant.addPlacePopup);
});

///profile form function///

const profileFormValidator = new FormValidator(
  constant.settings,
  constant.profileForm
);
profileFormValidator.enableValidation();

//opening profile form
constant.popupProfileButton.addEventListener("click", () => {
  openPopup(constant.popupProfileForm);
  constant.profileFormNameInput.value = constant.profileName.textContent;
  constant.profileFormJobInput.value = constant.profileJob.textContent;
});

//closing profile form window without submit
constant.popupProfileClose.addEventListener("click", () =>
  closePopup(constant.popupProfileForm)
);
constant.previewClose.addEventListener("click", () =>
  closePopup(constant.imagePreview)
);

//submitting & closing profile form
function submitProfileFrom(event) {
  event.preventDefault();
  constant.profileName.textContent = constant.profileFormNameInput.value;
  constant.profileJob.textContent = constant.profileFormJobInput.value;
  closePopup(constant.popupProfileForm);
}
//listner submit button
constant.profileForm.addEventListener("submit", submitProfileFrom);

export { randerCard };
