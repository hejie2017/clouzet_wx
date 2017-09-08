/**
 * 搜索设备界面
 */
var util = require('../../../utils/util.js')

Page({
  data: {
    logs: [],
    list:[],
    str:'',
  },
   onLoad: function () {
    console.log('onLoad')
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
        console.log("-----success----------");
         console.log(res);
       wx.startBluetoothDevicesDiscovery({
  services: [],
  success: function(res){
    // success
     console.log("-----startBluetoothDevicesDiscovery--success----------");
     console.log(res);
  },
  fail: function(res) {
    // fail
     console.log(res);
  },
  complete: function(res) {
    // complete
     console.log(res);
  }
})


      },
      fail: function(res) {
         console.log("-----fail----------");
        // fail
         console.log(res);
      },
      complete: function(res) {
        // complete
         console.log("-----complete----------");
         console.log(res);
      }
    })

     wx.getBluetoothDevices({
       success: function(res){
         // success
         //{devices: Array[11], errMsg: "getBluetoothDevices:ok"}
          that.setData({
            list:res.devices,
          });
          
          that.data.list.forEach((item) => {
            console.log(item.deviceId);
            console.log(item.name);
            console.log('advertisData （String） ', util.base64ToString(wx.arrayBufferToBase64(item.advertisData)));
          })

       },
       fail: function(res) {
         // fail
       },
       complete: function(res) {
         // complete
       }
     })

  },


  onShow:function(){
  },
   //点击事件处理
  bindViewTap: function(e) {
    var title =  e.currentTarget.dataset.title;
    var name = e.currentTarget.dataset.name;
     wx.redirectTo({
       url: '../conn/conn?deviceId=' + title + '&name=' + name,
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
