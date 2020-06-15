// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'arya',
    userInfo: {},
    isShow: true,
    currentTimer: 0,
    currentStopTimer: 0
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
    //this.testThis()
    //this.testTimeOut()
    //this.testSetInterval()
  },

  testSetInterval() {
    let that = this
    let i = 1
    that.setData({
      currentTimer: setInterval(function () {
        console.log(i++, "定时器运行中: ", that.data.currentTimer)
        if (i == 5) {
          clearTimeout(that.data.currentStopTimer)
          console.log("对不起，截胡了: ", that.data.currentStopTimer)
        }
        // if(i == 10){
        //   clearInterval(n)
        //   console.log(i++,"定时器已经停止！")
        // }
      }, 1000)
    })
  },

  testTimeOut() {
    let that = this
    that.setData({
      currentStopTimer: setTimeout(function () {
        console.log("会停止的定时器，到时间结束了！")
      }, 8000)
    })
    console.log(that.data.currentStopTimer, "当前定时器_会停止的")
  },

  testThis() {
    console.log(this, "testThis 1111")
    var x = "i am a string"
    var checkThis = function () {
      console.log(x, "checkThis 2222")
      var that = this
      console.log(this, "checkThis 3333") // undefined
      console.log(that, "checkThis 4444") // undefined
    }
    var obj = {}
    obj.x = 100
    obj.y = function () {
      console.log(obj.x, "obj.y 5555") // 100
      console.log(this, "obj.y 6666") // 直接调用obj.y时，this = obj
    }
    var obj2 = obj.y
    var obj3 = {}
    obj3.z = obj.y

    obj.y()
    checkThis()
    obj2()
    obj3.z()
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

    this.testTimeOut()
    this.testSetInterval()
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
    console.log("退出有定时器的页面,定时器编号为:", this.data.currentTimer)
    clearInterval(this.data.currentTimer)
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