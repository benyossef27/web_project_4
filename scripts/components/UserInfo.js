export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._name = profileName;
    this._job = profileJob;
  }
  getUserInfo() {
    this._userData = {
      name: `${this._name.textContent}`,
      about: `${this._job.textContent}`,
    };
    return this._userData;
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
