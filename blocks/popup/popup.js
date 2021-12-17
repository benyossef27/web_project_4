/*choosing the popup-window and the opening popup-button*/
let popup = document.querySelector("#popup");
let popupButton = document.querySelector("#popup-button");

//opening the popup window
function display() {
    popup.classList.remove("popup");
    popup.classList.add("popup_open");
}
//calling the button
popupButton.addEventListener("click", display)

//choosing the close button*/
let popupClose = document.querySelector(".popup__close");

/*closing the popup window without saving*/
function close() {
    popup.classList.remove("popup_open");
    popup.classList.add("popup");

}
//calling the button
popupClose.addEventListener("click", close);