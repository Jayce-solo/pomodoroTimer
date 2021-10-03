// pages/tongji/tongji.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    dayList: [],
    list: [],
    sumBox: [{
      title: "今日番茄次数",
      value: "1"
    },
    {
      title: "累计番茄次数",
      value: "1"
    }, {
      title: "今日专注时长",
      value: "5分钟"
    }, {
      title: "累计专注时长",
      value: "5分钟"
    }],
    activeIndex: 0
  },

  //改变类型
  changeType(e){
    let activeIndex = e.currentTarget.dataset.index;
    if(activeIndex == 0){
      this.setData({
        list: this.data.dayList
      });
    }else if(activeIndex == 1){
      let logs = wx.getStorageSync('logs') || [];
      this.setData({
        list: logs
      });
    }
    this.setData({activeIndex})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let logs = wx.getStorageSync('logs') || [];
    let day = 0;
    let totalDay = logs.length;
    let dayTime = 0;
    let totalTime = 0;
    let dayList = [];

    if (logs.length > 0) {
      for (let i = 0; i < logs.length; i++) {
        if (logs[i].date.substr(0, 10) == util.formatTime(new Date()).substr(0, 10)) {
          day += 1;
          dayTime += parseInt(logs[i].time);
          dayList.push(logs[i]);
          this.setData({dayList:dayList,list:dayList})
        }
        totalTime += parseInt(logs[i].time)
      }
      console.log(day,totalDay,dayTime,totalTime);
      this.setData({
        'sumBox[0].value': day,
        'sumBox[1].value': totalDay,
        'sumBox[2].value': dayTime + "分钟",
        'sumBox[3].value': totalTime + "分钟",
      })
    }
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