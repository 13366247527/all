
/*
 * @Description: WebviewJavascriptBridge
 * @Author: sailei
 * @Date: 2018-12-15 14:16:12
 */
function setupWebViewJavascriptBridge (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge)  
    } 
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)  
    }  
    window.WVJBCallbacks = [callback]  
    let WVJBIframe = document.createElement('iframe')  
    WVJBIframe.style.display = 'none'  
    WVJBIframe.src = 'https://__bridge_loaded__'  
    document.documentElement.appendChild(WVJBIframe)  
    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe)  
    }, 0)
}


export default {
    callhandler (name, data, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            try {
                bridge.init(function (message, responseCallback) {
                  console.log('JS got a message', message)
                  var data = {
                    'Javascript Responds': 'CMYH!'
                  }
                  console.log('JS responding with', data)
                  if (data) {
                    responseCallback(data)
                  } else {
                    responseCallback('')
                  }
                })
              } catch (e) {
                console.log(e)
              }
            bridge.callHandler(name, data, callback)
        })  
    },  
    registerhandler (name, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(name, function (data, responseCallback) {
                callback(data, responseCallback)
            })
        })
    }
}
