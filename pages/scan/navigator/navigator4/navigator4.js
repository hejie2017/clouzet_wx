
Page({
  data: {
    infoMess: "若您为长发，请束发，露出脖子，以确保扫描准确度",
    timer: ""
  },
  navigateTo: function () {
    clearTimeout(this.data.timer);
    wx.redirectTo({ url: '../navigator5/navigator5' })
  },

  // redirectTo: function () {
  //   wx.redirectTo({ url: './navigator' })
  // }

  onLoad: function () {
    var that = this;
    that.data.timer = setTimeout(function () {
      that.navigateTo();
    }
      ,6000)
  },
  

})
