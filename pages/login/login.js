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
    phone:''
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
    var data = {"data":{ "phone": that.data.phone}}
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
  showtest: function(e){
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
    console.log(data)
    util.request(app.globalData.checkBdCode, data).then((res) => {
      console.log(res)
    })
  },
  show: function () {
    console.log(this.data['userInfo'])
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
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