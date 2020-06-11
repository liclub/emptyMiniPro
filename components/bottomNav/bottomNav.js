var App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkid: {
      type: String,
      value: ''
    },
    newBottomList: {
      type: Array,
      value() {
        return []
      },
      observer: function (newVal, oldVal) {
        this.data.bottomList = this.data.bottomList.filter(d => { return d.text === '首页' || d.text === '自定义' });
        this.data.bottomList = this.data.bottomList.concat(newVal);
        this.setData({ bottomList : this.data.bottomList})
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    bottomList: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "../../images/mingpian.png",
        selectedIconPath: "../../images/mingpian-lan.png",
        check: false
      }, 
      {
        pagePath: "/pages/customerHeader/customerHeader",
        text: "自定义",
        iconPath: "../../images/mingpian.png",
        selectedIconPath: "../../images/mingpian-lan.png",
        check: false
      }
    ],
    resetBtm: false
  },
  ready: function () {
    var that = this;
    var bottomList = this.data.bottomList;
    bottomList[this.data.checkid].check = true;
    this.setData({ bottomList: bottomList });
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
      var index = e.ntTarget.dataset.index;
      var bottomList = this.data.bottomList;
      wx.redirectTo({ url: bottomList[index].pagePath })
    }
  }
})