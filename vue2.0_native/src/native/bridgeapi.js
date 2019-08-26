// define(function (require, exports, module) {
//     "use strict";
//     var bridge = {
//         init: function () {
//             if (WebViewJavascriptBridge.init) {
//                 WebViewJavascriptBridge.init(function (message, responseCallback) {
//                     responseCallback("")
//                 });
//                 this.hideLoading();
//             }
//         },
//         getConnectionInfo: function (cb) {
//             WebViewJavascriptBridge.callHandler('getConnectionInfo', "", cb);
//         },
//         sign: function (sheet, cb) {
//             WebViewJavascriptBridge.callHandler('md5SignSheet', sheet, cb);
//         },
//         takePhoto: function (cb) {
//             WebViewJavascriptBridge.callHandler('takePhoto', '', function (data) {
//                 cb(data);
//             });
//         },
//         changePage: function (url) {
//             WebViewJavascriptBridge.callHandler('changePage', url);
//         },
//         back: function () {
//             WebViewJavascriptBridge.callHandler('back', location.href);
//         },
//         restart: function () {
//             WebViewJavascriptBridge.callHandler('restart', "");
//         },
//         download: function (updateUrl) {
//             WebViewJavascriptBridge.callHandler('download', updateUrl);
//         },
//         showToast: function (message) {
//             if (window.Core) {
//                 var Core = window.Core;
//                 var nt = Core.App.addNotification({
//                     title: '',
//                     subtitle: '',
//                     message: message,
//                     closeOnClick: true
//                 });
//                 setTimeout(function () {
//                     Core.App.closeNotification(nt);
//                 }, 3000);
//             } else {
//                 WebViewJavascriptBridge.callHandler('showToast', message);
//             }
//         },
//         share: function (message) {
//             WebViewJavascriptBridge.callHandler('share', message);
//         },
//         sendSMS: function (phone, message) {
//             WebViewJavascriptBridge.callHandler('sendSMS', {
//                 phone: phone,
//                 message: message
//             });
//         },
//         pickUpUpload: function (params) {
//             WebViewJavascriptBridge.callHandler('pickUpUpload', params);
//         },
//         createSheet: function (params) {
//             WebViewJavascriptBridge.callHandler('createSheet', params);
//         },
//         queryDb: function () {

//         },
//         mediaVibrate: function (code, message) {
//             WebViewJavascriptBridge.callHandler('mediaVibrate', {
//                 code: code,
//                 message: message
//             });
//         },
//         showLoading: function (message) {
//             message = message ? message : "正在加载中...";
//             WebViewJavascriptBridge.callHandler('showLoading', message);
//         },
//         hideLoading: function () {
//             WebViewJavascriptBridge.callHandler('hideLoading');
//         },
//         quit: function () {
//             WebViewJavascriptBridge.callHandler('quit');
//         },
//         scanAddEvent: function () {
//             WebViewJavascriptBridge.callHandler('scanAddEvent');
//         },
//         signEvent: function (userInfo) {
//             WebViewJavascriptBridge.callHandler('signEvent', userInfo);
//         },
//         dataCompress: function (data, cb) {
//             WebViewJavascriptBridge.callHandler('dataCompress', data, cb);
//         },
//         subscribe: function (params) {
//             WebViewJavascriptBridge.callHandler('subscribe', {
//                 "companyNo": params.companyNo + "",
//                 "userId": params.userId + "",
//                 "orgId": params.orgId + ""
//             });
//         },
//         unsubscribe: function (params) {
//             WebViewJavascriptBridge.callHandler('unsubscribe', {
//                 "companyNo": params.companyNo + "",
//                 "userId": params.userId + "",
//                 "orgId": params.orgId + ""
//             });
//         },
//         /**
//          *
//          * @param address 蓝牙地址
//          * @param type   打印机类型
//          * @param start 开始位置
//          * @param end   结束位置
//          * @param template 打印的数据
//          * @param cb 返回function
//          * @returns {*}
//          */
//         gps: function (callBack) {
//             WebViewJavascriptBridge.callHandler('gps', "", callBack);
//         },
//         scanQr: function () {
//             WebViewJavascriptBridge.callHandler('scanQr');
//         },
//         log: function (message) {
//             WebViewJavascriptBridge.callHandler('log', message);
//         },
//         ajax: function (url, parameter, callBack) {
//             var data = {
//                 "url": url,
//                 "data": parameter
//             };
//             WebViewJavascriptBridge.callHandler('ajax', data, callBack);
//         },
//         call: function (phone) {
//             WebViewJavascriptBridge.callHandler('call', phone + "");
//         },
//         setUserInfo: function (userInfo) {
//             WebViewJavascriptBridge.callHandler('setUserInfo', userInfo);
//         },
//         statisticsEvent: function (event) {
//             WebViewJavascriptBridge.callHandler('statisticsEvent', event);
//         },
//         loginPage: function () {
//             WebViewJavascriptBridge.callHandler('loginPage');
//         }
//     };
//     window.bridge = bridge;
//     module.exports = bridge;

//     (function () {
//         $('body').on("click", "a", function (e) {
//             e.preventDefault();
//             var href = $(this).attr('href');
//             if (href.startsWith('tel:')) {
//                 var phone = href.substr(4, href.length);
//                 console.log(phone);
//                 window.Core.App.confirm("是否确认拨打电话:" + phone, "温馨提示", function () {
//                     bridge.call(phone);
//                 });
//                 return true;
//             } else {
//                 var newWeb = $(this).data('type') && $(this).data('type') == 'new' ? true : false;
//                 if (href.indexOf('#') === -1) {
//                     Core.Page.changePage(href, newWeb);
//                 }
//             }
//         });
//     })();
// });
