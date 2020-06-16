// pages/test/test.js
const myUtil = require('../../utils/util.js')
var promise = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handle_btn_1() {
    promise = new Promise(function (resolve, reject) {
      let i = 0
      if (i == 0) {
        //resolve("i = 0"); // 说明什么类型都可以返回
        //resolve({name: "arya",age: 18});
        resolve([123, 123, true, "test"])
      } else {
        reject(false)
      }
    })
    promise.then(function (value) {
      // success
      console.log("成功", value)
    }, function (err) {
      // failure
      console.log("失败", err)
    })
  },

  handle_btn_2() {
    promise.then(function (value) {
      // success
      console.log("成功", value)
    }, function (err) {
      // failure
      console.log("失败", err)
    })
  },

  handle_btn_3() {
    console.log(111)
    promise.then(function (value) {
      // success
      console.log("333 成功", value)
    }, function (err) {
      // failure
      console.log("333 失败", err)
    })
    console.log(222)
  },

  handle_btn_4() {
    function doThingsAsync() {
      console.log(222)
      return promise.then(function (value) {
        // success
        console.log("444 成功", value)
      }, function (err) {
        // failure
        console.log("444 失败", err)
      });
    }
    console.log(111)
    doThingsAsync()
    console.log(333)
  },

  handle_btn_5() {
    console.log(111)
    myUtil.myPromise("promise test1").then(value => {
      console.log("333", value)
      console.log(444)
    }).then(value => {
      console.log(555)
    })
    console.log("222")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    promise = new Promise(function (resolve, reject) {
      let i = 0
      if (i == 0) {
        resolve("print resolve");
      } else {
        reject("print reject");
      }
    })
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