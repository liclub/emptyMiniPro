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
        that.setData({ showModal: false })
        wx.showToast({ title: '授权成功', icon: 'none' });
        this.triggerEvent('updateUser', e.detail) //myevent自定义名称事件，父组件中使用
        // appCommon.toLogin(e.detail, function () {
        //   that.setData({
        //     showModal: false
        //   })
        // })
      }
    },
    bindNotAuth: function () {
      this.setData({
        showModal: false
      })
    }
  }
})