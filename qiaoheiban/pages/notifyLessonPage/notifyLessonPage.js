// pages/notifyLessonPage/notifyLessonPage.js
const util = require('../../utils/util.js')
const Services = require('../../services/services.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      studentName: '',
      monthDay: '',
      fullWeekDay: '',
      startTime: '',
      endTime: '',
      /*studentName: '西西',
      monthDay: '5月14号',
      fullWeekDay: '星期三',
      startTime: '09:00',
      endTime: '10:00',*/
      hasAuthorization: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      var courseId = options.courseId;
      var uid = options.uid;
      var self = this;
      wx.showLoading({
          mask: true
      });
      // 拉取是否授权
      Services.login({
          success: function (res) {
              // 授权成功则取消文字模糊效果
              self.setData({
                  hasAuthorization: true
              });
          },
          fail: function (res) {
              // console.log(res)
              // 课程提醒页面需要授权才能查看
              if (res.type == 'ERR_WX_GET_USER_INFO') {
                  self.setData({
                      hasAuthorization: false
                  });
              }
          }
      });

      // 拉取分享课程数据
      Services.getCourseInfo({
          uid: uid,
          courseId: courseId,
          useLogin: false
      }, function (res) {
            wx.hideLoading();
            var data = res.data.data;
            self.setData({
                studentName: data.student_name,
                fullWeekDay: util.getDateStampWeekDay(data.stime * 1000).fullWeekDay,
                monthDay: util.formatTime(new Date(data.stime * 1000)).monthDay,
                startTime: util.formatTime(new Date(data.stime * 1000)).hourMinute,
                endTime: util.formatTime(new Date(data.etime * 1000)).hourMinute
            })
      }, function (res) {
          wx.hideLoading();
      });
  },
    // 首次获取授权信息，目前无法直接调起授权信息，必须通过按钮
    getUserAuthorization: function (event) {
        if (event.detail.userInfo) {
            this.setData({
                hasAuthorization: true
            });
            // 刷新页面
            // this.onLoad();
        }
    },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})