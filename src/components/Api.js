class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
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

  deleteCard() {
    return fetch(`${this._baseUrl}/cards/_id `, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "ad179248-85aa-46f0-9788-27fa8afcb4c4",
    "Content-Type": "application/json",
  },
});
