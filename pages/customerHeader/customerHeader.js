var App = getApp();

Page({
  /*页面的初始数据*/
  data: {
    titleText: '自定义头部',
    backIcon: '../../images/back.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indexInint(options);
  },
  indexInint(options) {
    this.setScrollHeight();
  },
  setScrollHeight() {
    var sysinfo = wx.getSystemInfoSync();
    var statusHeight = sysinfo.statusBarHeight;
    var isiOS = sysinfo.system.indexOf('iOS') > -1;
    var navHeight;
    if (!isiOS) {
      navHeight = 48;
    } else {
      navHeight = 44;
    }
    var headerHeight = navHeight + statusHeight;
    var skipHeight = App.globalData.screenHeight - headerHeight;
    this.setData({
      skipHeight: skipHeight
    });
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
      path: '/pages/customerHeader/customerHeader',
      imageUrl: '',
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          duration: 2000
        });
      }
    }
  }
});