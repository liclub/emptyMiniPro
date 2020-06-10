Page({
  /*页面的初始数据*/
  data: {
    showAuth: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      path: '/pages/authIndex/authIndex',
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