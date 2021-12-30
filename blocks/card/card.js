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

//variables for open/close form
const addPlace = document.querySelector(".popup_type_place");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeAddPlaceButten = document.querySelector(".popup__close_type_place")

//variables for cards
const TemplateCard = document.querySelector(".card-template").content.querySelector(".card")
const cardContainer = document.querySelector(".cards");
const createCard = document.querySelector(".popup__save_type_place")

//form inputs
const cardTitleInput = addPlace.querySelector(".popup__formfield_field_heading")
const cardImageInput = addPlace.querySelector(".popup__formfield__field_img")

//form 
cardForm = addPlace.querySelector(".popup__input_type_place")

cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    console.log(cardTitleInput.Value, cardImageInput.Value)
    generateCard({name: cardTitleInput.value, link:cardImageInput.value})
    closeAddPlace()

})

//function to open
function displayAddPlace() {
    addPlace.classList.add("popup_open");
}
//listner for function
addPlaceButton.addEventListener("click", displayAddPlace);
//function to close
function closeAddPlace() {
    addPlace.classList.remove("popup_open")
    cardForm.reset()
}
//listner for function
closeAddPlaceButten.addEventListener("click", closeAddPlace);

function generateCard(cardData){

  const placeCard = TemplateCard.cloneNode(true); 

const cardTitle = placeCard.querySelector(".card__name");
const cardImage = placeCard.querySelector(".card__image");
const cardDelete = placeCard.querySelector(".card__delete-button");
const cardLike = placeCard.querySelector(".card__like-button");
//const cardOpen = placeCard.querySelector(".");

cardTitle.textContent = cardData.name;
cardImage.src = cardData.link;

cardLike.addEventListener("click", ()=> {
  cardLike.classList.toggle("card__like-button_black");
});

cardDelete.addEventListener("click", ()=> {
  placeCard.remove();
});

cardContainer.append(placeCard);
};

//initial cards
initialCards.forEach(generateCard);