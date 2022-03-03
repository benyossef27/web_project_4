import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  settings,
  initialCards,
  popupProfileForm,
  popupProfileButton,
  addPlaceButton,
  profileJob,
  profileName,
  profileFormJobInput,
  profileFormNameInput,
  cardContainer,
  cardForm,
  profileForm,
  addPlacePopup,
  imagePreview,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

//////////////////////////////profile//////////////////////////////
const userInfo = new UserInfo(profileName, profileJob);

const popupEditProfile = new PopupWithForm(
  popupProfileForm,
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

function handleProfileFormSubmit() {
  userInfo.setUserInfo(popupEditProfile.getInputValues());
}

const popupProfile = new FormValidator(settings, profileForm);
popupProfile.enableValidation();

popupProfileButton.addEventListener("click", () => {
  popupProfile.resetValidation();

  const userNewInfo = userInfo.getUserInfo();
  profileFormNameInput.value = userNewInfo.name;
  profileFormJobInput.value = userNewInfo.job;
  popupEditProfile.open();
});

/////////////////////////////////card///////////////////////////

const popupAddCardForm = new PopupWithForm(
  addPlacePopup,
  handleAddCardFormSubmit
);
popupAddCardForm.setEventListeners();

function handleAddCardFormSubmit() {
  const newValues = popupAddCardForm.getInputValues();
  const item = {
    name: newValues.placeHeading,
    link: newValues.placeImage,
  };
  cardContainer.prepend(createCard({ item }));
  cardForm.reset();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard({ item }));
    },
  },
  ".cards"
);
cardList.renderItems();

const popupAddCard = new FormValidator(settings, cardForm);
popupAddCard.enableValidation();

function createCard({ item }) {
  const card = new Card(
    {
      item,
      handleCardClick: () => {
        popupImage.open({ item });
      },
    },
    ".card-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

addPlaceButton.addEventListener("click", () => {
  popupAddCard.resetValidation();
  popupAddCardForm.open();
});

//////////////////////////image/////////////////////////////
const popupImage = new PopupWithImage(imagePreview);
