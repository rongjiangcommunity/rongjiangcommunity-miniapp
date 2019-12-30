wx.cloud.init()
const app = getApp();

Page({
  data: {
    files: [
    //   {
    //     url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
    // }, {
    //     loading: true
    // }
    // , {
    //     error: true
    // }
  ]
  },
  async onLoad() {
    this.setData({
        selectFile: this.selectFile.bind(this),
        uplaodFile: this.uplaodFile.bind(this),
        deletePic: this.deletePic.bind(this),
    });

    const res = await this.getRemoteImgIds();
    if (res && res.data) {
      const urls = res.data;
      // this.setData({
      //   files: urls.map(url => ({url, delete:true,}))
      // });
    }
    console.log(res.data);
  },
  chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files: that.data.files.concat(res.tempFilePaths)
              });
          }
      })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },
  selectFile(files) {
      console.log('files', files)
      // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    const self = this;
    console.log('upload files', files)
    return Promise.all(files.tempFilePaths.map(f => {
      return new Promise((resolve, reject) => {
        const name = getFilename(f);
        if (name) {
          wx.cloud.uploadFile({
            cloudPath: `magpie/${name}`,
            filePath: f, // 小程序临时文件路径
            success: res => {
              console.log(res);
              resolve(res.fileID);
            },
            fail: reject,
          });
        } else {
          resolve('');
        }
      });
    })).then(urls => {
      return {
        urls: urls.filter(u => !!u),
      }
    });
  },
  deletePic(e) {
    var index = e.detail.index;
    var files = this.data.files;
    var file = files.splice(index, 1);
    this.setData({
        files: files,
        currentFiles: files
    });

    // this.triggerEvent('delete', { index: index, item: file[0] });
  },
  uploadError(e) {
      console.log('upload error', e.detail)
  },
  async uploadSuccess(e) {
    console.log(e);
    const urls = e.detail.urls;
    await this.postImgIds(urls);

    console.log('upload success', e.detail)
  },
  
  async postImgIds(ids) {
    const sid = app.getCredentials();
    const type = 'album';
    wx.request({
      url: `${app.serverUrl}/api/magpie/zadd/${sid}`,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        values: ids,
        type,
      },
      success: function (res) {
        console.log(res);
      },
      fail: console.error
    });
  },
  async getRemoteImgIds() {
    const sid = app.getCredentials();
    const type = 'album';

    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.serverUrl}/api/magpie/zrange/${sid}?type=${type}`,
        header: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          if (res && res.statusCode == 200) {
            resolve(res.data);
          } else {
            reject('request error')
          }
        },
        fail: reject
      });
    });
  },
  async deleteImgId(id) {
    const sid = app.getCredentials();
    const type = 'album';

    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.serverUrl}/api/magpie/zrem/${sid}`,
        header: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
          value: id,
          type,
        },
        success: function (res) {
          console.log(res);
          if (res && res.statusCode == 200) {
            resolve(res.data);
          } else {
            reject('request error')
          }
        },
        fail: reject
      });
    });
  }
});

function getFilename(url) {
  return (url.match(/[^.]{32}\.\w+$/)||[])[0];
}
