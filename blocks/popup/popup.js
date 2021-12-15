/*choosing the popup-window and the opening popup-button*/
let popup = document.querySelector("#popup");
let popupButton = document.querySelector("#popup-button");

/*opening the popup window*/
function display(){
    popup.style.display = "block";
}    

popupButton.addEventListener("click", display);

/*choosing the close button*/
let popupClose = document.querySelector("#popup__close");

/*closing the popup window without saving*/
function close() {
    popup.style.display = "none";
}

popupClose.addEventListener("click", close);
