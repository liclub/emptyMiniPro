let App = getApp();
var common = require("../../common/js/common.js"); // 公共js

Page({
  /*页面的初始数据*/
  data: {
    fieldQr: "",
    qrSuccess: false,
    type: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({ type: options.type})
    }
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
  saveImg() {
    //保存图片之前要把图片转成微信本地路径
    common.canvasTopath('myQrcode', function(res) {
      let img = res.tempFilePath;
      common.saveImgToCamera(img)
    })
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