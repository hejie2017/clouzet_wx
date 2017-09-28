
Page({
  data: {
    infoMess: "请踩定标示，双手轻握把手",
    animation: {},
    animation1: {}
  },
  navigateTo: function () {
    wx.redirectTo({ url: '../navigatorGo/navigatorGo' })
  },
  navigateBack: function () {
    wx.redirectBack()
  },
  // redirectTo: function () {
  //   wx.redirectTo({ url: './navigator' })
  // }

  onLoad: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        infoMess: "双背伸直，放松身体，直视前方"
      });
      setTimeout(function () {
        that.navigateTo();
      }
        , 3000)
    }
      ,3000)

  },
  
  

})
