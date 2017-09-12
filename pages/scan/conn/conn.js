

Page({

  data: {
    idKey:"",
    infoMess: "",
    _access_token: "",
    tid:"",
    sessionkey:"",
    scannerid:"",
    url: "",
    local_url: "",
    md5:""
  },

  onLoad: function (opt) {
    var that = this;
    console.log("onLoad");
    var dx = that.data.idKey.indexOf("TG3D");
    that.setData({ 
      idKey: opt.idKey,
      _access_token: opt._access_token,
      sessionkey : opt.idKey.substr(dx - 7, 4),
      scannerid: opt.idKey.substr(dx - 14, 7)
       });
    this.setData({
      infoMess: "",
    })
  },

  INITIAL: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + that.data.scannerid + "/?apikey=" + api_key;
    console.log(http);
    console.log(that.data._access_token);
    wx.request({
      url: http,
      data: {
        "version": 2,
        "session_key": that.data.sessionkey
      },
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": that.data._access_token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 201) {
          that.setData({
            tid: res.data.tid,
            infoMess: "初始化扫描机成功！",
          })
        } else {
          that.setData({
            infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg
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

  CONFIRM: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + that.data.scannerid + '/'+ that.data.tid + "/confirm?apikey=" + api_key;
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": that.data._access_token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            // tid: res.data.tid,
            infoMess: "初始化已经确认！",
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

  START: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + that.data.scannerid + '/' + that.data.tid + "/start?apikey=" + api_key;
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": that.data._access_token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            infoMess: "启动扫描机！",
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

  CANCEL: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + that.data.scannerid + '/' + that.data.tid + "/cancel?apikey=" + api_key;
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": that.data._access_token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            infoMess: "启动扫描机！",
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

  WAITFORSCANNING: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + that.data.scannerid + '/' + that.data.tid + "/wait_scan?apikey=" + api_key;
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": that.data._access_token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            infoMess: "开始扫描！",
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

  WAITFORSCANNINGRESULT: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + that.data.scannerid + '/' + that.data.tid + "/wait_finish?apikey=" + api_key;
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json",
        "X-User-Access-Token": that.data._access_token
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