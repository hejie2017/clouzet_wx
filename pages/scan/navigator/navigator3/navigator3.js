
Page({
  navigateTo: function () {
    wx.redirectTo({ url: '../navigatorGo/navigatorGo' })
  },
  navigateBack: function () {
    wx.redirectBack()
  },
  // redirectTo: function () {
  //   wx.redirectTo({ url: './navigator' })
  // }

  INITIAL: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + getApp().globalData.scannerid + "/?apikey=" + api_key;
    console.log(http);
    wx.request({
      url: http,
      data: {
        "version": 2,
        "session_key": getApp().globalData.sessionkey
      },
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": getApp().globalData._access_token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 201) {
          // that.setData({
          //   infoMess: "初始化扫描机成功！",
          // })
          getApp().globalData.tid = res.data.tid,

            that.CONFIRM();
        } else {
          // that.setData({
          //   infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg
          // })
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

  CONFIRM: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + getApp().globalData.scannerid + '/' + getApp().globalData.tid + "/confirm?apikey=" + api_key;
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": getApp().globalData._access_token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          // that.setData({
          //   // tid: res.data.tid,
          //   infoMess: "初始化已经确认！",
          // })

          that.navigateTo();
        } else {
          // that.setData({
          //   infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
          // })
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

  onLoad: function () {
    this.INITIAL();
  },
  
})
