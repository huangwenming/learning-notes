// components/earningList/earningList.js
// 收入list:支持当天、周度、月度收入
Component({
  // 启用多slot支持，方便根据slot-name进行切换
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 组件类型：0-》当日收入，1-》周度收入，2-》月度收入
    type: {
      type: String,
      value: 0
    },
    earningInfo: {
      type: Object,
      value: {
        earningList: [{
          studentName: '黄晓明',
          earning: 58,
          courseStatus: 0
        }],
        totalEarning: 2000
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
    converCourseStatus: function (originValue) {
      console.log(123);
      var targetVaule = '';
      targetVaule = originValue == 0 ? '' : originValue == 1 ? '试听' : '请假';
      return targetVaule;
    }
  }
})
