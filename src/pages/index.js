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
import { data } from "jquery";

//////////////////////////////profile//////////////////////////////
const popupEditProfile = new PopupWithForm(
  popupProfileForm,
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

const popupProfile = new FormValidator(settings, profileForm);
popupProfile.enableValidation();

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

let newInfo = {};

api.getUserInfo().then((info) => {
  userInfo.setUserInfo(info);
  userInfo.setUserAvatar(info.avatar);
  newInfo = info;
  return newInfo;
});

function handleProfileFormSubmit() {
  api.setUserInfo(popupEditProfile.getInputValues()).then((info) => {
    userInfo.setUserInfo(info);
    popupEditProfile.saving();
  });
}

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
  api.setUserAvatar(data.avatarImage).then((res) => {
    userInfo.setUserAvatar(res.avatar);
  });
  popupUserAvatar.saving();
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
///cards from server//
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard({ item }));
    },
  },
  ".cards"
);

api
  .getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
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
  popupAddCardForm.saving();
  cardForm.reset();
}

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
    handleLikeClick,
    handleBinClick,
    ".card-template"
  );
  const cardElement = card.generateCard(newInfo);
  return cardElement;
}
function handleBinClick(id) {
  cardDeletePopup.openWithCardInfo(id);
}
addPlaceButton.addEventListener("click", () => {
  popupAddCard.resetValidation();
  popupAddCardForm.open();
});

function handleLikeClick(data) {
  api
    .unLikeCard(data)
    .then((res) => {
      data._likeCounter.textContent = res.likes.length;
      data._likeButton.classList.remove("card__like-button_black");
    })
    .catch(
      api.likeCard(data).then((res) => {
        data._likeCounter.textContent = res.likes.length;
        data._likeButton.classList.add("card__like-button_black");
      })
    );
}

////////////////////// card delete ///////////////////
const cardDeletePopup = new PopupWithSubmit(
  popupCardDelete,
  handleDeleteCardSubmit
);

cardDeletePopup.SetEventListeners();

function handleDeleteCardSubmit(data) {
  api.deleteCard(data).then((res) => {
    Card.deleteCard();
  });
}
//////////////////////////image/////////////////////////////
const popupImage = new PopupWithImage(imagePreview);
