"use strict";

// 这里定义编辑器内容绘制代码
// 南京都昌信息科技有限公司 2023-3-22

import { PageContentDrawer } from "./PageContentDrawer.js";
import { DCTools20221228 } from "./DCTools20221228.js";
import { WriterControl_UI } from "./WriterControl_UI.js";
import { DCBinaryReader } from "./DCTools20221228.js";
import { WriterControl_Task } from "./WriterControl_Task.js";
import { WriterControl_Print } from "./WriterControl_Print.js";

export let WriterControl_Paint = {

    /**
     * 初始化TTF文件系统
     * @param {any} strContainerID
     * @returns
     */
    InitTTFSystem: function (strContainerID, strAssemblyName) {
        if (window.__DC_TTFFiles == null) {
            var rootElement = DCTools20221228.GetOwnerWriterControl(strContainerID);
            if (rootElement == null) {
                return null;
            }
            // 获得基础路径
            var strBaseUrl = rootElement.getAttribute("TTFPath");
            if (strBaseUrl == null) {
                strBaseUrl = window.__DCWriterBaseUrl;
                if (strBaseUrl == null || strBaseUrl.length == 0) {
                    strBaseUrl = "_framework/Fonts/";
                }
                else {
                    strBaseUrl = DCTools20221228.FixResourceBasePath(strBaseUrl) + "Fonts/";
                }
            }
            else {
                strBaseUrl = DCTools20221228.FixResourceBasePath(strBaseUrl);
            }

            if (strBaseUrl == null || strBaseUrl.length == 0) {
                // 没有找到基础路径
                return null;
            }
            jQuery.ajax(
                strBaseUrl + "font-list.json",
                { async: true, method: "GET", type: "GET" }).done(function (data, textStatus, jqXHR) {
                    var fontList = data;
                    if (typeof (data) == "string") {
                        fontList = JSON.parse(data);
                    }
                    fontList.BaseUrl = strBaseUrl;
                    for (var iCount = 0; iCount < fontList.length; iCount++) {
                        // 注册TTF字体文件信息
                        var fontItem = fontList[iCount];
                        DotNet.invokeMethod(
                            window.EntryPointAssemblyName,
                            "RegisterTTF",
                            fontItem.FontName,
                            strBaseUrl + fontItem.FileName);
                    }
                    window.__DC_TTFFiles = fontList;
                });
        }
    },

    DownloadTTFFile: function (strContainerID, strFontName) {
        if (window.__DC_TTFFiles != null) {

        }
    },

    BuildBackgroundImageAndWaterMark: function (strContainerID) {

    },

    /**
     * 绘制BMP图像内容
     * @param {string} strCanvasElementID 使用的画布对象元素编号
     * @param {number} bmpWidth 图片宽度
     * @param {number} bmpHeight 图片高度
     * @param {Uint8Array} bsData 图片绘图数据
     * @returns 画布元素编号
     */
    DrawBitmapContent: function (strCanvasElementID, bmpWidth, bmpHeight, bsData) {
        var element = null;
        if (strCanvasElementID == null || strCanvasElementID.length == 0) {
            strCanvasElementID = "img_" + new Date().valueOf() + "_" + Math.random();
            element = document.createElement(strCanvasElementID);
            element.id = strCanvasElementID;
        }
        else {
            element = document.getElementById(strCanvasElementID);
        }
        if (element == null) {
            element = document.createElement("CANVANS");
            element.width = bmpWidth;
            element.height = bmpHeight;
        }
        var drawer = new PageContentDrawer(element, bsData);
        drawer.AddToTask();
        return strCanvasElementID;
    },
    /**
    * 为水印而更新显示
    * @param {HTMLElement} rootElement 根对象
    */
    UpdateViewForWaterMark: function (rootElement) {
        rootElement.__BackgroundImageElement = null;
        if (rootElement.getAttribute("dctype") == "WriterPrintPreviewControlForWASM") {
            // 打印预览控件不处理
            return;
        }
        //rootElement.__BackgroundDrawer = null;
        var styleElement = DCTools20221228.GetChildNodeByDCType(rootElement, "style_bkimg");
        var data2 = rootElement.__DCWriterReference.invokeMethod("GetDefaultBackgroundGraphicsData");
        if (data2 != null && data2.length > 0) {
            var reader = new DCBinaryReader(data2);
            var pageWidth = reader.ReadInt32();
            var pageHeight = reader.ReadInt32();
            var tempElement = document.createElement("canvas");
            tempElement.width = pageWidth;
            tempElement.height = pageHeight;
            var drawer = new PageContentDrawer(tempElement, reader);
            drawer.TypeName = "UpdateViewForWaterMark";
            drawer.EventAfterDraw = function () {
                rootElement.__BackgroundImageElement = tempElement;
                var styleElement2 = DCTools20221228.GetChildNodeByDCType(rootElement, "style_bkimg");
                if (styleElement2 == null) {
                    styleElement2 = document.createElement("style");
                    styleElement2.setAttribute("dctype", "style_bkimg");
                    rootElement.insertBefore(styleElement2, rootElement.firstChild);
                }
                styleElement2.innerText = "." + rootElement.__BKImgStyleName + "{background-repeat:no-repeat;background-image:url(" + tempElement.toDataURL("image/png") + ")}";
            };
            drawer.AddToTask();
        }
        else if (styleElement != null) {
            rootElement.removeChild(styleElement);
        }
    },


    /**
     * 绘制可逆图形
     * @param {string} containerID 容器元素编号
     * @param {number} intPageIndex 页码
     * @param {number} intX1  区域坐标
     * @param {number} intY1 区域坐标
     * @param {number} intX2 区域坐标
     * @param {number} intY2 区域坐标
     * @param {number} intType 图形类型
     */
    ReversibleDraw: function (containerID, intPageIndex, intX1, intY1, intX2, intY2, intType) {
        var pageElement = WriterControl_Paint.GetCanvasElementByPageIndex(containerID, intPageIndex);
        if (pageElement != null) {
            intX1 = intX1 + pageElement.offsetLeft;
            intY1 = intY1 + pageElement.offsetTop;
            intX2 = intX2 + pageElement.offsetLeft;
            intY2 = intY2 + pageElement.offsetTop;
            var div = WriterControl_Paint.GetReversibleDiv(containerID);
            if (div.parentNode != pageElement.parentNode) {
                pageElement.parentNode.appendChild(div);
            }
            div.__PageElement = pageElement;
            //div.__EventCancel = function () {
            //    DCTools20221228.GetOwnerWriterControl(containerID).invokeMethod("FinishedMouseCapture");
            //};
            div.style.display = "";
            if (intType == 0) { // 直线
                div.style.border = "none";
                div.style.backgroundColor = "rgba( 0 , 0 , 255, 0.6)";
                if (intX1 == intX2) {
                    // 竖线
                    div.style.left = intX1 + "px";
                    div.style.top = intY1 + "px";
                    div.style.width = "3px";
                    div.style.height = (intY2 - intY1) + "px";
                    div.style.cursor = "col-resize";
                }
                else if (intY1 == intY2) {
                    // 横线
                    div.style.left = intX1 + "px";
                    div.style.top = intY1 + "px";
                    div.style.width = (intX2 - intX1) + "px";
                    div.style.height = "3px";
                    div.style.cursor = "row-resize";
                }
                else {
                    // 斜线
                }
            }
            else if (intType == 1) {//矩形边界
                div.style.border = "1px solid blue";
                div.style.backgroundColor = "transparent";
                div.style.left = intX1 + "px";
                div.style.top = intY1 + "px";
                div.style.width = (intX2 - intX1) + "px";
                div.style.height = (intY2 - intY1) + "px";
                div.style.cursor = "nwse-resize";
            }
            else if (intType == 2) {// 椭圆形边界

            }
            else if (intType == 3) { // 矩形区域
                div.style.border = "none";
                div.style.backgroundColor = "rgba( 0 , 0 , 255, 0.6)";
                div.style.left = intX1 + "px";
                div.style.top = intY1 + "px";
                div.style.width = (intX2 - intX1) + "px";
                div.style.height = (intY2 - intY1) + "px";
                div.style.cursor = "nwse-resize";
            }
        }
    },
    /** 关闭可逆图形 */
    CloseReversibleShape: function () {
        var div = WriterControl_Paint.GetReversibleDiv();
        if (div != null) {
            div.__PageElement = null;
            div.style.display = "none";
            div._StartX = -1000;
            div._StartY = -1000;
            div._FinishedCallback = null;
        }
    },
    /** 判断是否正在绘制可逆图形
     * @returns {boolean} 是否正在绘制可逆图形
     * */
    IsDrawingReversibleShape: function () {
        var div = document.getElementById("divReversible20230104");
        return div != null && div.style.display != "none";
    },
    GetReversibleDiv: function () {
        var div = document.getElementById("divReversible20230104");
        if (div == null) {
            div = document.createElement("DIV");
            div.id = "divReversible20230104";
            div.style.border = "1px solid black";
            div.style.backgroundColor = "rgba(0,0,255,0.8)";
            div.style.position = "absolute";
            div.style.zIndex = 100000;
            div.style.display = "none";
            document.body.appendChild(div);
            var funcMouseEvent = function (e) {
                var page = this.__PageElement;
                if (page != null && page.parentNode.parentNode.__DCWriterReference != null) {
                    page.parentNode.parentNode.__DCWriterReference.invokeMethod(
                        "EditorHandleMouseEvent",
                        page.PageIndex,
                        e.type,
                        e.altKey,
                        e.shiftKey,
                        e.ctrlKey,
                        e.offsetX + this.offsetLeft - page.offsetLeft,
                        e.offsetY + this.offsetTop - page.offsetTop,
                        e.buttons,
                        e.detail);
                }
            };
            div.addEventListener('mousemove', funcMouseEvent);
            div.addEventListener('mouseup', funcMouseEvent);
        }


        //if (containerID != null && containerID.length > 0) {
        //    var ce = document.getElementById(containerID);
        //    if (ce != null) {
        //        if (div.parentNode != ce) {
        //            ce.appendChild(div);
        //        }
        //    }
        //}
        return div;
    },
    /**
     * 处理视图滚动事件
     * @param {string} containerID 容器元素编号
     */
    HandleScrollView: function (containerID, allowDrawAll) {
        //console.log(containerID)
        if (containerID == null) {
            return;
        }
        var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
        if (rootElement == null) {
            return;
        }
        var isWriterPrintPreviewControlForWASM = rootElement.getAttribute("dctype") == "WriterPrintPreviewControlForWASM";
        //var pageContainer = rootElement;
        //if (DCTools20221228.GetChildNodeByDCType(rootElement, "hrule") != null) {
        //    pageContainer = WriterControl_UI.GetPageContainer(rootElement);
        //}
        ////获取元素的高度
        //var winHeight = pageContainer.clientHeight;
        ////获取元素到浏览器窗口的距离
        //var scrolltop = pageContainer.scrollTop;
        var canvas = WriterControl_UI.GetPageCanvasElements(rootElement);
        if (canvas != null && canvas.length > 0) {
            for (var pageIndex = 0; pageIndex < canvas.length; pageIndex++) {
                var element = canvas[pageIndex];
                //获取元素到浏览器窗口的距离
                //var oTop = element.offsetTop;
                //判断是否在可是区域中
                if (DCTools20221228.IsInVisibleArea(element) == true) {
                    if (element._isRendered != true) {
                        //var tickLoad = new Date().valueOf();
                        //tickLoad = new Date().valueOf() - tickLoad;
                        //var tickRender = new Date().valueOf();
                        if (isWriterPrintPreviewControlForWASM == true ) {
                            // 打印预览控件
                            WriterControl_Print.InnerDrawOnePage(element, true);
                            element._isRendered = true;
                        }
                        else {
                            var drawer = new PageContentDrawer(element);
                            drawer.TypeName = "DrawPageForHandleScrollView";
                            drawer.PageIndex = pageIndex;
                            drawer.AllowClip = true;
                            if (element._NeedClear == true) {
                                element._NeedClear = false;
                                drawer.SetClearRectangle(0, 0, element.width, element.height);
                            }
                            //else {
                            //    drawer.SetClearRectangle(0, 0, 200, 200);
                            //}
                            drawer.CanEatTask = function (otherTask) {
                                if (this.TypeName == otherTask.TypeName
                                    && this.CanvasElement == otherTask.CanvasElement) {
                                    return true;
                                }
                                return false;
                            };
                            drawer.EventQueryCodes = function (drawer2) {
                                var e9 = this.CanvasElement;
                                if (DCTools20221228.IsInVisibleArea(e9) == false) {
                                    // 不在可视区域，不绘制
                                    return null;
                                }
                                e9._isRendered = true;
                                while (e9 != null) {
                                    if (e9.__DCWriterReference != null) {
                                        var strData = e9.__DCWriterReference.invokeMethod(
                                            "RenderPageContent",
                                            drawer2.PageIndex);
                                        return strData;
                                    }
                                    e9 = e9.parentNode;
                                }
                                return null;
                            };
                            drawer.EventAfterDraw = function () {
                                this.CanvasElement._isRendered = true;
                            };
                            drawer.AddToTask();
                        }
                        //tickRender = new Date().valueOf() - tickRender;
                        //console.log("加载图形数据毫秒:" + tickLoad + ",绘图毫秒:" + tickRender);
                    }
                    //else {
                    //    WriterControl_Paint.UpdatePageInvalidateView(element);
                    //}
                }
            }
        }
        if (isWriterPrintPreviewControlForWASM == false) {
            WriterControl_Paint.NeedUpdateView(rootElement, allowDrawAll);
        }
    },

    /**
     * 清空画布对象的内容
     * @param {HTMLCanvasElement} element 画布元素对象
     */
    ClearCanvasElement: function (element) {
        //var ctx = element.getContext("2d");
        if (element._isRendered == true) {
            //ctx.clearRect(0, 0, element.width, element.height);
            element._isRendered = false;
        }
        if (DCTools20221228.IsInVisibleArea(element) == false) {
            var ctx = element.getContext("2d");
            ctx.reset();
        }
        element._NeedClear = true;
        //ctx.font = "20pt 宋体";
        //ctx.fillText("正在加载内容...", 10, 30);
    },
    /**
     * 声明所有的页面内容视图无效，需要全部重新绘制
     * @param {string | HTMLDivElement} containerID 容器元素编号
     */
    InvalidateAllView: function (containerID) {
        var pages = WriterControl_UI.GetPageCanvasElements(containerID);
        if (pages != null) {
            for (var iCount = 0; iCount < pages.length; iCount++) {
                var element = pages[iCount];
                if (element._isRendered == true) {
                    WriterControl_Paint.ClearCanvasElement(element);
                }
            }
            window.setTimeout(WriterControl_Paint.HandleScrollView, 50, containerID ,true );
        }
    },
    /**接到通知需要更新用户界面 */
    NeedUpdateView: function (containerID, allowDrawAll) {
        if (window.__UpdateViewTimer) {
            window.clearTimeout(window.__UpdateViewTimer);
        }
        function TaskUpdateView(bolAllowDrawAll) {
            window.__UpdateViewTimer = null;
            var elements = WriterControl_UI.GetPageCanvasElements(containerID);
            if (elements == null || elements.length == 0) {
                return;
            }
            var drawer = new PageContentDrawer();
            drawer.EventQueryCodes = function () {
                var strPageIndexs = "";
                for (var iCount = 0; iCount < elements.length; iCount++) {
                    var element = elements[iCount];
                    if (DCTools20221228.IsInVisibleArea(element) == true) {
                        strPageIndexs = strPageIndexs + "," + element.PageIndex;
                    }
                }
                var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
                var codes = ctl.__DCWriterReference.invokeMethod("GetInvalidateViewData", strPageIndexs);
                if (codes == null || codes.length == 0) {
                    return null;
                }
                if (codes[0] == 0xfe) {
                    if (bolAllowDrawAll == true) {
                        // 判断出需要重新绘制所有的内容，不在这里进行绘制
                        WriterControl_Task.ClearTask(this.TypeName);
                        WriterControl_Paint.InvalidateAllView(ctl);
                    }
                    return null;
                }
                var reader = new DCBinaryReader(codes);
                if (reader.ReadBoolean()) {
                    // 还有其他区域需要进行绘制
                    this.RootElement = ctl;
                    this.EventAfterDraw = function () {
                        WriterControl_Paint.NeedUpdateView(this.RootElement, true);
                    };
                }

                var vPageIndex = reader.ReadInt16(); // 读取页码
                this.CanvasElement = elements[vPageIndex];
                if (this.CanvasElement == null) {
                    // 页码不对
                    return null;
                }
                var doubleBuffer = reader.ReadBoolean();
                var vLeft = reader.ReadInt32();
                var vTop = reader.ReadInt32();
                var vWidth = reader.ReadInt32();
                var vHeight = reader.ReadInt32();
                if (doubleBuffer) {
                    // 用缓冲区减少闪烁
                    if (ctl.TempElementForDoubleBuffer == null) {
                        ctl.TempElementForDoubleBuffer = document.createElement("CANVAS");
                    }
                    if (this.CanvasElement.computedStyleMap) {
                        var rs = this.CanvasElement.computedStyleMap();
                        ctl.TempElementForDoubleBuffer.style.border = rs.get("border");
                    }
                    this.TempElementForDoubleBuffer = ctl.TempElementForDoubleBuffer;
                    var ctx3 = this.TempElementForDoubleBuffer.getContext("2d");
                    ctx3.clearRect(vLeft, vTop, vWidth, vHeight);
                    this.EnableDoubleBuffer(vLeft, vTop, vWidth, vHeight);
                    this.AllowClip = true;
                }
                else {
                    // 不使用双缓冲
                    this.SetClearRectangle(vLeft, vTop, vWidth, vHeight);
                    this.AllowClip = true;
                }
                return reader;
            };

            drawer.AddToTask();
        }
        window.__UpdateViewTimer = window.setTimeout(TaskUpdateView, 100, allowDrawAll);
    },
    /**
     * 根据页码获得画布对象
     * @param {string} containerID 容器元素编号
     * @param {Number} intPageIndex
     * @returns {HTMLCanvasElement} 画布对象
     */
    GetCanvasElementByPageIndex: function (containerID, intPageIndex) {
        var es = WriterControl_UI.GetPageCanvasElements(containerID);

        if (es != null && es.length > 0 && intPageIndex >= 0) {
            for (var iCount = 0; iCount < es.length; iCount++) {
                if (es[iCount].PageIndex == intPageIndex) {
                    return es[iCount];
                }
            }
            return null;
            //return es[intPageIndex];
        }
        else {
            return null;
        }
    },
    /**
     * 设置元素大小
     * @param {HTMLElement} rootElement 根元素对象
     * @param {HTMLCanvasElement} element 画布元素
     */
    SetPageElementSize: function (rootElement, element) {
        var baseZoomRate = rootElement.__DCWriterReference.invokeMethod("get_WASMBaseZoomRate")
        var zoomRate = rootElement.__DCWriterReference.invokeMethod("get_ZoomRate");
        var w = parseInt(element.getAttribute("native-width"));
        var h = parseInt(element.getAttribute("native-height"));
        element.width = Math.round(w * zoomRate * baseZoomRate);
        element.height = Math.round(h * zoomRate * baseZoomRate);
        var sizeFix = 2;// element.clientLeft * 2;
        if (zoomRate * baseZoomRate == 1) {
            element.style.width = "";
        }
        else {
            element.style.width = (Math.round(w * zoomRate) + sizeFix) + "px";
        }
        //element.style.height = (Math.round(h * zoomRate) + sizeFix) + "px";
    },
    /**
     * 更新页面框架
     * @param {string} containerID 容器元素编号
     * @param {string} strCodes 页面框架的JSON字符串
     */
    UpdatePages: function (containerID, strCodes) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
        if (rootElement == null) {
            throw "未找到元素" + containerID;
            //rootElement = document.body;
        }
        var pageContainer = WriterControl_UI.GetPageContainer(rootElement);
        var elements = WriterControl_UI.GetPageCanvasElements(rootElement);
        var codes = JSON.parse(strCodes);
        var styleElement = document.getElementById("__dcpagecss" + rootElement.id);
        if (styleElement != null) {
            styleElement.parentNode.removeChild(styleElement);
        }
        styleElement = document.createElement("STYLE");
        styleElement.setAttribute("dctype", "pagecss");
        styleElement.id = "__dcpagecss" + rootElement.id;
        styleElement.innerText = " .pagecss" + rootElement.id + "{" + codes[0] + "}";
        codes.shift();
        if (rootElement == document.body) {
            rootElement.appendChild(styleElement);
        }
        else if (rootElement.firstChild != null) {
            rootElement.insertBefore(styleElement, rootElement.firstChild);
        }
        else {
            rootElement.appendChild(styleElement);
        }
        var zoomRate = codes[0];
        codes.shift();
        var targetElementsCount = codes.length;
        if (elements.length > targetElementsCount) {
            // 画布元素过多，删除多余的
            for (var iCount = elements.length - 1; iCount >= targetElementsCount; iCount--) {
                elements[iCount].parentNode.removeChild(elements[iCount]);
            }
        }
        var elementChanged = false;
        var baseZoomRate = window.devicePixelRatio ;
        rootElement.__DCWriterReference.invokeMethod("set_WASMBaseZoomRate", baseZoomRate)
        for (var iCount = 0; iCount < codes.length; iCount++) {
            var pageInfo = codes[iCount];
            if (iCount < elements.length) {
                // 遇到已有的元素
                var element = elements[iCount];
                element.__PageInfo = pageInfo;
                element.PageIndex = pageInfo.PageIndex;
                if (pageInfo.Background == true) {
                    jQuery(element).addClass(rootElement.__BKImgStyleName);
                }
                else {
                    jQuery(element).removeClass(rootElement.__BKImgStyleName);
                }
                if (parseInt(element.getAttribute("native-width")) != pageInfo.Width
                    || parseInt(element.getAttribute("native-height")) != pageInfo.Height) {
                    // 大小发生改变
                    element.setAttribute("native-width", pageInfo.Width);
                    element.setAttribute("native-height", pageInfo.Height);
                    WriterControl_Paint.SetPageElementSize(rootElement, element);
                    //WriterControl_Paint.ClearCanvasElement(element);
                    element._isRendered = false;
                    element._NeedClear = false;
                    elementChanged = true;
                }
            }
            else {
                // 需要新增元素
                var element = document.createElement("CANVAS");
                element.__PageInfo = pageInfo;
                pageContainer.appendChild(element);
                element.PageIndex = pageInfo.PageIndex;
                element.setAttribute("dctype", "page");
                element.setAttribute("UNSELECTABLE", "on");
                element.setAttribute("native-width", pageInfo.Width);
                element.setAttribute("native-height", pageInfo.Height);
                WriterControl_Paint.SetPageElementSize(rootElement,element);
                if (pageInfo.Background == true) {
                    element.className = "pagecss" + rootElement.id + " " + rootElement.__BKImgStyleName;
                }
                else {
                    element.className = "pagecss" + rootElement.id;
                }
                var resizeObserver = new ResizeObserver(entries => {
                    rootElement.CollectrResizeCanvas(entries[0].target);
                })
                resizeObserver.disconnect(element);
                //确保该元素身上只有一个事件监听
                resizeObserver.observe(element);
                var pageCSSString = rootElement.getAttribute("pagecssstring");
                if (pageCSSString != null && pageCSSString.length > 0) {
                    element.setAttribute("style", pageCSSString);
                }
                if (rootElement.IsWriterPrintPreviewControlForWASM == true) {
                    // 为打印预览控件,设置当前页码
                    element.onclick = function () {
                        var ctl = DCTools20221228.GetOwnerWriterControl(this);
                        if (this != ctl.CurrentPageElement) {
                            ctl.__DCWriterReference.invokeMethod("set_PageIndex", this.PageIndex);
                            WriterControl_Rule.InvalidateView(ctl, "hrule");
                            WriterControl_Rule.InvalidateView(ctl, "vrule");
                            if (ctl.CurrentPageElement != null) {
                                ctl.CurrentPageElement.style.borderColor = "";
                            }
                            ctl.CurrentPageElement = this;
                            this.style.borderColor = "blue";
                        }
                    };
                    element.oncontextmenu = function (e) {
                        // 处理快捷菜单事件
                        var re2 = DCTools20221228.GetOwnerWriterControl(this);
                        re2.RaiseEvent(
                            "EventShowContextMenu",
                            {
                                TypeName: "WriterPrintPreviewControlForWASM",
                                PageElement: this,
                                X: e.offsetX,
                                Y: e.offsetY
                            });
                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        return false;
                    };
                }
                else {
                    //设置放大的比例
                    var funcMouseEvent = function (e) {
                        // 处理鼠标事件
                        if (WriterControl_UI.IsDropdownControlVisible() == true) {
                            return;
                        }
                        if (e.type == "click") {
                            // 元素点击事件
                            // 添加点击事件ondocumentclick
                            if (rootElement && rootElement.ondocumentclick && typeof (rootElement.ondocumentclick) == "function") {
                                rootElement.ondocumentclick.call(rootElement, e);
                            }
                        } else if (e.type == "dblclick") {
                            // 添加双击事件ondocumentdblclick
                            if (rootElement && rootElement.ondocumentdblclick && typeof (rootElement.ondocumentdblclick) == "function") {
                                var result = rootElement.ondocumentdblclick.call(rootElement, e);
                                if (result === false || result === 'false' || result === 'False') {
                                    return;
                                }
                            }
                            // 元素双击事件
                            var typename = rootElement.GetCurrentElementTypeName();//当前选择的元素类型名称
                            if (typename == "xtextnewmedicalexpressionelement") {
                                // 医学表达式
                                rootElement.DCExecuteCommand("elementproperties", true);
                            } else if (typename == "xtextimageelement") {
                                let options = rootElement.CurrentElement('xtextimageelement')
                                rootElement.imgEditDialog(options, rootElement);
                            }
                            else {
                                // 修改批注
                                var currentComment = rootElement.GetCurrentComment();
                                if (currentComment) {
                                    if (currentComment.IsInternal === "True") { return }
                                    rootElement.EditDocumentCommentsDialog(currentComment, rootElement);
                                }
                            }
                        } else if (e.type == 'mousedown') {
                            if (rootElement != null && rootElement.ondocumentmousedown != null && typeof rootElement.ondocumentmousedown == 'function') {
                                rootElement.ondocumentmousedown(e)
                            }
                        } else if (e.type == 'mouseup') {
                            if (rootElement != null && rootElement.ondocumentmouseup != null && typeof rootElement.ondocumentmouseup == 'function') {
                                rootElement.ondocumentmouseup(e)
                            }
                        } else if (e.type == 'mousemove') {
                            if (rootElement != null && rootElement.ondocumentmousemove != null && typeof rootElement.ondocumentmousemove == 'function') {
                                rootElement.ondocumentmousemove(e)
                            }
                        }
                        var es2 = WriterControl_UI.GetPageCanvasElements(this.parentNode);
                        for (var pageIndex = 0; pageIndex < es2.length; pageIndex++) {
                            if (es2[pageIndex] == this) {
                                if (rootElement.__DCWriterReference != null) {
                                    rootElement.__DCWriterReference.invokeMethod(
                                        "EditorHandleMouseEvent",
                                        pageIndex,
                                        e.type,
                                        e.altKey,
                                        e.shiftKey,
                                        e.ctrlKey,
                                        e.offsetX,
                                        e.offsetY,
                                        e.buttons,
                                        e.detail);
                                }
                                e.stopPropagation();
                                e.preventDefault();
                                e.returnValue = false;
                                break;
                            }
                        }
                    };
                    element.onmousedown = funcMouseEvent;
                    element.onmousemove = funcMouseEvent;
                    element.onmouseup = funcMouseEvent;
                    element.onclick = funcMouseEvent;
                    element.ondblclick = funcMouseEvent;
                    element.oncontextmenu = function (e) {
                        // 处理快捷菜单事件
                        var re2 = DCTools20221228.GetOwnerWriterControl(this);
                        var typeName = re2.__DCWriterReference.invokeMethod("GetContextMenuTypeName");
                        if (typeName != null && typeName.length > 0) {
                            re2.RaiseEvent(
                                "EventShowContextMenu",
                                {
                                    TypeName: "快捷菜单信息",
                                    PageElement: this,
                                    ElementType: typeName,
                                    X: e.offsetX,
                                    Y: e.offsetY
                                });
                            e.stopPropagation();
                            e.preventDefault();
                            e.returnValue = false;
                        }
                        return false;
                    };
                    var funcDrag = function (e) {
                        // 处理鼠标拖拽事件
                        if (WriterControl_UI.IsDropdownControlVisible() == true) {
                            return;
                        }
                        var es2 = WriterControl_UI.GetPageCanvasElements(this.parentNode);
                        for (var pageIndex = 0; pageIndex < es2.length; pageIndex++) {
                            if (es2[pageIndex] == this) {
                                if (rootElement.__DCWriterReference != null) {
                                    var srcDatas = e.dataTransfer;
                                    //console.log(srcDatas);
                                    if (srcDatas != null) {
                                        var listData = [];
                                        //解析数据分解成字符串数组
                                        if (srcDatas.types != null && srcDatas.types.length > 0) {
                                            //存在文件信息
                                            if (srcDatas.files.length > 0) {
                                                Promise.all(function* () {
                                                    for (const file of srcDatas.files) {
                                                        yield new Promise(resolve => {
                                                            var reader = new FileReader();
                                                            reader.readAsDataURL(file);
                                                            reader.type = file.type;
                                                            reader.onload = function (e) {
                                                                resolve(this);
                                                            }
                                                        })
                                                    }
                                                }()).then(results => {
                                                    results.forEach(data => {
                                                        listData.push(data.type, data.result);
                                                    })
                                                    if (listData.length > 0) {
                                                        console.log(listData);
                                                        var bolResult = rootElement.__DCWriterReference.invokeMethod(
                                                            "EditorHandleDragEvent",
                                                            listData,
                                                            pageIndex,
                                                            e.type,
                                                            e.altKey,
                                                            e.shiftKey,
                                                            e.ctrlKey,
                                                            e.offsetX,
                                                            e.offsetY);
                                                    }
                                                    return;
                                                });
                                            } else {
                                                for (const type of srcDatas.types) {
                                                    //根据剪切板中的数据类型解析数据
                                                    var clipboardData = srcDatas.getData(type);
                                                    listData.push(type);
                                                    listData.push(clipboardData);
                                                }
                                                var bolResult = rootElement.__DCWriterReference.invokeMethod(
                                                    "EditorHandleDragEvent",
                                                    listData,
                                                    pageIndex,
                                                    e.type,
                                                    e.altKey,
                                                    e.shiftKey,
                                                    e.ctrlKey,
                                                    e.offsetX,
                                                    e.offsetY);
                                            }
                                            e.stopPropagation();
                                            e.preventDefault();
                                            e.returnValue = false;
                                        }
                                    }
                                }
                                break;
                            }
                        }
                    };
                    element.ondragenter = funcDrag;
                    element.ondragleave = funcDrag;
                    element.ondragover = funcDrag;
                    element.ondrop = funcDrag;
                }
                //WriterControl_Paint.ClearCanvasElement(element);
                element._isRendered = false;
                element._NeedClear = false;
                elementChanged = true;
            }
        }
        if (elementChanged == true) {
            // 更新排版模式
            var strMode = rootElement.getAttribute("pagelayoutmode");
            if (strMode != null) {
                strMode = strMode.trim().toLocaleLowerCase();
                if (strMode == "singlecolumn"
                    || strMode == "multicolumn") {
                    for (var element = pageContainer.firstChild;
                        element != null;
                        element = element.nextSibling) {
                        if (element.nodeName == "CANVAS") {
                            if (strMode == "singlecolumn") {
                                element.style.display = "block";
                            }
                            else {
                                element.style.display = "inline-block";
                            }
                        }
                    }//for
                }
            }
            // 元素发生改变，则需要绘制可见元素
            window.setTimeout(WriterControl_Paint.HandleScrollView, 50, containerID, true);
        }
    }
};