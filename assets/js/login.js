$(function () {
  // 切换登陆和注册界面
  $('#linl_reg').click(function () {
    $('.login_box').hide();
    $('.reg_box').show();
  });
  $('#link_login').click(function () {
    $('.login_box').show();
    $('.reg_box').hide();
  });
  // 从layui中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  // 自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码是否一致
    repwd: function (value) {
      var pwd = $('.reg_box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致';
      }
    },
  });
  //监听注册表单提交
  $('#form_id').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_id [name=username]').val(),
        password: $('#form_id [name=password]').val(),
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        //自动切换到登陆界面
        $('#link_login').click();
      },
    });
  });
  //监听登陆表单提交
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // data: {
      //   username: $('#form_login [name=username]').val(),
      //   password: $('#form_login [name=password]').val(),
      // },
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        //将登陆成功后的token保存到本地存储
        localStorage.setItem('token', res.token);
        //跳转后台主页
        location.href = 'index.html';
      },
    });
  });
});
