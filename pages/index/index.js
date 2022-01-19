//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pretaxProfit: '0',
    social: '0',
    accumulationFund: '0',
    accumulationRatio: '12',
    specialDeduction: '0',
    startingPoint: '5000',
    bonus: '0'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取用户输入
  pretaxProfitInput: function (e) {
    this.setData({
      pretaxProfit: e.detail.value
    })
  },
  socialInput: function (e) {
    this.setData({
      social: e.detail.value
    })
  },
  accumulationFundInput: function (e) {
    this.setData({
      accumulationFund: e.detail.value
    })
  },
  accumulationRatioInput: function (e) {
    this.setData({
      accumulationRatio: e.detail.value
    })
  },
  specialDeductionInput: function (e) {
    this.setData({
      specialDeduction: e.detail.value
    })
  },
  startingPointInput: function (e) {
    this.setData({
      startingPoint: e.detail.value
    })
  },
  bonusInput: function (e) {
    this.setData({
      bonus: e.detail.value
    })
  },

  /*计算函数*/
  count: function (e) {
    var pretaxProfit = parseFloat(this.data.pretaxProfit); //税前月收入
    var socialBase = parseFloat(this.data.social); //社保基数
    if (socialBase === 0){
      socialBase = parseFloat(this.data.pretaxProfit);
    }
    var accumulationBase = parseFloat(this.data.accumulationFund); //公积金基数
    if (accumulationBase === 0){
      accumulationBase = parseFloat(this.data.pretaxProfit);
    }
    var accumulationRatio = parseFloat(this.data.accumulationRatio); //公积金比例
    var accumulationFund = accumulationBase * (accumulationRatio / 100); //公积金
    var socialFund = socialBase * (0.02 + 0.08 + 0.005); //社保金
    var socialAccumulation = accumulationFund + socialFund; //社保公积金
    var specialDeduction = parseFloat(this.data.specialDeduction); //专项扣除
    var startingPoint = parseInt(this.data.startingPoint); //起征点
    var bonus = parseFloat(this.data.bonus);
    var sumProfit = 0; //累计税前收入
    var sumStartingPoint = 0; //累计起征点
    var sumSocialAccumulationFund = 0; //累计社保公积金
    var sumSpecialDeduction = 0; //累计专项扣除
    var salaryTax; //应纳税所得额
    var taxRatio = 0.0; //税率
    var quickCutNumV = 0; //速算扣除数
    var tax = []; //月个税
    var salary = []; //月税后工资
    var sumSalary = 0; //年税后工资
    var sumTax = 0; //年个税

    for (var month = 0; month < 12; month++) {
      sumProfit += pretaxProfit;
      sumStartingPoint += startingPoint;
      sumSocialAccumulationFund += socialAccumulation;
      sumSpecialDeduction += specialDeduction;
      salaryTax = sumProfit - sumStartingPoint - sumSocialAccumulationFund - sumSpecialDeduction;
      if (salaryTax <= 36000) {
        taxRatio = 0.03;
        quickCutNumV = 0;
      }
      else if (salaryTax <= 144000) {
        taxRatio = 0.1;
        quickCutNumV = 2520;
      }
      else if (salaryTax <= 300000) {
        taxRatio = 0.2;
        quickCutNumV = 16920;
      }
      else if (salaryTax <= 420000) {
        taxRatio = 0.25;
        quickCutNumV = 31920;
      }
      else if (salaryTax <= 660000) {
        taxRatio = 0.3;
        quickCutNumV = 52920;
      }
      else if (salaryTax <= 960000) {
        taxRatio = 0.35;
        quickCutNumV = 85920;
      }
      else {
        taxRatio = 0.45;
        quickCutNumV = 181920;
      }
      tax[month] = parseFloat((salaryTax * taxRatio - quickCutNumV - sumTax).toFixed(2));
      tax[month] = tax[month] > 0 ? tax[month] : 0;
      sumTax += tax[month];
      salary[month] = parseFloat((pretaxProfit - socialAccumulation - tax[month]).toFixed(2));
    }

    for (var i = 0; i < tax.length; i++) {
      sumTax += tax[i];
    }

    for (var i = 0; i < salary.length; i++) {
      sumSalary += salary[i];
    }

    if (bonus <= 36000) {
      taxRatio = 0.03;
      quickCutNumV = 0;
    }
    else if (bonus <= 144000) {
      taxRatio = 0.1;
      quickCutNumV = 2520;
    }
    else if (bonus <= 300000) {
      taxRatio = 0.2;
      quickCutNumV = 16920;
    }
    else if (bonus <= 420000) {
      taxRatio = 0.25;
      quickCutNumV = 31920;
    }
    else if (bonus <= 660000) {
      taxRatio = 0.3;
      quickCutNumV = 52920;
    }
    else if (bonus <= 960000) {
      taxRatio = 0.35;
      quickCutNumV = 85920;
    }
    else {
      taxRatio = 0.45;
      quickCutNumV = 181920;
    }

    var bonusTax = bonus * taxRatio - quickCutNumV;
    var bonusSalary = bonus - bonusTax;
    sumSalary = parseFloat(sumSalary + bonusSalary).toFixed(2);
    sumTax = parseFloat(sumTax + bonusTax).toFixed(2);

    var sumPretaxProfit = pretaxProfit * 12 + bonus;

    if (pretaxProfit){
      wx.navigateTo({
        delta: 2,
        url: '../count/count?sumSalary=' + sumSalary + '&pretaxProfit=' + sumPretaxProfit + '&sumFund=' + sumSocialAccumulationFund.toFixed(2) + '&sumTax=' + sumTax + '&bonusSalary=' + bonusSalary + '&monthSalary=' + salary,
      });
    }
    else{
      wx.showToast({
        title: '个税前收入不能为空！',
        icon: 'none',
        duration: 2000
      });
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
    return {
      title: '个税计算器',

      path: '/pages/index/index',

      imageUrl: '/images/logo.png'
    }
  }
})