"use strict";

// DCWriter事件处理

import { WriterControl_UI } from "./WriterControl_UI.js";
import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { WriterControl_DOMPackage } from "./WriterControl_DOMPackage.js";
/**编辑器事件处理模块 */
export let WriterControl_Event = {
    /**
    * 触发事件
    * @param {string } strEventName 事件名称
    * @param {any} eventArgs 事件参数
    */
    InnerRaiseEvent: function (rootElement, strEventName, eventArgs) {
        var handler = WriterControl_Event.InnerGetEventHandler(rootElement, strEventName);
        if (handler != null) {
            if (typeof (handler) == "function") {
                handler.call(rootElement, rootElement, eventArgs);
            }
            else {
                for (var iCount = 0; iCount < handler.length; iCount++) {
                    handler[iCount].call(rootElement, rootElement, eventArgs);
                }
            }
        }
    },
    /**获得事件处理函数对象
     * @param {string | Function} strEventName 事件名称
     * @returns { Function | Array} 事件处理函数对象，如果为多个函数则返回一个数组
     * 
     */
    InnerGetEventHandler : function ( rootElement, strEventName) {
        var list = new Array();
        var func = window["WriterControl_" + strEventName];
        if (typeof (func) == "function") {
            // 获得全局性事件函数
            list.push(func);
        }
        func = rootElement[strEventName];
        if (typeof (func) == "function") {
            // 获得直接绑定的事件函数
            list.push(func);
        }
        else {
            // 按照属性名来获得事件函数
            var name2 = rootElement.getAttribute(strEventName);
            if (name2 != null && name2.length > 0) {
                if (typeof (window[name2]) == "function") {
                    list.push(window[name2]);
                }
                else {
                    list.push(new Function(name2));
                }
            }
        }
        if (list.length == 0) {
            return null;
        }
        else if (list.length == 1) {
            return list[0];
        }
        else {
            return list;
        }
    },
    /**
     * 触发控件的快捷菜单事件
     * @param {string | HTMLElement} containerID 根元素
     * @param {number} intPageIndex 页码对象
     * @param {any} intX
     * @param {any} intY
     * @param {any} strElementTypeName
     */
    RaiseEventShowContextMenu: function (containerID, intPageIndex, intX, intY, strElementTypeName) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
        if (rootElement != null) {
            var page = WriterControl_Paint.GetCanvasElementByPageIndex(containerID, intPageIndex);
            rootElement.RaiseEvent(
                "EventShowContextMenu",
                {
                    ControlElement: rootElement,
                    PageIndex: intPageIndex,
                    PageElement: page,
                    X: intX,
                    Y: intY,
                    ElementType: strElementTypeName
                });
        }
    },
    /**
     * 处理内部事件
     * @param {string} containerID 容器元素编号
     * @param {string} strEventName 事件名称
     * @param {any} parameter 参数
     * @returns {boolean} 事件是否处理完毕，无需后续处理。
     */
    HandleDCWriterInnerEvent: function (containerID, strEventName, parameter) {
        var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
        if (ctl == null) {
            return false;
        }
        //wyc20230518:对按钮元素追加执行前端脚本操作
        if (strEventName == "EventButtonClick"
            && parameter != null
            && parameter.buttonElementID != null
            && parameter.buttonElementID.length > 0) {
                // 2024-6-2 yyf 改进接口代码
            var strScript = ctl.__DCWriterReference.invokeMethod("GetButtonScriptTextClick", parameter.buttonElementID);
            if (strScript != null && strScript.length > 0) {
                var jscode = strScript;
                if (window.execScript) {
                    window.execScript(jscode);
                } else {
                    window.eval(jscode);
                }
            }
            //var buttonopt = ctl.GetElementPropertiesByID(parameter.buttonElementID);
            //if (buttonopt != null
            //    && buttonopt.Enabled === true
            //    && buttonopt.ScriptTextForClick.length > 0) {
            //    var jscode = decodeURIComponent(buttonopt.ScriptTextForClick);
            //    if (window.execScript) {
            //        window.execScript(jscode);
            //    } else {
            //        window.eval(jscode);
            //    }
            //    return true;
            //}
        }
        // // 元素双击事件
        // if (strEventName == "EventElementMouseDblClick") {
        //     var typename = ctl.GetCurrentElementTypeName();//当前选择的元素类型名称
        //     if (typename == "xtextnewmedicalexpressionelement") {
        //         // 医学表达式
        //         ctl.ExecuteCommand("elementproperties", true);
        //     }
        // }
        return false;
    },
    /**
     * 判断是否存在指定名称的属性
     * @param {string} containerID 容器元素对象编号
     * @param {string} strEventName 事件名称
     * @returns {boolean} 是否存在属性
     */
    HasControlEvent: function (containerID, strEventName) {
        var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
        if (ctl != null) {
            return WriterControl_Event.InnerGetEventHandler( ctl , strEventName) != null;
        }
        return false;
    },
    /**
     * 触发指定名称的属性
     * @param {string} containerID 容器元素对象编号
     * @param {string} strEventName 事件名称
     * @param {Any} args 事件参数
     * @param {string} argsTypeName 参数类型名称
     */
    RaiseControlEvent: function (containerID, strEventName, args, argsTypeName) {
        var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
        if (ctl != null) {
            var runtimeArgs = WriterControl_DOMPackage.CreatePackage(args, argsTypeName);
            WriterControl_Event.InnerRaiseEvent(ctl, strEventName, runtimeArgs);
        }
    },
};