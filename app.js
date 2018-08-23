App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    defaultCity: '',
    defaultCounty: '',
    weatherData: '',
    userInfo: null,
    air: '',
    day: '',
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://douban.uieee.com",
    getMessageCode:"index/getCode",
    heWeatherBase: "https://free-api.heweather.com",
    juhetoutiaoBase:"https://v.juhe.cn/toutiao/index",
    tencentMapKey: "4HYBZ-EB23D-SLC42-HQ5R3-LP3LQ-OZFU5",
    heWeatherKey: "4a817b4338e04cc59bdb92da7771411e",
    juhetoutiaoKey:"a9f703a0200d68926f707f3f13629078",
    curBook: ""
  }
  

})
