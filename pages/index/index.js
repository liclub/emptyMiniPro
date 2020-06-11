var App = getApp();
var appCommon = require("../../common/js/appCommon.js"); // 页面初始化鉴权
var ajax = require('../../service/common'); // 接口请求
var common = require("../../common/js/common.js"); // 公共js
import { JSEncrypt } from "../../utils/jsencrypt.js"; // 加密
var encrypt = new JSEncrypt();
encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzfKrgzOisGDgpPBspXbAeqd7aDPxeP/zU275Rg64AAmvm8zl44RBtfi0eb+9Pt3mGCr37w2rWbI2xAwVcL+DSjSttSrh9ndW7mS5JND5GSL8mYw80fG+N1Mdl46iTAS6s5exaxscOrPJ4deuUWZFdH8ZYQjZmH6mIpVd34JhFpQIDAQAB");

Page({
  /*页面的初始数据*/
  data: {
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
  switchTap(e) {
    const idx = e.currentTarget.dataset.idx;
    switch (idx) {
      case '0':
        App.redirectOverPage('/pages/qrIndex/qrIndex');
        return;
      case '1':
        App.redirectOverPage('/pages/navIndex/navIndex');
        return;
      case '2':
        App.redirectOverPage('/pages/authIndex/authIndex');
        return;
      case '3':
        App.redirectOverPage('/pages/customerHeader/customerHeader');
        return;
      case '4':
        App.redirectOverPage('/pages/qrIndex/qrIndex?type=1');
        return;
      case '5':
        App.redirectOverPage('/pages/swiperIndex/swiperIndex');
        return;
      case '6':
        App.redirectOverPage('/pages/swiperIndex/swiperIndex?type=1');
        return;
    }
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