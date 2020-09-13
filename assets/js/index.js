$(function () {
  //获取用户基本信息
  getUserinfo();
  //退出登录功能
  var layer = layui.layer;
  $('#btnlogout').click(function () {
    //提示用户是否退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //清空本地存储中的token
      localStorage.removeItem('token');
      //跳转到登录页
      location.href = '/login.html';
      //关闭弹出层
      layer.close(index);
    });
  });
});
// 获取用户信息
function getUserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头配置对象,放到baseAPI里
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
      //渲染用户头像
      renderAvatar(res.data);
    },
    //不成功还是失败，都调用此函数
    // complete: function (res) {
    //   // 用res.responseJSON拿到服务器响应的数据
    //   console.log(res);
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // },
  });
}
//渲染用户头像
function renderAvatar(user) {
  //   获取用户名称(如果用户有nickname就用nickname，没有就用username)
  var name = user.nickname || user.username;
  //   设置欢迎文本
  $('#welcome').html(`欢迎  ${name}`);
  //按需渲染用户头像(如果有用户头像先使用用户头像，没有就使用文本头像)
  if (user.user_pic !== null) {
    //渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    //渲染文字头像
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
}
