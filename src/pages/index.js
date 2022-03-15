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
} from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit";
import { api } from "../components/Api.js";
let newInfo = {};
let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    newInfo = userData;
    userId = userData._id;
    cardList.renderItems(cardData.reverse());
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    return newInfo;
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

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

function handleProfileFormSubmit() {
  popupEditProfile.saving();
  api
    .setUserInfo(popupEditProfile.getInputValues())
    .then((info) => {
      userInfo.setUserInfo(info);

      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      popupEditProfile.hideSaving();
    });
}

popupProfileButton.addEventListener("click", () => {
  const userNewInfo = userInfo.getUserInfo();
  profileFormNameInput.value = userNewInfo.name;
  profileFormJobInput.value = userNewInfo.about;
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
  popupUserAvatar.saving();
  api
    .setUserAvatar(data.avatarImage)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupUserAvatar.saving();
      popupUserAvatar.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      popupUserAvatar.hideSaving();
    });
}
const avatarFromValidation = new FormValidator(settings, formAvatar);

popupAvatarEdit.addEventListener("click", () => {
  avatarImageInput.src = userInfo.getUserAvatar();

  popupUserAvatar.open();
});

/////////////////////////////////card///////////////////////////
///cards from server//
const cardList = new Section(
  {
    renderer: (item) => {
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
    },
  },
  ".cards"
);

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
      cardList.addItem(item);
      popupAddCardForm.close();
    })
    .catch((res) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      popupAddCardForm.hideSaving();
    });
}

addPlaceButton.addEventListener("click", () => {
  popupAddCardForm.open();
});

////////////////////// card delete ///////////////////
const cardDeletePopup = new PopupWithSubmit(popupCardDelete);
cardDeletePopup.setEventListeners();
//////////////////////////image/////////////////////////////
const popupImage = new PopupWithImage(imagePreview);

const formValidators = {};

// enable validation
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // here you get the name of the form
    const formName = formElement.getAttribute("name");
    // here you store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
formValidators["profileform"].resetValidation();
formValidators["avatarform"].resetValidation();
formValidators["placeform"].resetValidation();
