"use strict";

import { DCTools20221228 } from "./DCTools20221228.js";
import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { WriterControl_Print } from "./WriterControl_Print.js";
import { WriterControl_Rule } from "./WriterControl_Rule.js";
import { WriterControl_UI } from "./WriterControl_UI.js";
import { WriterControl_IO } from "./WriterControl_IO.js";
import { WriterControl_Dialog } from "./WriterControl_Dialog.js";
import { WriterControl_Event } from "./WriterControl_Event.js";

export let WriterControl_API = {
    BindControlForWriterPrintPreviewControlForWASM: function (rootElement, refDCWriter) {
        rootElement.__DCWriterReference = refDCWriter;
        rootElement.IsWriterPrintPreviewControlForWASM = true;
        /**
         * 为打印预览添加文档
         * @param {string} strFileContent 文件内容
         * @param {string} strFileFormat 文件格式
         * @returns {boolean} 操作是否成功
         */
        rootElement.AddDocumentByText = function (strFileContent, strFileFormat) {
            return WriterControl_IO.AddDocumentByText(rootElement, strFileContent, strFileFormat);
        };
        /**
         * 执行多文档的打印预览
         * @param {any} options 打印选项
         */
        rootElement.InvalidatePreview = function (options) {
            WriterControl_Print.InvalidatePreview(rootElement, options);
        };
        /**
         * 打印到前端服务器，必须设置编辑器控件的PrintServerPageUrl属性。
         * @param {object} options 打印选项
         * @param {function} callBack 操作成功后的回调函数，参数为服务器返回值。
         * @returns 操作是否成功
         */
        rootElement.PrintToServer = function (options, callBack) {
            return WriterControl_Print.PrintToServer(rootElement, null, options, callBack);
        };
        /** //wyc20230519:增加与四代编辑器兼容的接口
         * 打印到前端服务器，必须设置编辑器控件的PrintServerPageUrl属性。
         * @param {object} options 打印选项JSON对象
         * @param {function} callBack 操作成功后的回调函数，参数为服务器返回值。
         * @returns 操作是否成功
         */
        rootElement.LocalPrintDocuments = function (options, callBack) {
            return WriterControl_Print.PrintToServer(rootElement, null, options, callBack);
        };
        /**
         * 打印为PDF文件
         * @param {any} options 打印选项
         * @param {any} callBack 操作成功后的回调函数，参数为包含PDF的blob对象，如果未指定回调函数则下载文件。
         * @returns 操作是否成功
         */
        rootElement.PrintAsPDF = function (options, callBack) {
            return WriterControl_Print.PrintAsPDF(rootElement, options, callBack);
        };
        /**
         * 打印为HTML文件
         * @param {any} options 打印选项
         * @param {any} callBack 操作成功后的回调函数，参数为包含HTML字符串，如果未指定回调函数则下载文件。
         * @param {object} {
         *     isPrint 是否需要打印 默认下载当为true/'true'时打印
         *     printCallback 值
         * }
         *  
         * @returns 操作是否成功
         */
        rootElement.PrintAsHtml = function (options, callBack, isPrint) {
            return WriterControl_Print.PrintAsHtml(rootElement, options, callBack);
        };
        /**
         * 触发事件
         * @param {string } strEventName 事件名称
         * @param {any} eventArgs 事件参数
         */
        rootElement.RaiseEvent = function (strEventName, eventArgs) {
            WriterControl_Event.InnerRaiseEvent(rootElement, strEventName, eventArgs);
        };
        ///**获得事件处理函数对象
        // * @param {string | Function} strEventName 事件名称
        // * @returns { Function | Array} 事件处理函数对象，如果为多个函数则返回一个数组
        // * 
        // */
        //rootElement.GetEventHandler = function (strEventName) {
        //    WriterControl_Event.InnerGetEventHandler(rootElement, strEventName);
        //};
        /**
         * 下载文件
         * @param {string} strFormat 文件格式
         * @param {string} strFileName 指定的文件名
         * @returns {boolean} 操作是否成功
         */
        rootElement.DownLoadFile = function (strFormat, strFileName) {
            return WriterControl_IO.DownLoadFile(rootElement, strFormat, strFileName);
        };
        /**
        * 设置缩放比率
        * @param {number} newZoomRate 新的缩放比率，必须在0.1到5之间
        * @returns {boolean} 操作是否修改缩放比率
        */
        rootElement.SetZoomRate = function (newZoomRate) {
            return WriterControl_UI.EditorSetZoomRate(rootElement, newZoomRate);
        };
        /**设置页面排版模式,可以为SingleColumn,MultiColumn,Horizontal
         * @param {string} strMode 排版类型，可以为SingleColumn,MultiColumn,Horizontal。
         */
        rootElement.SetPageLayoutMode = function (strMode) {
            WriterControl_UI.EditorSetPageLayoutMode(rootElement, strMode);
        };
        /**
         * 滚动视图到指定页
         * @param {number} intPageIndex 从0开始的页码
         * @returns {boolean} 操作是否成功
         */
        rootElement.MoveToPage = function (intPageIndex) { return WriterControl_UI.MoveToPage(rootElement, intPageIndex, true); };
        /**
         * 获得所有的页码数组
         * @returns {Array} 页码数组
         */
        rootElement.GetAllPageIndexs = function () { return WriterControl_UI.GetAllPageIndexs(rootElement); };
        /**
        * 打印整个文档 
        * @param {any} options 打印用的选项
        * @returns {boolean} 操作是否成功
        * */
        rootElement.PrintDocument = function (options) {
            return WriterControl_Print.Print(rootElement, options);
            //rootElement.__DCWriterReference.invokeMethod("PrintDocument");
        };
        /**
        * 清空打印预览控件
        * */
        rootElement.ClearDocument = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearDocumentForWriterPrintPreviewControl");
            //rootElement.__DCWriterReference.invokeMethod("PrintDocument");
        };
    },

    //*****************************************************************************************************
    //*****************************************************************************************************
    //*****************************************************************************************************
    //*****************************************************************************************************

    /**
     * 对根元素绑定一些方法供外面调用
     * @param {HTMLElement} rootElement 根元素对象
     * @param {object} refDCWriter DCWriterClass对象在JS中的代理
     */
    BindControlForWriterControlForWASM: function (rootElement, refDCWriter) {
        rootElement.__DCWriterReference = refDCWriter;
        rootElement.IsWriterPrintPreviewControlForWASM = false;
        /**
        * 获取支持的字体样式
        * @return obj 支持的字体样式的对象
        */
        rootElement.getSupportFontFamilys = function () {
            // 字体样式
            var dataFont = {
                windows: [{
                    ch: '宋体',
                    en: 'SimSun'
                }, {
                    ch: '黑体',
                    en: 'SimHei'
                }, {
                    ch: '微软雅黑',
                    en: 'Microsoft Yahei'
                }, {
                    ch: '微软正黑体',
                    en: 'Microsoft JhengHei'
                }, {
                    ch: '楷体',
                    en: 'KaiTi'
                }, {
                    ch: '新宋体',
                    en: 'NSimSun'
                }, {
                    ch: '仿宋',
                    en: 'FangSong'
                }],
                'OS X': [{
                    ch: '苹方',
                    en: 'PingFang SC'
                }, {
                    ch: '华文黑体',
                    en: 'STHeiti'
                }, {
                    ch: '华文楷体',
                    en: 'STKaiti'
                }, {
                    ch: '华文宋体',
                    en: 'STSong'
                }, {
                    ch: '华文仿宋',
                    en: 'STFangsong'
                }, {
                    ch: '华文中宋',
                    en: 'STZhongsong'
                }, {
                    ch: '华文琥珀',
                    en: 'STHupo'
                }, {
                    ch: '华文新魏',
                    en: 'STXinwei'
                }, {
                    ch: '华文隶书',
                    en: 'STLiti'
                }, {
                    ch: '华文行楷',
                    en: 'STXingkai'
                }, {
                    ch: '冬青黑体简',
                    en: 'Hiragino Sans GB'
                }, {
                    ch: '兰亭黑-简',
                    en: 'Lantinghei SC'
                }, {
                    ch: '翩翩体-简',
                    en: 'Hanzipen SC'
                }, {
                    ch: '手札体-简',
                    en: 'Hannotate SC'
                }, {
                    ch: '宋体-简',
                    en: 'Songti SC'
                }, {
                    ch: '娃娃体-简',
                    en: 'Wawati SC'
                }, {
                    ch: '魏碑-简',
                    en: 'Weibei SC'
                }, {
                    ch: '行楷-简',
                    en: 'Xingkai SC'
                }, {
                    ch: '雅痞-简',
                    en: 'Yapi SC'
                }, {
                    ch: '圆体-简',
                    en: 'Yuanti SC'
                }],
                'office': [{
                    ch: '幼圆',
                    en: 'YouYuan'
                }, {
                    ch: '隶书',
                    en: 'LiSu'
                }, {
                    ch: '华文细黑',
                    en: 'STXihei'
                }, {
                    ch: '华文楷体',
                    en: 'STKaiti'
                }, {
                    ch: '华文宋体',
                    en: 'STSong'
                }, {
                    ch: '华文仿宋',
                    en: 'STFangsong'
                }, {
                    ch: '华文中宋',
                    en: 'STZhongsong'
                }, {
                    ch: '华文彩云',
                    en: 'STCaiyun'
                }, {
                    ch: '华文琥珀',
                    en: 'STHupo'
                }, {
                    ch: '华文新魏',
                    en: 'STXinwei'
                }, {
                    ch: '华文隶书',
                    en: 'STLiti'
                }, {
                    ch: '华文行楷',
                    en: 'STXingkai'
                }, {
                    ch: '方正舒体',
                    en: 'FZShuTi'
                }, {
                    ch: '方正姚体',
                    en: 'FZYaoti'
                }],
                'open': [{
                    ch: '思源黑体',
                    en: 'Source Han Sans CN'
                }, {
                    ch: '思源宋体',
                    en: 'Source Han Serif SC'
                }, {
                    ch: '文泉驿微米黑',
                    en: 'WenQuanYi Micro Hei'
                }],
                'hanyi': [{
                    ch: '汉仪旗黑',
                    en: 'HYQihei 40S'
                }, {
                    ch: '汉仪旗黑',
                    en: 'HYQihei 50S'
                }, {
                    ch: '汉仪旗黑',
                    en: 'HYQihei 60S'
                }, {
                    ch: '汉仪大宋简',
                    en: 'HYDaSongJ'
                }, {
                    ch: '汉仪楷体',
                    en: 'HYKaiti'
                }, {
                    ch: '汉仪家书简',
                    en: 'HYJiaShuJ'
                }, {
                    ch: '汉仪PP体简',
                    en: 'HYPPTiJ'
                }, {
                    ch: '汉仪乐喵体简',
                    en: 'HYLeMiaoTi'
                }, {
                    ch: '汉仪小麦体',
                    en: 'HYXiaoMaiTiJ'
                }, {
                    ch: '汉仪程行体',
                    en: 'HYChengXingJ'
                }, {
                    ch: '汉仪黑荔枝',
                    en: 'HYHeiLiZhiTiJ'
                }, {
                    ch: '汉仪雅酷黑W',
                    en: 'HYYaKuHeiW'
                }, {
                    ch: '汉仪大黑简',
                    en: 'HYDaHeiJ'
                }, {
                    ch: '汉仪尚魏手书W',
                    en: 'HYShangWeiShouShuW'
                }],
                'fangzheng': [
                    { "ch": "方正粗雅宋简体", "en": "FZYaSongS-B-GB" },
                    { "ch": "方正报宋简体", "en": "FZBaoSong-Z04S" },
                    { "ch": "方正粗圆简体", "en": "FZCuYuan-M03S" },
                    { "ch": "方正大标宋简体", "en": "FZDaBiaoSong-B06S" },
                    { "ch": "方正大黑简体", "en": "FZDaHei-B02S" },
                    { "ch": "方正仿宋简体", "en": "FZFangSong-Z02S" },
                    { "ch": "方正黑体简体", "en": "FZHei-B01S" },
                    { "ch": "方正琥珀简体", "en": "FZHuPo-M04S" },
                    { "ch": "方正楷体简体", "en": "FZKai-Z03S" },
                    { "ch": "方正隶变简体", "en": "FZLiBian-S02S" },
                    { "ch": "方正隶书简体", "en": "FZLiShu-S01S" },
                    { "ch": "方正美黑简体", "en": "FZMeiHei-M07S" },
                    { "ch": "方正书宋简体", "en": "FZShuSong-Z01S" },
                    { "ch": "方正舒体简体", "en": "FZShuTi-S05S" },
                    { "ch": "方正水柱简体", "en": "FZShuiZhu-M08S" },
                    { "ch": "方正宋黑简体", "en": "FZSongHei-B07S" },
                    { "ch": "方正宋三简体", "en": "FZSong" },
                    { "ch": "方正魏碑简体", "en": "FZWeiBei-S03S" },
                    { "ch": "方正细等线简体", "en": "FZXiDengXian-Z06S" },
                    { "ch": "方正细黑一简体", "en": "FZXiHei I-Z08S" },
                    { "ch": "方正细圆简体", "en": "FZXiYuan-M01S" },
                    { "ch": "方正小标宋简体", "en": "FZXiaoBiaoSong-B05S" },
                    { "ch": "方正行楷简体", "en": "FZXingKai-S04S" },
                    { "ch": "方正姚体简体", "en": "FZYaoTi-M06S" },
                    { "ch": "方正中等线简体", "en": "FZZhongDengXian-Z07S" },
                    { "ch": "方正准圆简体", "en": "FZZhunYuan-M02S" },
                    { "ch": "方正综艺简体", "en": "FZZongYi-M05S" },
                    { "ch": "方正彩云简体", "en": "FZCaiYun-M09S" },
                    { "ch": "方正隶二简体", "en": "FZLiShu II-S06S" },
                    { "ch": "方正康体简体", "en": "FZKangTi-S07S" },
                    { "ch": "方正超粗黑简体", "en": "FZChaoCuHei-M10S" },
                    { "ch": "方正新报宋简体", "en": "FZNew BaoSong-Z12S" },
                    { "ch": "方正新舒体简体", "en": "FZNew ShuTi-S08S" },
                    { "ch": "方正黄草简体", "en": "FZHuangCao-S09S" },
                    { "ch": "方正少儿简体", "en": "FZShaoEr-M11S" },
                    { "ch": "方正稚艺简体", "en": "FZZhiYi-M12S" },
                    { "ch": "方正细珊瑚简体", "en": "FZXiShanHu-M13S" },
                    { "ch": "方正粗宋简体", "en": "FZCuSong-B09S" },
                    { "ch": "方正平和简体", "en": "FZPingHe-S11S" },
                    { "ch": "方正华隶简体", "en": "FZHuaLi-M14S" },
                    { "ch": "方正瘦金书简体", "en": "FZShouJinShu-S10S" },
                    { "ch": "方正细倩简体", "en": "FZXiQian-M15S" },
                    { "ch": "方正中倩简体", "en": "FZZhongQian-M16S" },
                    { "ch": "方正粗倩简体", "en": "FZCuQian-M17S" },
                    { "ch": "方正胖娃简体", "en": "FZPangWa-M18S" },
                    { "ch": "方正宋一简体", "en": "FZSongYi-Z13S" }, { "ch": "方正剪纸简体", "en": "FZJianZhi-M23S" },
                    { "ch": "方正流行体简体", "en": "FZLiuXingTi-M26S" },
                    { "ch": "方正祥隶简体", "en": "FZXiangLi-S17S" },
                    { "ch": "方正粗活意简体", "en": "FZCuHuoYi-M25S" },
                    { "ch": "方正胖头鱼简体", "en": "FZPangTouYu-M24S" },
                    { "ch": "方正卡通简体", "en": "FZKaTong-M19S" },
                    { "ch": "方正艺黑简体", "en": "FZYiHei-M20S" },
                    { "ch": "方正水黑简体", "en": "FZShuiHei-M21S" },
                    { "ch": "方正古隶简体", "en": "FZGuLi-S12S" }, { "ch": "方正幼线简体", "en": "FZYouXian-Z09S" },
                    { "ch": "方正启体简体", "en": "FZQiTi-S14S" },
                    { "ch": "方正小篆体", "en": "FZXiaoZhuanTi-S13T" },
                    { "ch": "方正硬笔楷书简体", "en": "FZYingBiKaiShu-S15S" },
                    { "ch": "方正毡笔黑简体", "en": "FZZhanBiHei-M22S" },
                    {
                        "ch": "方正硬笔行书简体", "en": "FZYingBiXingShu-S16S"
                    }]
            };
            // 支持的字体样式
            var supportFonts = [];
            var arrFont = dataFont['windows'].concat(dataFont['OS X'], dataFont['office'], dataFont['open']);
            arrFont.forEach((obj) => {
                var fontFamily = obj.en;
                if (isSupportFontFamily(fontFamily) && !arrFont[fontFamily]) {
                    supportFonts.push(obj);
                }
            });
            function isSupportFontFamily(fontFamily) {
                if (typeof fontFamily != 'string') {
                    return false;
                }

                var defaultFontFamily = 'Arial';
                if (fontFamily.toLowerCase() == defaultFontFamily.toLowerCase()) {
                    return true;
                }

                var defaultLetter = 'a';
                var defaultFontSize = 100;

                // 使用该字体绘制的canvas
                var width = 100, height = 100;
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d', { willReadFrequently: true });
                canvas.width = width;
                canvas.height = height;
                // 全局一致的绘制设定
                context.textAlign = 'center';
                context.fillStyle = 'black';
                context.textBaseline = 'middle';
                var getFontData = function (fontFamily) {
                    // console.log(fontFamily);
                    // 清除
                    context.clearRect(0, 0, width, height);
                    // 设置字体
                    context.font = defaultFontSize + 'px ' + fontFamily + ', ' + defaultFontFamily;
                    // console.log(context.font);
                    context.fillText(defaultLetter, width / 2, height / 2);
                    var data = [];
                    try {
                        data = context.getImageData(0, 0, width, height).data;
                    } catch (error) {

                    }
                    return [].slice.call(data).filter(function (value) {
                        return value != 0;
                    });
                };

                return getFontData(defaultFontFamily).join('') !== getFontData(fontFamily).join('');
            };
            return supportFonts;
        };
        /**
         * 获得所有的页码数组
         * @returns {Array} 页码数组
         */
        rootElement.GetAllPageIndexs = function () { return WriterControl_UI.GetAllPageIndexs(rootElement); };

        /**
         * 输出性能调试清单
         * @param {number} intSortMode 排序方式
         * @returns {string} 调试输出信息
         */
        rootElement.StopJIEJIEPerformanceCounter = function (intSortMode) {
            return rootElement.__DCWriterReference.invokeMethod("StopJIEJIEPerformanceCounter", intSortMode);
        };

        /**
         * 滚动视图到指定页
         * @param {number} intPageIndex 从0开始的页码
         * @returns {boolean} 操作是否成功
         */
        rootElement.MoveToPage = function (intPageIndex) { return WriterControl_UI.MoveToPage(rootElement, intPageIndex); };
        /**
         * 根据元素编号设置续打位置
         * @param {string} startElementID 续打开始元素编号
         * @param {string} endElementID 后端续打位置元素编号
         */
        rootElement.SetJumpPrintByElementID = function (startElementID, endElementID) {
            rootElement.__DCWriterReference.invokeMethod("SetJumpPrintByElementID", startElementID, endElementID);
        };
        /**
         * 打印到前端服务器，必须设置编辑器控件的PrintServerPageUrl属性。
         * @param {object} options 打印选项
         * @param {function} callBack 操作成功后的回调函数，参数为服务器返回值。
         * @returns 操作是否成功
         */
        rootElement.PrintToServer = function (options, callBack) {
            return WriterControl_Print.PrintToServer(rootElement, null, options, callBack);
        };
        /** //wyc20230519:增加与四代编辑器兼容的接口
         * 打印到前端服务器，必须设置编辑器控件的PrintServerPageUrl属性。
         * @param {object} options 打印选项JSON对象
         * @param {function} callBack 操作成功后的回调函数，参数为服务器返回值。
         * @returns 操作是否成功
         */
        rootElement.LocalPrintDocuments = function (options, callBack) {
            return WriterControl_Print.PrintToServer(rootElement, null, options, callBack);
        };
        /**
         * 打印为PDF文件
         * @param {any} options 打印选项
         * @param {any} callBack 操作成功后的回调函数，参数为包含PDF的blob对象，如果未指定回调函数则下载文件。
         * @returns 操作是否成功
         */
        rootElement.PrintAsPDF = function (options, callBack) {
            return WriterControl_Print.PrintAsPDF(rootElement, options, callBack);
        };
        /**
         * 打印为HTML文件
         * @param {any} options 打印选项
         * @param {any} callBack 操作成功后的回调函数，参数为包含HTML字符串，如果未指定回调函数则下载文件。
         * @param {object} {
         *     isPrint 是否需要打印 默认下载当为true/'true'时打印
         *     printCallback 值
         * }
         *  
         * @returns 操作是否成功
         */
        rootElement.PrintAsHtml = function (options, callBack, isPrint) {
            return WriterControl_Print.PrintAsHtml(rootElement, options, callBack);
        };

        /**
         * 打印html的方法
         */
        rootElement.PrintByHtml = function (htmlString) {
            htmlString = rootElement.GetPrintNowHTML(htmlString);
            var iframe1 = document.querySelector("iframe#printdoc");
            if (!iframe1) {
                var iframe1 = document.createElement("iframe");
                iframe1.id = "printdoc";
                document.body.appendChild(iframe1);
            }
            iframe1.style.display = "none";
            //iframe1.style.cssText = 'position: absolute;top: 0;left: 0;width: 1000px;height: 600px;'
            var win = iframe1.contentWindow;
            var doc1 = iframe1.contentWindow.document;
            doc1.documentElement.innerHTML = htmlString;

            win.onafterprint = function () {
                iframe1.remove();
            }
            var allImg = doc1.body.querySelectorAll('img');
            if (allImg != null && allImg.length > 0) {
                allImg[allImg.length - 1].onload = function () {
                    doc1.close()
                    win.focus();
                    win.print();
                }
            } else {
                doc1.close()
                win.focus();
                win.print();
            }
        };

        /**
         * 整理打印用的html的样式
         */
        rootElement.GetPrintNowHTML = function (xmlstring) {
            if (xmlstring == null) {
                return false;
            }
            var isLandscape = xmlstring.indexOf("landscape=\"True\"") == -1 ? false : true;
            var div = document.createElement("div");
            div.innerHTML = xmlstring;
            var dcRootCenter = div.querySelector("#dcRootCenter");
            // 20220413 xym GetPrintNowHTML添加判断避免传入字符串不是正常html
            if (!dcRootCenter) {
                return xmlstring;
            }
            var allHiddenEle = dcRootCenter.querySelectorAll('.hiddenforprint');
            for (var ele = 0; ele < allHiddenEle.length; ele++) {
                allHiddenEle[ele].remove();
            }
            var tables = dcRootCenter.querySelectorAll("table");
            for (var iCount = 0; iCount < tables.length; iCount++) {
                var table = tables[iCount];
                if (table.id == "dctable_AllContent") {
                    if (table.getAttribute("haspageborder") != "true") {
                        // 没有页面边框，则设置表格边框为空。
                        table.style.border = "0px none white";
                    }
                    if (table.style.removeAttribute) {
                        table.style.removeAttribute("border-radius");
                    }
                    table.style.borderRadius = "";
                    var contentRow = table.rows[0];
                    if (table.rows) {
                        contentRow = table.rows[0];
                    }
                    else if (table.firstChild.nodeName == "TD") {
                        contentRow = table.firstChild;
                    }
                    else if (table.firstChild.nodeName == "TBODY") {
                        contentRow = table.firstChild.firstChild;
                    }
                    if (contentRow != null) {
                        contentRow.removeAttribute("height");
                    }
                    for (var iCount2 = 0; iCount2 < contentRow.childNodes.length; iCount2++) {
                        var tdNode = contentRow.childNodes[iCount2];
                        if (tdNode.nodeName == "TD") {
                            if (tdNode.id == "dcGlobalRootElement") {
                                tdNode.width = "";
                            }
                        }
                    }
                } //if
            } //for
            var ps = "@page{margin-left:0cm;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;";
            if (isLandscape) {
                ps += "size: landscape;";
            }
            ps += "}";
            var html = "<html><head><style> P{margin:0px}  " + ps + " </style>";
            var styleString = "";
            var styleElement = div.querySelector("#dccontentstyle");
            if (styleElement != null) {
                styleString = styleElement.innerHTML;
            }
            styleElement = div.querySelector("#dccustomcontentstyle");
            if (styleElement != null) {
                styleString = styleString + "\r\n" + styleElement.innerHTML;
            }
            if (styleString.length > 0) {
                html = html + "<style>" + styleString + "</style>";
            }
            html = html + "<style>.hiddenforprint{display:none;}</style>";
            html = html + "</head><body style='padding-left:1px;padding-top:0px;padding-right:0px;padding-bottom:0px;margin:0px"
            html = html + "'>" + dcRootCenter.innerHTML;
            html = html + "</body></html>";
            return html;
        };

        /**
         * 查询编辑器命令状态
         * @param {string} strCommandName 编辑器命令名称
         * @returns {any} 状态信息
         */
        rootElement.GetCommandStatus = function (strCommandName) {
            return rootElement.__DCWriterReference.invokeMethod("GetCommandStatus", strCommandName);
        }
        /**
         * 触发事件
         * @param {string } strEventName 事件名称
         * @param {any} eventArgs 事件参数
         */
        rootElement.RaiseEvent = function (strEventName, eventArgs) {
            WriterControl_Event.InnerRaiseEvent(rootElement, strEventName, eventArgs);
        };
        ///**获得事件处理函数对象
        // * @param {string | Function} strEventName 事件名称
        // * @returns { Function | Array} 事件处理函数对象，如果为多个函数则返回一个数组
        // * 
        // */
        //rootElement.GetEventHandler = function (strEventName) {
        //    WriterControl_Event.InnerGetEventHandler(rootElement, strEventName);
        //};
        /**
         * 下载文件
         * @param {string} strFormat 文件格式
         * @param {string} strFileName 指定的文件名
         * @returns {boolean} 操作是否成功
         */
        rootElement.DownLoadFile = function (strFormat, strFileName) {
            return WriterControl_IO.DownLoadFile(rootElement, strFormat, strFileName);
        };

        /**
         * 设置缩放比率
         * @param {number} newZoomRate 新的缩放比率，必须在0.1到5之间
         * @returns {boolean} 操作是否修改缩放比率
         */
        rootElement.SetZoomRate = function (newZoomRate) {
            return WriterControl_UI.EditorSetZoomRate(rootElement, newZoomRate);
        };
        /**设置页面排版模式,可以为SingleColumn,MultiColumn,Horizontal
         * @param {string} strMode 排版类型，可以为SingleColumn,MultiColumn,Horizontal。
         */
        rootElement.SetPageLayoutMode = function (strMode) {
            WriterControl_UI.EditorSetPageLayoutMode(rootElement, strMode);
        };
        //以下绑定属性
        Object.defineProperty(rootElement, "FocusedPageIndexBase0", {
            get() { return this.__DCWriterReference.invokeMethod("get_FocusedPageIndexBase0"); }
        });
        Object.defineProperty(rootElement, "CurrentLineIndexInPage", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentLineIndexInPage"); }
        });
        Object.defineProperty(rootElement, "CurrentColumnIndex", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentColumnIndex"); }
        });
        Object.defineProperty(rootElement, "SelectionLength", {
            get() { return this.__DCWriterReference.invokeMethod("get_SelectionLength"); }
        });
        Object.defineProperty(rootElement, "SelectionStartPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_SelectionStartPosition"); }
        });
        Object.defineProperty(rootElement, "DocumentTitle", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentTitle"); },
            set(value) { this.invokeMethod("set_DocumentTitle", value); }
        });
        Object.defineProperty(rootElement, "FileFormat", {
            get() { return this.__DCWriterReference.invokeMethod("get_FileFormat"); },
            set(value) { this.invokeMethod("set_FileFormat", value); }
        });
        Object.defineProperty(rootElement, "Modified", {
            get() { return this.__DCWriterReference.invokeMethod("get_Modified"); },
            set(value) { this.invokeMethod("set_Modified", value); }
        });
        /**
        * 是否只读
        */
        Object.defineProperty(rootElement, "Readonly", {
            get() { return this.__DCWriterReference.invokeMethod("get_Readonly"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_Readonly", value); }
        });
        ///**
        //* 表单模式
        //*/
        //Object.defineProperty(rootElement, "FormView", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_FormView"); },
        //    set(value) { this.__DCWriterReference.invokeMethod("set_FormView", value); }
        //});
        /**
        * 阅读视图模式
        */
        Object.defineProperty(rootElement, "ReadViewMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_ReadViewMode"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_ReadViewMode", value); }
        });
        /**
        * 页眉页脚只读
        */
        Object.defineProperty(rootElement, "HeaderFooterReadonly", {
            get() { return this.__DCWriterReference.invokeMethod("get_HeaderFooterReadonly"); },
            set(value) { this.invokeMethod("set_HeaderFooterReadonly", value); }
        });
        /**
        * 绝对的是否占有焦点
        */
        Object.defineProperty(rootElement, "AbsoluteFocused", {
            get() { return this.__DCWriterReference.invokeMethod("get_AbsoluteFocused"); }
        });
        /**
        * 编辑器控件能接受的数据格式，包括粘贴操作和OLE拖拽操作获得的数据
        */
        Object.defineProperty(rootElement, "AcceptDataFormats", {
            get() { return this.__DCWriterReference.invokeMethod("get_AcceptDataFormats"); },
            set(value) { this.invokeMethod("set_AcceptDataFormats", value); }
        });
        /**
        * 获取或设置一个值，该值指示在控件中按 TAB 键时，是否在控件中键入一个 TAB 字符，而不是按选项卡的顺序将焦点移动到下一个控件。
        */
        Object.defineProperty(rootElement, "AcceptsTab", {
            get() { return this.__DCWriterReference.invokeMethod("get_AcceptsTab"); },
            set(value) { this.invokeMethod("set_AcceptsTab", value); }
        });
        /**
        * 显示在已经注册的页码标题文本后面的额外的页码标题文本。比如“授权给XX医院使用”。
        */
        Object.defineProperty(rootElement, "AdditionPageTitle", {
            get() { return this.__DCWriterReference.invokeMethod("get_AdditionPageTitle"); },
            set(value) { this.invokeMethod("set_AdditionPageTitle", value); }
        });
        /**
        * 能否直接拖拽文档内容
        */
        Object.defineProperty(rootElement, "AllowDragContent", {
            get() { return this.__DCWriterReference.invokeMethod("get_AllowDragContent"); },
            set(value) { this.invokeMethod("set_AllowDragContent", value); }
        });
        /**
        * 控件是否可以接受用户拖放到它上面的数据
        */
        Object.defineProperty(rootElement, "AllowDrop", {
            get() { return this.__DCWriterReference.invokeMethod("get_AllowDrop"); },
            set(value) { this.invokeMethod("set_AllowDrop", value); }
        });
        /**
        * 允许的事件名称列表。各个名称之间用逗号分开，名称不区分大小写。如果设置为空，则允许所有事件。
        */
        Object.defineProperty(rootElement, "AllowedEventNames", {
            get() { return this.__DCWriterReference.invokeMethod("get_AllowedEventNames"); },
            set(value) { this.invokeMethod("set_AllowedEventNames", value); }
        });
        /**
        * 编辑器宿主对象
        */
        Object.defineProperty(rootElement, "AppHost", {
            get() { return this.__DCWriterReference.invokeMethod("get_AppHost"); },
            set(value) { this.invokeMethod("set_AppHost", value); }
        });
        /**
        * 销毁控件的时候是否自动销毁快捷菜单
        */
        Object.defineProperty(rootElement, "AutoDisposeContextMenu", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoDisposeContextMenu"); },
            set(value) { this.invokeMethod("set_AutoDisposeContextMenu", value); }
        });
        /**
        * 销毁控件的时候是否自动销毁文档对象
        */
        Object.defineProperty(rootElement, "AutoDisposeDocument", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoDisposeDocument"); },
            set(value) { this.invokeMethod("set_AutoDisposeDocument", value); }
        });
        /**
        * 自动保存管理器
        */
        Object.defineProperty(rootElement, "AutoSaveManager", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoSaveManager"); },
            set(value) { this.invokeMethod("set_AutoSaveManager", value); }
        });
        /**
        * 本控件不能设置自动滚动
        */
        Object.defineProperty(rootElement, "AutoScroll", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoScroll"); },
            set(value) { this.invokeMethod("set_AutoScroll", value); }
        });
        /**
        * 
        */
        Object.defineProperty(rootElement, "AutoScrollMinSize", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoScrollMinSize"); },
            set(value) { this.invokeMethod("set_AutoScrollMinSize", value); }
        });
        /**
        * 自动设置文档的默认字体
        * 若该属性值为true，则编辑器会自动将控件的字体和前景色设置 到文档的默认字体和文本颜色。
        * 修改本属性值不会立即更新文档视图， 此时需要调用“UpdateDefaultFont( true )”来更新文档视图。
        */
        Object.defineProperty(rootElement, "AutoSetDocumentDefaultFont", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoSetDocumentDefaultFont"); },
            set(value) { this.invokeMethod("set_AutoSetDocumentDefaultFont", value); }
        });
        /**
        * 设置自动缩放
        */
        Object.defineProperty(rootElement, "AutoZoom", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoZoom"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_AutoZoom", value); }
        });
        /**
        * 背景颜色
        */
        Object.defineProperty(rootElement, "BackColor", {
            get() { return this.__DCWriterReference.invokeMethod("get_BackColor"); },
            set(value) { this.invokeMethod("set_BackColor", value); }
        });
        /**
        * 背景颜色字符串
        */
        Object.defineProperty(rootElement, "BackColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_BackColorString"); },
            set(value) { this.invokeMethod("set_BackColorString", value); }
        });
        /**
       * 后台运行模式
       * 后台模式下，任何控件、文档只读和授权内容保护无效，可以任意修改文档内容。 但仍然会根据需要留下历史修改痕迹。
       */
        Object.defineProperty(rootElement, "BackgroundMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_BackgroundMode"); },
            set(value) { this.invokeMethod("set_BackgroundMode", value); }
        });
        /**
       * 区域选择打印的信息
       */
        Object.defineProperty(rootElement, "BoundsSelection", {
            get() { return this.__DCWriterReference.invokeMethod("get_BoundsSelection"); },
            set(value) { this.invokeMethod("set_BoundsSelection", value); }
        });
        /**
        * 文档中包含的所有的复选框元素列表
        */
        Object.defineProperty(rootElement, "CheckBoxes", {
            get() { return this.__DCWriterReference.invokeMethod("get_CheckBoxes"); }
        });
        /**
       * 命令控制器对象
       */
        Object.defineProperty(rootElement, "CommandControler", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommandControler"); },
            set(value) { this.invokeMethod("set_CommandControler", value); }
        });
        /**
       * 命令状态需要刷新标识。
        *  当不能启用控件事件或者无法响应控件事件时，可以使用定时器来判断本属性值，
        *  如果本属性值为true， 则需要刷新应用程序界面按钮的状态，然后设置本属性值为false。 
        *  比如 void Timer_Intervel() { if (myWriterControl.CommandStateNeedRefreshFlag == true) { myWriterControl.CommandStateNeedRefreshFlag = false; ----此处编写刷新菜单按钮状态的代码---- } }
        *  在DCWriter内部会根据实时情况来自动设置本属性值为true，以标记应用程序需要刷新按钮状态了。
       */
        Object.defineProperty(rootElement, "CommandStateNeedRefreshFlag", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommandStateNeedRefreshFlag"); },
            set(value) { this.invokeMethod("set_CommandStateNeedRefreshFlag", value); }
        });
        /**
        * 批注使用的快键菜单
        */
        Object.defineProperty(rootElement, "CommentContextMenuStrip", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommentContextMenuStrip"); },
            set(value) { this.invokeMethod("set_CommentContextMenuStrip", value); }
        });
        /**
        * 即使在只读状态下是否能编辑文档批注
        */
        Object.defineProperty(rootElement, "CommentEditableWhenReadonly", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommentEditableWhenReadonly"); },
            set(value) { this.invokeMethod("set_CommentEditableWhenReadonly", value); }
        });
        /** 
         * 文档批注列表
         */
        Object.defineProperty(rootElement, "Comments", {
            get() { return this.__DCWriterReference.invokeMethod("get_Comments"); }
        });
        /**
       * 是否显示文档批注
       */
        Object.defineProperty(rootElement, "CommentVisibility", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommentVisibility"); },
            set(value) { this.invokeMethod("set_CommentVisibility", value); }
        });
        /** 
         * 文档内容视图高度
         */
        Object.defineProperty(rootElement, "ContentViewHeight", {
            get() { return this.__DCWriterReference.invokeMethod("get_ContentViewHeight"); }
        });
        /**
       * 快捷菜单管理器
       */
        Object.defineProperty(rootElement, "ContextMenuManager", {
            get() { return this.__DCWriterReference.invokeMethod("get_ContextMenuManager"); },
            set(value) { this.invokeMethod("set_ContextMenuManager", value); }
        });
        /**
       * 快键菜单
       */
        Object.defineProperty(rootElement, "ContextMenuStrip", {
            get() { return this.__DCWriterReference.invokeMethod("get_ContextMenuStrip"); },
            set(value) { this.invokeMethod("set_ContextMenuStrip", value); }
        });
        /**
       * 控件事件模板对象
       */
        Object.defineProperty(rootElement, "ControlEventTemplate", {
            get() { return this.__DCWriterReference.invokeMethod("get_ControlEventTemplate"); },
            set(value) { this.invokeMethod("set_ControlEventTemplate", value); }
        });
        /** 
         * 控件类型全名
         */
        Object.defineProperty(rootElement, "ControlTypeName", {
            get() { return this.__DCWriterReference.invokeMethod("get_ControlTypeName"); }
        });
        /**
       * 编辑器控件能创建的数据格式，这些数据将用于复制操作和OLE拖拽操作
       */
        Object.defineProperty(rootElement, "CreationDataFormats", {
            get() { return this.__DCWriterReference.invokeMethod("get_CreationDataFormats"); },
            set(value) { this.invokeMethod("set_CreationDataFormats", value); }
        });
        /** 
         * 当前光标所在的粗体样式
         */
        Object.defineProperty(rootElement, "CurrentBold", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentBold"); }
        });
        /** 
         * 当前文档批注对象
         */
        Object.defineProperty(rootElement, "CurrentComment", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentComment"); }
        });
        ///** 
        // * 当前插入点所在的元素
        // */
        //Object.defineProperty(rootElement, "CurrentElement", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_CurrentElement"); }
        //});
        /** 
         * 当前光标所在的字体名称
         */
        Object.defineProperty(rootElement, "CurrentFontName", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentFontName"); }
        });
        /** 
         * 当前光标所在的字体大小
         */
        Object.defineProperty(rootElement, "CurrentFontSize", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentFontSize"); }
        });
        ///** 
        // * 当前插入点所在的输入域元素
        // */
        //Object.defineProperty(rootElement, "CurrentInputField", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_CurrentInputField"); }
        //});
        /** 
         * 当前光标所在的斜体样式
         */
        Object.defineProperty(rootElement, "CurrentItalic", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentItalic"); }
        });
        /** 
         * 当前文本行
         */
        Object.defineProperty(rootElement, "CurrentLine", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentLine"); }
        });
        /** 
         * 当前页对象
         */
        Object.defineProperty(rootElement, "CurrentPage", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentPage"); }
        });
        /**
        * 背景颜色
        */
        Object.defineProperty(rootElement, "CurrentPageBorderColor", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentPageBorderColor"); },
            set(value) { this.invokeMethod("set_CurrentPageBorderColor", value); }
        });
        /**
        * 背景颜色字符串
        */
        Object.defineProperty(rootElement, "CurrentPageBorderColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentPageBorderColorString"); },
            set(value) { this.invokeMethod("set_CurrentPageBorderColorString", value); }
        });
        /** 
         * 当前段落对齐方式
         */
        Object.defineProperty(rootElement, "CurrentParagraphAlign", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentParagraphAlign"); }
        });
        /** 
         * 当前段落对象
         */
        Object.defineProperty(rootElement, "CurrentParagraphEOF", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentParagraphEOF"); }
        });
        /** 
         * 当前插入点所在的文档节对象
         */
        Object.defineProperty(rootElement, "CurrentSection", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSection"); }
        });
        /** 
         * 当前元素样式
         */
        Object.defineProperty(rootElement, "CurrentStyle", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentStyle"); }
        });
        /** 
         * 当前子文档节元素
         */
        Object.defineProperty(rootElement, "CurrentSubDocument", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSubDocument"); }
        });
        /** 
         * 当前光标所在的下标样式
         */
        Object.defineProperty(rootElement, "CurrentSubscript", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSubscript"); }
        });
        /** 
         * 当前光标所在的上标样式
         */
        Object.defineProperty(rootElement, "CurrentSuperscript", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSuperscript"); }
        });
        ///** 
        // * 当前插入点所在的表格元素
        // */
        //Object.defineProperty(rootElement, "CurrentTable", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_CurrentTable"); }
        //});
        ///** 
        // * 当前插入点所在的单元格元素
        // */
        //Object.defineProperty(rootElement, "CurrentTableCell", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_CurrentTableCell"); }
        //});
        ///** 
        // * 当前插入点所在的表格行元素
        // */
        //Object.defineProperty(rootElement, "CurrentTableRow", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_CurrentTableRow"); }
        //});
        /** 
         * 当前光标所在的下划线样式
         */
        Object.defineProperty(rootElement, "CurrentUnderline", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentUnderline"); }
        });
        /** 
         * 当前用户信息
         */
        Object.defineProperty(rootElement, "CurrentUser", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentUser"); }
        });
        /**
       * 默认打印机名称
       */
        Object.defineProperty(rootElement, "DefaultPrinterName", {
            get() { return this.__DCWriterReference.invokeMethod("get_DefaultPrinterName"); },
            set(value) { this.invokeMethod("set_DefaultPrinterName", value); }
        });
        /**
       * 文档对象
       */
        Object.defineProperty(rootElement, "Document", {
            //wyc20230704:修改前端获取文档对象的方法
            get() { return this.__DCWriterReference.invokeMethod("GetDocument"); },
            //set(value) { this.invokeMethod("set_Document", value); }
        });
        /** 
         * 文档行为选项
         */
        Object.defineProperty(rootElement, "DocumentBehaviorOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentBehaviorOptions"); }
        });
        /** 
         * 文档编辑选项
         */
        Object.defineProperty(rootElement, "DocumentEditOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentEditOptions"); }
        });
        ///** //wyc20230601取消，另外想办法初始化
        //* 文档设置
        //*/
        //Object.defineProperty(rootElement, "DocumentOptions", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_DocumentOptions"); },
        //    set(value) {
        //        console.log(value);
        //        //this.invokeMethod("set_DocumentOptions", value);
        //    }
        //});
        /**
        * 文档设置XML字符串
        */
        Object.defineProperty(rootElement, "DocumentOptionsXML", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentOptionsXML"); },
            set(value) { this.invokeMethod("set_DocumentOptionsXML", value); }
        });
        /** 
         * 文档安全选项
         */
        Object.defineProperty(rootElement, "DocumentSecurityOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentSecurityOptions"); }
        });
        /** 
        * 文档视图选项
        */
        Object.defineProperty(rootElement, "DocumentViewOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentViewOptions"); }
        });
        /**
        * 鼠标双击来编辑文档批注
        */
        Object.defineProperty(rootElement, "DoubleClickToEditComment", {
            get() { return this.__DCWriterReference.invokeMethod("get_DoubleClickToEditComment"); },
            set(value) { this.invokeMethod("set_DoubleClickToEditComment", value); }
        });
        /**
        * 是否允许控件的事件。
        * 如果本属性为false，则不触发任何编辑器的事件，不过System.Windows.Forms.Control中定义的事件仍然会触发。
        */
        Object.defineProperty(rootElement, "EnabledControlEvent", {
            get() { return this.__DCWriterReference.invokeMethod("get_EnabledControlEvent"); },
            set(value) { this.invokeMethod("set_EnabledControlEvent", value); }
        });
        /**
        * 是否允许触发文档元素级事件
        */
        Object.defineProperty(rootElement, "EnabledElementEvent", {
            get() { return this.__DCWriterReference.invokeMethod("get_EnabledElementEvent"); },
            set(value) { this.invokeMethod("set_EnabledElementEvent", value); }
        });
        /**
        * 是否允许续打
        */
        Object.defineProperty(rootElement, "EnableJumpPrint", {
            get() { return this.__DCWriterReference.invokeMethod("get_EnableJumpPrint"); },
            set(value) { this.invokeMethod("set_EnableJumpPrint", value); }
        });
        /**
        * 允许执行StartEditContent事件
        */
        Object.defineProperty(rootElement, "EnableUIEventStartEditContent", {
            get() { return this.__DCWriterReference.invokeMethod("get_EnableUIEventStartEditContent"); },
            set(value) { this.invokeMethod("set_EnableUIEventStartEditContent", value); }
        });
        /**
        * 从0开始计算的最后显示的页码号,为0表示没有设置。只有处于分页视图模式下该属性才有效。小于0则不启用该设置。
        */
        Object.defineProperty(rootElement, "EndPageIndex", {
            get() { return this.__DCWriterReference.invokeMethod("get_EndPageIndex"); },
            set(value) { this.invokeMethod("set_EndPageIndex", value); }
        });
        /**
        * 违禁关键字
        */
        Object.defineProperty(rootElement, "ExcludeKeywords", {
            get() { return this.__DCWriterReference.invokeMethod("get_ExcludeKeywords"); },
            set(value) { this.invokeMethod("set_ExcludeKeywords", value); }
        });
        /**
       * 是否显示扩展信息控件
       */
        Object.defineProperty(rootElement, "ExtInfoControlVisible", {
            get() { return this.__DCWriterReference.invokeMethod("get_ExtInfoControlVisible"); },
            set(value) { this.invokeMethod("set_ExtInfoControlVisible", value); }
        });
        /**
      * 扩展视图模式
      */
        Object.defineProperty(rootElement, "ExtViewMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_ExtViewMode"); },
            set(value) { this.invokeMethod("set_ExtViewMode", value); }
        });
        /**
      * 是否强制显示光标而不管控件是否获得输入焦点
      */
        Object.defineProperty(rootElement, "ForceShowCaret", {
            get() { return this.__DCWriterReference.invokeMethod("get_ForceShowCaret"); },
            set(value) { this.invokeMethod("set_ForceShowCaret", value); }
        });
        /** 
        * 表单数据组成在字典
        */
        Object.defineProperty(rootElement, "FormValues", {
            get() { return this.__DCWriterReference.invokeMethod("get_FormValues"); }
        });
        /** 
        * 表单数据组成的字符串数组，序号为偶数的元素为名称，序号为奇数的元素为数值。
        */
        Object.defineProperty(rootElement, "FormValuesArray", {
            get() { return this.__DCWriterReference.invokeMethod("get_FormValuesArray"); }
        });
        /** 
        * 获得各个表单数据组成的字符串，采用“名称=值&名称=值&名称=值”的形式， 模仿HTML提交表单数据的字符串格式，遇到HTML特殊字符会进行转义处理。
        */
        Object.defineProperty(rootElement, "FormValuesString", {
            get() { return this.__DCWriterReference.invokeMethod("get_FormValuesString"); }
        });
        /** 
        * XML格式的表单数据字典
        */
        Object.defineProperty(rootElement, "FormValuesXml", {
            get() { return this.__DCWriterReference.invokeMethod("get_FormValuesXml"); }
        });
        /**
      * 是否灰化显示不活跃的页眉页脚。默认true。
      */
        Object.defineProperty(rootElement, "GrayingDisabledHeaderFooter", {
            get() { return this.__DCWriterReference.invokeMethod("get_GrayingDisabledHeaderFooter"); },
            set(value) { this.invokeMethod("set_GrayingDisabledHeaderFooter", value); }
        });
        /**
        * 是否显示页眉页脚标记
        */
        Object.defineProperty(rootElement, "HeaderFooterFlagVisible", {
            get() { return this.__DCWriterReference.invokeMethod("get_HeaderFooterFlagVisible"); },
            set(value) { this.invokeMethod("set_HeaderFooterFlagVisible", value); }
        });
        /**
        * 当选择了文档内容时隐藏光标
        */
        Object.defineProperty(rootElement, "HideCaretWhenHasSelection", {
            get() { return this.__DCWriterReference.invokeMethod("get_HideCaretWhenHasSelection"); },
            set(value) { this.invokeMethod("set_HideCaretWhenHasSelection", value); }
        });
        /**
        * 高亮度显示区域
        */
        Object.defineProperty(rootElement, "HighlightRange", {
            get() { return this.__DCWriterReference.invokeMethod("get_HighlightRange"); },
            set(value) { this.invokeMethod("set_HighlightRange", value); }
        });
        /**
        * 高亮度显示区域
        */
        Object.defineProperty(rootElement, "HighlightRanges", {
            get() { return this.__DCWriterReference.invokeMethod("get_HighlightRanges"); },
            set(value) { this.invokeMethod("set_HighlightRanges", value); }
        });
        /** 
        * 鼠标悬停的元素
        */
        Object.defineProperty(rootElement, "HoverElement", {
            get() { return this.__DCWriterReference.invokeMethod("get_HoverElement"); }
        });
        /** 
        * 文档中所有的图片对象
        */
        Object.defineProperty(rootElement, "Images", {
            get() { return this.__DCWriterReference.invokeMethod("get_Images"); }
        });
        /**
        * 设置属性值为“南京都昌信息科技有限公司版权所有，盗版有奖举报电话13382028281，网站www.dcwriter.cn。”， 即可隐藏编辑器右下角的"内置都昌软件"字样。
        */
        Object.defineProperty(rootElement, "InnerSPBDCS", {
            get() { return this.__DCWriterReference.invokeMethod("get_InnerSPBDCS"); },
            set(value) { this.invokeMethod("set_InnerSPBDCS", value); }
        });
        /** 
        * 文档中包含的文本输入域列表对象
        */
        Object.defineProperty(rootElement, "InputFields", {
            get() { return this.__DCWriterReference.invokeMethod("get_InputFields"); }
        });
        /**
        * 当前是否处于插入模式,若处于插入模式,则光标比较细,否则处于改写模式,光标比较粗
        */
        Object.defineProperty(rootElement, "InsertMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_InsertMode"); },
            set(value) { this.invokeMethod("set_InsertMode", value); }
        });
        /**
        * 是否以管理员模式运行
        */
        Object.defineProperty(rootElement, "IsAdministrator", {
            get() { return this.__DCWriterReference.invokeMethod("get_IsAdministrator"); },
            set(value) { this.invokeMethod("set_IsAdministrator", value); }
        });
        /** 
        * 正在编辑文档元素数值
        */
        Object.defineProperty(rootElement, "IsEditingElementValue", {
            get() { return this.__DCWriterReference.invokeMethod("get_IsEditingElementValue"); }
        });
        /** 
        * 正在更新用户界面，用户界面被锁定了。
        */
        Object.defineProperty(rootElement, "IsUpdating", {
            get() { return this.__DCWriterReference.invokeMethod("get_IsUpdating"); }
        });
        /**
        * 续打信息
        */
        Object.defineProperty(rootElement, "JumpPrint", {
            get() { return this.__DCWriterReference.invokeMethod("get_JumpPrint"); },
            set(value) { this.invokeMethod("set_JumpPrint", value); }
        });
        /** 
        * 续打结束位置
        */
        Object.defineProperty(rootElement, "JumpPrintEndPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_JumpPrintEndPosition"); },
            set(value) { this.invokeMethod("set_JumpPrintEndPosition", value); }
        });
        /** 
        * 续打位置
        */
        Object.defineProperty(rootElement, "JumpPrintPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_JumpPrintPosition"); },
            set(value) { this.invokeMethod("set_JumpPrintPosition", value); }
        });
        /** 
        * 知识库对象
        */
        Object.defineProperty(rootElement, "KBLibrary", {
            get() { return this.__DCWriterReference.invokeMethod("get_KBLibrary"); },
            set(value) { this.invokeMethod("set_KBLibrary", value); }
        });
        /** 
        * 知识库文件URL
        */
        Object.defineProperty(rootElement, "KBLibraryUrl", {
            get() { return this.__DCWriterReference.invokeMethod("get_KBLibraryUrl"); },
            set(value) { this.invokeMethod("set_KBLibraryUrl", value); }
        });
        /** 
        * 最后一次操作产生的系统警告信息列表
        */
        Object.defineProperty(rootElement, "LastAlertInfos", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastAlertInfos"); }
        });
        /** 
        * 最后一次获得的事件消息对象
        */
        Object.defineProperty(rootElement, "LastEventMessage", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastEventMessage"); }
        });
        /** 
        * 最后一次的打印位置
        * 一般本属性和控件的JumpPrintPosition属性搭配使用.比如在打印后存储该属性值,下次打开文档后,再设置JumpPrintPosition属性值.能设置上次打印结束的位置为续打起始位置.
        */
        Object.defineProperty(rootElement, "LastPrintPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastPrintPosition"); },
            set(value) { this.invokeMethod("set_LastPrintPosition", value); }
        });
        /** 
        * 最后一次打印结果
        */
        Object.defineProperty(rootElement, "LastPrintResult", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastPrintResult"); },
            set(value) { this.invokeMethod("set_LastPrintResult", value); }
        });
        /** 
        * 最后一次用户界面事件的发生时间
        * 这里的用户界面事件包括鼠标键盘事件、OLE拖拽事件， 应用程序可以根据这个属性值来实现超时锁定用户界面的功能。
        */
        Object.defineProperty(rootElement, "LastUIEventTime", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastUIEventTime"); }
        });
        /** 
        * 授权信息显示模式
        */
        Object.defineProperty(rootElement, "LicenceDisplayMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_LicenceDisplayMode"); },
            set(value) { this.invokeMethod("set_LicenceDisplayMode", value); }
        });
        /** 
        * 锁定滚动位置
        */
        Object.defineProperty(rootElement, "LockScrollPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_LockScrollPosition"); },
            set(value) { this.invokeMethod("set_LockScrollPosition", value); }
        });
        /** 
        * 文档中包含的内容被修改的文本输入域列表对象
        */
        Object.defineProperty(rootElement, "ModifiedInputFields", {
            get() { return this.__DCWriterReference.invokeMethod("get_ModifiedInputFields"); }
        });
        /** 
        * 移动光标时是否自动滚动到光标区域
        */
        Object.defineProperty(rootElement, "MoveCaretWithScroll", {
            get() { return this.__DCWriterReference.invokeMethod("get_MoveCaretWithScroll"); },
            set(value) { this.invokeMethod("set_MoveCaretWithScroll", value); }
        });
        /** 
        * 移动焦点使用的快捷键
        */
        Object.defineProperty(rootElement, "MoveFocusHotKey", {
            get() { return this.__DCWriterReference.invokeMethod("get_MoveFocusHotKey"); },
            set(value) { this.invokeMethod("set_MoveFocusHotKey", value); }
        });
        /** 
        * 页面边界对齐方式
        */
        Object.defineProperty(rootElement, "PageAlignment", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageAlignment"); },
            set(value) { this.invokeMethod("set_PageAlignment", value); }
        });
        /** 
        * 页背景色
        */
        Object.defineProperty(rootElement, "PageBackColor", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageBackColor"); },
            set(value) { this.invokeMethod("set_PageBackColor", value); }
        });
        /** 
        * 页面背景文字字符串
        */
        Object.defineProperty(rootElement, "PageBackColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageBackColorString"); },
            set(value) { this.invokeMethod("set_PageBackColorString", value); }
        });
        /** 
       * 页面边框线颜色
       */
        Object.defineProperty(rootElement, "PageBorderColor", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageBorderColor"); },
            set(value) { this.invokeMethod("set_PageBorderColor", value); }
        });
        /** 
        * 页面边框颜色值
        */
        Object.defineProperty(rootElement, "PageBorderColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageBorderColorString"); },
            set(value) { this.invokeMethod("set_PageBorderColorString", value); }
        });
        /** 
        * 总页数
        */
        Object.defineProperty(rootElement, "PageCount", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageCount"); }
        });
        /** 
        * 设置或返回从1开始的当前页号
        */
        Object.defineProperty(rootElement, "PageIndex", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageIndex"); },
            set(value) { this.invokeMethod("set_PageIndex", value); }
        });
        /** 
        * 页面集合
        */
        Object.defineProperty(rootElement, "Pages", {
            get() { return this.__DCWriterReference.invokeMethod("get_Pages"); },
            set(value) { this.invokeMethod("set_Pages", value); }
        });
        /** 
        * 页面设置
        */
        Object.defineProperty(rootElement, "PageSettings", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageSettings"); },
            set(value) { this.invokeMethod("set_PageSettings", value); }
        });
        /** 
        * 处于页面视图模式时各个页面间的距离，像素为单位
        */
        Object.defineProperty(rootElement, "PageSpacing", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageSpacing"); },
            set(value) { this.invokeMethod("set_PageSpacing", value); }
        });
        /** 
        * 页面标题位置
        */
        Object.defineProperty(rootElement, "PageTitlePosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageTitlePosition"); },
            set(value) { this.invokeMethod("set_PageTitlePosition", value); }
        });
        /** 
        * 表示当前插入点位置信息的字符串
        */
        Object.defineProperty(rootElement, "PositionInfoText", {
            get() { return this.__DCWriterReference.invokeMethod("get_PositionInfoText"); }
        });
        /** 
        * 文档中包含的所有的单选框元素列表
        */
        Object.defineProperty(rootElement, "RadioBoxes", {
            get() { return this.__DCWriterReference.invokeMethod("get_RadioBoxes"); }
        });
        /** 
        * 在控件的获得/失去焦点事件时是否触发文档的获得/失去焦点事件
        */
        Object.defineProperty(rootElement, "RaiseDocumentFoucsEventWhenControlFocusEvent", {
            get() { return this.__DCWriterReference.invokeMethod("get_RaiseDocumentFoucsEventWhenControlFocusEvent"); },
            set(value) { this.invokeMethod("set_RaiseDocumentFoucsEventWhenControlFocusEvent", value); }
        });
        /** 
        * 注册码
        */
        Object.defineProperty(rootElement, "RegisterCode", {
            get() { return this.__DCWriterReference.invokeMethod("get_RegisterCode"); },
            set(value) { this.invokeMethod("set_RegisterCode", value); }
        });
        /** 
        * RTF文本
        */
        Object.defineProperty(rootElement, "RTFText", {
            get() { return this.__DCWriterReference.invokeMethod("get_RTFText"); },
            set(value) { this.invokeMethod("set_RTFText", value); }
        });
        /** 
        * 标尺背景色
        */
        Object.defineProperty(rootElement, "RuleBackColor", {
            get() { return this.__DCWriterReference.invokeMethod("get_RuleBackColor"); },
            set(value) { this.invokeMethod("set_RuleBackColor", value); }
        });
        /** 
        * 标尺是否可用
        */
        Object.defineProperty(rootElement, "RuleEnabled", {
            get() { return this.__DCWriterReference.invokeMethod("get_RuleEnabled"); },
            set(value) { this.invokeMethod("set_RuleEnabled", value); }
        });
        /** 
        * 标尺是否可见,为了提高兼容性，默认不显示标尺。
        */
        Object.defineProperty(rootElement, "RuleVisible", {
            get() { return this.__DCWriterReference.invokeMethod("get_RuleVisible"); },
            set(value) { this.invokeMethod("set_RuleVisible", value); }
        });
        /** 
        * 获得文档中文档节列表
        */
        Object.defineProperty(rootElement, "Sections", {
            get() { return this.__DCWriterReference.invokeMethod("get_Sections"); }
        });
        /** 
        * 文档中被选中的文字
        */
        Object.defineProperty(rootElement, "SelectedText", {
            get() { return this.__DCWriterReference.invokeMethod("get_SelectedText"); }
        });
        /** 
        * 文档选择的部分
        */
        Object.defineProperty(rootElement, "Selection", {
            get() { return this.__DCWriterReference.invokeMethod("get_Selection"); }
        });
        /** 
        * 是否显示提示文本
        */
        Object.defineProperty(rootElement, "ShowTooltip", {
            get() { return this.__DCWriterReference.invokeMethod("get_ShowTooltip"); },
            set(value) { this.invokeMethod("set_ShowTooltip", value); }
        });
        /** 
        * 加载文档时显示等待界面
        */
        Object.defineProperty(rootElement, "ShowWaittingUIForLoadingDocument", {
            get() { return this.__DCWriterReference.invokeMethod("get_ShowWaittingUIForLoadingDocument"); },
            set(value) { this.invokeMethod("set_ShowWaittingUIForLoadingDocument", value); }
        });
        /** 
        * 当前单选的文档元素对象
        * 当只选中一个文档元素对象，则返回给文档元素对象，如果没有选中元素 或者选中多个元素，则返回空。
        */
        Object.defineProperty(rootElement, "SingleSelectedElement", {
            get() { return this.__DCWriterReference.invokeMethod("get_SingleSelectedElement"); }
        });
        /** 
        * 状态文本
        */
        Object.defineProperty(rootElement, "StatusText", {
            get() { return this.__DCWriterReference.invokeMethod("get_StatusText"); },
            set(value) { this.invokeMethod("set_StatusText", value); }
        });
        /** 
        * 文档中包含的子文档对象列表
        */
        Object.defineProperty(rootElement, "SubDocuments", {
            get() { return this.__DCWriterReference.invokeMethod("get_SubDocuments"); }
        });
        /** 
        * 文档中所有的表格对象
        */
        Object.defineProperty(rootElement, "Tables", {
            get() { return this.__DCWriterReference.invokeMethod("get_Tables"); }
        });
        /** 
        * 控件数据
        */
        Object.defineProperty(rootElement, "Text", {
            get() { return this.__DCWriterReference.invokeMethod("get_Text"); },
            set(value) { this.invokeMethod("set_Text", value); }
        });
        ///** 
        //* 用户修改痕迹信息列表
        //*/
        //Object.defineProperty(rootElement, "UserTrackInfos", {
        //    get() { return this.__DCWriterReference.invokeMethod("get_UserTrackInfos"); }
        //});
        /** 
        * 页面显示模式
        */
        Object.defineProperty(rootElement, "ViewMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_ViewMode"); },
            set(value) { this.invokeMethod("set_ViewMode", value); }
        });
        /** 
        * XML文本
        */
        Object.defineProperty(rootElement, "XMLText", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLText"); },
            set(value) { this.invokeMethod("set_XMLText", value); }
        });
        /** 
        * 生成用于保存的XML字符串
        */
        Object.defineProperty(rootElement, "XMLTextForSave", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLTextForSave"); },
            set(value) { this.invokeMethod("set_XMLTextForSave", value); }
        });
        /** 
        * 未格式化的XML文本
        */
        Object.defineProperty(rootElement, "XMLTextUnFormatted", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLTextUnFormatted"); },
            set(value) { this.invokeMethod("set_XMLTextUnFormatted", value); }
        });
        /** 
        * 获得文档XML内容
        */
        Object.defineProperty(rootElement, "XMLTextWithDocumentState", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLTextWithDocumentState"); },
            set(value) { this.invokeMethod("set_XMLTextWithDocumentState", value); }
        });
        /** 
        * X方向缩放率
        */
        Object.defineProperty(rootElement, "XZoomRate", {
            get() { return this.__DCWriterReference.invokeMethod("get_XZoomRate"); },
            set(value) { this.invokeMethod("set_XZoomRate", value); }
        });
        /** 
        * Y方向缩放率
        */
        Object.defineProperty(rootElement, "YZoomRate", {
            get() { return this.__DCWriterReference.invokeMethod("get_YZoomRate"); },
            set(value) { this.invokeMethod("set_YZoomRate", value); }
        });

        //以下绑定方法
        /**
         * 添加缓存的项目列表
         * 在这里添加好项目列表后，只需要设置输入域对象的field.FieldSettings.ListSource.SourceName 等于这里的name参数值就能使用缓存的列表对象。
         * @param {string} name 名称 
         * @param {DCSoft.Writer.Data.ListItemCollection} items 缓存的项目列表 
         * @param {boolean} globalItems 是否为全局缓存
         * */
        rootElement.AddBufferedListItems = function (name, items, globalItems) {
            rootElement.__DCWriterReference.invokeMethod("AddBufferedListItems", name, items, globalItems);
        }
        /**
         * 添加快捷菜单项目
         * @param {string} elementType 菜单文本 
         * @param {string} text 菜单命令名称 
         * */
        rootElement.AddContextMenuItem = function (text, commandName) {
            rootElement.__DCWriterReference.invokeMethod("AddContextMenuItem", text, commandName);
        };
        /**
        * 添加文档元素的快键菜单
        * @param {string} elementTypeName 文档元素类型名称 
        * @param {string} name 菜单项目名称 
        * @param {string} commandName 绑定的编辑器命令 
        * @param {string} text 菜单项目文本 
        * */
        rootElement.AddContextMenuItemByTypeName = function (elementTypeName, name, commandName, text) {
            rootElement.__DCWriterReference.invokeMethod("AddContextMenuItemByTypeName", elementTypeName, name, commandName, text);
        };
        /**
        * 向文档元素快键菜单添加一个分隔条
        * @param {string} elementTypeName 文档元素类型名称 
        * */
        rootElement.AddContextMenuSeparatorByTypeName = function (elementTypeName) {
            rootElement.__DCWriterReference.invokeMethod("AddContextMenuSeparatorByTypeName", elementTypeName);
        };
        /**
        * 为下拉列表元素添加下拉列表项目
        * @param {string} id 元素编号 
        * @param {string} text 项目的文本值 
        * @param {string} Value 项目的数值 
        * @param {boolean} saveToXml 添加的项目是否保存在XML中 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.AddDropdownListItem = function (id, text, Value, saveToXml) {
            return rootElement.__DCWriterReference.invokeMethod("AddDropdownListItem", id, text, Value, saveToXml);
        };
        /**
        * 添加服务对象
        * @param {object} instance 服务对象 
        * */
        rootElement.AddServiceInstance = function (instance) {
            rootElement.__DCWriterReference.invokeMethod("AddServiceInstance", instance);
        };
        /**
        * 添加XML级联提供者对象
        * @param {string} providerName 级联提供者名称 
        * @param {string} xmlFileName 相关的XML文件名 
        * */
        rootElement.AddXMLLinkListProvider = function (providerName, xmlFileName) {
            rootElement.__DCWriterReference.invokeMethod("AddXMLLinkListProvider", providerName, xmlFileName);
        };
        /**
        * 追加新的子文档对象
        * @param {DCSoft.Writer.Dom.XTextSubDocumentElement} newSubDoc 子文档对象 
        * */
        rootElement.AppendSubDocument = function (newSubDoc) {
            rootElement.__DCWriterReference.invokeMethod("AppendSubDocument", newSubDoc);
        };
        /**
        * 附加文档元素的BeforeDropDown事件
        * @param {string} idList 元素编号列表 
        * @param {DCSoft.Writer.ElementCancelEventHandler} handler 事件委托对象 
        * */
        rootElement.AttachElementBeforeDropDownEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementBeforeDropDownEvent", idList, handler);
        };
        /**
        * 附加文档元素的ContentChanged事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象 
        * */
        rootElement.AttachElementContentChangedEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementContentChangedEvent", idList, handler);
        };
        /**
        * 附加文档元素的ContentChanging事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象 
        * */
        rootElement.AttachElementContentChangingEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementContentChangingEvent", idList, handler);
        };
        /**
        * 附加文档元素的Expression事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementExpressionEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementExpressionEvent", idList, handler);
        };
        /**
        * 附加文档元素的GotFocus事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementGotFocusEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementGotFocusEvent", idList, handler);
        };
        /**
        * 附加文档元素的KeyDown事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementKeyDownEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementKeyDownEvent", idList, handler);
        };
        /**
        * 附加文档元素的KeyPress事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementKeyPressEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementKeyPressEvent", idList, handler);
        };
        /**
        * 附加文档元素的KeyUp事件
       * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementKeyUpEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementKeyUpEvent", idList, handler);
        };
        /**
        * 附加文档元素的Load事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementLoadEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementLoadEvent", idList, handler);
        };
        /**
        * 附加文档元素的LostFocus事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementLostFocusEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementLostFocusEvent", idList, handler);
        };
        /**
        * 附加文档元素的MouseClick事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementMouseClickEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementMouseClickEvent", idList, handler);
        };
        /**
        * 附加文档元素的MouseDblClick事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementMouseDblClickEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementMouseDblClickEvent", idList, handler);
        };
        /**
         * 附加文档元素的MouseDown事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementMouseDownEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementMouseDownEvent", idList, handler);
        };
        /**
        * 附加文档元素的MouseEnter事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementMouseEnterEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementMouseEnterEvent", idList, handler);
        };
        /**
        * 附加文档元素的MouseLeave事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementMouseLeaveEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementMouseLeaveEvent", idList, handler);
        };
        /**
        * 附加文档元素的MouseMove事件
        * @param {string} containerHandle 元素编号列表 
        * @param {DCSoft.Writer.ContentChangedEventHandler} handler 事件委托对象
        * */
        rootElement.AttachElementMouseMoveEvent = function (idList, handler) {
            rootElement.__DCWriterReference.invokeMethod("AttachElementMouseMoveEvent", idList, handler);
        };
        /**
        * 删除自动保存的临时文件
        * @param {string} fileID 文件编号 
        * */
        rootElement.AutoSaveDelete = function (fileID) {
            rootElement.__DCWriterReference.invokeMethod("AutoSaveDelete", fileID);
        };
        /**
        * 是否存在自动保存的文件
        * @param {string} fileID 文件编号 
        * @param {boolean} confirm 是否提示用户 
        * @returns {boolean} 是否存在自动保存的文件
        * */
        rootElement.AutoSaveExists = function (fileID, confirm) {
            return rootElement.__DCWriterReference.invokeMethod("AutoSaveExists", fileID, confirm);
        };
        /**
        * 从自动保存中恢复文件内容
        * @param {string} fileID 文件编号 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.AutoSaveLoadDocument = function (fileID) {
            return rootElement.__DCWriterReference.invokeMethod("AutoSaveLoadDocument", fileID);
        };
        /**
        * 开始执行编辑元素内容值的操作
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.BeginEditElementValue = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("BeginEditElementValue", element);
        };
        /**
        * 开始执行编辑元素内容值的操作
        * @param {string} id 文档元素编号 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.BeginEditElementValueById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("BeginEditElementValueById", id);
        };
        /**
        * 显示插入知识库的弹出式列表
        * @returns {boolean} 操作是否成功
        * */
        rootElement.BeginInsertKB = function () {
            return rootElement.__DCWriterReference.invokeMethod("BeginInsertKB");
        };
        /**
        * 显示插入知识库的弹出式列表
        * @param {string} specifyText 指定的文本 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.BeginInsertKBSpecifyText = function (specifyText) {
            return rootElement.__DCWriterReference.invokeMethod("BeginInsertKBSpecifyText", specifyText);
        };
        /**
        * 开始更新内容，锁定用户界面
        * */
        rootElement.BeginUpdate = function () {
            rootElement.__DCWriterReference.invokeMethod("BeginUpdate");
        };
        /**
        * 取消当前的编辑元素内容的操作
        * @returns {boolean} 操作是否成功
        * */
        rootElement.CancelEditElementValue = function () {
            return rootElement.__DCWriterReference.invokeMethod("CancelEditElementValue");
        };
        /**
        * 判断是否允许执行SignBySignImage函数。
        * @returns {boolean} 是否允许执行
        * */
        rootElement.CanSignBySignImage = function () {
            return rootElement.__DCWriterReference.invokeMethod("CanSignBySignImage");
        };
        /**
         * 清空文档内容 
         * */
        rootElement.ClearContent = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearContent");
        };
        /**
        * 清空快捷菜单项目
        * */
        rootElement.ClearContextMenuItem = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearContextMenuItem");
        };
        /**
        * 清空当前签名数据
        * @returns {boolean} 操作是否修改了文档内容
        * */
        rootElement.ClearCurrentSign = function () {
            return rootElement.__DCWriterReference.invokeMethod("ClearCurrentSign");
        };
        /**
        * 清空内部的编辑器控件事件消息队列
        * */
        rootElement.ClearEventMessage = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearEventMessage");
        };
        /**
        * 清空内部的数据对象
        * */
        rootElement.ClearInnerDataObject = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearInnerDataObject");
        };
        /**
        * 清空重做 / 撤销操作信息
        * */
        rootElement.ClearUndo = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearUndo");
        };
        /**
        * 将控件客户区中的坐标转换为视图坐标
        * @param {number} x x坐标
        * @param {number} y y坐标
        * @returns {System.Drawing.Point} 新坐标
        * */
        rootElement.ClientPointToView = function (x, y) {
            return rootElement.__DCWriterReference.invokeMethod("ClientPointToView", x, y);
        };
        /**
        * 提交指定容器元素中的用户痕迹信息
        * @param {DCSoft.Writer.Dom.XTextContainerElement} element 容器文档元素对象 
        * @returns {boolean} 操作是否修改了文档内容
        * */
        rootElement.CommitContentUserTrace = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("CommitContentUserTrace", element);
        };
        /**
        * 提交指定容器元素中的用户痕迹信息
        * @param {string} id 文档元素编号 
        * @returns {boolean} 操作是否修改了文档内容
        * */
        rootElement.CommitContentUserTraceById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("CommitContentUserTraceById", id);
        };
        /**
        * 提交文档中所有的用户痕迹信息
        * @returns {boolean} 操作是否修改了文档内容
        * */
        rootElement.CommitDocumentUserTrace = function () {
            return rootElement.__DCWriterReference.invokeMethod("CommitDocumentUserTrace");
        };
        /**
        * 复制 
        * @returns {boolean} 是否成功 
        * */
        rootElement.Copy = function () {
            return rootElement.__DCWriterReference.invokeMethod("Copy");
        };
        /**
        * 创建一个文档内容查找替换器
        * @returns {DCSoft.Writer.Commands.IContentSearchReplacer} 
        * */
        rootElement.CreateContentSearchReplacer = function () {
            return rootElement.__DCWriterReference.invokeMethod("CreateContentSearchReplacer");
        };
        /**
        * 从系统剪切板创建文档对象
        * @returns {DCSoft.Writer.Dom.XTextDocument} 创建的文档对象
        * */
        rootElement.CreateDocumentFromClipboard = function () {
            return rootElement.__DCWriterReference.invokeMethod("CreateDocumentFromClipboard");
        };
        /**
        * 根据一个XML字符串创建一个文档元素对象
        * @param {string} xml XML字符串 
        * @returns {DCSoft.Writer.Dom.XTextElement} 创建的文档元素对象
        * */
        rootElement.CreateElementByXMLFragment = function (xml) {
            return rootElement.__DCWriterReference.invokeMethod("CreateElementByXMLFragment", xml);
        };
        /**
        * 根据知识库节点创建文档元素
        * @param {DCSoft.Writer.Data.CreateElementsByKBEntryEventArgs} args 参数 
        * */
        rootElement.CreateElementsByKBEntry = function (args) {
            rootElement.__DCWriterReference.invokeMethod("CreateElementsByKBEntry", args);
        };
        /**
         * 剪切 
         * @param {boolean} showUI 是否显示
         * @returns {boolean} 是否成功 
         * */
        rootElement.Cut = function (showUI) {
            return rootElement.__DCWriterReference.invokeMethod("Cut", showUI);
        };
        /**
        * 输出一行调试信息
        * @param {string} txt 文本 
        * */
        rootElement.DebugWriteLine = function (txt) {
            rootElement.__DCWriterReference.invokeMethod("DebugWriteLine", txt);
        };
        /**
        * 延时获得焦点
        * @param {number} interval 延时的毫秒数 
        * */
        rootElement.DelayFocus = function (interval) {
            rootElement.__DCWriterReference.invokeMethod("DelayFocus", interval);
        };
        /**
        * 删除选择区域
        * @param {boolean} showUI
        * */
        rootElement.DeleteSelection = function (showUI) {
            rootElement.__DCWriterReference.invokeMethod("DeleteSelection", showUI);
        };
        /**
        * 检测数据源填充操作导致的修改文档元素的个数，但不真正填充数据源，不会修改文档内容。
        * @returns {DCSoft.Writer.Dom.DetectResultForValueBindingModifiedList} 结果信息列表
        * */
        rootElement.DetectValueBindingModified = function () {
            return rootElement.__DCWriterReference.invokeMethod("DetectValueBindingModified");
        };
        /** 清理所有正在使用的资源
        * @param {boolean} disposing 如果应释放托管资源，为 true；否则为 false。 
        * */
        rootElement.Dispose = function () {
            if (rootElement.__DCWriterReference != null) {
                rootElement.__DCWriterReference.invokeMethod("Dispose");
                rootElement.__DCWriterReference = null;
            }
        };
        /**
        * 文档内容进行校验，返回校验结果
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {DCSoft.Writer.Dom.ValueValidateResultList} 
        * */
        rootElement.DocumentValueValidate = function () {
            return rootElement.__DCWriterReference.invokeMethod("DocumentValueValidate");
        };
        /**
         * 文档内容进行校验，返回校验结果
         * @returns {Array} 校验结果列表 
         */
        rootElement.DocumentValueValidateWithCreateDocumentComments = function () {
            return rootElement.__DCWriterReference.invokeMethod("DocumentValueValidateWithCreateDocumentComments");
        };
        /**
        * 文档内容进行校验，以XML形式返回校验结果
        * @returns {string} 
        * */
        rootElement.DocumentValueValidateXML = function () {
            return rootElement.__DCWriterReference.invokeMethod("DocumentValueValidateXML");
        };
        /**
        * 编辑文本标签元素在当前页面中显示的文本
        * @param {DCSoft.Writer.Dom.XTextLabelElement} lbl  
        * @returns {boolean} 操作是否成功
        * */
        rootElement.EditLabelPageText = function (lbl) {
            return rootElement.__DCWriterReference.invokeMethod("EditLabelPageText", lbl);
        };
        /**
        * 编辑器宿主对象
        * @returns {DCSoft.Writer.Controls.TextWindowsFormsEditorHost} 
        * */
        rootElement.EditorHost = function () {
            return rootElement.__DCWriterReference.invokeMethod("EditorHost");
        };

        /**
        * 结束更新内容，解锁用户界面
        * */
        rootElement.EndUpdate = function () {
            rootElement.__DCWriterReference.invokeMethod("EndUpdate");
        };
        /**
         * 执行编辑器命令
         * @param {string} strCommandName 命令名称
         * @param {boolean} bolShowUI 是否显示用户界面
         * @param {string} strParameter 参数
         * @returns {string} 执行结果
         */
        rootElement.ExecuteCommand = function (strCommandName, bolShowUI, strParameter) {

            return rootElement.__DCWriterReference.invokeMethod("ExecuteCommand", strCommandName, bolShowUI, strParameter);
        };
        /**
        * 执行命令
        * @param {string} strCommandName 命令文本
        * @param {DCSoft.Writer.Commands.WriterCommandEventArgs} args 参数
        * @returns {object} 执行命令后的结果
        * */
        rootElement.ExecuteCommandSpecifyArgs = function (commandName, args) {
            return rootElement.__DCWriterReference.invokeMethod("ExecuteCommandSpecifyArgs", commandName, args);
        };
        /**
        * 执行命令
        * @param {string} commandName 命令文本 
        * @param {boolean} showUI 是否允许显示用户界面 
        * @param {object} parameter 用户参数 
        * @param {boolean} raiseFromUI 用户界面操作而触发的命令 
        * @returns {object} 执行命令后的结果
        * */
        rootElement.ExecuteCommandSpecifyRaiseFromUI = function (commandName, showUI, parameter, raiseFromUI) {
            return rootElement.__DCWriterReference.invokeMethod("ExecuteCommandSpecifyRaiseFromUI", commandName, showUI, parameter, raiseFromUI);
        };
        /**
        * 执行文档元素默认方法
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * */
        rootElement.ExecuteElementDefaultMethod = function (element) {
            rootElement.__DCWriterReference.invokeMethod("ExecuteElementDefaultMethod", element);
        };
        ///**
        //* 将控件添加到指定句柄的窗体中
        //* @param {number} containerHandle 指定的窗体句柄对象 
        //* @returns {boolean} 操作是否成功
        //* */
        //rootElement.ExecuteGlobalScriptMethod = function (methodName, parameters, throwException) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteGlobalScriptMethod", methodName, parameters, throwException);
        //};
        ///**
        //* 执行脚本方法
        //* @param {string} methodName 方法名 
        //* @returns {object} 执行结果
        //* */
        //rootElement.ExecuteScriptMethod = function (methodName) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethod", methodName);
        //};
        ///**
        //* 执行脚本方法
        //* @param {string} methodName 脚本方法名称 
        //* @param {object} p1  
        //* @param {object} p2
        //* @param {object} p3
        //* @param {object} p4 
        //* @param {object} p5
        //* @param {object} p6  
        //* @returns {object} 执行结果
        //* */
        //rootElement.ExecuteScriptMethodExt = function (methodName, p1, p2, p3, p4, p5, p6) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodExt", methodName, p1, p2, p3, p4, p5, p6);
        //};
        ///**
        // * 执行脚本方法
        // * @param {string} methodName 脚本方法名称 
        // * @param {object} p1
        // * @param {object} p2
        // * @param {object} p3
        // * @param {object} p4 
        // * @param {object} p5
        // * @param {object} p6  
        // * @returns {boolean} 执行结果
        // * */
        //rootElement.ExecuteScriptMethodExtReturnBoolean = function (methodName, p1, p2, p3, p4, p5, p6) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodExtReturnBoolean", methodName, p1, p2, p3, p4, p5, p6);
        //};
        ///**
        // * 执行脚本方法
        // * @param {string} methodName 脚本方法名称 
        // * @param {object} p1  
        // * @param {object} p2
        // * @param {object} p3
        // * @param {object} p4
        // * @param {object} p5
        // * @param {object} p6  
        // * @returns {double} 执行结果
        // * */
        //rootElement.ExecuteScriptMethodExtReturnDouble = function (methodName, p1, p2, p3, p4, p5, p6) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodExtReturnDouble", methodName, p1, p2, p3, p4, p5, p6);
        //};
        ///**
        // * 执行脚本方法
        // * @param {string} methodName 脚本方法名称 
        // * @param {object} p1  
        // * @param {object} p2
        // * @param {object} p3
        // * @param {object} p4  
        // * @param {object} p5
        // * @param {object} p6  
        // * @returns {number} 执行结果
        // * */
        //rootElement.ExecuteScriptMethodExtReturnInt = function (methodName, p1, p2, p3, p4, p5, p6) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodExtReturnInt", methodName, p1, p2, p3, p4, p5, p6);
        //};
        ///**
        // * 执行脚本方法
        // * @param {string} methodName 脚本方法名称 
        // * @param {object} p1 
        // * @param {object} p2
        // * @param {object} p3
        // * @param {object} p4  
        // * @param {object} p5
        // * @param {object} p6  
        // * @returns {string} 执行结果
        // * */
        //rootElement.ExecuteScriptMethodExtReturnString = function (methodName, p1, p2, p3, p4, p5, p6) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodExtReturnString", methodName, p1, p2, p3, p4, p5, p6);
        //};
        ///**
        //* 将控件添加到指定句柄的窗体中
        //* @param {number} containerHandle 指定的窗体句柄对象 
        //* @returns {boolean} 操作是否成功
        //* */
        //rootElement.ExecuteScriptMethodReturnBoolean = function (methodName) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodReturnBoolean", methodName);
        //};
        ///**
        //* 执行脚本方法
        //* @param {string} methodName 方法名 
        //* @returns {double} 执行结果
        //* */
        //rootElement.ExecuteScriptMethodReturnDouble = function (methodName) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodReturnDouble", methodName);
        //};
        ///**
        //* 执行脚本方法
        //* @param {string} methodName 方法名 
        //* @returns {number} 执行结果
        //* */
        //rootElement.ExecuteScriptMethodReturnInt32 = function (methodName) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodReturnInt32", methodName);
        //};
        ///**
        //* 执行脚本方法
        //* @param {string} methodName 方法名 
        //* @returns {string} 执行结果
        //* */
        //rootElement.ExecuteScriptMethodReturnString = function (methodName) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteScriptMethodReturnString", methodName);
        //};
        /**
        * 以字符串的方式执行命令.
        * 命令字符串格式为“命令名称, 是否显示UI, 参数”, 例如“fileopen, false, c: \a.xml”
        * @param {string} command 命令文本 
        * @returns {object} 执行结果
        * */
        rootElement.ExecuteStringCommand = function (command) {
            return rootElement.__DCWriterReference.invokeMethod("ExecuteStringCommand", command);
        };
        ///**
        //* 单独执行一段外界注入的VB脚本代码
        //* @param {string} scriptText 脚本代码 
        //* @returns {object} 执行结果
        //* */
        //rootElement.ExecuteVBScript = function (scriptText) {
        //    return rootElement.__DCWriterReference.invokeMethod("ExecuteVBScript", scriptText);
        //};
        /**
        * 扩展的获得属性值
        * @param {string} name 属性名 
        * @returns {string} 字符串格式的属性值
        * */
        rootElement.ExtGetPropertyValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("ExtGetPropertyValue", name);
        };
        /**
        * 删除所有扩展信息
        * */
        rootElement.ExtInfoClear = function () {
            rootElement.__DCWriterReference.invokeMethod("ExtInfoClear");
        };
        /**
        * 删除指定分组的扩展信息
        * @param {string} groupName 组名 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.ExtInfoRemoveGroup = function (groupName) {
            return rootElement.__DCWriterReference.invokeMethod("ExtInfoRemoveGroup", groupName);
        };
        /**
        * 扩展的设置属性值
        * @param {string} name 属性名 
        * @param {string} strValue 字符串形式的属性值 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.ExtSetPropertyValue = function (name, strValue) {
            return rootElement.__DCWriterReference.invokeMethod("ExtSetPropertyValue", name, strValue);
        };
        /**
        * 高亮度提示文档元素
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @param {boolean} autoScroll 是否自动滚动 
        * */
        rootElement.FlashElement = function (element, autoScroll) {
            rootElement.__DCWriterReference.invokeMethod("FlashElement", element, autoScroll);
        };
        /**
        * 高亮度提示文档元素
        * @param {DCSoft.Writer.Dom.XTextElementList} elements 文档元素对象 
        * @param {boolean} autoScroll 是否自动滚动 
        * */
        rootElement.FlashElements = function (elements, autoScroll) {
            rootElement.__DCWriterReference.invokeMethod("FlashElements", elements, autoScroll);
        };
        /**
        * 编辑器控件获得输入焦点
        * @returns {boolean} 操作是否成功
        * */
        rootElement.Focus = function () {
            //处理在聚焦前把光标显示出来
            if (WriterControl_UI.oldCaretOption) {
                WriterControl_UI.ShowCaret(
                    WriterControl_UI.oldCaretOption.containerID,
                    WriterControl_UI.oldCaretOption.intPageIndex,
                    WriterControl_UI.oldCaretOption.intDX,
                    WriterControl_UI.oldCaretOption.intDY,
                    WriterControl_UI.oldCaretOption.intWidth,
                    WriterControl_UI.oldCaretOption.intHeight,
                    WriterControl_UI.oldCaretOption.bolVisible
                )
            }

            return rootElement.__DCWriterReference.invokeMethod("Focus");
        };
        /**
        * 让指定文档元素获得输入焦点
        * @param {string} id 元素编号 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.FocusElementById = function (id) {
            //处理在聚焦前把光标显示出来
            if (WriterControl_UI.oldCaretOption) {
                WriterControl_UI.ShowCaret(
                    WriterControl_UI.oldCaretOption.containerID,
                    WriterControl_UI.oldCaretOption.intPageIndex,
                    WriterControl_UI.oldCaretOption.intDX,
                    WriterControl_UI.oldCaretOption.intDY,
                    WriterControl_UI.oldCaretOption.intWidth,
                    WriterControl_UI.oldCaretOption.intHeight,
                    WriterControl_UI.oldCaretOption.bolVisible
                )
            }
            return rootElement.__DCWriterReference.invokeMethod("FocusElementById", id);
        };
        /**
        * 系统清理内存。这个过程是耗时间的。
        * */
        rootElement.GCCollect = function () {
            rootElement.__DCWriterReference.invokeMethod("GCCollect");
        };
        /**
        * 获得所有的字符串资源
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {System.Collections.Generic.Dictionary < string, string> } 字符串资源列表
        * */
        rootElement.GetAllResourceStringValue = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetAllResourceStringValue");
        };
        /**
        * 获得文档中绑定的数据源名称字符串列表。各个名称之间用逗号分开
        * @returns {string} 数据源名称列表
        * */
        rootElement.GetBindingDataSources = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetBindingDataSources");
        };
        /**
        * 获得缓存的项目列表
        * @param {string} name 名称 
        * @returns {DCSoft.Writer.Data.ListItemCollection} 获得的对象
        * */
        rootElement.GetBufferedListItems = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetBufferedListItems", name);
        };
        /**
        * 获得文档中所有的勾选的复选框元素的值
        * 例如调用 document.GetCheckedValueList(";", true, true, true, true) 返回类似字符串 “xbzw; 胸部正位; gpzw; 骨盆正位; fbww; 腹部卧位”
        * @param {string} spliter 各个项目之间的分隔字符串 
        * @param {boolean} includeCheckbox 是否包含复选框 
        * @param {boolean} includeRadio 是否包含单选框 
        * @param {boolean} includeElementID 是否包含元素ID号 
        * @param {boolean} includeElementName 是否包含元素Name属性值 
        * @returns {string} 获得的字符串
        * */
        rootElement.GetCheckedValueList = function (spliter, includeCheckbox, includeRadio, includeElementID, includeElementName) {
            return rootElement.__DCWriterReference.invokeMethod("GetCheckedValueList", spliter, includeCheckbox, includeRadio, includeElementID, includeElementName);
        };
        /**
        * 获得所有支持的命令名称组成的字符串，各个名称之间用逗号分开
        * @returns {string} 字符串列表
        * */
        rootElement.GetCommandNameList = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCommandNameList");
        };
        /**
        * 获得当前插入点所在的指定类型的文档元素对象
        * @param {string} typeName 指定的文档元素类型的名称 
        * @returns {DCSoft.Writer.Dom.XTextElement} 获得的文档元素对象
        * */
        rootElement.GetCurrentElementByTypeName = function (typeName) {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentElementByTypeName", typeName);
        };
        /**
        * 获得自定义属性值
        * @param {string} name 属性名 
        * @returns {string} 属性值
        * */
        rootElement.GetCustomAttribute = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetCustomAttribute", name);
        };
        /**
        * 获得描述数据源绑定信息的XML字符串
        * @returns {DCSoft.Writer.Dom.DataSourceBindingDescriptionList} 描述信息列表
        * */
        rootElement.GetDataSourceBindingDescriptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDataSourceBindingDescriptions");
        };
        /**
        * 获得描述数据源绑定信息的XML字符串
        * @returns {string} 描述数据源绑定信息的XML字符串。
        * */
        rootElement.GetDataSourceBindingDescriptionsXML = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDataSourceBindingDescriptionsXML");
        };
        /**
        * 检测数据源填充操作导致的修改文档元素的相关信息，但不真正填充数据源，不会修改文档内容。
        * @returns {string} 结果信息列表
        * */
        rootElement.GetDetectValueBindingModifiedMessage = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDetectValueBindingModifiedMessage");
        };
        /**
        * 获得参数是否有效
        * @param {string} parameterName 参数名 
        * @returns {boolean} 是否有效
        * */
        rootElement.GetDocumentParameterEnabled = function (parameterName) {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentParameterEnabled", parameterName);
        };
        /**
        * 获得Xml格式的文档参数值
        * @param {string} name 参数名 
        * @returns {string} 参数值
        * */
        rootElement.GetDocumentParameterValueXml = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentParameterValueXml", name);
        };
        /**
        * 
        * @param {string} name 参数名 
        * @returns {object} 获得文档参数值
        * */
        rootElement.GetDocumentParameterValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumnetParameterValue", name);
        };
        /**
        * 获得指定文档元素的属性
        * @param {string} id 元素编号 
        * @param {string} attributeName 属性名称
        * @returns {string} 属性值
        * */
        rootElement.GetElementAttribute = function (id, attributeName) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementAttribute", id, attributeName);
        };
        /**
        * 获得指定ID号的文档元素对象, 查找时ID值区分大小写的。
        * @param {string} id 编号 
        * @returns {DCSoft.Writer.Dom.XTextElement} 找到的文档元素对象
        * */
        rootElement.GetElementById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("DCGetElementProperties2", id);
            //return rootElement.__DCWriterReference.invokeMethod("GetElementById", id);
        };
        //wyc20230526:返回后台的C#对象
        rootElement.GetElementByIdExt = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementById", id);
            //return rootElement.__DCWriterReference.invokeMethod("GetElementById", id);
        };
        /**
        //* 获得文档中指定编号的元素对象, 查找时ID值区分大小写的。
        //* @param {string} id 指定的编号 
        //* @param {boolean} idAttributeOnly 只匹配元素ID属性
        //* @returns {DCSoft.Writer.Dom.XTextElement} 找到的元素对象
        //* */
        //rootElement.GetElementByIdExt = function (id, idAttributeOnly) {
        //    return rootElement.__DCWriterReference.invokeMethod("GetElementByIdExt", id, idAttributeOnly);
        //};

        /**
        * 获得控件客户区中指定位置处的文档元素对象
        * @param {number} x X坐标 
        * @param {number} y Y坐标 
        * @returns {DCSoft.Writer.Dom.XTextElement} 对象
        * */
        rootElement.GetElementByPosition = function (x, y) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementByPosition", x, y);
        };
        /**
        * 获得单复选框文档元素的勾选状态, 如果没找到元素则返回false。
        * @param {string} id 文档元素编号 
        * @returns {boolean} 元素的勾选状态
        * */
        rootElement.GetElementChecked = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementChecked", id);
        };
        /**
        * 获得指定的文档元素在编辑器控件客户区中的边界
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @returns {System.Drawing.Rectangle} 边界
        * */
        rootElement.GetElementClientBounds = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementClientBounds", element);
        };
        /**
        * 获得指定的文档元素在编辑器控件客户区中的边界的字符串值，为"left,top,width,height"格式.
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @returns {string} 边界
        * */
        rootElement.GetElementClientBoundsString = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementClientBoundsString", element);
        };
        /**
        * 获得指定元素使用的事件模板列表, 包含绑定的列表和相关的全局列表
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @returns {DCSoft.Writer.ElementEventTemplateList} 事件模板列表
        * */
        rootElement.GetElementEventTemplates = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementEventTemplates", element);
        };
        /**
        * 返回元素外置内容的文档XML字符串
        * @param {string} id 元素编号 
        * @returns {string} XML字符串
        * */
        rootElement.GetElementInnerXmlByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementInnerXmlByID", id);
        };
        /**
        * 返回元素内置内容的文档XML字符串
        * @param {string} id 元素编号 
        * @returns {string} XML字符串
        * */
        rootElement.GetElementOuterXmlByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementOuterXmlByID", id);
        };
        /**
        * 获得文档元素的自定义属性值
        * @param {string} id 元素编号 
        * @param {string} name 属性名 
        * @returns {string} 属性值
        * */
        rootElement.GetElementProperty = function (id, name) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementProperty", id, name);
        };
        /**
        * 获得文档中所有指定编号的元素对象列表, 查找时ID值区分大小写的。
        * @param {string} id 指定的编号 
        * @returns {DCSoft.Writer.Dom.XTextElementList} 找到的元素对象列表
        * */
        rootElement.GetElementsById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementsById", id);
        };
        /**
        * 获得文档中指定name值的元素对象, 查找时name值区分大小写的。
        * @param {string} name 指定的编号 
        * @returns {DCSoft.Writer.Dom.XTextElementList} 找到的元素对象
        * */
        rootElement.GetElementsByName = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementsByName", name);
        };
        ///**
        //* 获得文档中所有的指定类型的文档元素列表
        //* @param {string} elementTypeName 元素类型名称 
        //* @returns {DCSoft.Writer.Dom.XTextElementList} 获得的元素列表
        //* */
        //rootElement.GetElementsByTypeName = function (elementTypeName) {
        //    return rootElement.__DCWriterReference.invokeMethod("GetElementsByTypeName", elementTypeName);
        //};
        ///**
        //* 获得文档元素文本内容
        //* @param {string} id 元素编号 
        //* @returns {string} 获得的文本
        //* */
        //rootElement.GetElementTextByID = function (id) {
        //    return rootElement.__DCWriterReference.invokeMethod("GetElementTextByID", id);
        //};
        /**
        * 获得文档元素的可见性
        * @param {string} id 元素编号  
        * @returns {boolean} 可见性
        * */
        rootElement.GetElementVisible = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementVisible", id);
        };
        /**
        * 返回包含数据的XML片段, 本函数返回的XML字符串可以作为编辑器控件或文档对象的函数CreateElementByXMLFragment()的参数。
        * @param {string} id 元素编号   
        * @returns {string} 生成的XML片段字符串
        * */
        rootElement.GetElementXMLFragmentByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementXMLFragmentByID", id);
        };
        /**
        * 获得一个编辑器控件事件消息.只有当控件的EnabledControlEvent = false时，本函数才有效。
        * @returns {DCSoft.Writer.Controls.WriterControlEventMessage} 
        * */
        rootElement.GetEventMessage = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetEventMessage");
        };
        /**
        * 在子孙文档元素中获得第一个指定类型的文档元素，但不包括本元素本身。
        * @param {string} elementTypeName 文档元素类型名称
        * @returns {DCSoft.Writer.Dom.XTextElement} 获得的文档元素对象
        * */
        rootElement.GetFirstElementByTypeName = function (elementTypeName) {
            return rootElement.__DCWriterReference.invokeMethod("GetFirstElementByTypeName", elementTypeName);
        };
        /**
        * 
        * @param {string} fileName 
        * @returns {string} 
        * */
        rootElement.GetFormatFormFileExtentsion = function (fileName) {
            return rootElement.__DCWriterReference.invokeMethod("GetFormatFormFileExtentsion", fileName);
        };
        /**
        * 获得表单数据
        * @param {string} name 字段名称
        * @returns {string} 获得的表单数值
        * */
        rootElement.GetFormValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetFormValue", name);
        };
        /**
        * 获得DCWriter全局选项值
        * @param {string} name 选项名称
        * @returns {string} 选项值
        * */
        rootElement.GetGlobalOptionValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetGlobalOptionValue", name);
        };
        /**
        * 获得指定元素承载的对象
        * @param {DCSoft.Writer.Dom.XTextControlHostElement} element 文档元素对象 
        * @returns {object} 承载的对象
        * */
        rootElement.GetHostedInstance = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("GetHostedInstance", element);
        };
        /**
        * 获得文档Html文本
        * @returns {string} 文档Html文本
        * */
        rootElement.GetHtmlText = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetHtmlText");
        };
        /**
        * 获得文档的Html文本代码
        * @param {boolean} IncludeSelectionOnly 是否只包含选择区域
        * @returns {string} 文档Html文本
        * */
        rootElement.GetHtmlText = function (IncludeSelectionOnly) {
            return rootElement.__DCWriterReference.invokeMethod("GetHtmlText", IncludeSelectionOnly);
        };
        /**
        * 获得指定ID号的输入域对象, 查找时ID值区分大小写的。
        * @param {string} id ID号
        * @returns {boolean} 找到的输入域元素对象
        * */
        rootElement.GetInputFieldElementById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetInputFieldElementById", id);
        };
        /**
        * 获得指定编号的输入域的InnerValue属性值。
        * @param {string} id 输入域编号
        * @returns {string} 获得的属性值
        * */
        rootElement.GetInputFieldInnerValue = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetInputFieldInnerValue", id);
        };
        /**
        * 将控件添加到指定句柄的窗体中
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.GetLastCustomCommandName = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetLastCustomCommandName");
        };
        /**
        * 最后一次执行的自定义命令名称的文本
        * @returns {string} 
        * */
        rootElement.GetLastCustomCommandText = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetLastCustomCommandText");
        };
        /**
        * 获得收集到的事件名称列表，各个事件名称之间用逗号分开
        * 目前支持的事件名称有DocumentContentChanged、DocumentLoad、 SelectionChanged、SelectionChanging、StatusTextChanged。 
        * 当编辑器控件嵌入在HTML页面中运行时，JavaScript可能无法响应控件事件，此时可以调用定时器定期调用这个函数来获得已经触发的事件名称，然后进行事件处理。 
        * @returns {string} 事件名称列表
        * */
        rootElement.GetLastEventNames = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetLastEventNames");
        };
        /**
        * 获得导航节点字符串
        * @returns {string} 
        * */
        rootElement.GetNavigateNodesString = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetNavigateNodesString");
        };
        /**
        * 获得文档中指定类型的下一个元素
        * @param {DCSoft.Writer.Dom.XTextElement} startElement 开始查找的起始元素 
        * @param {string} nextElementTypeName 要查找的元素的类型的名称
        * @returns {DCSoft.Writer.Dom.XTextElement} 找到的元素
        * */
        rootElement.GetNextElementByTypeName = function (startElement, nextElementType) {
            return rootElement.__DCWriterReference.invokeMethod("GetNextElementByTypeName", startElement, nextElementType);
        };
        /**
        * 获得系统当前日期事件
        * @returns {Date} 日期时间
        * */
        rootElement.GetNowDateTime = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetNowDateTime");
        };
        /**
        * 获得指定名称的选项数值, 选项名称为“选项组名.选项名称”的格式，比如“ViewOptions.ShowParagraphFlag”。
        * 比如 string v = obj.GetOptionValue("ViewOptions.ShowParagraphFlag"); // 返回 "true"或"false"。
        * string v2 = obj.GetOptionValue("ViewOptions.TagColorForNormalField");// 返回类似"#AAAAAA"等表示颜色值的字符串。
        * @param {string} name 选项名称
        * @returns {string} 选项数值
        * */
        rootElement.GetOptionValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetOptionValue", name);
        };
        /**
        * 获得样式在列表中的编号
        * @param {string} styleString 样式字符串，比如“FontName: 宋体; FontSize: 9”
        * @returns {number} 编号
        * */
        rootElement.GetStyleIndexByString = function (styleString) {
            return rootElement.__DCWriterReference.invokeMethod("GetStyleIndexByString", styleString);
        };
        /**
        * 获得指定编号的子文档内容XML字符串
        * @param {string} id 子文档元素编号 
        * @returns {string} 获得的XML字符串
        * */
        rootElement.GetSubDoumentContentXmlByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetSubDoumentContentXmlByID", id);
        };
        /**
        * 获得指定页的剩余空白行数
        * @param {number} pageIndex 从1开始计算的页码号
        * @param {number} specifyLineHeight 指定的行高
        * @returns {number} 剩余的空白行数
        * */
        rootElement.GetSurplusLinesOfSpeifyPage = function (pageIndex, specifyLineHeight) {
            return rootElement.__DCWriterReference.invokeMethod("GetSurplusLinesOfSpeifyPage", pageIndex, specifyLineHeight);
        };
        /**
        * 获得指定表格中的指定单元格
        * @param {string} tableID 编号编号
        * @param {number} rowIndex 从0开始计算的行号
        * @param {number} colIndex 从0开始计算的列号
        * @returns {DCSoft.Writer.Dom.XTextTableCellElement} 获得的单元格对象
        * */
        rootElement.GetTableCell = function (tableID, rowIndex, colIndex) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableCell", tableID, rowIndex, colIndex);
        };
        /**
        * 获得表格单元格的文本内容
        * @param {string} tableID 编号
        * @param {number} rowIndex 从0开始计算的行号
        * @param {number} colIndex 从0开始计算的列号
        * @returns {string} 单元格文本
        * */
        rootElement.GetTableCellText = function (tableID, rowIndex, colIndex) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableCellText", tableID, rowIndex, colIndex);
        };
        ///**
        //* 获得指定ID号的表格对象, 查找时ID值区分大小写的。
        //* @param {string} id ID号 
        //* @returns {DCSoft.Writer.Dom.XTextTableElement} 找到的表格元素对象
        //* */
        //rootElement.GetTableElementById = function (id) {
        //    return rootElement.__DCWriterReference.invokeMethod("GetTableElementById", id);
        //};
        /**
        * 获得用于保存的XML内容的字节数组
        * @returns {byte[]} 
        * */
        rootElement.GetXMLTextForSaveBinary = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetXMLTextForSaveBinary");
        };
        ///**
        //* 处理退格键
        //* 当控件承载在IE浏览器中运行时，默认会按下Backspace键时浏览器会跳到上一个历史页面。 本控件提供一个HandleBackspace方法，而在浏览器中编写javascript函数响应浏览器的 onkeydown事件。若按键为backspace键，则javascript调用HandleBackspace方法。
        //* 若该方法返回true，表示编辑器处理了backspace事件。浏览器无需继续执行该方法。 若返回false，表示编辑器没有处理backspace事件，浏览器可按默认方式进行处理。
        //* @returns {boolean} 控件是否处理了backspace按键事件
        //* */
        //rootElement.HandleBackspace = function () {
        //    return rootElement.__DCWriterReference.invokeMethod("HandleBackspace");
        //};
        /**
        * 控件是否处于调试模式
        * @returns {boolean} 
        * */
        rootElement.InDesignMode = function () {
            return rootElement.__DCWriterReference.invokeMethod("InDesignMode");
        };
        /**
        * 在当前位置处插入子文档元素
        * @param {DCSoft.Writer.Dom.XTextSubDocumentElement} newSubDoc 要插入的子文档对象 
        * @param {boolean} insertUp true： 在上面插入；false： 在下面插入 
        * */
        rootElement.InsertSubDocuentAtCurrentPosition = function (newSubDoc, insertUp) {
            rootElement.__DCWriterReference.invokeMethod("InsertSubDocuentAtCurrentPosition", newSubDoc, insertUp);
        };
        /**
        * 设置指定的区域视图无效
        * @param {DCSoft.Writer.Dom.XTextRange} range 文档区域 
        * */
        rootElement.Invalidate = function (range) {
            rootElement.__DCWriterReference.invokeMethod("Invalidate", range);
        };
        /**
        * 判断指定名称的功能命令是否处于勾选状态
        * @param {string} commandName 功能命令名称
        * @returns {boolean} 功能命令是否处于勾选状态
        * */
        rootElement.IsCommandChecked = function (commandName) {
            return rootElement.__DCWriterReference.invokeMethod("IsCommandChecked", commandName);
        };
        /**
        * 判断指定名称功能命令是否可用
        * @param {string} commandName 功能命令名称
        * @returns {boolean} 功能命令是否可用
        * */
        rootElement.IsCommandEnabled = function (commandName) {
            return rootElement.__DCWriterReference.invokeMethod("IsCommandEnabled", commandName);
        };
        /**
        * 判断是否支持指定名称的功能命令
        * @param {string} commandName 功能命令名称
        * @returns {boolean} 是否支持功能命令
        * */
        rootElement.IsCommandSupported = function (commandName) {
            return rootElement.__DCWriterReference.invokeMethod("IsCommandSupported", commandName);
        };
        /**
        * 控件是否处于睡眠状态
        * @returns {boolean} 是否处于睡眠状态
        * */
        rootElement.IsSleeping = function () {
            return rootElement.__DCWriterReference.invokeMethod("IsSleeping");
        };
        /**
        * 判断是否为合法的XML字符串
        * @param {string} xml XML字符串 
        * @returns {boolean} 是否合法
        * */
        rootElement.IsValidateXML = function (xml) {
            return rootElement.__DCWriterReference.invokeMethod("IsValidateXML", xml);
        };
        /**
        * 以指定的格式从BASE64字符串加载文档内容
        * @param {string} text BASE64字符串
        * @param {string} format 文件格式 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.LoadDocumentFromBase64String = function (text, format, specifyLoadPart) {
            return WriterControl_IO.LoadDocumentFromString(rootElement, text, format, specifyLoadPart, true);
        };
        /**
        * 
        * @param {byte[]} bs 
        * @param {string} format
        * @returns {boolean} 操作是否成功
        * */
        rootElement.LoadDocumentFromBinary = function (bs, format) {
            return rootElement.__DCWriterReference.invokeMethod("LoadDocumentFromBinary", bs, format);
        };
        /**
        * 从指定的文件地址中加载文档
        * @param {string} url 文件地址
        * @param {string} format 文件格式
        * @returns {boolean} 是否成功加载文档
        * */
        rootElement.LoadDocumentFromFile = function (url, format) {
            //return rootElement.__DCWriterReference.invokeMethod("LoadDocumentFromBinary", url, format);
            //会出现跨域问题
            fetch(url)
                //转换格式 .then表示为前一个异步操作结束后如果成功则执行
                .then(res => res.blob())
                //格式转换后
                .then(blob => {
                    const reader = new FileReader()
                    reader.onload = function () {
                        // console.log(reader.result)
                        rootElement.LoadDocumentFromString(reader.result, format)
                    }
                    reader.readAsText(blob)
                })
                .catch(e => {
                    console.log(e)
                })
        };
        /**
         * 从一个字符串中加载文档
         * @param {string} strData 文件内容
         * @param {string} strFormat 文件格式
         * @returns {boolean} 操作是否成功
         */
        rootElement.LoadDocumentFromString = function (strData, strFormat, specifyLoadPart) {
            return WriterControl_IO.LoadDocumentFromString(rootElement, strData, strFormat, specifyLoadPart);
        };
        /**
        * 锁定文档元素的内容
        * @param {DCSoft.Writer.Dom.XTextContainerElement } element 文档元素，必须为容器类文档元素 
        * @param {string} containerHandle 指定的窗体句柄对象 
        * @param {string} containerHandle 指定的窗体句柄对象 
        * @param {boolean} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.LockContentByElement = function (element, userID, authoriseUserIDList, logUndo) {
            return rootElement.__DCWriterReference.invokeMethod("LockContentByElement", element, userID, authoriseUserIDList, logUndo);
        };
        /**
        * 锁定文档元素的内容
        * @param {string} elementID 元素编号，必须为一个容器类型的元素的编号 
        * @param {string} userID 锁定操作的用户ID
        * @param {string} authoriseUserIDList 授权操作的用户ID列表，各个列表之间用英文逗号分开
        * @param {boolean} logUndo 是否记录撤销操作信息
        * @returns {boolean} 操作是否成功
        * */
        rootElement.LockContentByElementID = function (elementID, userID, authoriseUserIDList, logUndo) {
            return rootElement.__DCWriterReference.invokeMethod("LockContentByElementID", elementID, userID, authoriseUserIDList, logUndo);
        };
        /**
        * 锁定文档元素的内容
        * @param {string} tableID 表格编号 
        * @param {number} rowIndexBase0 从0开始计算的表格行序号
        * @param {string} userID 锁定操作的用户ID
        * @param {string} authoriseUserIDList 授权操作的用户ID列表，各个列表之间用英文逗号分开
        * @param {boolean} logUndo 是否记录撤销操作信息
        * @returns {boolean} 操作是否成功
        * */
        rootElement.LockContentByTableRow = function (tableID, rowIndexBase, userID, authoriseUserIDList, logUndo) {
            return rootElement.__DCWriterReference.invokeMethod("LockContentByTableRow", tableID, rowIndexBase, userID, authoriseUserIDList, logUndo);
        };
        /**
        * 移动光标到下一行
        * */
        rootElement.MoveDownOneLine = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveDownOneLine");
        };
        /**
        * 移动光标到行尾
        * */
        rootElement.MoveEnd = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveEnd");
        };
        /**
        * 移动光标到行首
        * */
        rootElement.MoveHome = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveHome");
        };
        /**
        * 向左移动光标
        * */
        rootElement.MoveLeft = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveLeft");
        };
        /**
        * 向右移动光标
        * */
        rootElement.MoveRight = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveRight");
        };
        /**
        * 将插入点移动到指定位置
        * @param {DCSoft.Writer.MoveTarget} target 移动的目标 
        * */
        rootElement.MoveTo = function (target) {
            rootElement.__DCWriterReference.invokeMethod("MoveTo", target);
        };
        /**
        * 移动当前光标位置到指定客户区坐标位置处
        * @param {number} clientX 控件客户区X坐标，像素单位
        * @param {number} clientY 控件客户区Y坐标，像素单位
        * @returns {boolean} 操作是否修改了插入点
        * */
        rootElement.MoveToClientPosition = function (clientX, clientY) {
            return rootElement.__DCWriterReference.invokeMethod("MoveToClientPosition", clientX, clientY);
        };
        /**
        * 跳到指定页, 页号从0开始计算。
        * @param {number} index 从0开始的页号 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.MoveToPage = function (index) {
            return rootElement.__DCWriterReference.invokeMethod("MoveToPage", index);
        };
        /**
        * 移动光标到指定位置处
        * @param {number} index 位置序号
        * */
        rootElement.MoveToPosition = function (index) {
            rootElement.__DCWriterReference.invokeMethod("MoveToPosition", index);
        };
        /**
        * 移动光标到上一行
        * */
        rootElement.MoveUpOneLine = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveUpOneLine");
        };
        ///**
        //* 原始的触发事件
        //* @param {string} eventName 事件名称
        //* @param {object} p1
        //* @param {object} p2
        //* @param {object} p3
        //* @param {object} p4
        //* */
        //rootElement.NativeRaiseEvent = function (eventName, p1, p2, p3, p4) {
        //    rootElement.__DCWriterReference.invokeMethod("NativeRaiseEvent", eventName, p1, p2, p3, p4);
        //};
        /**
        * 导航到节点指定的位置
        * @param {DCSoft.Writer.NavigateNode} node 节点
        * @returns {boolean} 操作是否成功
        * */
        rootElement.Navigate = function (node) {
            return rootElement.__DCWriterReference.invokeMethod("Navigate", node);
        };
        /**
        * 导航到指定编号的节点的位置
        * @param {string} id 节点编号
        * @returns {boolean} 操作是否成功
        * */
        rootElement.NavigateByNodeID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("NavigateByNodeID", id);
        };
        ///**
        //* 导航到指定的用户痕迹信息
        //* @param {DCSoft.Writer.UserTrackInfo} info 用户痕迹信息对象
        //* @returns {boolean} 操作是否成功
        //* */
        //rootElement.NavigateByUserTrackInfo = function (info) {
        //    return rootElement.__DCWriterReference.invokeMethod("NavigateByUserTrackInfo", info);
        //};
        /**
        * 触发EventAfterLoadRawDOM事件
        * 这是一个比较底层的事件，在加载文档的DOM模型后触发，而且在AfterLoad之前触发。
        * @param {DCSoft.Writer.WriterEventArgs}args 事件参数
        * */
        rootElement.OnEventAfterLoadRawDOM = function (args) {
            rootElement.__DCWriterReference.invokeMethod("OnEventAfterLoadRawDOM", args);
        };
        /**
         * 触发EventUIStartEditContent事件
         * @param {DCSoft.Writer.WriterStartEditEventArgs}args 事件参数
         * */
        rootElement.OnEventUIStartEditContent = function (args) {
            rootElement.__DCWriterReference.invokeMethod("OnEventUIStartEditContent", args);
        };
        /**
        * 查询下拉列表项目
        * @param {DCSoft.Writer.Controls.QueryListItemsEventArgs} args 参数
        * */
        rootElement.OnQueryListItems = function (args) {
            rootElement.__DCWriterReference.invokeMethod("OnQueryListItems", args);
        };
        /**
         * 粘贴 
         * */
        rootElement.Paste = function () {
            rootElement.__DCWriterReference.invokeMethod("Paste");
        };
        /**
        * 预加载部分程序功能
        * */
        rootElement.PreloadSystem = function () {
            rootElement.__DCWriterReference.invokeMethod("PreloadSystem");
        };
        /**
        * 打印当前页
        * */
        rootElement.PrintCurrentPage = function () {
            rootElement.__DCWriterReference.invokeMethod("PrintCurrentPage");
        };
        /** 关闭打印预览界面，恢复编辑界面 */
        rootElement.ClosePrintPreview = function () {
            WriterControl_Print.ClosePrintPreview(rootElement, true);
            WriterControl_Paint.InvalidateAllView(rootElement);
        };
        /**
         * 展示打印预览界面
         * @param {any} options 选项
         */
        rootElement.LoadPrintPreview = function (options) {
            WriterControl_Print.PrintPreview(rootElement, options);
        };
        /** wyc20230628:兼容四代接口
         * 展示打印预览界面
         * @param {any} options 选项
         */
        rootElement.LoadPrintPreviewWithPermissionMark = function (options) {
            if (typeof (options) === "object") {
                options.CleanMode = false;
            } else {
                options = new Object();
                options.CleanMode = false;
            }
            WriterControl_Print.PrintPreview(rootElement, options);
        };
        /**
         * 判断是否为打印预览
         * @returns {boolean} 操作是否成功
         */
        rootElement.IsPrintPreview = function () {
            var IsPrintPreview = false;
            //判断是否存在dctype="page-printpreview"
            if (rootElement != null) {
                var hasPrintPreview = rootElement.querySelector('[dctype=page-printpreview]');
                if (hasPrintPreview) {
                    IsPrintPreview = true;
                }
            }
            return IsPrintPreview;
        }

        /**
         * 打印整个文档 
         * @param {any} options 打印用的选项
         * @returns {boolean} 操作是否成功
         * */
        rootElement.PrintDocument = function (options) {
            return WriterControl_Print.Print(rootElement, options);
            //rootElement.__DCWriterReference.invokeMethod("PrintDocument");
        };
        /**
        * 指定页码打印文档，页码是从1开始计算的。但是这个起始页码也可以由SetGlobalPageIndexoffset()修改。
        * 比如 ctl.PrintDocumentExt(true, "1,3,5,7,9");
        * @param {boolean} showDialog 是否显示打印机选择对话框
        * @param {string} specifyPageIndexs 指定的页码，各个页码之间用逗号分开，页码是从1开始计算的，如果为空则打印整个文档 
        * */
        rootElement.PrintDocumentExt = function (showDialog, specifyPageIndexs) {
            rootElement.__DCWriterReference.invokeMethod("PrintDocumentExt", showDialog, specifyPageIndexs);
        };
        /**
        * 主动的触发文档元素的内容发生改变事件
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象
        * */
        rootElement.RaiseElementContentChangedEvent = function (element) {
            rootElement.__DCWriterReference.invokeMethod("RaiseElementContentChangedEvent", element);
        };
        /**
        * 重新创建视图控件的句柄，类似重启编辑器控件。
        * */
        rootElement.RecreateViewControlHandle = function () {
            rootElement.__DCWriterReference.invokeMethod("RecreateViewControlHandle");
        };
        /**
         * 重做 
         * */
        rootElement.Redo = function () {
            rootElement.__DCWriterReference.invokeMethod("Redo");
        };
        /**
        * 重新绘制文档
        * */
        rootElement.RedrawDocument = function () {
            rootElement.__DCWriterReference.invokeMethod("RedrawDocument");
        };
        /**
        * 通过反射来执行指定编号的文档元素的方法。本方法用于解决COM编程接口不稳定的问题。
        * 例如 ctl.ReflectionCallElementMethod("field1", "Select", null, null, null, null, null, null);
        * @param {string} id 元素编号
        * @param {string} path 方法路径, 可以使用"属性名1.属性名2.属性名3.方法名"的方式来深入调用方法
        * @param {string} parameter1 
        * @param {string} parameter2 
        * @param {string} parameter3
        * @param {string} parameter4  
        * @param {string} parameter5  
        * @param {string} parameter6  
        * @returns {string} 方法返回值转换的字符串，对于void类型返回【null】。
        * */
        rootElement.ReflectionCallElementMethod = function (id, path, parameter1, parameter2, parameter3, parameter4, parameter5, parameter6) {
            return rootElement.__DCWriterReference.invokeMethod("ReflectionCallElementMethod", id, path, parameter1, parameter2, parameter3, parameter4, parameter5, parameter6);
        };
        /**
        * 通过反射来获得指定编号的元素的属性值。本方法用于解决COM编程接口不稳定的问题。
        * 例如 var strStyle = ctl.ReflectionGetElementPropertyValue("field1", "FieldSettings.EditStyle");
        * @param {string} id 元素编号
        * @param {string} path 属性路径，各个属性名称之间用点号分开。
        * @returns {string} 获得的属性值转换的字符串
        * */
        rootElement.ReflectionGetElementPropertyValue = function (id, path) {
            return DotNet.invokeMethod(window.ReflectionGetElementPropertyValue, "ReadFileContent", id, path);
        };
        /**
        * 通过反射来设置指定编号的文档元素的属性值。本方法用于解决COM编程接口不稳定的问题。
        * 例如 ctl.ReflectionGetElementPropertyValue("field1", "FieldSettings.EditStyle", "DropdownList");
        * 例如 var strStyle = ctl.ReflectionGetElementPropertyValue("field1", "FieldSettings.EditStyle");
        * @param {string} id 元素编号
        * @param {string} path 属性路径，各个属性名称之间用点号分开。
        * @param {string} newValue 新的属性值
        * @returns {boolean} 操作是否成功
        * */
        rootElement.ReflectionSetElementPropertyValue = function (id, path, newValue) {
            return DotNet.invokeMethod(window.ReflectionSetElementPropertyValue, "ReadFileContent", id, path, newValue);
        };
        /**
        * 刷新命令的用户界面中的状态
        * */
        rootElement.RefreshCommandUIState = function () {
            rootElement.__DCWriterReference.invokeMethod("RefreshCommandUIState");
        };
        /**
        * 刷新 
        * */
        rootElement.RefreshDocument = function () {

            //wyc20230609:换个写法试试
            rootElement.__DCWriterReference.invokeMethod("RefreshInnerView", false);
            WriterControl_Paint.InvalidateAllView(rootElement);
        };
        /**
        * 刷新文档
        * @param {boolean} refreshSize 是否重新计算元素大小
        * @param {boolean} executeLayout 是否进行文档内容重新排版
        * */
        rootElement.RefreshDocumentExt = function (refreshSize, executeLayout) {
            rootElement.__DCWriterReference.invokeMethod("RefreshDocumentExt", refreshSize, executeLayout);
        };
        /**
        * 刷新文档排版
        * */
        rootElement.RefreshDocumentLayout = function () {
            rootElement.__DCWriterReference.invokeMethod("RefreshDocumentLayout");
        };
        /**
        * 刷新文档内部排版和分页。不更新用户界面。
        * @param {boolean} fastMode 
        * */
        rootElement.RefreshInnerView = function (fastMode) {
            rootElement.__DCWriterReference.invokeMethod("RefreshInnerView", fastMode);
        };
        /**
        * 拒绝对文档的修订
        * @returns {boolean} 操作是否修改了文档内容
        * */
        rootElement.RejectUserTrace = function () {
            return rootElement.__DCWriterReference.invokeMethod("RejectUserTrace");
        };
        /**
        * 删除指定文档元素类型的快键菜单项目
        * @param {string} elementTypeName 类型名称 
        * @param {string} name 菜单名称
        * @returns {boolean} 操作是否成功
        * */
        rootElement.RemoveContextMenuItemByTypeName = function (elementTypeName, name) {
            rootElement.__DCWriterReference.invokeMethod("RemoveContextMenuItemByTypeName", elementTypeName, name);
        };
        /**
        * 重置自动保存任务
        * */
        rootElement.ResetAutoSaveTask = function () {
            rootElement.__DCWriterReference.invokeMethod("ResetAutoSaveTask");
        };
        /**
        * 重置表单元素默认值
        * @returns {boolean} 是否导致文档内容发生改变
        * */
        rootElement.ResetFormValue = function () {
            return rootElement.__DCWriterReference.invokeMethod("ResetFormValue");
        };
        /**
        * 重新设置OutlineNodes属性值
        * */
        rootElement.ResetOutlineNodes = function () {
            return rootElement.__DCWriterReference.invokeMethod("ResetOutlineNodes");
        };
        /**
        * 重置检测文档内容编辑状态标记，使得可以再次进行判断。
        * */
        rootElement.ResetUIStartEditContentState = function () {
            rootElement.__DCWriterReference.invokeMethod("ResetUIStartEditContentState");
        };
        /**
        * 对当前签名进行重新签名操作
        * @returns {boolean} 操作是否成功
        * */
        rootElement.ResignCurrentElement = function () {
            return rootElement.__DCWriterReference.invokeMethod("ResignCurrentElement");
        };
        /**
        * 对当前签名进行指定模式的重新签名操作
        * @param {DCSoft.Common.DCCASignMode} mode 指定的模式 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.ResignCurrentElementSpecifyMode = function (mode) {
            return rootElement.__DCWriterReference.invokeMethod("ResignCurrentElementSpecifyMode", mode);
        };
        /**
        * 对指定的容器元素进行重新签名
        * @param {DCSoft.Writer.Dom.XTextElement} rootElement 容器元素，必须为XTextContainerElement类型 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.ReSignElement = function (rootElement) {
            return rootElement.__DCWriterReference.invokeMethod("ReSignElement", rootElement);
        };
        /**
        * 保存文档到指定名称的文件中
        * @param {string} strUrl 文件名
        * @param {string} format 文件格式 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SaveDocument = function (strUrl, format) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocument", strUrl, format);
        };
        /** wyc20230621:修改参数兼容四代接口
         * 保存文档为BASE64字符串
         * @param {object} options 保存文档需要的一系列参数对象
         * @returns {string} 输出的BASE64字符串 
         * */
        rootElement.SaveDocumentToBase64String = function (options) {
            if (typeof (options) !== "object") {
                options = new Object();
            }
            options.SaveBase64String = true;
            return rootElement.SaveDocumentToString(options);
            //return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToBase64String", options);
        };
        /**
        * 保存文档到指定名称的文件中
        * @param {string} url 文件名
        * @param {string} format 文件格式 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SaveDocumentToFile = function (url, format) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToFile", url, format);
        };
        /**
        * 将控件添加到指定句柄的窗体中
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SaveDocumentToFileFast = function (url, format) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToFileFast", url, format);
        };
        /** wyc20230621:修改参数兼容四代接口
         * 保存文件到一个字符串中
         * @param {object} options { //文档保存的一系列参数
         *    FileFormat: "xml",
         *    CommitUserTrace: false,
         *    OutputFormatXML: false,
         *    EncodingName: "utf-8",
         *    SaveBase64String: "false",
         *    SpecifySavePart: null,
         *    ClearDataBindingContent: false,
         *    InsertLastTableRowToPageBottom: false,
         *    AttachedCustomAttributes: null, 
           }
         * @returns {string} 文件内容的字符串
         */
        rootElement.SaveDocumentToString = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToString", options);
        };
        /**
        * 保存长图片文件
        * @param {string} fileName 文件名 
        * */
        rootElement.SaveLongImageFile = function (fileName) {
            rootElement.__DCWriterReference.invokeMethod("SaveLongImageFile", fileName);
        };
        /**
        * 以打印模式保存长图片文件
        * @param {string} fileName 文件名
        * */
        rootElement.SaveLongImageFileInPrintMode = function (fileName) {
            rootElement.__DCWriterReference.invokeMethod("SaveLongImageFileInPrintMode", fileName);
        };
        /**
        * 保存长图片文件
        * @param {string} fileName 文件名 
        * @param {number} zoomRate 缩放比率
        * */
        rootElement.SaveLongImageFileZoom = function (fileName, zoomRate) {
            rootElement.__DCWriterReference.invokeMethod("SaveLongImageFileZoom", fileName, zoomRate);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {string} format 图片格式，可以为bmp, png, jpg
        * @returns {string} 生成的BASE64字符串
        * */
        rootElement.SaveLongImageToBase64StringInPrintMode = function (format) {
            return rootElement.__DCWriterReference.invokeMethod("SaveLongImageToBase64StringInPrintMode", format);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {string} format 图片格式，可以为bmp, png, jpg
        * @param {string} zoomRate 缩放比率 
        * @returns {string} 生成的BASE64字符串
        * */
        rootElement.SaveLongImageToBase64StringZoom = function (format, zoomRate) {
            return rootElement.__DCWriterReference.invokeMethod("SaveLongImageToBase64StringZoom", format, zoomRate);
        };
        /**
        * 保存页面图片文件
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} fileName 文件名 
        * */
        rootElement.SavePageImageFile = function (pageIndex, fileName) {
            rootElement.__DCWriterReference.invokeMethod("SavePageImageFile", pageIndex, fileName);
        };
        /**
        * 保存页面图片文件
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} fileName 文件名 
        * */
        rootElement.SavePageImageFileInPrintMode = function (pageIndex, fileName) {
            rootElement.__DCWriterReference.invokeMethod("SavePageImageFileInPrintMode", pageIndex, fileName);
        };
        /**
        * 保存页面图片文件
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} fileName 文件名 
        * @param {number} zoomRate 缩放比率
        * */
        rootElement.SavePageImageFileZoom = function (pageIndex, fileName, zoomRate) {
            rootElement.__DCWriterReference.invokeMethod("SavePageImageFileZoom", pageIndex, fileName, zoomRate);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} format 图片格式，可以为bmp, png, jpg 
        * @returns {string} 生成的BASE64字符串
        * */
        rootElement.SavePageImageToBase64String = function (pageIndex, format) {
            return rootElement.__DCWriterReference.invokeMethod("SavePageImageToBase64String", pageIndex, format);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} format 图片格式，可以为bmp, png, jpg 
        * @returns {string} 生成的BASE64字符串
        * */
        rootElement.SavePageImageToBase64StringInPrintMode = function (pageIndex, format) {
            return rootElement.__DCWriterReference.invokeMethod("SavePageImageToBase64StringInPrintMode", pageIndex, format);
        };
        /**
        * 将控件添加到指定句柄的窗体中
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} format 图片格式，可以为bmp, png, jpg 
        * @param {number} zoomRate 缩放比率
        * @returns {string} 生成的BASE64字符串
        * */
        rootElement.SavePageImageToBase64StringZoom = function (pageIndex, format, zoomRate) {
            return rootElement.__DCWriterReference.invokeMethod("SavePageImageToBase64StringZoom", pageIndex, format, zoomRate);
        };

        /**
        * 滚动视图到node元素处
        * @param {string} id 元素id字符串
        * @return {Boolean} 是否成功
        */
        rootElement.ScrollIntoView = function (id) {
            if (!id || typeof (id) != "string") {
                return false;
            }
            return rootElement.FocusElementById(id);
        }

        /**
        * 滚动视图到光标位置
        * */
        rootElement.ScrollToCaret = function () {
            rootElement.__DCWriterReference.invokeMethod("ScrollToCaret");
        };
        /**
        * 滚动视图到光标位置
        * @param {DCSoft.WinForms.ScrollToViewStyle} style 滚动方式
        * */
        rootElement.ScrollToCaretExt = function (style) {
            rootElement.__DCWriterReference.invokeMethod("ScrollToCaretExt", style);
        };
        /**
        * 滚动视图到指定的视图坐标位置处
        * @param {number} viewPosition 视图Y坐标
        * */
        rootElement.ScrollToViewPosition = function (viewPosition) {
            rootElement.__DCWriterReference.invokeMethod("ScrollToViewPosition", viewPosition);
        };
        /**
        * 选中文档所有内容
        * */
        rootElement.SelectAll = function () {
            rootElement.__DCWriterReference.invokeMethod("SelectAll");
        };
        /**
        * 选择内容
        * @param {DCSoft.Writer.Dom.XTextElement} startElement 选择区域起始元素 
        * @param {DCSoft.Writer.Dom.XTextElement} endElement 选择区域终止元素
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SelectContentByStartEndElement = function (startElement, endElement) {
            return rootElement.__DCWriterReference.invokeMethod("SelectContentByStartEndElement", startElement, endElement);
        };
        /**
        * 选择内容
        * @param {number} startContentIndex 选择区域起始编号
        * @param {number} endContentIndex 选择区域终止编号
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SelectContentByStartEndIndex = function (startContentIndex, endContentIndex) {
            return rootElement.__DCWriterReference.invokeMethod("SelectContentByStartEndIndex", startContentIndex, endContentIndex);
        };
        /**
        * 选中文档元素
        * @param {string} id 文档元素编号
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SelectElementById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("SelectElementById", id);
        };
        /**
        * 设置指定的命令是否有效
        * @param {string} commandName 命令名称
        * @param {boolean} enable 是否有效
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetCommandEnabled = function (commandName, enable) {
            return rootElement.__DCWriterReference.invokeMethod("SetCommandEnabled", commandName, enable);
        };
        /**
        * 设置指定的命令是否启用快键键
        * @param {string} commandName 命令名称 
        * @param {boolean} enableHotKey 是否启用快键键
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetCommandEnableHotKey = function (commandName, enableHotKey) {
            return rootElement.__DCWriterReference.invokeMethod("SetCommandEnableHotKey", commandName, enableHotKey);
        };
        /**
        * 设置指定的命令是否底层有效
        * @param {string} commandName 命令名称 
        * @param {boolean} enable 底层是否有效
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetCommandEnableLowLevel = function (commandName, enable) {
            return rootElement.__DCWriterReference.invokeMethod("SetCommandEnableLowLevel", commandName, enable);
        };
        /**
        * 设置当前用户界面事件(鼠标和键盘)被处理，无需后续处理
        * */
        rootElement.SetCurrentEventHandled = function () {
            rootElement.__DCWriterReference.invokeMethod("SetCurrentEventHandled");
        };
        /**
        * 设置自定义属性值
        * @param {string} name 属性名 
        * @param {string} Value 属性值 
        * */
        rootElement.SetCustomAttribute = function (name, Value) {
            rootElement.__DCWriterReference.invokeMethod("SetCustomAttribute", name, Value);
        };
        /**
        * 设置参数是否有效
        * @param {string} parameterName 参数名
        * @param {boolean} enabled 是否有效
        * */
        rootElement.SetDocumentParameterEnabled = function (parameterName, enabled) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentParameterEnabled", parameterName, enabled);
        };
        /**
        * 设置文档参数值
        * @param {string} name 参数名
        * @param {object} Value 新的参数值
        * */
        rootElement.SetDocumentParameterValue = function (name, Value) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentParameterValue", name, Value);
        };
        /**
        * 设置XML格式的文档参数值
        * @param {string} name 参数名
        * @param {string} xmlText 参数值
        * */
        rootElement.SetDocumentParameterValueXml = function (name, xmlText) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentParameterValueXml", name, xmlText);
        };
        /**
        * 设置DOM使用的图标
        * @param {DCSoft.Writer.DCStdImageKey} key 图标标号 
        * @param {string} base64String base64String图片对象 
        * */
        rootElement.SetDomImageByBase64String = function (key, base64String) {
            rootElement.__DCWriterReference.invokeMethod("SetDomImageByBase64String", key, base64String);
        };
        /**
        * 设置DOM使用的图标
        * @param {DCSoft.Writer.DCStdImageKey} key 图标标号 
        * @param {string} fileName 图片文件名
        * */
        rootElement.SetDomImageByFileName = function (key, fileName) {
            rootElement.__DCWriterReference.invokeMethod("SetDomImageByFileName", key, fileName);
        };
        /**
        * 设置文档元素的属性值
        * @param {string} id 元素编号 
        * @param {string} attributeName 属性名
        * @param {string} attributeValue 属性值
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetElementAttribute = function (id, attributeName, attributeValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementAttribute", id, attributeName, attributeValue);
        };
        /**
        * 设置单 / 复选框的勾选状态
        * @param {string} id 文档元素编号 
        * @param {boolean} newChecked 新的勾选状态
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetElementChecked = function (id, newChecked) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementChecked", id, newChecked);
        };
        /**
        * 设置文档元素自定义属性
        * @param {string} id 文档元素编号
        * @param {string} name 属性名
        * @param {string} Value 属性值
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetElementProperty = function (id, name, Value) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementProperty", id, name, Value);
        };
        /**
        * 设置文档元素文本内容
        * @param {string} id 元素编号
        * @param {string} text 文本值
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetElementText = function (id, text) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementText", id, text);
        };
        /**
        * 设置文档元素文本内容
        * @param {string} id 元素编号
        * @param {string} text 文本值
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetElementTextByID = function (id, text) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementTextByID", id, text);
        };
        /**
        * 设置文档元素可见性
        * @param {string} id 文档元素编号
        * @param {boolean} visible 可见性
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetElementVisible = function (id, visible) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementVisible", id, visible);
        };
        /**
        * 设置全局的JavaScript代码.
        * @param {string} script 代码文本
        * */
        rootElement.SetGlobalJavaScript = function (script) {
            rootElement.__DCWriterReference.invokeMethod("SetGlobalJavaScript", script);
        };
        /**
        * 设置DCWriter全局选项值
        * @param {string} name 选项名称
        * @param {string} Value 选项值
        * */
        rootElement.SetGlobalOptionValue = function (name, value) {
            rootElement.__DCWriterReference.invokeMethod("SetGlobalOptionValue", name, value);
        };
        /**
        * 设置全局的页码偏移量
        * @param {number} offset 偏移量
        * */
        rootElement.SetGlobalPageIndexoffset = function (offset) {
            rootElement.__DCWriterReference.invokeMethod("SetGlobalPageIndexoffset", offset);
        };
        /**
        * 设置文档HTML内容
        * @param {string} html
        * */
        rootElement.SetHtmlText = function (html) {
            rootElement.__DCWriterReference.invokeMethod("SetHtmlText", html);
        };
        /**
        * 设置指定编号的输入域的InnerValue属性值。
        * @param {string} id 输入域编号
        * @param {string} newValue 新的属性值 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetInputFieldInnerValue = function (id, newValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetInputFieldInnerValue", id, newValue);
        };
        /**
        * 设置输入域选择多个下拉项目
        * @param {string} id 输入域编号
        * @param {string} indexs 从0开始的下拉项目序号，各个序号之间用逗号分开 
        * @returns {boolean} 操作是否修改文档内容
        * */
        rootElement.SetInputFieldSelectedIndexs = function (id, indexs) {
            return rootElement.__DCWriterReference.invokeMethod("SetInputFieldSelectedIndexs", id, indexs);
        };
        /**
        * 根据文档元素来设置续打位置
        * @param {DCSoft.Writer.Dom.XTextElement} startElement 起始位置定位元素
        * @param {DCSoft.Printing.JumpPrintPositionMode} startMode 起始位置模式
        * @param {DCSoft.Writer.Dom.XTextElement} endElement 结束位置定位元素
        * @param {DCSoft.Printing.JumpPrintPositionMode} endMode 结束位置模式
        * */
        rootElement.SetJumpPrintByElement = function (startElement, startMode, endElement, endMode) {
            rootElement.__DCWriterReference.invokeMethod("SetJumpPrintByElement", startElement, startMode, endElement, endMode);
        };
        /**
        * 将下端续打位置移动到指定文档元素的边缘
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @param {boolean} autoSetEndPageIndex 自动设置开始显示页码
        * @param {boolean} useTopPosition true：设置到文档元素的上边缘，false：设置到文档元素的下边缘
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetJumpPrintEndPositionTo = function (element, autoSetEndPageIndex, useTopPosition) {
            return rootElement.__DCWriterReference.invokeMethod("SetJumpPrintEndPositionTo", element, autoSetEndPageIndex, useTopPosition);
        };
        /**
        * 将续打位置移动到指定文档元素的上边缘
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @param {boolean} autoSetStartPageIndex 自动设置开始显示页码
        * @param {boolean} useTopPosition true： 设置到文档元素的上边缘，false： 设置到文档元素的下边缘
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetJumpPrintPositionTo = function (element, autoSetStartPageIndex, useTopPosition) {
            return rootElement.__DCWriterReference.invokeMethod("SetJumpPrintPositionTo", element, autoSetStartPageIndex, useTopPosition);
        };
        /**
        * 设置选项值, 选项名称为“选项组名.选项名称”的格式，比如“ViewOptions.ShowParagraphFlag”。
        * 比如 obj.SetOptionValue("ViewOptions.ShowParagraphFlag", "true");
        * obj.SetOptionValue("ViewOptions.TagColorForNormalField", "#AAAAAA");
        * @param {string} name 选项名称 
        * @param {string} Value 新的选项值
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetOptionValue = function (name, Value) {
            return rootElement.__DCWriterReference.invokeMethod("SetOptionValue", name, Value);
        };
        /**
        * 设置注册码
        * @param {string} regCode 注册码文本
        * */
        rootElement.SetRegisterCode = function (regCode) {
            rootElement.__DCWriterReference.invokeMethod("SetRegisterCode", regCode);
        };
        /**
        * 设置字符串资源内容, 改操作的影响是全局性的。
        * @param {string} name 字符串资源名称
        * @param {string} Value 字符串资源值
        * */
        rootElement.SetResourceStringValue = function (name, Value) {
            rootElement.__DCWriterReference.invokeMethod("SetResourceStringValue", name, Value);
        };
        /**
        * 设置状态栏文本，并触发事件
        * @param {string} text 新状态栏文本
        * */
        rootElement.SetStatusText = function (text) {
            rootElement.__DCWriterReference.invokeMethod("SetStatusText", text);
        };
        /**
        * 设置状态栏文本显示的用户界面元素
        * @param {object} uiElement 用户界面元素对象，可以是System.Windows.Forms.Control或者System.Windows.Forms.ToolStripItem 
        * @param {string} formatString 状态栏文本格式化字符串
        * */
        rootElement.SetStatusUIElement = function (uiElement, formatString) {
            rootElement.__DCWriterReference.invokeMethod("SetStatusUIElement", uiElement, formatString);
        };
        /**
        * 设置单元格文本值
        * @param {string} tableID 表格编号
        * @param {number} rowIndex 从0开始计算的行号
        * @param {number} colIndex 从0开始计算的列号
        * @param {string} newText 新文本值
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SetTableCellText = function (tableID, rowIndex, colIndex, newText) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellText", tableID, rowIndex, colIndex, newText);
        };
        /**
        * 将控件设置成MS Word的显示样式
        * */
        rootElement.SetToMSWordVisualStyle = function () {
            rootElement.__DCWriterReference.invokeMethod("SetToMSWordVisualStyle");
        };
        ///**
        //* 设置缩放比率
        //* @param {number} rate 缩放比率
        //* */
        //rootElement.SetZoomRate = function (rate) {
        //    rootElement.__DCWriterReference.invokeMethod("SetZoomRate", rate);
        //};
        /**
        * 显示关于对话框
        * */
        rootElement.ShowAboutDialog = function () {
            rootElement.__DCWriterReference.invokeMethod("ShowAboutDialog");
        };
        /**
        * 对当前选中的签名图片元素进行签名操作
        * @param {DCSoft.Writer.Security.DCSignInputInfo} input 签名操作输入参数
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SignBySignImage = function (input) {
            return rootElement.__DCWriterReference.invokeMethod("SignBySignImage", input);
        };
        /**
        * 对指定的文档元素内容进行签名
        * @param {DCSoft.Writer.Dom.XTextElement} rootElement 容器元素，必须为XTextContainerElement类型
        * @param {DCSoft.Writer.Security.DCSignInputInfo} input 输入的参数
        * @returns {boolean} 操作是否成功
        * */
        rootElement.SignElement = function (rootElement, input) {
            return rootElement.__DCWriterReference.invokeMethod("SignElement", rootElement, input);
        };
        /**
        * 进入睡眠模式，和Wakeup()配对使用。睡眠的控件不响应任何用户界面事件，一些接口也暂停。
        * @param {boolean} clearContent 是否清空文档内容
        * */
        rootElement.Sleep = function (clearContent) {
            rootElement.__DCWriterReference.invokeMethod("Sleep", clearContent);
        };
        /**
        * 启用基于本地文件系统的自动保存功能
        * @returns {boolean} 操作是否成功
        * */
        rootElement.StartLocalAutoSave = function () {
            return rootElement.__DCWriterReference.invokeMethod("StartLocalAutoSave",);
        };
        /**
        * 同步服务器时间
        * 本函数不会修改本地计算机时钟，而是修改本软件内部维护的一个虚拟时钟。 
        * 虚拟时钟会依赖本地计算机时钟。 不过同步服务器时间后，如果本机时钟修改了， 则需要重新调用本函数来同步服务器时间。如果不重新同步则会采用本机时刻。 因此建议定期（比如一分钟）来调用本函数同步服务器时间。
        * @param {Date} serverTime 当前服务器时间
        * */
        rootElement.SynchroServerTime = function (serverTime) {
            rootElement.__DCWriterReference.invokeMethod("SynchroServerTime", serverTime);
        };
        /**
        * 同步服务器时间
        * 本函数是SynchroServerTime(DateTime serverTime)的另外一个版本。用于对不支持DateTime类型的编程语言的支持。 本函数不会修改本地计算机时钟，而是修改本软件内部维护的一个虚拟时钟。 
        * 虚拟时钟会依赖本地计算机时钟。 不过同步服务器时间后，如果本机时钟修改了， 则需要重新调用本函数来同步服务器时间。如果不重新同步则会采用本机时刻。 因此建议定期（比如一分钟）来调用本函数同步服务器时间。
        * @param {number} year 当前年份
        * @param {number} month 当前月份
        * @param {number} day 当前天数
        * @param {number} hour 当前小时数
        * @param {number} minute 当前分钟数 
        * @param {number} second 当前秒数 
        * */
        rootElement.SynchroServerTimeByParameters = function (year, month, day, hour, minute, second) {
            rootElement.__DCWriterReference.invokeMethod("SynchroServerTimeByParameters", year, month, day, hour, minute, second);
        };
        /**
        * 用户界面层的开始编辑文档内容
        * 此处的能否编辑文档内容和控件当的Readonly属性不一样。在该方法中，一开始是假定控件内容 可以编辑，此时是按照内容可以编辑的状态来设置的编辑器命令状态。比如Bold, Italic, Paste等命令。 
        * 不过用户真的动手修改文档内容时，会调用这个方法，如果返回false则该编辑操作取消掉。 不过编辑器命令状态还是假定内容可编辑的。 
        * 举个例子，如果系统实现了文档锁定机制，当编辑器打开一个文档，还没确定文档是否被锁定了。 
        * 此时可以响应EventStartEditContent事件来确定文档是否真的被锁定了。如果被其他用户锁定了， 则该方法返回false，如果没被锁定，则当前用户可以锁定文档，然后返回true。 
        * 这种锁定仅影响用户界面层的操作，比如鼠标键盘事件、执行编辑器命令。但对程序直接调用 控件和文档对象的各种属性方法来修改文档内容是没有影响的。 
        * 本函数内部触发控件的EventUIStartEditContent事件，应用系统需要相应这个事件来判断文档 是否处于锁定状态，以及锁定文档的操作。
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 如果返回true，则可以编辑文档内容；如果返回false则不能编辑文档内容。
        * */
        rootElement.UIStartEditContent = function () {
            return rootElement.__DCWriterReference.invokeMethod("UIStartEditContent");
        };
        /**
        * 用户界面层的开始编辑文档内容
        * 此处的能否编辑文档内容和控件当的Readonly属性不一样。在该方法中，一开始是假定控件内容 可以编辑，此时是按照内容可以编辑的状态来设置的编辑器命令状态。比如Bold, Italic, Paste等命令。 
        * 不过用户真的动手修改文档内容时，会调用这个方法，如果返回false则该编辑操作取消掉。 不过编辑器命令状态还是假定内容可编辑的。 
        * 举个例子，如果系统实现了文档锁定机制，当编辑器打开一个文档，还没确定文档是否被锁定了。 此时可以响应EventStartEditContent事件来确定文档是否真的被锁定了。
        * 如果被其他用户锁定了， 则该方法返回false，如果没被锁定，则当前用户可以锁定文档，然后返回true。 这种锁定仅影响用户界面层的操作，比如鼠标键盘事件、执行编辑器命令。
        * 但对程序直接调用 控件和文档对象的各种属性方法来修改文档内容是没有影响的。 本函数内部触发控件的EventUIStartEditContent事件，应用系统需要相应这个事件来判断文档 是否处于锁定状态，以及锁定文档的操作。
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 如果返回true，则可以编辑文档内容；如果返回false则不能编辑文档内容。
        * */
        rootElement.UIStartEditContentSpecifyElement = function (sourceElement) {
            return rootElement.__DCWriterReference.invokeMethod("UIStartEditContentSpecifyElement", sourceElement);
        };
        ///**
        // * 撤销 
        // * */
        //rootElement.Undo = function () {
        //    rootElement.__DCWriterReference.invokeMethod("Undo");
        //};
        /**
        * 请改用WriteDataFromDocumentToDataSource().
        * */
        rootElement.UpdateDataSourceForView = function () {
            return rootElement.__DCWriterReference.invokeMethod("UpdateDataSourceForView");
        };
        /**
        * 更新文档的默认字体
        * @param {boolean} updateUI 是否更新用户界面
        * */
        rootElement.UpdateDefaultFont = function (updateUI) {
            rootElement.__DCWriterReference.invokeMethod("UpdateDefaultFont", updateUI);
        };
        /**
        * 更新文档页状态
        * */
        rootElement.UpdatePages = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdatePages");
        };
        /**
        * 根据当前元素更新光标
        * */
        rootElement.UpdateTextCaret = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdateTextCaret");
        };
        /**
        * 根据指定的文档元素对象更新光标
        * @param {DCSoft.Writer.Dom.XTextElement} element 指定的文档元素对象
        * */
        rootElement.UpdateTextCaretByElement = function (element) {
            rootElement.__DCWriterReference.invokeMethod("UpdateTextCaretByElement", element);
        };
        /**
        * 根据当前元素更新光标，而且不会造成用户视图区域的滚动
        * */
        rootElement.UpdateTextCaretWithoutScroll = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdateTextCaretWithoutScroll");
        };
        /**
        * 根据元素提示文本信息列表来更新用户界面
        * @param {boolean} checkVersion 是否检测提示信息版本号
        * */
        rootElement.UpdateToolTip = function (checkVersion) {
            rootElement.__DCWriterReference.invokeMethod("UpdateToolTip", checkVersion);
        };
        /**
        * 更新用户历史记录的时间
        * */
        rootElement.UpdateUserInfoSaveTime = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdateUserInfoSaveTime");
        };
        /**
        * 更新用户历史记录的时间
        * @param {boolean} addNewHistoryInfo 是否追加新的操作记录
        * */
        rootElement.UpdateUserInfoSaveTimeExt = function (addNewHistoryInfo) {
            rootElement.__DCWriterReference.invokeMethod("UpdateUserInfoSaveTimeExt", addNewHistoryInfo);
        };
        /**
        * 请改用WriteDataFromDataSourceToDocument().
        * */
        rootElement.UpdateViewForDataSource = function () {
            return rootElement.__DCWriterReference.invokeMethod("UpdateViewForDataSource");
        };
        ///**
        //* 执行用户登录操作
        //* 本方法会自动启用授权控制，并以留痕模式显示文档内容。
        //* @param {DCSoft.Writer.Security.UserLoginInfo} loginInfo 登录信息
        //* @param {boolean} updateUI 是否更新用户界面
        //* @returns {boolean} 操作是否成功
        //* */
        //rootElement.UserLogin = function (loginInfo, updateUI) {
        //    return rootElement.__DCWriterReference.invokeMethod("UserLogin", loginInfo, updateUI);
        //};
        /**
        * 用户登录
        * @param {string} userID 用户编号
        * @param {string} userName 用户名 
        * @param {string} permissionLevel 用户等级 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.UserLogin = function (userID, userName, permissionLevel) {
            return rootElement.__DCWriterReference.invokeMethod("UserLogin", userID, userName, permissionLevel);
        };
        /**
        * 根据参数进行用户登录
        * @param {string} userID 用户编号
        * @param {string} userName 用户名 
        * @param {string} permissionLevel 用户等级 
        * @returns {boolean} 操作是否成功
        * */
        rootElement.UserLoginByParameter = function (userID, userName, permissionLevel) {
            return rootElement.__DCWriterReference.invokeMethod("UserLoginByParameter", userID, userName, permissionLevel);
        };
        /**
        * 根据用户登录信息执行用户登录操作
        * @param {DCSoft.Writer.Security.UserLoginInfo} loginInfo 登录信息 
        * @param {boolean} updateUI 是否更新用户界面
        * @returns {boolean} 操作是否成功
        * */
        rootElement.UserLoginByUserLoginInfo = function (loginInfo, updateUI) {
            return rootElement.__DCWriterReference.invokeMethod("UserLoginByUserLoginInfo", loginInfo, updateUI);
        };
        /**
        * 视图坐标转换为控件客户区中的坐标
        * @param {number} x X值
         * @param {number} y Y值 
        * @returns {System.Drawing.Point} 新坐标
        * */
        rootElement.ViewPointToClient = function (x, y) {
            return rootElement.__DCWriterReference.invokeMethod("ViewPointToClient", x, y);
        };
        /**
        * 唤醒控件，和Sleep()配对使用。
        * */
        rootElement.Wakeup = function () {
            rootElement.__DCWriterReference.invokeMethod("Wakeup");
        };
        /**
        * 将数据源中的数据写入到文档中
        * @returns {number} 更新的数据点个数
        * */
        rootElement.WriteDataFromDataSourceToDocument = function () {
            return rootElement.__DCWriterReference.invokeMethod("WriteDataFromDataSourceToDocument");
        };
        /**
        * 将指定名称的文档参数值填充到文档中
        * @param {string} parameterNames 指定的文档参数名称，各个名称之间用英文逗号分开。比如“姓名, 性别, 国籍”，如果为空则更新全部数据源。
        * @returns {number} 更新的数据点个数
        * */
        rootElement.WriteDataFromDataSourceToDocumentSpecifyParameterNames = function (parameterNames) {
            return rootElement.__DCWriterReference.invokeMethod("WriteDataFromDataSourceToDocumentSpecifyParameterNames", parameterNames);
        };
        /**
        * 将文档中的数据写入到数据源中
        * @returns {number} 更新的数据点个数
        * */
        rootElement.WriteDataFromDocumentToDataSource = function () {
            return rootElement.__DCWriterReference.invokeMethod("WriteDataFromDocumentToDataSource");
        };



        //以下为对接的添加

        /**
         * 获取文档的页面设置信息
         * @param {gridLineInfo} 获取文档的页面设置信息
         * */
        rootElement.GetDocumentPageSettings = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentPageSettings");
        };
        /**
         * 设置页面设置
         * @param {gridLineInfo} 设置页面设置
         * */
        rootElement.ChangeDocumentSettings = function (settingsInfo) {
            rootElement.__DCWriterReference.invokeMethod("ChangeDocumentSettings", settingsInfo);
        };
        /**
         * 打开页面设置弹框
         * @param {options} 页面设置参数
         * @returns
         */
        rootElement.DocumentSettingsDialog = function (options, callBack = null) {
            WriterControl_Dialog.DocumentSettingsDialog(options, rootElement, callBack);
        }
        /**
         * 设置文档装订线
         * @param {gridLineInfo} 文档装订线参数
         * */
        rootElement.SetDocumentGutter = function (gutterInfo) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentGutter", gutterInfo);
        };
        /**
        * 获取文档装订线
        * @param {object} 文档装订线
        * */
        rootElement.GetDocumentGutter = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentGutter");
        };
        /**
         * 打开文档装订线弹窗
         * @param {options} 文档装订线参数
         * @returns
         */
        rootElement.DocumentGutterDialog = function (options) {
            WriterControl_Dialog.DocumentGutterDialog(options, rootElement);
        }
        /**
         * 设置文档网格线
         * @param {gridLineInfo} 文档网格线参数
         * */
        rootElement.SetDocumentGridLine = function (gridLineInfo) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentGridLine", gridLineInfo);
        };
        /**
        * 获取文档网格线
        * @param {object} 文档网格线
        * */
        rootElement.GetDocumentGridLine = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentGridLine");
        };
        /**
         * 打开文档网格线弹窗
         * @param {options} 文档网格线参数
         * @returns
         */
        rootElement.DocumentGridLineDialog = function (options) {
            WriterControl_Dialog.DocumentGridLineDialog(options, rootElement);
        }

        /**
        * 设置文档水印
        * @param {gridLineInfo} 文档水印
        * */
        rootElement.SetDocumentWatermark = function (gridLineInfo) {
            gridLineInfo = WriterControl_Dialog.checkWaterValue(gridLineInfo);
            console.log("rootElement.SetDocumentWatermark -> gridLineInfo", gridLineInfo)
            if (gridLineInfo == null) {
                return false;
            }
            //处理格式，保证后台不会报错
            rootElement.__DCWriterReference.invokeMethod("SetDocumentWatermark", gridLineInfo);
            WriterControl_Paint.UpdateViewForWaterMark(rootElement);
        };
        /**
        * 获取文档水印
        * @param {object} 文档水印
        * */
        rootElement.GetDocumentWatermark = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentWatermark");
        };
        /**
         * 打开水印弹框
         * @param {options} 水印参数
         * @returns
         */
        rootElement.WatermarkDialog = function (options) {
            WriterControl_Dialog.WatermarkDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 单复选框参数
         * @returns
         */
        rootElement.CheckboxAndRadioDialog = function (options) {
            //var options = CurrentElement('XTextRadioBoxElement');
            //var options = CurrentElement('XTextCheckBoxElement')
            WriterControl_Dialog.CheckboxAndRadioDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 输入域属性对话框
         * @returns
         */
        rootElement.InputFieldDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextInputFieldElement');
            WriterControl_Dialog.InputFieldDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 按钮属性对话框
         * @returns
         */
        rootElement.ButtonDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.ButtonDialog(options, rootElement);
        }
        /**
         * 
         * @param {options} 分割线属性对话框
         * @returns
         */
        rootElement.HorizontalLineDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.HorizontalLineDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 页码属性对话框
         * @returns
         */
        rootElement.PageNumberDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.PageNumberDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 文本标签属性对话框
         * @returns
         */
        rootElement.LabelDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.LabelDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 二维码属性对话框
         * @returns
         */
        rootElement.QRCodeDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.QRCodeDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 条形码属性对话框
         * @returns
         */
        rootElement.BarCodeDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.BarCodeDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 字体选择对话框
         * @returns
         */
        rootElement.FontSelectionDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FontSelectionDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 胎心值对话框
         * @returns
         */
        rootElement.FetalHeartDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FetalHeartDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 输入1-10之间的数值对话框
         * @returns
         */
        rootElement.PainIndexDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.PainIndexDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 分数值对话框
         * @returns
         */
        rootElement.FractionDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FractionDialog(options, rootElement);
        }

        /**
       * 
       * @param {options} 月经史值对话框
       * @returns
       */
        rootElement.FourValuesDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FourValuesDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 月经史值1对话框
         * @returns
         */
        rootElement.FourValues1Dialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FourValues1Dialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 月经史值对话框
         * @returns
         */
        rootElement.FourValues2Dialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FourValues2Dialog(options, rootElement);
        }
        /**
         * 
         * @param {options} 月经史值对话框
         * @returns
         */
        rootElement.ThreeValuesDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.ThreeValuesDialog(options, rootElement);
        }

        /**
        * 
        * @param {options} 光定位值对话框
        * @returns
        */
        rootElement.LightPositioningDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.LightPositioningDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 瞳孔图值对话框
         * @returns
         */
        rootElement.PupilDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.PupilDialog(options, rootElement);
        }

        /**
        * 表格边框
        * @param {options} 
        * @returns
        */
        rootElement.bordersShadingDialog = function (options) {
            options = {
                ...options,
                title: "表格边框设置",
                type: "table"
            }
            //公用边框弹窗
            WriterControl_Dialog.borderShadingcellDialog(options, rootElement);
        }

        /**
        * 单元格边框
        * @param {options} 
        * @returns
        */
        rootElement.borderShadingcellDialog = function (options) {
            options = {
                ...options,
                title: "单元格边框设置",
                type: "tableCell"
            }
            WriterControl_Dialog.borderShadingcellDialog(options, rootElement);
        }

        /**
         * 单元格边框
         * @param {options} 
         * @returns
         */
        rootElement.insertTableDialog = function (options) {
            WriterControl_Dialog.insertTableDialog(options, rootElement);
        }

        /**
         * 拆分单元格
         * @param {options} 
         * @returns
         */
        rootElement.splitCellDialog = function (options) {
            WriterControl_Dialog.splitCellDialog(options, rootElement);
        }

        /**
         * 编辑文档批注
         * @param {options} 
         * @returns
         */
        rootElement.EditDocumentCommentsDialog = function (options) {
            WriterControl_Dialog.EditDocumentCommentsDialog(options, rootElement);
        }

        /**
        * 表单模式
        * @param {options} 
        * @returns
        */
        rootElement.formModeDialog = function (options) {
            WriterControl_Dialog.formModeDialog(options, rootElement);
        }

        /**
       * 内容保护模式
       * @param {options} 
       * @returns
       */
        rootElement.contentProtectedModeDialog = function (options) {
            WriterControl_Dialog.contentProtectedModeDialog(options, rootElement);
        }

        /**
         * 段落
         * @param {options} 
         * @returns
         */
        rootElement.paragraphDialog = function (options) {
            WriterControl_Dialog.paragraphDialog(options, rootElement);
        }

        /**
         * 表格
         * @param {options} 
         * @returns
         */
        rootElement.tableDialog = function (options) {
            WriterControl_Dialog.tableDialog(options, rootElement);
        }
        /**
         * 单元格
         * @param {options} 
         * @returns
         */
        rootElement.tableCellDialog = function (options) {
            WriterControl_Dialog.tableCellDialog(options, rootElement);
        }
        /**
         * 单元行
         * @param {options} 
         * @returns
         */
        rootElement.tableRowDialog = function (options) {
            WriterControl_Dialog.tableRowDialog(options, rootElement);
        }
        /**
        * 单元格网格线
        * @param {options} 
        * @returns
        */
        rootElement.cellGridlineDialog = function (options) {
            WriterControl_Dialog.cellGridlineDialog(options, rootElement);
        }
        /**
         * 单元格斜分线
         * @param {options} 
         * @returns
         */
        rootElement.cellDiagonalLineDialog = function (options) {
            WriterControl_Dialog.cellDiagonalLineDialog(options, rootElement);
        }
        /**
         * 编辑图片
         * @param {options} 
         * @returns
         */
        rootElement.imgEditDialog = function (options) {
            WriterControl_Dialog.imgEditDialog(options, rootElement);
        }


        /**
         * 用户登录
         * @param {options} 
         * @returns
         */
        rootElement.loginDialog = function (options) {
            WriterControl_Dialog.loginDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 图片属性对话框
         * @returns
         */
        rootElement.ImageDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.ImageDialog(options, rootElement);
        }

        /**wyc20230608:添加四代兼容接口
        * 在当前位置处插入病程
        * @param subDocumentOption:{ 
                "Files": 批量生成子文档的文档数组 
                "Options": 批量生成子文档的文档选项数组
                "Usebase64": 是否使用base64字符串加载
        * */
        rootElement.InsertSubDocuments = function (subDocumentOption) {
            var result = rootElement.__DCWriterReference.invokeMethod("InsertSubDocuments", subDocumentOption);
            if (result == true && rootElement) {
                //var arr = [];
                //var Parameters = subDocumentOption.Parameters
                //if (Parameters && Parameters.length > 0) {
                //    for (var i = 0; i < Parameters.length; i++) {
                //        arr.push(Parameters[i].ID);
                //    }
                //}
                if (!!rootElement.EventAfterInsertSubDocuments && typeof (rootElement.EventAfterInsertSubDocuments) == "function") {
                    rootElement.EventAfterInsertSubDocuments.call(rootElement);
                }
            }
            return result;
        };
        /** wyc20230608:添加四代兼容接口
        * 文档末尾批量追加病程
        * @param subDocumentOption:{ 
                "Files": 批量生成子文档的文档数组 
                "Options": 批量生成子文档的文档选项数组
                "Usebase64": 是否使用base64字符串加载
        * */
        rootElement.AppendSubDocuments = function (subDocumentOption) {
            var result = rootElement.__DCWriterReference.invokeMethod("AppendSubDocuments", subDocumentOption);
            if (result == true && rootElement) {
                //var arr = [];
                //var Parameters = subDocumentOption.Parameters
                //if (Parameters && Parameters.length > 0) {
                //    for (var i = 0; i < Parameters.length; i++) {
                //        arr.push(Parameters[i].ID);
                //    }
                //}
                if (!!rootElement.EventAfterInsertSubDocuments && typeof (rootElement.EventAfterInsertSubDocuments) == "function") {
                    rootElement.EventAfterInsertSubDocuments.call(rootElement);
                }
            }
            return result;
        };
        /**
        * 当前病程
        * @param {subDocumentOption} 病程参数
        * @returns {string} 病程编号
        * */
        rootElement.CurrentSubDoc = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentSubDoc");
        };
        /**
         * 删除指定编号的病程
         * @param {id} 病程编号
         * @returns {boolean} 结果
         * */
        rootElement.DeleteSubDoc = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("DeleteSubDoc", id);
        };
        /**
         * 删除当前病程
         * @returns {boolean} 结果
         * */
        rootElement.DeleteCurrentSubDoc = function () {
            return rootElement.__DCWriterReference.invokeMethod("DeleteCurrentSubDoc");
        };
        /**
         * 设置当前病程是否只读
         * @param {isReadOnly} 是否只读
         * @param {backgroundColorValue} 背景色
         * @returns {boolean} 结果
         * */
        rootElement.SetCurrentSubDocumentReadOnly = function (isReadOnly, backgroundColorValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetCurrentSubDocumentReadOnly", isReadOnly, backgroundColorValue);
        };
        /**
         * 设置指定病程是否只读
         * @param {subID} 编号
         * @param {isReadOnly} 是否只读
         * @param {backgroundColorValue} 背景色
         * @returns {boolean} 结果
         * */
        rootElement.SetSubDocumentReadOnly = function (subID, isReadOnly, backgroundColorValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetSubDocumentReadOnly", subID, isReadOnly, backgroundColorValue);
        };
        /**
         * 追加单个病程
         * @param {options} 参数
         * @returns {boolean} 结果
         * */
        rootElement.LoadSubDocumentFromString = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("LoadSubDocumentFromString", options);
        };
        /**
         * 获取病程文档BASE64字符串
         * @param {fileFormat} 格式
         * @param {id} 病程编号
         * @returns {string} 病程内容
         * */
        rootElement.SaveSubDocumentToBase64String = function (fileFormat, id) {
            return rootElement.__DCWriterReference.invokeMethod("SaveSubDocumentToBase64String", fileFormat, id);
        };

        /**
         * 获取病程文档BASE64字符串
         * @param {options} 参数
         * @returns {string} 病程内容
         * */
        rootElement.SaveSubDocumentToString = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("SaveSubDocumentToString", options);
        };
        /**
         * 获取文档中的全部病程ID
         * @returns {Array} 病程ID
         * */
        rootElement.GetAllSubDocumentIDs = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetAllSubDocumentIDs");
        };
        /**
         * 根据编号定位病程
         * @returns {boolean} 
         * */
        rootElement.SelectSubDocumentByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("SelectSubDocumentByID", id);
        };
        /**
         * 根据文档中的序号定位病程
         * @returns {boolean} 
         * */
        rootElement.SelectSubDocument = function (index) {
            return rootElement.__DCWriterReference.invokeMethod("SelectSubDocument", index);
        };
        /**
         * 设置当前病程只读和颜色
         * @returns {boolean} 
         * */
        rootElement.SetSubDocumentState = function (editable, strStyle) {
            return rootElement.__DCWriterReference.invokeMethod("SetSubDocumentState", editable, strStyle);
        };
        /**
        * 设置病程是否跨页
        * @returns {boolean} 
        * */
        rootElement.SubDocCrossPage = function (parsubdoc, isCrossams) {
            return rootElement.__DCWriterReference.invokeMethod("SubDocCrossPage", parsubdoc, isCrossams);
        };
        /**
        * 设置文档的违禁关键词
        * */
        rootElement.SetExcludeKeywords = function (keys) {
            rootElement.__DCWriterReference.invokeMethod("SetExcludeKeywords", keys);
        };
        /**
        * 获取文档的违禁关键词
        * @returns {string} 
        * */
        rootElement.GetExcludeKeywords = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetExcludeKeywords");
        };
        /**
        * 获取选择的html
        * @returns {string} 
        * */
        rootElement.SelectionHtml = function (nativeHtml) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionHtml", nativeHtml);
        };
        /**
        * 获取选择的文本
        * @returns {string} 
        * */
        rootElement.SelectionText = function (clearBorder) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionText", clearBorder);
        };
        /**
        * 获取选择的XML
        * @returns {string} 
        * */
        rootElement.SelectionXml = function (containHeaderFooter) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionXml", containHeaderFooter);
        };
        /**
        * 获取选择的json
        * @returns {string} 
        * */
        rootElement.SelectionJson = function (containHeaderFooter) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionJson", containHeaderFooter);
        };
        /**
        * 在当前位置插入json内容
        * @returns {int} 
        * */
        rootElement.InsertJson = function (content) {
            return rootElement.__DCWriterReference.invokeMethod("InsertJson", content);
        };
        /**
        * 在指定的输入域内插入指定格式文档
        * @returns {boolean} 
        * */
        rootElement.InsertContentByInputID = function (content, format, elementID, clearold) {
            return rootElement.__DCWriterReference.invokeMethod("InsertContentByInputID", content, format, elementID, clearold);
        };
        /**
       * 在指定的单元格内插入指定格式文档
       * @returns {boolean} 
       * */
        rootElement.InsertContentByTableCellD = function (content, format, tableID, rowIndex, colIndex, clearold) {
            return rootElement.__DCWriterReference.invokeMethod("InsertContentByTableCellD", content, format, tableID, rowIndex, colIndex, clearold);
        };

        /** wyc20230509和四代接口保持兼容
         * 执行编辑器命令对话框
         * @param {object} Parameter 参数
         * @returns {?} 执行结果
         */
        rootElement.DCExecuteCommandDialog = function () {
            return WriterControl_Dialog.DCExecuteCommandDialog(rootElement);
        }

        /** wyc20230509和四代接口保持兼容
         * 执行编辑器命令 
         * @param {string} strCommandName 命令名称
         * @param {boolean} bolShowUI 是否显示用户界面
         * @param {object} Parameter 参数
         * @returns {?} 执行结果
         */
        rootElement.DCExecuteCommand = function (strCommandName, bolShowUI, Parameter) {
            strCommandName += "";
            var result = false;
            switch (strCommandName.toLocaleLowerCase()) {
                case "allfontname"://兼容四代的设置全文的字体
                    return rootElement.__DCWriterReference.invokeMethod("AllFontName", Parameter);
                    break;
                case "date"://后端取的时间有问题，需要在前端取
                    var date = new Date();
                    var year = date.getFullYear();//年
                    var month = showTime(date.getMonth() + 1);//月
                    var day = showTime(date.getDate());//日
                    var str = year + "-" + month + "-" + day;
                    return rootElement.__DCWriterReference.invokeMethod("ExecuteCommand", "InsertString", bolShowUI, str);
                    break;
                case "time"://后端取的时间有问题，需要在前端取
                    var date = new Date();
                    var hours = showTime(date.getHours());//小时
                    var minutes = showTime(date.getMinutes());//分钟
                    var second = showTime(date.getSeconds());//秒
                    var str = hours + ":" + minutes + ":" + second;
                    return rootElement.__DCWriterReference.invokeMethod("ExecuteCommand", "InsertString", bolShowUI, str);
                    break;
                case "fileopen":
                    var file = document.createElement('input');
                    file.setAttribute('id', 'dcInputFile');
                    file.setAttribute('type', 'file');
                    file.setAttribute('accept', '.xml,.json,.rtf,.html,.htm,.odt');
                    file.style.cssText = 'position: relative;left: -2000px; ';
                    rootElement.appendChild(file);
                    file.click();
                    //file文件选中事件
                    file.onchange = function () {
                        var fileList = this.files;
                        if (fileList.length > 0) {
                            // console.log(fileList[0]);
                            var reader = new FileReader();
                            //wyc20230613改变写法
                            reader.readAsDataURL(fileList[0]);
                            reader.onload = function (e) {
                                //获取到文件内容
                                result = rootElement.__DCWriterReference.invokeMethod("LoadDocumentFromFile", e.target.result);
                                if (result === true) {

                                    rootElement.RefreshDocument();
                                }
                                //rootElement.LoadDocumentFromString(e.target.result, 'xml');
                            }
                        }
                    }
                    //在编辑器的window重新获取焦点时,确保点击取消或X时能正确删除file
                    window.addEventListener('focus', function () {
                        setTimeout(function () {
                            file.remove();
                        }, 100);
                    }, { once: true });
                    return result;
                    break;
                case "copy":
                    //var datas = '';
                    //var ref9 = rootElement.__DCWriterReference;
                    //if (ref9 != null) {
                    //    datas = ref9.invokeMethod(
                    //        "DoCopy", false);
                    //}
                    //WriterControl_UI.SetClipboardData(datas, null, 'copy', rootElement);
                    document.execCommand('copy');
                    break;
                case "paste":
                    WriterControl_UI.GetClipboardData(null, rootElement);
                    break;
                case 'cut':
                    var datas = '';
                    var ref9 = rootElement.__DCWriterReference;
                    if (ref9 != null) {
                        datas = ref9.invokeMethod(
                            "DoCut", false, false);
                    }
                    WriterControl_UI.SetClipboardData(datas, null, 'cut', rootElement);
                    break;
                case "documentdefaultfont":
                    //默认字体
                    return rootElement.__DCWriterReference.invokeMethod("DocumentDefaultFont", Parameter);
                    break;
                case "fontborder":
                    //字符边框
                    return rootElement.__DCWriterReference.invokeMethod("Fontborder");
                    break;
                case "documentvaluevalidatewithcreatedocumentcomments":
                    //批注式文档校验                    
                    return rootElement.__DCWriterReference.invokeMethod("DocumentValueValidateWithCreateDocumentComments");
                    break;
                default:
                    // 显示用户界面
                    if (bolShowUI == true) {
                        switch (strCommandName.toLocaleLowerCase()) {
                            case "insertspecifycharacter":
                                //插入特殊字符
                                WriterControl_Dialog.InsertSpecifyCharacterDialog(Parameter, rootElement, true);
                                break;
                            case "paragraphformat":
                                //段落对话框
                                WriterControl_Dialog.paragraphDialog(Parameter, rootElement, true);
                                break;
                            case "tableproperties":
                                //表格属性
                                WriterControl_Dialog.tableDialog(Parameter, rootElement, true);
                                break;
                            case "tablerowproperties":
                                //表格行属性
                                WriterControl_Dialog.tableRowDialog(Parameter, rootElement, true);
                                break;
                            case "tablecellproperties":
                                //单元格属性
                                WriterControl_Dialog.tableCellDialog(Parameter, rootElement, true);
                                break;
                            case "table_splitcellext":
                                //拆分单元格
                                WriterControl_Dialog.splitCellDialog(Parameter, rootElement, true);
                                break;
                            case "insertcomment":
                                //插入批注
                                WriterControl_Dialog.EditDocumentCommentsDialog(Parameter, rootElement, true);
                                break;
                            case "font":
                                //字体
                                WriterControl_Dialog.FontSelectionDialog(Parameter, rootElement, false);
                                break;
                            case "inserttable":
                                //插入表格
                                WriterControl_Dialog.insertTableDialog(Parameter, rootElement, true);
                                break;
                            case "formviewmode":
                                //表单模式
                                WriterControl_Dialog.formModeDialog(Parameter, rootElement, false);
                                break;
                            case "contentprotect":
                                //内容保护
                                WriterControl_Dialog.contentProtectedModeDialog(Parameter, rootElement, false);
                                break;
                            case "insertcheckboxorradio":
                                // 单复选框
                                WriterControl_Dialog.InsertMultipleCheckBoxOrRadioDialog(Parameter, rootElement);
                                break;
                            case "insertlabelelement":
                                // 标签文本
                                WriterControl_Dialog.LabelDialog(Parameter, rootElement, true);
                                break;
                            case "inserthorizontalline":
                                // 水平线
                                WriterControl_Dialog.HorizontalLineDialog(Parameter, rootElement, true);
                                break;
                            case "insertpageinfoelement":
                                // 页码
                                WriterControl_Dialog.PageNumberDialog(Parameter, rootElement, true);
                                break;
                            case "insertbutton":
                                // 按钮
                                WriterControl_Dialog.ButtonDialog(Parameter, rootElement, true);
                                break;
                            case "inserttdbarcodeelement":
                                // 二维码
                                WriterControl_Dialog.QRCodeDialog(Parameter, rootElement, true);
                                break;
                            case "insertbarcodeelement":
                                // 条形码
                                WriterControl_Dialog.BarCodeDialog(Parameter, rootElement, true);
                                break;
                            case "insertimage":
                            case "dcinsertimage":
                                // 插入图片
                                var file = document.createElement("input");
                                file.setAttribute("id", "dcInputFile");
                                file.setAttribute("type", "file");
                                file.setAttribute("accept", "image/png");
                                file.style.display = 'none';
                                rootElement.appendChild(file);
                                file.click();
                                //file文件选中事件
                                file.onchange = function () {
                                    var imgFile;
                                    if (this.files) {
                                        imgFile = this.files[0];
                                    }
                                    if (imgFile && imgFile.type == "image/png") {
                                        var reader = new FileReader();
                                        reader.readAsDataURL(imgFile);
                                        reader.onload = function () {
                                            var base64 = reader.result;
                                            var options = {
                                                Src: base64
                                            };
                                            return rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", strCommandName, false, options);
                                        };
                                    }
                                }
                                //在编辑器的window重新获取焦点时,确保点击取消或X时能正确删除file
                                window.addEventListener('focus', function () {
                                    setTimeout(function () {
                                        file.remove();
                                    }, 100);
                                }, { once: true });
                                break;

                            case "insertmedicalexpression":
                                WriterControl_Dialog.MedicalExpressionDialog(Parameter, rootElement, bolShowUI);
                                break;
                            case "insertinputfield":
                                WriterControl_Dialog.InputFieldDialog(Parameter, rootElement, bolShowUI);
                                break;
                            case "elementproperties":
                                //属性对话框
                                var typename = rootElement.__DCWriterReference.invokeMethod("GetCurrentElementTypeName");//当前元素的类型名称
                                if (typename != null && typename != "") {
                                    var ele = rootElement.CurrentElement(typename);
                                    var element = rootElement.GetElementProperties(ele);//rootElement.CurrentElement(typename);
                                    if (typename == "xtextinputfieldelement") {
                                        WriterControl_Dialog.InputFieldDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                    if (typename == "xtextradioboxelement") {
                                        WriterControl_Dialog.CheckboxAndRadioDialog(element, rootElement, ele);
                                        return true;
                                    }
                                    if (typename == "xtextcheckboxelement") {
                                        WriterControl_Dialog.CheckboxAndRadioDialog(element, rootElement, ele);
                                        return true;
                                    }
                                    if (typename == "xtextnewbarcodeelement") {
                                        WriterControl_Dialog.BarCodeDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                    if (typename == "xtexttdbarcodeelement") {
                                        WriterControl_Dialog.QRCodeDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                    if (typename == "xtextlabelelement") {
                                        WriterControl_Dialog.LabelDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                    if (typename == "xtexthorizontallineelement") {
                                        WriterControl_Dialog.HorizontalLineDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                    if (typename == "xtextimageelement") {
                                        WriterControl_Dialog.ImageDialog(element, rootElement, ele);
                                        return true;
                                    }
                                    if (typename == "xtextpageinfoelement") {
                                        WriterControl_Dialog.PageNumberDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                    if (typename == "xtextbuttonelement") {
                                        WriterControl_Dialog.ButtonDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                    if (typename == "xtextnewmedicalexpressionelement") {
                                        WriterControl_Dialog.MedicalExpressionDialog(element, rootElement, false, ele);
                                        return true;
                                    }
                                }
                                return false;
                                break;
                            default:
                                return rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", strCommandName, bolShowUI, Parameter);
                                break;
                        }
                    } else {
                        return rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", strCommandName, bolShowUI, Parameter);
                    }
                    break;
            }
        };
        //封装时间不够补0
        function showTime(t) {
            var time
            time = t >= 10 ? t : '0' + t
            return time
        }

        /** wyc20230512和四代接口保持兼容
         * 获取指定ID的元素的属性 
         * @param {object} element 要修改的前端引用元素
         */
        rootElement.GetElementProperties = function (element) {
            if (element === null) {
                console.log("GetElementProperties:element为空");
                debugger;
                return null;
            }
            if (typeof (element) === "object" && typeof (element.serializeAsArg) === "function") {
                return rootElement.__DCWriterReference.invokeMethod("DCGetElementProperties", element);
            } else {
                return rootElement.__DCWriterReference.invokeMethod("DCGetElementProperties2", element);
            }
        };
        //rootElement.GetElementPropertiesByID = function (element) {
        //    return rootElement.__DCWriterReference.invokeMethod("DCGetElementProperties2", element);
        //};
        /** wyc20230512和四代接口保持兼容
         * 设置指定ID的元素的属性 
         * @param {object} element 要修改的前端引用元素
         * @param {object} options 元素的属性集合对象
         */
        rootElement.SetElementProperties = function (element, options) {
            if (typeof (element) === "object" && typeof (element.serializeAsArg) === "function") {
                return rootElement.__DCWriterReference.invokeMethod("DCSetElementProperties", element, options);
            } else {
                return rootElement.__DCWriterReference.invokeMethod("DCSetElementProperties2", element, options);
            }
        };
        //rootElement.SetElementPropertiesByID = function (element, options) {
        //    return rootElement.__DCWriterReference.invokeMethod("DCSetElementProperties2", element, options);
        //};
        /** wyc20230515和四代接口保持兼容
         * 使用JSON参数插入图片 
         * @param {object} options 元素的属性集合对象
         *  options 可以是单个对象，也可以是对象数组，单个对象内属性包括( ID、Src、Width、Height、SaveContentInFile)
         */
        rootElement.InsertImageByJSONText = function (options) {
            var opt = options;
            if (typeof (options) == "string") {
                try {
                    opt = JSON.parse(options);
                }
                catch (e) { opt = null; }
            }
            if (opt != null) {
                return rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", "InsertImage", false, opt);
            } else {
                return null;
            }

        };
        /** 
        * 兼容四代插入批注 
        * @param {object} commentInfo 批注信息
        * @returns {boolean} 执行结果
        */
        rootElement.NewComment = function (commentInfo) {
            return rootElement.__DCWriterReference.invokeMethod("NewComment", commentInfo);
        };
        /** 
        * 兼容四代获取批注列表 
        * @returns {Array} 批注列表信息
        */
        rootElement.getCommentList = function () {
            return rootElement.__DCWriterReference.invokeMethod("getCommentList");
        };
        /** 
        * 兼容四代修改指定批注内容
        * @param {int} index 批注序号
        * @param {string} newContent 批注文本
        * @returns {boolean} 执行结果
        */
        rootElement.setCommentContent = function (index, newContent) {
            return rootElement.__DCWriterReference.invokeMethod("setCommentContent", index, newContent);
        };
        /** 
        * 兼容四代删除指定批注内容
        * @param {int} index 批注序号
        * @returns {boolean} 执行结果
        */
        rootElement.DeleteComment = function (index) {
            return rootElement.__DCWriterReference.invokeMethod("DeleteComment", index);
        };

        /** 
        * 获取当前批注
        * @returns {boolean} 执行结果
        */
        rootElement.GetCurrentComment = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentComment");
        };
        /** 
        * 设置当前批注
        * @param {object} index 批注序号
        * @returns {boolean} 执行结果
        */
        rootElement.SetCurrentComment = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetCurrentComment", parameter);
        };

        /**
        * 兼容四代获取当前单元格
        */
        rootElement.CurrentTableCell = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentTableCell");
        };
        /** 
        * 兼容四代获取单元格的网格线设置
        * @param {object} parameter 批注序号
        * @returns {object} 执行结果
        */
        rootElement.GetTableCellGridLineInfo = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableCellGridLineInfo", parameter);
        };
        /** 
        * 兼容四代设置单元格网格线
        * @param {int} index 单元格对象
        * @param {int} index 网格线设置
        * @returns {boolean} 执行结果
        */
        rootElement.SetTableCellGridLineInfo = function (cell, settings) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellGridLineInfo", cell, settings);
        };
        /** 
        * 兼容四代设置表格的边框
        * @param {int} index 表格ID/表格属性列表/表格后台引用对象
        * @param {object} settings 网格线设置
        * @returns {boolean} 执行结果
        */
        rootElement.SetTableBorder = function (table, settings) {
            //wyc20230707采用新写法
            var prop = rootElement.GetElementProperties(table);
            if (prop != null && Array.isArray(prop.Cells) === true) {
                var opt = {
                    Style: settings
                };
                for (var i = 0; i < prop.Cells.length; i++) {
                    rootElement.SetElementProperties(prop.Cells[i], opt);
                }
                rootElement.SetElementProperties(table, opt);
            }
            //return rootElement.__DCWriterReference.invokeMethod("SetTableBorder", table, settings);
        };
        /** 
       * 兼容四代设置单元格的边框
       * @param {int} index 单元格对象
       * @param {int} index 网格线设置
       * @returns {boolean} 执行结果
       */
        rootElement.SetTableCellBorder = function (cell, settings) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellBorder", cell, settings);
        };
        /** 
        * 兼容四代格式刷
        */
        rootElement.BeginFormatBrush = function () {
            rootElement.__DCWriterReference.invokeMethod("BeginFormatBrush");
        };
        /** 
       * 兼容四代撤销
       */
        rootElement.Undo = function () {
            rootElement.__DCWriterReference.invokeMethod("Undo");
        };
        ///** 
        //* 兼容四代重做
        //*/
        //rootElement.Redo = function () {
        //    rootElement.__DCWriterReference.invokeMethod("Redo");
        //};
        /**
        * 段落格式接口
        */
        rootElement.ParagraphFormat = function (paragraphFormatParameter) {
            rootElement.__DCWriterReference.invokeMethod("ParagraphFormat", paragraphFormatParameter);
        };
        /**
        * 兼容四代关于接口
        * */
        rootElement.AboutDialog = function () {
            rootElement.__DCWriterReference.invokeMethod("ShowAboutDialog");
        };
        /**
       * 兼容四代关于接口
       * */
        rootElement.AboutControl = function () {
            rootElement.__DCWriterReference.invokeMethod("ShowAboutDialog");
        };
        /**
         * 兼容第四代接口正文追加内容
         * @param {string} xmlContent xml内容
         */
        rootElement.AppendBody = function (xmlContent) {
            rootElement.__DCWriterReference.invokeMethod("AppendBody", xmlContent);
        };
        /**
         * 兼容第四代接口清空所有输入域
         */
        rootElement.ClearAllFields = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearAllFields");
        };
        /**
         * 兼容第四代接口清空所有绑定数据源的输入域的值和文本、单选框的选择状态、复选框的选择状态
         */
        rootElement.ClearAllParameterValue = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearAllParameterValue");
        };
        /**
         * 兼容第四代接口清空正文内容
         */
        rootElement.ClearDocumentBody = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearDocumentBody");
        };
        /**
         * 兼容第四代接口提交用户痕迹信息
         */
        rootElement.CommitDocumentUserTrace = function () {
            rootElement.__DCWriterReference.invokeMethod("CommitDocumentUserTrace");
        };
        /**
         * 获取当前单选框或复选框
         *@returns {object} 执行结果 
         */
        rootElement.CurrentCheckboxOrRadio = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentCheckboxOrRadio");
        };
        /**
         * 获取当前输入域
         *@returns {object} 执行结果 
         */
        rootElement.CurrentInputField = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentInputField");
        };
        /**
         * 获取当前表格
         *@returns {object} 执行结果 
         */
        rootElement.CurrentTable = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentTable");
        };
        /**
         * 获取当前表格行
         *@returns {object} 执行结果 
         */
        rootElement.CurrentTableRow = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentTableRow");
        };
        /**
         * 获取当前选择内容
         *@returns {string} 执行结果 
         */
        rootElement.DocumentSelection = function (format) {
            return rootElement.__DCWriterReference.invokeMethod("DocumentSelection", format);
        };
        /**
         * 移动输入焦点到指定地点
         *@returns {bool} 执行结果 
         */
        rootElement.FocusAdjacent = function (sWhere, element) {
            return rootElement.__DCWriterReference.invokeMethod("FocusAdjacent", sWhere, element);
        };
        /**
         * 此方法用于处理canvas上的resizeObserver监听,并处理EventPageResize事件
         * @param {object} 修改的元素
         * @returns
         */
        rootElement.CollectrResizeCanvas = function (element) {
            if (rootElement != null && typeof rootElement.EventPageResize == 'function') {
                if (!rootElement.DCResizeCanvas) {
                    rootElement.DCResizeCanvas = [];
                }
                rootElement.DCResizeCanvas.push(element);
                clearTimeout(rootElement.ResizeTime);
                rootElement.ResizeTime = setTimeout(function () {
                    rootElement.EventPageResize(rootElement.DCResizeCanvas);
                    rootElement.DCResizeCanvas = [];
                    clearTimeout(rootElement.ResizeTime);
                    delete rootElement.ResizeTime;
                }, 10);
            }
        }
        /**
         * 执行粘贴操作
         *@returns {bool} 执行结果 
         */
        rootElement.DCPaste = function () {
            return rootElement.__DCWriterReference.invokeMethod("DCPaste");
        };
        /**
         * 获取指定编号的元素的文本
         *@returns {string} 文本 
         */
        rootElement.GetElementTextByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementTextByID", id);
        };
        /**
         * 获取所有的输入域
         *@returns {object} 执行结果 
         */
        rootElement.GetAllInputFields = function (excludeReadonly, excludeHiddenElement) {
            return rootElement.__DCWriterReference.invokeMethod("GetAllInputFields", excludeReadonly, excludeHiddenElement);
        };
        /**
         * 获取当前字体
         *@returns {object} 执行结果 
         */
        rootElement.getFontObject = function () {
            return rootElement.__DCWriterReference.invokeMethod("getFontObject");
        };
        /**
         * 设置当前字体
         *@returns {object} 执行结果 
         */
        rootElement.setFontObject = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("setFontObject", parameter);
        };
        /**
         * 获取当前字体大小
         *@returns {float} 执行结果 
         */
        rootElement.getFontSize = function () {
            return rootElement.__DCWriterReference.invokeMethod("getFontSize");
        };
        /**
         * 获取当前文档信息
         *@returns {object} 执行结果 
         */
        rootElement.GetDocumentInfos = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentInfos");
        };
        /**
         * 获取标签的链接信息
         *@returns {object} 执行结果 
         */
        rootElement.GetLabelElementContactSettings = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetLabelElementContactSettings", parameter);
        };
        /**
         * 获取元素的PrintVisibility属性
         *@returns {object} 执行结果 
         */
        rootElement.GetElementPrintVisibility = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementPrintVisibility", parameter);
        };
        /**
         * 设置文档的DocumentInfo
         */
        rootElement.SetDocumentInfos = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetDocumentInfos", parameter);
        };
        /**
         * 设置标签信息
         */
        rootElement.SetLabelElementContactSettings = function (label, parameter) {
            rootElement.__DCWriterReference.invokeMethod("SetLabelElementContactSettings", label, parameter);
        };
        /**
         * 获取当前元素信息
         */
        rootElement.CurrentElement = function (typename) {
            if (typename != null && typename != "") {
                return rootElement.__DCWriterReference.invokeMethod("CurrentElement", typename);
            }
            else {
                var currenttypename = rootElement.__DCWriterReference.invokeMethod("GetCurrentElementTypeName");//当前元素的类型名称
                if (currenttypename != null && currenttypename != "") {
                    return rootElement.__DCWriterReference.invokeMethod("CurrentElement", currenttypename);
                }
            }
            return "";
        };
        /**
         * 获取痕迹列表信息
         */
        rootElement.GetDocumentUserTrackInfos = function () {
            var list = rootElement.__DCWriterReference.invokeMethod("GetDocumentUserTrackInfos");
            if (list != null && list.length > 0) {
                for (var iCount = 0; iCount < list.length; iCount++) {
                    var item = list[iCount];
                    item.Focus = function () {
                        if (typeof (item.NativeHandle) == "number") {
                            rootElement.__DCWriterReference.invokeMethod(
                                "FocusElementByNativeHandle",
                                item.NativeHandle);
                        }
                    };
                }
            }
            return list;
        };
        /**
         * 定位痕迹列表信息
         */
        rootElement.NavigateByUserTrackInfo = function (handle) {
            return rootElement.__DCWriterReference.invokeMethod("NavigateByUserTrackInfo", handle);
        };
        /**
         * 获取表格信息
         */
        rootElement.GetTableElementById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableElementById", id);
        };
        /**
        * 设置表格属性
        */
        rootElement.SetTableElementPoperties = function (elementID, parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableElementPoperties", elementID, parameter);
        };
        /**
        * 设置表格行属性
        */
        rootElement.SetTableRowElementPoperties = function (elementID, rowIndex, parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableRowElementPoperties", elementID, rowIndex, parameter);
        };
        /**
        * 设置表格单元格属性
        */
        rootElement.SetTableCellElementPoperties = function (elementID, rowIndex, columnIndex, parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellElementPoperties", elementID, rowIndex, columnIndex, parameter);
        };


        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 获取文档是否被修改
         * @param {object} parameter 第五代下该参数无效
         * @returns 
         */
        rootElement.getModified = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("getModified");
        };
        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 重置文档修改状态
         * @param {object} parameter 第五代下该参数无效
         * @returns 
         */
        rootElement.resetModified = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("resetModified");
        };
        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 重置文档修改状态
         * @returns 
         */
        rootElement.ResetDocumentModified = function () {
            return rootElement.__DCWriterReference.invokeMethod("resetModified");
        };
        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 设置控件只读状态
         * @parameter 布尔值
         * @returns 操作是否成功
         */
        rootElement.SetControlReadonly = function (parameter) {

            var isreadonly = null;
            if (parameter === "true" || parameter === true) {
                isreadonly = true;
            } else if (parameter === "false" || parameter === false) {
                isreadonly = false;
            }
            parameter = isreadonly;
            return rootElement.__DCWriterReference.invokeMethod("setControlReadonly", parameter);
        };
        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 设置控件只读状态
         * @parameter 要插入的文档内容xml字符串，五代接口只接收一个参数其它的忽略
         * @returns 操作是否成功
         */
        rootElement.InsertXmlString = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("insertXmlString", parameter);
        };


        /** 
         * 兼容四代的接口插入XML
         * @parameter 要插入的文档内容xml字符串，五代接口只接收一个参数其它的忽略
         * @returns 操作是否成功
         */
        rootElement.InsertXmlBase64String = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("InsertXmlBase64String", parameter);
        };


        ///** //wyc20230525:增加与四代编辑器兼容的接口
        // * 清空文档数据源绑定参数
        // * @returns 操作是否成功
        // */
        //rootElement.ClearAllParameterValue = function () {
        //    return rootElement.__DCWriterReference.invokeMethod("clearAllParameterValue");
        //};
        /** //wyc20230525:增加与四代编辑器兼容的接口
         * 对指定ID插入XML文档片断
         * //@param obj:{ 
            //            "file": arr,//xml文档 
            //            "format": "xml",//xml文档格式
            //            "base64": "false",//是否是base64字符串
            //            "position":{"start":在目标容器的头部插入，"end":在目标容器的尾部插入}
            //}
         * @id 要插入的容器元素的ID
         * @returns 操作是否成功
         */
        rootElement.InsertXmlById = function (obj, id) {
            return rootElement.__DCWriterReference.invokeMethod("InsertXmlById", obj, id);
        };
        /** //wyc20230526:增加与四代编辑器兼容的接口
         * 分别提供页眉，文档体，页脚的XML来组合成一个文档进行加载
         * @param options{
               FileFormat: "xml",
               UseBase64String: "false",
               HeaderContent: "",
               BodyContent: "",
               FooterContent: ""
           }
         * @returns 操作是否成功
         */
        rootElement.LoadDocumentFromMixString = function (options) {
            var tick = new Date().valueOf();
            // 删除所有的页面图形元素
            var cnode = rootElement.firstChild;
            while (cnode != null) {
                if (cnode.nodeName == "CANVAS" && cnode.getAttribute("dctype") == "page") {
                    var tempNode = cnode;
                    cnode = cnode.nextSibling;
                    rootElement.removeChild(tempNode);
                }
                else {
                    cnode = cnode.nextSibling;
                }
            }
            rootElement.__WaterMarkData = null;
            WriterControl_Print.ClosePrintPreview(rootElement, false);
            rootElement.__LastLoadDocumentTime = new Date().valueOf();
            var result = null;
            result = rootElement.__DCWriterReference.invokeMethod("loadDocumentFromMixString", options);
            rootElement.TempElementForDoubleBuffer = null;
            WriterControl_Rule.InvalidateView(rootElement, "hrule");
            WriterControl_Rule.InvalidateView(rootElement, "vrule");
            WriterControl_Paint.InvalidateAllView(rootElement);
            tick = new Date().valueOf() - tick;
            WriterControl_Paint.UpdateViewForWaterMark(rootElement);
        };
        /** //wyc20230526:增加与四代编辑器兼容的接口
         * 给定文档XML的BASE64字符串转换成HTML
         * @param base64string{加载的base64字符串}
         * @returns 文档的HTML
         */
        rootElement.getHtmlByXMLBase64String = function (base64string) {
            return rootElement.__DCWriterReference.invokeMethod("getHtmlByXMLBase64String", base64string);
        };
        /** 
         * 获取指定的元素类型列表
         * 兼容四代的querySelectorAll参数
         * 例如：querySelectorAll('*[dctype=XTextInputFieldElement]')
         * 例如：querySelectorAll('XTextInputFieldElement')
         * @param 元素类型名称
         * @returns 文档的HTML
         */
        rootElement.GetElementsByTypeName = function (elementTypeName) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementsByTypeName", elementTypeName);
        };

        /** //wyc20230529:增加与四代编辑器兼容的接口
         * 给定若干XML作为子文档合并后转换成预览下的HTML
         * @param options:{ 
                "files": arr,//数组对象，存的是xml文档 
                "format": "xml",//xml文档格式
                "base64": "false",//是否是base64字符串
                "megedoc": "true"//是否合并，第五代BS不支持此属性，全部按true处理
                "modefile": "xmlstring"//病程合并模式下提供页眉页脚的主文档XML字符串
                "splitmode": "none"//各个文件合并时中间的分隔模式，"none"不分隔，"pagebreak"换新页，"linebreak"，用换行符分隔，"line"，用水平线分隔
         * @returns 文档的HTML
         */
        rootElement.getHtmlByFiles = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("getHtmlByFiles", options);
        };

        /**
         * zhangbin 20230601 处理GetPrintPreviewHTMLByMixedFiles
         * @param {obj} options: {
                //    Files: [
                //        [],
                //        [],
                //        []
                //    ],
                //    UseBase64: "false"
                //    WaterMark: null
                //} 
         * @returns 打印预览的html
         */
        rootElement.GetPrintPreviewHTMLByMixedFiles = function (options) {
            //先给默认值
            var printOptions = {
                files: [],
                format: "xml",
                base64: options.UseBase64 ? options.UseBase64 : 'false',
                megedoc: "true",
                modefile: "",
                splitmode: "none"
            }
            if (options.Files && Array.isArray(options.Files)) {
                for (var file = 0; file < options.Files.length; file++) {
                    //解析二维数组
                    var innerFile = options.Files[file];
                    if (innerFile && Array.isArray(innerFile) && innerFile.length > 0) {
                        if (file == 0) {
                            printOptions.modefile = innerFile[0];
                        }
                        for (var innerfile = 0; innerfile < innerFile.length; innerfile++) {
                            printOptions.files.push(innerFile[innerfile]);
                        }
                    }
                }
            }

            //在此处处理getHtmlByFiles返回打印的html，临时写法
            return rootElement.getHtmlByFiles(printOptions);
        }

        /**
         * 处理打印的html
         * @returns
         */
        rootElement.PrintPreviewByHtml = function (printHtml) {
            WriterControl_Print.PrintPreview(rootElement, undefined, printHtml);
        }

        /**
         * 获取当前选择的元素类型名称，为属性对话框准备接口
         * @returns 文档的元素类型名称
         */
        rootElement.GetCurrentElementTypeName = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentElementTypeName");
        };
        /**
         * 获取文档行为选项
         * @returns 选项
         */
        rootElement.GetBehaviorOptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetBehaviorOptions");
        };
        /**
         * 获取文档编辑选项
         * @returns 选项
         */
        rootElement.GetEditOptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetEditOptions");
        };
        /**
         * 获取文档安全选项
         * @returns 选项
         */
        rootElement.GetSecurityOptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetSecurityOptions");
        };
        /**
         * 获取文档视图选项
         * @returns 选项
         */
        rootElement.GetViewOptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetViewOptions");
        };
        /** 
         * 添加查找接口
         * @param options:{ 
                "searchstring": string,//要查找的字符串
                "enablereplacestring": "false",//是否启用替换
                "replacestring": "false",//要替换的字符串
                "backward": "true"//是否向后替换
                "ignorecase": "true"//是否区分大小写
                "logundo": "true"//记录撤销操作信息
                "excludebackgroundtext": "true"//忽略掉背景文字
                "SearchID": "true"//是否限制为查询元素编号
         * @returns 返回次数
         */
        rootElement.Search = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("Search", options);
        };
        /** 
         * 添加替换接口
         * @param options:{ 
                "searchstring": string,//要查找的字符串
                "enablereplacestring": "false",//是否启用替换
                "replacestring": "false",//要替换的字符串
                "backward": "true"//是否向后替换
                "ignorecase": "true"//是否区分大小写
                "logundo": "true"//记录撤销操作信息
                "excludebackgroundtext": "true"//忽略掉背景文字
                "SearchID": "true"//是否限制为查询元素编号
         * @returns 返回次数
         */
        rootElement.Reaplace = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("Reaplace", options);
        };
        /** 
         * 添加替换所有接口
         * @param options:{ 
                "searchstring": string,//要查找的字符串
                "enablereplacestring": "false",//是否启用替换
                "replacestring": "false",//要替换的字符串
                "backward": "true"//是否向后替换
                "ignorecase": "true"//是否区分大小写
                "logundo": "true"//记录撤销操作信息
                "excludebackgroundtext": "true"//忽略掉背景文字
                "SearchID": "true"//是否限制为查询元素编号
         * @returns 返回次数
         */
        rootElement.ReplaceAll = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("ReplaceAll", options);
        };

        /**
        * 弹出查找&替换设置对话框
        * @param options 查找替换属性
        */
        rootElement.SearchAndReplaceDialog = function (options) {
            return WriterControl_Dialog.SearchAndReplaceDialog(options, rootElement);
        }

        /** //wyc20230601:增加与四代编辑器兼容的接口
         * 应用文档选项
         * @returns 操作是否成功
         */
        rootElement.ApplyDocumentOptions = function () {
            var obj = rootElement.__DCWriterReference.invokeMethod("ApplyDocumentOptions", rootElement.DocumentOptions);;
            if (obj === true) {

                WriterControl_Paint.InvalidateAllView(rootElement);
                //console.log(rootElement.DocumentOptions);

                rootElement.refreshDocumentOptions();
            }
            //rootElement.DocumentOptions = obj;
            return obj;
        };

        //wyc20230602初始化前端JS结构中的文档选项
        rootElement.refreshDocumentOptions = function () {
            var options = rootElement.__DCWriterReference.invokeMethod("GetDocumentOptions");
            rootElement.DocumentOptions = options;
            //rootElement.DocumentOptions = {
            //    ViewOptions: options.viewOptions,
            //    EditOptions: options.editOptions,
            //    SecurityOptions: options.securityOptions,
            //    BehaviorOptions: options.behaviorOptions
            //};
        };

        /**
        * 兼容四代，指定下拉列表的默认选择项
        * @param bool 是否成功
        */
        rootElement.SetFieldDropListItemByValue = function (id, valuestring) {
            return rootElement.__DCWriterReference.invokeMethod("SetFieldDropListItemByValue", id, valuestring);
        }
        /**
        * 获取当前的表单模式类型
        * @param string 表单模式字符串
        */
        rootElement.FormView = function () {
            return rootElement.__DCWriterReference.invokeMethod("FormView");
        }

        /**
        * 当前内容保护状态
        * @param string 内容保护字符串
        */
        rootElement.ProtectType = function () {
            return rootElement.__DCWriterReference.invokeMethod("ProtectType");
        }

        /**
        * 设置指定编号的单选框或复选框是否选中
        * @param string 编号
        * @param bool 是否选中
        */
        rootElement.SetElementCheckedByID = function (id, isChecked) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementCheckedByID", id, isChecked);
        }


        /**wyc20230613兼容四代接口
        * 设置指定元素的自定义属性
        * @param element 指定元素的后台引用对象，也可以是元素ID字符串，也可以元素属性对象
        * @param options 表示为键值对象形式的JSON对象
        */
        rootElement.SetElementCustomAttributes = function (element, options) {
            if (typeof (element) === "object" && typeof (element.serializeAsArg) === "function") {
                return rootElement.__DCWriterReference.invokeMethod("SetElementCustomAttributes2", element, options);
            } else {
                return rootElement.__DCWriterReference.invokeMethod("SetElementCustomAttributes", element, options);
            }
        }
        /**wyc20230613兼容四代接口
        * 获取指定元素的自定义属性
        * @param element 指定元素的后台引用对象，可以是元素ID字符串，也可以元素属性对象
        */
        rootElement.GetElementCustomAttributes = function (element) {
            if (typeof (element) === "object" && typeof (element.serializeAsArg) === "function") {
                return rootElement.__DCWriterReference.invokeMethod("GetElementCustomAttributes2", element);
            } else {
                return rootElement.__DCWriterReference.invokeMethod("GetElementCustomAttributes", element);
            }
        }
        /**
       * 兼容四代设置元素InnerValue文本
       * @param id 输入域编号
       * @param newValue 新的值
       * @param newText 新的文本
       */
        rootElement.SetElementInnerValueStringByID = function (id, newValue, newText) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementInnerValueStringByID", id, newValue, newText);
        }
        /**
       * 兼容四代获取元素InnerValue文本
       * @param id 输入域编号
       */
        rootElement.GetElementInnerValueStringByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementInnerValueStringByID", id);
        }
        /**
       * 获取当前段落的样式信息
       */
        rootElement.GetCurrentParagraphStyle = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentParagraphStyle");
        }
        /**
       * 设置当前段落的样式信息
       * @param parameter 样式对象
       */
        rootElement.SetCurrentParagraphStyle = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetCurrentParagraphStyle", parameter);
        }

        /**
       * 兼容四代获取所有病程或指定编号的病程
       * @param id 病程编号，可为空
       */
        rootElement.GetCourseRecords = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetCourseRecords", id);
        }


        /**
          * 兼容四代获取表格的自定义属性
          * @param table 表格对象
          */
        rootElement.GetTableAttribute = function (table) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementCustomAttributes", table);
        }
        /**
          * 兼容四代设置表格的自定义属性
          * @param table 表格对象
          * @param option 自定义对象
          */
        rootElement.SetTableAttribute = function (table, option) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementCustomAttributes", table, option);
        }
        /**
          * 兼容四代获取表格行的自定义属性
          * @param table 表格对象
          */
        rootElement.GetTableRowAttribute = function (row) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableRowAttribute", row);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param row 表格行对象
          * @param option 自定义对象
          */
        rootElement.SetTableRowAttribute = function (row, option) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableRowAttribute", row, option);
        }
        /**
          * 兼容四代获取单元格的自定义属性
          * @param table 表格对象
          */
        rootElement.GetTableCellAttribute = function (cell) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableCellAttribute", cell);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param cell 单元格对象
          * @param option 自定义对象
          */
        rootElement.SetTableCellAttribute = function (cell, option) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellAttribute", cell, option);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param element 对象
          * @param breadonly 是否只读
          */
        rootElement.SetElementContentReadonly = function (element, breadonly) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementContentReadonly", element, breadonly);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param element 对象
          * @param visible 是否隐藏
          */
        rootElement.SetElementVisibility = function (element, visible) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementVisibility", element, visible);
        }

        /**
          * 兼容四代清除输入域的宽度，恢复初始值,大小写和四代一致
          */
        rootElement.removeSpecifywidth = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("RemoveSpecifywidth", element);
        }
        /**
          * 兼容四代接口，获取全部或指定名称的单选框或复选框
          * @param type 类型名称：radio或checkbox
          * @param name 指定的元素的name属性（可传空，表示获取所有）
        */
        rootElement.GetAllCheckboxOrRadio = function (type, name) {
            return rootElement.__DCWriterReference.invokeMethod("GetAllCheckboxOrRadio", type, name);
        }


        /**wyc20230613兼容四代接口
        * 设置指定元素的自定义属性
        * @param options {对元素进行签名
        *   "id": "img1",
            "base64Img": picturebase64string,
            "scope": "InputField",
            "userID": "zhangsan",
            "userName": "zhangsan",
            "imageInFrontOfText": "false",
            "clientName": "(local)",
            "width": "80",
            "height": "30",
            "providerName": "1" //1:软签 2：诺安签名
        * }
        * @param callback 回调函数
        */
        rootElement.CASignature = function (options, callback) {
            var result = rootElement.__DCWriterReference.invokeMethod("CASignature", options);
            if (typeof (callback) == "function") {
                callback.call(rootElement, result);
            }
            return result;
        }

        /**wyc20230703兼容四代接口
        * 设置指定元素的自定义属性
        * @param options {对元素进行签名
        *   "id": "img1",
        * }
        * @param callback 回调函数
        */
        rootElement.CAReSignature = function (options, callback) {
            if (typeof (options) === "object") {
                options["ReSign"] = true;
            }
            var result = rootElement.__DCWriterReference.invokeMethod("CASignature", options);
            if (typeof (callback) == "function") {
                callback.call(rootElement, result);
            }
            return result;
        }

        /**wyc20230619兼容四代接口
        * 设置指定元素的自定义属性
        * @param options:{ 
                "files": arr,//数组对象，存的是xml文档 
                "base64": "false",//是否是base64字符串
                "megedoc": "false"//是否合并
                "modefile": "xmlstring"//合并模式下提供页眉页脚的主文档XML字符串
                "splitmode": "none"//合并模式下各文档中间的分隔模式，"none"不分隔，"pagebreak"换新页，"linebreak"，用换行符分隔，"line"，用水平线分隔
                "filename": ""//导出PDF的文件名
                "resulttype": ""//返回类型："DownloadFile"表示直接下载文件;"Base64String"表示返回pdf二进制的BASE64字符串
                "forceblacktextcolor": "false"//设置导出的PDF强制使用黑色字体
        }
        * @param callback 回调函数
        */
        rootElement.GetPDFByFiles = function (options, callback) {
            //wyc20230625:重写逻辑准备调用第四代接口
            var strServicePageUrl = DCTools20221228.FixServicePageUrl(rootElement.getAttribute("servicepageurl"));
            if (strServicePageUrl == null || strServicePageUrl.length == 0) {
                console.error("DCWriter:未配置ServicePageUrl,无法执行GetPDFByFiles.");
                return false;
            }
            // 此处对应的服务器代码在 DCWriterForASPNET\Writer\Controls\Web\WC_WASM.cs
            var strUrl = strServicePageUrl + "?wasm=getpdfbyfiles&dcbid2022=" + DCTools20221228.GetClientID();
            var postData = rootElement.__DCWriterReference.invokeMethod("InnerGetPDFByFilesData", options);
            var xhr = new XMLHttpRequest();
            var asycinvoke = options != null && options.resulttype === "DownloadFile";
            var resultstr = null;
            xhr.open("POST", strUrl, asycinvoke);
            //xhr.responseType = "blob";
            xhr.onload = async function () {
                if (this.status == 200) {
                    resultstr = this.response;
                    if (options == null || options.resulttype !== "DownloadFile") {
                        return;
                    }
                    else {
                        let downloadElement = document.createElement("a");
                        let href = window.URL.createObjectURL(resultstr); //创建下载的链接
                        downloadElement.href = href;
                        downloadElement.download = "downloadPdf_" + new Date().valueOf() + ".pdf"; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放掉blob对象
                        resultstr = true;
                    }
                }
            };
            xhr.send(postData);
            if (typeof (callBack) == "function") {
                callBack.call(rootElement, resultstr);
            }
            return resultstr;
        };

        /**wyc20230619兼容四代接口
        * 专门设置标签元素的字符连接模式属性的接口
        * @param element 需要设置的标签元素的ID、元素属性列表或后台.NET引用对象
        * @param options:{ 
                "ContactAction": "Normal"//连接模式 
                "AttributeNameForContactAction": "科室",//连接字符串的来源自定义名称
                "LinkTextForContactAction": "-",//各连接字符串的分隔符
        }
        */
        rootElement.SetLabelElementContactSettings = function (element, options) {
            return rootElement.SetElementProperties(element, options);
        };
        /**
          * 兼容四代获取改变的元素ID列表
          */
        rootElement.getModifiedElements = function (typename) {
            return rootElement.__DCWriterReference.invokeMethod("GetModifiedElements", typename);
        };

        /**
          * 删除指定编号的元素
          */
        rootElement.DeleteElementByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("DeleteElementByID", id);
        };

        /**wyc20230627自动修复表格列宽使其自适应容器宽度
        * @param tableElement 需要设置的表格元素的ID、元素属性列表或后台.NET引用对象，为空则引用当前表格元素
        */
        rootElement.AutoFixTableWidth = function (tableElement) {
            if (typeof (tableElement) === "object" && typeof (tableElement.serializeAsArg) === "function") {
                return rootElement.__DCWriterReference.invokeMethod("AutoFixTableWidth2", tableElement);
            } else {
                return rootElement.__DCWriterReference.invokeMethod("AutoFixTableWidth", tableElement);
            }
        }
        /**
         * 获取最后一次的打印信息
         */
        rootElement.GetPrintResult = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetPrintResult");
        };
        /**
         * 兼容第四代获取文档的总页数
         */
        rootElement.GetDocumentPageNum = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentPageNum");
        };

        /**wyc20230629兼容四代接口
        * 获取打印预览的HTML兼容四代接口
        * @param options:{ 
                "Files": arr,//二维数组对象，允许混合合并，若为空则预览当前文档 
                "InsertLastTableRowToPageBottom": "false"//预览时将表格插入到页底
                "WaterMark": null//预览时附加的水印对象
        }
        * @param callback 回调函数
        */
        rootElement.GetPrintPreviewHTML = function (options, callBack) {
            //wyc20230625:重写逻辑准备调用第四代接口
            var strServicePageUrl = DCTools20221228.FixServicePageUrl(rootElement.getAttribute("servicepageurl"));
            if (strServicePageUrl == null || strServicePageUrl.length == 0) {
                console.error("DCWriter:未配置ServicePageUrl,无法执行GetPrintPreviewHTML.");
                return false;
            }
            // 此处对应的服务器代码在 DCWriterForASPNET\Writer\Controls\Web\WC_WASM.cs
            var strUrl = strServicePageUrl + "?wasm=getprintpreviewhtml&dcbid2022=" + DCTools20221228.GetClientID();
            var postData = rootElement.__DCWriterReference.invokeMethod("InnerGetPrintPreviewHtmlData", options);
            var xhr = new XMLHttpRequest();
            var resultstr = null;
            var hascallback = typeof (callBack) === "function";
            xhr.open("POST", strUrl, hascallback);
            //xhr.responseType = "blob";
            xhr.onload = async function () {
                if (this.status == 200) {
                    resultstr = this.response;
                    if (typeof (callBack) == "function") {
                        callBack.call(rootElement, resultstr);
                    }
                    return;
                }
            };
            xhr.send(postData);
            return resultstr;
        };

        /**
         * 兼容四代接口
         */
        rootElement.GetXmlContent = function () {
            return this.SaveDocumentToString("XML");
        };

        /**
         * 兼容四代接口，获取单元格的数值表达式
         */
        rootElement.GetTableCellExpression = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableCellExpression", parameter);
        };
        /**
         * 兼容四代接口，设置单元格的数值表达式
         */
        rootElement.SetTableCellExpression = function (parameter, expression, isSelected) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellExpression", parameter, expression, isSelected);
        };
        /**
         * 兼容四代接口，保存文档的正文
         */
        rootElement.SaveBodyDocumentToString = function (fileFormat) {
            return rootElement.__DCWriterReference.invokeMethod("SaveBodyDocumentToString", fileFormat);
        };
        /**
        * 兼容四代接口，续打模式
        */
        rootElement.SetJumpPrintMode = function (setValue) {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", "JumpPrintMode", false, setValue);
        };
        /**
        * 兼容四代接口，设置元素的是否打印的属性
        */
        rootElement.SetElementPrintVisibility = function (parameter, visible) {
            rootElement.__DCWriterReference.invokeMethod("SetElementPrintVisibility", parameter, visible);
        };
        /**
        * 兼容四代接口，设置表格列隐藏
        */
        rootElement.SetTableColumnVisible = function (tableElement, columnIndex, visible) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableColumnVisible", tableElement, columnIndex, visible);
        }
        /**
         * 
         * 为表格复制粘贴获取当前选择的表格和单元格
         * @returns
         */
        rootElement.GetSelectTableAndCell = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetSelectTableAndCell");
        }

        /**lxy
         * 兼容四代接口SaveDocumentToStringAsync
         * @param fileFormat:数据格式，如：xml
        */
        rootElement.SaveDocumentToStringAsync = function (fileFormat) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToString", fileFormat);
        }

        /**wyc20230704兼容四代接口
        * 获取元素位置兼容四代接口
        * @param element"可以传元素ID/元素属性列表/元素后台.NET引用"
        */
        rootElement.GetAbsBoundsInDocument = function (element) {
            if (typeof (rootElement.GetElementProperties) !== "function") {
                return null;
            }
            var properties = rootElement.GetElementProperties(element);
            var obj = {
                Left: properties.Left,
                Top: properties.Top,
                AbsLeft: properties.AbsLeft,
                AbsTop: properties.AbsTop,
                Width: properties.Width,
                Height: properties.Height,
                Right: properties.Left + properties.Width,
                Bottom: properties.Top + properties.Height,
                TopInOwnerPage: properties.TopInOwnerPage,
                LeftInOwnerPage: properties.LeftInOwnerPage
            };
            return obj;
        }

        /**wyc20230704兼容四代接口
        * 批量设置表格行高度
        * @param element"可以传元素ID/元素属性列表/元素后台.NET引用"
        * @param newHeight"表格行高度，像素单位"
        */
        rootElement.SetTableHeight = function (element, newHeight) {
            if (typeof (rootElement.GetElementProperties) !== "function") {
                return false;
            }
            var properties = rootElement.GetElementProperties(element);
            if (Array.isArray(properties.RowsHeight) === false) {
                return false;
            }
            var height = 0;
            if (typeof (newHeight) === "string") {
                var str = newHeight.replace("px", "");
                height = parseFloat(str);
                height = height * 3.125;//像素转三百分之一英寸
            } else if (typeof (newHeight) === "number") {
                height = newHeight * 3.125;
            }
            if (height == 0) {
                return false;
            }
            var arr = new Array();
            for (var i = 1; i <= properties.RowsHeight.length; i++) {
                arr.push(height);
            }
            var opt = {
                RowsHeight: arr
            };
            return rootElement.SetElementProperties(element, opt);
        }

        /**wyc20230704新增接口
        * 获取给定表格内的指定行列的单元格后台引用.NET对象
        * GetTableCell(tableID,rowIndex,ColIndex)
        * GetTableCell(tableID,CellIndex)
        */
        rootElement.GetTableCell = function () {
            if (arguments.length === 3 &&
                typeof (arguments[0]) === "string" &&
                typeof (arguments[1]) === "number" &&
                typeof (arguments[2]) === "number") {
                return rootElement.__DCWriterReference.invokeMethod("GetTableCell", arguments[0], arguments[1], arguments[2]);
            } else if (arguments.length === 2 &&
                typeof (arguments[0]) === "string" &&
                typeof (arguments[1]) === "string") {
                return rootElement.__DCWriterReference.invokeMethod("GetTableCell2", arguments[0], arguments[1]);
            }
            return null;
        }

        /**wyc20230705兼容四代接口
        * 获取文档自定义属性
        */
        rootElement.GetDocumentCustomAttributes = function () {
            if (typeof (rootElement.GetElementProperties) !== "function" || rootElement.Document == null) {
                return null;
            }
            var obj = rootElement.GetElementProperties(rootElement.Document);
            if (obj.Attributes) {
                return obj.Attributes;
            } else {
                return null;
            }
        }
        /**wyc20230705兼容四代接口
        * 设置文档自定义属性
        * @param attr "表示自定义属性的前端键-值对象"
        */
        rootElement.SetDocumentCustomAttributes = function (attr) {
            if (typeof (rootElement.SetElementProperties) !== "function" || rootElement.Document == null) {
                return false;
            }
            var options = {
                Attributes: attr
            };
            return rootElement.SetElementProperties(rootElement.Document, options);
        };
        ///**wyc20230705兼容四代接口
        //* 设置文档自定义属性
        //* @param element :要设置的元素后台.NET引用/元素ID/元素属性列表/元素Handle
        //* @param visible :元素的打印可见性，合法参数只有三个"Visible","Hidden","None"
        //*/
        //rootElement.SetElementPrintVisibility = function (element, visible) {
        //    if (typeof (rootElement.SetElementProperties) !== "function" || rootElement.Document == null) {
        //        return false;
        //    }
        //    var options = {
        //        PrintVisibility: visible
        //    };
        //    return rootElement.SetElementProperties(element, options);
        //};

        /**wyc20230705兼容四代接口
        * 设置文档自定义属性
        * @param scriptstring :要设置的脚本字符串
        */
        rootElement.SetDocumentGlobalJavaScript = function (scriptstring) {
            if (typeof (rootElement.SetElementProperties) !== "function" || rootElement.Document == null) {
                return false;
            }
            var options = {
                GlobalJavaScript: scriptstring
            };
            return rootElement.SetElementProperties(rootElement.Document, options);
        };
        /**wyc20230705兼容四代接口
        * 获取文档自定义属性
        */
        rootElement.GetDocumentGlobalJavaScript = function () {
            if (typeof (rootElement.SetElementProperties) !== "function" || rootElement.Document == null) {
                return false;
            }
            var options = rootElement.GetElementProperties(rootElement.Document);
            if (options != null) {
                return options.GlobalJavaScript;
            }
            return null;
        };

        /**wyc20230705新增接口
        * 获取给定表格内的指定行号的表格行后台.NET对象引用
        * GetTableRow(tableID,rowIndex)
        */
        rootElement.GetTableRow = function () {
            if (arguments.length === 2 &&
                typeof (arguments[0]) === "string" &&
                typeof (arguments[1]) === "number") {
                return rootElement.__DCWriterReference.invokeMethod("GetTableRow", arguments[0], arguments[1]);
            }
            return null;
        }

        /**wyc20230705兼容四代接口
        * 获取拆线图元素的数据集对象
        * @param element "折线图元素的ID/属性集/后台.NET引用"
        */
        rootElement.GetChartElementDataByID = function (element) {
            if (typeof (rootElement.SetElementProperties) !== "function") {
                return false;
            }
            var options = rootElement.GetElementProperties(element);
            if (options != null) {
                return options.ChartDatas;
            }
            return null;
        };
        /**wyc20230705兼容四代接口
        * 设置拆线图元素的数据集对象
        * @param element "折线图元素的ID/属性集/后台.NET引用"
        * @param chartdata 折线图元素的数据集对象""
        */
        rootElement.SetChartElementDataByID = function (element, chartdata) {
            if (typeof (rootElement.SetElementProperties) !== "function") {
                return false;
            }
            var options = {
                ChartDatas: chartdata
            };
            return rootElement.SetElementProperties(element, options);
        };

        //rootElement.refreshDocumentOptions();
        document.WriterControl = rootElement;
    }
}



