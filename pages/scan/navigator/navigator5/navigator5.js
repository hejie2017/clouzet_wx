
Page({
  data: {
    infoMess: "请踩定标示，双手轻握把手",
    animation: {},
    animation1: {},
    timer:""
  },
  navigateTo: function () {
    clearTimeout(this.data.timer);
    wx.redirectTo({ url: '../navigator6/navigator6' })
  },
  // redirectTo: function () {
  //   wx.redirectTo({ url: './navigator' })
  // }

  onLoad: function () {
    var that = this;
    that.footStep();

    that.data.timer = setTimeout(function () {
      //8秒后跳转
      that.navigateTo();
    }
      , 7000)
  },
  
  footStep: function () {
    var that = this;

    this.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'ease-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
    })
    this.animation1 = wx.createAnimation({
      duration: 1400,
      timingFunction: 'ease-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 1000,
      transformOrigin: '50% 50% 0',
    })
    this.animation.translateY(-150).step()
    this.setData({
      animation: this.animation.export()
    })

    this.animation1.translateY(-150).step()
    this.setData({
      animation1: this.animation1.export()
    })

  },

})
