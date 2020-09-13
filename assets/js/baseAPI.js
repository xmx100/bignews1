//每次调用ajax函数前会调用ajaxPrefilter函数，在这个函数中能够拿到传递的配置对象
// options:传递的配置对象
$.ajaxPrefilter(function (options) {
  // options.url:获取请求地址
  options.url = 'http://ajax.frontend.itheima.net' + options.url;

  // 为有权限的接口设置请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = { Authorization: localStorage.getItem('token') || '' };
  }
  // 统一执行complete函数
  options.complete = function (res) {
    // 用res.responseJSON拿到服务器响应的数据
    console.log(res);
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  };
});
