// components/earningItem/earningItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 收入item分为两个类型：1-》周度项；2-》月度项
    type: {
      type: String,
      value: '1'
    },
    earningInfo: {
      type: Object,
      value: {
        timeInfo: {
          month: '',
          week: '本周',
          startDay: '2号',
          endDay: '8号'
        },
        courseCount: '',
        totalTime: '',
        totalEarning: ''
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
