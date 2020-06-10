var App = getApp();
import drawQrcode from '../../utils/weapp.qrcode.js' // 二维码

const fsm = wx.getFileSystemManager();
// width	必须，二维码宽度，与canvas的width保持一致	200
// height	必须，二维码高度，与canvas的height保持一致	200
// canvasId	非必须，绘制的canvasId	'myQrcode'
// ctx	非必须，绘图上下文，可通过 wx.createCanvasContext('canvasId') 获取，v1.0.0+版本支持	'wx.createCanvasContext('canvasId')'
// text	必须，二维码内容	'https://github.com/yingye'
// typeNumber	非必须，二维码的计算模式，默认值-1	8
// correctLevel	非必须，二维码纠错级别，默认值为高级，取值：{ L: 1, M: 0, Q: 3, H: 2 }	1
// background	非必须，二维码背景颜色，默认值白色	'#ffffff'
// foreground	非必须，二维码前景色，默认值黑色	'#000000'
// _this	非必须，若在组件中使用，需要传入，v0.7.0+版本支持	this
// callback	非必须，绘制完成后的回调函数，v0.8.0+版本支持。安卓手机兼容性问题，可通过自行设置计时器来解决，更多可以参考 issue #18	function (e) { console.log('e', e) }
// x	非必须，二维码绘制的 x 轴起始位置，默认值0，v1.0.0+版本支持	100
// y	非必须，二维码绘制的 y 轴起始位置，默认值0，v1.0.0+版本支持	100
// image	非必须，在 canvas 上绘制图片，层级高于二维码，v1.0.0+版本支持，更多可参考drawImage	{ imageResource: '', dx: 0, dy: 0, dWidth: 100, dHeight: 100 }
const initDraw = {
  width: 160,
  height: 160,
  x: 20, 
  y: 20,
  canvasId: 'myQrcode',
  text: '',
  correctLevel: 0,
  image: {
    imageResource: '../../images/pro-log.png',
    dx: 80,
    dy: 80,
    dWidth: 40,
    dHeight: 40
  },
  callback(e) {
    console.log('e', e)
  }
};

const canvasTopath = function(canvsId) {
  wx.canvasToTempFilePath({
    x: 0,
    y: 0,
    canvasId: canvsId,
    success: function (res) {
      console.log(res)
    },
    fail: function (res) {}
  })
}

const base64src = function (base64data, FILE_BASE_NAME) {
  return new Promise((resolve, reject) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath);
      },
      fail() {
        reject(new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  });
};

//b=true 不添加第二个参数的属性到第一个参数
const extend = function (des, src, b) {
  for (var i in src) {
    if (b && isUndefined(des[i]))
      continue;
    des[i] = src[i] || "";
  }
  return des;
};

const isUndefined = function (o) {
  return typeof o == "undefined";
};

const urlTobase64 = function (url, fun) {
  wx.request({
    url: url,
    responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
    success: res => {
      let base64 = wx.arrayBufferToBase64(res.data);
      if (typeof fun == "function") fun(base64)
    }
  })
}
const toBase64 = function (url, type) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        resolve(res.data)
      },
      fail: res => reject(res.errMsg)
    })
  })
}

const rpx2px = function (rpx, windowWidth) {
  return Math.round(rpx / 750 * windowWidth);
}

const isArray = function (o) {
  return o != null && typeof o == "object" && 'splice' in o && 'join' in o;
};

const tapHandler = function(option) {
  // https://github.com/yingye/weapp-qrcode
  extend(initDraw,option,true);
  drawQrcode(initDraw);
}

module.exports = {
  base64src,
  extend,
  urlTobase64,
  rpx2px,
  toBase64,
  isArray,
  tapHandler
}