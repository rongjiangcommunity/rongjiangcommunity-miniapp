// pages/magpie/me/label/index.js
const app = getApp();
let tagsArr = [
  '创业者', '小管理', '上班族', '打工仔', '学生', 'IT民工', '自由职业', '无业游民', '有为青年', '月光族',  
  '幽默', '乐观', '低调', '完美主义', '善良', '阳光', '直率', '执着', '体贴', '八卦',
  '内敛', '温柔', '汉子', '张扬', '自信', '萌', '纠结', '梦幻', '纯真', '强势',
  '固执', '好面子', '有信仰', '有担当', '有梦想', '有钱', '爱逞强', '心太软', '傲娇', '很性感',
  '爱时尚', '爱运动', '爱旅游', '爱摄影', '爱画画', '爱舞蹈', '玻璃心', '谨慎', '善解人意', '细心',
  '有原则', '完美主义', '有野心', '占有欲', '掌控欲', '小懒虫', '追求烂漫', '热情洋溢', '青春焕发', '脑洞超大',
  '腹黑', '话痨', '非酋', '中二', '掌控欲', '铲屎官', '大叔', '正太', '萝莉', '御姐',
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifShowModal: false,
    newTag: null,
    tagsArr,
    myTags: [],
  },

  // 添加标签
  addTag: function(e){
    let tag = e.target.dataset.tag;
    let { myTags } = this.data;
    console.log('addTag: ', e.target.dataset.tag );
    if (myTags.indexOf(tag) < 0){
      this.setData({
        myTags: [
          ...myTags,
          tag
        ]
      });
    }
  },  

  // 移除标签
  removeTag: function(e){
    let index = e.target.dataset.index;
    let { myTags } = this.data;
    let deleteTag = myTags.splice(index, 1);
    this.setData({
      myTags
    });
    this.deleteTag(deleteTag);
  },

  // 删除服务器标签
  deleteTag: function( tag){
    const credentials = app.getCredentials();
    const serverUrl = app.serverUrl;
    wx.request({
      url: `${serverUrl}/api/magpie/zrem/${credentials}`,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        value: tag,
        type: "tag"
      },
      success: function (res) { },
      fail: function (err) {
        console.log('err: ', err);
      }
    });
  },

  showModal: function(){
    this.setData({
      ifShowModal: true
    })
  },
  hideModal: function () {
    this.setData({
      ifShowModal: false
    })
  },

  // 修改textarea值
  changeLabelText: function( e ){
    this.setData({
      newTag: e.detail.value
    });
  },

  // 新建标签
  newTag: function () {
    let { newTag } = this.data;
    this.setData({
      tagsArr: [
        newTag,
        ...this.data.tagsArr,
      ],
      ifShowModal: false,
      newTag: null
    });
  },

  // 保存标签
  saveTag: function(){
    let { myTags } = this.data; 
    let that = this;
    const credentials = app.getCredentials();
    const serverUrl = app.serverUrl;
    wx.showLoading();
    wx.request({
      url: `${serverUrl}/api/magpie/zadd/${credentials}`,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        values: myTags,
        type: "tag"
      },
      success: function (res) {
        console.log('res: ', res);
        wx.hideLoading();
        if(res.data.success){
          that.setData({
            disabled: false,
            ifShowModal: false,
            newTag: null
          });
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          app.failAlert(err.errMsg);
        }
      },
      fail: function (err) {
        console.log('err: ', err);
        that.setData({
          disabled: false,
        });
        wx.hideLoading();
        app.failAlert(err.errMsg);
      }
    });
  },

  // 获取初始标签
  getInitTag: function(){
    let that = this;
    const credentials = app.getCredentials();
    const serverUrl = app.serverUrl;
    wx.request({
      url: `${app.serverUrl}/api/magpie/zrange/${credentials}?type=tag`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log('res1: ', res.data)
        if (res.data.success) {
          that.setData({
            myTags: res.data.data
          });
        }
      },
      fail(err) {
        console.error(err)
      }
    });
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.getInitTag();
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})