///** 编辑器API对象 */
//export class WriterControl {
//    /**
//     * 初始化对象
//     * @param {any} rootElement 根元素对象，可以是元素编号，或者元素本身
//     */
//    constructor(rootElement) {
//        if (typeof (rootElement) == "string") {
//            this.RootElement = document.getElementById(rootElement);
//            if (this.RootElement == null) {
//                this.RootElement = document.querySelector(rootElement);
//            }
//        }
//        else if (rootElement != null && rootElement.nodeName) {
//            this.RootElement = rootElement;
//        }
//        if (this.RootElement == null) {
//            throw "未找到指定的元素对象";
//        }
//    }
//    //*******************************************************
//    //              定义属性
//    //*******************************************************
//    /** 获得从0开始计算的当前页码值
//     *  @returns {Number} 页码值
//     **/
//    get FocusedPageIndexBase0() { return this.RootElement.__DCWriterReference.invokeMethod("get_FocusedPageIndexBase0"); }
//    /** 获得当前行在当前页中的序号
//     *  @returns {Number} 行号
//     **/
//    get CurrentLineIndexInPage() { return this.RootElement.__DCWriterReference.invokeMethod("get_CurrentLineIndexInPage"); }
//    get CurrentColumnIndex() { return this.RootElement.__DCWriterReference.invokeMethod("get_CurrentColumnIndex"); }
//    get SelectionLength() { return this.RootElement.__DCWriterReference.invokeMethod("get_SelectionLength"); }
//    get SelectionStartPosition() { return this.RootElement.__DCWriterReference.invokeMethod("get_SelectionStartPosition"); }
//    get DocumentTitle() { return this.RootElement.__DCWriterReference.invokeMethod("get_DocumentTitle"); }
//    set DocumentTitle(Value) { this.RootElement.__DCWriterReference.invokeMethod("set_DocumentTitle", Value); }
//    get FileFormat() { return this.RootElement.__DCWriterReference.invokeMethod("get_FileFormat"); }
//    set FileFormat(Value) { this.RootElement.__DCWriterReference.invokeMethod("set_FileFormat", Value); }
//    get Modified() { return this.RootElement.__DCWriterReference.invokeMethod("get_Modified"); }
//    set Modified(Value) { this.RootElement.__DCWriterReference.invokeMethod("set_Modified", Value); }

