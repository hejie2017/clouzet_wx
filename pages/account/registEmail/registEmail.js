

Page({
   
    data:{
      _email:"",
      _password:"",
      infoMess:"",
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
        _email: e.detail.value
      })
    },
    passWdInput: function (e) {
      this.setData({
        _password: e.detail.value
      })
    },

    Check_email: function () {
      var that = this;
      var doMain = 'https://dev_g.tg3ds.com';
      var api_key = 'p6EUrTlfQNn3GGh9uZVRwAPPJfMD0cqJ85Qt';
      var httpPath = "/api/v1/users/check_account";
      var http = doMain + httpPath + "/?apikey=" + api_key;

      wx.request({
        url: http,
        data: {
          "username": this.data._email,
          "provider": 3
        },
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        success: function (res) {
          console.log(res.data.available)
          if (res.statusCode == 200) {
            if (res.data.available == true)
            {
              that.setData({
                infoMess: "可以使用的账号！",
              })
            }else{
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

    register_email: function () {
        var that = this;
        var doMain = 'https://dev_g.tg3ds.com';
        var api_key = 'p6EUrTlfQNn3GGh9uZVRwAPPJfMD0cqJ85Qt';
        var httpPath = "/api/v1/users/register_email";
        var http = doMain + httpPath + "/?apikey=" + api_key;

        wx.request({
          url: http,
          data: {
            "email": this.data._email,
            "password": this.data._password,
            "provider": 3
          },
          header: {
             "Content-Type":"application/json"
          },
          method:"POST",
          success: function (res) {
            console.log(res)
            if (res.statusCode == 201){
              that.setData({
                infoMess: res.data.username + " 注册成功！",
              })
            }else{
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