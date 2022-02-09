import FormValidator from "./formValidator.js";
import Card from "./card.js";
import { openPopup, closePopup } from "./utils/utils.js";
import * as constant from "./utils/constants.js";

///card related functions///
//send cards to container

const renderCard = (card) => {
  constant.cardContainer.prepend(card);
};

//use initial cards
constant.initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card-template", openPopup);
  renderCard(card.generateCard());
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

//form submit
constant.cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: constant.cardTitleInput.value,
    link: constant.cardImageInput.value,
  };

  const card = new Card(newCard, "#card-template", openPopup);
  renderCard(card.generateCard());
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

//listener to closing all popups
constant.popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//submitting & closing profile form
function submitProfileFrom(event) {
  event.preventDefault();
  constant.profileName.textContent = constant.profileFormNameInput.value;
  constant.profileJob.textContent = constant.profileFormJobInput.value;
  closePopup(constant.popupProfileForm);
}
//listner submit button
constant.profileForm.addEventListener("submit", submitProfileFrom);

export { renderCard };