//    //*******************************************************
//    //              定义方法
//    //*******************************************************
//    /**
//   * 从一个字符串中加载文档
//   * @param {string} strData 文件内容
//   * @param {string} strFormat 文件格式
//   * @returns {boolean} 操作是否成功
//   */
//    LoadDocumentFromString(strData, strFormat) {
//        return this.RootElement.__DCWriterReference.invokeMethod("LoadDocumentFromString", strData, strFormat);
//    }
//    /**
//    * 保存文件到一个字符串中
//    * @param {string} strFormat 文件格式
//    * @returns {string} 文件内容的字符串
//    */
//    SaveDocumentToString(strFormat) {
//        return this.RootElement.__DCWriterReference.invokeMethod("SaveDocumentToString", strFormat);
//    }
//    //*******************************************************
//    //              定义事件
//    //*******************************************************
//    /** 插入点位置修改事件
//     * @returns {Function} 事件对象
//     * */
//    get SelectionChanged() {
//        return this.RootElement.SelectionChanged;
//    }
//    /** 插入点位置修改事件
//     * @param {Function} Value 事件对象
//     */
//    set SelectionChanged(Value) {
//        this.RootElement.SelectionChanged = Value;
//    }
//    /** 插入点位置修改事件
//     * @returns {Function} 事件对象
//     * */
//    get DocumentLoad() {
//        return this.RootElement.DocumentLoad;
//    }
//    /** 插入点位置修改事件
//     * @param {Function} Value 事件对象
//     */
//    set DocumentLoad(Value) {
//        this.RootElement.DocumentLoad = Value;
//    }
//}
