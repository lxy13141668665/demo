//
// 2023-8-1
// 第五代WEB编辑器启动脚本
// 南京都昌信息科技有限公司
// 当配合5代文件发布器 DCWriter5FileDownload 时，对本文件作出任何改变，导致文件修改时间发生改变时，
// 浏览器都会自动重新下载所有程序文件（DLL/GZ）等，而无需清空浏览器的缓存。
//
"use strict";

(function () {
    if (window.__DCWriter5Started == true) {
        // 避免重复调用
        return;
    }
    window.__DCWriter5Started = true;
    var strAppVersion = "$$version$$";
    // 获得资源基础路径
    var strBasePath = "_framework/";
    var bolDebugMode = false;
    if (document.currentScript != null) {
        bolDebugMode = document.currentScript.getAttribute("debugmode") == "true";
        strBasePath = document.currentScript.getAttribute("src");
        var strServicePageUrl = null;
        if (strBasePath != null && strBasePath.length > 0) {
            var index = strBasePath.lastIndexOf("?");
            if (index > 0) {
                strServicePageUrl = strBasePath.substring(0, index).trim();
                window.__DCWriterServicePageUrl = strServicePageUrl;
            }
            else {
                index = strBasePath.lastIndexOf("/");
                if (index < 0) {
                    index = strBasePath.lastIndexOf("\\");
                }
                if (index < 0) {
                    strBasePath = "./";
                }
                else {
                    strBasePath = strBasePath.substring(0, index) + "/";
                }
            }
            strBasePath = strBasePath.trim();
        }
        else {
            strBasePath = "_framework/";
        }
    }
    if (strServicePageUrl != null && strServicePageUrl.length > 0) {
        console.info("DCWriter5全局服务器页面地址:" + strServicePageUrl);
    }
    else {
        console.info("DCWriter5基础路径:" + strBasePath);
    }
    var jsScript = document.createElement("script");
    jsScript.setAttribute("language", "javascript");
    var strEnvironment = "";
    if (strServicePageUrl != null && strServicePageUrl.length > 0) {
        jsScript.src = strServicePageUrl + "?ver=" + strAppVersion + "&wasmres=blazor.webassembly.js";
        strEnvironment = strServicePageUrl + "?ver=" + strAppVersion + "&wasmres=";
    }
    else {
        jsScript.src = strBasePath + "blazor.webassembly.js";
        strEnvironment = strBasePath;
    }
    jsScript.setAttribute("autostart", "false");
    jsScript.onload = function () {
        Blazor.start({
            environment: strEnvironment,
            loadBootResource: function (type, name, defaultUri, integrity) {
                var strRuntimeUrl = defaultUri;
                if (strServicePageUrl != null && strServicePageUrl.length > 0) {
                    strRuntimeUrl = strServicePageUrl + "?ver=" + strAppVersion + "&wasmres=" + name;
                }
                else if (strBasePath != null && strBasePath.length > 0) {
                    // 启用自定义下载路径
                    strRuntimeUrl = strBasePath + name;
                }
                if (bolDebugMode == true) {
                    console.log("DCWriter5加载资源:" + strRuntimeUrl);
                }
                if (type != "dotnetjs"
                    && name != "blazor.boot.json"
                    && strServicePageUrl != null
                    && strServicePageUrl.length > 0) {
                        // 如果遇到使用服务器页面的情况，则允许启用本地缓存
                    return fetch(
                        strRuntimeUrl, {
                        method: "GET",
                        credentials: "include",
                        cache: "default"
                    });
                }
                else {
                    return strRuntimeUrl;
                }
            }
        });
    }
    document.head.appendChild(jsScript);
})();