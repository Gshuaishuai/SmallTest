// pages/movie/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    movies:{},
    title:"",
    dataUrl:"",
    movieEmpty:"true"
  },
  onLoad: function (options) {
    var category = options.category
    this.data.title = category
    var dataUrl = ""
    switch(category){
      case "正在热映": 
        dataUrl = app.globalData.g_apiStart + "/todayVideo"
        break;
      case "即将上映":
        dataUrl = app.globalData.g_apiStart + "/todayVideo"
        break;
      case "top250":
        dataUrl = app.globalData.g_apiStart + "/todayVideo"
        break;
    }
    this.data.dataUrl = dataUrl;
    var that = this;
    wx.request({
      url: dataUrl,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        that.processData(res.data);
      }
    })
  },
  onScrolltoLower:function(event){
    var that = this
    wx.request({
      url: this.data.dataUrl,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        that.processData(res.data);
      }
    })
    wx.showNavigationBarLoading()
  },
  processData:function(data){
    var movies = []
    for (var idx in data.result) {
      var res = data.result[idx].data;
      if (res.content) {
        var temp = {
          category: res.content.type,
          imgUrl: res.content.data.cover.detail,
          average: res.content.data.id,
          stars: util.convertToStarsArray(4)
        }
        movies.push(temp)
      }
    }
    var movieList = {}
    if (this.data.movieEmpty) {
      this.data.movieEmpty = false
      movieList = movies
    } else {
      movieList = this.data.movies.concat(movies)
    }
    this.setData({
      movies: movieList
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  },
  onPullDownRefresh:function(event){
    var that = this
    wx.request({
      url: this.data.dataUrl,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        that.processData(res.data);
      }
    })
    this.data.movieEmpty = true
    wx.showNavigationBarLoading()
  }
})