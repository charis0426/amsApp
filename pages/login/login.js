//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()
// pages/login/logion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceUrl:'',
    nickName:'',
    time:'发送',
    currentTime: 61,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    disabled:false,
    hasUserInfo: false,
    flag: true,
    bdSub:true,
    phone:'',
    isBd:false,
    isLogin:true,
    showSq:true,
  },
  mobileInputEvent: function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  //点击发送验证码
  sendCode: function(){
    //出发后台接口
    var that = this
    //验证手机号码
    if (!util.checkPhone(that.data.phone)) {
      util.alert(1, "手机号格式错误")
      return
    }
    var data = { "data": { "phone": that.data.phone, "code": app.globalData.code}}
    util.request(app.globalData.getMessageCode, data).then((res) => {
      console.log(res.error_code)
      if (res.error_code === 0) {
        wx.setStorageSync('sessionId', res.sessionId);
        util.alert(2, "验证码发送成功")
        that.getCode();
        that.setData({
          disabled: true,
          bdSub:false
        })
      } else {
        util.alert(1, "验证码发送失败")
      }
    })
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    var interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重发',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  bdSubmit: function(e){
    var that = this
    var code = e.detail.value.code
    //组装绑定数据
    var data={"data":{
      "code": code,
      "nickName": that.data['userInfo']['nickName'],
      "avatarUrl": that.data['userInfo']['avatarUrl'],
      "city": that.data['userInfo']['city'],
      "country": that.data['userInfo']['country'],
      "gender": that.data['userInfo']['gender'],
      "language": that.data['userInfo']['language'],
      "province": that.data['userInfo']['province']
    }}
    //console.log(data)
    util.request(app.globalData.checkBdCode, data).then((res) => {
      if (!res.hasOwnProperty('data') &&res['errMsg']){
        util.alert(1, res['errMsg'])
      }else{
        //隐藏绑定栏目
        that.setData({
          isBd: true,
          isLogin: false,
          flag: true
        })
      //console.log(res)
      //将token存下来
      wx.setStorageSync('token', res.data.token);
      that.test()
      }
    })
  },
  //测试服务端接口
  test: function(){
    var data={"data":{
      "name":"喜事",
      "page":1
    }}
    util.request(app.globalData.apiTest, data).then((res) => {
      console.log(res)
    })
  },
  show: function () {
    this.setData({ flag: false })

  },
  //消失

  hide: function () {

    this.setData({ flag: true })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否授权
    //将全局userinfo给当前页面
    if(app.globalData.userInfo !=null){
      this.setData({
        showSq: app.globalData.showSq,
        userInfo: app.globalData.userInfo
      })
    }else{
      app.userInfoReadyCallback = userInfo => {
        if (userInfo != null) {
          this.setData({
            showSq: app.globalData.showSq,
            userInfo: app.globalData.userInfo
          });
        }
      }
    }
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      console.log(1)
      //用户按了允许授权按钮
      this.setData({
        userInfo: e.detail.userInfo,
        showSq: true
      })

    } else {
      //用户按了拒绝按钮
      console.log(2)
    }
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