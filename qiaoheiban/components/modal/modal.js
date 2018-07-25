// components/modal/modal.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        modalInfo: {
            type: Object,
            value: {
                // 输入行弹框是否显示
                isShow: false,
                title: '提示',
                desc: '提示内容',
                // 数据的内容
                input: '',
                inputHolder: '',
                // 内容的检验
                inputReg: '',
                regFailReason: '',
                sure: '确定',
                cancel: '取消',
                // 是否显示取消按钮
                showCancel: true
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 是否支持确认
        isCanConfirm: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        preventTouchMove: function () {},
        // 监听对话框内的input框的input事件
        inputChange: function (event) {
            this.setData({
                'modalInfo.input': event.detail.value
            });
            this.checkInputInfo();
        },
        // 检查输入框的内容是否合法
        checkInputInfo: function () {
            var modalInfo = this.data.modalInfo;
            if (new RegExp(modalInfo.inputReg, 'g').test(modalInfo.input)) {
                this.setData({
                    isCanConfirm: true
                });
            }
        },
        // 控制对话框显隐
        setModalShow: function (value) {
            var isShow = value === undefined ? !this.data.modalInfo.isShow : value;
            this.setData({
                'modalInfo.isShow': isShow
            });
        },
        maskHideModal: function (event) {
            if (event.currentTarget.dataset.id == 'mask') {
                this.setModalShow(false);
            }
        },
        onCancel: function () {
            this.setModalShow();
        },
        onConfirm: function () {
            this.checkInputInfo();
            // 不符合要求则给出提示
            if (!this.data.isCanConfirm) {
                wx.showToast({
                    title: this.data.modalInfo.regFailReason,
                    icon: 'none'
                });
            }
            // 符合要求则把填写内容传递给父组件，同时关闭对话框
            else {
                this.triggerEvent('confirm', {
                    inputValue: this.data.modalInfo.input
                })
                this.setModalShow();
            }
        }
    }
})
