var app = getApp();
var setting = require('../../utils/lookSetting.js');
Page({
  data: {
    "sex": "",
    "bgList": ["#fff", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2"],
    "common": {},
    "commonRight": [],
    "commonBeRight": [],
    "redtop": "",
    "pakclass": "",
    "sstype": "ss5",
    "skirtType": "",
    "headstyle": "",
    "clothesStyle": "",
    "kuziStyle": "",
    "taostyle": "",
    "shosestyle": "",
    "typeList": ["", "", "", "", "", "", "", "", "", ""]
  },
  onLoad: function (options) {
    console.log(setting);
    this.data.sex = options.sex;
    if (this.data.sex == "0") {//女
      var girlSetting = setting.girlSetting;
      this.data.common = girlSetting;
      this.data.commonRight = girlSetting.right;
      this.data.commonBeRight = girlSetting.type1;
      this.data.common = girlSetting;
      var commonRight = this.data.commonRight;
      var commonBeRight = this.data.commonBeRight;
      this.data.typeList[0] = "../../images/img/p3_model_f.png"
      this.data.typeList[1] = girlSetting.type1[1].url;
      this.data.headstyle = "headLook";
      this.data.clothesStyle = "clothesLook";
      this.data.kuziStyle = "kuzi";
      this.data.taostyle = "qunzi";
      this.data.shosestyle = "shose";
      var newList = this.data.typeList;
      this.setData({
        commonRight: commonRight,
        commonBeRight: commonBeRight,
        common: girlSetting,
        typeList: newList,
        headstyle: "headLook",
        clothesStyle: "clothesLook",
        kuziStyle: "kuzi",
        taostyle: "qunzi",
        shosestyle: "shose"
      });
    } else {
      var boySetting = setting.boySetting;
      this.data.common = boySetting;
      this.data.commonRight = boySetting.right;
      this.data.commonBeRight = boySetting.type1;
      var commonRight = this.data.commonRight;
      var commonBeRight = this.data.commonBeRight;
      this.data.typeList[0] = "../../images/img/p3_model_m.png"
      this.data.typeList[1] = boySetting.type1[1].url;
      this.data.headstyle = "bheadLook";
      this.data.clothesStyle = "bclothesLook";
      this.data.kuziStyle = "bkuzi";
      this.data.taostyle = "btao";
      this.data.shosestyle = "shose";
      var newList = this.data.typeList;
      this.setData({
        commonRight: commonRight,
        commonBeRight: commonBeRight,
        common: boySetting,
        typeList: newList,
        headstyle: "bheadLook",
        clothesStyle: "bclothesLook",
        kuziStyle: "bkuzi",
        taostyle: "btao",
        shosestyle: "bshose"
      });
    }
  },
  onPageScroll: function (e) {

  },
  tapType: function (e) {
    var bgList = ["#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2", "#f2f3f2"];
    var idx = e.currentTarget.dataset.idx;
    var type = e.currentTarget.dataset.type;
    bgList[idx] = "#fff";
    this.data.bgList = bgList;
    this.data.commonBeRight = this.data.common[type];
    var typeInfo = this.data.common[type];
    this.setData({
      bgList: bgList,
      commonBeRight: typeInfo
    });
  },
  getLook: function (e) {
    var that = this;
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var d = (windowWidth * 0.6 - 132.3) / 2;
    var ctx = wx.createContext('myCanvas'); //189 684
    if (this.data.typeList[0]) {
      ctx.drawImage(this.data.typeList[0], d, 100, 189, 684);
    }
    if (this.data.typeList[1]) {
      ctx.drawImage(this.data.typeList[1], d + 30, 30, 132, 137);
    }
    if (this.data.typeList[2]) {
      ctx.drawImage(this.data.typeList[2], d - 8, 123, 198, 260);
    }
    if (this.data.typeList[3]) {
      ctx.drawImage(this.data.typeList[3], d + 15, 270, 150, 420);
    }
    if (this.data.typeList[4]) {
      if (this.data.skirtType == "2") {
        ctx.drawImage(this.data.typeList[4], d - 10, 130, 288, 472);
      } else {
        ctx.drawImage(this.data.typeList[4], d - 10, 130, 288, 472);
      }
    }
    if (this.data.typeList[5]) {
      ctx.drawImage(this.data.typeList[5], d + 44, 590, 69, 204);
    }
    if (this.data.typeList[6]) {
      if (this.data.pakclass == "pakbag1") {
        ctx.drawImage(this.data.typeList[6], d - 10, 130, 72, 122);
      } else if (this.data.pakclass == "pakbag2") {
        ctx.drawImage(this.data.typeList[6], d + 30, 140, 126, 200);
      } else if (this.data.pakclass == "pakbag3") {
        ctx.drawImage(this.data.typeList[6], d - 30, 360, 89, 232);
      }
    }
    if (this.data.typeList[7]) {
      ctx.drawImage(this.data.typeList[7], d + 60, 75, 63, 27);
    }
    if (this.data.typeList[8]) {
      if (this.data.sstype == "ss1") {
        ctx.drawImage(this.data.typeList[8], d + 60, 90, 65, 36);//耳环
      } else if (this.data.sstype == "ss2") {
        ctx.drawImage(this.data.typeList[8], d - 20, 20, 230, 108);//帽子
      } else if (this.data.sstype == "ss3") {
        ctx.drawImage(this.data.typeList[8], d, 340, 22, 27);//手环
      } else if (this.data.sstype == "ss4") {
        ctx.drawImage(this.data.typeList[8], d + 70, 130, 40, 20);//项链
      } else if (this.data.sstype == "ss5") {
        ctx.drawImage(this.data.typeList[8], d + 45, 270, 95, 27);//腰带
      }
    }
    if (this.data.typeList[9]) {
      ctx.drawImage(this.data.typeList[9], d + 20, 600, 205, 155);
    }
    wx.drawCanvas({
      canvasId: 'myCanvas',
      actions: ctx.getActions()
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: d - 30,
        y: 20,
        width: 300,
        height: 1000,
        destWidth: 300,
        destHeight: 1000,
        quality: 0,
        canvasId: 'myCanvas',
        success: function (res) {
          console.log(res.tempFilePath);
          wx.navigateTo({
            url: '/pages/createLook/createLook?uri=' + res.tempFilePath
          })
        }
      })
    }, 100);
  },
  tapBeRight: function (e) {
    var url = e.currentTarget.dataset.url;
    var type = e.currentTarget.dataset.type;
    var paktype = e.currentTarget.dataset.class;
    var sstype = e.currentTarget.dataset.sstype;
    var skirtType = "";
    if (e.currentTarget.dataset.skirttype) {
      skirtType = e.currentTarget.dataset.skirttype;
    } else {
      skirtType = this.data.skirtType;
    }
    var redtop = "";
    this.data.typeList[type] = url;
    var newList = this.data.typeList;
    if (type == "4") {//连衣裙裤子和衣服都没有
      if (skirtType != "2") {
        this.data.typeList[2] = "";
        this.data.typeList[3] = "";
      } else {
        this.data.typeList[3] = "";
      }
      var idx = e.currentTarget.dataset.idx;
      if (idx == "2") {
        redtop = "10%";
      } else {
        redtop = "13%";
      }
      this.setData({
        redtop: redtop,
        skirtType: skirtType
      });
    }
    if (type == "2") {
      if (skirtType != "2") {
        this.data.typeList[4] = "";
      }
    }
    if (type == "3") {
      this.data.typeList[4] = "";
    }
    if (type == "6") {
      this.data.pakclass = "pakbag" + paktype;
      this.setData({
        pakclass: "pakbag" + paktype
      });
    }
    if (type == "8") {
      this.data.sstype = "ss" + sstype;
      this.setData({
        sstype: "ss" + sstype
      });
    }
    this.setData({
      typeList: newList
    });
  }
})