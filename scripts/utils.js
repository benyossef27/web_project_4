//opening popup window
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handlePopupCloseOnEsc);
}

//generic popup closing funcrion
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", handleOverlayClick);
  popup.removeEventListener("keydown", handlePopupCloseOnEsc);
}

//clsoe pupup on Esc
function handlePopupCloseOnEsc(event) {
  const popup = document.querySelector(".popup_opened");
  if (event.key === "Escape") {
    closePopup(popup);
  }
}

//close popup when clicking outside
function handleOverlayClick(event) {
  closePopup(event.target);
}

export { openPopup };
export { closePopup };
