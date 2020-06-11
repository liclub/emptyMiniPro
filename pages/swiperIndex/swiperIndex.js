var common = require("../../common/js/common.js"); // 公共js
Page({
  /*页面的初始数据*/
  data: {
    userInfo: {
      name: '无知无畏',
      job: '前端开发工程师',
      mobile:'18888888888',
      company: 'XX软件股份有限公司',
      headSrc: '../../images/pro-log.png'
    },
    imgUrls: [
      '../../images/banner1.png',
      '../../images/banner2.png'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    type: '',
    cuttent: '../../images/banner1.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({ type: options.type })
    }
  },
  bindchange(e) {
    this.setData({ cuttent: this.data.imgUrls[e.detail.current] })
  },
  shareFrends() {
    let _this = this;
    wx.showLoading({ title: '图片生成中' });
    setTimeout(function () {
      _this.createdCode(); // 根据以上信息开始画图
      // wx.getImageInfo({
      //   src: _this.data.cuttent,
      //   success(res) {
      //     _this.setData({ cuttent: res.path });
      //     _this.createdCode(); // 根据以上信息开始画图
      //   }
      // })
    }, 500)      
  },
  createdCode() {
    let _this = this;
    const ctx = wx.createCanvasContext('shareFrends'); //绘图上下文
    var name = this.data.userInfo.name; //名片名字  需要处理换行
    const job = this.data.userInfo.job;
    const phone = this.data.userInfo.mobile;
    const company = this.data.userInfo.company;
    // 截取昵称 超出省略。。。
    if (name.length > 16) { //用户昵称显示一行 截取
      name = name.slice(0, 9) + '...';
    };
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 572, 1000);
    // 最上层图片
    ctx.drawImage(this.data.cuttent, 20, 24.1, 532, 354);
    //名片信息背景
    ctx.setFillStyle('#fafafa')
    ctx.fillRect(30, 390, 512, 289);
    //名片信息线条
    ctx.setStrokeStyle('#eaeaea')
    ctx.strokeRect(20, 376, 532, 313.3)
    //头像  
    ctx.save()
    ctx.arc(492, 449.6, 40, 0, 2 * Math.PI);
    ctx.clip()
    ctx.drawImage(this.data.userInfo.headSrc, 452, 409.6, 80, 80);
    ctx.fillStyle = '#fafafa';
    ctx.restore();
    //姓名职业
    ctx.font = 'normal normal 23px sans-serif';
    ctx.setFillStyle('#5b5b5b')
    ctx.fillText(name, 40, 437.8);
    ctx.font = 'normal normal 17px sans-serif';
    ctx.fillText(job, 40, 467);
    //电话图标
    ctx.drawImage('../../images/phone.png', 40, 510, 30, 30);
    //地址图标
    ctx.drawImage('../../images/addressInfo.png', 40, 558, 30, 30);
    ctx.font = 'normal normal 17px sans-serif';
    ctx.setFillStyle('#519d45');
    //电话
    ctx.fillText(phone, 100, 530);
    ctx.setFillStyle('#5b5b5b');
    //公司
    ctx.fillText(company, 100, 578);
    ctx.font = 'normal blod 17px sans-serif';
    ctx.fillText(name + '专属小程序码', 40, 790);
    ctx.fillText('长按识别小程序保存名片', 40, 843);
    ctx.font = 'normal normal 17px sans-serif';
    ctx.setFillStyle('#a4a4a4');
    ctx.fillText('名片由【无知无畏】生成', 40, 890);
    ctx.draw()
    setTimeout(() => {
      // 将生成的canvas图片，转为真实图片
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'shareFrends',
        success: function (res) {
          wx.hideLoading();
          common.saveImgToCamera(res.tempFilePath)
        },
        fail: function (res) {}
      })
    }, 2000)
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
      path: '/pages/swiperIndex/swiperIndex',
      imageUrl: '',
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        wx.showToast({ title: '转发失败', icon: 'none' });
      }
    }
  }
});