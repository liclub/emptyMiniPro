var App = getApp();
var appCommon = require("../../common/js/appCommon.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showauth: {
      type: Boolean,
      default: false,
      observer: function (newVal, oldVal, changedPath) {
        this.setData({ showModal: this.data.showauth })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showModal: false
  },
  ready: function () {
    this.setData({
      showModal: this.data.showauth
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    doNothing() {
      return false
    },
    getUserInfo: function (e) { //获取用户信息，更新数据库跳转至创建页面
      let that = this;
      if (e && e.detail) {
        appCommon.toLogin(e.detail, function () {
          that.setData({
            showModal: false
          })
        })
      }
    },
    bindNotAuth: function () {
      this.setData({
        showModal: false
      })
    }
  }
})