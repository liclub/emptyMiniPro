var App = getApp();
var appCommon = require("../../common/js/appCommon.js"); // 页面初始化鉴权
var ajax = require('../../service/common'); // 接口请求
var common = require("../../common/js/common.js"); // 公共js
import { JSEncrypt } from "../../common/js/jsencrypt.js"; // 加密
var encrypt = new JSEncrypt();
encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzfKrgzOisGDgpPBspXbAeqd7aDPxeP/zU275Rg64AAmvm8zl44RBtfi0eb+9Pt3mGCr37w2rWbI2xAwVcL+DSjSttSrh9ndW7mS5JND5GSL8mYw80fG+N1Mdl46iTAS6s5exaxscOrPJ4deuUWZFdH8ZYQjZmH6mIpVd34JhFpQIDAQAB");

Page({
  /*页面的初始数据*/
  data: {
    showAuth: false,
    fieldQr: "",
    qrSuccess: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indexInint(options);
  },
  indexInint(options) {
    // App.pageLoadInit('', function (res) {});
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
      path: '/pages/index/index',
      imageUrl: img,
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        wx.showToast({ title: '转发失败', icon: 'none' });
      }
    }
  }
});