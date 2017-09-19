//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          that.globalData.code = res.code;
          console.log(res.code)
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    code:null,
    // doMain : 'https://dev_g.tg3ds.com',
    doMain: 'https://api.tg3ds.com',
    api_key : 'p6EUrTlfQNn3GGh9uZVRwAPPJfMD0cqJ85Qt',
    //扫描机相关
    _access_token:"",
    sessionkey: "",
    scannerid: "",
    tid:""
  }
})