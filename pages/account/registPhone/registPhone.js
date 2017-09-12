

Page({

  data: {
    _phone: "",
    _password: "",
    _confirm_token:"",
    infoMess: "",
  },

  onLoad: function () {
    console.log('onLoad')
    this.setData({
      infoMess: "",
    })
  },

  //用户名和密码输入框事件
  userNameInput: function (e) {
    this.setData({
      _phone: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      _password: e.detail.value
    })
  },
  confirmTokenInput: function (e) {
    this.setData({
      _confirm_token: e.detail.value
    })
  },

  Check_phone: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/users/check_account";
    var http = doMain + httpPath + "/?apikey=" + api_key;

    wx.request({
      url: http,
      data: {
        "username": this.data._phone,
        "provider": 3
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          if (res.data.available == true) {
            that.setData({
              infoMess: "可以使用的账号！",
            })
          } else {
            that.setData({
              infoMess: "重复使用的账号！",
            })
          }
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

  req_confirmation_token: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/users/req_confirmation_token";
    var http = doMain + httpPath + "/?apikey=" + api_key;

    wx.request({
      url: http,
      data: {
        "mobile_phone": this.data._phone,
        "provider": 3
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          that.setData({
            infoMess: "已发送手机短信！",
          })
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

  confirm_phone: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/users/confirm_phone";
    var http = doMain + httpPath + "/?apikey=" + api_key;

    wx.request({
      url: http,
      data: {
        "mobile_phone": this.data._phone,
        "confirm_token": this.data._confirm_token,
        "provider": 3,
        "locale": "zh-CN"
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          that.setData({
            infoMess: "已确认手机短信！",
          })
          
        } else {
          that.setData({
            infoMess: "errno:" + res.data.error.errno + " msg:" + res.data.error.msg,
          })
        }
      },
      fail: function (err) {
        that.setData({
          infoMess: res.msg,
        })
        console.log(err)
      }
    })

  },

  register_phone: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/users/register_phone";
    var http = doMain + httpPath + "/?apikey=" + api_key;

    wx.request({
      url: http,
      data: {
        "mobile_phone": this.data._phone,
        "password": this.data._password,
        "confirm_token": this.data._confirm_token,
        "provider": 3
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode == 201) {
          that.setData({
            infoMess: res.data.username + " 注册成功！",
          })
        } else {
          that.setData({
            infoMess: "errno:" + res.data.error.errno + " msg:" + res.data.error.msg,
          })
        }
      },
      fail: function (err) {
        that.setData({
          infoMess: res.msg,
        })
        console.log(err)
      }
    })
  },

})