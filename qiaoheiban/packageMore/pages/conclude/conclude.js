// packageMore/pages/conclude/conclude.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    // 当前选择的tab：0表示周收入，1表示月收入，2表示学生
    curentTabSelected: '0',
    weeksEarningInfo: [{
      timeInfo: {
        month: '',
        week: '本周',
        startDay: '2号',
        endDay: '8号'
      },
      courseCount: '40',
      totalTime: '20',
      totalEarning: '2400'
    }, {
      timeInfo: {
        month: '',
        week: '上周',
        startDay: '1号',
        endDay: '7号'
      },
      courseCount: '40',
      totalTime: '18',
      totalEarning: '2200'
    }],
    monthsEarningInfo: [{
      timeInfo: {
        month: '3月'
      },
      courseCount: '40',
      totalTime: '20',
      totalEarning: '2400'
    }, {
      timeInfo: {
        month: '2月'
      },
      courseCount: '40',
      totalTime: '18',
      totalEarning: '2200'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存中读取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    // 无用户信息则请求用户授权
    else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 切换总结tab
  changeConcludeTab: function (event) {
    // 根据dataset.tabid区分点击的是哪个tab
    let tabid = event.currentTarget.dataset.tabid;
    this.setData({
      curentTabSelected: tabid
    });
  },
  // 跳转到详情页
  goToDetailPage: function (event) {
    var options = event.currentTarget.dataset;
    var queryStr = '?timeid=' + options.timeid + '&type=' + options.earningtype;
    wx.navigateTo({
      url: '/packageMore/pages/earningDetail/earningDetail' + queryStr
    });
  }
})