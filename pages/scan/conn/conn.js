

Page({

  data: {
    infoMess: "",
    url: "",
    local_url: "",
    md5:"",
    startPoint:[0,0],
    moveIndexTemp:0,
    imageIndex:0,
    imageUrl: "http://localhost/wechat/SH_16_angle_test0000.png",
  },

  onLoad: function (opt) {
    var that = this;
    console.log("onLoad");

    this.setData({
      infoMess: "扫描完成，正在生成数据...",
    })

    that.WAITFORSCANNINGRESULT();
  },

  loadImage: function (event) {
    console.log(event)
    var that = this;
  },

  turnleft: function () {
    var imageStr = "http://localhost/wechat/SH_16_angle_test00";
    this.data.imageIndex = this.data.imageIndex -1;
    if (this.data.imageIndex < 0) this.data.imageIndex = 15;

    if (this.data.imageIndex < 10)
    {
      imageStr = imageStr + "0" + this.data.imageIndex + ".png";
    }
    else{
      imageStr = imageStr + this.data.imageIndex + ".png";
    }

    console.log(imageStr);
    this.setData({
      imageUrl: imageStr,
    })
  },

  turnright: function () {
    var imageStr = "http://localhost/wechat/SH_16_angle_test00";
    this.data.imageIndex = this.data.imageIndex + 1;
    if (this.data.imageIndex > 15) this.data.imageIndex = this.data.imageIndex - 15;
    if (this.data.imageIndex < 0) this.data.imageIndex = this.data.imageIndex + 15;
    if (this.data.imageIndex < 10) {
      imageStr = imageStr + "0" + this.data.imageIndex + ".png";
    }
    else {
      imageStr = imageStr + this.data.imageIndex + ".png";
    }
    console.log(imageStr);
    this.setData({
      imageUrl: imageStr
    })
  },

  mytouchstart: function (e) {
    this.setData({ startPoint: [e.touches[0].pageX, e.touches[0].pageY]});

  },

  mytouchmove: function (e) {
    var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    var startPoint = this.data.startPoint;
    var moveIndex = Math.floor((curPoint[0] - startPoint[0]) / wx.getSystemInfoSync().screenWidth * 10) ;
    // console.log(moveIndex);
    // if (this.data.moveIndexTemp == moveIndex) return;
    this.data.moveIndexTemp = moveIndex;
    this.data.imageIndex =  - moveIndex;
    var imageStr = "http://localhost/wechat/SH_16_angle_test00";
    if (this.data.imageIndex > 15) this.data.imageIndex = this.data.imageIndex - 16;
    if (this.data.imageIndex < 0) this.data.imageIndex = this.data.imageIndex + 16;

    if (this.data.imageIndex < 10) {
      imageStr = imageStr + "0" + this.data.imageIndex + ".png";
    }
    else {
      imageStr = imageStr + this.data.imageIndex + ".png";
    }
     console.log(imageStr);
    this.setData({
      imageUrl: imageStr
    })

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

          that.WAITFORMEASUREMENTRESULT();
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

  WAITFORMEASUREMENTRESULT: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + getApp().globalData.scannerid + '/' + getApp().globalData.tid + "/wait_measurement?apikey=" + api_key;
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