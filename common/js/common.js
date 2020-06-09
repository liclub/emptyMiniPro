var App = getApp();

const fsm = wx.getFileSystemManager();
// const FILE_BASE_NAME = 'tmp_base64src';

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


module.exports = {
  base64src,
  extend,
  urlTobase64,
  rpx2px,
  toBase64,
  isArray
}