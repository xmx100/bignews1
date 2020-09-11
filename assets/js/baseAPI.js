//每次调用ajax函数前会调用ajaxPrefilter函数，在这个函数中能够拿到传递的配置对象
// options:传递的配置对象
$.ajaxPrefilter(function (options) {
  console.log(options.url);
  // options.url:获取请求地址
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  console.log(options.url);
});
