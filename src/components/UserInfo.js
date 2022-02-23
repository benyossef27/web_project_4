export default class UserInfo {
  constructor(profileName, profileInfo) {
    this._name = profileName;
    this._job = profileInfo;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
