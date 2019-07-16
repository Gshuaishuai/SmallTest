var postData = require('../post_template/post_data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData
    var postId = options.id          //文章详情编号
    this.setData({ postDatas: postData.postList[postId] })
    this.data.currentPostid = postId

    var postsCollected = wx.getStorageSync("collection") //
    if(postsCollected){
      var postCollected = postsCollected[postId]
      this.setData({ collected: postCollected })
    }else{
      var postsCollected={}
      postsCollected[postId] = false
      wx.setStorageSync("collection",postsCollected);
    }
    var that = this;
    // wx.removeStorageSync("key")
    // wx.clearStorageSync()
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isplayingMusic:true
      })
    })
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isplayingMusic: false
      })
    })
    if (app.globalData.g_isplayingMusic && app.globalData.g_currentMusicId === postId)
    {
      that.setData({
        isplayingMusic: true
      })
    }
  },
  onCollectionTap:function(event){
    var postsCollected = wx.getStorageSync("collection")
    var postCollected = postsCollected[this.data.currentPostid]
    postCollected = !postCollected
    postsCollected[this.data.currentPostid] = postCollected
    wx.setStorageSync("collection", postsCollected)
    this.setData({collected:postCollected})
    wx.showToast({
      title: postCollected ? '文章已收藏' : '取消收藏',
      duration:1000,
      icon:"success",
    })
    // wx.showModal({
    //   title: '显示',
    //   content: '是否收藏该文章',
    // })

  },
  onShareTap:function(event){
    wx.showActionSheet({
      itemList: [
        "分享给微信朋友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      success:function(res){
        //res.cancel res.tapIndex
        wx,wx.showToast({
          title: '当前小程序不支持分享的哈哈',
          icon: '',
          image: '',
          duration: 1000,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },
  onMusicTap:function(event){
    var isplayingMusic = this.data.isplayingMusic;
    var music = postData.postList[this.data.currentPostid].music;
    if(isplayingMusic)
    {
      wx.stopBackgroundAudio();
      this.setData({isplayingMusic:false})
      app.globalData.g_isplayingMusic = false
      app.g_isplayingMusic.g_currentMusicId = data.data.currentPostid
    }else{
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title:music.title ,
        coverImgUrl: music.coverImg,
      })
      this.setData({isplayingMusic:true})
      app.globalData.g_isplayingMusic = true
      app.g_isplayingMusic.g_currentMusicId=null
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