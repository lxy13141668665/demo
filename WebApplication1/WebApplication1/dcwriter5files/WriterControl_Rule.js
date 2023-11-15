"use strict";

import { DCTools20221228 } from "./DCTools20221228.js";
import { PageContentDrawer } from "./PageContentDrawer.js";
import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { WriterControl_Task } from "./WriterControl_Task.js";
import { WriterControl_UI } from "./WriterControl_UI.js";

/**处理文档标尺相关的模块 */
export let WriterControl_Rule = {
    /**
     * 执行视图滚动事件处理
     * @param {HTMLDivElement} pageContainer 页面容器对象
     */
    HandleViewScroll: function (pageContainer) {
        WriterControl_Rule.InvalidateView(pageContainer.parentNode, "hrule");
        WriterControl_Rule.InvalidateView(pageContainer.parentNode, "vrule");
    },
    /**
     * 更新标尺可见性
     * @param {string | HTMLDivElement} containerID 容器元素对象
     * @returns {Array} 两个标尺对象数组，如果不显示标尺，则返回空引用。
     */
    UpdateRuleVisible: function (containerID) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement == null) {
            return null;
        }
        var result = new Array();
        var bolRuleVisible = rootElement.__DCWriterReference.invokeMethod("get_RuleVisible");
        if (bolRuleVisible != (DCTools20221228.GetChildNodeByDCType(rootElement, "hrule") != null)) {
            // 标尺状态不一致，需要进行更新
            var pageContainer = WriterControl_UI.GetPageContainer(rootElement);
            if (bolRuleVisible == true) {
                // 创建标尺对象
                var hrule = document.createElement("CANVAS");
                hrule.setAttribute("dctype", "hrule");
                hrule.style.display = "block";
                hrule.width = screen.width;
                hrule.height = 24;
                hrule.style.backgroundColor = rootElement.__DCWriterReference.invokeMethod("GetRuleBackColorString");
                rootElement.insertBefore(hrule, pageContainer);

                var vrule = document.createElement("CANVAS");
                vrule.setAttribute("dctype", "vrule");
                vrule.style.display = "block";
                vrule.style.float = "left";
                vrule.width = 24;
                vrule.height = screen.height;
                vrule.style.backgroundColor = hrule.style.backgroundColor;
                rootElement.insertBefore(vrule, pageContainer);
                rootElement.style.overflow = "clip";

                pageContainer.style.height = "calc( 100% - 24px)";
                // 绘制标尺图形
                WriterControl_Rule.DrawRuleContent(rootElement, hrule);
                WriterControl_Rule.DrawRuleContent(rootElement, vrule);

                var funcMouseEvent = function (e) {
                    // 处理鼠标事件
                    if (rootElement.__DCWriterReference != null) {
                        if (rootElement.__DCWriterReference.invokeMethod("get_RuleEnabled") == false) {
                            // 标尺不可用
                            return;
                        }
                        var strResult = rootElement.__DCWriterReference.invokeMethod(
                            "RuleHandleMouseEvent",
                            this.getAttribute("dctype"),
                            e.type,
                            e.altKey,
                            e.shiftKey,
                            e.ctrlKey,
                            e.offsetX,
                            e.offsetY,
                            e.buttons,
                            e.detail);
                        if (strResult != null && strResult.length > 0) {
                            if (strResult == "capturemouse") {
                                if (this.setCapture) {
                                    this.setCapture(true);
                                }
                            }
                            else if (strResult.indexOf(",") >= 0) {
                                var item9s = strResult.split(",");
                                this.title = item9s[0];
                                this.style.cursor = item9s[1];
                            }
                        }
                    }
                }
                hrule.onmousedown = funcMouseEvent;
                hrule.onmousemove = funcMouseEvent;
                hrule.onmouseup = funcMouseEvent;
                hrule.ondblclick = funcMouseEvent;

                vrule.onmousedown = funcMouseEvent;
                vrule.onmousemove = funcMouseEvent;
                vrule.onmouseup = funcMouseEvent;
                vrule.ondblclick = funcMouseEvent;

                return [hrule, vrule];
            }
            else {
                // 删除标尺对象
                rootElement.removeChild(DCTools20221228.GetChildNodeByDCType(rootElement, "hrule"));
                rootElement.removeChild(DCTools20221228.GetChildNodeByDCType(rootElement, "vrule"));
                pageContainer.style.height = "";
                rootElement.style.overflow = "auto";
                return null;
            }
        }
        else if (bolRuleVisible == true) {
            // 返回标尺对象
            return [DCTools20221228.GetChildNodeByDCType(rootElement, "hrule"),
                DCTools20221228.GetChildNodeByDCType(rootElement, "vrule")];
        }
        else {
            return null;
        }
    },
     
    /**
     * 声明标尺控件视图无效，需要重新绘制
     * @param {string | HTMLElement} containerID 容器元素对象
     * @param {string} ruleName 标尺名称
     */
    InvalidateView: function (containerID, ruleName) {
        var rule = DCTools20221228.GetChildNodeByDCType(containerID, ruleName);
        if (rule != null) {
            WriterControl_Rule.DrawRuleContent(containerID, rule);
        }
    },
    /**
     * 声明所有标尺控件视图无效，需要重新绘制
     * @param {string | HTMLElement} containerID 容器元素对象
     */
    InvalidateAllView: function (containerID) {
        var rule = DCTools20221228.GetChildNodeByDCType(containerID, "hrule");
        if (rule != null) {
            WriterControl_Rule.DrawRuleContent(containerID, rule);
        }
        rule = DCTools20221228.GetChildNodeByDCType(containerID, "vrule");
        if (rule != null) {
            WriterControl_Rule.DrawRuleContent(containerID, rule);
        }
    },
    /**
     * 绘制标尺元素
     * @param {HTMLElement} rootElement 根元素对象
     * @param {HTMLCanvasElement} ruleElement 标尺元素对象
     */
    DrawRuleContent: function (rootElement, ruleElement) {
        rootElement = DCTools20221228.GetContainerElement(rootElement);
        //var currentPage = WriterControl_UI.GetCurrentPageElement(rootElement);


        //var pages = WriterControl_UI.GetPageCanvasElements(rootElement);
        //var firstPage = pages.length > 0 ? pages[0] : null;
        var strRuleName = ruleElement.getAttribute("dctype");
        //if (firstPage != null && strRuleName == "hrule") {
        //    if (ruleElement.width != firstPage.width) {
        //        ruleElement.width = firstPage.width;
        //    }
        //}
        //else if (firstPage != null && strRuleName == "vrule") {
        //    if (ruleElement.height != firstPage.height) {
        //        ruleElement.height = firstPage.height;
        //    }
        //}
        if (strRuleName == "vrule") {
            var vheight = rootElement.offsetHeight - 24;
            if (ruleElement.height != vheight) {
                ruleElement.height = vheight;
            }
            //ruleElement.height = rootElement.offsetHeight - 24;
        }
        var drawer = new PageContentDrawer(ruleElement);
        drawer.AllowClip = false;
        drawer.SetClearRectangle(0, 0, ruleElement.width, ruleElement.height);
        drawer.EventQueryCodes = function () {
            var curPage = WriterControl_UI.GetCurrentPageElement(rootElement);
            var positionOffset = 0;
            var viewSize = strRuleName == "hrule" ? ruleElement.width : ruleElement.height;
            if (curPage != null) {
                if (strRuleName == "hrule") {
                    // 水平标尺
                    positionOffset = curPage.offsetLeft + 25 - curPage.parentNode.scrollLeft;
                    viewSize = curPage.offsetWidth;
                    //drawer.SetClearRectangle(0, 0, viewSize, ruleElement.height);
                }
                else if (strRuleName == "vrule") {
                    positionOffset =  curPage.offsetTop  - curPage.parentNode.scrollTop + 0;
                    viewSize = curPage.offsetHeight;
                    //drawer.SetClearRectangle(0, 0, ruleElement.width, viewSize);
                }
            }
            var strCode = rootElement.__DCWriterReference.invokeMethod(
                "PaintRuleControl",
                strRuleName,
                positionOffset,
                viewSize);
            return strCode;
        };
        drawer.CanEatTask = function (otherTask) {
            if (this.CanvasElement == otherTask.CanvasElement) {
                return true;
            }
            return false;
        };
        drawer.AddToTask();
    },
    /**
     * 设置是否显示标尺
     * @param {string | HTMLElement} containerID 容器元素
     * @param {boolean} bolVisible 是否显示标尺
     * @returns {Array} 标尺元素对象
     */
    SetRuleVisible: function (containerID, bolVisible) {
        var rootElement = DCTools20221228.GetContainerElement(containerID);
        if (rootElement == null) {
            return null;
        }
        var pages = WriterControl_UI.GetPageCanvasElements(containerID);
        var firstPage = pages.length > 0 ? pages[0] : null;

        var bolVisible = rootElement.__DCWriterReference.invokeMethod("get_RuleVisible");
        if (bolVisible == false) {
            // 隐藏标尺
            var div = DCTools20221228.GetChildNodeByDCType(rootElement, "rule-contaienr");
            if (div != null) {
                rootElement.removeChild(div);
            }
            return null;
        }
        // 显示标尺
        var divContainer = DCTools20221228.GetChildNodeByDCType(rootElement, "rule-container");
        if (divContainer == null) {
            // 创建标尺
            divContainer = document.createElement("DIV");
            divContainer.setAttribute("dctype", "rule-container");
            divContainer.style.backgroundColor = rootElement.__DCWriterReference.invokeMethod("GetRuleBackColorString");
            divContainer.style.height = "24px";
            divContainer.style.minWidth = "fit-content";
                divContainer.style.marginLeft = "5px";
                divContainer.style.marginRight = "5px";
            divContainer.style.top = "0px";
            divContainer.style.position = "sticky";
            divContainer.style.textAlign = "center";
            if (rootElement.firstChild == null) {
                rootElement.appendChild(divContainer);
            }
            else {
                rootElement.insertBefore(divContainer, rootElement.firstChild);
            }
            var hrule = document.createElement("CANVAS");
            hrule.setAttribute("dctype", "hrule");
            if (firstPage != null) {
                hrule.width = firstPage.width;
            }
            hrule.height = 24;
            divContainer.appendChild(hrule);
            WriterControl_Rule.DrawRuleContent(rootElement, hrule);

            var vrule = document.createElement("CANVAS");
            vrule.setAttribute("dctype", "vrule");
            vrule.style.display = "block";
            vrule.style.backgroundColor = hrule.style.backgroundColor;
            vrule.width = 24;
            if (firstPage != null) {
                vrule.height = rootElement.clientHeight;
            }
            divContainer.appendChild(vrule);
            WriterControl_Rule.DrawRuleContent(rootElement, vrule);
        }
    }

}