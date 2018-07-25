// components/star/star.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 星级：1-10对应1-5颗星星
        starCount: {
            type: Number,
            value: -1,
            observer: function (newValue, oldValue) {
                this.wxStar(this.data.starCount, this.data.starSupportEdit);
            }
        },
        // 是否可编辑
        starSupportEdit: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        wxStar: '',
        wxStarEdit: ''
    },

    attached: function () {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        wxStar: function (count, isEidt) {
            this.setData({
                wxStarEdit: isEidt ? true : false
            });
            // 初始化星数
            this.wxStarInit(count);
        },
        wxStarChange: function(e) {
            // 只可展示，不可评星
            if (!this.data.wxStarEdit) return;
            var dataset = e.currentTarget.dataset, idx = dataset.idx, index = dataset.index;
            var star = this.data.wxStar, len = star.length;
            for (var i = 0; i < len; i++) {
                if (i < idx) star[i] = [1, 1];
                else if (i == idx) {
                    if (index == 0) star[i] = [1, 0];
                    else star[i] = [1, 1];
                }
                else star[i] = [0, 0];
            }
            this.setData({
                wxStar: star
            });
            // 选择星之后，向父组件告知星级
            var starCount = 0;
            star = star.toString().split(',');
            star.forEach(function (item) {
                starCount += parseInt(item, 10);
            });
            this.triggerEvent('starChange', {star: starCount});
        },
        wxStarInit: function(count) {
            count = count != undefined ? parseInt(count, 10) : 10;
            var str = '';
            for (var i = 1; i <= 10; i++) {
                if (i <= count) str += '1,';
                else str += '0,';
            }
            var arr = str.split(',');
            this.setData({
                wxStar: [
                    [arr[0], arr[1]],
                    [arr[2], arr[3]],
                    [arr[4], arr[5]],
                    [arr[6], arr[7]],
                    [arr[8], arr[9]],
                ]
            });
            // 初始化完成之后，回调方法。是否需要回调，自己决定
            if (this.initSuccessCb) this.initSuccessCb();
        },
        wxStarCont: function () {
            var star = this.data.wxStar, count = 0;
            for (var i = 0; i < 5; i++) {
                count += parseInt(star[i][0]);
                count += parseInt(star[i][1]);
            }
            return count;
        }
    }
})
