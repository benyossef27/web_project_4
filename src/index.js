import "./pages/index.css";
import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
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
} from "./scripts/utils/constants.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import { add } from "lodash";

//////////////////////////////profile//////////////////////////////
const userInfo = new UserInfo(profileName, profileJob);

const popupEditProfile = new PopupWithForm(
  popupProfileForm,
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

function handleProfileFormSubmit() {
  userInfo.setUserInfo(popupEditProfile._getInputValues());
}

const popupProfile = new FormValidator(settings, profileForm);
popupProfile.enableValidation();

popupProfileButton.addEventListener("click", () => {
  popupProfile.resetValidation();
  popupEditProfile.open();
  const userNewInfo = userInfo.getUserInfo();
  profileFormNameInput.value = userNewInfo.name;
  profileFormJobInput.value = userNewInfo.job;
});

/////////////////////////////////card///////////////////////////

const popupAddCardForm = new PopupWithForm(
  addPlacePopup,
  handleAddCardFormSubmit
);
popupAddCardForm.setEventListeners();

const initialGallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      initialGallery.addItem(createCard({ item }));
    },
  },
  ".cards"
);
initialGallery.renderItems();

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

function handleAddCardFormSubmit() {
  const Values = popupAddCardForm._getInputValues();
  const item = {
    name: Values.placeheading,
    link: Values.placeimage,
  };
  console.log(item);
  cardContainer.prepend(createCard({ item }));
  cardForm.reset();
}

addPlaceButton.addEventListener("click", () => {
  popupAddCard.resetValidation();
  popupAddCardForm.open();
});

//////////////////////////image/////////////////////////////
const popupImage = new PopupWithImage(imagePreview);
popupImage.setEventListeners();
