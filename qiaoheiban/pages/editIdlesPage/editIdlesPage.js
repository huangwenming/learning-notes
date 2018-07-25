// pages/editIdlesPage/editIdlesPage.js
const util = require('../../utils/util.js')
const Services = require('../../services/services.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultIdlesInfo: [['07:00', '08:00'], ['08:00', '09:00'], ['09:00', '10:00'], ['11:00', '12:00'], ['12:00', '13:00'], ['13:00', '14:00'], ['14:00', '15:00'], ['15:00', '16:00'], ['16:00', '17:00'], ['17:00', '18:00'], ['18:00', '19:00'], ['19:00', '20:00'], ['20:00', '21:00'], ['21:00', '22:00']],
        selectedIdleInfo: [],
        shareId: '',
        dateStamp: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取url上携带的参数
        this.setData({
            dateStamp: options.dateStamp || new Date().getTime()
        });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        // 转发事件来源: button：页面内转发按钮；menu：右上角转发菜单
        if (res.from === 'button') {
            console.log('sharid' + JSON.stringify(this.data))
            var shareId = this.data.shareId;
            var selectedIdleInfo = this.data.selectedIdleInfo;
            var dateStamp = this.data.dateStamp;
            var teacherInfo = {
                nickName: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
            };
            return {
                title: '可排课时间',
                path: '/pages/shareLessonsPage/shareLessonsPage?shareType=1&shareId=' + shareId + '&selectedIdleInfo=' + selectedIdleInfo + '&dateStamp=' + dateStamp + '&teacherInfo=' + encodeURIComponent(JSON.stringify(teacherInfo)),
                // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
                imageUrl: '',
                success: function (res) {
                    // 转发成功
                    console.log('转发成功');
                    // 获取shareTickets
                    console.log(res);
                },
                fail: function (res) {
                    // 转发失败
                    console.log('转发失败');
                }
            };
        }
    },
    // 空余时间选择框变化
    idleCheckboxChanged: function (event) {
        // ["12:00-13:00", "13:00-14:00"]
        // console.log(event.detail.value)
        this.setData({
            selectedIdleInfo: event.detail.value.sort()
        });
    },
    // 保存空闲时间选择，用于分享页面的数据展示
    saveIdleInfo: function () {
        var self = this;
        var params = {
            'share_data': JSON.stringify({
                idleInfo: this.data.selectedIdleInfo,
                dateStamp: this.data.dateStamp,
                teacherInfo: app.globalData.userInfo
            })
        };
        Services.saveIdleInfo(params, function (res) {
            console.log(res);
            if (res.data.code === 0) {
                self.setData({
                    shareId: res.data.data.share_id
                });
            }
        });
    }
})