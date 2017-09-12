

Page({

  data: {
    _uid: "",
    _auth_token: "",
    _token:"",
    _openId:"",
    _expired_in:"",
    _session_key:"",
    _unionid:"",
    infoMess: "",
  },

  onLoad: function () {
    console.log('onLoad')
    this.setData({
      infoMess: "",
    })
  },

  //用户名和密码输入框事件
  uidInput: function (e) {
    this.setData({
      _uid: e.detail.value
    })
  },

  scan: function () {
    console.log(this.data._auth_token);
    wx.navigateTo({
      url: '../../scan/scanble/scanble?auth_token=' + this.data._auth_token
    })
  },
  // Authorize: function () {
  //   var that = this;
  //   var doMain = 'https://dev_g.tg3ds.com';
  //   var api_key = 'p6EUrTlfQNn3GGh9uZVRwAPPJfMD0cqJ85Qt';
  //   var httpPath = "/api/v1/users/auth";
  //   var http = doMain + httpPath + "/?apikey=" + api_key;

  //   console.log(http);
  //   wx.request({
  //     url: http,
  //     data: {
  //       "username": this.data._username,
  //       "provider": 3,
  //       "auth_token": this.data._auth_token
  //     },
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res.data)
  //       if (res.statusCode == 200) {
  //         console.log(res.data);
  //         that.setData({
  //           infoMess: "获得！！",
  //         })
  //       } else {
  //         that.setData({
  //           infoMess: "errno:" + res.data.error.errno + " msg:" + res.data.error.msg,
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

  signin_SNS: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/users/signin_sns";
    var http = doMain + httpPath + "/?apikey=" + api_key;

    console.log(http);
    wx.request({
      url: http,
      data: {
        "token": that.data._token,
        "provider": 3,
        "uid": that.data._openId
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          that.setData({
            _auth_token: res.data.auth_token,
            _username: res.data.username,
            infoMess: "登陆成功！",
          })
          //that.Authorize();
          console.log(that.data._auth_token);
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

  getWXAccessToken: function () {
    var that = this;
     //var http = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c";
    // var http = "https://api.weixin.qq.com/sns/jscode2session?appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c&js_code=" + getApp().globalData.code +"&grant_type=authorization_code";
    var http = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c&code=" + getApp().globalData.code + "&grant_type=authorization_code";
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
          that.setData({
             _token: res.data.access_token,

             _openId: res.data.openid,
            // _session_key: res.data.session_key,
            // _unionid: res.data.unionid,
            infoMess: "获得令牌！",
          })
          console.log(res);
          that.signin_SNS();
          //that.getWXOpenId();
          //that.checkWXOpenIdToken();
      },
      fail: function (err) {
        that.setData({
          infoMess: err,
        })
        console.log(err)
      }
    })

  },

  getWXOpenId: function () {
    var that = this;
    // var http = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c";
    //var http = "https://api.weixin.qq.com/sns/jscode2session?appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c&js_code=" + getApp().globalData.code +"&grant_type=authorization_code";
     var http = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c&code=" + getApp().globalData.code + "&grant_type=authorization_code";
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
        that.setData({
          _token: res.data.access_token,
          _openId: res.data.openid,
          //_session_key: res.data.session_key,
          //_unionid: res.data.unionid,
          infoMess: "获得令牌！",
        })
        console.log(res);
        // that.signin_SNS();
        that.checkWXOpenIdToken();
      },
      fail: function (err) {
        that.setData({
          infoMess: err,
        })
        console.log(err)
      }
    })

  },

  checkWXOpenIdToken: function () {
    var that = this;
    // console.log("access_token:" + that.data._token)
    // console.log("openId:" + that.data._openId)
    // var http = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c";
    var http = "https://api.weixin.qq.com/sns/userinfo?access_token=" + that.data._token + "&openid=" + that.data._openId + "&lang=zh_CN";
    // vars http = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx648f9fe7690d22cf&secret=9684103f75eba5c553b7cf81b687261c&code=" + getApp().globalData.code + "&grant_type=authorization_code";
    console.log(http);
    wx.request({
      url: http,
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        // that.setData({
        //   //_token: res.data.access_token,
        //   _openId: res.data.openid,
        //   //_session_key: res.data.session_key,
        //   //_unionid: res.data.unionid,
        //   infoMess: "获得令牌！",
        // })
        console.log(res);
        // that.signin_SNS();
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