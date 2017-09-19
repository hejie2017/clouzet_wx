

Page({

  data: {
    _username: "",
    _password: "",
    _auth_token: "",
    _access_token:"",
    _expired_in:"",
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
      _username: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      _password: e.detail.value
    })
  },

  scan: function () {
    wx.navigateTo({
      url: '../../scan/scanble/scanble?_access_token=' + this.data._access_token
      // url: '../../scan/swiper/swiper?_access_token=' + this.data._access_token
    })
  },

  Authorize: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/users/auth";
    var http = doMain + httpPath + "/?apikey=" + api_key;

    wx.request({
      url: http,
      data: {
        "username": this.data._username,
        "provider": 3,
        "auth_token": this.data._auth_token
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          console.log(res.data);
          that.setData({
            infoMess: "身份已认证！",
            _access_token: res.data.access_token
          })
          that.scan();
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
  
  signin: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/users/signin";
    var http = doMain + httpPath + "/?apikey=" + api_key;

    wx.request({
      url: http,
      data: {
        "username": this.data._username,
        "password": this.data._password,
        "provider": 3
      },
      header: {
        "Content-Type": "application/json"
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