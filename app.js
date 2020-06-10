var { WeToast } = require("common/module/wetoast/wetoast.js");
var appCommon = require("common/js/appCommon.js");

App({
  WeToast,
  globalData: {
    userInfo: null, // 微信用户信息
    apiBaseURL: "", // 接口地址
    appid: "wxa411024686dd355e", // appId
    screenHeight: "", // 屏幕高度
    screenWidth: "", // 屏幕宽度
    firstPage: "", // 首页地址
    resetBtm: 0, // iphoneX 适配
    currentPagePath: "", // 当前页面路径
    headerHeight: "" // header 高度
  },
  onLaunch: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.screenHeight = res.windowHeight;
        var windowWidth = res.windowWidth;
        // 单位rpx
        that.globalData.headerHeight = res.statusBarHeight / ( res.windowWidth / 750 ) + 88; 
        // 单位px
        that.globalData.headerHeight = res.statusBarHeight + 46;
        that.globalData.screenWidth = windowWidth;
        if (res.model.indexOf("iPhone X") != -1) {
          that.globalData.resetBtm = 100;
        }
      }
    });
  },
  autoUpdate: function() { // 自动更新
    wx.clearStorageSync();
    var self = this
    if (wx.canIUse('getUpdateManager')) { // 获取小程序更新机制兼容
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            success: function(res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  showCancel:false,//隐藏取消按钮
                  confirmText:"确定更新",//只保留确定更新按钮
                  success: function(res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager){
    var self=this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },
  onShow: function(options) {},
  // 初始化校验
  pageLoadInit: function(path, cb) {
    var that = this;
    var currents = getCurrentPages();
    var page = currents[currents.length - 1];
    var route = page.route;
    var _path = "/" + route;
    if (path) {
      _path = _path + "?" + path;
    } else {
      _path = _path + "?1=1";
    }
    appCommon.getUserToken(cb);
  },
  lowVersionTip: function() { // 版本过低提示
    wx.showModal({
      title: "",
      content: "您的微信版本较低，请更新到最新版再试",
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
        }
      }
    });
  },
  // 服务器返回报错
  serverErrorTip: function(errmsg) {
    wx.hideLoading();
    var _toast = new this.WeToast();
    _toast.toast({
      title: errmsg,
      duration: 2000
    });
  },

  /**
   * [Get location]
   * @param  {Function} cb [callback]
   */
  getLocation: function(cb) {
    var that = this;
    if (this.globalData.curLocation) {
      typeof cb == "function" && cb(this.globalData.curLocation);
    } else {
      wx.getLocation({
        type: "wgs84", // 返回可以用于wx.openLocation的经纬度
        success: function(res) {
          console.info("Get Current Location Successful");
          that.globalData.curLocation = res;
          typeof cb == "function" && cb(that.globalData.curLocation);
        },
        fail: function(res) {
          console.info("Get Current Location Failed: ", res);
          typeof cb == "function" && cb();
          if (wx.canIUse("openSetting")) {
            wx.openSetting({
              success: res => {
                if (res.authSetting["scope.userLocation"]) {
                  wx.getLocation({
                    success: function(res) {
                      that.globalData.curLocation = res;
                      typeof cb == "function" && cb(that.globalData.curLocation);
                    },
                    fail: function(res) {
                      typeof cb == "function" && cb();
                    }
                  });
                } else {
                  typeof cb == "function" && cb();
                }
              }
            });
          } else {
            that.lowVersionTip();
          }
        }
      });
    }
  },
  serverCallback: function(successCallback, failCallback) {
    var that = this;
    var resCallback = function(res) {
      if (res.statusCode == 200) {
        wx.hideLoading();
        if (res.data && res.data.result.code == "1") {
          typeof successCallback == "function" && successCallback(res.data);
        } else if (res.data && res.data.result.code == "0") {
          typeof failCallback == "function" && failCallback(res.data);
        }
      } else {
        wx.showToast({
          title: "当前请求异常，亲稍后再试~",
          icon: "none",
          duration: 2000
        });
        wx.hideLoading();
        typeof failCallback == "function" && failCallback(res.data);
      }
    };
    return resCallback;
  },
  // 是否过了10张页面
  isOverPage: function(callback, failCallback) {
    var that = this;
    var pages = getCurrentPages();
    if (pages.length == 10) {
      wx.showToast({
        title: "页面已经过了10张，无法打开下一页",
        icon: "none",
        duration: 2000
      });
      typeof failCallback == "function" && failCallback();
      return;
    } else {
      typeof callback == "function" && callback();
    }
  },
  // 页面加载中
  pageLoading: function(msg) {
    var title = msg || "页面加载中";
    wx.showLoading({
      title: title,
      mask: true
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 5000);
  },
  // 解析扫码路径参数
  getCodeParam: function(name, route) {
    if (route) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = route.match(reg);
      if (r != null) return unescape(r[2]);
      return "-1";
    }
    return "-1";
  }
});
