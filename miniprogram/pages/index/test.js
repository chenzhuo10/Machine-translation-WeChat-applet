// 4.wenzi.js文件

// // miniprogram/pages/wenzi/wenzi.js
// const app = getApp()
// Page({

// /**
// * 页面的初始数据
// */
// data: {
// imgPath: '../../images/wenzi.jpg',
// items: null,
// },

// /**
// * 生命周期函数--监听页面加载
// */
// onLoad: function (options) {
// },

// doClickWork: function () {
// var that = this;
// var score = 2;
// //清空数据
// that.setData({
// items: null
// })

// that.selectImage().then(res => {
// console.log("[图片数据]", res);

// that.scanImageInfo(res.data).then(res => {
// console.log("[识别文字]", res);
// if (res.data.words_result) {
// if (res.data.words_result_num!=0){
// that.setData({
// items: res.data.words_result
// })

// //添加次数
// app.addCount('wenzi')
// //扣除积分
// app.updateScore(app.globalData.score - score)
// }else{
// wx: wx.showToast({
// title: "没有识别到文字",
// icon: 'none',
// mask: true,
// })
// }
// } else {
// wx: wx.showToast({
// title: res.data.error_msg,
// icon: 'none',
// mask: true,
// })
// }
// })
// })
// },

// //获取本地图片
// selectImage: function () {
// var that = this;
// // 选择图片
// return new Promise(function (resolve, reject) {
// wx.chooseImage({
// count: 1,
// sizeType: ['compressed'],
// sourceType: ['album', 'camera'],
// success: res => {

// console.log("[选择图片]", res);
// that.setData({
// imgPath: res.tempFilePaths[0]
// })

// //获取图片数据
// wx.getFileSystemManager().readFile({
// filePath: res.tempFilePaths[0],
// encoding: "base64",
// success: resolve,
// fail: reject
// })

// },
// fail: reject
// })

// })
// },

// //扫描图片中的数据
// scanImageInfo: function (imageData) {
// var that = this;
// // const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${getApp().globalData.baiduToken}`;//基础版本
// const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${getApp().globalData.baiduToken}`;//高精度版本｛getApp().globalData.baiduToken为获取全局配置文件里的百度key,token｝

// //显示加载界面
// wx.showLoading({
// title: '加载中',
// mask:true,
// });

// return new Promise(function (resolve, reject) {
// wx.request({
// url: detectUrl,
// data: {
// image: imageData
// },
// method: 'POST',
// dataType: "json",
// header: {
// 'content-type': 'application/x-www-form-urlencoded'
// },
// success: res => {
// //隐藏加载界面
// wx.hideLoading()
// resolve(res);
// },
// fail: res => {
// wx: wx.showToast({
// title: '忙碌,稍后再试',
// icon: 'none',
// mask: true,
// duration: 2000
// })
// reject(res);
// },
// })
// })
// },
// })

// 5.wenzi.json文件

// {
// "usingComponents": {},
// "navigationBarTitleText": "文字识别"
// }

// 6.wenzi.wxml文件

// <!--miniprogram/pages/wenzi/wenzi.wxml-->
// <!-- <button open-type="share" class="button_share">分享</button> -->

// <view class="view_main">
// <image class="image_type" src="{{imgPath}}" mode="aspectFit"></image>
// <button class="button_type" bindtap="doClickWork">拍照/相册</button>

// <view class="view_items">
// <text wx:for="{{items}}" wx:key="{{item}}" selectable='true' class="text_son">
// {{item.words}}
// </text>
// </view>

// </view>

// 7.wenzi.wxss文件

// .button_share {
// width: 150rpx;
// height: 100rpx;
// position: fixed;
// top: 500rpx;
// right: 0rpx;
// display: flex;
// justify-content: center;
// align-items: center;
// background-color: #fea128;
// color: white;
// border-radius: 50rpx 0rpx 0rpx 50rpx;
// }

// .view_main {
// height: 100%;
// width: 100%;
// display: flex;
// align-items: center;
// flex-direction: column;
// }

// .image_type {
// margin-top: 30rpx;
// height: 400rpx;
// width: 100%;
// }

// .button_type {
// width: 200rpx;
// height: 120rpx;
// padding: 0;
// margin-top: 50rpx;
// margin-bottom: 20rpx;
// font-size: 14px;
// color: white;
// display: flex;
// justify-content: center;
// align-items: center;
// /* border-radius: 21rpx; */
// background-color: #2880fe;
// }

// .view_items {
// margin-bottom: 30rpx;
// width: 90%;
// display: flex;
// align-items: center;
// flex-direction: column;
// /* flex-wrap: wrap; */
// }

// .view_item {
// width: 100%;
// margin-top: 15rpx;
// background-color: white;
// display: flex;
// align-items: center;
// flex-direction: column;
// border-radius: 5rpx;
// padding: 20rpx;
// box-shadow: 1.5px 1.5px 1.5px grey;
// }

// .text_main {
// margin-left: 30rpx;
// margin-bottom: 10rpx;
// color: #2880fe;
// font-weight: 700;
// width: 100%;
// font-size: 15px;
// }

// .text_son {
// margin-left: 30rpx;
// color: #2880fe;
// width: 100%;
// font-size: 14px;
// }
// ————————————————
// 版权声明：本文为CSDN博主「ipk003」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/qq_34873267/article/details/122847000