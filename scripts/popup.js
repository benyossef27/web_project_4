//popup open & close realted
const popup = document.querySelector(".popup_type_profile");
const popupButton = document.querySelector(".profile__popup-button");
const popupClose = document.querySelector(".popup__close_type_profile");
const addPlace = document.querySelector(".popup_type_place");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeAddPlaceButten = document.querySelector(".popup__close_type_place")

//text content submition related
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const submitButten = document.querySelector(".popup__save");

//forms 
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormJobInput = profileForm.elements.job;
const cardTitleInput = addPlace.querySelector(".popup__formfield_field_heading")
const cardImageInput = addPlace.querySelector(".popup__formfield_field_img")
cardForm = addPlace.querySelector(".popup__input_type_place")


//cards
const cardContainer = document.querySelector(".cards");
const createCard = document.querySelector(".popup__save_type_place")
const imagePreview = document.querySelector(".popup_type_preview")
const previewClose = document.querySelector(".popup__close_type_preview")
const imageDisplayed = document.querySelector(".popup__image")
const imageDisplayedHeading = document.querySelector(".popup__heading_type_preview")


//opening popup window
function display() {
    popup.classList.add("popup_open");
    profileFormNameInput.value = profileName.textContent;
    profileFormJobInput.value = profileJob.textContent;
}   
//listener open button
popupButton.addEventListener("click", display);

//closing popup window without submit
function close() {
    popup.classList.remove("popup_open");
}
//listener close button
popupClose.addEventListener("click", close);

//submitting & closing form
function submit(event) {
    profileName.textContent = profileFormNameInput.value;
    profileJob.textContent = profileFormJobInput.value;
    event.preventDefault();
    close();
}
//listner submit butten
profileForm.addEventListener("submit", submit);

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
    createCardElement({name: cardTitleInput.value, link:cardImageInput.value})
    closeAddPlace()

})

//function to open cardform
function displayAddPlace() {
    addPlace.classList.add("popup_open");}
//listner for function
addPlaceButton.addEventListener("click", displayAddPlace);

//function to close card form
function closeAddPlace() {
    addPlace.classList.remove("popup_open")
    cardForm.reset()}

//listner for function
closeAddPlaceButten.addEventListener("click", closeAddPlace);

//generating cards from form
function createCardElement(cardData){
  
  const TemplateCard = document.querySelector(".card-template").content.querySelector(".card")
  const cardElement = TemplateCard.cloneNode(true); 

const cardTitle = cardElement.querySelector(".card__name");
const cardImage = cardElement.querySelector(".card__image");
const cardDelete = cardElement.querySelector(".card__delete-button");
const cardLike = cardElement.querySelector(".card__like-button");

cardTitle.textContent = cardData.name;
cardImage.src = cardData.link;

//open preview picture
cardImage.addEventListener("click", () => {
 imagePreview.classList.add("popup_open")
 imageDisplayed.src = cardData.link;
 imageDisplayedHeading.textContent = cardData.name;
});

//close preview picture
previewClose.addEventListener("click", ()=>{
  imagePreview.classList.remove("popup_open");
})

 //like and unlike cards
cardLike.addEventListener("click", ()=> {
  cardLike.classList.toggle("card__like-button_black");
});

//deleting cards
cardDelete.addEventListener("click", ()=> {
  cardElement.remove();
}); 
cardContainer.prepend(cardElement);
return cardElement
//cards go in cards container
};


//use initial cards
initialCards.forEach(createCardElement);