const ajax = require('../../service/common');
const App = getApp();
const invalidTime = 86400000;
//获取用户授权信息，token
let getUserToken = (cb, fail) => {
  let App = getApp();
  if (wx.getStorageSync("token")) {
    const now = new Date().getTime();
    const tokenTimeNow = wx.getStorageSync('tokenTimeNow');
    if (!tokenTimeNow || (now - tokenTimeNow) > invalidTime) {
      wx.clearStorageSync();
      getUserToken(cb, fail)
    } else {
      typeof cb == "function" && cb();
    }
    return;
  }
  wx.login({
    success: function (loginRes) {
      let code = loginRes.code;
      // ajax.POST();
      // let token = res.data.token;
      // let authCode = res.data.authCode;
      // if (token) {
      //   wx.setStorageSync('token', token);
      //   wx.setStorageSync('authCode',authCode);
      //   let now = new Date().getTime();
      //   wx.setStorageSync('tokenTimeNow', now);
      //   typeof cb == "function" && cb(res);
      // }
    },
    fail: function (res) {
      wx.showToast({ title: '微信登入失败', icon: 'none' })
    }
  })
}
let toLogin = (userinfo, fun) => {
  if (!wx.getStorageSync("token")) {
    wx.showToast({ title: '登入失败，请重新登入', icon: 'none' })
    wx.clearStorage();
    getUserToken();
  }
}

module.exports = {
  getUserToken: getUserToken,
  toLogin: toLogin
}