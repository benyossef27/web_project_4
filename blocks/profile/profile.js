// Let's find the form in the DOM
let formElement = document.querySelector(".profile__detailes");


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
    // Let's find the form fields in the DOM
    let nameInput = document.querySelector(".profile__name");// Use querySelector()
    let jobInput = document.querySelector(".profile__job");// Use querySelector()

    // Get the values of each field from the corresponding value property
    getval(nameInput) = nameEnter;
    getval(jobInput) = jobEnter;
    // Select elements where the field values will be entered
let nameEnter = document.querySelector(".popup__name");
let jobEnter = document.querySelector(".popup__job");
    // Insert new values using the textContent 
    nameInput.textContent =  nameEnter;
    jobInput.textContent = jobEnter;    
    // property of the querySelector() method
    document.querySelectorAll(".popup__input").submit();
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);