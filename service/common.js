// 请求接口方法
const commonAjax = function(param,type,successCallback, failCallback) {
  const serverCallback = getApp().serverCallback;
  wx.showLoading({ title: "加载中" });
  wx.request({
    url: getApp().globalData.apiBaseURL,
    header: {
      'cookie': 'SESSION='+wx.getStorageSync("authCode"), // 默认值
    },
    data: param,
    method: type,
    success: serverCallback(successCallback, failCallback),
    fail: serverCallback("undefined", failCallback)
  });
};

const POST = function(param, successCallback, failCallback) {
  commonAjax(param, "POST", successCallback, failCallback);
};

const GET = function(param, successCallback, failCallback) {
  commonAjax(param, "GET", successCallback, failCallback);
};

module.exports = {
  POST: POST,
  GET: GET
};
