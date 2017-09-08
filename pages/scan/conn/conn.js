

Page({

  data: {
    deviceId:"",
    infoMess: "",
  },

  onLoad: function (opt) {
    var that = this;
    console.log("onLoad");
    console.log('deviceId=' + opt.deviceId);
    that.setData({ deviceId: opt.deviceId });
    this.setData({
      infoMess: "",
    })
  },

  signin: function () {
    var that = this;
    var doMain = 'https://dev_g.tg3ds.com';
    var api_key = 'p6EUrTlfQNn3GGh9uZVRwAPPJfMD0cqJ85Qt';
    var httpPath = " /api/v1/scanners/";
    var http = doMain + httpPath + deviceId + "/?apikey=" + api_key;
    console.log(getApp().globalData._auth_token);
    wx.request({
      url: http,
      data: {
        "version": 2,
        "session_key": ""
      },
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": getApp().globalData._auth_token
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          console.log(res.data);
          that.setData({
            _auth_token: res.data.auth_token,
            infoMess: "登陆成功！",
          })
          that.Authorize();
        } else {
          that.setData({
            infoMess: "errno:" + res.data.error.errno + " msg:" + res.data.error.msg,
          })
        }
      },
      fail: function (err) {
        that.setData({
          infoMess: err,
        })
        console.log(err)
      }
    })
  },

})