// 注册接口
let DCRegister = (data, callback) => {
    var url = 'http://www.dcwriter.cn:2528/DCNew5LoginService.asmx/DCRegister'
    jQuery.support.cors = true
    $.ajax({
        url: url,
        type: 'Post',
        data: data,
        success: function (res) {
            callback(res)
        },
        error: function (e) {
            console.log(e)
        },
    })
}

// 登录接口
let DCLogin = (data, callback) => {
    var url = 'http://www.dcwriter.cn:2528/DCNew5LoginService.asmx/DCLogin'
    jQuery.support.cors = true
    $.ajax({
        url: url,
        type: 'Post',
        data: data,
        success: function (res) {
            callback(res)
        },
        error: function (e) {
            console.log(e)
        },
    })
}

// 获取全部账号信息
let getAllLoginClass = (callback) => {
    var url = 'http://www.dcwriter.cn:2528/DCNew5LoginService.asmx/getAllLoginClass'
    jQuery.support.cors = true
    $.ajax({
        url: url,
        type: 'Post',
        success: function (res) {
            callback(res)
        },
        error: function (e) {
            console.log(e)
        },
    })
}