export default class UserInfo {
  constructor(profileName, profileInfo, profileAvatar) {
    this._name = profileName;
    this._job = profileInfo;
    this._avatar = profileAvatar;
  }
  getUserAvatar() {
    return { avatarImage: this._avatar.src };
  }
  setUserAvatar(data) {
    this._avatar.src = data.avatarImage;
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
