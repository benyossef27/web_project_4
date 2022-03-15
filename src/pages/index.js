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
  popupUserAvatarForm,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit";
import { api } from "../components/Api.js";

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData]) => {
    userId = userData._id;
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

//////////////////////////////profile//////////////////////////////
const popupEditProfile = new PopupWithForm(
  popupProfileForm,
  handleProfileFormSubmit,
  "save"
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
  api
    .setUserInfo(popupEditProfile.getInputValues())
    .then((info) => {
      userInfo.setUserInfo(info);
      popupEditProfile.saving();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

popupProfileButton.addEventListener("click", () => {
  popupProfile.resetValidation();

  const userNewInfo = userInfo.getUserInfo();
  profileFormNameInput.value = userNewInfo.name;
  profileFormJobInput.value = userNewInfo.about;
  popupEditProfile.hideSaving();
  popupEditProfile.open();
});
/////////////////////////avatar////////////////////
const popupUserAvatar = new PopupWithForm(
  popupAvatar,
  handleAvatarSubmit,
  "save"
);
popupUserAvatar.setEventListeners();

function handleAvatarSubmit() {
  const data = popupUserAvatar.getInputValues();
  api
    .setUserAvatar(data.avatarImage)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupUserAvatar.saving();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}
const avatarFromValidation = new FormValidator(settings, formAvatar);
avatarFromValidation.enableValidation();

popupAvatarEdit.addEventListener("click", () => {
  avatarFromValidation.resetValidation();
  const newAvatar = userInfo.getUserAvatar();
  avatarImageInput.src = newAvatar.avatar;
  popupUserAvatar.hideSaving();
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
    cardList.renderItems(res.reverse());
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const popupAddCardForm = new PopupWithForm(
  addPlacePopup,
  handleAddCardFormSubmit,
  "create"
);
popupAddCardForm.setEventListeners();

function handleAddCardFormSubmit() {
  popupAddCardForm.saving();
  const newValues = popupAddCardForm.getInputValues();
  const item = {
    name: newValues.placeHeading,
    link: newValues.placeImage,
  };
  api
    .createCard(item)
    .then((item) => {
      cardList.addItem(createCard({ item }));
    })
    .catch((res) => {
      console.log(`Error: ${err}`);
    });
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
      handleDeleteButton: (id) => {
        cardDeletePopup.open();
        cardDeletePopup.setAction(() => {
          api
            .deleteCard(id)
            .then(() => {
              card.deleteCard();
              cardDeletePopup.close();
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        });
      },
      handleLikeButton: (id) => {
        const isliked = card.checkForLikes();
        if (isliked) {
          api
            .unlikeCard(id)
            .then((res) => {
              card.handleLike(res.likes);
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        } else {
          api
            .likeCard(id)
            .then((res) => {
              card.handleLike(res.likes);
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        }
      },
    },

    ".card-template",
    userId
  );
  const cardElement = card.generateCard(newInfo);
  return cardElement;
}

addPlaceButton.addEventListener("click", () => {
  popupAddCardForm.hideSaving();
  popupAddCard.resetValidation();
  popupAddCardForm.open();
});

////////////////////// card delete ///////////////////
const cardDeletePopup = new PopupWithSubmit(popupCardDelete);
cardDeletePopup.setEventListeners();
//////////////////////////image/////////////////////////////
const popupImage = new PopupWithImage(imagePreview);
