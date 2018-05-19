// components/courseItem/courseItem.js
// 课程列表项
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courseInfo: {
      type: Object,
      value: {
        startTime: '',
        endTime: '',
        courseTime: '',
        studentName: '',
        courseOrder: '',
        comment: '',
        price: ''
      },
      observer: function (newVal, oldVal) {
        console.log(newVal);
       }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
