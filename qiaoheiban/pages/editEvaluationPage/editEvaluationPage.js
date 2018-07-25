// pages/editEvaluationPage/editEvaluationPage.js
const util = require('../../utils/util.js')
const Services = require('../../services/services.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        evaluationInfo: {
            studentId: "5",
            courseId: "4",
            studentName: "西西",
            yearMonthDay: '',
            fullWeekDay: '',
            stime: "",
            etime: "",
            star: '',
            starEdit: '',
            evaluation: '',
            isSubmit: false
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 根据课程id获取评语信息
        console.log(options);
        var self = this;
        var courseId = options.courseId;
        // 根据课程id获取教案信息
        var param = {
            courseId: courseId
        };
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        Services.getCourseInfo(param, function (res) {
            wx.hideLoading();
            // comment_status: 0未保存，1表示保存，2表示提交
            if (res.data.code === 0) {
                var data = res.data.data;
                var courseInfo = {
                    courseId: courseId,
                    studentId: data.student_id,
                    studentName: data.student_name,
                    stime: data.stime,
                    etime: data.etime,
                    star: parseInt(data.star, 10) || 6,
                    evaluation: data.comment,
                    isSubmit: data.comment_status == 2 ? true : false,
                    starEdit: data.comment_status == 2 ? false : true
                };
                courseInfo.fullWeekDay = util.getDateStampWeekDay(courseInfo.stime * 1000).fullWeekDay;
                var startTime = util.formatTime(new Date(courseInfo.stime * 1000));
                var endTime = util.formatTime(new Date(courseInfo.etime * 1000));
                courseInfo.yearMonthDay = startTime.yearMonthDay;
                courseInfo.stime = startTime.hourMinute;
                courseInfo.etime = endTime.hourMinute;
                self.setData({
                    evaluationInfo: courseInfo
                });
            }
        }, function () {
            wx.hideLoading();
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        // 转发事件来源: button：页面内转发按钮；menu：右上角转发菜单
        if (res.from === 'button') {
            var evaluationInfo = this.data.evaluationInfo;
            // 来自页面内转发按钮
            var data = res.target.dataset;
            var shareType = data.sharetype;
            // console.log(shareType);
            var shareConfig = {};
            if (shareType == 'evaluate') {
                shareConfig.title = '课程反馈';
                // 分享的链接上携带教师uid和学生的姓名
                var userInfo = app.globalData.userInfo;
                var queryStr = '&studentName=' + evaluationInfo.studentName + '&studentId=' + evaluationInfo.studentId + '&uid=' + userInfo.openId;
                shareConfig.path = '/pages/shareEvaluationsPage/shareEvaluationsPage?' + queryStr;
                // console.log(shareConfig.path)
            }
            return {
                title: shareConfig.title,
                path: shareConfig.path,
                // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
                imageUrl: '',
                success: function (res) {
                    // 转发成功
                    console.log('转发成功');
                    // 获取shareTickets
                    console.log(res);
                    wx.navigateBack({});
                },
                fail: function (res) {
                    // 转发失败
                    console.log('转发失败');
                }
            };
        }
    },
    // 监听星级变化
    starChanged: function (event) {
        var star = event.detail.star;
        console.log('star' + star);
        this.setData({
            'evaluationInfo.star': star
        });
    },
    evaluationInput: function (event) {
        var value = event.detail.value;
        this.setData({
            'evaluationInfo.evaluation': value
        });
    },
    // 保存评价
    saveEvaluation: function () {
        this.saveEvaluationWithServer('保存成功', '保存失败');
    },
    // 提交评价
    submitEvaluation: function () {
        // 更新为不可编辑状态
        this.setData({
            'evaluationInfo.isSubmit': true,
            'evaluationInfo.starEdit': false,
            'evaluationInfo.star': this.data.evaluationInfo.star
        });
        this.saveEvaluationWithServer('提交成功', '提交失败');
    },
    saveEvaluationWithServer: function (successTip, failTip) {
        var evaluationInfo = this.data.evaluationInfo;
        var params = {
            courseId: evaluationInfo.courseId,
            star: evaluationInfo.star,
            comment: evaluationInfo.evaluation,
            func: evaluationInfo.isSubmit ? 'commitComment' : 'saveComment'
        };
        wx.showLoading({
            mask: true
        });
        // 评语的更新走课程更新的接口
        Services.updateCourse(params, function (res) {
            wx.hideLoading();
            if (res.data.code === 0) {
                wx.showToast({
                    title: successTip,
                    icon: 'success'
                });
            }
            else {
                wx.showToast({
                    title: failTip + '，' + res.data.msg,
                    icon: 'fail'
                });
            }
        }, function () {
            wx.showToast({
                title: '存储失败，请重试',
                icon: 'fail'
            });
            wx.hideLoading();
        });
    }
})