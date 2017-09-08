

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

  Authorize: function () {
    var that = this;
    var doMain = 'https://dev_g.tg3ds.com';
    var api_key = 'p6EUrTlfQNn3GGh9uZVRwAPPJfMD0cqJ85Qt';
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
  
  signin: function () {
    var that = this;
    var doMain = 'https://dev_g.tg3ds.com';
    var api_key = 'p6EUrTlfQNn3GGh9uZVRwAPPJfMD0cqJ85Qt';
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