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
  document.removeEventListener("keydown", handlePopupCloseOnEsc);
}

//clsoe pupup on Esc
function handlePopupCloseOnEsc(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//close popup when clicking outside
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}
