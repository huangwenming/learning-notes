// pages/shareEvaluationsPage/shareEvaluationsPage.js
const util = require('../../utils/util.js')
const Services = require('../../services/services.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        studentName: '',
        evaluations: [/*{
            yearMonthDay: '5月13号',
            fullWeekDay: '星期三',
            startTime: '09:00',
            endTime: '10:00',
            star: 4,
            content: '小明今天认真听讲，弹得一手好琴。今天学了献给爱丽丝前八章节，第五章节在家可以稳固一下。'
        }*/],
        hasAuthorization: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        // 解析链接上携带的学生名字和教师id
        var studentId = options.studentId;
        var studentName = options.studentName;
        var uid = options.uid;
        var params = {
            studentId: studentId,
            useLogin: false
        };
        uid && (params.uid = uid);
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
        // 拉取某个老师对某个学生的评语
        Services.getCommentList(params, function (res) {
            wx.hideLoading();
            if (res.data.code === 0) {
                var data = res.data.data;
                var evaluations = [];
                if (data.courseList) {
                    data.courseList.forEach(function (item) {
                        var evaluation = {};
                        evaluation.fullWeekDay = util.getDateStampWeekDay(item.stime * 1000).fullWeekDay;
                        var startTime = util.formatTime(new Date(item.stime * 1000));
                        var endTime = util.formatTime(new Date(item.etime * 1000));
                        evaluation.yearMonthDay = startTime.yearMonthDayCn;
                        evaluation.startTime = startTime.hourMinute;
                        evaluation.endTime = endTime.hourMinute;
                        evaluation.star = parseInt(item.star, 10) || 1;
                        evaluation.content = item.comment;
                        // 显示的评论一定是提交状态才行
                        evaluation.isSubmit = item.comment_status == 2 ? true : false;
                        evaluation.isSubmit && (evaluations.push(evaluation));
                    });
                }
                self.setData({
                    studentName: studentName,
                    evaluations: evaluations
                });
            }
        }, function () {
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
    }
})