// components/courseOperation/courseOperation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 学生姓名
    studentName: '',
    // 上课时间
    startTime: '上课时间',
    // 下课时间
    endTime: '下课时间',
    // 课程类型
    courseType: 0,
    courseTypes: ['每周此时段重复上课', '试听', '临时上课'],
    // 课时费
    coursePrice: '',
    // 家长电话
    guardianPhone: '',
    // 备注
    comments: '',

    // 是否可以保存
    isCanSave: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭form表单
    closeForm: function () {
      this.triggerEvent('closeform');
    },
    // 开始时间选择器change
    startTimeChange: function (event) {
      console.log('picker发送选择改变，携带值为', event.detail.value);
      this.setData({
        startTime: event.detail.value
      });
    },
    // 结束时间选择器change
    endTimeChange: function (event) {
      console.log('picker发送选择改变，携带值为', event.detail.value);
      this.setData({
        endTime: event.detail.value
      });
    },
    // 课程类型选择器change
    courseTypeChange: function (event) {
      console.log('picker发送选择改变，携带值为', event.detail.value);
      this.setData({
        courseType: event.detail.value
      });
    },
    // 保存课程信息
    saveCourseInfo: function (event) {
      if (this.data.isCanSave) {

      }
      // 不能保存，则给出提示信息
      else {
        wx.showToast({
          title: '请正确输入必填项',
          icon: 'none'
        });
      }
    }
  }
})
