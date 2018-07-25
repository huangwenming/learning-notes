// pages/editCommentsPage/editCommentsPage.js
const util = require('../../utils/util.js')
const Services = require('../../services/services.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        planInfo: {
            courseId: "7",
            studentName: "西西",
            yearMonthDay: '',
            fullWeekDay: '',
            stime: "",
            etime: "",
            plan: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        var self = this;
        var courseId = options.courseId;
        // 根据课程id获取教案信息
        var param = {
            courseId: courseId
        };
        Services.getCourseInfo(param, function (res) {
            if (res.data.code === 0) {
                var data = res.data.data;
                var courseInfo = {
                    courseId: courseId,
                    studentName: data.student_name,
                    stime: data.stime,
                    etime: data.etime,
                    plan: data.note
                };
                courseInfo.fullWeekDay = util.getDateStampWeekDay(courseInfo.stime * 1000).fullWeekDay;
                var startTime = util.formatTime(new Date(courseInfo.stime * 1000));
                var endTime = util.formatTime(new Date(courseInfo.etime * 1000));
                courseInfo.yearMonthDay = startTime.yearMonthDay;
                courseInfo.stime = startTime.hourMinute;
                courseInfo.etime = endTime.hourMinute;
                self.setData({
                    planInfo: courseInfo
                });
            }
        });
    },
    // 监听教案编辑区的输入
    planContentChange: function (event) {
        var value = event.detail.value;
        this.setData({
            'planInfo.plan': value
        });
    },
    // 保存教案
    savePlan: function () {
        var planInfo = this.data.planInfo;
        var params = {
            courseId: planInfo.courseId,
            note: planInfo.plan,
            func: 'saveNote'
        };
        wx.showLoading({
            mask: true
        });
        Services.updateCourse(params, function (res) {
            wx.hideLoading();
            // 107表示更新的内容和数据库内的重复
            if (res.data.code === 0 || res.data.code === 107) {
                // 存储在缓存中，供首页更新
                var lastestPlan = params;
                wx.setStorageSync('lastestPlan', lastestPlan);
                wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                });
                wx.navigateBack({});
            } else {
                wx.showToast({
                    title: '保存失败，请重试',
                    icon: 'fail'
                });
            }
        }, function () {
            wx.hideLoading();
        });

    }
})