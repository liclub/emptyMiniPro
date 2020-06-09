/*
 * @Author: your name
 * @Date: 2019-07-01 12:25:58
 * @LastEditTime: 2019-12-24 13:58:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \miniCardProject\components\authModal\authModal.js
 */
var App = getApp();
var appCommon = require("../../common/js/appCommon.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showAuth: {
      type: Boolean,
      default: false,
      observer: function (newVal, oldVal, changedPath) {
        this.setData({
          showModal: this.data.showAuth
        })
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
      showModal: this.data.showAuth
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