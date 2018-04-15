// pages/me/me.js

var initData = {
  // 页面状态： loading 加载中 error错误 me个人页面 modify编辑个人资料页面 
  pageState: 'me',
  userInfo: { // 用户信息
    userId: 1, // 用户id
    avatarUrl: '', // 头像url，如果没有注册则为微信头像
    nickname: '', // 姓名
    city: '', // 城市
    college: '', // 大学
    compony: '', // 公司
    isSectorMember: false, // 是否为校友会部门成员
    bussinessCardUrl: '', // 名片url
    followList: [1, 2, 3] // 关注的校友的ID
  },
  isShowBussnessCard: false, // 是否显示名片：名片以弹出层的形式出现
  isShowAboutUs: false, // 是否显示“关于我们”模块 也是弹出层
  isShowBussinessCard: false // 是否显示“名片”
}

var debugData = {
  // 页面状态： loading 加载中 error错误 me个人页面 modify编辑个人资料页面 
  pageState: 'me',
  userInfo: { // 用户信息
    userId: 1, // 用户id
    avatarUrl: '', // 头像url，如果没有注册则为微信头像
    nickname: '', // 姓名
    city: '', // 城市
    college: '', // 大学
    compony: '', // 公司
    isDepartmentMember: false, // 是否为校友会部门成员
    bussinessCardUrl: '', // 名片ur
  },
  isShowBussnessCard: false, // 是否显示名片：名片以弹出层的形式出现
  isShowAboutUs: false, // 是否显示“关于我们”模块 也是弹出层
  isShowBussinessCard: false // 是否显示“名片”
};

Page({

  /**
   * 页面的初始数据
   */
  data: debugData,

  // 事件处理函数
  // 命名无能，恳请给出命名建议

  logout: function () { //退出登陆
    console.log('logout')
  },

  jumpToModify: function () { // 跳到“编辑资料”界面
    this.setData({
      'pageState': 'modify'
    });
    console.log('jumpToModify');
  },

  completeModify: function () { // 修改资料页面的【确定】
    this.setData({
      'pageState': 'me'
    });
    console.log('completeModify');
  },

  backToMe: function () { // 返回“我的“页面
    this.setData({
      'pageState': 'me'
    });
    console.log('backToMe');
  },

  jumpToSchoolmates: function () { // 跳转到“我的校友圈“页面
    console.log('jumpToSchoolmates')
  },

  jumpToChatRoom: function () { // 跳转到聊天页面，目前我的理解是小程序自带的客服接口
    console.log('jumpToChatRoom')
  },

  jumpToDepartment: function () { // 跳转到“我的部门”页面
    console.log('jumpToDepartment')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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