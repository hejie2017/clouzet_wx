//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    src:"../../res/ic_scan_finish.png",
    animation: ""
  },


  // rotateAni: function (n) {
  //   console.log("rotate==" + n)
  //   this.animation.rotate(180 * (2)).step()
  //   this.setData({
  //     animation: this.animation.export()
  //   })
  // },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //事件处理函数
  bindViewTap1: function() {
    wx.navigateTo({
      url: '../scan/scanble/scanble'
    })
  },

  //登陆注册
  registEmail: function () {
    wx.navigateTo({
      url: '../account/registEmail/registEmail'
    })
  },
  registPhone: function () {
    wx.navigateTo({
      url: '../account/registPhone/registPhone'
    })
  },
  signin: function () {
    wx.navigateTo({
      url: '../account/signin/signin'
    })
  },
  signinSNS: function () {
    wx.navigateTo({
      url: '../account/signinSNS/signinSNS'
    })
  },
  navigator: function () {
    wx.navigateTo({
      url: '../scan/navigator/navigator1/navigator1'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    this.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function (res) {
        console.log("res")
      }
    })
  }
  
})
