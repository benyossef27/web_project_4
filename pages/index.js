// import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
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
  cardTitleInput,
  cardImageInput,
  cardContainer,
  cardForm,
  profileForm,
  addPlacePopup,
  imagePreview,
  cardImage,
  cardHeading,
} from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

const popupEditProfile = new PopupWithForm(
  popupProfileForm,
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

const popupAddCardForm = new PopupWithForm(
  addPlacePopup,
  handleAddCardFormSubmit
);
popupAddCardForm.setEventListeners();

const popupImage = new PopupWithImage(imagePreview);
popupImage.setEventListeners();

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

const userInfo = new UserInfo({ profileName, profileJob });

//validators

const popupAddCard = new FormValidator(settings, cardForm);
popupAddCard.enableValidation();

const popupProfile = new FormValidator(settings, profileForm);
popupProfile.enableValidation();

//functions

function createCard({ item }) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (evt) => {
        popupImage.open(evt);
      },
    },
    ".card-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(popupEditProfile._getInputValues());
  popupEditProfile.close();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const getValues = popupAddCardForm._getInputValues();
  const item = { name: `${getValues.placeheading}`, link: `${getValues.img}` };
  cardContainer.prepend(createCard({ item }));
  cardForm.reset();
  popupAddCardForm.close();
}

//event listeners

popupProfileButton.addEventListener("click", () => {
  popupProfile.resetValidation();
  popupEditProfile.open();
  const userNewInfo = userInfo.getUserInfo();
  profileFormNameInput.value = userNewInfo.name;
  profileFormJobInput.value = userNewInfo.about;
});

addPlaceButton.addEventListener("click", () => {
  popupAddCard.resetValidation();
  popupAddCardForm.open();
});
