/**
 * 搜索设备界面
 */
var util = require('../../../utils/util.js')

Page({
  data: {
    logs: [],
    list:[],
    str:'',
    _access_token:""
  },
   onLoad: function (opt) {
    console.log('onLoad')
    this.setData({
      _access_token: opt._access_token
    })
    console.log(this.data._access_token)
    var that = this;
// const SDKVersion = wx.getSystemInfoSync().SDKVersion || '1.0.0'
// const [MAJOR, MINOR, PATCH] = SDKVersion.split('.').map(Number)
// console.log(SDKVersion);
// console.log(MAJOR);
// console.log(MINOR);
// console.log(PATCH);

// const canIUse = apiName => {
//   if (apiName === 'showModal.cancel') {
//     return MAJOR >= 1 && MINOR >= 1
//   }
//   return true
// }

// wx.showModal({
//   success: function(res) {
//     if (canIUse('showModal.cancel')) {
//       console.log(res.cancel)
//     }
//   }
// })
      wx.openBluetoothAdapter({
      success: function(res){
        // success
        // console.log("-----success----------");
        //  console.log(res);
       wx.startBluetoothDevicesDiscovery({
  services: [],
  success: function(res){
    // success
    //  console.log("-----startBluetoothDevicesDiscovery--success----------");
    //  console.log(res);
  },
  fail: function(res) {
    // fail
    //  console.log(res);
  },
  complete: function(res) {
    // complete
    //  console.log(res);
  }
})

      },
      fail: function(res) {
        //  console.log("-----fail----------");
        // // fail
        //  console.log(res);
      },
      complete: function(res) {
        // complete
        //  console.log("-----complete----------");
        //  console.log(res);
      }
    })

     wx.getBluetoothDevices({
       success: function(res){
         // success
         //{devices: Array[11], errMsg: "getBluetoothDevices:ok"}
          console.log(res)
          
          for (var i = res.devices.length -1; i >= 0; i--) {
            res.devices[i].advertisData = util.base64ToString(wx.arrayBufferToBase64(res.devices[i].advertisData));
            if (res.devices && res.devices[i].advertisData && res.devices[i].advertisData.indexOf("TG3D") > 0) {
              console.log("find TG3D");
              var dx = res.devices[i].advertisData.indexOf("TG3D");
              getApp().globalData._access_token = that.data._access_token,
                getApp().globalData.sessionkey = res.devices[i].advertisData.substring(dx -4, dx),
                getApp().globalData.scannerid = res.devices[i].advertisData.substring(dx - 11, dx - 4)
              console.log(getApp().globalData.sessionkey);
              console.log(getApp().globalData.scannerid);
              wx.redirectTo({
                // url: '../conn/conn?_access_token=' + that.data._access_token + '&idKey=' + res.devices[i].advertisData + '&name=' + res.devices[i].name,
                url: '../navigator/navigator1/navigator1?&name=' + res.devices[i].name,
              })
            }
          }
          that.setData({
            list: res.devices,
          });

       },
       fail: function(res) {
         // fail
       },
       complete: function(res) {
         // complete
       }
     })

     wx.onBluetoothDeviceFound(function (res) {
       console.log('new device list has founded')
       for (var i = 0; i < res.devices.length; i++) {
         res.devices[i].advertisData = util.base64ToString(wx.arrayBufferToBase64(res.devices[i].advertisData));
         if (res.devices ){
           if (res.devices[i].advertisData){
            if (res.devices[i].advertisData.indexOf("TG3D") > 0) {
              console.log("find TG3D");
              var dx = res.devices[i].advertisData.indexOf("TG3D");
              getApp().globalData._access_token = that.data._access_token,
              getApp().globalData.sessionkey = res.devices[i].advertisData.substring(dx - 4, dx),
              getApp().globalData.scannerid = res.devices[i].advertisData.substring(dx - 11, dx - 4)
              wx.redirectTo({
                url: '../navigator/navigator1/navigator1?&name=' + res.devices[i].name,
              })
            }
           }
         }
       }
      //  that.setData({
      //    list: res.devices,
      //  });
     })
  },

  onShow:function(){
  },
   //点击事件处理
  bindViewTap: function(e) {
    
    var deviceId = e.currentTarget.dataset.did;
    var name = e.currentTarget.dataset.name;
    var idKey = e.currentTarget.dataset.adsd;

    wx.redirectTo({
      url: '../navigator/navigator1/navigator1?_access_token=' + this.data._access_token + '&idKey=' + idKey + '&name=' + name,
       success: function(res){
         // success
       },
       fail: function(res) {
         // fail
       },
       complete: function(res) {
         // complete
       }
    })
   },

})


