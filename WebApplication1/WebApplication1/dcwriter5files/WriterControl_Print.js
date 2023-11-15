// 打印相关函数
"use strict";

import { DCTools20221228 } from "./DCTools20221228.js";
import { PageContentDrawer } from "./PageContentDrawer.js";
import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { WriterControl_Task } from "./WriterControl_Task.js";
import { WriterControl_Event } from "./WriterControl_Event.js";

/** 打印相关模块 */
export let WriterControl_Print = {
    /**
     * 创建Print()/PrintPreview()函数使用的参数对象
     * @returns
     */
    CreatePrintOptions: function () {
        return {
            CleanMode: true | false | null,// 默认为空，是否为整洁打印模式，可选值为true:整洁打印，false:留痕打印，空：采用编辑器当前的留痕显示设置。
            PrintRange: "AllPages" | "Selection" | "SomePages" | "CurrentPage",// 默认AllPages,打印范围，为一个字符串，可以为 AllPages,Selection,SomePages,CurrentPage
            PrintMode: "Normal" | "OddPage" | "EvenPage",// 默认Normal,打印模式，为一个字符串，可以为 Normal,OddPage,EvenPage。这里的页码是从0开始计算的。
            Collate: true,// 默认false,是否为逐份打印，为一个布尔值
            Copies: 1,// 默认1,打印份数，为一个整数。
            FromPage: 0, // 默认0，从0开始计算的打印开始页码，只有PrintRange=SomePages时本设置才有效
            ToPage: 1,//默认为总页数, 从0开始计算的打印结束开始页码，只有PrintRange=SomePages时本设置才有效
            SpecifyPageIndexs: "1,3,6-11,12",//默认空，打印指定页码列表，页码从0开始计算，各个项目之间用逗号分开，如果项目中间有个横杠，表示一个页码范围
            BodyLayoutOffset: 0,// 默认为0，正文偏移续打的纵向偏移量。当该值大于0，则续打设置无效。
            PageIndexFix:0,// 默认为0，打印出来的页码值的修正量。
            JumpPrintStartElementID: null,// 续打开始处的文档元素编号，若该属性值有效，则续打开始位置为该指定ID的元素的上边缘。
            JumpPrintEndElementID: null,// 续打结束处元素编号，若该属性值有效，则结束处续打的开始位置为指定ID的元素的下边缘。
            JumpPrint: { // 续打信息
                PageIndex: 0,// 从0开始计算的续打开始的页码
                Position: 0,// 开始续打的位置
                EndPageIndex: 0,// 从0开始计算的下端续打的页码
                EndPosition:0// 下端续打的位置
            }
        };
    },
    /** 打印预览控件的属性文档视图 
     * @param {any} options 打印设置
     */
    InvalidatePreview: function ( containerID , options) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement != null) {
            this.ClosePrintPreview(rootElement, false);
            var tick = new Date().valueOf();
            // 删除所有的页面图形元素
            var cnode = rootElement.firstChild;
            while (cnode != null) {
                if (cnode.nodeName == "CANVAS" && cnode.getAttribute("dctype") == "page") {
                    var tempNode = cnode;
                    cnode = cnode.nextSibling;
                    rootElement.removeChild(tempNode);
                }
                else if (cnode.nodeName == "DIV" && cnode.getAttribute("dctype") == "page-container") {
                    while (cnode.firstChild != null) {
                        cnode.removeChild(cnode.firstChild);
                    }
                    break;
                }
                else {
                    cnode = cnode.nextSibling;
                }
            }
            rootElement.__DCWriterReference.invokeMethod("InvalidatePreviewForWriterPrintPreviewControl", options);
            rootElement.TempElementForDoubleBuffer = null;
            WriterControl_Rule.InvalidateView(rootElement, "hrule");
            WriterControl_Rule.InvalidateView(rootElement, "vrule");
            WriterControl_Paint.InvalidateAllView(rootElement);
            tick = new Date().valueOf() - tick;
            WriterControl_Paint.UpdateViewForWaterMark(rootElement);
            console.log("加载打印预览花费毫秒:" + tick);
        }
    },
    /**
     * 关闭打印预览
     * @param {string | HTMLDivElement} containerID 根元素
    * @param {boolean} bolRefreshView  是否恢复文档内容排版
     */
    ClosePrintPreview: function (containerID, bolRefreshView) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement != null) {
            var div = DCTools20221228.GetChildNodeByDCType(rootElement, "page-printpreview");
            if (div != null) {
                // 删除打印预览的部件
                rootElement.removeChild(div);
                if (bolRefreshView == true) {
                    // 恢复文档排版
                    rootElement.__DCWriterReference.invokeMethod("RefreshViewAfterPrint", true);
                }
                // 绘图其他被隐藏的部件
                for (var element = rootElement.firstChild; element != null; element = element.nextSibling) {
                    element.style.display = element.__display_back;
                }
            }
        }
    },
    /**
     * 打印到服务器
     * @param {any} containerID 编辑器容器元素
     * @param {any} options 打印选项
     * @param {any} callBack 操作成功的回调函数
     */
    PrintToServer: function (containerID, strPrintServicePageUrl, options, callBack) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement == null) {
            return false;
        }
        if (strPrintServicePageUrl == null || strPrintServicePageUrl.length == 0) {
            strPrintServicePageUrl = rootElement.getAttribute("printservicepageurl");
        }
        if (strPrintServicePageUrl == null || strPrintServicePageUrl.length == 0) {
            console.log("DCWriter:未指定打印服务器的地址。");
            return false;
        }
        //wyc20230519把所有内容藏到options里，使用PrintPageRange属性名为了和四代兼容
        if (options == null) {
            options = new Object();
            options.PrintPageRange = "all";
        }
        if (options.PrintPageRange == null || options.PrintPageRange.length == 0) {
            options.PrintPageRange = WriterControl_Print.GetRuntimePageIndexString(rootElement, options);
        } 
        //var strPageIndexString = WriterControl_Print.GetRuntimePageIndexString(rootElement, options);
        var strJsonOptions = options == null ? null : JSON.stringify(options);
        var postData = rootElement.__DCWriterReference.invokeMethod("GetDataForPrintToServer", strJsonOptions);
        if (postData == null || postData.buffer == null) {
            return false;
        }
        rootElement.__DCWriterReference.invokeMethod("RefreshViewAfterPrint", true);
        jQuery.ajax(
            strPrintServicePageUrl ,
            {
                async: true,
                data: postData.buffer,
                method: "POST",
                type: "POST",
                processData: false
            })
            .done(function (data, textStatus, jqXHR) {
                if (callBack != null && typeof (callBack) == "function") {
                    callBack.call(rootElement, data);
                }
            });
        return true;
    },
    /**
     * 打印成PDF格式
     * @param {string | HTMLDivElement} containerID 编辑器容器元素
     * @param {any} options 打印选项
     * @param {Function} callBack 操作成功后的回调函数，回调函数的参数为一个blob对象。如果回调函数为空则默认下载PDF文件。
     * @returns 操作是否成功
     */
    PrintAsPDF: function (containerID, options, callBack) {
        return WriterControl_Print.InnerPrintAsFile(containerID, options, callBack, "pdf");
    },
    /**
     * 打印成HTML格式
     * @param {string | HTMLDivElement} containerID 编辑器容器元素
     * @param {any} options 打印选项
     * @param {Function} callBack 操作成功后的回调函数，回调函数的参数为html字符串。如果回调函数为空则默认下载PDF文件。
     * @returns 生成的HTML字符串
     */
    PrintAsHtml: function (containerID, options, callBack) {
        return WriterControl_Print.InnerPrintAsFile(containerID, options, callBack, "printhtml");
    },
    GetRuntimePageIndexString: function (rootElement, options) {
        // 触发准备打印事件
        WriterControl_Event.InnerRaiseEvent(rootElement, "EventPreparePrint", options);
        // 获得实际打印输出的页码列表
        var strCode = rootElement.__DCWriterReference.invokeMethod("GetPageIndexWidthHeightForPrint", true, options);
        var datas = JSON.parse(strCode);
        var pageCount = datas.length / 3;
        var strResult = "";
        for (var iCount = 0; iCount < pageCount; iCount++) {
            if (strResult.length > 0) {
                strResult += ",";
            }
            strResult += iCount.toString();
        }
        //var runtimePageIndexs = WriterControl_Print.GetRuntimePageIndexArray(options, pageCount, rootElement);
        //var strResult = "";
        //if (runtimePageIndexs != null && runtimePageIndexs.length > 0) {
        //    for (var iCount = 0; iCount < runtimePageIndexs.length; iCount++) {
        //        if (strResult.length > 0) {
        //            strResult += ",";
        //        }
        //        strResult += runtimePageIndexs[iCount];
        //    }
        //}
        return strResult;
    },
    InnerPrintAsFile: function (containerID, options, callBack, strFormat ) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement == null) {
            return false;
        }
        var strServicePageUrl = DCTools20221228.GetServicePageUrl(rootElement);
        if (strServicePageUrl == null || strServicePageUrl.length == 0) {
            console.error("DCWriter:未配置ServicePageUrl,无法执行PrintAsFile.");
            return false;
        }
        // 此处对应的服务器代码在 DCWriterForASPNET\Writer\Controls\Web\WC_WASM.cs
        var strUrl = strServicePageUrl + "?wasm=downloadfile&format=" + strFormat + "&dcbid2022=" + DCTools20221228.GetClientID();
        // 追加要打印的页码列表
        var strPageIndexString = WriterControl_Print.GetRuntimePageIndexString(rootElement, options);
        if (strPageIndexString != null && strPageIndexString.length > 0) {
            strUrl = strUrl + "&pages=" + strPageIndexString;
        }
        var postData = rootElement.__DCWriterReference.invokeMethod("InnerForDownloadFile");
        // 恢复文档排版
        rootElement.__DCWriterReference.invokeMethod("RefreshViewAfterPrint", true);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", strUrl, true);
        xhr.responseType = "blob";
        xhr.onload = async function () {
            if (this.status == 200) {
                var blob = this.response;
                if (typeof (callBack) == "function") {
                    if (strFormat == 'printhtml') {
                        var newHtml = await blob.text();
                        // 执行回调函数
                        callBack.call(rootElement, newHtml);
                    } else if (strFormat == 'pdf') {
                        //执行把blob转base64
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = function (e) {
                            var result = e.target.result.substring(28);
                            callBack.call(rootElement, result);
                        }
                    }
                }
                else {
                    let downloadElement = document.createElement("a");
                    let href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    if (strFormat == "pdf") {
                        downloadElement.download = "PrintForPDF_" + new Date().valueOf() + ".pdf"; //下载后文件名
                    }
                    else if (strFormat == 'printhtml') {
                        downloadElement.download = "PrintForHtml_" + new Date().valueOf() + ".html"; //下载后文件名
                    }
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                }
            }
        };
        xhr.send(postData);
        return true;
    },
    /**
     * 打印预览
     * @param {string | HTMLDivElement} containerID 根节点对象
     * @param {any} options 选项
     * @param {string} eleString 元素的数组 zhangbin 20230601
     */
    PrintPreview: function (containerID, options, eleString) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement == null) {
            return false;
        }
        //此处修改nextSibling为nextElementSibling处理nextSibling为text的情况
        for (var element = rootElement.firstChild; element != null; element = element.nextElementSibling) {
            if (element.style.display != "none") {
                element.__display_back = element.style.display;
                element.style.display = "none";
            }
        }//for
        // 处理滚动事件
        function DoPageContainerScroll() {
            var winHeight = this.clientHeight;
            //获取元素到浏览器窗口的距离
            var scrolltop = this.scrollTop;
            //此处修改nextSibling为nextElementSibling处理nextSibling为text的情况
            for (var element = this.firstChild; element != null; element = element.nextElementSibling) {
                if (element && element.nodeName == 'CANVAS') {
                    //获取元素到浏览器窗口的距离
                    var oTop = element.offsetTop;
                    //判断是否在可是区域中
                    var isInVisibleArea = (oTop + element.offsetHeight - scrolltop) >= 0 && (oTop - scrolltop) < winHeight;
                    if (isInVisibleArea == true && element._isRendered != true) {
                        WriterControl_Print.InnerDrawOnePage(element, true);
                        element._isRendered = true;
                        //var drawer = new PageContentDrawer(element, null);
                        //drawer.PageIndex = element.PageIndex;
                        //drawer.EventQueryCodes = function (drawer2) {
                        //    // 获得该页面的绘图代码
                        //    this.CanvasElement._isRendered = true;
                        //    var strCodePage = rootElement.__DCWriterReference.invokeMethod(
                        //        "PaintPageForPrint",
                        //        drawer2.PageIndex,
                        //        true);
                        //    return strCodePage;
                        //};
                        //drawer.AddToTask();
                    }//if
                }
            }//for
        }
        //var editorContainer = DCTools20221228.GetChildNodeByDCType(rootElement, "page-container");
        var pageContainer = DCTools20221228.GetChildNodeByDCType(rootElement, "page-printpreview");
        if (pageContainer == null) {
            pageContainer = document.createElement("DIV");
            pageContainer.setAttribute("dctype", "page-printpreview");
            //pageContainer.style.setProperty('position', 'relative', 'important');
            //pageContainer.style.margin = "10px 10px 10px 10px";
            pageContainer.style.height = "100%";
            pageContainer.style.overflow = "auto";
            //pageContainer.style.backgroundColor = "#ffffff";
            pageContainer.style.textAlign = "center";
            pageContainer.style.position = "relative";
        }
        else {
            while (pageContainer.firstChild != null) {
                pageContainer.removeChild(pageContainer.firstChild);
            }
        }
        pageContainer.style.display = "";
        rootElement.appendChild(pageContainer);
        //对pageContainer添加事件监听
        pageContainer.addEventListener('contextmenu', function (e) {
            if (e.target != null && e.target.nodeName == 'CANVAS') {
                if (rootElement.SetPreviewContextMenu != null
                    && typeof (rootElement.SetPreviewContextMenu) == "function") {
                    //判断是否为文本或者输入域或者表格
                    var ElementType = "XTextElement";
                    //XTextTableCellElement
                    var hasCurrentTable = rootElement.CurrentTableCell();
                    if (hasCurrentTable != null) {
                        ElementType == "XTextTableCellElement";
                    }
                    //XTextInputFieldElement
                    var hasCurrentInput = rootElement.CurrentInputField();
                    if (hasCurrentInput != null) {
                        ElementType == "XTextInputFieldElement";
                    }
                    console.log(e);
                    rootElement.SetPreviewContextMenu(rootElement, {
                        ElementType: ElementType,
                        PageElement: e.target,
                        TypeName: "快捷菜单信息",
                        X: e.offsetX,
                        Y: e.offsetY
                    });
                }
            }
        })
        //// xuyiming 添加打印预览前事件【EventBeforePrintPreview】
        //if (rootElement.EventBeforePrintPreview != null && typeof (rootElement.EventBeforePrintPreview) == "function") {
        //    rootElement.EventBeforePrintPreview(rootElement);
        //}
        //如果eleArr存在在此处单独处理对元素page-printpreview元素进行赋值
        if (eleString) {
            pageContainer.innerHTML = eleString;
        } else {
            pageContainer.onscroll = DoPageContainerScroll;
            // 触发准备打印事件
            WriterControl_Event.InnerRaiseEvent(rootElement, "EventPreparePrint", options);
            // 这里返回一个JSON数组，长度是要打印页数的四倍。四个整数一小组，第一个是页码，第二个是页宽，第三个是页高，第四个无意义。
            var strCode = rootElement.__DCWriterReference.invokeMethod("GetPageIndexWidthHeightForPrint", true, options);
            var datas = JSON.parse(strCode);
            //var pageCount = datas.length / 4;
            //var strBKImageData = null;
            //if (rootElement.__BackgroundImageElement != null) {
            //    strBKImageData = rootElement.__BackgroundImageElement.toDataURL();
            //}
            for (var iCount = 0; iCount < datas.length; iCount++) {
                var pageInfo = datas[iCount];
                var element = document.createElement("CANVAS");
                element.setAttribute("dctype", "page");
                element.PageIndex = pageInfo.PageIndex;
                element.setAttribute("native-width", pageInfo.Width);
                element.setAttribute("native-height", pageInfo.Height);
                element.__PageInfo = pageInfo;
                //element.width = pageInfo.Width;
                //element.height = pageInfo.Height;
                //var bkImg = datas[iCount * 4 + 3];
                element.style.margin = "10px 10px 10px 10px";
                element.style.border = "1px solid black";
                element.style.backgroundColor = "white";
                element.style.verticalAlign = "top";
                WriterControl_Paint.SetPageElementSize(rootElement, element);
                //if (bkImg == 1 && strBKImageData != null) {
                //    jQuery(element).addClass(rootElement.__BKImgStyleName)
                    //element.style.backgroundImage = "url(" + strBKImageData + ")";
                //}
                element._isRendered = false;
                pageContainer.appendChild(element);
            }
            DoPageContainerScroll.call(pageContainer);
        }
        if (rootElement.EventAfterPrintPreview != null
            && typeof (rootElement.EventAfterPrintPreview) == "function") {
            //在task中存在5毫秒的定时器,此处暂时先用定时器处理
            setTimeout(function () {
                rootElement.EventAfterPrintPreview(rootElement);
            }, 10);
        }
    },
    ///**
    // * 为打印预览而填充页面信息
    // * @param {any} containerID
    // * @param {any} strCodes
    // */
    //FillPagesForPreview: function (containerID, strCodes) {
    //    var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
    //    if (rootElement == null) {
    //        return null;
    //    }
    //},
    /**
     * 获得打印用的内置框架元素对象
     * @param {string} containerID 容器元素对象
     * @param {boolean} autoCreate 是否自动创建
     * @returns {HTMLIFrameElement} 内置框架对象
     */
    GetIFrame: function (containerID, autoCreate) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement == null) {
            return null;
        }
        var result = document.getElementById(rootElement.id + "_IFrame_Print");
        if (result == null) {
            if (autoCreate == false) {
                return null;
            }
            result = document.createElement("iframe");
            result.id = rootElement.id + "_IFrame_Print";
            result.style.position = "absolute";
        }
        rootElement.appendChild(result);
        result.style.width = rootElement.offsetWidth + "px";
        result.style.height = rootElement.offsetHeight + "px";
        result.style.left = "0px";
        result.style.top = "0px";// (rootElement.offsetTop + 600) + "px";
        result.style.border = "1px solid blue";
        result.style.display = "";
        result.style.backgroundColor = "white";
        result.style.zIndex = 10000;
        return result;
    },
    InnerDrawOnePage: function (element , bolPrintPreview ) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(element);
        if (rootElement == null) {
            return;
        }
        var pageInfo = element.__PageInfo;
        if ( pageInfo != null && pageInfo.PageSpan != null && pageInfo.PageSpan.length > 1) {
            // 拼接打印
            var zoomRate = rootElement.__DCWriterReference.invokeMethod("get_ZoomRate");
            var baseZoomRate = rootElement.__DCWriterReference.invokeMethod("get_WASMBaseZoomRate");
            if (bolPrintPreview == false) {
                baseZoomRate = 1;
                zoomRate = 1;
            }
            var pageSpan = pageInfo.PageSpan;
            var tempElement = WriterControl_Print.__TempCanvasElement;
            if (tempElement == null) {
                tempElement = document.createElement("canvas");
                WriterControl_Print.__TempCanvasElement = tempElement;
            }
            tempElement.width = element.width * zoomRate * baseZoomRate;
            tempElement.height = pageSpan[0] * zoomRate * baseZoomRate;
            for (var iCount = 1; iCount < pageSpan.length; iCount++) {
                var pi = pageSpan[iCount];
                var drawer = new PageContentDrawer(tempElement);
                drawer.PageIndex = pi;
                drawer.TopPos = pageSpan[0] * (iCount - 1) * zoomRate * baseZoomRate;
                drawer.EventQueryCodes = function () {
                    var ctx = tempElement.getContext("2d");
                    ctx.reset();
                    return rootElement.__DCWriterReference.invokeMethod(
                        "PaintPageForPrint",
                        this.PageIndex,
                        bolPrintPreview);
                };
                drawer.EventAfterDraw = function () {
                    var ctx = element.getContext("2d");
                    ctx.drawImage(tempElement, 0, this.TopPos);
                    ctx = tempElement.getContext("2d");
                    ctx.reset();
                };
                drawer.AddToTask();
            }
        }
        else {
            var drawer = new PageContentDrawer(element, null);
            drawer.PageIndex = element.PageIndex;
            drawer.EventQueryCodes = function (drawer2) {
                // 获得该页面的绘图代码
                var strCodePage = rootElement.__DCWriterReference.invokeMethod(
                    "PaintPageForPrint",
                    drawer2.PageIndex,
                    bolPrintPreview);
                return strCodePage;
            };
            drawer.AddToTask();
        }
    },
    /**
     * 打印
     * @param {string | HTMLElement} containerID 容器元素编号
     * @param {any} options 打印参数
     * @returns {boolean} 操作是否成功，但打印是异步操作，函数虽然返回，但打印还在继续。
     */
    Print: function (containerID, options) {
        //console.log('print');
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement == null) {
            return false;
        }
        var iframe = WriterControl_Print.GetIFrame(containerID, true);
        iframe.style.display = 'none';
        if (iframe == null) {
            return false;
        }

        var bkImage = null;
        if (rootElement.__WaterMarkData != null && rootElement.__WaterMarkData.length > 0) {
            bkImage = document.createElement("img");
            bkImage.src = rootElement.__WaterMarkData;
        }
        var targetDocument = iframe.contentDocument;
        targetDocument.open();
        targetDocument.write("");
        targetDocument.close();
        // 触发准备打印事件
        WriterControl_Event.InnerRaiseEvent(rootElement, "EventPreparePrint", options);
        var strCode = null;
        var bolIsWriterPrintPreviewControlForWASM = rootElement.getAttribute("dctype") == "WriterPrintPreviewControlForWASM";
        if (bolIsWriterPrintPreviewControlForWASM) {
            // 打印预览控件
            strCode = rootElement.__DCWriterReference.invokeMethod("GetPageIndexWidthHeightForWriterPrintPreviewControl",false, options);
        }
        else {
            // 编辑器控件
            strCode = rootElement.__DCWriterReference.invokeMethod("GetPageIndexWidthHeightForPrint", false, options);
        }
        if (strCode == null || strCode.length == 0) {
            // 没有获得任何数据
            return;
        }
        var datas = JSON.parse(strCode);
        var div = targetDocument.createElement("DIV");
        targetDocument.body.appendChild(div);
        var strPageStyle = datas.shift();
        div.style.zoom = datas.shift(); // 这里缩小显示被放大的内容，用于改进打印输出的精细度。
        var styleElement = targetDocument.createElement("STYLE");
        styleElement.innerText = strPageStyle;
        targetDocument.head.appendChild(styleElement);
        targetDocument.body.style.margin = "0px";
        targetDocument.title = " ";
        // 获得实际打印输出的页码列表
        var isFirstPage = true;
        //console.log('pageCount')
        for (var iCount = 0; iCount < datas.length; iCount++) {
            var pageInfo = datas[iCount];
            if (isFirstPage == false) {
                div.appendChild(targetDocument.createElement("BR"));
            }
            else {
                isFirstPage = false;
            }
            var element = targetDocument.createElement("CANVAS");
            element.__PageInfo = pageInfo;
            element.PageIndex = pageInfo.PageIndex;
            element.width = pageInfo.Width;
            element.height = pageInfo.Height;
            //var bolBKImg = datas[iCount * 4 + 3];
            //element.style.pageBreakAfter = "always";
            element.style.pageBreakInside = "avoid";
            //element.style.border = "1px solid black";
            div.appendChild(element);
            WriterControl_Print.InnerDrawOnePage(element, false);
            //var drawer = new PageContentDrawer(element, null);
            //drawer.PageIndex = element.PageIndex;
            ////if (bolBKImg == 1) {
            ////    drawer.BKImage = rootElement.__BackgroundImageElement;
            ////}
            //drawer.EventQueryCodes = function (drawer2) {
            //    //if (this.BKImage != null) {
            //    //    var ctx = this.CanvasElement.getContext("2d");
            //    //    ctx.drawImage(this.bkImage, 0, 0, this.CanvasElement.width, this.CanvasElement.height);
            //    //}
            //    // 获得该页面的绘图代码
            //    var strCodePage = rootElement.__DCWriterReference.invokeMethod(
            //        "PaintPageForPrint",
            //        drawer2.PageIndex,
            //        false);
            //    return strCodePage;
            //};
            //drawer.AddToTask();
        }//for
        //var btn = targetDocument.createElement("input");
        //btn.type = "button";
        //btn.value = "print";
        //btn.onclick = function () {
        //    iframe.contentWindow.print();
        //};
        //div.appendChild(btn);
        //返回打印的html
        if (rootElement != null
            && rootElement.EventBeforePrintToGetHtml != null
            && typeof rootElement.EventBeforePrintToGetHtml == 'function') {
            rootElement.PrintAsHtml(null, null, {
                isPrint: true,
                printCallBack: function (html, printFun) {
                    rootElement.EventBeforePrintToGetHtml(html);
                }
            });
        }
        WriterControl_Task.AddCallbackForCompletedAllTasks(function () {
            if (options != null && typeof (options.CompletedCallback) == "function") {
                iframe.contentWindow.onafterprint = function (e) {
                    // !! 这里有个问题，用户按下取消，本事件也会触发
                    // 执行打印完毕事件
                    options.CompletedCallback.call(rootElement, rootElement);
                    iframe.contentDocument.close();
                    iframe.style.display = "none";
                }
            }
            //在此处处理打印前事件
            if (rootElement != null && rootElement.EventBeforePrint != null
                && typeof rootElement.EventBeforePrint == 'function') {
                rootElement.EventBeforePrint(targetDocument);
            }
            // 所有绘图任务完成，进行打印
            iframe.contentWindow.print();
            if (bolIsWriterPrintPreviewControlForWASM == false) {
                rootElement.__DCWriterReference.invokeMethod("RefreshViewAfterPrint", true);
            }
            //rootElement.removeChild(iframe);
            // 销毁打印过的文档
            //iframe.contentDocument.open();
            //iframe.contentDocument.write("");
            //iframe.contentDocument.close();
            //iframe.style.display = "none";
        });
        return true;
    },
}