//* 开始时间:
//* 开发者:
//* 重要描述:
//*************************************************************************
//* 最后更新时间: 2023-7-26
//* 最后更新人: xuyiming
//*************************************************************************


"use strict";
import { DCTools20221228 } from "./DCTools20221228.js";
import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { WriterControl_CalculateControl } from "./WriterControl_CalculateControl.js";
import { WriterControl_DateTimeControl } from "./WriterControl_DateTimeControl.js";
import { WriterControl_ListBoxControl } from "./WriterControl_ListBoxControl.js";
import { WriterControl_Rule } from "./WriterControl_Rule.js";
import { WriterControl_Task } from "./WriterControl_Task.js";
import { WriterControl_Event } from "./WriterControl_Event.js";

export let WriterControl_UI = {
    /**
     * 重新加载承载的控件
     * @param {string} strContainerID
     * @param {any} args
     */
    ReloadHostControls: function (strContainerID) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(strContainerID);
        if (rootElement == null) {
            return;
        }
        var task = {
            TypeName: "ReloadHostControls",
            CanEatTask: function (task2) {
                return task2.TypeName == "ReloadHostControls";
            },
            RunTask: function () {
                function UpdatePosition(info, htmlElement) {
                    var page = WriterControl_Paint.GetCanvasElementByPageIndex(rootElement,info.PageIndex);
                    if (page == null) {
                        return;
                    }
                    htmlElement.style.left = (page.offsetLeft + info.Left + 1) + "px";
                    htmlElement.style.top = (page.offsetTop + info.Top + 1) + "px";
                    htmlElement.style.width = info.Width + "px";
                    htmlElement.style.height = info.Height + "px";
                };
                var pageContainer = WriterControl_UI.GetPageContainer(rootElement);
                if (pageContainer == null) {
                    return;
                }
                var infos = rootElement.__DCWriterReference.invokeMethod("GetHostControlInfos");
                for (var nodeIndex = pageContainer.childNodes.length - 1; nodeIndex >= 0; nodeIndex--) {
                    var node = pageContainer.childNodes[nodeIndex];
                    if (node.getAttribute && node.getAttribute("dctype") == "HostControl") {
                        if (infos == null) {
                            node.parentNode.removeChild(node);
                        }
                        else {
                            var bolMatch = false;
                            for (var iCount = infos.length - 1; iCount >= 0; iCount--) {
                                var info = infos[iCount];
                                if (node.__ObjectElementInstanceIndex == info.ObjectElementInstanceIndex) {
                                    // 找到对应的元素
                                    UpdatePosition(info, node);
                                    infos.splice(iCount, 1);
                                    bolMatch = true;
                                    break;
                                }
                            }
                            if (bolMatch == false) {
                                // 没找到匹配的文档元素，则删除
                                node.parentNode.removeChild(node);
                            }
                        }
                    }
                }
                if (infos != null && infos.length > 0) {
                    // 创建新的承载元素
                    for (var iCount = infos.length - 1; iCount >= 0; iCount--) {
                        var info = infos[iCount];
                        var htmlElement = null;
                        if (info.ElementTypeName == "XTextMediaElement") {
                            // 创建视频元素
                            htmlElement = document.createElement("video");
                            htmlElement.setAttribute("dctype", "")
                            htmlElement.style.border = "1px solid black";
                            htmlElement.style.position = "absolute";
                            htmlElement.zIndex = 300;
                            htmlElement.src = info.Parameter;
                            htmlElement.controls = true;
                            htmlElement.loop = true;
                            pageContainer.insertBefore(htmlElement, pageContainer.firstChild);
                        }
                        if (htmlElement != null) {
                            htmlElement.setAttribute("dctype", "HostControl");
                            htmlElement.__ObjectElementInstanceIndex = info.ObjectElementInstanceIndex;
                            UpdatePosition(info, htmlElement);
                        }
                    }
                }
            }
        };
        WriterControl_Task.AddTask(task);
    },
    /**
     * 获得所有的页码数组
     * @param {string | HTMLElement} strContainerID 编辑器控件对象
     * @returns {Array} 页码数组
     */
    GetAllPageIndexs: function (strContainerID) {
        var pages = WriterControl_UI.GetPageCanvasElements(strContainerID);
        if (pages != null) {
            var result = new Array(pages.length);
            for (var iCount = 0; iCount < pages.length; iCount++) {
                result[iCount] = pages[iCount].PageIndex;
            }
            return result;
        }
        return [];
    },
    /**
     * 滚动视图到指定页
     * @param {string} strContainerID 编辑器编号
     * @param {number} intPageIndex 指定的从0开始的页码
     * @returns {boolean} 操作是否滚动了视图
     */
    MoveToPage: function (strContainerID, intPageIndex, bolUseClick) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(strContainerID);
        if (rootElement == null) {
            return null;
        }
        intPageIndex = parseInt(intPageIndex);
        var pages = WriterControl_UI.GetPageCanvasElements(rootElement);
        if (pages != null && intPageIndex >= 0) {
            for (var iCount = 0; iCount < pages.length; iCount++) {
                var page = pages[iCount];
                if (page.PageIndex == intPageIndex) {
                    var c = page.offsetParent;
                    c.scrollTo({ left: page.offsetLeft, top: page.offsetTop, behavior: "smooth" });
                    if (bolUseClick == true) {
                        page.click();
                    }
                    //page.scrollIntoView(true);
                    return true;
                }
            }
            return true;
        }
        return false;
    },
    /**
    * 设置缩放比率
    * @param {number} newZoomRate 新的缩放比率，必须在0.1到5之间
    * @returns {boolean} 操作是否修改缩放比率
    */
    EditorSetZoomRate: function (rootElement, newZoomRate) {
        if (WriterControl_UI.__RaisingEventZoomChanged == true) {
            // 避免递归调用
            return;
        }
        newZoomRate = Number(newZoomRate);
        var oldZoomRate = rootElement.__DCWriterReference.invokeMethod("get_ZoomRate");
        var newZoomRate = rootElement.__DCWriterReference.invokeMethod(
            "SetViewZoomRate",
            newZoomRate);
        if (newZoomRate != oldZoomRate) {
            if (rootElement.FunctionHandle_OnScroll) {
                window.clearTimeout(rootElement.FunctionHandle_OnScroll);
                delete rootElement.FunctionHandle_OnScroll
            }
            WriterControl_Task.ClearTask();
            var elements = WriterControl_UI.GetPageCanvasElements(rootElement);
            for (var iCount = 0; iCount < elements.length; iCount++) {
                var element = elements[iCount];
                WriterControl_Paint.SetPageElementSize(rootElement, element);
                element._isRendered = false;
                //var ctx = element.getContext("2d");
                //ctx.clearRect(0, 0, element.width, element.height);
            }
            rootElement.FunctionHandle_OnScroll = window.setTimeout(
                WriterControl_Paint.HandleScrollView, 50, rootElement);
            rootElement.__DCWriterReference.invokeMethod("UpdateTextCaretWithoutScroll");
            WriterControl_Paint.UpdateViewForWaterMark(rootElement);
            WriterControl_Rule.InvalidateAllView(rootElement);
            WriterControl_UI.ReloadHostControls(rootElement);
            // 触发事件
            WriterControl_UI.__RaisingEventZoomChanged = true;
            WriterControl_Event.RaiseControlEvent(
                rootElement,
                "EventZoomChanged",
                {
                    OldZoomRate: oldZoomRate,
                    ZoomRate: newZoomRate
                });
            WriterControl_UI.__RaisingEventZoomChanged = false;
            return true;
        }
        return false;
    },

    /** 根据界面大小来缩放编辑器
    * @param {node} rootElement 编辑器元素
    * @return {boolean} 是否成功缩放
    */
    EditorSetWriterAutoZoom: function (rootElement) {
        if (!rootElement || typeof (rootElement.SetZoomRate) != "function") {
            return false;
        }
        var IsPrintPreview = rootElement.IsPrintPreview();//是否是打印预览模式
        var SelectStr = IsPrintPreview ? "[dctype='page-printpreview']" : "[dctype='page-container']";
        // 正文元素
        var PageDiv = rootElement.querySelector(SelectStr);
        if (!PageDiv) {
            return false;
        }
        // 让滚动条显示
        PageDiv.style.overflow = "scroll";
        // 第一个页面canvas元素
        var canvasNode = PageDiv.querySelector('canvas[dctype="page"]');
        if (!canvasNode) {
            return false;
        }
        // 获取canvas元素所有样式
        var canvasStyles = GetNodeStyles(canvasNode);
        // canvas元素宽度
        var canvasWidth = canvasNode.clientWidth;
        // 防止页面开始就有缩放，所以获取原本的宽度
        if (canvasNode.hasAttribute("native-width")) {
            canvasWidth = ChangeIntoNumber(canvasNode.getAttribute("native-width"));
        }
        // 添加边框左右宽度
        canvasWidth += ChangeIntoNumber(canvasStyles.borderLeftWidth) + ChangeIntoNumber(canvasStyles.borderRightWidth);
        // 添加外边距左右宽度
        canvasWidth += ChangeIntoNumber(canvasStyles.marginLeft) + ChangeIntoNumber(canvasStyles.marginRight);
        // 缩放的比例
        var zoomNumber = PageDiv.clientWidth / canvasWidth;
        // 是否需要处理缩放比例小数位
        zoomNumber = parseInt(zoomNumber * 100) / 100;// 取小数点后面两位
        // zoomNumber = ChangeIntoNumber(zoomNumber.toFixed(5));
        // 开始缩放
        var SetZoomRateResult = WriterControl_UI.EditorSetZoomRate(rootElement, zoomNumber);
        // 还原之前的样式
        PageDiv.style.overflow = "auto";

        // 返回缩放结构
        return SetZoomRateResult;

        /** 获取元素所有的样式对象
        * @param {node} node 元素
        * @return {object} 元素样式对象
        */
        function GetNodeStyles(node) {
            // 兼容IE和火狐谷歌等的写法
            var computedStyle = {};
            if (window.getComputedStyle) {
                computedStyle = getComputedStyle(node, null)
            } else {
                computedStyle = node.currentStyle;//兼容IE的写法
            }
            return computedStyle;
        }

        /** 将内容变成数值类型
        * @param {*} str 需要转化的内容
        * @return {number} NUMBER 数值
        */
        function ChangeIntoNumber(str) {
            var NUMBER = str;
            if (typeof (str) != "number") {
                NUMBER = parseFloat(str);
            }
            if (isNaN(NUMBER) == true) {
                NUMBER = 0;
            }
            return NUMBER;
        }
    },


    /**设置页面排版模式,可以为SingleColumn,MultiColumn,Horizontal
     * @param {string} strMode 排版类型，可以为SingleColumn,MultiColumn,Horizontal。
     */
    EditorSetPageLayoutMode: function (rootElement, strMode) {
        if (strMode == null || strMode.length == 0) {
            strMode = "MultiColumn";
        }
        rootElement.setAttribute("pagelayoutmode", strMode);
        var pages = WriterControl_UI.GetPageContainer(rootElement);
        if (pages != null) {
            strMode = strMode.trim().toLocaleLowerCase();
            if (strMode == "horizontal") {
                pages.style.whiteSpace = "nowrap";
                pages.style.textAlign = "";
                var clientHeight = pages.clientHeight;
                var maxHeight = 0;
                for (var element = pages.firstChild;
                    element != null;
                    element = element.nextSibling) {
                    if (element.nodeName == "CANVAS") {
                        element.style.display = "inline-block";
                        var nh = parseInt(element.getAttribute("native-height"));
                        if (nh > maxHeight) {
                            maxHeight = nh;
                        }
                    }
                }
                var zoomRate = (pages.offsetHeight - 35) / (maxHeight + 4);
                rootElement.SetZoomRate(zoomRate);
            }
            else {
                pages.style.whiteSpace = "";
                pages.style.textAlign = "center";
                for (var element = pages.firstChild;
                    element != null;
                    element = element.nextSibling) {
                    if (element.nodeName == "CANVAS") {
                        if (strMode == "singlecolumn") {
                            element.style.display = "block";
                            element.style.margin = "5px auto";
                        }
                        else {
                            element.style.display = "inline-block";
                            element.style.margin = "5px 5px";
                        }
                    }
                }//for
            }
            WriterControl_Paint.HandleScrollView(rootElement);
            window.setTimeout(function () {
                rootElement.__DCWriterReference.invokeMethod("UpdateTextCaretWithoutScroll");
            }, 50);
        }
    },


    /**
     * 触发更新工具条按钮状态事件
     * @param {string | HTMLElement} containerID 控件对象
     */
    RaiseEventUpdateToolarState: function (containerID) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);// DCTools20221228.GetOwnerWriterControl(containerID);
        if (rootElement != null) {
            var task = {
                TypeName: "ToolBoxButtonState",
                Priority: 100,// 优先级很低的
                WaitingTime: 500,// 需要等待500毫秒才执行任务
                // 判断能否吞并其他任务
                CanEatTask: function (otherTask) {
                    if (otherTask.TypeName == "ToolBoxButtonState") {
                        return true;
                    }
                },
                // 执行任务
                RunTask: function (thisTask) {
                    try {
                        rootElement.RaiseEvent("EventUpdateToolarState");
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            };
            WriterControl_Task.AddTask(task);
        }
    },
    /**
     * 获得指定编号的容器元素下的所有的画布元素
     * @param {string} containerElementID 容器元素编号
     * @returns {Array} 画布元素列表
     */
    GetPageCanvasElements: function (containerElementID) {
        var pageContainer = WriterControl_UI.GetPageContainer(containerElementID);
        if (pageContainer != null) {
            var node = pageContainer.firstChild;
            var result = new Array();
            while (node != null) {
                if (node.nodeName == "CANVAS" && node.getAttribute("dctype") == "page") {
                    result.push(node);
                }
                node = node.nextSibling;
            }
            return result;
        }
        return null;
        //throw "未找到指定容器元素:GetPageCanvasElements";
    },

    /**
     * 获得页面元素容器对象
     * @param {string | HTMLElement} rootID 根节点名称
     * @returns { HTMLDivElement} 容器元素对象
     */
    GetPageContainer: function (rootID) {
        if (rootID != null && rootID.getAttribute) {
            if (rootID.getAttribute("dctype") == "page-container") {
                return rootID;
            }
            else if (rootID.getAttribute("dctype") == "page") {
                return rootID.parentNode;
            }
        }
        var rootElement = DCTools20221228.GetOwnerWriterControl(rootID);// DCTools20221228.GetOwnerWriterControl(rootID);
        if (rootElement == null) {
            return null;
        }

        var div = DCTools20221228.GetChildNodeByDCType(rootElement, "page-container");
        if (div == null) {
            div = document.createElement("DIV");
            div.setAttribute("dctype", "page-container");
            div.style.setProperty('position', 'relative', 'important');
            div.style.textAlign = 'center';
            div.style.height = "100%";
            div.style.overflow = "auto";
            rootElement.appendChild(div);
            div.onwheel = function (e) {
                if (div.style.whiteSpace != null
                    && div.style.whiteSpace.toLocaleLowerCase() == "nowrap"
                    && e.ctrlKey == false) {
                    // X,Y滚动量置换
                    div.scrollBy(e.deltaY, e.deltaX);
                    e.stopPropagation();
                    e.preventDefault();
                }
            };
            div.onscroll = function () {
                WriterControl_Paint.HandleScrollView(rootElement);
                WriterControl_Rule.HandleViewScroll(this);

                var dropdown = rootElement.querySelector('#divDropdownContainer20230111');
                //var caret = rootElement.querySelector('#divCaret20221213')
                //当rootElement尺寸发生改变时.关闭下拉
                if (dropdown != null) {
                    dropdown.CloseDropdown();
                }
                //if (caret != null) {
                //    caret.style.display = 'none';
                //    clearInterval(caret.handleTimer)
                //}
            };
            div.onresize = function () {
                WriterControl_Rule.HandleViewScroll(this);

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
            };
        }
        return div;
    },

    /**判断是否正在显示下拉列表,本函数被DCWriterClass.IsDropdownControlVisible()调用
     * @returns {boolean} 是否正在显示下拉列表
     */
    IsDropdownControlVisible: function () {
        var div = document.getElementById("divDropdownContainer20230111");
        return div != null && div.style.display != "none";
    },
    /**关闭下拉列表,本函数被DCWriterClass.CloseDropdownControl()调用 */
    CloseDropdownControl: function () {
        var div = document.getElementById("divDropdownContainer20230111");
        if (div != null && div.style.display != "none") {
            div.CloseDropdown();
        }
    },
    /**
     * 获得下拉列表容器元素
     * @param {string} containerID 容器元素编号
     * @param {number} intPageIndex 页码
     * @param {number} intLeft 在页面元素的坐标  离元素所在canvas左边的高度，非编辑器左边的高度
     * @param {number} intTop 在页面元素的坐标   离元素所在canvas顶部的高度，非编辑器顶部的高度
     * @param {number} intHeight 相关的文档元素的高度   目标输入域的高度，非文档的高度
     * @param {boolean} autoCreate 若不存在是否自动创建元素
     * @returns {HTMLDivElement} 获得的容器元素对象
     */
    GetDropdownContainer: function (containerID, intPageIndex, intLeft, intTop, intHeight, autoCreate) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(containerID).querySelector('[dctype=page-container]');
        var pageElement = WriterControl_Paint.GetCanvasElementByPageIndex(containerID, intPageIndex);
        if (pageElement == null) {
            throw "未找到页面元素";
        }
        var div = document.getElementById("divDropdownContainer20230111");
        if (div == null) {
            if (autoCreate == false) {
                //  不允许自动创建，则退出
                return null;
            }
            var cssText = `#divDropdownContainer20230111::-webkit-scrollbar{ width:8px}
                           #divDropdownContainer20230111::-webkit-scrollbar-track{ background-color: #ddd; }
                           #divDropdownContainer20230111::-webkit-scrollbar-thumb{background-color:#999;}
                           #divDropdownContainer20230111 .listBoxContainer::-webkit-scrollbar{ width:8px}
                           #divDropdownContainer20230111 .listBoxContainer::-webkit-scrollbar-track{ background-color: #ddd; }
                           #divDropdownContainer20230111 .listBoxContainer::-webkit-scrollbar-thumb{background-color:#999;}`
            WriterControl_UI.CustomCSSString(cssText);
            div = document.createElement("DIV");
            //判断是存在
            div.id = "divDropdownContainer20230111";
            //div.style.border = "2px solid black";
            //div.style.backgroundColor ="#dddddd";
            //zhangbin 20230423 修改下拉框的样式
            div.style.borderRadius = "10px";
            div.style.position = "absolute";
            div.style.display = "none";
            div.style.minWidth = "100px";
            div.style.maxHeight = "250px";
            div.style.overflowY = 'auto';
            div.style.userSelect = 'none';
            div.style.boxShadow = '0 2px 8px 2px rgba(68, 73, 77, 0.16)';
            div.style.backgroundColor = "#fff";
            //div.style.width = "200px";
            //div.style.height = "200px";
            //rootelement在tab页切换的时候可能出现不准确的问题，在此处重新再获取一遍rootElement
            div.ShowDropdown = function () {
                var pageElement = DCTools20221228.GetOwnerWriterControl(div.checkPageContainerID).querySelector('[dctype=page-container]');
                //console.log('ShowDropdown');
                //为了防止移动端展示不全此时处理left的展示位置
                div.style.left = (div.__PageElement.offsetLeft + div.__Left + pageElement.offsetLeft - pageElement.scrollLeft) + "px";
                //div.style.top = (div.__PageElement.offsetTop + div.__Top + div.__Height + 6) + "px";
                div.style.zIndex = 100001;
                div.style.display = "";
                //判断元素到页面底部的距离
                //计算右侧是否会被遮挡
                var needChangeLeft = pageElement.offsetWidth - parseFloat(div.style.left) - div.clientWidth;
                if (needChangeLeft <= 0) {
                    div.style.left = parseFloat(div.style.left) + needChangeLeft + 'px';
                }
                //目标位置
                var targetTopPosition = (div.__PageElement.offsetTop - pageElement.scrollTop + div.__Top + pageElement.offsetTop + 25);
                //距离编辑器底部的位置，判断底部是否能放下下拉
                var downGap = document.body.clientHeight - targetTopPosition;
                //如果能放下
                if (downGap >= div.offsetHeight) {
                    //div.style.top = (div.__Top - pageElement.scrollTop + pageElement.offsetTop + div.__Height + 12) + "px";
                    div.style.top = targetTopPosition + "px";
                    //如果不能放下
                } else if (downGap < div.offsetHeight) {
                    //判断距离编辑器头部是否留有大小
                    var upGap = targetTopPosition - div.__Height - 10;
                    //可以放下
                    if (upGap >= div.offsetHeight) {
                        div.style.top = upGap - div.offsetHeight + 'px';
                    } else {
                        //如果两边都放不下,则判断哪边间距大放在哪边
                        if (downGap > upGap) {
                            div.style.top = targetTopPosition + "px";
                        } else {
                            div.style.top = upGap - div.offsetHeight + 'px';
                        }
                    }
                }
                // 添加输入域展开下拉时事件DropdownControlPress
                var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
                if (ctl && ctl.DropdownControlPress && typeof (ctl.DropdownControlPress) == "function") {
                    ctl.DropdownControlPress.call(ctl, ctl.GetElementProperties(ctl.CurrentInputField()), div);
                }
            };
            div.CloseDropdown = function () {
                //清空内部的数据
                div.innerHTML = '';
                //div.style.removeProperty('max-height');
                //div.style.removeProperty('min-width');
                //div.style.removeProperty('overflow-y');
                //div.style.removeProperty('height');
                //div.style.removeProperty('width');
                div.style.display = "none";
                // 触发 EventCloseDropdown 事件
                var fc = div.EventCloseDropdown;
                div.EventCloseDropdown = null;
                if (typeof (fc) == "function") {
                    fc.call(div, div);
                }
            };
            div.onmousedown = function (e) {
                e.cancelBubble = true;
            };
        }
        else {
            // 清空已有内容
            while (div.firstChild != null) {
                div.removeChild(div.firstChild);
            }
        }
        div.checkPageContainerID = containerID;
        div.__PageElement = pageElement;
        div.__Left = intLeft;
        div.__Top = intTop;
        div.__Height = intHeight;
        if (div.parentNode != rootElement.parentNode) {
            rootElement.parentNode.appendChild(div);
        }
        return div;
    },

    /**
     * 对页面添加一些自定义的样式
     * */
    CustomCSSString: function (newText) {
        var dcHead = document.head;
        //判断是否存在此css样式
        var hasCustomCss = dcHead.querySelector('#DCCustomCSSString');
        var cssText = '';
        if (hasCustomCss != null) {
            cssText = hasCustomCss.innerText;
        } else {
            //创建样式
            hasCustomCss = document.createElement('style');
            hasCustomCss.setAttribute('id', 'DCCustomCSSString');
            dcHead.appendChild(hasCustomCss);
        }
        cssText += newText;
        hasCustomCss.innerHTML = cssText;

    },
    /**
     * 显示快捷辅助录入下拉列表
     * @param {string} containerID 编辑器元素编号
     * @param {number} intPageIndex
     * @param {number} intLeft
     * @param {number} intTop
     * @param {number} intHeight
     * @param {string} strPretext 前置文本
     * @param {string} strContainerElementID 容器文档元素编号
     * @param {string} strContainerElementName 容器文档元素名称
     * @param {any} containerElementRef 容器元素引用对象
     * @param {number} stateVersion 状态版本号
     */
    ShowAssistListBoxControl: function (
        containerID,
        intPageIndex,
        intLeft,
        intTop,
        intHeight,
        strPreText,
        strContainerElementID,
        strContainerElementName,
        containerElementRef,
        stateVersion) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
        if (WriterControl_Event.HasControlEvent(rootElement, "EventQueryAssistInputItems") == false) {
            // 没有查询列表项目的事件，则不处理。
            WriterControl_UI.CloseDropdownControl();
        }

        function funcInnerShowAssitListBoxControl(lstItems) {
            // 数据为空时不弹出列表
            if (lstItems == null || lstItems.length == 0) {
                WriterControl_UI.CloseDropdownControl();
                return;
            }
            // 查询到快捷辅助录入的列表信息,弹出列表
            var divContainer = WriterControl_UI.GetDropdownContainer(
                containerID,
                intPageIndex,
                intLeft,
                intTop,
                intHeight,
                true);
            if (divContainer == null) {
                return;
            }
            // 辅助录入项的点击事件
            var AssistListCallBack = function (strNewText) {
                WriterControl_UI.CloseDropdownControl();
                rootElement.__DCWriterReference.invokeMethod(
                    "ApplyAssistStringContent",
                    stateVersion,
                    strNewText);
            };
            var listBox = WriterControl_ListBoxControl.CreateListBoxControl(lstItems, AssistListCallBack, null, null);
            // 此处将 args4.Items中的内容填充到列表中，并调整大小
            divContainer.appendChild(listBox);
            // 对话框展示
            divContainer.ShowDropdown();
            // 对话框样式
            divContainer.style.minWidth = "200px";
            divContainer.style.height = "300px";
        };
        var editorStateVersion = rootElement.__DCWriterReference.invokeMethod("GetEditStateVersion");
        // 存在快捷辅助录入事件,则创建参数对象并触发事件
        var args4 = {
            PreWord: strPreText,
            Async: false,
            Cancel: false,
            Handled: false,
            Items: new Array(),
            ContainerElementID: strContainerElementID,
            ContainerElementName: strContainerElementName,
            GetItem: function (index) { return this.Items[index]; },
            AddItem: function (newItem) { this.Items.push(newItem); },
            /** 填充列表数据的操作执行完毕，可以弹出列表了*/
            Complete: function () {
                // 下拉列表数据填充完毕后的事件处理
                if (args4.Items != null
                    && args4.Items.length > 0
                    && editorStateVersion == rootElement.__DCWriterReference.invokeMethod("GetEditStateVersion")) {
                    // 编辑器的状态未改变，则弹出用户界面
                    funcInnerShowAssitListBoxControl(args4.Items);
                } else {
                    // 快捷辅助录入没有列表时，关闭下拉
                    WriterControl_UI.CloseDropdownControl();
                }
            }
        };
        // 使用定时器来进行隔离，避免JS错误导致WASM错误。
        window.setTimeout(function () {
            WriterControl_Event.RaiseControlEvent(rootElement, "EventQueryAssistInputItems", args4);
            if (args4.Async == true) {
                // 异步操作
                return;
            }
            else {
                if (args4.Items != null && args4.Items.length > 0) {
                    funcInnerShowAssitListBoxControl(args4.Items);
                } else {
                    WriterControl_UI.CloseDropdownControl();
                }
            }
        }, 1);
    },
    /**
     * 开始使用列表控件来编辑输入域的值
     * @param {string} containerID 编辑器编号
     * @param {number} intPageIndex 页码
     * @param {number} intLeft 文档元素坐标
     * @param {number} intTop 文档元素坐标
     * @param {number} intHeight 文档元素高度
     * @param {Array} listItems 下拉列表项目，为DCSoft.Writer.Data.ListItemCollection的JSON模式
     * @param {any} args 参数
     */
    BeginEditValueUseListBoxControl: function (
        containerID,
        intPageIndex,
        intLeft,
        intTop,
        intHeight,
        listItems,
        args) {
        var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
        args.Handled = false;
        args.Cancel = false;
        if (listItems == null) {
            listItems = new Array();
        }
        args.Items = listItems;
        args.AddResultItem = function (item) {
            args.Items.push(item);
        };
        args.AddResultItemByTextValue = function (strText, strValue) {
            args.Items.push({ Text: strText, Value: strValue });
        };
        args.AddResultItemByTextValueTextInList = function (strText, strValue, strTextInList) {
            args.Items.push({ Text: strText, Value: strValue, TextInList: strTextInList });
        };
        args.WriterControl = ctl;

        //添加判断,在此处处理是否为动态下拉
        var currentInput = ctl.GetElementProperties(ctl.CurrentInputField());

        function InnerShowListBoxControl() {
            var divContainer = WriterControl_UI.GetDropdownContainer(containerID, intPageIndex, intLeft, intTop, intHeight, true);
            if (divContainer == null) {
                return;
            }

            var callBack = function (strNewText, strNewInnerValue) {
                if (strNewInnerValue != args.OldValue || strNewText != args.OldText) {
                    var ctlRef = DCTools20221228.GetDCWriterReference(containerID);
                    if (ctlRef != null) {
                        // 用户确认操作后执行函数
                        ctlRef.invokeMethod("ApplyCurrentEditorCallBack", strNewText, strNewInnerValue);
                    }
                }
                divContainer.CloseDropdown();
            }
            //不知道fieldSettings的作用.暂不处理
            var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
            //判断是否为多选,此处判断是否为多选在处理下拉是因为保证在页面能显示出东西
            if (currentInput != null && (currentInput.InnerMultiSelect === true || currentInput.InnerMultiSelect == 'true')) {
                WriterControl_ListBoxControl.CreateMultiSelectControl(listItems, rootElement, divContainer, args.OldText, args.OldValue, currentInput, args);
            } else {
                WriterControl_ListBoxControl.CreateListBoxControl(listItems, callBack, rootElement, divContainer, args.OldText, args.OldValue, currentInput, args);
            }
        };
        if (args.DynamicListItems == true) {
            // 用户是动态加载下拉列表的，则需要触发事件
            var editorStateVersion = ctl.__DCWriterReference.invokeMethod("GetEditStateVersion");
            args.Completed = function () {
                // 下拉列表数据填充完毕后的事件处理
                if (editorStateVersion == ctl.__DCWriterReference.invokeMethod("GetEditStateVersion")) {
                    // 编辑器的状态未改变，则弹出用户界面
                    InnerShowListBoxControl();
                }
            };
            // 触发编辑器控件的QueryListItems事件，如果是以异步方式加载数据，记得完成后调用args.EventCompleted()
            //var oldLength = args.Items.length;
            args.Async = false;
            args.Cancel = false;
            // 使用定时器来进行隔离，避免JS错误导致WASM错误。
            window.setTimeout(function () {
                WriterControl_Event.InnerRaiseEvent(ctl, "QueryListItems", args);
                if (args.Cancel == true) {
                    // 用户取消操作
                    return;
                }
                if (args.Async == true) {
                    // 用户指定为异步模式，则等待
                    return;
                } else if (args.Items != null) {
                    if (args.Items.length > 0) {
                        // 已经填充了列表内容，则立即显示出来
                        args.Completed = null;
                        InnerShowListBoxControl();
                    } else if (args.Items.length == 0) {
                        // 获取到当前输入域的本身的值
                        if (currentInput.ListItems != null) {
                            listItems = currentInput.ListItems;
                            InnerShowListBoxControl();
                        }
                    }
                    
                }
            }, 1);
        }
        else {
            // 静态下拉列表，直接弹出用户界面
            InnerShowListBoxControl();
        }
    },

    /**
     * 显示数字计算器界面
     * @param {string} containerID 编辑器编号
     * @param {number} intPageIndex 页码
     * @param {number} intLeft 文档元素在页面中的坐标
     * @param {number} intTop 文档元素在页面中的坐标
     * @param {number} intHeight 文档元素高度
     * @param {number} dblInputValue 当前数值
     */
    ShowCalculateControl: function (containerID, intPageIndex, intLeft, intTop, intHeight, dblInputValue) {
        var divContainer = WriterControl_UI.GetDropdownContainer(containerID, intPageIndex, intLeft, intTop, intHeight, true);
        if (divContainer == null) {
            return;
        }
        if (isNaN(dblInputValue)) {
            dblInputValue = 0;
        }
        // 往divContainer列表填内容，设置它的宽度高度
        //点击确认的回调
        var callBack = function (newInputValue) {
            // 用户确认操作后执行函数
            var ctlRef = DCTools20221228.GetDCWriterReference(containerID);
            if (ctlRef != null) {
                ctlRef.invokeMethod("ApplyCurrentEditorCallBack", newInputValue, null);
            }
            divContainer.CloseDropdown();
        }
        //调用创建数字计算器的方法
        var calculateEle = WriterControl_CalculateControl.CreateCalculateControl(dblInputValue, callBack);
        divContainer.appendChild(calculateEle);
        divContainer.style.width = '220px';
        divContainer.style.height = 'auto';
        divContainer.ShowDropdown();
    },

    /**
     * 显示时间日期选择界面
     * @param {string} containerID 元素编号
     * @param {number} intPageIndex 页码
     * @param {number} intLeft 文档元素在页面中的坐标
     * @param {number} intTop 文档元素在页面中的坐标
     * @param {number} intHeight 文档元素高度
     * @param {Date} dtmInputValue 当前数值
     * @param {number} intStyle 显示样式，2=选择日期(不含时分秒)，3=选择精确到秒的时间日期，4=精确到分钟的时间日期，5=时间(不含年月日)
     */
    ShowDateTimeControl: function (containerID, intPageIndex, intLeft, intTop, intHeight, dtmInputValue, intStyle) {
        var divContainer = WriterControl_UI.GetDropdownContainer(containerID, intPageIndex, intLeft, intTop, intHeight, true);
        if (divContainer == null) {
            return;
        }
        var callBack = function (newInputValue) {
            divContainer.CloseDropdown();
            var ctlRef = DCTools20221228.GetDCWriterReference(containerID);
            if (ctlRef != null) {
                ctlRef.invokeMethod("ApplyCurrentEditorCallBack", newInputValue, null);
            }
        }
        // 往divContainer列表填内容，设置它的宽度高度
        WriterControl_DateTimeControl.CreateDateTimeControl(divContainer, dtmInputValue, intStyle, callBack);
        divContainer.style.width = 'auto';
        divContainer.style.maxHeight = '337.73px';
        divContainer.ShowDropdown();
    },
    /**
     * 显示音频或者视频
     * @param {string} strContainerID 编辑器元素编号
     * @param {string} strElementID 文档元素编号
     * @param {string} strSource 音视频来源地址
     * @param {number} intPageIndex 页码
     * @param {number} intLeft 左端位置
     * @param {number} intTop 顶端位置
     * @param {number} intWidth 宽度
     * @param {number} intHeight 高度
     */
    ShowVideoElement: function (strContainerID, strElementID, strSource, intPageIndex, intLeft, intTop, intWidth, intHeight) {
        var targetElement = document.getElementById(strElementID);

    },

    CreateHostControlElement: function (strContainerID, strElementID, intPageIndex, intLeft, intTop, intWidth, intHeight) {
        var pageElement = WriterControl_Paint.GetCanvasElementByPageIndex(strContainerID, intPageIndex);
        if (pageElement == null) {
            return null;
        }
        
    },

    /** 清空系统剪切板 */
    ClearClipboard: function () {
        //这里使用SetClipboardData方法并传入空值
        WriterControl_UI.SetClipboardData(['text/html', '']);
    },

    /**
     * 处理表格复制的问题
     * @param {string} data 粘贴的数据 
     * @param {any} rootElement 
     * @returns
     */
    PasteDataFromTableToTable: function (data, rootElement) {
        if (data != null && data.length > 0) {
            var hasHtml = data.indexOf('text/html');
            if (hasHtml >= 0) {
                var htmlString = data[hasHtml + 1];
                var DCHTML = document.createElement('html');
                DCHTML.innerHTML = htmlString;
                //拿到body
                var hasBody = DCHTML.querySelector('body');
                if (hasBody) {
                    var targetTable = null;
                    //找到子元素
                    if (hasBody.children != null) {
                        if (hasBody.children.length == 1 && hasBody.children[0].nodeName == 'TABLE') {
                            targetTable = hasBody.children[0]
                        } else {
                            //找到表格元素并判断是否唯一且无兄弟元素且父元素的父元素为body
                            var hasTable = hasBody.querySelectorAll('table');
                            if (hasTable != null && hasTable.length == 1) {
                                hasTable = hasTable[0];
                                if (hasTable.nextElementSibling == null && hasTable.previousElementSibling == null) {
                                    targetTable = hasTable;
                                }
                            }
                        }
                    }
                    if (targetTable) {
                        //判断是否存在选中单元格的情况
                        //先拿到数据并拼接成二维数组
                        var dataArr = [];
                        //获取到所有的表格行
                        var allRow = targetTable.rows;
                        for (var row = 0; row < allRow.length; row++) {
                            var targetRow = allRow[row];
                            var rowArr = [];
                            dataArr.push(rowArr);
                            // 获取到所有的单元格
                            var allCell = targetRow.cells;
                            for (var cell = 0; cell < allCell.length; cell++) {
                                var targetCell = allCell[cell];
                                var text = targetCell.textContent;
                                text = text.replace(/ /g, "");
                                text = text.replace(/^\s*|\s*$/g, "");
                                rowArr.push(text);
                            }
                        }
                        if (dataArr.length > 0) {
                            var selectCell = rootElement.GetSelectTableAndCell();
                            if (selectCell.length == 2) {
                                //循环所有的dataArr
                                //找到行列最大值
                                var maxRow = selectCell[1].RowsCount, maxCol = selectCell[1].ColumnsCount, thisRow = selectCell[0].RowIndex, thisCol = selectCell[0].ColIndex;
                                for (var i = 0; i < dataArr.length; i++) {
                                    //找到目标行
                                    if (thisRow + i > maxRow) {
                                        break;
                                    }
                                    for (var j = 0; j < dataArr[i].length; j++) {
                                        if (thisCol + j > maxCol) {
                                            break;
                                        }
                                        rootElement.SetTableCellText(selectCell[1].ID, thisRow + i, thisCol + j, dataArr[i][j]);
                                    }
                                }
                                return false;
                            } else if (selectCell.length > 2) {
                                //存在选中的情况
                                //获取表格
                                var thisRow = selectCell[0].RowIndex, thisCol = selectCell[0].ColIndex;
                                var thisTable = selectCell[selectCell.length - 1];
                                for (var i = 0; i < selectCell.length - 1; i++) {
                                    var setCell = selectCell[i];
                                    var setRowIndex = (setCell.RowIndex - thisRow) % dataArr.length;
                                    var setColIndex = (setCell.ColIndex - thisCol) % dataArr[setRowIndex].length;
                                    rootElement.SetTableCellText(thisTable.ID, setCell.RowIndex, setCell.ColIndex, dataArr[setRowIndex][setColIndex]);
                                }
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    },

    /**获得系统剪切板中所有的内容
     * @returns {Array} 内容组成的数组，偶数位为数据格式的名称，奇数位是数据内容
     * */
    GetClipboardData: async function (e, rootElement) {
        //var rootElement = WriterControl_UI.GetCurrentWriterControl();
        // 触发EventBeforePaste
        function triggerEventBeforePaste(rootElement, dataList) {
            // 添加粘贴拦截事件【EventBeforePaste】
            if (!rootElement || !rootElement.EventBeforePaste) {
                return;
            }
            if (typeof (rootElement.EventBeforePaste) != "function") {
                return;
            }
            var result = rootElement.EventBeforePaste(dataList);
            if (result === false) {
                return false;
            }
        }
        //zhangbin 20230424
        var clipboardData = '';
        var dataList = [];
        var hasDCAttr = false;
        //判断是否为粘贴事件触发
        if (e != null && e.clipboardData != null) {
            for (const type of e.clipboardData.types) {
                //根据剪切板中的数据类型解析数据
                clipboardData = e.clipboardData.getData(type);
                if (type == 'text/html') {
                    var DCAttrHTML = document.createElement('html');
                    DCAttrHTML.innerHTML = clipboardData;
                    var hasBody = DCAttrHTML.querySelector('body');
                    if (hasBody) {
                        var thisDiv = hasBody.querySelector('div[DCAttrClipboardData]');
                        if (thisDiv) {
                            hasDCAttr = true;
                            //thisDiv.remove();
                            var DCAttrClipboardData = thisDiv.getAttribute('DCAttrClipboardData');
                            dataList = JSON.parse(DCAttrClipboardData);
                            //在此处判断是否存在image元素
                            if (Array.isArray(dataList)) {
                                for (var list = 0; list < dataList.length; list += 2) {
                                    if (dataList[list].indexOf('image/') == 0) {
                                        dataList = [dataList[list], dataList[list + 1]];
                                        break;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
                dataList.push(type);
                dataList.push(clipboardData);
            }

            //存在文件信息
            if (!hasDCAttr && e.clipboardData.files.length > 0) {
                Promise.all(function* () {
                    for (const file of e.clipboardData.files) {
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
                        dataList.push(data.type);
                        dataList.push(data.result);
                    })
                    if (triggerEventBeforePaste(rootElement, dataList) == false) {
                        return false;
                    }
                    if (dataList.length > 0) {
                        //调用后台数据
                        var ref9 = rootElement.__DCWriterReference;
                        if (ref9 != null) {
                            ref9.invokeMethod(
                                "DoPaste",
                                dataList);
                        }
                    }
                    return;
                });
            }

            if (triggerEventBeforePaste(rootElement, dataList) == false) {
                return false;
            }
            //如果clipboardData能读取到数据
            if (dataList.length > 0) {
                var needPaste = WriterControl_UI.PasteDataFromTableToTable(dataList, rootElement);
                if (needPaste) {
                    //调用后台数据
                    var ref9 = rootElement.__DCWriterReference;
                    if (ref9 != null) {
                        ref9.invokeMethod(
                            "DoPaste",
                            dataList
                        );
                    }
                }
            }
        } else if (navigator.clipboard && navigator.clipboard.read) {
            const clipboardItems = await navigator.clipboard.read();
            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    const blob = await clipboardItem.getType(type);
                    if (!blob) {
                        continue;
                    } 
                    if (clipboardItem.types.length == 1 && type.indexOf('image/') == 0) {
                        new Promise(resolve => {
                            var reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onload = function (e) {
                                resolve(this);
                            }
                        }).then(result => {
                            dataList.push(type);
                            dataList.push(result.result);
                            if (triggerEventBeforePaste(rootElement, dataList) == false) {
                                return false;
                            }
                            //如果clipboardData能读取到数据
                            if (dataList.length > 0) {
                                var needPaste = WriterControl_UI.PasteDataFromTableToTable(dataList, rootElement);
                                if (needPaste) {
                                    //调用后台数据
                                    var ref9 = rootElement.__DCWriterReference;
                                    if (ref9 != null) {
                                        ref9.invokeMethod(
                                            "DoPaste",
                                            dataList);
                                    }
                                }
                            }
                            return;
                        })
                    } else {
                        clipboardData = await blob.text();
                        if (type == 'text/html') {
                            //获取到保存的数据并解析再次赋值
                            var DCAttrHTML = document.createElement('html');
                            DCAttrHTML.innerHTML = clipboardData;
                            //找到body
                            var hasBody = DCAttrHTML.querySelector('body');
                            if (hasBody) {
                                var thisDiv = hasBody.querySelector('div[DCAttrClipboardData]');
                                if (thisDiv) {
                                    var DCAttrClipboardData = thisDiv.getAttribute('DCAttrClipboardData');
                                    dataList = JSON.parse(DCAttrClipboardData);
                                    //在此处判断是否存在image元素
                                    if (Array.isArray(dataList)) {
                                        for (var list = 0; list < dataList.length; list += 2) {
                                            if (dataList[list].indexOf('image/') == 0) {
                                                dataList = [dataList[list], dataList[list + 1]];
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                } else {
                                    //判断是否存在图片并为本地地址
                                    var allImg = hasBody.querySelectorAll('img');
                                    //解析是否存在本地图片
                                    var allLocalImg = [];
                                    if (allImg && allImg.length > 0) {
                                        for (var img = 0; img < allImg.length; img++) {
                                            var thisImg = allImg[img];
                                            if (thisImg.src) {
                                                thisImg.src = thisImg.src.trim();
                                                if (thisImg.src.indexOf('file:///') == 0) {
                                                    allLocalImg.push(thisImg.src);
                                                    thisImg.remove();
                                                }
                                            }
                                        }
                                    }
                                    if (allLocalImg.length > 0) {
                                        clipboardData = DCAttrHTML.outerHTML;
                                        WriterControl_Event.InnerRaiseEvent(rootElement, "EventErrorGetClipboard", allLocalImg)
                                    }
                                    dataList.push(type);
                                    dataList.push(clipboardData);
                                }
                            } else {
                                dataList.push(type);
                                dataList.push(clipboardData);
                            }
                        } else {
                            dataList.push(type);
                            dataList.push(clipboardData);
                        }
                    }
                }
            }
            if (triggerEventBeforePaste(rootElement, dataList) == false) {
                return false;
            }
            //如果clipboardData能读取到数据
            if (dataList.length > 0) {
                var needPaste = WriterControl_UI.PasteDataFromTableToTable(dataList, rootElement);
                if (needPaste) {
                    //调用后台数据
                    var ref9 = rootElement.__DCWriterReference;
                    if (ref9 != null) {
                        ref9.invokeMethod(
                            "DoPaste",
                            dataList);
                    }
                }
            }
        } else {
            console.log('不支持粘贴')
        }
    },
    /** 设置系统剪切板的内容
     * @param {Array} datas 数据内容，偶数位为数据格式的名称，奇数位是数据内容
     * @param {Object} e 事件对象,当处于复制或粘贴事件中使用时,可以通过事件对象自带的setDate方法,不需要权限就能操作剪切板
     * @param 数据格式名称默认使用MIMEMIME 类型 text/plain text/html mage/jpeg image/png
     */
    SetClipboardData: async function (datas, e, eventType, rootElement) {
        // var rootElement = WriterControl_UI.GetCurrentWriterControl();
        // xuyiming 添加复制拦截事件【EventBeforeCopy】
        var eventCallBack = null
        if (eventType == 'copy') {
            if (rootElement.EventBeforeCopy != null && typeof (rootElement.EventBeforeCopy) == "function") {
                eventCallBack = rootElement.EventBeforeCopy;
            }
        } else if (eventType == 'cut') {
            if (rootElement.EventBeforeCut != null && typeof (rootElement.EventBeforeCut) == "function") {
                eventCallBack = rootElement.EventBeforeCut;
            }
        }
        if (eventCallBack != null && typeof (eventCallBack) == "function") {
            var eventData = {
                datas: datas,
                SetClipboardData: WriterControl_UI.SetClipboardData
            };
            var result = eventCallBack(e, eventData);
            if (result === false) {
                return false;
            }
        }

        //datas为空或没有值的时候
        if (datas == null || !Array.isArray(datas)) {
            return;
        }
        if (e != null && e.clipboardData != null) {
            // 2023-6-3 yyf 简单粗暴的将数据塞入剪切板
            for (var iCount = 0; iCount < datas.length; iCount += 2) {
                if (datas[iCount] == 'text/html') {
                    //datas = JSON.stringify(datas);
                    //找到body，写入到body的自定义属性中去
                    var DCAttrHTML = document.createElement('html');
                    DCAttrHTML.innerHTML = datas[iCount + 1];
                    //找到body
                    var hasBody = DCAttrHTML.querySelector('body');
                    if (!hasBody) {
                        hasBody = document.createElement('body');
                        DCAttrHTML.appendChild(hasBody);
                    }
                    if (hasBody.children.length == 0) {
                        hasBody.innerHTML = '<div><div>'
                    }
                    var DCAttrDiv = document.createElement('div');
                    DCAttrDiv.setAttribute('DCAttrClipboardData', JSON.stringify(datas));
                    //DCAttrDiv.style.display = 'none';
                    hasBody.children[0].appendChild(DCAttrDiv);
                    e.clipboardData.setData(datas[iCount], DCAttrHTML.outerHTML);
                } else {
                    e.clipboardData.setData(datas[iCount], datas[iCount + 1]);
                }
            }
            //为了能保证复制粘贴都能正常显示，此处占用text/uri-list用做保存数据
            
            //e.clipboardData.setData('text/uri-list', datas);
        } else {
            console.log('不支持复制;')
        }
    },
    //
    ///**
    // * 获得根元素对象
    // * @param {string} containerID 容器元素编号
    // * @returns {HTMLElement} 获得的根元素对象
    // */
    //GetRootElement: function (containerID) {
    //    if (containerID != null && containerID.nodeName) {
    //        var pe = containerID;
    //        while (pe != null) {
    //            if (pe.getAttribute) {
    //                if (pe.getAttribute("dctype") == "WriterPrintPreviewControlForWASM"
    //                    || pe.getAttribute("dctype") == "WriterControlForWASM") {
    //                    return pe;
    //                }
    //            }
    //            pe = pe.parentNode;
    //        }
    //    }
    //    else {
    //        return document.getElementById(containerID);
    //    }
    //},

    ///**
    // * 获得指定名称的事件处理函数
    // * @param {string} containerID 容器元素对象编号
    // * @param {string} strEventName 事件名称
    // * @returns {Function} 事件处理函数对象
    // */
    //GetControlEventHandler: function (containerID, strEventName) {
    //    var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
    //    var list = new Array();
    //    var func = window["WriterControl_" + strEventName];
    //    if (typeof (func) == "function") {
    //        // 获得全局性事件函数
    //        list.push(func);
    //    }
    //    func = rootElement[strEventName];
    //    if (typeof (func) == "function") {
    //        // 获得直接绑定的事件函数
    //        list.push(func);
    //    }
    //    else {
    //        // 按照属性名来获得事件函数
    //        var name2 = rootElement.getAttribute(strEventName);
    //        if (name2 != null && name2.length > 0 && typeof (window[name2]) == "function") {
    //            list.push(window[name2]);
    //        }
    //    }
    //    if (list.length == 0) {
    //        return null;
    //    }
    //    else if (list.length == 1) {
    //        return list[0];
    //    }
    //    else {
    //        return list;
    //    }

    //    //var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
    //    //if (ctl != null) {
    //    //    var handler = ctl[strEventName];
    //    //    if (typeof (handler) == "function") {
    //    //        return handler;
    //    //    }
    //    //    var attrName = ctl.getAttribute(strEventName);
    //    //    if (attrName != null && attrName.length > 0) {
    //    //        var h2 = window[attrName];
    //    //        if (typeof (h2) == "function") {
    //    //            return h2;
    //    //        }
    //    //    }
    //    //}
    //    //return null;
    //},
    /**
     * 设置元素的鼠标光标信息
     * @param {string} containerID 容器元素编号
     * @param {Number} intPageIndex 页码
     * @param {string} cursor 光标名称
     */
    SetElementCursor: function (containerID, intPageIndex, cursor) {
        var element = WriterControl_Paint.GetCanvasElementByPageIndex(containerID, intPageIndex)
        if (element != null) {
            element.style.cursor = cursor;
            var p = element.parentNode;
            var element2 = DCTools20221228.GetChildNodeByDCType(p, "caret");
            if (element2 != null) {
                element2.style.cursor = cursor;
            }
            element2 = DCTools20221228.GetChildNodeByDCType(p, "dcinput");
            if (element2 != null) {
                element2.style.cursor = cursor;
            }
        }
    },
    /**
     * 设置提示文本
     * @param {string} containerID 容器元素编号
     * @param {string} strText 提示文本
     */
    SetToolTip: function (containerID, strText) {
        var element = document.getElementById(containerID);
        if (element != null) {
            element.title = strText;
        }
    },

    // 显示颜色对话框
    ShowColorDialog: function (defaultColor, callBack) {
    },
    /**
     * 显示一个消息框
     * @param {string} strText 消息文本
     * @param {string} strCaption 标题文本
     * @param {string} strButtons 按钮设置
     * @param {string} strIcon 光标设置
     * @param {string} strDefaultButton 默认按钮设置
     * @returns {string} 用户确认的状态
     */
    ShowMessageBox: function (strText, strCaption, strButtons, strIcon, strDefaultButton) {
        // strButtons: OK = 0, OKCancel = 1, AbortRetryIgnore = 2, YesNoCancel = 3, YesNo = 4, RetryCancel = 5
        // DialogResult : None = 0, OK = 1, Cancel = 2, Abort = 3, Retry = 4, Ignore = 5, Yes = 6, No = 7
        if (strButtons == "0") {
            window.alert(strText);
        }
        else if (strButtons == "1") {
            if (window.confirm(strText) == true) {
                return "1";
            }
            else {
                return "2";
            }
        }
        else if (strButtons == "2") {
            if (window.confirm(strText) == true) {
                return "3";
            }
            else {
                return "4";
            }
        }
        else if (strButtons == "3" || strButtons == "4") {
            if (window.confirm(strText) == true) {
                return "6";
            }
            else {
                return "7";
            }
        }
        else if (strButtons == "5") {
            if (window.confirm(strText) == true) {
                return "4";
            }
            else {
                return "2";
            }
        }
        else {
            window.alert(strText);
        }
        return null;
    },


    /**
     * 显示一个输入框
     * @param {string} strTitle 标题文本
     * @param {string} strDefaultValue 默认值
     * @returns {string} 用户输入的文本
     */
    WindowPrompt: function (strTitle, strDefaultValue) {
        return window.prompt(strTitle, strDefaultValue);
    },

    IsFocused: function (strID) {
        if (document.hasFocus() == false) {
            return false;
        }
        var element = document.getElementById(strID);
        if (element == null) {
            return false;
        }
        return true;
    },
    /**
     * 滚动视图
     * @param {string} containerID 容器元素编号
     * @param {number} intPageIndex 页码
     * @param {number} intDX 坐标值
     * @param {number} intDY 坐标值
     * @param {number} intWidth 坐标值
     * @param {number} intHeight 坐标值
     * @param {string} strScrollStyle 滚动模式
     */
    ScrollToView: function (containerID, intPageIndex, intDX, intDY, intWidth, intHeight, strScrollStyle) {
        if (WriterControl_Paint.IsDrawingReversibleShape() == true) {
            // 正在绘制可逆图形，不滚动视图
            return;
        }
        var element = WriterControl_Paint.GetCanvasElementByPageIndex(containerID, intPageIndex);
        if (element != null) {
            var parent = window;
            if (parent != null) {
                var x = element.offsetLeft + intDX + 1;
                var y = element.offsetTop + intDY + 1;
                var clientLeft = 0;
                var clientTop = 0;
                var clientWidth = 0;
                var clientHeight = 0;
                if (parent == window) {
                    clientLeft = window.scrollX;
                    clientTop = window.scrollY;
                    clientWidth = window.innerWidth;
                    clientHeight = window.innerHeight;
                }
                else {
                    clientLeft = - element.scrollLeft;
                    clientTop = - element.scrollTop;
                    clientWidth = element.clientWidth;
                    clientHeight = element.clientHeight;
                }
                //strScrollStyle = "Top";
                switch (strScrollStyle) {
                    case "Normal":
                        var dx = 0;
                        var dy = 0;
                        if (x < clientLeft) {
                            dx = x - clientLeft - 3;
                        }
                        if (x + intWidth > clientLeft + clientWidth) {
                            dx = x + intWidth - clientLeft - clientWidth + 3;
                        }
                        if (y < clientTop) {
                            dy = y - clientTop - 5;
                        }
                        if (y + intHeight > clientTop + clientHeight) {
                            dy = y + intHeight - clientTop - clientHeight + 5;
                        }
                        if (dx != 0 || dy != 0) {
                            if (parent == window) {
                                window.scrollTo(clientLeft + dx, clientTop + dy);
                                //window.scrollX += dx;
                                //window.scrollY += dy;
                            }
                            else {
                                parent.scrollLeft += dx;
                                parent.scrollTop += dy;
                            }
                        }
                        return;
                    case "Top":
                        if (parent == window) {
                            window.scrollTo(window.scrollX, y);
                            //window.scrollY = y;
                        }
                        else {
                            parent.scrollTop = - y;
                        }
                        break;
                    case "Middle":
                        if (parent == window) {
                            window.scrollY = y + clientHeight / 2;
                        }
                        else {
                            parent.scrollTop = - y - clientHeight / 2;
                        }
                        break;
                    case "Bottom":
                        if (parent == window) {
                            window.scrollY = y + clientHeight;
                        }
                        else {
                            parent.scrollTop = -y - clientHeight;
                        }
                        break;
                }
            }
        }
    },

    /**
     * 设置光标
     * @param {string} containerID 容器元素编号
     * @param {number} intPageIndex 页码
     * @param {number} intDX 光标位置
     * @param {number} intDY 光标位置
     * @param {number} intWidth 宽度
     * @param {number} intHeight 高度
     * @param {boolean} bolVisible 是否可见
     */
    ShowCaret: function (containerID, intPageIndex, intDX, intDY, intWidth, intHeight, bolVisible) {
        //在此次对光标位置进行一次保存
        WriterControl_UI.oldCaretOption = { containerID, intPageIndex, intDX, intDY, intWidth, intHeight, bolVisible };
        //获取当前元素
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        var backgroundColorStr = "rgba(0,0,0,0.8)";
        // 自定义光标的宽度和颜色【CaretCss="5,red"】
        var CaretCss = rootElement.getAttribute("caretcss");
        if (CaretCss && CaretCss.length > 0) {
            var _index = CaretCss.indexOf(",");
            var num = CaretCss;
            if (_index > -1) {
                num = CaretCss.slice(0, _index);
                var bgc = CaretCss.slice(_index + 1);
                if (bgc) {
                    backgroundColorStr = bgc;
                }
            }
            if (num) {
                num = parseFloat(num);
                if (isNaN(num) == false) {
                    intWidth = num;
                }
            }

        }
        var strDIVID = "divCaret20221213";
        var divCaret = rootElement.querySelector('#' + strDIVID);
        if (divCaret == null) {
            divCaret = document.createElement("DIV");
            divCaret.id = strDIVID;
            divCaret.style.position = "absolute";
            divCaret.style.zIndex = 1000;
            divCaret.style.backgroundColor = backgroundColorStr;
            divCaret.style.display = "none";
            divCaret.setAttribute("dctype", "caret");
            var ces = WriterControl_UI.GetPageCanvasElements(containerID);
            if (ces != null && ces.length > 0) {
                var p9 = ces[0].parentNode;
                p9.insertBefore(divCaret, p9.firstChild);
            }
            else {
                document.body.insertBefore(divCaret, document.body.firstChild);
            }
        }
        var strTextID = "txtEdit20221213";

        var txtEdit = rootElement.querySelector('#' + strTextID);
        if (txtEdit == null) {
            txtEdit = document.createElement("INPUT");
            txtEdit.setAttribute('autocomplete', 'off');
            txtEdit.setAttribute('type', 'text'); 
            txtEdit.id = strTextID;
            txtEdit.style.position = "absolute";
            txtEdit.style.zIndex = 1001;
            txtEdit.style.backgroundColor = "#ffffff";
            txtEdit.style.display = "none";
            txtEdit.style.width = "1px";
            //txtEdit.style.border = "1px solid red";
            txtEdit.style.border = "none";
            txtEdit.style.resize = "none";
            txtEdit.style.overflow = "hidden";
            txtEdit.style.outline = 'none';
            txtEdit.style.padding = '0px';
            txtEdit.style.margin = '0px';
            txtEdit.style.lineHeight = '1';
            txtEdit.style.opacity = '0';
            txtEdit.setAttribute("dctype", "dcinput");
            divCaret.parentNode.insertBefore(txtEdit, divCaret);
            txtEdit.onkeydown = function (e) {
                //在此处处理按键事件
                if (rootElement != null && rootElement.ondocumentkeydown != null && typeof rootElement.ondocumentkeydown == 'function') {
                    rootElement.ondocumentkeydown(e);
                }

                //判断是否为存在下拉框,如果存在调用禁止其他操作
                var hasList = WriterControl_ListBoxControl.ChangeListBoxCheck(rootElement, e);
                if (hasList) {
                    return;
                }

                //判断是否为只读状态禁止输入法
                var isReadonly = rootElement.Readonly;
                if (isReadonly && this.getAttribute('type') != 'password') {
                    this.setAttribute('type', 'password');
                    return;
                } else if (!isReadonly && this.getAttribute('type') != 'text') {
                    this.setAttribute('type', 'text');
                }

                if (e.shiftKey == true && e.ctrlKey == false && e.altKey == false && e.keyCode == 123) {
                    // shift + F12 触发执行编辑器命令对话框
                    return rootElement.DCExecuteCommandDialog();
                }
                if (e.shiftKey == false && e.ctrlKey == true && e.altKey == false && e.keyCode == 70) {
                    // ctrl + F 触发查找替换对话框
                    rootElement.SearchAndReplaceDialog();
                }
                if (e.shiftKey == false && e.ctrlKey == true && e.altKey == false && (e.keyCode == 81 || e.keyCode == 82 || e.keyCode == 85 || e.keyCode == 87)) {
                    // (ctrl + R || ctrl + Q ||Ctrl+U || ctrl + W) 禁止触发默认事件
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                }
                if (e.ctrlKey === true && e.keyCode == 88) {
                    //无法主动触发oncut事件只能先监听keydown手动调用
                    document.execCommand('cut');
                }

                if (e.keyCode != 229) {
                    var ref9 = this.__DCWriterReference;
                    if (ref9 != null && ref9.invokeMethod(
                        "EditorHandleKeyEvent",
                        "keydown",
                        e.altKey,
                        e.shiftKey,
                        e.ctrlKey,
                        e.code,
                        e.key) == true) {
                        if (e.keyCode == 9) {
                            // 处理Tab键,
                            ref9.invokeMethod("EditorHandleKeyPress", "\t");
                        }
                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        //return false;
                    }
                }

                if (e.key == "F12" || e.key == "Control") {
                    // 不处理一些特殊键
                    return;
                }

            };
            txtEdit.onkeypress = function (e) {
                //在此处处理按键事件
                if (rootElement != null && rootElement.ondocumentkeypress != null && typeof rootElement.ondocumentkeypress == 'function') {
                    rootElement.ondocumentkeypress(e);
                }

                if (this.getAttribute('type') == 'password') {
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                    return;
                }
                if (e.keyCode != 229) {
                    var ref9 = this.__DCWriterReference;
                    if (ref9 != null && ref9.invokeMethod(
                        "EditorHandleKeyPress",
                        e.key) == true) {
                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        return false;
                    }
                }

            };
            txtEdit.onkeyup = function (e) {
                //在此处处理按键事件
                if (rootElement != null && rootElement.ondocumentkeyup != null && typeof rootElement.ondocumentkeyup == 'function') {
                    rootElement.ondocumentkeyup(e);
                }

                if (e.key == "F12" || e.key == "Control") {
                    // 不处理一些特殊键
                    return;
                }
                //if (DotNet.invokeMethod(
                //    window.EntryPointAssemblyName,
                //    "EditorHandleKeyEvent",
                //    "keyup",
                //    e.altKey,
                //    e.shiftKey,
                //    e.ctrlKey,
                //    e.key,
                //    e.keyCode) == true)
                {
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                    return false;
                }

            };

            txtEdit.hasCompositionstart = false;
            //中文输入开始时的回调
            txtEdit.addEventListener('compositionstart', function (e) {
                //添加属性用于控制是否触发了中文事件
                txtEdit.hasCompositionstart = true;
                //显示文本域
                this.style.opacity = '1';
                divCaret.style.display = 'none';
            })
            //中文输入时的回调
            txtEdit.addEventListener('compositionupdate', function (e) {
                //创建元素计算输入文本长度
                var updateWidthCalc = document.getElementById('updateWidthCalc');
                //判断是否已存在
                if (updateWidthCalc == null) {
                    updateWidthCalc = document.createElement('span');
                }
                updateWidthCalc.setAttribute('id', 'updateWidthCalc');
                //确保字体和文档显示一样
                updateWidthCalc.style.cssText = 'word-wrap: normal;contain: style size layout;left: 0;right: 0;font-family:' + rootElement.CurrentFontName + ';font-size:' + rootElement.CurrentFontSize + 'pt;';
                rootElement.appendChild(updateWidthCalc);
                //判断currentTextline中的文本长度              
                updateWidthCalc.innerText = e.data;
                var spanWidth = updateWidthCalc.offsetWidth + parseFloat(txtEdit.style.height);
                //修改文本域的宽度
                this.style.width = spanWidth + 'px';
                //updateWidthCalc.parentNode.removeChild(updateWidthCalc)
            })
            //中文输入域结束后的回调
            txtEdit.addEventListener('compositionend', function (e) {
                //将中文插入到当前选中行中
                var txt = this.value;
                //console.log(txt)
                var ref9 = this.__DCWriterReference;
                if (ref9 != null) {
                    ref9.invokeMethod(
                        "EditorInsertStringFromUI",
                        txt);
                }
                //清空输入域的文本
                this.value = null;
                this.style.width = '1px';
                //隐藏文本域
                txtEdit.style.opacity = '0';
                //删除计算宽度的span
                //创建元素计算输入文本长度
                var updateWidthCalc = document.getElementById('updateWidthCalc');
                if (updateWidthCalc != null) {
                    updateWidthCalc.parentNode.removeChild(updateWidthCalc);
                }
                //显示模拟光标
                divCaret.style.removeProperty('display');
                //结束中文事件
                txtEdit.hasCompositionstart = false;
            })

            txtEdit.oninput = function (e) {
                //判读是否为只读
                var isReadonly = rootElement.Readonly;
                if (!isReadonly) {
                    if (!txtEdit.hasCompositionstart) {
                        var txt = this.value;
                        //console.log(txt)
                        var ref9 = this.__DCWriterReference;
                        if (ref9 != null) {
                            ref9.invokeMethod(
                                "EditorInsertStringFromUI",
                                txt);
                        }
                        //清空输入域的文本
                        this.value = null;
                    }
                }
            }
            txtEdit.addEventListener('blur', function () {
                divCaret.style.display = "none";
                window.clearInterval(divCaret.handleTimer);
                var activeEle = document.hasFocus();
                //在此处处理关闭下拉操作
                if (!activeEle) {
                    var dropdownDiv = rootElement.querySelector('#divDropdownContainer20230111');
                    if (dropdownDiv) {
                        dropdownDiv.CloseDropdown();
                    }
                }
            })
            //剪切事件
            txtEdit.addEventListener('cut', function (e) {
                var datas = '';
                var ref9 = rootElement.__DCWriterReference;
                if (ref9 != null) {
                    datas = ref9.invokeMethod(
                        "DoCut", false, false);
                }
                WriterControl_UI.SetClipboardData(datas, e, 'cut', rootElement);
                e.stopPropagation();
                e.preventDefault();
                e.returnValue = false;
            })
            //复制能在选中之后进行回调执行
            txtEdit.addEventListener('copy', function (e) {
                //获取到复制的数据
                var datas = '';
                var ref9 = rootElement.__DCWriterReference;
                if (ref9 != null) {
                    datas = ref9.invokeMethod(
                        "DoCopy", false);
                }
                WriterControl_UI.SetClipboardData(datas, e, 'copy', rootElement);
                e.stopPropagation();
                e.preventDefault();
                e.returnValue = false;
            })
            //粘贴不能必须选中再执行,需要未选中情况下也能执行
            txtEdit.addEventListener('paste', function (e) {
                WriterControl_UI.GetClipboardData(e, rootElement);
                e.stopPropagation();
                e.preventDefault();
                e.returnValue = false;
            })
        }

        var hasContextMenu = rootElement.querySelector('#dcContextMenu');
        if (hasContextMenu) {
            hasContextMenu.remove();
        }
        if (bolVisible) {
            // 显示光标
            if (divCaret.style.display == "none") {
                //console.log('showCaret');
                //获取到所有的还在闪烁的showCaret添加上display:none
                var allCaret = document.querySelectorAll('div[id=divCaret20221213]');
                //循环判断是否是其他的光标
                for (var caret = 0; caret < allCaret.length; caret++) {
                    var thisCaret = allCaret[caret];
                    if (thisCaret != divCaret) {
                        //判断是否显示
                        var hasDisplay = thisCaret.style.display
                        if (hasDisplay != null) {
                            thisCaret.style.display = 'none';
                            clearInterval(thisCaret.handleTimer)
                        }
                    }
                }
                divCaret.style.removeProperty('display');
                //在每次做定时器时都先清除一下之前的设置,防止出现光标跳的过快情况
                clearInterval(divCaret.handleTimer)
                var func = function () {
                    var divCaret = rootElement.querySelector('#' + strDIVID);
                    if (divCaret == null) {
                        return;
                    }
                    if (divCaret.parentNode && divCaret.parentNode.style.display == "none") {
                        // 父节点不可见，则不后续处理。
                        return;
                    }
                    if (divCaret.style.display != "none") {
                        if (divCaret.style.visibility == "hidden") {
                            divCaret.style.visibility = "visible";
                        }
                        else {
                            divCaret.style.visibility = "hidden";
                        }
                    }
                    if (document.activeElement != txtEdit
                        && WriterControl_Paint.IsDrawingReversibleShape() == false) {
                        txtEdit.focus();
                    }
                };
                divCaret.handleTimer = window.setInterval(func, 530);
                func()
            }

            var pageElement = WriterControl_Paint.GetCanvasElementByPageIndex(containerID, intPageIndex);
            if (txtEdit.style.display == "none") {
                txtEdit.style.display = "";
                txtEdit.focus();
            }
            txtEdit.__DCWriterReference = null;
            if (pageElement != null) {
                txtEdit.__DCWriterReference = pageElement.parentNode.parentNode.__DCWriterReference;
                var newLeft = (pageElement.offsetLeft + intDX + 1) + "px";
                var newTop = (pageElement.offsetTop + intDY + 3) + "px";
                //if (DCTools20221228.GetChildNodeByDCType(rootElement, "hrule") != null) {
                //    // 显示的标尺
                //    newLeft += pageElement.parentNode.offsetLeft;
                //    newTop += pageElement.parentNode.offsetTop;
                //}
                divCaret.style.left = newLeft;
                divCaret.style.top = newTop;
                divCaret.style.visibility = "visible";
                divCaret.style.width = intWidth + "px";
                divCaret.style.height = intHeight + "px";

                txtEdit.style.left = (pageElement.offsetLeft + intDX + 1 + intWidth + 1) + "px";
                txtEdit.style.top = newTop;
                //修改让文本能展示完全
                txtEdit.style.height = (rootElement.CurrentFontSize * 1.5) + "px";
                txtEdit.style.fontSize = rootElement.CurrentFontSize + "pt";
                txtEdit.style.fontFamily = rootElement.CurrentFontName;
                //判断是否在浏览器可视区域内
                //获取内部的dctype="page-container"
                var pageContainer = WriterControl_UI.GetPageContainer(rootElement);// rootElement.querySelector('[dctype=page-container]')
                var topGap = pageContainer.scrollTop
                var bottomGap = pageContainer.scrollTop + pageContainer.offsetHeight
                if (pageElement.offsetTop + intDY < topGap) {
                    pageContainer.scrollTo(0, pageElement.offsetTop + intDY)
                } else if (bottomGap - (pageElement.offsetTop + intDY) <= intHeight) {
                    pageContainer.scrollTo(0, pageElement.offsetTop + intDY - pageContainer.offsetHeight + intHeight)
                }

                //在此处处理是否光标位置的是输入域
                //var currentEle = rootElement.CurrentInputField();
                //if (currentEle != null && rootElement.EventFieldOnFocus != null && typeof rootElement.EventFieldOnFocus == 'function') {
                //    rootElement.EventFieldOnFocus(currentEle);
                //}
            }
        }
        else if (divCaret.style.display != "none") {
            divCaret.style.display = "none";
            //window.clearInterval(divCaret.handleTimer);
            //delete divCaret.handleTimer;
        }

    },
    /**获得当前编辑控件对象
     * @returns {HTMLElement} 编辑器控件容器元素
     * */
    GetCurrentWriterControl: function () {
        //var strDIVID = "divCaret20221213";
        //var divCaret = document.querySelectorAll(strDIVID);
        //if (divCaret != null) {
        //    // 向上查找父节点，找出编辑器对象
        //    for (var iCount = 0; iCount < 3; iCount++) {
        //        divCaret = divCaret.parentNode;
        //        if (divCaret != null && divCaret.getAttribute("dctype") == "WriterControlForWASM") {
        //            return divCaret;
        //        }
        //    }
        //}
        //return null;
        var showWriterControl = null;
        //zhangbin 20230705 此处处理，判断当前没有配隐藏的是那个元素
        var divWASM = document.querySelectorAll("[dctype='WriterControlForWASM']");
        for (var icount = 0; icount < divWASM.length; icount++) {
            var element = divWASM[icount];
            if (element.getClientRects) {
                var rects = element.getClientRects();
                if (rects != null && rects.length != 0) {
                    showWriterControl = element;
                    return showWriterControl;
                }
            }
        }
        return showWriterControl;
    },
    /**获得当前页面图形对象
     * @param {string | HTMLDivElement } containerID 容器元素对象编号
     * @returns { HTMLCanvasElement } 页面图形对象 */
    GetCurrentPageElement: function (containerID) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement != null) {
            var pi = rootElement.__DCWriterReference.invokeMethod("get_PageIndex");
            if (pi >= 0) {
                return WriterControl_Paint.GetCanvasElementByPageIndex(rootElement, pi);
            }
        }
        return null;
    },

    //wyc20230518
    /** 直接执行给定的JS代码
     * @param {string} jsstring js代码字符串 
    * @param { boolean } needdecode 是否需要解码后再执行 */
    RaiseJavaScriptBlock: function (jsstring, needdecode) {
        var jscode = jsstring
        if (needdecode === true) {
            jscode = decodeURIComponent(jsstring);
        }
        if (window.execScript) {
            window.execScript(jscode);
        } else {
            window.eval(jscode);
        }
    }
}