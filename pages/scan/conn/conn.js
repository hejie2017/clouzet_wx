

Page({

  data: {
    infoMess: "",
    url: "",
    local_url: "",
    md5:""
  },

  onLoad: function (opt) {
    var that = this;
    console.log("onLoad");

    this.setData({
      infoMess: "扫描完成，正在生成数据...",
    })

    that.WAITFORSCANNINGRESULT();
  },

  // INITIAL: function () {
  //   var that = this;
  //   var doMain = getApp().globalData.doMain;
  //   var api_key = getApp().globalData.api_key;
  //   var httpPath = "/api/v1/scanners/";
  //   var http = doMain + httpPath + getApp().globalData.scannerid + "/?apikey=" + api_key;
  //   console.log(http);
  //   wx.request({
  //     url: http,
  //     data: {
  //       "version": 2,
  //       "session_key": getApp().globalData.sessionkey
  //     },
  //     header: {
  //       "Content-Type": "application/json",
  //       "X-User-Access-Token": getApp().globalData._access_token
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res)
  //       if (res.statusCode == 201) {
  //         that.setData({
  //           tid: res.data.tid,
  //           infoMess: "初始化扫描机成功！",
  //         })

  //         that.CONFIRM();
  //       } else {
  //         that.setData({
  //           infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg
  //         })
  //       }
  //     },
  //     fail: function (err) {
  //       that.setData({
  //         infoMess: err,
  //       })
  //       console.log(err)
  //     }
  //   })
  // },

  // CONFIRM: function () {
  //   var that = this;
  //   var doMain = getApp().globalData.doMain;
  //   var api_key = getApp().globalData.api_key;
  //   var httpPath = "/api/v1/scanners/";
  //   var http = doMain + httpPath + that.data.scannerid + '/'+ that.data.tid + "/confirm?apikey=" + api_key;
  //   console.log(http);
  //   wx.request({
  //     url: http,
  //     header: {
  //       "Content-Type": "application/json",
  //       "X-User-Access-Token": that.data._access_token
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res)
  //       if (res.statusCode == 200) {
  //         that.setData({
  //           // tid: res.data.tid,
  //           infoMess: "初始化已经确认！",
  //         })
  //       } else {
  //         that.setData({
  //           infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
  //         })
  //       }
  //     },
  //     fail: function (err) {
  //       that.setData({
  //         infoMess: err,
  //       })
  //       console.log(err)
  //     }
  //   })
  // },

  // START: function () {
  //   var that = this;
  //   var doMain = getApp().globalData.doMain;
  //   var api_key = getApp().globalData.api_key;
  //   var httpPath = "/api/v1/scanners/";
  //   var http = doMain + httpPath + that.data.scannerid + '/' + that.data.tid + "/start?apikey=" + api_key;
  //   console.log(http);
  //   wx.request({
  //     url: http,
  //     header: {
  //       "Content-Type": "application/json",
  //       "X-User-Access-Token": that.data._access_token
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res)
  //       if (res.statusCode == 200) {
  //         that.setData({
  //           infoMess: "启动扫描机！",
  //         })
  //         that.WAITFORSCANNING();
  //       } else {
  //         that.setData({
  //           infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
  //         })
  //       }
  //     },
  //     fail: function (err) {
  //       that.setData({
  //         infoMess: err,
  //       })
  //       console.log(err)
  //     }
  //   })
  // },

  // CANCEL: function () {
  //   var that = this;
  //   var doMain = getApp().globalData.doMain;
  //   var api_key = getApp().globalData.api_key;
  //   var httpPath = "/api/v1/scanners/";
  //   var http = doMain + httpPath + that.data.scannerid + '/' + that.data.tid + "/cancel?apikey=" + api_key;
  //   console.log(http);
  //   wx.request({
  //     url: http,
  //     header: {
  //       "Content-Type": "application/json",
  //       "X-User-Access-Token": that.data._access_token
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res)
  //       if (res.statusCode == 200) {
  //         that.setData({
  //           infoMess: "启动扫描机！",
  //         })
  //       } else {
  //         that.setData({
  //           infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
  //         })
  //       }
  //     },
  //     fail: function (err) {
  //       that.setData({
  //         infoMess: err,
  //       })
  //       console.log(err)
  //     }
  //   })
  // },

  // WAITFORSCANNING: function () {
  //   var that = this;
  //   var doMain = getApp().globalData.doMain;
  //   var api_key = getApp().globalData.api_key;
  //   var httpPath = "/api/v1/scanners/";
  //   var http = doMain + httpPath + that.data.scannerid + '/' + that.data.tid + "/wait_scan?apikey=" + api_key;
  //   console.log(http);
  //   wx.request({
  //     url: http,
  //     header: {
  //       "Content-Type": "application/json",
  //       "X-User-Access-Token": that.data._access_token
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res)
  //       if (res.statusCode == 200) {
  //         that.setData({
  //           infoMess: "开始扫描！",
  //         })
  //       } else {
  //         that.setData({
  //           infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
  //         })
  //       }
  //     },
  //     fail: function (err) {
  //       that.setData({
  //         infoMess: err,
  //       })
  //       console.log(err)
  //     }
  //   })
  // },

  WAITFORSCANNINGRESULT: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + getApp().globalData.scannerid + '/' + getApp().globalData.tid + "/wait_finish?apikey=" + api_key;
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
          that.setData({
            infoMess: "获得扫描结果！",
            url: "",
            local_url: "",
            md5: ""
          })
        } else {
          that.setData({
            infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
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