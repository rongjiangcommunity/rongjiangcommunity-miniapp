//index.js
//获取应用实例
const app = getApp()

var initData = {
    pageState: 'index', // index, loading, error
    tab:'index',
    userInfo: {}, // userId用户id，nickname昵称, avatarUrl头像url, college大学，compony公司 , isauthenticated:booloean 是否已经认证
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    schoolmatesInfo: { // 校友通咨询。。。实在不会命名了
      coverUrl: '', // 封面
      title: '', // 标题
      look: 0, // 看过的人数
      time: '' // 发布时间
    },

    recommends: [ // 推荐校友
      {
        userId: '',
        avatarUrl: '',
        nickname:'',
        college: ''
      }, {
        userId: '',
        avatarUrl: '',
        nickname:'',
        college: ''
      }, {
        userId: '',
        avatarUrl: '',
        nickname:'',
        college: ''
      }, 
    ],

    schoolmates: [ // 校友圈
      {
        avatarUrl: '',
        nickname: '',
        city: '',
        college: '',
        compony: '',
        content: '',
        time: '',
        like: 0,
        commemts: 0
      }, {
        avatarUrl: '',
        nickname: '',
        city: '',
        college: '',
        compony: '',
        content: '',
        time: '',
        like: 0,
        commemts: 0
      }, {
        avatarUrl: '',
        nickname: '',
        city: '',
        college: '',
        compony: '',
        content: '',
        time: '',
        like: 0,
        commemts: 0
      },
    ]
};
var debugData = {
    pageState: 'index', // index, loading, error
    tab:'index',
    userInfo: {}, // userId用户id，nickname昵称, avatarUrl头像url, college大学，compony公司 
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    schoolmatesInfo: { // 校友通咨询。。。实在不会命名了
      coverUrl: '', // 封面
      title: '', // 标题
      look: 0, // 看过的人数
      time: '' // 发布时间
    },

    recommends: [ // 推荐校友
      {
        userId: '', // 用户id
        avatarUrl: '', // 头像url
        nickname:'', // 昵称
        college: '' // 大学
      }, {
        userId: '',
        avatarUrl: '',
        nickname:'',
        college: ''
      }, {
        userId: '',
        avatarUrl: '',
        nickname:'',
        college: ''
      }, 
    ],

    schoolmates: [ // 校友圈
      {
        id: 0, // 该动态的id
        userId: 0, // 用户id
        avatarUrl: '', // 校友头像url
        nickname: '', // 校友昵称
        city: '', // 城市
        college: '', // 大学
        compony: '', // 公司
        content: '', // 动态内容
        time: '', // 发布时间
        like: 0, // 喜欢的人数
        commemts: 0 // 评论的数目
      }, {
        avatarUrl: '',
        nickname: '',
        city: '',
        college: '',
        compony: '',
        content: '',
        time: '',
        like: 0,
        commemts: 0
      }, {
        avatarUrl: '',
        nickname: '',
        city: '',
        college: '',
        compony: '',
        content: '',
        time: '',
        like: 0,
        commemts: 0
      },
    ]
};

Page({
  data: debugData,
  onGotUserInfo: function(e) {
    console.log(e.detail)
  },
  //事件处理函数
  gotoRegisterAndLogin: function() {
    wx.navigateTo({
      url: '../registerAndLogin/registerAndLogin'
    });
  },
  jumpToMsgCenter: function () { // 跳到消息中心，也就是右上角的泡泡图标
    console.log('jumpToMsgCenter');
  },
  lookForSchoolmate: function () { // 找校友页面
    console.log('lookForSchoolmate');
  },
  jumpToRecruitment: function () { // 招聘页面
    console.log('jumpToRecruitment');
  },
  jumpToCharity: function () { // 慈善页面
    console.log('jumpToCharity');
  },
  jumpToActivity: function () { // 校友活动页面
    console.log('jumpToActivity');
  },
  jumpToSchoolmatesInfo: function () { // 更多资讯。。。求给命名建议
    console.log('jumpToSchoolmatesInfo');
  },
  followSchoolmate: function () { // 关注
    console.log('followSchoolmate');
  },
  inviteSchoolmate: function () {
    console.log('inviteSchoolmate'); // 邀请校友
  },
  createMsg: function () { // 发布新动态，这个名字只是我临时想不到动态英文怎么写随意写的，如果你知道请在注释中跟我说一下
    console.log('createMsg');
  },
  likeTheMsg: function () { // 点赞
    console.log('likemsg');
  },
  addCommemt: function () { // 添加评论
    console.log('addCommemt');
  },
  jumpToSchoolmates: function () {
    console.log('jumpToSchoolmates'); // 查看更多校友圈，回调到schoolmates的页面
  },


  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        console.log(res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
