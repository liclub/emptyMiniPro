var app = getApp();
Page({
  data:{
  },
  onLoad: function (options) {
    
  },
  onPageScroll: function(e) {
    
  },
  toNextPage:function(e){
    wx.navigateTo({ url: '/pages/setLook/setLook?sex=0' })
  }
})