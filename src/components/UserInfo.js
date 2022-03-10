export default class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._name = profileName;
    this._about = profileAbout;
    this._avatar = profileAvatar;
  }
  getUserAvatar() {
    return { avatar: this._avatar.src };
  }
  setUserAvatar(data) {
    this._avatar.src = data;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}
