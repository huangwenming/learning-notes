//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // 显示课程操作表单
    showOperationForm: false,
    // 当前选择的tab：0表示已排课程，1表示空闲时间，2表示当天收入
    curentTabSelected: 0,
    // 空闲时间的数据
    idleInfo: [{
      idleInterval: [{
        startTime: '09:00',
        endTime: '11:00'
      }],
      // 空闲的时间
      idleTime: '120'
    }],
    // 已排课程信息
    courses: [{
      startTime: '09:00',
      endTime: '09:30',
      courseTime: '30',
      studentName: '西西',
      courseOrder: '3',
      comment: '五月份要办生日音乐会',
      price: '58'
    }],
    // 当天收入信息
    earningInfo: {
      earningList: [{
        studentName: '黄晓明',
        earning: 58,
        courseStatus: 0
      }, {
        studentName: '琪琪',
        earning: 78,
        courseStatus: 1
      }, {
        studentName: '西西',
        earning: 80,
        courseStatus: 2
      }, {
        studentName: '东东',
        earning: 60,
        courseStatus: 0
      }],
      totalEarning: 2000
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  // 显示课程操作表单
  showCourseForm: function () {
    this.setData({
      showOperationForm: !this.data.showOperationForm
    });
  },
  // 跳转到个人总结页面
  goToConcludePage: function () {
    wx.navigateTo({
      url: '/packageMore/pages/conclude/conclude'
    });
  },
  // 切换总结tab
  changeConcludeTab: function (event) {
    // 根据dataset.tabid区分点击的是哪个tab
    let tabid = event.currentTarget.dataset.tabid;
    this.setData({
      curentTabSelected: tabid
    });
  }
})
