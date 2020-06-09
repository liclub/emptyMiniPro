/*
 * @Author: your name
 * @Date: 2019-07-01 12:25:58
 * @LastEditTime : 2019-12-24 15:08:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miniCardProject\common\js\appCommon.js
 */
let ajax = require('../../service/common');
let App = getApp();
console.log(ajax)
//获取用户授权信息，token
let getUserToken = (cb, fail) => {
  let App = getApp();
  if (wx.getStorageSync("token")) {
    let now = new Date().getTime();
    let tokenTimeNow = wx.getStorageSync('tokenTimeNow');
    if (!tokenTimeNow || (now - tokenTimeNow) > 86400000) {
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
      wx.showToast({
        title: '微信登入失败',
        icon: 'none'
      })
    }
  })
}
let toLogin = (userinfo, fun) => {
  if (!wx.getStorageSync("token")) {
    wx.showToast({
      title: '登入失败，请重新登入',
      icon: 'none'
    })
    wx.clearStorage();
    getUserToken();
  }
  
}

module.exports = {
  getUserToken: getUserToken,
  toLogin: toLogin
}