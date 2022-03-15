class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  ///////////////////user////////////////////
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers,
      method: "PATCH",

      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: data }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }
  ////////////////////////cards//////////////////////////////////
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }
  createCard(item) {
    return fetch(`${this._baseUrl}/cards `, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(item),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => {
        console.log(err);
      });
  }
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "PUT",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => {
        console.log(err);
      });
  }
  unlikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => {
        console.log(err);
      });
  }
}

///////////////////////////Api instance//////////////////////////////////////
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "ad179248-85aa-46f0-9788-27fa8afcb4c4",
    "Content-Type": "application/json",
  },
});
