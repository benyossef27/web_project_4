const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//variables for open/close form
const addPlace = document.querySelector(".popup_type_place");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeAddPlaceButten = document.querySelector(".popup__close_type_place");

//variables for cards
const TemplateCard = document
  .querySelector(".card-template")
  .content.querySelector(".card");
const cardContainer = document.querySelector(".cards");
const createCard = document.querySelector(".popup__save_type_place");

//form inputs
const cardTitleInput = addPlace.querySelector(
  ".popup__formfield_field_heading"
);
const cardImageInput = addPlace.querySelector(".popup__formfield__field_img");

//form
cardForm = addPlace.querySelector(".popup__input_type_place");
//form submit
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  generateCard({ name: cardTitleInput.value, link: cardImageInput.value });
  closeAddPlace();
});

//function to open cardform
function displayAddPlace() {
  addPlace.classList.add("popup_open");
}
//listner for function
addPlaceButton.addEventListener("click", displayAddPlace);

//function to close card form
function closeAddPlace() {
  addPlace.classList.remove("popup_open");
  cardForm.reset();
}

//listner for function
closeAddPlaceButten.addEventListener("click", closeAddPlace);

//generating cards from form
function generateCard(cardData) {
  const placeCard = TemplateCard.cloneNode(true);

  const cardTitle = placeCard.querySelector(".card__name");
  const cardImage = placeCard.querySelector(".card__image");
  const cardDelete = placeCard.querySelector(".card__delete-button");
  const cardLike = placeCard.querySelector(".card__like-button");
  const imagePreview = document.querySelector(".popup_type_preview");
  const previewClose = document.querySelector(".popup__close_type_preview");
  const imageDisplayed = document.querySelector(".popup__image");
  const imageDisplayedHeading = document.querySelector(
    ".popup__heading_type_preview"
  );

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  //open preview picture
  cardImage.addEventListener("click", () => {
    imagePreview.classList.add("popup_open");
    imageDisplayed.src = cardData.link;
    imageDisplayedHeading.textContent = cardData.name;
  });

  //close preview picture
  previewClose.addEventListener("click", () => {
    imagePreview.classList.remove("popup_open");
  });

  //like and unlike cards
  cardLike.addEventListener("click", () => {
    cardLike.classList.toggle("card__like-button_black");
  });

  //deleting cards
  cardDelete.addEventListener("click", () => {
    placeCard.remove();
  });

  //cards go in cards container
  cardContainer.append(placeCard);
}

//use initial cards
initialCards.forEach(generateCard);
