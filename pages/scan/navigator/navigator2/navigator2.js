var total_micro_second = 3;

Page({
  data: {
    deviceName: "",
    clock: 3,
    timeId: -1
  },
  onLoad: function (opt) {
    var that = this;
    console.log("onLoad");
    that.setData({
      deviceName: opt.name,
    });
    setTimeout(function () {
      //8秒后跳转
      that.navigateTo();
    }
      , 8000)
  },
  navigateTo: function () {
    wx.navigateTo({ url: '../navigator3/navigator3' })
  },
  navigateBack: function () {
    wx.navigateBack()
  },

  // redirectTo: function () {
  //   wx.redirectTo({ url: './navigator' })
  // }
})
