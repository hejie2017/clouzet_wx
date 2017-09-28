var total_micro_second = 3;

Page({
  data: {
    deviceName:"设备名称",
    clock: 3,
  },
  onLoad: function (opt) {
    var that = this;
    console.log("onLoad");
    that.setData({
      deviceName: opt.name,
    });
    // setTimeout(function () {
    //   //8秒后跳转
    //   that.navigateTo();
    // }
    //   , 6000)
  },
  navigateTo: function () {
    wx.navigateTo({ url: '../navigator2/navigator2' })
  },
  navigateBack: function () {
    wx.navigateBack()
  },

  // redirectTo: function () {
  //   wx.redirectTo({ url: './navigator' })
  // }
})
