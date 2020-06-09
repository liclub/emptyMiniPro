/**
 * 给的文件资源是否小于LimitSize （M）, 小于走lessCallBack， 大于走moreCallBack
 */
function imageSizeIsLessLimitSize(imagePath, limitSize, lessCallBack, moreCallBack) {
  wx.getFileInfo({
    filePath: imagePath,
    success(res) {
      console.log("压缩前图片大小:", res.size / 1024, 'kb');
      if (res.size > 1024 * 1024 * limitSize) {
        moreCallBack();
      } else {
        lessCallBack();
      }
    }
  })
}

// 主调用方法

/**
 * 获取小于限制大小的Image, limitSize默认为1M，递归调用。
 */
function getLessLimitSizeImage(canvasId, imagePath, limitSize = 1, drawWidth, callBack) {
  console.log(getApp().globalData.systemInfo);
  imageSizeIsLessLimitSize(imagePath, limitSize,
    (lessRes) => {
      callBack(imagePath);
    },
    (moreRes) => {
      wx.getImageInfo({
        src: imagePath,
        success: function (imageInfo) {
          var maxSide = Math.max(imageInfo.width, imageInfo.height);
          //画板的宽高默认是windowWidth
          var windowW = drawWidth;
          var scale = 1;
          if (maxSide > windowW) {
            scale = windowW / maxSide;
          }
          var imageW = Math.floor(imageInfo.width * scale);
          var imageH = Math.floor(imageInfo.height * scale);
          console.log('调用压缩', imageW, imageH);
          getCanvasImage(canvasId, imagePath, imageW, imageH,
            (pressImgPath) => {
              getLessLimitSizeImage(canvasId, pressImgPath, limitSize, drawWidth * 0.7, callBack);
            }
          );
        }
      })
    }
  )
}


/**
 * 获取画布图片 
 */
function getCanvasImage(canvasId, imagePath, imageW, imageH, getImgsuccess) {
  const ctx = wx.createCanvasContext(canvasId);
  ctx.drawImage(imagePath, 0, 0, imageW, imageH);
  ctx.draw(false, () => {
    wx.canvasToTempFilePath({
      canvasId: canvasId,
      x: 0,
      y: 0,
      width: imageW,
      height: imageH,
      quality: 1,
      success(res) {
        getImgsuccess(res.tempFilePath);
      }
    });
  });
}

module.exports = {
  getLessLimitSizeImage: getLessLimitSizeImage,
}