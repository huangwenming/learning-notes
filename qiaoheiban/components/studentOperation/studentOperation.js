// components/studentOperation/studentOperation.js
const Services = require('../../services/services.js')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        studentInfo: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 学生姓名
        studentName: '',
        // 联系电话
        mobile: '',
        // 备注
        note: '',

        // 是否可以保存
        isCanSave: false,
        disableSaveReason: ''
    },
    // 课程操作支持新增和编辑
    attached: function () {
        // 传入课程信息则为编辑
        var studentInfo = this.data.studentInfo;
        if (studentInfo) {
            this.setData({
                studentName: studentInfo.studentName || '',
                mobile: studentInfo.mobile || '',
                note: studentInfo.note || ''
            });
            this.checkStudentInfo();
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 关闭form表单
        closeForm: function () {
            this.triggerEvent('closeForm');
        },
        studentNameInput: function (event) {
            var value = event.detail.value;
            this.setData({
                studentName: value
            });
            this.checkStudentInfo();
        },
        mobileInput: function (event) {
            var value = event.detail.value;
            this.setData({
                mobile: value
            });
            this.checkStudentInfo();
        },
        noteInput: function (event) {
            var value = event.detail.value;
            this.setData({
                note: value
            });
        },
        checkStudentInfo: function () {
            // 不能保存的原因
            var reasons = [
                '请输入学生姓名',
                '请输入正确的手机号'
            ];
            var disableIndex = -1;
            var mobile = this.data.mobile.replace(/\s/g, '');
            if (!/.+/.test(this.data.studentName.replace(/\s/g, ''))) {
                disableIndex = 0;
            }
            else if (!/^1\d{10}/.test(mobile) && (mobile != '')) {
                disableIndex = 1;
            }

            var canSave = disableIndex === -1 ? true : false;

            this.setData({
                isCanSave: canSave,
                disableSaveReason: reasons[disableIndex] || ''
            });
        },
        // 保存学生信息
        saveStudentInfo: function (event) {
            this.checkStudentInfo();
            var self = this;
            var comData = this.data;
            var isChanged = false;
            if (comData.isCanSave) {
                wx.showLoading({
                    mask: true
                });
                var param = {
                    studentId: comData.studentInfo.studentId
                };
                if (comData.studentInfo.studentName != comData.studentName) {
                    isChanged = true;
                    param.studentName = comData.studentName;
                }
                if (comData.studentInfo.mobile != comData.mobile) {
                    isChanged = true;
                    param.mobile = comData.mobile;
                }
                if (comData.studentInfo.note != comData.note) {
                    isChanged = true;
                    param.note = comData.note;
                }
                // 信息发生修改，更新学生信息
                if (isChanged) {
                    Services.updateStudent(param, function (res) {
                        wx.hideLoading();
                        if (res.data.code == 0) {
                            // 更新信息成功
                            self.triggerEvent('studentInfoSaved', param);
                        }
                        else {
                            wx.showToast({
                                title: '保存失败：' + res.data.msg,
                                icon: 'none'
                            });
                        }
                    }, function () {
                        wx.hideLoading();
                    });
                }
                else {
                    wx.hideLoading();
                    self.triggerEvent('studentInfoSaved', param);
                }
            }
            // 不能保存，则给出提示信息
            else {
                wx.showToast({
                    title: this.data.disableSaveReason,
                    icon: 'none'
                });
            }
        }
    }
})
