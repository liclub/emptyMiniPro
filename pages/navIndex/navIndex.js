Page({
  /*页面的初始数据*/
  data: {
    newBottomList: [],
    canEditNav: [
      {
        pagePath: "/pages/authIndex/authIndex",
        text: "授权",
        iconPath: "../../images/mingpian.png",
        selectedIconPath: "../../images/mingpian-lan.png",
        check: false
      },
      {
        pagePath: "/pages/qrIndex/qrIndex",
        text: "二维码",
        iconPath: "../../images/mingpian.png",
        selectedIconPath: "../../images/mingpian-lan.png",
        check: false
      },
      {
        pagePath: "/pages/swiperIndex/swiperIndex",
        text: "轮播图",
        iconPath: "../../images/mingpian.png",
        selectedIconPath: "../../images/mingpian-lan.png",
        check: false
      },
    ]
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
  refleshNav(e) {
    const type  = e.currentTarget.dataset.type;
    const idx = e.currentTarget.dataset.idx;
    const targetText= this.data.canEditNav[idx].text;
    const targetItem = this.data.newBottomList.filter(d => { return d.text === targetText });
    const targetNotItem = this.data.newBottomList.filter(d => { return d.text !== targetText });
    if (type === '0' && targetItem.length === 0) {
      this.data.newBottomList.push(this.data.canEditNav[idx])
      this.setData({ newBottomList: this.data.newBottomList })
    }
    if (type === '1' && targetItem.length !== 0) {
      this.data.newBottomList = targetNotItem
      this.setData({ newBottomList: this.data.newBottomList })
    }
    
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
      path: '/pages/navIndex/navIndex',
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