/*
 * @Descripttion:
 * @version: 1.0
 * @Author: lhy
 * @Date: 2019-07-01 12:25:58
 * @LastEditors: lhy
 * @LastEditTime: 2019-12-10 18:16:50
 */
// 获取地址列表
var commonAjax = function(param, successCallback, failCallback) {
  var serverCallback = getApp().serverCallback;
  wx.showLoading({
    title: "加载中"
  });
  wx.request({
    url: getApp().globalData.apiBaseURL,
    header: {
      'cookie': 'SESSION='+wx.getStorageSync("authCode"), // 默认值
    },
    data: param,
    method: "POST",
    success: serverCallback(successCallback, failCallback),
    fail: serverCallback("undefined", failCallback)
  });
};

module.exports = {
  commonAjax: commonAjax
};
