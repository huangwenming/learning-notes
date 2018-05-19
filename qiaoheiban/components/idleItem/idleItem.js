// components/idleItem/idleItem.js
// 空闲时间item
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 目前支持两种类型：0表示分为3列（左中右），1表示分为2列（左右）,默认为3列
    type: {
      type: String,
      value: '0'
    },
    // 空闲信息
    idleDetail: {
      type: Object,
      value: {
        // 空闲时间段
        idleInterval: [{
          // 开始时间，结束时间
          startTime: '',
          endTime: ''
        }],
        // 空闲的时间
        idleTime: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  created: function () {
    // console.log(this.data.type);
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
