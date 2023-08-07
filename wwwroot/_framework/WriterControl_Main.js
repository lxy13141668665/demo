"use strict";

import { WriterControl_UI } from "./WriterControl_UI.js";
import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { DCTools20221228 } from "./DCTools20221228.js";
import { WriterControl_API } from "./WriterControl_API.js";
import { WriterControl_Task } from "./WriterControl_Task.js";
import { WriterControl_Rule } from "./WriterControl_Rule.js";
import { WriterControl_Event } from "./WriterControl_Event.js";
import { WriterControl_Dialog } from "./WriterControl_Dialog.js";
import { WriterControl_DOMPackage } from "./WriterControl_DOMPackage.js";

export let WriterControl_Main = {
    /**
     * 自动的初始化所有编辑器控件对象
     * @param {any} blazor
     */
    StartGlobal: function () {
        //return;
        var divs = document.querySelectorAll("div[dctype='WriterControlForWASM'],div[dctype='WriterPrintPreviewControlForWASM']");
        if (divs != null && divs.length > 0) {
            for (var iCount = 0; iCount < divs.length; iCount++) {
                var div = divs[iCount];
                if (div.__DCWriterReference == null) {
                    window.CreateWriterControlForWASM(divs[iCount]);
                }
            }
        }
    },

    /**
     * 启动编辑器
     * @param {string} entryPointAssemblyName 入口程序集的名称
    * @param  {string} strFlagID 标记元素编号
     * @param {string} strVersion 软件内部版本号
     */
    Start20221215: function (entryPointAssemblyName, strFlagID, strVersion) {
        if (typeof (jQuery) == "undefined") {
            throw new "没有检测到JQuery，无法执行。";
        }
        //window.WriterControl_Main = WriterControl_Main;
        if (entryPointAssemblyName != null && entryPointAssemblyName.length > 0) {
            window.EntryPointAssemblyName = entryPointAssemblyName;
        }
        //window.CreateWriterControlForWASM = WriterControl_Main.CreateWriterControlForWASM;
        //zhangbin 20230423 添加光标和下拉隐藏的事件
        var e = document.getElementById(strFlagID);
        if (e != null) {
            var rootElement = e.parentNode;
            window.CreateWriterControlForWASM(rootElement);
            WriterControl_Paint.InitTTFSystem(rootElement);
        }
    },
    /**
     * 销毁控件
     * @param {string | HTMLDivElement} strContainerID 容器HTML元素编号或者对象
     * @returns {boolean} 操作是否完成
     */
    DisposeControl: function (strContainerID) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(strContainerID);
        if (rootElement != null && rootElement.__DCWriterReference != null) {
            rootElement.__DCWriterReference.invokeMethod("Dispose");
            rootElement.__DCWriterReference = null;
            return true;
        }
        return false;
    },
    /**
     * 创建编辑器实例
     * @param {string | HTMLDivElement} strContainerID 容器HTML元素编号或者对象
     */
    CreateWriterControlForWASM: function (strContainerID) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(strContainerID);
        if (rootElement == null) {
            return null;
        }
        if (rootElement.id == null || rootElement.id.length == 0) {
            rootElement.id = "dcwriter_" + new Date().valueOf();
        }
        rootElement.__BKImgStyleName = "__dcbkimg_" + parseInt(Math.random() * 1000000);
        DCTools20221228.LogTick("初始化控件" + rootElement.id);

        try {
            //存储加载文档花费毫秒，用于提供给性能页面
            let indexPerformanceTiming = {}
            if (window.localStorage.getItem('indexPerformanceTiming')) {
                indexPerformanceTiming = {
                    ...JSON.parse(window.localStorage.getItem('indexPerformanceTiming'))
                }
            }
            indexPerformanceTiming['myWriterControl'] = {
                ...(indexPerformanceTiming.myWriterControl || {}),
                [rootElement.id]: {
                    startTime: (new Date()).valueOf(),
                }
            }
            window.localStorage.setItem('indexPerformanceTiming', JSON.stringify(indexPerformanceTiming))
        } catch (error) {

        }


        var ctl = DotNet.invokeMethod(
            window.EntryPointAssemblyName,
            "CreateWriterControlForWASM",
            rootElement.id);
        rootElement.__DCWriterReference = ctl;
        //var opts = ctl.invokeMethod("get_DocumentOptions");
        //var jsonTxt = JSON.stringify(opts);
        while (rootElement.firstChild != null) {
            rootElement.removeChild(rootElement.firstChild);
        }
        var strProductVersion = rootElement.__DCWriterReference.invokeMethod("GetProductVersion");
        //rootElement.setAttribute("dctype", "WriterControlForWASM");
        rootElement.setAttribute("dcversion", strProductVersion);
        console.log("DCWriter5软件发布时间:" + strProductVersion);
        function funcConnectServer() {
            var strClientID = DCTools20221228.GetClientID();
            var strUrl2 = rootElement.__DCWriterReference.invokeMethod(
                "GetURLForConnectServer",
                rootElement.getAttribute("servicepageurl"),
                strClientID);
            if (strUrl2 != null && strUrl2.length > 0) {
                var settings = {
                    async: true,
                    method: "GET",
                    xhrFields: { withCredentials: true },
                    crossDomain: true,
                };
                jQuery.support && (jQuery.support.cors = true);
                jQuery.ajax(strUrl2, settings).done(function (data, textStatus, jqXHR) {
                    if (textStatus == "success"
                        && rootElement.__DCWriterReference.invokeMethod("HandleResultFromServer", data) == true) {
                        // 清空任务列表，重新绘制文档内容
                        WriterControl_Task.ClearTask();
                        WriterControl_Rule.InvalidateView(rootElement, "hrule");
                        WriterControl_Rule.InvalidateView(rootElement, "vrule");
                        WriterControl_Paint.InvalidateAllView(rootElement);
                        WriterControl_Paint.UpdateViewForWaterMark(rootElement);
                    }
                });
            }
        };
        var strRegisterCodeUrl = rootElement.getAttribute("registercodeurl");
        if (strRegisterCodeUrl != null && strRegisterCodeUrl.length > 0) {
            rootElement.removeAttribute("RegisterCode");
            jQuery.ajax(strRegisterCodeUrl).done(function (data, textStatus, jqXHR) {
                if (textStatus == "success") {
                    rootElement.__DCWriterReference.invokeMethod(
                        "LoadConfigByHtmlAttribute",
                        "RegisterCode",
                        data);
                    rootElement.__DCWriterReference.invokeMethod("InvalidateAll");
                }
                else {
                    funcConnectServer();
                }
            });
        }
        else {
            funcConnectServer();
        }

        if (rootElement.getAttribute("dctype") == "WriterPrintPreviewControlForWASM") {
            // 添加打印预览控件的成员
            WriterControl_API.BindControlForWriterPrintPreviewControlForWASM(rootElement, rootElement.__DCWriterReference);
        }
        else {
            // 添加编辑器控件的成员
            WriterControl_API.BindControlForWriterControlForWASM(rootElement, rootElement.__DCWriterReference);
        }
        // 加载系统配置
        for (var iCount = 0; iCount < rootElement.attributes.length; iCount++) {
            var attr = rootElement.attributes[iCount];
            rootElement.__DCWriterReference.invokeMethod(
                "LoadConfigByHtmlAttribute",
                attr.name,
                attr.value);
        }
        //wyc20230701:补充刷新文档选项
        if (typeof (rootElement.refreshDocumentOptions) === "function") {
            rootElement.refreshDocumentOptions.call(rootElement);
        }


        //rootElement.removeAttribute("registercode");
        //zhangbin 20230201 判断是否存在自定义高度,如不存在,默认设置600px 
        if (rootElement.style.height == '') {
            rootElement.style.height = '100%';
        }
        // 销毁控件
        rootElement.DiposeControl = function () {
            if (rootElement.__DCWriterReference != null) {
                rootElement.__DCWriterReference.invokeMethod("Dispose");
                rootElement.__DCWriterReference = null;
            }
        };
        // rootElement.style.overflowY = 'auto';

        //此处的方法用于处理关闭下拉和光标的
        document.body.addEventListener('mousedown', function (e) {
            var dropdown = rootElement.querySelector('#divDropdownContainer20230111');
            var caret = rootElement.querySelector('#divCaret20221213');
            //当rootElement尺寸发生改变时.关闭下拉
            if (dropdown != null) {
                dropdown.CloseDropdown();
            }
            if (caret != null) {
                caret.style.display = 'none';
                clearInterval(caret.handleTimer);
            }
        });

        //禁用浏览器默认的右键
        rootElement.addEventListener('contextmenu', function (e) {
            e.stopPropagation();
            e.preventDefault();
            e.returnValue = false;
            return false;
        })

        //开启监听
        /**
         * 
         * @param {any} message 错误文本
         * @param {any} source  错误所在资源
         * @param {any} lineno  错误所在行
         * @param {any} colno   错误所在列
         * @param {any} error   详细信息
         */
        window.onerror = function (message, source, lineno, colno, error) {
            var hasFrameWork = false;
            //在此处判断source是否存在_framework
            if (source != null && typeof source == 'string') {
                if (source.indexOf('_framework') >= 0) {
                    hasFrameWork = true;
                }
            }
            if (hasFrameWork && rootElement.EventOnError && typeof rootElement.EventOnError == 'function') {
                var options = {
                    message,
                    source,
                    lineno,
                    colno,
                    error
                }
                var needLogError = rootElement.EventOnError(options);
                if (needLogError === false) {
                    //这里为处理控制台实现显示错误，默认显示
                    return true;
                }
            }
        }

        //当整个窗口失去焦点的时候也需要失去焦点
        //判断是否为移动端
        if (!'ontouchstart' in document.documentElement) {
            window.addEventListener('onblur', function () {
                var dropdown = rootElement.querySelector('#divDropdownContainer20230111');
                var caret = rootElement.querySelector('#divCaret20221213');
                if (dropdown != null) {
                    dropdown.CloseDropdown();
                }
                if (caret != null) {
                    caret.style.display = 'none';
                    clearInterval(caret.handleTimer);
                }
            })
        };

        //zhangbin 20230607 当最外层包裹的div元素大小改变的监听事件
        var resizeObserver = new ResizeObserver(entries => {
            var dropdown = rootElement.querySelector('#divDropdownContainer20230111');
            var caret = rootElement.querySelector('#divCaret20221213');
            //当rootElement尺寸发生改变时.关闭下拉
            if (dropdown != null) {
                dropdown.CloseDropdown();
            }
            if (caret != null) {
                caret.style.display = 'none';
                clearInterval(caret.handleTimer)
            }
            //在此处判断最外层包裹大小改变并处理标尺位置
            WriterControl_Rule.InvalidateView(rootElement, "hrule");
            WriterControl_Rule.InvalidateView(rootElement, "vrule");
            rootElement.SetAutoZoom(WriterControl_Event.InnerRaiseEvent, 'EventDocumentResize', true);
            WriterControl_UI.ReloadHostControls(rootElement);
            //WriterControl_Event.InnerRaiseEvent(rootElement, "EventDocumentResize");
        })
        resizeObserver.disconnect(rootElement);
        //确保该元素身上只有一个事件监听
        resizeObserver.observe(rootElement);

        rootElement.addEventListener("mousewheel", function (e) {
            if (e.altKey == false && e.ctrlKey == true && e.shiftKey == false) {
                // Ctrl+鼠标滚动则进行缩放操作
                var elements = WriterControl_UI.GetPageCanvasElements(this);
                var zoomRate = rootElement.__DCWriterReference.invokeMethod("get_ZoomRate");
                //for (var iCount = 0; iCount < elements.length; iCount++) {
                //    var element = elements[iCount];
                //    if (element.hasAttribute("native-width")) {
                //        zoomRate = parseFloat(element.width)
                //            / parseFloat(element.getAttribute("native-width"));
                //        break;
                //    }
                //}
                //if (isNaN(zoomRate)) {
                //    zoomRate = 1;
                //}
                var newZoomRate = zoomRate;
                if (e.wheelDelta > 0 || e.detail < 0) {
                    // 向上滚动
                    newZoomRate = zoomRate + 0.03;
                }
                else {
                    // 向下滚动
                    newZoomRate = zoomRate - 0.03;
                }
                rootElement.SetZoomRate(newZoomRate);
                e.preventDefault && e.preventDefault();
                return false;
            }
        }, false);
        WriterControl_Rule.UpdateRuleVisible(rootElement);
        window.setTimeout(function () {
            WriterControl_Event.RaiseControlEvent(rootElement, "OnLoad");
            rootElement.__DCWriterReference.invokeMethod("CheckForLoadDefaultDocument");
        }, 1);
    }
};

window.WriterControl_Main = WriterControl_Main;
window.WriterControl_Paint = WriterControl_Paint;
window.WriterControl_UI = WriterControl_UI;
window.WriterControl_Task = WriterControl_Task;
window.WriterControl_Rule = WriterControl_Rule;
window.WriterControl_Event = WriterControl_Event;
window.DCTools20221228 = DCTools20221228;
window.WriterControl_Dialog = WriterControl_Dialog;
window.WriterControl_DOMPackage = WriterControl_DOMPackage;

window.CreateWriterControlForWASM = WriterControl_Main.CreateWriterControlForWASM;

// 入口点程序集名称
window.EntryPointAssemblyName = "DCSoft.WASM";
