
Page({
  data: {
    infoMess: "提醒您，扫描时请穿着内衣或贴身衣服",
    timer:""
  },
  navigateTo: function () {
    clearTimeout(this.data.timer);
    wx.redirectTo({ url: '../navigator4/navigator4' })
  },
  navigateReadTo: function () {
    clearTimeout(this.data.timer);
    wx.redirectTo({ url: '../navigator5/navigator5' })
  },
  navigateBack: function () {
    wx.redirectBack()
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
