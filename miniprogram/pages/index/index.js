// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 25,
    task: [{
      icon: "work",
      name: "工作",
      time: 25
    }, {
      icon: "study",
      name: "学习",
      time: 35
    }, {
      icon: "think",
      name: "思考",
      time: 18
    }, {
      icon: "write",
      name: "写作",
      time: 45
    }, {
      icon: "sport",
      name: "运动",
      time: 38
    }, {
      icon: "read",
      name: "阅读",
      time: 30
    }],
    taskActive: 0,
    rate: '',
    isShowTimer: false,
    timerHeight: 0,
    cTime: 0,
    timeStr: '',
    isStopTimer: false,
    interval: null
  },

  //slider改变监听方法
  sliderChange(e) {
    this.setData({ time: e.detail.value })
  },

  //点击任务
  clickTask(e) {
    this.setData({
      taskActive: e.currentTarget.dataset.index,
      time: this.data.task[e.currentTarget.dataset.index].time
    })
  },

  //开始专注
  start() {
    this.setData({
      isShowTimer: true,
      timeStr: (this.data.time >= 10 ? this.data.time : '0' + this.data.time) + ':00',
      cTime: 0
    });
    this.drawTimerBg();
    this.drawTimeActiveRoad();
  },

  //开始绘制计时器
  drawTimerBg() {
    //换算成px
    let lineWidth = 6 / this.data.rate;
    //计算运行弧度，单位ms
    let ctx = wx.createCanvasContext('timerCanvas_bg');
    ctx.setLineWidth(lineWidth);
    ctx.setLineCap('round');
    ctx.setStrokeStyle("#666666");
    ctx.beginPath();
    ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.draw();
  },

  //定时绘制
  drawTimeActiveRoad() {

    this.drawTimerBg();
    let interval = setInterval(() => {
      if (this.data.cTime < this.data.time * 60 * 1000) {
        //整秒数
        if (this.data.cTime % 1000 == 0) {
          let timeStr = this.data.time * 60 - this.data.cTime / 1000;
          let mintue = parseInt(timeStr / 60);
          let second = (timeStr - mintue * 60) >= 10 ? (timeStr - mintue * 60) : "0" + (timeStr - mintue * 60);
          this.setData({
            timeStr: (mintue >= 10 ? mintue : '0' + mintue) + ':' + second
          })
        }
        this.drawTimeActive();
        this.setData({ cTime: this.data.cTime + 100 })
      } else {
        this.setData({
          timeStr: '00:00'
        })
        clearInterval(interval);
      }
    }, 100);
    this.setData({ interval });
  },

  //绘制动态倒计时
  drawTimeActive() {
    var that = this;
    let angle = 1.5 + 2 * that.data.cTime / (that.data.time * 60 * 1000);
    let ctx = wx.createCanvasContext('timerCanvas_active');
    ctx.setLineWidth(6 / that.data.rate);
    ctx.setLineCap('round');
    ctx.setStrokeStyle("#FFF");
    ctx.beginPath();
    ctx.arc(400 / that.data.rate / 2, 400 / that.data.rate / 2, 400 / that.data.rate / 2 - 2 * 6 / that.data.rate, 1.5 * Math.PI, angle * Math.PI);
    ctx.stroke();
    ctx.draw();
  },

  //暂停
  stop() {
    this.setData({ isStopTimer: true });
    clearInterval(this.data.interval);
  },

  //继续
  go() {
    this.setData({ isStopTimer: false });
    this.drawTimeActiveRoad();
  },

  //放弃
  giveUp() {
    clearInterval(this.data.interval);
    this.setData({
      isStopTimer: false,
      time: 25,
      isShowTimer: false,
      cTime: 0
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getSystemInfoSync();
    let rate = 750 / res.windowWidth;
    this.setData({ rate: rate, timerHeight: rate * res.windowHeight });
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