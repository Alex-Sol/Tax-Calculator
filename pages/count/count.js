// pages/count/count.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
  
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.setData({
        sumSalary: options.sumSalary,
        pretaxProfit: options.pretaxProfit,
        sumFund: options.sumFund,
        sumTax: options.sumTax,
        bonusSalary: options.bonusSalary,
        monthSalary: options.monthSalary
      })
    },
    getMonthSalary: function(e){
      var monthSalary = this.data.monthSalary.split(',');
      wx.navigateTo({
        delta: 2,
        url: '../month/month?monthSalary=' + monthSalary + '&bonusSalary=' + this.data.bonusSalary,
      })
    },
    backCount: function(e) {
      wx.navigateBack({
        url: '../index/index'
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
      return {
        title: '我工资的月薪是',
  
        path: '/page/count/count',
  
        imageUrl: '/images/logo.png'
      }
    }
  })