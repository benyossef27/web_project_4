import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  settings,
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
  popupAvatar,
  formAvatar,
  popupAvatarEdit,
  profileAvatar,
  avatarImageInput,
  popupCardDelete,
  cardLikeCounter,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit";
import { api } from "../components/Api.js";

//////////////////////////////profile//////////////////////////////
const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

api.getUserInfo().then((info) => {
  userInfo.setUserInfo(info);
  userInfo.setUserAvatar(info.avatar);
});

const popupEditProfile = new PopupWithForm(
  popupProfileForm,
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

function handleProfileFormSubmit() {
  api.setUserInfo(popupEditProfile.getInputValues()).then((info) => {
    userInfo.setUserInfo(info);
  });
}

const popupProfile = new FormValidator(settings, profileForm);
popupProfile.enableValidation();

popupProfileButton.addEventListener("click", () => {
  popupProfile.resetValidation();

  const userNewInfo = userInfo.getUserInfo();
  profileFormNameInput.value = userNewInfo.name;
  profileFormJobInput.value = userNewInfo.about;
  popupEditProfile.open();
});
/////////////////////////avatar////////////////////
const popupUserAvatar = new PopupWithForm(popupAvatar, handleAvatarSubmit);
popupUserAvatar.setEventListeners();

function handleAvatarSubmit() {
  const data = popupUserAvatar.getInputValues();
  api.setUserAvatar(data).then((res) => console.log(res));

  // userInfo.setUserAvatar(popupUserAvatar.getInputValues());
}
const avatarFromValidation = new FormValidator(settings, formAvatar);
avatarFromValidation.enableValidation();

popupAvatarEdit.addEventListener("click", () => {
  avatarFromValidation.resetValidation();
  const newAvatar = userInfo.getUserAvatar();
  avatarImageInput.src = newAvatar.avatar;
  popupUserAvatar.open();
});

/////////////////////////////////card///////////////////////////
api.getInitialCards().then((res) => {
  cardList.renderItems(res);
});

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
  api.createCard(item).then((item) => {
    cardList.addItem(createCard({ item }));
  });
  cardForm.reset();
}

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard({ item }));
    },
  },
  ".cards"
);

const popupAddCard = new FormValidator(settings, cardForm);
popupAddCard.enableValidation();

function createCard({ item }) {
  const card = new Card(
    {
      item,
      handleCardClick: () => {
        popupImage.open({ item });
      },
      handelBinClick: () => {
        cardDeletePopup.open();
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

////////////////////// card delete ///////////////////
const cardDeletePopup = new PopupWithSubmit(popupCardDelete);
cardDeletePopup.SetEventListeners();

//////////////////////////image/////////////////////////////
const popupImage = new PopupWithImage(imagePreview);
