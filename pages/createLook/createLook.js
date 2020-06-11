var app = getApp();
Page({
  data: {
    "uri": "",
    "bg1": "../../images/img/p4_beijing_f.png",
    "bg2": "../../images/img/bg_paper.png",
    "mylook": ""
  },
  onLoad: function (options) {
    this.data.uri = options.uri;
    this.data.mylook = options.uri;
    this.setData({
      uri: options.uri,
      mylook: options.uri
    })
  },
  savePic: function (e) {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    var ctx = wx.createContext('saveCanvans');
    ctx.drawImage(this.data.bg1, 0, 0, windowWidth * 2, windowHeight * 2);
    ctx.drawImage(this.data.bg2, 20, 50, windowWidth * 2 - 40, windowHeight * 2 - 100);
    ctx.drawImage(this.data.mylook, 250, 300, windowWidth * 2 - 400, windowHeight * 2 - 100);
    wx.drawCanvas({
      canvasId: 'saveCanvans',
      actions: ctx.getActions()
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: windowWidth * 2,
        height: windowHeight * 2,
        destWidth: windowWidth * 2,
        destHeight: windowHeight * 2,
        quality: 0,
        canvasId: 'saveCanvans',
        success: function (res) {
          console.log(res.tempFilePath);
          wx.getImageInfo({
            src: res.tempFilePath,
            success: function (ret) {
              var path = ret.path;
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success(result) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  })
                  console.log(result)
                }
              })
            }
          })
        }
      })
    }, 100);
  },
})