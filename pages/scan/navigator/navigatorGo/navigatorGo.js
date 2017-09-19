// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
var total_micro_second = 5;


// // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
// function date_format(micro_second) {
//   // 秒数
//   var second = Math.floor(micro_second / 1000);
//   // 小时位
//   var hr = Math.floor(second / 3600);
//   // 分钟位
//   var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
//   // 秒位
//   var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
//   // 毫秒位，保留2位
//   var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

//   return hr + ":" + min + ":" + sec + " " + micro_sec;
// }

// 位数不足补零
// function fill_zero_prefix(num) {
//   return num < 10 ? "0" + num : num
// }

Page({
  data: {
    clock: 5,
    timeId:-1
  },

  count_down:function() {
    var that = this;
    // 渲染倒计时时钟
    that.setData({
      clock: total_micro_second
    });

    if(total_micro_second <= 0) {
      that.setData({
        clock: "正在扫描..."
      });
      that.START();
      // that.navigateTo();
      // timeout则跳出递归
      return;
    }
  that.data.timeId = setTimeout(function () {
      // 放在最后--
      total_micro_second -= 1;
      that.count_down();
    }
    , 1000)
  },

  onLoad: function () {
    total_micro_second = 5;
    this.count_down();
  },

  navigateTo: function () {
    clearTimeout(this.data.timeId);
    wx.redirectTo({ url: '../../conn/conn' });
  },

  START: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + getApp().globalData.scannerid + '/' + getApp().globalData.tid + "/start?apikey=" + api_key;
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
          //   infoMess: "启动扫描机！",
          // })
          that.WAITFORSCANNING();
        } else {
          // that.setData({
          //   infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
          // })
        }
      },
      fail: function (err) {
        // that.setData({
        //   infoMess: err,
        // })
        console.log(err)
      }
    })
  },

  WAITFORSCANNING: function () {
    var that = this;
    var doMain = getApp().globalData.doMain;
    var api_key = getApp().globalData.api_key;
    var httpPath = "/api/v1/scanners/";
    var http = doMain + httpPath + getApp().globalData.scannerid + '/' + getApp().globalData.tid + "/wait_scan?apikey=" + api_key;
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
          that.navigateTo();
        } else {
          // that.setData({
          //   infoMess: "errno:" + res.statusCode + " msg:" + res.errMsg,
          // })
        }
      },
      fail: function (err) {
        // that.setData({
        //   infoMess: err,
        // })
        console.log(err)
      }
    })
  },

});

  // navigateBack: function () {
  //   wx.navigateBack()
  // },
