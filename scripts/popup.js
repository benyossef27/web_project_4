//popup open & close realted
const popupProfileForm = document.querySelector(".popup_type_profile");
const popupProfileButton = document.querySelector(".profile__popup-button");
const popupProfileClose = document.querySelector(".popup__close_type_profile");
const addPlace = document.querySelector(".popup_type_place");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeAddPlaceButton = document.querySelector(".popup__close_type_place")

//text content submition related
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

//forms 
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormJobInput = profileForm.elements.job;
const cardTitleInput = addPlace.querySelector(".popup__formfield_field_heading")
const cardImageInput = addPlace.querySelector(".popup__formfield_field_img")
const cardForm = addPlace.querySelector(".popup__input_type_place")

// cards
const templateCard = document.querySelector(".card-template").content.querySelector(".card")
const cardContainer = document.querySelector(".cards");
const createCard = document.querySelector(".popup__save_type_place")

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

//for image preview
const imagePreview = document.querySelector(".popup_type_preview")
const previewClose = document.querySelector(".popup__close_type_preview")
const imageDisplayed = document.querySelector(".popup__image")
const imageDisplayedHeading = document.querySelector(".popup__heading_type_preview")

//generic popup opening function
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

//submitting & closing profile form
function submitProfileForm(event) {
    profileName.textContent = profileFormNameInput.value;
    profileJob.textContent = profileFormJobInput.value;
    event.preventDefault();
    closePopup(popupProfileForm);
}
profileForm.addEventListener("submit", submitProfileForm);


                ///card related functions///

//function to open card form
addPlaceButton.addEventListener("click", () => openPopup(addPlace));

//function to close card form
closeAddPlaceButton.addEventListener("click", () => closePopup(addPlace));

//card creation form submit
cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    generateCard({name: cardTitleInput.value, link:cardImageInput.value})
    closePopup(addPlace);
    cardForm.reset()
})

//generating cards from form
function generateCard(cardData){

  const placeCard = templateCard.cloneNode(true); 

const cardTitle = placeCard.querySelector(".card__name");
const cardImage = placeCard.querySelector(".card__image");
const cardDelete = placeCard.querySelector(".card__delete-button");
const cardLike = placeCard.querySelector(".card__like-button");


cardTitle.textContent = cardData.name;
cardImage.src = cardData.link;
cardData.link.alt = "sorry, couldn't load picture"

//open preview picture
cardImage.addEventListener("click", () => openPopup(imagePreview),
 imageDisplayed.src = cardData.link,
 imageDisplayedHeading.textContent = cardData.name
);

 //like and unlike cards
cardLike.addEventListener("click", ()=> {
  cardLike.classList.toggle("card__like-button_black");
});

//deleting cards
cardDelete.addEventListener("click", ()=> {
  placeCard.remove();
});

//cards go in cards container
cardContainer.prepend(placeCard);
};

//use initial cards
initialCards.forEach(generateCard);

//close preview picture
previewClose.addEventListener("click", ()=> closePopup(imagePreview));