const app = getApp()
Page({
  data: {
    dateArray: []
  },
  onLoad: function () {
    console.log('example page loaded');
    this.setData({
      dateArray: [{ dateNum: 1 }, { dateNum: 2 }, { dateNum: 3 }]
    })
  },
  showShareMenu: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function (res) {
    // 转发事件来源: button：页面内转发按钮；menu：右上角转发菜单
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: 'pages/index/index',
      // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      imageUrl: '',
      success: function (res) {
        // 转发成功
        console.log('转发成功');
        // 获取shareTickets
        console.log(res)
        // 通过shareTicket获取到转发信息
        if (res.shareTickets) {
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: function (info) {
              console.log(info);
            }
          })
        }
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
      }
    }
  },
  listenSwiper(e) {
    console.log('change swipe')
  },
  goToConcludePage() {
    wx.navigateTo({
      url: '/packageMore/pages/conclude/conclude',
    })
  }
})