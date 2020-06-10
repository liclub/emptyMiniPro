let App = getApp();
var common = require("../../common/js/common.js"); // 公共js

Page({
  /*页面的初始数据*/
  data: {
    fieldQr: "",
    qrSuccess: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  setFieldQr(e) {
    this.setData({fieldQr: e.detail})
  },
  drawQrcode() {
    if (!this.data.fieldQr) {
      wx.showToast({ title: '请输入二维码', icon: 'none' });
      return;
    }
    let _this = this;
    common.tapHandler({text: this.data.fieldQr, callback(e) {
      _this.setData({ qrSuccess: true })
    }})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //分享
  onShareAppMessage: function (res) {
    return {
      title: '分享',
      path: '/pages/qrIndex/qrIndex',
      imageUrl: img,
      success: function (res) {
        wx.showToast({ title: '转发成功' });
      },
      fail: function (res) {
        wx.showToast({ title: '转发失败', icon: 'none' });
      }
    }
  }
});