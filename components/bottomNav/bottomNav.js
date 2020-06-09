var App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkId: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    bottomList: [{
      pagePath: "/pages/index/index",
      text: "首页",
      iconPath: "../../images/mingpian.png",
      selectedIconPath: "../../images/mingpian-lan.png",
      check: false
    }, {
      pagePath: "/pages/index/index",
      text: "自定义",
      iconPath: "../../images/mingpian.png",
      selectedIconPath: "../../images/mingpian-lan.png",
      check: false
    }, {
      pagePath: "/pages/index/index",
      text: "首页3",
      iconPath: "../../images/mingpian.png",
      selectedIconPath: "../../images/mingpian-lan.png",
      check: false
    }],
    resetBtm: false
  },
  ready: function () {
    var that = this;
    var bottomList = this.data.bottomList;
    bottomList[this.data.checkId].check = true;
    this.setData({
      bottomList: bottomList
    });
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.indexOf('iPhone X') != -1) {
          that.setData({
            resetBtm: true
          })
        }
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bottomLinks: function (e) {
      var index = e.currentTarget.dataset.index;
      var bottomList = this.data.bottomList;
      wx.redirectTo({ url: bottomList[index].pagePath })
    }
  }
})