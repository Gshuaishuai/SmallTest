var postData = require('../post_template/post_data.js')

Page({

  data: {
  },
  onLoad: function (options) {
    //应该是从服务器请求数据
    this.setData({ post_key: postData.postList });
  },

  onReady: function () {
  },

  onShow: function () {
  },

  onHide: function () {
  },

  onUnload: function () {
  },

  onPullDownRefresh: function () {
  },

  onReachBottom: function () {
  },

  onShareAppMessage: function () {
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../post_detail/post_detail?id='+postId,
    })
  },
  onswiperTap:function(event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: '../post_detail/post_detail?id=' + postId,
    })
  }
})