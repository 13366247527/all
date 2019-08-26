var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, { 
  NODE_ENV: '"development"',
  //API_ROOT: '"http://192.168.1.166:8118"'
  API_ROOT: '"http://gps.logwsd.com"'
  // API_ROOT: '"http://172.21.0.5:5112"'
  //API_ROOT: '"http://140.143.236.130:5112"',
  //API_ROOT: '"http://test-tms.logwsd.com"',
  //API_ROOT: '"http://tms.logwsd.com"', //生产
  //API_ROOT: '"http://xh-tms.logwsd.com"', //预生产
  //API_ROOT: '"http://192.168.1.166:5030"' , 

})