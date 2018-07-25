// components/picker/picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        pickData: {
            type: Array,
            value: []
            // value: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 120]
        },
        selcetedValue: {
            type: Number,
            value: 35
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
      transformY: 0,
      startY: 0,
      endY: 0,
      distances: [],
      opacitys: [],
      zooms: []
  },
  attached: function () {
      var pickData = this.data.pickData;
      var self = this;
      var selectedIndex = 1;
      pickData.forEach(function (item, index) {
          if (item == self.data.selcetedValue) {
              selectedIndex = index;
          }
      });
      this.setData({
          transformY: -(18 - 1) * 32
      });
      this.updatePicker();
  },

  /**
   * 组件的方法列表
   */
  methods: {
      startHandler: function (event) {
        this.setData({
            startY: event.touches[0].clientY
        });
      },
      moveHandler: function (event) {
          var pickData = this.data.pickData;
          var minY = -32 * (pickData.length - 2);
          var maxY = 32;
          
          var endY = event.touches[0].clientY;
          var deltaY = endY - this.data.startY;

          var transformY = this.data.transformY + deltaY;
          if (transformY > maxY) {
              transformY = maxY
          }
          if (transformY < minY) {
              transformY = minY
          }
          console.log(endY + ',' + minY + ',' + maxY + ',' + transformY)      
          // 更新状态
          this.setData({
              startY: endY,
              transformY: transformY
          });
          this.updatePicker();
      },
      endHandler: function (event) {
          var distances = this.data.distances;
          var transformY = this.data.transformY;
          var selectedIndex = 1;
          distances.forEach(function (item, index) {
              if (item < 32) {
                  transformY = -(index - 1) * 32;
                  selectedIndex = index;
              }
          });
          this.setData({
              transformY: transformY
          });
          this.updatePicker();
          // 通知父组件选择的时间
          this.triggerEvent('customSelceted', {
              interval: this.data.pickData[selectedIndex]
          })
      },
      updatePicker: function () {
          var distances = [];
          var opacitys = [];
          var zooms = [];
          var transformY = this.data.transformY
          var pickData = this.data.pickData;
          pickData.forEach(function (item, index) {
              var distance = Math.abs((index - 1) * 32 + transformY);
              distances.push(distance);
              opacitys.push((1 - 2 / 320 * distance).toFixed(2));
              var zoom = (1.5 - 1 / 64 * distance).toFixed(2);
              zoom = zoom < 1 ? 1 : zoom;
              zooms.push(zoom);
          })
          // console.log(distances)
          this.setData({
              opacitys: opacitys,
              zooms: zooms,
              distances: distances
          });
      }
  }
})
