// packageMore/pages/earningDetail/earningDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面的type：1-》周度详情；2-》月度详情
    type: '1',
    // 收入信息
    earningInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据url中的参数读取相应的数据
    var timeid = options.timeid;
    var type = options.type;
    // todo 根据timeid请求数据
    if (type == '1') {
      this.setData({
        type: '1',
        statDimens: '第14周',
        courseNum: 4,
        totalTime: 5,
        studentNum: 6,
        earningInfo: {
          dayList:[{
            weekDay: '星期一',
            dateDay: '2号',
            earningList: [{
              studentName: '黄晓明',
              earning: 58,
              startTime: '15:00',
              endTime: '15:30',
              courseStatus: 0
            }, {
              studentName: 'xixi',
              earning: 58,
              startTime: '16:00',
              endTime: '16:30',
              courseStatus: 0
            }]
          }, {
            weekDay: '星期二',
            dateDay: '3号',
            earningList: [{
              studentName: '小明',
              earning: 58,
              startTime: '15:00',
              endTime: '15:30',
              courseStatus: 2
            }, {
              studentName: '琪琪',
              earning: 58,
              startTime: '16:00',
              endTime: '16:30',
              courseStatus: 1
            }]
          }],
          totalEarning: 2000
        }
      });
    }
    if (type == '2') {
      this.setData({
        type: '2',
        statDimens: '3月',
        courseNum: 4,
        totalTime: 5,
        studentNum: 6,
        earningInfo: {
          earningList: [{
            studentName: '黄晓明',
            earning: 58,
            courseCount: 8,
            previewCount: 1,
            leaveCount: 1
          }],
          totalEarning: 2000
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})