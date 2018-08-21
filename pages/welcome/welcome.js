// pages/welcome/welcome.js
Page({
  /**
    * 页面的初始数据
    */
  data: {
    sliderList: [
      { selected: true, imageSource: 'http://up.enterdesk.com/edpic/7d/35/13/7d3513ecabdf1f7eb4f1407f0e82f23c.jpg' },
      { selected: false, imageSource: '../../images/2.jpg' },
      { selected: false, imageSource: 'http://pic1.win4000.com/wallpaper/9/538544be6ae36.jpg' },
    ]
  },
  clickLogo:function(){
    wx.reLaunch({
      url: '../login/login'
    });
  },
  checkIsLogin: function(){
    wx.setStorage({
      key: "username",
      data: "hewei"
    })
  },
  //轮播图绑定change事件，修改图标的属性是否被选中
  switchTab: function (e) {
   // console.log(e);
    var sliderList = this.data.sliderList;
    var i, item;
    for (i = 0; item = sliderList[i]; ++i) {
      item.selected = e.detail.current == i;
    }
    this.setData({
      sliderList: sliderList
    });
    if (sliderList.length - 1 == e.detail.current){
      try {
        var res  = wx.getStorageSync('userInfos');
        if(res[0].nickName !=undefined){
          wx.reLaunch({
            url: '../index/index'
          });
        }else{
          wx.reLaunch({
            url: '../login/login'
          });
        }
      } catch (e) {
        console.log("获取用户信息失败");
      }
    }
    console.log(sliderList.length);
  },
  animationfinish: function (e) {
    console.log(e)
  },
  onShareAppMessage: function () {
    return {
      title: 'e 生活',
      desc: '还没进去就想分享？我就喜欢你这样的老铁☺️',
      success: function (res) {
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }
})