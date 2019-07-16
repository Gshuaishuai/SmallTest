var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    containerShow:true,
    searchPanelShow:false,
  },
  onLoad: function (options) {
    var todayVideo = app.globalData.g_apiStart + "/todayVideo"
    this.getMovieList(todayVideo);
  },
  getMovieList:function(url){
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success:function(res){
        console.log(res);
        that.processData(res.data);
      },
      fail:function(){
        console.log('fail');
      }
    })
  },
  processData:function(data){
    var inTheaters = [];
    var comingSoon = [];
    var top250 = [];
    var counter = 0;
    for(var idx in data.result){
      var res = data.result[idx].data;
      if(res.content)
      {
        counter = counter + 1
        var temp = {
          category: res.content.type,
          imgUrl: res.content.data.cover.detail,
          average:res.content.data.id,
          stars: util.convertToStarsArray((counter+1)%5)
        }
        if(counter <= 3)
          inTheaters.push(temp);
        else if(counter <= 6)
          comingSoon.push(temp);
        else
          top250.push(temp);
      if(counter == 9) break
      }
    }
    var readyData = {};
    readyData['inTheaters'] = {
      categoryTitle:'正在热映',
      movies:inTheaters,
    }
    readyData['comingSoon'] = {
      categoryTitle: '即将上映',
      movies: comingSoon,
    }
    readyData['top250'] = {
      categoryTitle: 'top250',
      movies: top250,
    }
    this.setData(readyData)
  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category
    })
  },
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onBindChange:function(event){
    var videoUrl = app.globalData.g_apiStart + "/todayVideo"
    this.getMovieList(videoUrl);
  },
  onCancelTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  }
})