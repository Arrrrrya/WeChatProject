// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'arya',
    userInfo: {},
    isShow: true
  },

  handleMainView() {
    console.log("view元素");
  },
  handleParent() {
    console.log("父元素");
    // 点击跳转list页面
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  handleChild() {
    console.log("子元素");
  },
  handleGetUserInfo(res) {
    console.log(res);
    // 判断用户是否允许授权
    if (res.detail.rawData) {
      //刷新页面
      this.getUserInfo();
    }
  },

  getUserInfo() {
    // 判断用户是否授权
    wx.getSetting({
      complete: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          this.setData({
            isShow: false
          })
        }
      },
    })

    //获取用户登录的信息
    wx.getUserInfo({
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo
        })
      },
      fail: () => {
        console.log("获取用户行为失败");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload");
    this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
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