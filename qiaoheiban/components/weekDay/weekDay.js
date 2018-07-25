// components/weekDay/weekDay.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        weekInfo: {
            type: Array,
            value: [
                /*{
                    dayName: '一',
                    dayDate: '12',
                    courseNum: 3,
                },
                {
                    dayName: '二',
                    dayDate: '13',
                    courseNum: 4
                },
                {
                    dayName: '三',
                    dayDate: '14',
                    courseNum: 2
                },
                {
                    dayName: '四',
                    dayDate: '15',
                    courseNum: 3
                },
                {
                    dayName: '五',
                    dayDate: '16',
                    courseNum: 4
                },
                {
                    dayName: '六',
                    dayDate: '17',
                    courseNum: 8
                },
                {
                    dayName: '七',
                    dayDate: '18',
                    courseNum: 7
                }*/
            ]
        },
        // 当前选择的日期在week中的index
        selectedIndex: {
            type: Number,
            value: 3
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    attached: function () {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeSelectedDay: function (event) {
            var currentIndex = event.currentTarget.dataset.dayindex;
            if (currentIndex != this.data.selectedIndex) {
                this.setData({
                    selectedIndex: currentIndex
                });
                // 通知父组件更新其他信息
                this.triggerEvent('changeSelectedDay', {selectedIndex: currentIndex});
            }
        }
    }
})
