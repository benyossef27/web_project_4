//popup open & close realted
const popup = document.querySelector(".popup");
const popupButton = document.querySelector(".profile__popup-button");
const popupOpen = document.querySelector(".popup__open");
const popupClose = document.querySelector(".popup__close");

//text content submition related
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const submitButten = document.querySelector(".popup__save");

//forms 
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormJobInput = profileForm.elements.job;

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