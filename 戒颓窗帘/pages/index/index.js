//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // cmds:'<this command="" a="" is="">'
    cmds: "switch0:1"
  },
 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var _this = this;

    wx.request({
      url: 'https://api.heclouds.com/devices/' + 505319336
,
      header: {
        'api-key': app.data.api_key
      },
      success: function (res) {
        console.log(res.data);
        _this.setData(
          {
            device_name: res.data.data.title,
            device_id: res.data.data.id,
            protocol: res.data.data.protocol,
            create_time: res.data.data.create_time,
          });
      },
      fail: function () {
        wx.showToast({
          //title: '与服务器通信失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })

    
  },
  sendCmd: function () {
    var _this = this;
    wx.request({
      url: 'http://api.heclouds.com/cmds?device_id=' + this.data.device_id ,
      header: {
        //'content-type': 'application/x-www-form-urlencoded',
        'api-key': app.data.api_key
      },
      method: 'POST',
      data: this.data.cmds,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
