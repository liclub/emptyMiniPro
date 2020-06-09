/*
 * @Author: your name
 * @Date: 2019-12-24 16:50:29
 * @LastEditTime : 2019-12-26 10:59:39
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miniCardProject\pages\webview\webview.js
 */
var App = getApp();
Page({
  data: {
    src: ""
  },
  onLoad: function (options) {
    
    let _this = this
    let url = decodeURIComponent(options.url);
    // let uid = options.uid;
    let token = options.token;
    wx.login({
      success(res) {
        if (res.code) {
          url = url + '&code=' + res.code;
          // url = url + '?uid=' + uid + '&token=' + token + '&code=' + res.code;
          _this.setData({
            src: decodeURIComponent(url)
          })
        } else {
          console.log('登录失败')
        }
      }
    })
  },
  onShow: function () {
    wx.hideHomeButton()
  },
})