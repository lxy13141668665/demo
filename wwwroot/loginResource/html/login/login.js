(function ($) {
    var paramList = window.location.search.substr(1).split('&')
    var isIndex = false;
    if (paramList != null && paramList.length == 1 && paramList[0] == 'isNoUser=true') {
        isIndex = true;
    }

    layui.use(['form', 'jquery'], function () {
        var $ = layui.jquery,
            form = layui.form,
            layer = layui.layer

        //  查看密码
        $('.bind-password').on('click', function () {
            if ($(this).hasClass('icon-5')) {
                $(this).removeClass('icon-5')
                $("input[name='password']").attr('type', 'password')
            } else {
                $(this).addClass('icon-5')
                $("input[name='password']").attr('type', 'text')
            }
        })

        // 显示隐藏注册框
        $('.forget-password').on('click', () => {
            $('#login').hide()
            $('#register').show()
        })
        $('.forget-login').on('click', () => {
            $('#register').hide()
            $('#login').show()
        })

        // 注册
        form.on('submit(registered)', function (data) {
            data = data.field
            $('.layui-icon-loading').css('display', 'block')
            let obj = {
                UserName: data.username,
                UserPwd: data.password,
                UserCompany: data.CompanyName,
                RealName: data.Name,
                UserPhone: data.MobilePhone,
            }
            DCRegister(obj, res => {
                setTimeout(function () {
                    $('.layui-icon-loading').css('display', 'none')
                    let code = $(res).find('string').text()
                    if (code == 1) {
                        layer.msg('注册成功', {
                            time: 500
                        }, function () {
                            $("#login input[name='username']").attr('value', obj.UserName)
                            $("#login input[name='password']").attr('value', '')
                            // $('.tip1 .layui-form-checkbox').removeClass('layui-form-checked')
                            // $('.remember').removeAttr('checked')
                            $('#register').hide()
                            $('#login').show()
                        })
                    } else {
                        layer.msg('注册失败')
                    }
                }, 500)
            })
            return false
        })



        const request = indexedDB.open('myDatabase', 1);

        request.addEventListener('success', e => {

            console.log('连接数据库成功');

        });



        request.addEventListener('error', e => {

            console.log('连接数据库失败');

        });
        // 登录
        form.on('submit(login)', function (data) {
            data = data.field
            $('.layui-icon-loading').css('display', 'block')
            let obj = {
                UserName: data.username,
                UserPwd: data.password,
            }
            DCLogin(obj, res => {
                setTimeout(function () {
                    $('.layui-icon-loading').css('display', 'none')
                    let code = $(res).find('string').text()
                    if (code == '验证成功') {
                        layer.msg(
                            '登录成功',
                            {
                                time: 500,
                            }, function () {
                                let userLoginInfo = {
                                    UserName: data.username,
                                    UserPwd: data.password,
                                    loginDate: +new Date()
                                }
                                try {
                                    localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo))
                                    window.location.href = `./index.html`
                                } catch (err) {
                                    let userStr = btoa(`user=${data.username}`)
                                    let passwordStr = btoa(`password=${data.password}`)
                                    window.location.href = `./index.html?${userStr}&${passwordStr}&${btoa(Date.now())}`
                                }

                            })
                    }
                    else if (code == '该账号尚未启用') {
                        layer.msg('该账号尚未启用', {
                            time: 2000
                        })
                    } else if (code == '账号不存在') {
                        layer.msg('账号不存在', {
                            time: 2000
                        })
                    } else if (code == '密码错误') {
                        layer.msg('密码错误', {
                            time: 2000
                        })
                    } else if (code == '该账号已过期') {
                        layer.msg('该账号已过期,请联系商务人员续签', {
                            time: 2000
                        })
                    }
                }, 400)
            })
            return false
        })

        function created() {
            try {
                let userLoginInfo = null;
                try {
                    userLoginInfo = localStorage.getItem('userLoginInfo');
                } catch (err) { }
                if (userLoginInfo) {
                    // window.location.href = 'http://www.dcwriter.cn/'
                    $("#login input[name='password']").attr('value', JSON.parse(userLoginInfo).UserPwd)
                    $("#login input[name='username']").attr('value', JSON.parse(userLoginInfo).UserName)
                    if (isIndex) {
                        $('.login-btn')[0].click();
                    }
                } else if (isIndex) {
                    layer.open({
                        type: 1
                        , title: false //不显示标题栏
                        , closeBtn: false
                        , area: '300px;'
                        , shade: 0.8
                        , id: 'LAY_layuipro' //设定一个id，防止重复弹出
                        , btn: '关闭'
                        , btnAlign: 'c'
                        , moveType: 1 //拖拽模式，0或者1
                        , content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;font-size: 14px;text-align:center">未查询到合格的用户名或密码<br/>需重新登录</div>'
                        , yes: function () {
                            layer.closeAll();
                        }
                    });
                }
            } catch (error) {
                window.location.href = './login.html'
            }
        }
        created()
    })

})(jQuery)