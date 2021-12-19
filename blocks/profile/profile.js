// Let's find the form in the DOM
let formElement = document.querySelectorAll(".popup__input");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
    // Let's find the form fields in the DOM
    let nameInput = document.querySelector(".popup__name");
    let jobInput = document.querySelector(".popup__job");

    // Get the values of each field from the corresponding value property
    
    // Select elements where the field values will be entered
    let nameEnter = document.querySelector(".profile__name");
    let jobEnter = document.querySelector(".profile__job");
    // Insert new values using the textContent 
    nameEnter.textContent = nameInput.value;
    jobEnter.textContent = jobInput.value;
    // property of the querySelector() method
    document.querySelector(".popup__input").submit();
}
// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);