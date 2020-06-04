// pages/detail/detail.js
let datas = require("../../datas/list-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isShared:false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // 获取参数值
    let index = options.index;
    this.setData({
      detailObj:datas.list_data[index],
      index:index
    })

    // 根据本地缓存的数据判断用户是否收藏/分享当前
    // 使用同步读取缓存（与异步的区别是没有回调）
    let detailStorage_isCollected = wx.getStorageSync('isCollected');
    let detailStorage_isShared = wx.getStorageSync('isShared');
    let detailStorage_isMusicOn = wx.getStorageSync('isMusicOn')
    // 在缓存中初始化空对象
    if(!detailStorage_isCollected){
      wx.setStorageSync('isCollected', {})
    }
    if(!detailStorage_isShared){
      wx.setStorageSync('isShared', {})
    }
    if(!detailStorage_isMusicOn){
      wx.setStorageSync('isMusicOn', false)
    }
    console.log(detailStorage_isCollected,"是否收藏");
    console.log(detailStorage_isShared,"是否分享");
    console.log(detailStorage_isMusicOn,"是否音乐在放");
    
    this.setData({
      isCollected:wx.getStorageSync('isCollected')[index]?true:false,
      isShared:wx.getStorageSync('isShared')[index]?true:false,
      isMusicPlay:wx.getStorageSync('isMusicOn')?true:false
    })

    // 监听
    wx.onBackgroundAudioPlay((res)=>{
      wx.setStorage({
        key:"isMusicOn",
        data:true
      })
    })
    wx.onBackgroundAudioPause((res)=>{
      wx.setStorage({
        key:"isMusicOn",
        data:false
      })
    })
    wx.onBackgroundAudioStop((res) => {
      wx.setStorage({
        key:"isMusicOn",
        data:false
      })
    })
  },

  refreshPic(){
    
  },

  handleMusicPlay(){
    // 处理音乐播放
    this.setData({
      isMusicPlay:!this.data.isMusicPlay
    })
    // 控制音乐播放
    if(this.data.isMusicPlay){
      let{dataUrl,title} = this.data.detailObj.music;
      console.log({dataUrl,title});
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      wx.pauseBackgroundAudio();
    }

    wx.setStorage({
      key:"isMusicOn",
      data:this.data.isMusicPlay,
      success:()=>{
        console.log("缓存成功");
      }
    })
    
  },

  handleCollection(){
    this.setData({
      isCollected:!this.data.isCollected
    })
    // 提示
    wx.showToast({
      title:this.data.isCollected?'收藏成功':'取消收藏',
      icon:"success"
    })
    // 缓存数据(是否收藏)到本地
    //{1:true,2:false}
    let {index} = this.data;
    //let obj = {}; 不可行，应该是追加
    wx.getStorage({
      key: 'isCollected',
      success:(datas)=>{
        let obj = datas.data;
        obj[index] = this.data.isCollected;
        wx.setStorage({
          key:"isCollected",
          data:obj,
          success:()=>{
            console.log("缓存成功");
          }
        })
      }
    })
  },

  handleShare(){
    // this.setData({
    //   isShared:!this.data.isShared
    // })
    // // 提示
    // wx.showToast({
    //   title: this.data.isShared?"分享成功":"取消分享",
    // })
    // // 缓存数据（是否分享）到本地
    // let {index} = this.data;// let {a} = this.data 相当于 let a = this.data.a
    // wx.getStorage({
    //   key: 'isShared',
    //   success:(datas)=>{
    //     let obj = datas.data;
    //     obj[index] = this.data.isShared;
    //     wx.setStorage({
    //       key:"isShared",
    //       data:obj,
    //       success:()=>{
    //         console.log("缓存成功");
    //       }
    //     })
    //   }
    // })

    wx.showActionSheet({
      itemList:[
        "分享到朋友圈",
        "分享到微博",
        "分享到QQ"
      ],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
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