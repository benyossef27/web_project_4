//popup open & close realted
const popupProfileForm = document.querySelector(".popup_type_profile");
const popupProfileButton = document.querySelector(".profile__popup-button");
const popupProfileClose = document.querySelector(".popup__close_type_profile");
const addPlace = document.querySelector(".popup_type_place");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeAddPlacebutton = document.querySelector(".popup__close_type_place")

//text content submition related
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const submitbutton = document.querySelector(".popup__save");

//forms 
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormJobInput = profileForm.elements.job;
const cardTitleInput = addPlace.querySelector(".popup__formfield_field_heading")
const cardImageInput = addPlace.querySelector(".popup__formfield_field_img")
const cardForm = addPlace.querySelector(".popup__input_type_place")


//cards
const cardContainer = document.querySelector(".cards");
const createCard = document.querySelector(".popup__save_type_place")
const imagePreview = document.querySelector(".popup_type_preview")
const previewClose = document.querySelector(".popup__close_type_preview")
const imageDisplayed = document.querySelector(".popup__image")
const imageDisplayedHeading = document.querySelector(".popup__heading_type_preview")


//opening popup window
function openPopup(popup) {
  popup.classList.add("popup_opened");
};
//generic popup closing funcrion
function closePopup(popup){
  popup.classList.remove("popup_opened")
};

                ///profile form function///
//opening profile form   
popupProfileButton.addEventListener("click", ()=> openPopup(popupProfileForm),
profileFormNameInput.value = profileName.textContent,
profileFormJobInput.value = profileJob.textContent
);

//closing profile form window without submit
popupProfileClose.addEventListener("click", () => closePopup(popupProfileForm));

//submitting & closing form
function submit(event) {
    profileName.textContent = profileFormNameInput.value;
    profileJob.textContent = profileFormJobInput.value;
    event.preventDefault();
    closePopup(popupProfileForm);
}
//listner submit button
profileForm.addEventListener("submit", submit);

               ///card related functions///

//function to open card form
addPlaceButton.addEventListener("click", () => openPopup(addPlace));

//function to close card form
closeAddPlacebutton.addEventListener("click", () => closePopup(addPlace));

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//form submit
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  cardContainer.prepend(createCardElement({name: cardTitleInput.value, link:cardImageInput.value}))
  cardForm.reset()
  closePopup(addPlace)

})
//generating cards from form
function createCardElement(card){
  
  const cardTemplate = document.querySelector(".card-template").content.querySelector(".card")
  const cardElement = cardTemplate.cloneNode(true); 

const cardTitle = cardElement.querySelector(".card__name");
const cardImage = cardElement.querySelector(".card__image");
const cardDelete = cardElement.querySelector(".card__delete-button");
const cardLike = cardElement.querySelector(".card__like-button");

cardTitle.textContent = card.name
cardImage.src = card.link
cardImage.alt = "sorry, coulden't load picture"

//open preview picture
cardImage.addEventListener("click", function () {
  imageDisplayed.src = card.link;
  imageDisplayed.textContent = card.title;
  openPopup(imagePreview);
});

//close preview picture
previewClose.addEventListener("click", ()=> closePopup(imagePreview));

 //like and unlike cards
cardLike.addEventListener("click", ()=> {
  cardLike.classList.toggle("card__like-button_black");
});

//deleting cards
cardDelete.addEventListener("click", ()=> {
  cardElement.remove();
});
return cardElement
};

//send cards to container
function randerCard(card, warpper) {
  warpper.append(createCardElement(card))
}
//use initial cards
initialCards.forEach(card => randerCard(card, cardContainer));