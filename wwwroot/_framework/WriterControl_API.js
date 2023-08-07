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
         * @param {number} MoveToPage 从0开始的页码
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
            var pages = WriterControl_UI.GetPageContainer(rootElement);
            if (pages != null) {
                while (pages.firstChild != null) {
                    pages.removeChild(pages.firstChild);
                }
            }
            rootElement.__DCWriterReference.invokeMethod("ClearDocumentForWriterPrintPreviewControl");
            //rootElement.__DCWriterReference.invokeMethod("PrintDocument");
        };
        rootElement.SetAutoZoom = function (callback, eventArgs, noAddAttr) {
        };
        rootElement.CollectrResizeCanvas = function (element) { };
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
        * @return {object} 支持的字体样式的对象
        * @name getSupportFontFamilys
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
         * @name GetAllPageIndexs
         */
        rootElement.GetAllPageIndexs = function () { return WriterControl_UI.GetAllPageIndexs(rootElement); };

        /**
         * 输出性能调试清单
         * @param {number} intSortMode 排序方式
         * @returns {string} 调试输出信息
         * @name StopJIEJIEPerformanceCounter
         */
        rootElement.StopJIEJIEPerformanceCounter = function (intSortMode) {
            return rootElement.__DCWriterReference.invokeMethod("StopJIEJIEPerformanceCounter", intSortMode);
        };

        /**
         * 滚动视图到指定页
         * @param {number} intPageIndex 从0开始的页码
         * @returns {boolean} 操作是否成功
         * @name MoveToPage
         */
        rootElement.MoveToPage = function (intPageIndex) { return WriterControl_UI.MoveToPage(rootElement, intPageIndex); };
        /**
         * 根据元素编号设置续打位置
         * @param {string} startElementID 续打开始元素编号
         * @param {string} endElementID 后端续打位置元素编号
         * @name SetJumpPrintByElementID
         */
        rootElement.SetJumpPrintByElementID = function (startElementID, endElementID) {
            rootElement.__DCWriterReference.invokeMethod("SetJumpPrintByElementID", startElementID, endElementID);
        };
        /**
         * 打印到前端服务器，必须设置编辑器控件的PrintServerPageUrl属性。
         * @param {object} options 打印选项
         * @param {function} callBack 操作成功后的回调函数，参数为服务器返回值。
         * @returns 操作是否成功
         * @name PrintToServer
         */
        rootElement.PrintToServer = function (options, callBack) {
            return WriterControl_Print.PrintToServer(rootElement, null, options, callBack);
        };
        /** //wyc20230519:增加与四代编辑器兼容的接口
         * 打印到前端服务器，必须设置编辑器控件的PrintServerPageUrl属性。
         * @param {object} options 打印选项JSON对象
         * @param {function} callBack 操作成功后的回调函数，参数为服务器返回值。
         * @returns 操作是否成功
         * @name LocalPrintDocuments
         */
        rootElement.LocalPrintDocuments = function (options, callBack) {
            return WriterControl_Print.PrintToServer(rootElement, null, options, callBack);
        };
        /**
         * 打印为PDF文件
         * @param {any} options 打印选项
         * @param {any} callBack 操作成功后的回调函数，参数为包含PDF的blob对象，如果未指定回调函数则下载文件。
         * @returns 操作是否成功
         * @name PrintAsPDF
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
         * @name PrintAsHtml
         */
        rootElement.PrintAsHtml = function (options, callBack, isPrint) {
            return WriterControl_Print.PrintAsHtml(rootElement, options, callBack);
        };

        /**
         * 打印html的方法
         * @name PrintByHtml
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
         * @name GetPrintNowHTML
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
         * @name GetCommandStatus
         */
        rootElement.GetCommandStatus = function (strCommandName) {
            return rootElement.__DCWriterReference.invokeMethod("GetCommandStatus", strCommandName);
        }
        /**
         * 触发事件
         * @param {string } strEventName 事件名称
         * @param {any} eventArgs 事件参数
         * @name RaiseEvent
         */
        rootElement.RaiseEvent = function (strEventName, eventArgs) {
            WriterControl_Event.InnerRaiseEvent(rootElement, strEventName, eventArgs);
        };
        /**
         * 下载文件
         * @param {string} strFormat 文件格式
         * @param {string} strFileName 指定的文件名
         * @returns {boolean} 操作是否成功
         * @name DownLoadFile
         */
        rootElement.DownLoadFile = function (strFormat, strFileName) {
            return WriterControl_IO.DownLoadFile(rootElement, strFormat, strFileName);
        };

        /**
         * 北大医信需求，希望不用手动给属性，通过方法设置自动缩放
         * @param {function} 回调函数
         * @param {boolean} 是否不代码赋属性
         * @returns {boolean} 操作是否成功
         */
        rootElement.SetAutoZoom = function (callback, eventArgs, noAddAttr) {
            //判读页面是否存在autozoom
            //判断是否存在autozoom属性，如果存在需要撑满
            var hasAutoZoom = rootElement.getAttribute('autozoom');
            if (hasAutoZoom != 'true' && hasAutoZoom != 'True' && noAddAttr !== true) {
                rootElement.setAttribute('autozoom', 'true');
                hasAutoZoom = 'true';
            }
            if (hasAutoZoom != null && (hasAutoZoom == 'true' || hasAutoZoom == 'True')) {
                clearTimeout(rootElement.rootResizeTime);
                rootElement.rootResizeTime = setTimeout(function () {
                    //修改canvas的大小
                    var pageContainer = WriterControl_UI.GetPageContainer(rootElement);
                    var hasCanvas = pageContainer.querySelectorAll('canvas[dctype=page]');
                    if (hasCanvas.length > 0) {
                        var pageWidth = pageContainer.clientWidth - 12;
                        var pageHeight = pageContainer.clientHeight;
                        console.log(pageWidth);
                        //获取到设置的宽度
                        var canvasWidth = Number(hasCanvas[0].getAttribute('native-width'));
                        var zoomRate = rootElement.GetZoomRate();
                        zoomRate = Math.floor((pageWidth / canvasWidth) * 10000) / 10000;
                        //判断是否存在滚动条
                        var allCanvasHeight = ((Number(hasCanvas[0].getAttribute('native-height')) + 12) * zoomRate) * hasCanvas.length;
                        if (pageHeight <= allCanvasHeight) {
                            pageWidth = pageWidth - 20
                            zoomRate = Math.floor((pageWidth / canvasWidth) * 10000) / 10000;
                        }
                        //获取到canvas的宽度,此处用这个是因为SetZoomRate中处理autozoom
                        WriterControl_UI.EditorSetZoomRate(rootElement, zoomRate);
                    }
                    typeof callback == 'function' ? callback(rootElement, eventArgs) : null;
                }, 100)
            } else {
                typeof callback == 'function' ? callback(rootElement, eventArgs) : null;
            }
        };

        /**
        * 设置缩放比率
        * @param {number} newZoomRate 新的缩放比率，必须在0.1到5之间
        * @returns {boolean} 操作是否修改缩放比率
        */
        rootElement.SetZoomRate = function (newZoomRate) {
            //只要调用这个方法，直接把自动缩放AutoZoom属性设为false
            var hasAutoZoom = rootElement.getAttribute('autozoom');
            if (hasAutoZoom != null && (hasAutoZoom == 'true' || hasAutoZoom == 'True')) {
                rootElement.setAttribute('autozoom', 'false');
            }
            return WriterControl_UI.EditorSetZoomRate(rootElement, newZoomRate);
        };

        /**
        * 获取缩放比率
        * @returns {number} 缩放比率
        */
        rootElement.GetZoomRate = function () {
            return rootElement.__DCWriterReference.invokeMethod("get_ZoomRate");
        };

        /** 根据界面大小来缩放编辑器
        * @return {boolean} 是否成功缩放
        */
        rootElement.SetWriterAutoZoom = function () {
            return WriterControl_UI.EditorSetWriterAutoZoom(rootElement);
        }

        /**设置页面排版模式,可以为SingleColumn,MultiColumn,Horizontal
         * @param {string} strMode 排版类型，可以为SingleColumn,MultiColumn,Horizontal。
         * @name SetPageLayoutMode
         */
        rootElement.SetPageLayoutMode = function (strMode) {
            WriterControl_UI.EditorSetPageLayoutMode(rootElement, strMode);
        };
        //以下绑定属性
        /**wyc20230801:直接获取文档分部的引用对象
        * @name DocumentBody
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "DocumentBody", {
            get() { return this.__DCWriterReference.invokeMethod("DCGetDocumentPart", "body"); }
        });
        /**wyc20230801:直接获取文档分部的引用对象
        * @name DocumentHeader
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "DocumentHeader", {
            get() { return this.__DCWriterReference.invokeMethod("DCGetDocumentPart", "header"); }
        });
        /**wyc20230801:直接获取文档分部的引用对象
        * @name DocumentFooter
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "DocumentFooter", {
            get() { return this.__DCWriterReference.invokeMethod("DCGetDocumentPart", "footer"); }
        });

        /**
        * @name FocusedPageIndexBase0
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "FocusedPageIndexBase0", {
            get() { return this.__DCWriterReference.invokeMethod("get_FocusedPageIndexBase0"); }
        });
        /**
        * @name CurrentLineIndexInPage
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "CurrentLineIndexInPage", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentLineIndexInPage"); }
        });
        /**
         * 当前光标所在位置的第几列
        * @name CurrentColumnIndex
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "CurrentColumnIndex", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentColumnIndex"); }
        });
        /**
        * @name SelectionLength
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "SelectionLength", {
            get() { return this.__DCWriterReference.invokeMethod("get_SelectionLength"); }
        });
        /**
        * @name SelectionStartPosition
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "SelectionStartPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_SelectionStartPosition"); }
        });
        /**
        * @name DocumentTitle
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "DocumentTitle", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentTitle"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_DocumentTitle", value); }
        });
        /**
        * @name FileFormat
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "FileFormat", {
            get() { return this.__DCWriterReference.invokeMethod("get_FileFormat"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_FileFormat", value); }
        });
        /**
        * @name Modified
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "Modified", {
            get() { return this.__DCWriterReference.invokeMethod("get_Modified"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_Modified", value); }
        });
        /**
        * 是否只读
        * @name Readonly
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "Readonly", {
            get() { return this.__DCWriterReference.invokeMethod("get_Readonly"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_Readonly", value); }
        });
        /**
        * 阅读视图模式
        * @name ReadViewMode
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "ReadViewMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_ReadViewMode"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_ReadViewMode", value); }
        });
        /**
        * 页眉页脚只读
        * @name HeaderFooterReadonly
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "HeaderFooterReadonly", {
            get() { return this.__DCWriterReference.invokeMethod("get_HeaderFooterReadonly"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_HeaderFooterReadonly", value); }
        });

        /**
        * 编辑器控件能接受的数据格式，包括粘贴操作和OLE拖拽操作获得的数据
        * @name AcceptDataFormats
        * @type {object.defineProperty}
        * 枚举：
        * None： 无任何格式
        * Text： 普通文本格式
        * RTF： RTF格式
        * Html： HTML格式
        * XML：  XML格式
        * Image ：图片格式
        * CommandFormat ：编辑器命令格式
        * FileSource ：本地文件格式
        * KBEntry ：知识库节点格式
        * All ：支持所有标准格式
        */
        Object.defineProperty(rootElement, "AcceptDataFormats", {
            get() { return this.__DCWriterReference.invokeMethod("get_AcceptDataFormats"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_AcceptDataFormats", value); }
        });
        /**
        * 获取或设置一个值，该值指示在控件中按 TAB 键时，是否在控件中键入一个 TAB 字符，而不是按选项卡的顺序将焦点移动到下一个控件。
        * @name AcceptsTab
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "AcceptsTab", {
            get() { return this.__DCWriterReference.invokeMethod("get_AcceptsTab"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_AcceptsTab", value); }
        });
        /**
        * 显示在已经注册的页码标题文本后面的额外的页码标题文本。比如“授权给XX医院使用”。
        * @name AdditionPageTitle
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "AdditionPageTitle", {
            get() { return this.__DCWriterReference.invokeMethod("get_AdditionPageTitle"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_AdditionPageTitle", value); }
        });
        /**
        * 能否直接拖拽文档内容
        * @name AllowDragContent
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "AllowDragContent", {
            get() { return this.__DCWriterReference.invokeMethod("get_AllowDragContent"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_AllowDragContent", value); }
        });
        /**
        * 控件是否可以接受用户拖放到它上面的数据
        * @name AllowDrop
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "AllowDrop", {
            get() { return this.__DCWriterReference.invokeMethod("get_AllowDrop"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_AllowDrop", value); }
        });
        /**
        * 销毁控件的时候是否自动销毁文档对象
        * @name AutoDisposeDocument
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "AutoDisposeDocument", {
            get() { return this.__DCWriterReference.invokeMethod("get_AutoDisposeDocument"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_AutoDisposeDocument", value); }
        });
        /**
        * 背景颜色字符串(不生效)
        * @name BackColorString
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "BackColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_BackColorString"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_BackColorString", value); }
        });
        /**
       * 后台运行模式(不生效)
       * 后台模式下，任何控件、文档只读和授权内容保护无效，可以任意修改文档内容。 但仍然会根据需要留下历史修改痕迹。
       * @name BackgroundMode
       * @type {object.defineProperty}
       */
        Object.defineProperty(rootElement, "BackgroundMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_BackgroundMode"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_BackgroundMode", value); }
        });
        /**
       * 区域选择打印的信息
       * @name BoundsSelection
       * @type {object.defineProperty}
       */
        Object.defineProperty(rootElement, "BoundsSelection", {
            get() { return this.__DCWriterReference.invokeMethod("get_BoundsSelection"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_BoundsSelection", value); }
        });
        /**
        * 文档中包含的所有的复选框元素列表
        * @name CheckBoxes
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "CheckBoxes", {
            get() { return this.__DCWriterReference.invokeMethod("get_CheckBoxes"); }
        });
        /**
       * 命令状态需要刷新标识。
        *  当不能启用控件事件或者无法响应控件事件时，可以使用定时器来判断本属性值，
        *  如果本属性值为true， 则需要刷新应用程序界面按钮的状态，然后设置本属性值为false。 
        *  比如 void Timer_Intervel() { if (myWriterControl.CommandStateNeedRefreshFlag == true) { myWriterControl.CommandStateNeedRefreshFlag = false; ----此处编写刷新菜单按钮状态的代码---- } }
        *  在DCWriter内部会根据实时情况来自动设置本属性值为true，以标记应用程序需要刷新按钮状态了。
       * @name CommandStateNeedRefreshFlag
       * @type {object.defineProperty}
       */
        Object.defineProperty(rootElement, "CommandStateNeedRefreshFlag", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommandStateNeedRefreshFlag"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_CommandStateNeedRefreshFlag", value); }
        });
        /**
        * 即使在只读状态下是否能编辑文档批注
        * @name CommentEditableWhenReadonly
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "CommentEditableWhenReadonly", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommentEditableWhenReadonly"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_CommentEditableWhenReadonly", value); }
        });
        /** 
         * 文档批注列表
         * @name Comments
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "Comments", {
            get() { return this.__DCWriterReference.invokeMethod("get_Comments"); }
        });
        /**
       * 是否显示文档批注
       * @name CommentVisibility
       * @type {object.defineProperty}
       */
        Object.defineProperty(rootElement, "CommentVisibility", {
            get() { return this.__DCWriterReference.invokeMethod("get_CommentVisibility"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_CommentVisibility", value); }
        });
        /** 
         * 文档内容视图高度
         * @name ContentViewHeight
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "ContentViewHeight", {
            get() { return this.__DCWriterReference.invokeMethod("get_ContentViewHeight"); }
        });

        /** 
         * 控件类型全名
         * @name ControlTypeName
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "ControlTypeName", {
            get() { return this.__DCWriterReference.invokeMethod("get_ControlTypeName"); }
        });
        /**
       * 编辑器控件能创建的数据格式，这些数据将用于复制操作和OLE拖拽操作
       * @name CreationDataFormats
       * @type {object.defineProperty}
       */
        Object.defineProperty(rootElement, "CreationDataFormats", {
            get() { return this.__DCWriterReference.invokeMethod("get_CreationDataFormats"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_CreationDataFormats", value); }
        });
        /** 
         * 当前光标所在的粗体样式
         * @name CurrentBold
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentBold", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentBold"); }
        });
        /** 
         * 当前文档批注对象
         * @name CurrentComment
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentComment", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentComment"); }
        });
        /** 
         * 当前光标所在的字体名称
         * @name CurrentFontName
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentFontName", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentFontName"); }
        });
        /** 
         * 当前光标所在的字体大小
         * @name CurrentFontSize
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentFontSize", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentFontSize"); }
        });
        /** 
         * 当前光标所在的斜体样式
         * @name CurrentItalic
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentItalic", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentItalic"); }
        });
        /** 
         * 当前文本行
         * @name CurrentLine
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentLine", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentLine"); }
        });
        /** 
         * 当前页对象
         * @name CurrentPage
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentPage", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentPage"); }
        });
        /**
        * 背景颜色
        * @name CurrentPageBorderColor
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "CurrentPageBorderColor", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentPageBorderColor"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_CurrentPageBorderColor", value); }
        });
        /**
        * 背景颜色字符串
        * @name CurrentPageBorderColorString
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "CurrentPageBorderColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentPageBorderColorString"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_CurrentPageBorderColorString", value); }
        });
        /** 
         * 当前段落对齐方式
         * @name CurrentParagraphAlign
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentParagraphAlign", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentParagraphAlign"); }
        });
        /** 
         * 当前插入点所在的文档节对象
         * @name CurrentSection
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentSection", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSection"); }
        });
        /** 
         * 当前元素样式
         * @name CurrentStyle
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentStyle", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentStyle"); }
        });
        /** 
         * 当前子文档节元素
         * @name CurrentSubDocument
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentSubDocument", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSubDocument"); }
        });
        /** 
         * 当前光标所在的下标样式
         * @name CurrentSubscript
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentSubscript", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSubscript"); }
        });
        /** 
         * 当前光标所在的上标样式
         * @name CurrentSuperscript
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentSuperscript", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentSuperscript"); }
        });
        /** 
         * 当前光标所在的下划线样式
         * @name CurrentUnderline
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentUnderline", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentUnderline"); }
        });
        /** 
         * 当前用户信息
         * @name CurrentUser
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "CurrentUser", {
            get() { return this.__DCWriterReference.invokeMethod("get_CurrentUser"); }
        });
        /**
       * 文档对象
       * @name Document
       * @type {object.defineProperty}
       */
        Object.defineProperty(rootElement, "Document", {
            //wyc20230704:修改前端获取文档对象的方法
            get() { return this.__DCWriterReference.invokeMethod("GetDocument"); },
            //set(value) { this.__DCWriterReference.invokeMethod("set_Document", value); }
        });
        /** 
         * 文档行为选项
         * @name DocumentBehaviorOptions
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "DocumentBehaviorOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentBehaviorOptions"); }
        });
        /** 
         * 文档编辑选项
         * @name DocumentEditOptions
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "DocumentEditOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentEditOptions"); }
        });
        /**
        * 文档设置XML字符串
        * @name DocumentOptionsXML
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "DocumentOptionsXML", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentOptionsXML"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_DocumentOptionsXML", value); }
        });
        /** 
         * 文档安全选项
         * @name DocumentSecurityOptions
         * @type {object.defineProperty}
         */
        Object.defineProperty(rootElement, "DocumentSecurityOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentSecurityOptions"); }
        });
        /** 
        * 文档视图选项
        * @name DocumentViewOptions
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "DocumentViewOptions", {
            get() { return this.__DCWriterReference.invokeMethod("get_DocumentViewOptions"); }
        });
        /**
        * 鼠标双击来编辑文档批注
        * @name DoubleClickToEditComment
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "DoubleClickToEditComment", {
            get() { return this.__DCWriterReference.invokeMethod("get_DoubleClickToEditComment"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_DoubleClickToEditComment", value); }
        });
        /**
        * 是否允许续打
        * @name EnableJumpPrint
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "EnableJumpPrint", {
            get() { return this.__DCWriterReference.invokeMethod("get_EnableJumpPrint"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_EnableJumpPrint", value); }
        });
        /**
        * 允许执行StartEditContent事件
        * @name EnableUIEventStartEditContent
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "EnableUIEventStartEditContent", {
            get() { return this.__DCWriterReference.invokeMethod("get_EnableUIEventStartEditContent"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_EnableUIEventStartEditContent", value); }
        });
        /**
        * 从0开始计算的最后显示的页码号,为0表示没有设置。只有处于分页视图模式下该属性才有效。小于0则不启用该设置。
        * @name EndPageIndex
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "EndPageIndex", {
            get() { return this.__DCWriterReference.invokeMethod("get_EndPageIndex"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_EndPageIndex", value); }
        });
        /**
        * 违禁关键字
        * @name ExcludeKeywords
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "ExcludeKeywords", {
            get() { return this.__DCWriterReference.invokeMethod("get_ExcludeKeywords"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_ExcludeKeywords", value); }
        });
        /**
      * 扩展视图模式
      * @name ExtViewMode
      * @type {object.defineProperty}
      */
        Object.defineProperty(rootElement, "ExtViewMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_ExtViewMode"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_ExtViewMode", value); }
        });
        /**
      * 是否强制显示光标而不管控件是否获得输入焦点
      * @name ForceShowCaret
      * @type {object.defineProperty}
      */
        Object.defineProperty(rootElement, "ForceShowCaret", {
            get() { return this.__DCWriterReference.invokeMethod("get_ForceShowCaret"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_ForceShowCaret", value); }
        });
        /** 
        * 表单数据组成的字符串数组，序号为偶数的元素为名称，序号为奇数的元素为数值。
        * @name FormValuesArray
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "FormValuesArray", {
            get() { return this.__DCWriterReference.invokeMethod("get_FormValuesArray"); }
        });
        /** 
        * 获得各个表单数据组成的字符串，采用“名称=值&名称=值&名称=值”的形式， 模仿HTML提交表单数据的字符串格式，遇到HTML特殊字符会进行转义处理。
        * @name FormValuesString
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "FormValuesString", {
            get() { return this.__DCWriterReference.invokeMethod("get_FormValuesString"); }
        });
        /** 
        * XML格式的表单数据字典
        * @name FormValuesXml
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "FormValuesXml", {
            get() { return this.__DCWriterReference.invokeMethod("get_FormValuesXml"); }
        });
        /**
      * 是否灰化显示不活跃的页眉页脚。默认true。
      * @name GrayingDisabledHeaderFooter
      * @type {object.defineProperty}
      */
        Object.defineProperty(rootElement, "GrayingDisabledHeaderFooter", {
            get() { return this.__DCWriterReference.invokeMethod("get_GrayingDisabledHeaderFooter"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_GrayingDisabledHeaderFooter", value); }
        });
        /**
        * 是否显示页眉页脚标记
        * @name HeaderFooterFlagVisible
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "HeaderFooterFlagVisible", {
            get() { return this.__DCWriterReference.invokeMethod("get_HeaderFooterFlagVisible"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_HeaderFooterFlagVisible", value); }
        });
        /**
        * 当选择了文档内容时隐藏光标
        * @name HideCaretWhenHasSelection
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "HideCaretWhenHasSelection", {
            get() { return this.__DCWriterReference.invokeMethod("get_HideCaretWhenHasSelection"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_HideCaretWhenHasSelection", value); }
        });
        /**
        * 高亮度显示区域
        * @name HighlightRange
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "HighlightRange", {
            get() { return this.__DCWriterReference.invokeMethod("get_HighlightRange"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_HighlightRange", value); }
        });
        /**
        * 高亮度显示区域
        * @name HighlightRanges
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "HighlightRanges", {
            get() { return this.__DCWriterReference.invokeMethod("get_HighlightRanges"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_HighlightRanges", value); }
        });
        /** 
        * 鼠标悬停的元素
        * @name HoverElement
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "HoverElement", {
            get() { return this.__DCWriterReference.invokeMethod("get_HoverElement"); }
        });
        /** 
        * 文档中所有的图片对象
        * @name Images
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "Images", {
            get() { return this.__DCWriterReference.invokeMethod("get_Images"); }
        });
        /**
        * 设置属性值为“南京都昌信息科技有限公司版权所有，盗版有奖举报电话13382028281，网站www.dcwriter.cn。”， 即可隐藏编辑器右下角的"内置都昌软件"字样。
        * @name InnerSPBDCS
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "InnerSPBDCS", {
            get() { return this.__DCWriterReference.invokeMethod("get_InnerSPBDCS"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_InnerSPBDCS", value); }
        });
        /** 
        * 文档中包含的文本输入域列表对象
        * @name InputFields
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "InputFields", {
            get() { return this.__DCWriterReference.invokeMethod("get_InputFields"); }
        });
        /**
        * 当前是否处于插入模式,若处于插入模式,则光标比较细,否则处于改写模式,光标比较粗
        * @name InsertMode
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "InsertMode", {
            get() { return this.__DCWriterReference.invokeMethod("get_InsertMode"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_InsertMode", value); }
        });
        /**
        * 是否以管理员模式运行
        * @name IsAdministrator
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "IsAdministrator", {
            get() { return this.__DCWriterReference.invokeMethod("get_IsAdministrator"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_IsAdministrator", value); }
        });
        /**
        * 续打信息
        * @name JumpPrint
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "JumpPrint", {
            get() { return this.__DCWriterReference.invokeMethod("get_JumpPrint"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_JumpPrint", value); }
        });
        /** 
        * 续打结束位置
        * @name JumpPrintEndPosition
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "JumpPrintEndPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_JumpPrintEndPosition"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_JumpPrintEndPosition", value); }
        });
        /** 
        * 续打位置
        * @name JumpPrintPosition
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "JumpPrintPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_JumpPrintPosition"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_JumpPrintPosition", value); }
        });
        /** 
        * 知识库对象
        * @name KBLibrary
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "KBLibrary", {
            get() { return this.__DCWriterReference.invokeMethod("get_KBLibrary"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_KBLibrary", value); }
        });
        /** 
        * 知识库文件URL
        * @name KBLibraryUrl
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "KBLibraryUrl", {
            get() { return this.__DCWriterReference.invokeMethod("get_KBLibraryUrl"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_KBLibraryUrl", value); }
        });
        /** 
        * 最后一次操作产生的系统警告信息列表
        * @name LastAlertInfos
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "LastAlertInfos", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastAlertInfos"); }
        });
        /** 
        * 最后一次的打印位置
        * 一般本属性和控件的JumpPrintPosition属性搭配使用.比如在打印后存储该属性值,下次打开文档后,再设置JumpPrintPosition属性值.能设置上次打印结束的位置为续打起始位置.
        * @name LastPrintPosition
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "LastPrintPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastPrintPosition"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_LastPrintPosition", value); }
        });
        /** 
        * 最后一次打印结果
        * @name LastPrintResult
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "LastPrintResult", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastPrintResult"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_LastPrintResult", value); }
        });
        /** 
        * 最后一次用户界面事件的发生时间
        * 这里的用户界面事件包括鼠标键盘事件、OLE拖拽事件， 应用程序可以根据这个属性值来实现超时锁定用户界面的功能。
        * @name LastUIEventTime
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "LastUIEventTime", {
            get() { return this.__DCWriterReference.invokeMethod("get_LastUIEventTime"); }
        });
        /** 
        * 锁定滚动位置
        * @name LockScrollPosition
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "LockScrollPosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_LockScrollPosition"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_LockScrollPosition", value); }
        });
        /** 
        * 文档中包含的内容被修改的文本输入域列表对象
        * @name ModifiedInputFields
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "ModifiedInputFields", {
            get() { return this.__DCWriterReference.invokeMethod("get_ModifiedInputFields"); }
        });
        /** 
        * 移动光标时是否自动滚动到光标区域
        * @name MoveCaretWithScroll
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "MoveCaretWithScroll", {
            get() { return this.__DCWriterReference.invokeMethod("get_MoveCaretWithScroll"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_MoveCaretWithScroll", value); }
        });
        /** 
        * 移动焦点使用的快捷键
        * @name MoveFocusHotKey
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "MoveFocusHotKey", {
            get() { return this.__DCWriterReference.invokeMethod("get_MoveFocusHotKey"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_MoveFocusHotKey", value); }
        });
        /** 
        * 页面背景文字字符串
        * @name PageBackColorString
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "PageBackColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageBackColorString"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_PageBackColorString", value); }
        });
        /** 
        * 页面边框颜色值
        * @name PageBorderColorString
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "PageBorderColorString", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageBorderColorString"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_PageBorderColorString", value); }
        });
        /** 
        * 总页数
        * @name PageCount
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "PageCount", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageCount"); }
        });
        /** 
        * 设置或返回从1开始的当前页号
        * @name PageIndex
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "PageIndex", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageIndex"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_PageIndex", value); }
        });
        /** 
        * 页面设置
        * @name PageSettings
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "PageSettings", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageSettings"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_PageSettings", value); }
        });
        /** 
        * 页面标题位置
        * @name PageTitlePosition
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "PageTitlePosition", {
            get() { return this.__DCWriterReference.invokeMethod("get_PageTitlePosition"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_PageTitlePosition", value); }
        });
        /** 
        * 表示当前插入点位置信息的字符串
        * @name PositionInfoText
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "PositionInfoText", {
            get() { return this.__DCWriterReference.invokeMethod("get_PositionInfoText"); }
        });
        /** 
        * 文档中包含的所有的单选框元素列表
        * @name RadioBoxes
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "RadioBoxes", {
            get() { return this.__DCWriterReference.invokeMethod("get_RadioBoxes"); }
        });
        /** 
        * 在控件的获得/失去焦点事件时是否触发文档的获得/失去焦点事件
        * @name RaiseDocumentFoucsEventWhenControlFocusEvent
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "RaiseDocumentFoucsEventWhenControlFocusEvent", {
            get() { return this.__DCWriterReference.invokeMethod("get_RaiseDocumentFoucsEventWhenControlFocusEvent"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_RaiseDocumentFoucsEventWhenControlFocusEvent", value); }
        });
        /** 
        * RTF文本
        * @name RTFText
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "RTFText", {
            get() { return this.__DCWriterReference.invokeMethod("get_RTFText"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_RTFText", value); }
        });
        /** 
        * 标尺是否可用
        * @name RuleEnabled
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "RuleEnabled", {
            get() { return this.__DCWriterReference.invokeMethod("get_RuleEnabled"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_RuleEnabled", value); }
        });
        /** 
        * 标尺是否可见,为了提高兼容性，默认不显示标尺。
        * @name RuleVisible
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "RuleVisible", {
            get() { return this.__DCWriterReference.invokeMethod("get_RuleVisible"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_RuleVisible", value); }
        });
        /** 
        * 获得文档中文档节列表
        * @name Sections
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "Sections", {
            get() { return this.__DCWriterReference.invokeMethod("get_Sections"); }
        });
        /** 
        * 文档中被选中的文字
        * @name SelectedText
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "SelectedText", {
            get() { return this.__DCWriterReference.invokeMethod("get_SelectedText"); }
        });
        /** 
        * 文档选择的部分
        * @name Selection
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "Selection", {
            //wyc20230725改变写法
            get() { return this.__DCWriterReference.invokeMethod("GetSelection"); }
        });
        /** 
        * 是否显示提示文本
        * @name ShowTooltip
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "ShowTooltip", {
            get() { return this.__DCWriterReference.invokeMethod("get_ShowTooltip"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_ShowTooltip", value); }
        });
        /** 
        * 当前单选的文档元素对象
        * 当只选中一个文档元素对象，则返回给文档元素对象，如果没有选中元素 或者选中多个元素，则返回空。
        * @name SingleSelectedElement
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "SingleSelectedElement", {
            get() { return this.__DCWriterReference.invokeMethod("get_SingleSelectedElement"); }
        });
        /** 
        * 状态文本
        * @name StatusText
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "StatusText", {
            get() { return this.__DCWriterReference.invokeMethod("get_StatusText"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_StatusText", value); }
        });
        /** 
        * 文档中包含的子文档对象列表
        * @name SubDocuments
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "SubDocuments", {
            get() { return this.__DCWriterReference.invokeMethod("get_SubDocuments"); }
        });
        /** 
        * 文档中所有的表格对象
        * @name Tables
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "Tables", {
            get() { return this.__DCWriterReference.invokeMethod("get_Tables"); }
        });
        /** 
        * 控件数据
        * @name Text
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "Text", {
            get() { return this.__DCWriterReference.invokeMethod("get_Text"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_Text", value); }
        });
        /** 
        * XML文本
        * @name XMLText
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "XMLText", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLText"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_XMLText", value); }
        });
        /** 
        * 生成用于保存的XML字符串
        * @name XMLTextForSave
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "XMLTextForSave", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLTextForSave"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_XMLTextForSave", value); }
        });
        /** 
        * 未格式化的XML文本
        * @name XMLTextUnFormatted
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "XMLTextUnFormatted", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLTextUnFormatted"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_XMLTextUnFormatted", value); }
        });
        /** 
        * 获得文档XML内容
        * @name XMLTextWithDocumentState
        * @type {object.defineProperty}
        */
        Object.defineProperty(rootElement, "XMLTextWithDocumentState", {
            get() { return this.__DCWriterReference.invokeMethod("get_XMLTextWithDocumentState"); },
            set(value) { this.__DCWriterReference.invokeMethod("set_XMLTextWithDocumentState", value); }
        });

        //以下绑定方法
        /**
         * 添加缓存的项目列表
         * @param {string} name 名称 
         * @param {DCSoft.Writer.Data.ListItemCollection} items 缓存的项目列表 
         * @param {boolean} globalItems 是否为全局缓存
         * @name AddBufferedListItems 
         * @example AddBufferedListItems("name",[],true)
         * @description 在这里添加好项目列表后，只需要设置输入域对象的field.FieldSettings.ListSource.SourceName 等于这里的name参数值就能使用缓存的列表对象。
         */
        rootElement.AddBufferedListItems = function (name, items, globalItems) {
            rootElement.__DCWriterReference.invokeMethod("AddBufferedListItems", name, items, globalItems);
        }
        /**
         * 添加快捷菜单项目
         * @param {string} elementType 菜单文本 
         * @param {string} text 菜单命令名称 
         * @name AddContextMenuItem 
         * @example AddContextMenuItem("复制","copy")
         */
        rootElement.AddContextMenuItem = function (text, commandName) {
            rootElement.__DCWriterReference.invokeMethod("AddContextMenuItem", text, commandName);
        };
        /**
        * 添加文档元素的快键菜单
        * @param {string} elementTypeName 文档元素类型名称 
        * @param {string} name 菜单项目名称 
        * @param {string} commandName 绑定的编辑器命令 
        * @param {string} text 菜单项目文本 
        * @name AddContextMenuItemByTypeName 
        */
        rootElement.AddContextMenuItemByTypeName = function (elementTypeName, name, commandName, text) {
            rootElement.__DCWriterReference.invokeMethod("AddContextMenuItemByTypeName", elementTypeName, name, commandName, text);
        };
        /**
        * 向文档元素快键菜单添加一个分隔条
        * @param {string} elementTypeName 文档元素类型名称 
        * @name AddContextMenuSeparatorByTypeName 
        */
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
        * @name AddDropdownListItem 
        */
        rootElement.AddDropdownListItem = function (id, text, Value, saveToXml) {
            return rootElement.__DCWriterReference.invokeMethod("AddDropdownListItem", id, text, Value, saveToXml);
        };
        /**
        * 追加新的子文档对象
        * @param {DCSoft.Writer.Dom.XTextSubDocumentElement} newSubDoc 子文档对象 
        * @name AppendSubDocument 
        */
        rootElement.AppendSubDocument = function (newSubDoc) {
            rootElement.__DCWriterReference.invokeMethod("AppendSubDocument", newSubDoc);
        };
        /**
        * 删除自动保存的临时文件
        * @param {string} fileID 文件编号 
        * @name AutoSaveDelete 
        */
        rootElement.AutoSaveDelete = function (fileID) {
            rootElement.__DCWriterReference.invokeMethod("AutoSaveDelete", fileID);
        };
        /**
        * 是否存在自动保存的文件
        * @param {string} fileID 文件编号 
        * @param {boolean} confirm 是否提示用户 
        * @returns {boolean} 是否存在自动保存的文件
        * @name AutoSaveExists 
        */
        rootElement.AutoSaveExists = function (fileID, confirm) {
            return rootElement.__DCWriterReference.invokeMethod("AutoSaveExists", fileID, confirm);
        };
        /**
        * 从自动保存中恢复文件内容
        * @param {string} fileID 文件编号 
        * @returns {boolean} 操作是否成功
        * @name AutoSaveLoadDocument 
        */
        rootElement.AutoSaveLoadDocument = function (fileID) {
            return rootElement.__DCWriterReference.invokeMethod("AutoSaveLoadDocument", fileID);
        };
        /**
        * 开始执行编辑元素内容值的操作
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @returns {boolean} 操作是否成功
        * @name BeginEditElementValue 
        */
        rootElement.BeginEditElementValue = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("BeginEditElementValue", element);
        };
        /**
        * 开始执行编辑元素内容值的操作
        * @param {string} id 文档元素编号 
        * @returns {boolean} 操作是否成功
        * @name BeginEditElementValueById 
        */
        rootElement.BeginEditElementValueById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("BeginEditElementValueById", id);
        };
        /**
        * 取消当前的编辑元素内容的操作
        * @returns {boolean} 操作是否成功
        * @name CancelEditElementValue 
        */
        rootElement.CancelEditElementValue = function () {
            return rootElement.__DCWriterReference.invokeMethod("CancelEditElementValue");
        };
        /**
        * 判断是否允许执行SignBySignImage函数。
        * @returns {boolean} 是否允许执行
        * @name CanSignBySignImage 
        */
        rootElement.CanSignBySignImage = function () {
            return rootElement.__DCWriterReference.invokeMethod("CanSignBySignImage");
        };
        /**
         * 清空文档内容 
         * @name ClearContent 
         */
        rootElement.ClearContent = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearContent");
        };
        /**
        * 清空快捷菜单项目
        * @name ClearContextMenuItem 
        */
        rootElement.ClearContextMenuItem = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearContextMenuItem");
        };
        /**
        * 清空当前签名数据
        * @returns {boolean} 操作是否修改了文档内容
        * @name ClearCurrentSign 
        */
        rootElement.ClearCurrentSign = function () {
            return rootElement.__DCWriterReference.invokeMethod("ClearCurrentSign");
        };
        /**
        * 清空重做 / 撤销操作信息
        * @name ClearUndo 
        */
        rootElement.ClearUndo = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearUndo");
        };
        /**
        * 提交指定容器元素中的用户痕迹信息
        * @param {DCSoft.Writer.Dom.XTextContainerElement} element 容器文档元素对象 
        * @returns {boolean} 操作是否修改了文档内容
        * @name CommitContentUserTrace 
        */
        rootElement.CommitContentUserTrace = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("CommitContentUserTrace", element);
        };
        /**
        * 提交指定容器元素中的用户痕迹信息
        * @param {string} id 文档元素编号 
        * @returns {boolean} 操作是否修改了文档内容
        * @name CommitContentUserTraceById 
        */
        rootElement.CommitContentUserTraceById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("CommitContentUserTraceById", id);
        };
        /**
        * 复制 
        * @returns {boolean} 是否成功 
        * @name Copy 
        */
        rootElement.Copy = function () {
            //让编辑器获取焦点
            //找到内部的textarea
            //var hasTextArea = rootElement.querySelector('textarea[dctype=dcinput]');
            //if (hasTextArea) {
            //    hasTextArea.focus();
            //}
            document.execCommand('copy');
            //return rootElement.__DCWriterReference.invokeMethod("Copy");
        };

        /**
         * 
         * @returns
         */
        rootElement.hasLocalPaste = function () {
            if (navigator.clipboard && navigator.clipboard.write) {
                return true;
            } else {
                return false;
            }
        }

        /**
        * 创建一个文档内容查找替换器
        * @returns {DCSoft.Writer.Commands.IContentSearchReplacer} 
        * @name CreateContentSearchReplacer 
        */
        rootElement.CreateContentSearchReplacer = function () {
            return rootElement.__DCWriterReference.invokeMethod("CreateContentSearchReplacer");
        };
        /**
        * 根据一个XML字符串创建一个文档元素对象
        * @param {string} xml XML字符串 
        * @returns {DCSoft.Writer.Dom.XTextElement} 创建的文档元素对象
        * @name CreateElementByXMLFragment 
        */
        rootElement.CreateElementByXMLFragment = function (xml) {
            return rootElement.__DCWriterReference.invokeMethod("CreateElementByXMLFragment", xml);
        };
        /**
         * 剪切 
         * @param {boolean} showUI 是否显示
         * @returns {boolean} 是否成功 
         * @name Cut 
         */
        rootElement.Cut = function (showUI) {
            //var datas = '';
            //var ref9 = rootElement.__DCWriterReference;
            //if (ref9 != null) {
            //    datas = ref9.invokeMethod(
            //        "DoCut", false, false);
            //}
            //console.log(datas)
            //WriterControl_UI.SetClipboardData(datas, null, 'cut', rootElement);
            //return rootElement.__DCWriterReference.invokeMethod("Cut", showUI);
            document.execCommand('cut');
        };
        /**
        * 删除选择区域
        * @param {boolean} showUI
        * @name DeleteSelection 
        */
        rootElement.DeleteSelection = function (showUI) {
            rootElement.__DCWriterReference.invokeMethod("DeleteSelection", showUI);
        };
        /**
        * 检测数据源填充操作导致的修改文档元素的个数，但不真正填充数据源，不会修改文档内容。
        * @returns {DCSoft.Writer.Dom.DetectResultForValueBindingModifiedList} 结果信息列表
        * @name DetectValueBindingModified 
        */
        rootElement.DetectValueBindingModified = function () {
            return rootElement.__DCWriterReference.invokeMethod("DetectValueBindingModified");
        };
        /** 清理所有正在使用的资源
        * @param {boolean} disposing 如果应释放托管资源，为 true；否则为 false。 
        * @name Dispose 
        */
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
        * @name DocumentValueValidate 
        */
        rootElement.DocumentValueValidate = function () {
            return rootElement.__DCWriterReference.invokeMethod("DocumentValueValidate");
        };
        /**
         * 文档内容进行校验，返回校验结果
         * @returns {Array} 校验结果列表 
         * @name DocumentValueValidateWithCreateDocumentComments
         */
        rootElement.DocumentValueValidateWithCreateDocumentComments = function () {
            return rootElement.__DCWriterReference.invokeMethod("DocumentValueValidateWithCreateDocumentComments");
        };
        /**
        * 文档内容进行校验，以XML形式返回校验结果
        * @returns {string} 
        * @name DocumentValueValidateXML 
        */
        rootElement.DocumentValueValidateXML = function () {
            return rootElement.__DCWriterReference.invokeMethod("DocumentValueValidateXML");
        };
        /**
        * 编辑文本标签元素在当前页面中显示的文本
        * @param {DCSoft.Writer.Dom.XTextLabelElement} lbl  
        * @returns {boolean} 操作是否成功
        * @name EditLabelPageText 
        */
        rootElement.EditLabelPageText = function (lbl) {
            return rootElement.__DCWriterReference.invokeMethod("EditLabelPageText", lbl);
        };
        /**
         * 执行编辑器命令
         * @param {string} strCommandName 命令名称
         * @param {boolean} bolShowUI 是否显示用户界面
         * @param {string} strParameter 参数
         * @returns {string} 执行结果
         * @name ExecuteCommand
         */
        rootElement.ExecuteCommand = function (strCommandName, bolShowUI, strParameter) {

            return rootElement.__DCWriterReference.invokeMethod("ExecuteCommand", strCommandName, bolShowUI, strParameter);
        };
        /**
        * 高亮度提示文档元素
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @param {boolean} autoScroll 是否自动滚动 
        * @name FlashElement 
        */
        rootElement.FlashElement = function (element, autoScroll) {
            rootElement.__DCWriterReference.invokeMethod("FlashElement", element, autoScroll);
        };
        /**
        * 高亮度提示文档元素
        * @param {DCSoft.Writer.Dom.XTextElementList} elements 文档元素对象 
        * @param {boolean} autoScroll 是否自动滚动 
        * @name FlashElements 
        */
        rootElement.FlashElements = function (elements, autoScroll) {
            rootElement.__DCWriterReference.invokeMethod("FlashElements", elements, autoScroll);
        };
        /**
        * 编辑器控件获得输入焦点
        * @returns {boolean} 操作是否成功
        * @name Focus 
        */
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
        * @name FocusElementById 
        */
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
        /** wyc20230725:补充更通用的定位元素接口
        * 让指定文档元素获得输入焦点
        * @param {object} item 文档元素的ID，或元素的后台.NET引用对象 
        * @returns {boolean} 操作是否成功
        * @name FocusElement 
        */
        rootElement.FocusElement = function (item) {
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
            if (typeof (item) === "string") {
                return rootElement.__DCWriterReference.invokeMethod("FocusElementById", item);
            } else if (DCTools20221228.IsDotnetReferenceElement(item) === true) {
                return rootElement.__DCWriterReference.invokeMethod("FocusElement", item);
            }
            return false;
        };
        /**
        * 系统清理内存。这个过程是耗时间的。
        * @name GCCollect 
        */
        rootElement.GCCollect = function () {
            rootElement.__DCWriterReference.invokeMethod("GCCollect");
        };
        /**
        * 获得文档中绑定的数据源名称字符串列表。各个名称之间用逗号分开
        * @returns {string} 数据源名称列表
        * @name GetBindingDataSources 
        */
        rootElement.GetBindingDataSources = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetBindingDataSources");
        };
        /**
        * 获得缓存的项目列表
        * @param {string} name 名称 
        * @returns {DCSoft.Writer.Data.ListItemCollection} 获得的对象
        * @name GetBufferedListItems 
        */
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
        * @name GetCheckedValueList 
        */
        rootElement.GetCheckedValueList = function (spliter, includeCheckbox, includeRadio, includeElementID, includeElementName) {
            return rootElement.__DCWriterReference.invokeMethod("GetCheckedValueList", spliter, includeCheckbox, includeRadio, includeElementID, includeElementName);
        };
        /**
        * 获得所有支持的命令名称组成的字符串，各个名称之间用逗号分开
        * @returns {string} 字符串列表
        * @name GetCommandNameList 
        */
        rootElement.GetCommandNameList = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCommandNameList");
        };
        /**
        * 获得当前插入点所在的指定类型的文档元素对象
        * @param {string} typeName 指定的文档元素类型的名称 
        * @returns {DCSoft.Writer.Dom.XTextElement} 获得的文档元素对象
        * @name GetCurrentElementByTypeName 
        */
        rootElement.GetCurrentElementByTypeName = function (typeName) {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentElementByTypeName", typeName);
        };
        /**
        * 获得自定义属性值
        * @param {string} name 属性名 
        * @returns {string} 属性值
        * @name GetCustomAttribute 
        */
        rootElement.GetCustomAttribute = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetCustomAttribute", name);
        };
        /**
        * 获得描述数据源绑定信息的XML字符串
        * @returns {DCSoft.Writer.Dom.DataSourceBindingDescriptionList} 描述信息列表
        * @name GetDataSourceBindingDescriptions 
        */
        rootElement.GetDataSourceBindingDescriptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDataSourceBindingDescriptions");
        };
        /**
        * 获得描述数据源绑定信息的XML字符串
        * @returns {string} 描述数据源绑定信息的XML字符串。
        * @name GetDataSourceBindingDescriptionsXML 
        */
        rootElement.GetDataSourceBindingDescriptionsXML = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDataSourceBindingDescriptionsXML");
        };
        /**
        * 检测数据源填充操作导致的修改文档元素的相关信息，但不真正填充数据源，不会修改文档内容。
        * @returns {string} 结果信息列表
        * @name GetDetectValueBindingModifiedMessage 
        */
        rootElement.GetDetectValueBindingModifiedMessage = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDetectValueBindingModifiedMessage");
        };
        /**
        * 获得参数是否有效
        * @param {string} parameterName 参数名 
        * @returns {boolean} 是否有效
        * @name GetDocumentParameterEnabled 
        */
        rootElement.GetDocumentParameterEnabled = function (parameterName) {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentParameterEnabled", parameterName);
        };
        /**
        * 获得Xml格式的文档参数值
        * @param {string} name 参数名 
        * @returns {string} 参数值
        * @name GetDocumentParameterValueXml 
        */
        rootElement.GetDocumentParameterValueXml = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentParameterValueXml", name);
        };
        /**
        * 
        * @param {string} name 参数名 
        * @returns {object} 获得文档参数值
        * @name GetDocumentParameterValue 
        */
        rootElement.GetDocumentParameterValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumnetParameterValue", name);
        };
        /**
        * 获得指定文档元素的属性
        * @param {string} id 元素编号 
        * @param {string} attributeName 属性名称
        * @returns {string} 属性值
        * @name GetElementAttribute 
        */
        rootElement.GetElementAttribute = function (id, attributeName) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementAttribute", id, attributeName);
        };
        /**
        * 获得指定ID号的文档元素对象, 查找时ID值区分大小写的。
        * @param {string} id 编号 
        * @returns {DCSoft.Writer.Dom.XTextElement} 找到的文档元素对象
        * @name GetElementById 
        */
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
        * 获得控件客户区中指定位置处的文档元素对象
        * @param {number} x X坐标 
        * @param {number} y Y坐标 
        * @returns {DCSoft.Writer.Dom.XTextElement} 对象
        * @name GetElementByPosition 
        */
        rootElement.GetElementByPosition = function (x, y) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementByPosition", x, y);
        };
        /**
        * 获得单复选框文档元素的勾选状态, 如果没找到元素则返回false。
        * @param {string} id 文档元素编号 
        * @returns {boolean} 元素的勾选状态
        * @name GetElementChecked 
        */
        rootElement.GetElementChecked = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementChecked", id);
        };
        /**
        * 获得指定的文档元素在编辑器控件客户区中的边界
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @returns {System.Drawing.Rectangle} 边界
        * @name GetElementClientBounds 
        */
        rootElement.GetElementClientBounds = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementClientBounds", element);
        };
        /**
        * 获得指定的文档元素在编辑器控件客户区中的边界的字符串值，为"left,top,width,height"格式.
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @returns {string} 边界
        * @name GetElementClientBoundsString 
        */
        rootElement.GetElementClientBoundsString = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementClientBoundsString", element);
        };
        /**
        * 返回元素外置内容的文档XML字符串
        * @param {string} id 元素编号 
        * @returns {string} XML字符串
        * @name GetElementInnerXmlByID 
        */
        rootElement.GetElementInnerXmlByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementInnerXmlByID", id);
        };
        /**
        * 返回元素内置内容的文档XML字符串
        * @param {string} id 元素编号 
        * @returns {string} XML字符串
        * @name GetElementOuterXmlByID 
        */
        rootElement.GetElementOuterXmlByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementOuterXmlByID", id);
        };
        /**
        * 获得文档元素的自定义属性值
        * @param {string} id 元素编号 
        * @param {string} name 属性名 
        * @returns {string} 属性值
        * @name GetElementProperty 
        */
        rootElement.GetElementProperty = function (id, name) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementProperty", id, name);
        };
        /**
        * 获得文档中所有指定编号的元素对象列表, 查找时ID值区分大小写的。
        * @param {string} id 指定的编号 
        * @returns {DCSoft.Writer.Dom.XTextElementList} 找到的元素对象列表
        * @name GetElementsById 
        */
        rootElement.GetElementsById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementsById", id);
        };
        /**
        * 获得文档中指定name值的元素对象, 查找时name值区分大小写的。
        * @param {string} name 指定的编号 
        * @returns {DCSoft.Writer.Dom.XTextElementList} 找到的元素对象
        * @name GetElementsByName 
        */
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
        * @name GetElementVisible 
        */
        rootElement.GetElementVisible = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementVisible", id);
        };
        /**
        * 返回包含数据的XML片段, 本函数返回的XML字符串可以作为编辑器控件或文档对象的函数CreateElementByXMLFragment()的参数。
        * @param {string} id 元素编号   
        * @returns {string} 生成的XML片段字符串
        * @name GetElementXMLFragmentByID 
        */
        rootElement.GetElementXMLFragmentByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementXMLFragmentByID", id);
        };
        /**
        * 在子孙文档元素中获得第一个指定类型的文档元素，但不包括本元素本身。
        * @param {string} elementTypeName 文档元素类型名称
        * @returns {DCSoft.Writer.Dom.XTextElement} 获得的文档元素对象
        * @name GetFirstElementByTypeName 
        */
        rootElement.GetFirstElementByTypeName = function (elementTypeName) {
            return rootElement.__DCWriterReference.invokeMethod("GetFirstElementByTypeName", elementTypeName);
        };
        /**
        * 获得表单数据
        * @param {string} name 字段名称
        * @returns {string} 获得的表单数值
        * @name GetFormValue 
        */
        rootElement.GetFormValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetFormValue", name);
        };
        /**
        * 获得DCWriter全局选项值
        * @param {string} name 选项名称
        * @returns {string} 选项值
        * @name GetGlobalOptionValue 
        */
        rootElement.GetGlobalOptionValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetGlobalOptionValue", name);
        };
        /**
        * 获得指定元素承载的对象
        * @param {DCSoft.Writer.Dom.XTextControlHostElement} element 文档元素对象 
        * @returns {object} 承载的对象
        * @name GetHostedInstance 
        */
        rootElement.GetHostedInstance = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("GetHostedInstance", element);
        };
        /**
        * 获得文档的Html文本代码
        * @param {boolean} IncludeSelectionOnly 是否只包含选择区域
        * @returns {string} 文档Html文本
        * @name GetHtmlText 
        */
        rootElement.GetHtmlText = function (IncludeSelectionOnly) {
            return rootElement.__DCWriterReference.invokeMethod("GetHtmlText", IncludeSelectionOnly);
        };
        /**
        * 获得指定ID号的输入域对象, 查找时ID值区分大小写的。
        * @param {string} id ID号
        * @returns {boolean} 找到的输入域元素对象
        * @name GetInputFieldElementById 
        */
        rootElement.GetInputFieldElementById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetInputFieldElementById", id);
        };
        /**
        * 获得指定编号的输入域的InnerValue属性值。
        * @param {string} id 输入域编号
        * @returns {string} 获得的属性值
        * @name GetInputFieldInnerValue 
        */
        rootElement.GetInputFieldInnerValue = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetInputFieldInnerValue", id);
        };
        /**
        * 将控件添加到指定句柄的窗体中
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 操作是否成功
        * @name GetLastCustomCommandName 
        */
        rootElement.GetLastCustomCommandName = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetLastCustomCommandName");
        };
        /**
        * 最后一次执行的自定义命令名称的文本
        * @returns {string} 
        * @name GetLastCustomCommandText 
        */
        rootElement.GetLastCustomCommandText = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetLastCustomCommandText");
        };
        /**
        * 获得导航节点字符串
        * @returns {string} 
        * @name GetNavigateNodesString 
        */
        rootElement.GetNavigateNodesString = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetNavigateNodesString");
        };
        /**
        * 获得文档中指定类型的下一个元素
        * @param {DCSoft.Writer.Dom.XTextElement} startElement 开始查找的起始元素 
        * @param {string} nextElementTypeName 要查找的元素的类型的名称
        * @returns {DCSoft.Writer.Dom.XTextElement} 找到的元素
        * @name GetNextElementByTypeName 
        */
        rootElement.GetNextElementByTypeName = function (startElement, nextElementType) {
            return rootElement.__DCWriterReference.invokeMethod("GetNextElementByTypeName", startElement, nextElementType);
        };
        /**
        * 获得系统当前日期事件
        * @returns {Date} 日期时间
        * @name GetNowDateTime 
        */
        rootElement.GetNowDateTime = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetNowDateTime");
        };
        /**
        * 获得指定名称的选项数值, 选项名称为“选项组名.选项名称”的格式，比如“ViewOptions.ShowParagraphFlag”。
        * 比如 string v = obj.GetOptionValue("ViewOptions.ShowParagraphFlag"); // 返回 "true"或"false"。
        * string v2 = obj.GetOptionValue("ViewOptions.TagColorForNormalField");// 返回类似"#AAAAAA"等表示颜色值的字符串。
        * @param {string} name 选项名称
        * @returns {string} 选项数值
        * @name GetOptionValue 
        */
        rootElement.GetOptionValue = function (name) {
            return rootElement.__DCWriterReference.invokeMethod("GetOptionValue", name);
        };
        /**
        * 获得样式在列表中的编号
        * @param {string} styleString 样式字符串，比如“FontName: 宋体; FontSize: 9”
        * @returns {number} 编号
        * @name GetStyleIndexByString 
        */
        rootElement.GetStyleIndexByString = function (styleString) {
            return rootElement.__DCWriterReference.invokeMethod("GetStyleIndexByString", styleString);
        };
        /**
        * 获得指定编号的子文档内容XML字符串
        * @param {string} id 子文档元素编号 
        * @returns {string} 获得的XML字符串
        * @name GetSubDoumentContentXmlByID 
        */
        rootElement.GetSubDoumentContentXmlByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetSubDoumentContentXmlByID", id);
        };
        /**
        * 获得指定页的剩余空白行数
        * @param {number} pageIndex 从1开始计算的页码号
        * @param {number} specifyLineHeight 指定的行高
        * @returns {number} 剩余的空白行数
        * @name GetSurplusLinesOfSpeifyPage 
        */
        rootElement.GetSurplusLinesOfSpeifyPage = function (pageIndex, specifyLineHeight) {
            return rootElement.__DCWriterReference.invokeMethod("GetSurplusLinesOfSpeifyPage", pageIndex, specifyLineHeight);
        };

        /**
        * 获得表格单元格的文本内容
        * @param {string} tableID 编号
        * @param {number} rowIndex 从0开始计算的行号
        * @param {number} colIndex 从0开始计算的列号
        * @returns {string} 单元格文本
        * @name GetTableCellText 
        */
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
        * @name GetXMLTextForSaveBinary 
        */
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
        * @name InDesignMode 
        */
        rootElement.InDesignMode = function () {
            return rootElement.__DCWriterReference.invokeMethod("InDesignMode");
        };
        /**
        * 在当前位置处插入子文档元素
        * @param {DCSoft.Writer.Dom.XTextSubDocumentElement} newSubDoc 要插入的子文档对象 
        * @param {boolean} insertUp true： 在上面插入；false： 在下面插入 
        * @name InsertSubDocuentAtCurrentPosition 
        */
        rootElement.InsertSubDocuentAtCurrentPosition = function (newSubDoc, insertUp) {
            rootElement.__DCWriterReference.invokeMethod("InsertSubDocuentAtCurrentPosition", newSubDoc, insertUp);
        };
        /**
        * 判断是否为合法的XML字符串
        * @param {string} xml XML字符串 
        * @returns {boolean} 是否合法
        * @name IsValidateXML 
        */
        rootElement.IsValidateXML = function (xml) {
            return rootElement.__DCWriterReference.invokeMethod("IsValidateXML", xml);
        };
        /**wyc20230724
        * 判断是否为合法的JSON字符串
        * @param {string} xml XML字符串 
        * @returns {boolean} 是否合法
        * @name IsValidateXML 
        */
        rootElement.IsValidateJSONString = function (jsonstring) {
            try {
                var obj = JSON.parse(jsonstring);
                return true;
            } catch { }
            return false;
        };
        /**
        * 以指定的格式从BASE64字符串加载文档内容
        * @param {string} text BASE64字符串
        * @param {string} format 文件格式 
        * @returns {boolean} 操作是否成功
        * @name LoadDocumentFromBase64String 
        */
        rootElement.LoadDocumentFromBase64String = function (text, format, specifyLoadPart) {
            return WriterControl_IO.LoadDocumentFromString(rootElement, text, format, specifyLoadPart, true);
        };
        /**
        * 
        * @param {byte[]} bs 
        * @param {string} format
        * @returns {boolean} 操作是否成功
        * @name LoadDocumentFromBinary 
        */
        rootElement.LoadDocumentFromBinary = function (bs, format) {
            return rootElement.__DCWriterReference.invokeMethod("LoadDocumentFromBinary", bs, format);
        };
        /**
        * 从指定的文件地址中加载文档
        * @param {string} url 文件地址
        * @param {string} format 文件格式
        * @returns {boolean} 是否成功加载文档
        * @name LoadDocumentFromFile 
        */
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
         * @name LoadDocumentFromString
         */
        rootElement.LoadDocumentFromString = function (strData, strFormat, specifyLoadPart, callback = null) {
            if (strFormat === 'xml' && !(rootElement.IsValidateXML(strData)) || strFormat === 'json' && !rootElement.validateJSON(strData)) {
                if (typeof (callback) == "function") {
                    return callback.call(rootElement, false);
                }
            }
            return WriterControl_IO.LoadDocumentFromString(rootElement, strData, strFormat, specifyLoadPart);
        };
        /**
        * 校验是否为json格式
        * @param {string} jsonContent json字符串
        * @returns {boolean} validate 是否为json格式
        * @name validateJSON
        */
        rootElement.validateJSON = function (jsonContent) {
            var validate = false
            try {
                if (jsonContent && JSON.parse(jsonContent) && typeof JSON.parse(jsonContent) === 'object') {
                    validate = true
                }
            } catch (error) {
                validate = false
            }
            return validate
        };

        // /**
        //  * 校验是否为xml格式
        //  * @param {string} xmlContent xml字符串
        //  * @returns {boolean} validate 是否为xml格式
        //  * @name validateXML
        //  */
        // rootElement.validateXML = function (xmlContent) {
        //     var xmlDoc = null
        //     var validate = false
        //     // code for IE 
        //     if (window.ActiveXObject) {
        //         xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        //         xmlDoc.async = "false";
        //         xmlDoc.loadXML(xmlContent);
        //         if (xmlDoc.parseError.errorCode == 0) {
        //             validate = true
        //         }
        //     }
        //     // code for Mozilla, Firefox, Opera, chrome, safari,etc. 
        //     else if (document.implementation.createDocument) {
        //         var parser = new DOMParser();
        //         xmlDoc = parser.parseFromString(xmlContent, "text/xml");
        //         var error = xmlDoc.getElementsByTagName("parsererror");
        //         if (error.length > 0) {
        //             validate = false

        //         } else {
        //             validate = true
        //         }
        //     }
        //     return validate
        // };

        /**
        * 锁定文档元素的内容
        * @param {DCSoft.Writer.Dom.XTextContainerElement } element 文档元素，必须为容器类文档元素 
        * @param {string} containerHandle 指定的窗体句柄对象 
        * @param {string} containerHandle 指定的窗体句柄对象 
        * @param {boolean} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 操作是否成功
        * @name LockContentByElement 
        */
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
        * @name LockContentByElementID 
        */
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
        * @name LockContentByTableRow 
        */
        rootElement.LockContentByTableRow = function (tableID, rowIndexBase, userID, authoriseUserIDList, logUndo) {
            return rootElement.__DCWriterReference.invokeMethod("LockContentByTableRow", tableID, rowIndexBase, userID, authoriseUserIDList, logUndo);
        };
        /**
        * 移动光标到下一行
        * @name MoveDownOneLine 
        */
        rootElement.MoveDownOneLine = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveDownOneLine");
        };
        /**
        * 移动光标到行尾
        * @name MoveEnd 
        */
        rootElement.MoveEnd = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveEnd");
        };
        /**
        * 移动光标到行首
        * @name MoveHome 
        */
        rootElement.MoveHome = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveHome");
        };
        /**
        * 向左移动光标
        * @name MoveLeft 
        */
        rootElement.MoveLeft = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveLeft");
        };
        /**
        * 向右移动光标
        * @name MoveRight 
        */
        rootElement.MoveRight = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveRight");
        };
        /**
        * 将插入点移动到指定位置
        * @param {DCSoft.Writer.MoveTarget} target 移动的目标 
        * @name MoveTo 
        */
        rootElement.MoveTo = function (target) {
            rootElement.__DCWriterReference.invokeMethod("MoveTo", target);
        };
        /**
        * 移动当前光标位置到指定客户区坐标位置处
        * @param {number} clientX 控件客户区X坐标，像素单位
        * @param {number} clientY 控件客户区Y坐标，像素单位
        * @returns {boolean} 操作是否修改了插入点
        * @name MoveToClientPosition 
        */
        rootElement.MoveToClientPosition = function (clientX, clientY) {
            return rootElement.__DCWriterReference.invokeMethod("MoveToClientPosition", clientX, clientY);
        };
        /**
        * 跳到指定页, 页号从0开始计算。
        * @param {number} index 从0开始的页号 
        * @returns {boolean} 操作是否成功
        * @name MoveToPage 
        */
        rootElement.MoveToPage = function (index) {
            return rootElement.__DCWriterReference.invokeMethod("MoveToPage", index);
        };
        /**
        * 移动光标到指定位置处
        * @param {number} index 位置序号
        * @name MoveToPosition 
        */
        rootElement.MoveToPosition = function (index) {
            rootElement.__DCWriterReference.invokeMethod("MoveToPosition", index);
        };
        /**
        * 移动光标到上一行
        * @name MoveUpOneLine 
        */
        rootElement.MoveUpOneLine = function () {
            rootElement.__DCWriterReference.invokeMethod("MoveUpOneLine");
        };
        /**
        * 导航到节点指定的位置
        * @param {DCSoft.Writer.NavigateNode} node 节点
        * @returns {boolean} 操作是否成功
        * @name Navigate 
        */
        rootElement.Navigate = function (node) {
            return rootElement.__DCWriterReference.invokeMethod("Navigate", node);
        };
        /**
        * 导航到指定编号的节点的位置
        * @param {string} id 节点编号
        * @returns {boolean} 操作是否成功
        * @name NavigateByNodeID 
        */
        rootElement.NavigateByNodeID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("NavigateByNodeID", id);
        };
        /**
        * 查询下拉列表项目
        * @param {DCSoft.Writer.Controls.QueryListItemsEventArgs} args 参数
        * @name OnQueryListItems 
        */
        rootElement.OnQueryListItems = function (args) {
            rootElement.__DCWriterReference.invokeMethod("OnQueryListItems", args);
        };
        /**
         * 粘贴 
         * @name Paste 
         */
        rootElement.Paste = function () {
            WriterControl_UI.GetClipboardData(null, rootElement);
            /*rootElement.__DCWriterReference.invokeMethod("Paste");*/
        };
        /**
        * 打印当前页
        * @name PrintCurrentPage 
        */
        rootElement.PrintCurrentPage = function () {
            rootElement.__DCWriterReference.invokeMethod("PrintCurrentPage");
        };
        /** 关闭打印预览界面，恢复编辑界面
         * @name ClosePrintPreview
         */
        rootElement.ClosePrintPreview = function () {
            WriterControl_Print.ClosePrintPreview(rootElement, true);
            WriterControl_Paint.InvalidateAllView(rootElement);
        };
        /**
         * 展示打印预览界面
         * @param {any} options 选项
         * @name LoadPrintPreview
         */
        rootElement.LoadPrintPreview = function (options) {
            WriterControl_Print.PrintPreview(rootElement, options);
        };
        /** wyc20230628:兼容四代接口
         * 展示打印预览界面
         * @param {any} options 选项
         * @name LoadPrintPreviewWithPermissionMark
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
         * @name IsPrintPreview
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
         * @name PrintDocument 
         */
        rootElement.PrintDocument = function (options) {
            return WriterControl_Print.Print(rootElement, options);
            //rootElement.__DCWriterReference.invokeMethod("PrintDocument");
        };
        /**
        * 指定页码打印文档，页码是从1开始计算的。但是这个起始页码也可以由SetGlobalPageIndexoffset()修改。
        * 比如 ctl.PrintDocumentExt(true, "1,3,5,7,9");
        * @param {boolean} showDialog 是否显示打印机选择对话框
        * @param {string} specifyPageIndexs 指定的页码，各个页码之间用逗号分开，页码是从1开始计算的，如果为空则打印整个文档 
        * @name PrintDocumentExt 
        */
        rootElement.PrintDocumentExt = function (showDialog, specifyPageIndexs) {
            rootElement.__DCWriterReference.invokeMethod("PrintDocumentExt", showDialog, specifyPageIndexs);
        };
        /**
         * 重做 
         * @name Redo 
         */
        rootElement.Redo = function () {
            rootElement.__DCWriterReference.invokeMethod("Redo");
        };

        /**
        * 刷新 
        * @name RefreshDocument 
        */
        rootElement.RefreshDocument = function () {

            //wyc20230609:换个写法试试
            rootElement.__DCWriterReference.invokeMethod("RefreshInnerView", false);
            WriterControl_Paint.InvalidateAllView(rootElement);
        };
        /**
        * 刷新文档内部排版和分页。不更新用户界面。
        * @param {boolean} fastMode 
        * @name RefreshInnerView 
        */
        rootElement.RefreshInnerView = function (fastMode) {
            rootElement.__DCWriterReference.invokeMethod("RefreshInnerView", fastMode);
        };
        /**
        * 拒绝对文档的修订
        * @returns {boolean} 操作是否修改了文档内容
        * @name RejectUserTrace 
        */
        rootElement.RejectUserTrace = function () {
            return rootElement.__DCWriterReference.invokeMethod("RejectUserTrace");
        };
        /**
        * 删除指定文档元素类型的快键菜单项目
        * @param {string} elementTypeName 类型名称 
        * @param {string} name 菜单名称
        * @returns {boolean} 操作是否成功
        * @name RemoveContextMenuItemByTypeName 
        */
        rootElement.RemoveContextMenuItemByTypeName = function (elementTypeName, name) {
            rootElement.__DCWriterReference.invokeMethod("RemoveContextMenuItemByTypeName", elementTypeName, name);
        };
        /**
        * 重置表单元素默认值
        * @returns {boolean} 是否导致文档内容发生改变
        * @name ResetFormValue 
        */
        rootElement.ResetFormValue = function () {
            return rootElement.__DCWriterReference.invokeMethod("ResetFormValue");
        };
        /**
        * 重置检测文档内容编辑状态标记，使得可以再次进行判断。
        * @name ResetUIStartEditContentState 
        */
        rootElement.ResetUIStartEditContentState = function () {
            rootElement.__DCWriterReference.invokeMethod("ResetUIStartEditContentState");
        };
        /**
        * 对当前签名进行重新签名操作
        * @returns {boolean} 操作是否成功
        * @name ResignCurrentElement 
        */
        rootElement.ResignCurrentElement = function () {
            return rootElement.__DCWriterReference.invokeMethod("ResignCurrentElement");
        };
        /**
        * 对当前签名进行指定模式的重新签名操作
        * @param {DCSoft.Common.DCCASignMode} mode 指定的模式 
        * @returns {boolean} 操作是否成功
        * @name ResignCurrentElementSpecifyMode 
        */
        rootElement.ResignCurrentElementSpecifyMode = function (mode) {
            return rootElement.__DCWriterReference.invokeMethod("ResignCurrentElementSpecifyMode", mode);
        };
        /**
        * 对指定的容器元素进行重新签名
        * @param {DCSoft.Writer.Dom.XTextElement} rootElement 容器元素，必须为XTextContainerElement类型 
        * @returns {boolean} 操作是否成功
        * @name ReSignElement 
        */
        rootElement.ReSignElement = function (rootElement) {
            return rootElement.__DCWriterReference.invokeMethod("ReSignElement", rootElement);
        };
        /**
        * 保存文档到指定名称的文件中
        * @param {string} strUrl 文件名
        * @param {string} format 文件格式 
        * @returns {boolean} 操作是否成功
        * @name SaveDocument 
        */
        rootElement.SaveDocument = function (strUrl, format) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocument", strUrl, format);
        };
        /** wyc20230621:修改参数兼容四代接口
         * 保存文档为BASE64字符串
         * @param {object} options 保存文档需要的一系列参数对象
         * @returns {string} 输出的BASE64字符串 
         * @name SaveDocumentToBase64String 
         */
        rootElement.SaveDocumentToBase64String = function (options) {
            if (typeof (options) === "string") {
                return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToBase64String", options);
            }
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
        * @name SaveDocumentToFile 
        */
        rootElement.SaveDocumentToFile = function (url, format) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToFile", url, format);
        };
        /**
        * 将控件添加到指定句柄的窗体中
        * @param {number} containerHandle 指定的窗体句柄对象 
        * @returns {boolean} 操作是否成功
        * @name SaveDocumentToFileFast 
        */
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
         *  }
         * @returns {string} 文件内容的字符串
         * @name SaveDocumentToString
         */
        rootElement.SaveDocumentToString = function (options, callback = null) {
            let content = rootElement.__DCWriterReference.invokeMethod("SaveDocumentToString", options);
            if ((options === 'xml' && !rootElement.IsValidateXML(content)) || (options === 'json' && !rootElement.validateJSON(content))) {
                if (!!rootElement.EventSaveDocumentToStringValidate && typeof (rootElement.EventSaveDocumentToStringValidate) == "function") {
                    rootElement.EventSaveDocumentToStringValidate.call(rootElement, false);
                }
            }
            return content
        };
        /**
        * 保存长图片文件
        * @param {string} fileName 文件名 
        * @name SaveLongImageFile 
        */
        rootElement.SaveLongImageFile = function (fileName) {
            rootElement.__DCWriterReference.invokeMethod("SaveLongImageFile", fileName);
        };
        /**
        * 以打印模式保存长图片文件
        * @param {string} fileName 文件名
        * @name SaveLongImageFileInPrintMode 
        */
        rootElement.SaveLongImageFileInPrintMode = function (fileName) {
            rootElement.__DCWriterReference.invokeMethod("SaveLongImageFileInPrintMode", fileName);
        };
        /**
        * 保存长图片文件
        * @param {string} fileName 文件名 
        * @param {number} zoomRate 缩放比率
        * @name SaveLongImageFileZoom 
        */
        rootElement.SaveLongImageFileZoom = function (fileName, zoomRate) {
            rootElement.__DCWriterReference.invokeMethod("SaveLongImageFileZoom", fileName, zoomRate);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {string} format 图片格式，可以为bmp, png, jpg
        * @returns {string} 生成的BASE64字符串
        * @name SaveLongImageToBase64StringInPrintMode 
        */
        rootElement.SaveLongImageToBase64StringInPrintMode = function (format) {
            return rootElement.__DCWriterReference.invokeMethod("SaveLongImageToBase64StringInPrintMode", format);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {string} format 图片格式，可以为bmp, png, jpg
        * @param {string} zoomRate 缩放比率 
        * @returns {string} 生成的BASE64字符串
        * @name SaveLongImageToBase64StringZoom 
        */
        rootElement.SaveLongImageToBase64StringZoom = function (format, zoomRate) {
            return rootElement.__DCWriterReference.invokeMethod("SaveLongImageToBase64StringZoom", format, zoomRate);
        };
        /**
        * 保存页面图片文件
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} fileName 文件名 
        * @name SavePageImageFile 
        */
        rootElement.SavePageImageFile = function (pageIndex, fileName) {
            rootElement.__DCWriterReference.invokeMethod("SavePageImageFile", pageIndex, fileName);
        };
        /**
        * 保存页面图片文件
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} fileName 文件名 
        * @name SavePageImageFileInPrintMode 
        */
        rootElement.SavePageImageFileInPrintMode = function (pageIndex, fileName) {
            rootElement.__DCWriterReference.invokeMethod("SavePageImageFileInPrintMode", pageIndex, fileName);
        };
        /**
        * 保存页面图片文件
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} fileName 文件名 
        * @param {number} zoomRate 缩放比率
        * @name SavePageImageFileZoom 
        */
        rootElement.SavePageImageFileZoom = function (pageIndex, fileName, zoomRate) {
            rootElement.__DCWriterReference.invokeMethod("SavePageImageFileZoom", pageIndex, fileName, zoomRate);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} format 图片格式，可以为bmp, png, jpg 
        * @returns {string} 生成的BASE64字符串
        * @name SavePageImageToBase64String 
        */
        rootElement.SavePageImageToBase64String = function (pageIndex, format) {
            return rootElement.__DCWriterReference.invokeMethod("SavePageImageToBase64String", pageIndex, format);
        };
        /**
        * 保存页面图片到BASE64字符串中
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} format 图片格式，可以为bmp, png, jpg 
        * @returns {string} 生成的BASE64字符串
        * @name SavePageImageToBase64StringInPrintMode 
        */
        rootElement.SavePageImageToBase64StringInPrintMode = function (pageIndex, format) {
            return rootElement.__DCWriterReference.invokeMethod("SavePageImageToBase64StringInPrintMode", pageIndex, format);
        };
        /**
        * 将控件添加到指定句柄的窗体中
        * @param {number} pageIndex 从0开始计算的页面序号
        * @param {string} format 图片格式，可以为bmp, png, jpg 
        * @param {number} zoomRate 缩放比率
        * @returns {string} 生成的BASE64字符串
        * @name SavePageImageToBase64StringZoom 
        */
        rootElement.SavePageImageToBase64StringZoom = function (pageIndex, format, zoomRate) {
            return rootElement.__DCWriterReference.invokeMethod("SavePageImageToBase64StringZoom", pageIndex, format, zoomRate);
        };

        /**
        * 滚动视图到node元素处
        * @param {string} id 元素id字符串
        * @return {Boolean} 是否成功
        * @name ScrollIntoView
        */
        rootElement.ScrollIntoView = function (id) {
            if (!id || typeof (id) != "string") {
                return false;
            }
            return rootElement.FocusElementById(id);
        }

        /**
        * 滚动视图到光标位置
        * @name ScrollToCaret 
        */
        rootElement.ScrollToCaret = function () {
            rootElement.__DCWriterReference.invokeMethod("ScrollToCaret");
        };
        /**
        * 滚动视图到光标位置
        * @param {DCSoft.WinForms.ScrollToViewStyle} style 滚动方式
        * @name ScrollToCaretExt 
        */
        rootElement.ScrollToCaretExt = function (style) {
            rootElement.__DCWriterReference.invokeMethod("ScrollToCaretExt", style);
        };
        /**
        * 滚动视图到指定的视图坐标位置处
        * @param {number} viewPosition 视图Y坐标
        * @name ScrollToViewPosition 
        */
        rootElement.ScrollToViewPosition = function (viewPosition) {
            rootElement.__DCWriterReference.invokeMethod("ScrollToViewPosition", viewPosition);
        };
        /**
        * 选中文档所有内容
        * @name SelectAll 
        */
        rootElement.SelectAll = function () {
            rootElement.__DCWriterReference.invokeMethod("SelectAll");
        };
        /**
        * 选择内容
        * @param {DCSoft.Writer.Dom.XTextElement} startElement 选择区域起始元素 
        * @param {DCSoft.Writer.Dom.XTextElement} endElement 选择区域终止元素
        * @returns {boolean} 操作是否成功
        * @name SelectContentByStartEndElement 
        */
        rootElement.SelectContentByStartEndElement = function (startElement, endElement) {
            return rootElement.__DCWriterReference.invokeMethod("SelectContentByStartEndElement", startElement, endElement);
        };
        /**
        * 选择内容
        * @param {number} startContentIndex 选择区域起始编号
        * @param {number} endContentIndex 选择区域终止编号
        * @returns {boolean} 操作是否成功
        * @name SelectContentByStartEndIndex 
        */
        rootElement.SelectContentByStartEndIndex = function (startContentIndex, endContentIndex) {
            return rootElement.__DCWriterReference.invokeMethod("SelectContentByStartEndIndex", startContentIndex, endContentIndex);
        };
        /**
        * 选中文档元素
        * @param {string} id 文档元素编号
        * @returns {boolean} 操作是否成功
        * @name SelectElementById 
        */
        rootElement.SelectElementById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("SelectElementById", id);
        };
        /**
        * 设置自定义属性值
        * @param {string} name 属性名 
        * @param {string} Value 属性值 
        * @name SetCustomAttribute 
        */
        rootElement.SetCustomAttribute = function (name, Value) {
            rootElement.__DCWriterReference.invokeMethod("SetCustomAttribute", name, Value);
        };
        /**
        * 设置参数是否有效
        * @param {string} parameterName 参数名
        * @param {boolean} enabled 是否有效
        * @name SetDocumentParameterEnabled 
        */
        rootElement.SetDocumentParameterEnabled = function (parameterName, enabled) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentParameterEnabled", parameterName, enabled);
        };
        /**
        * 设置文档参数值
        * @param {string} name 参数名
        * @param {object} Value 新的参数值
        * @name SetDocumentParameterValue 
        */
        rootElement.SetDocumentParameterValue = function (name, Value) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentParameterValue", name, Value);
        };
        /**
        * 设置XML格式的文档参数值
        * @param {string} name 参数名
        * @param {string} xmlText 参数值
        * @name SetDocumentParameterValueXml 
        */
        rootElement.SetDocumentParameterValueXml = function (name, xmlText) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentParameterValueXml", name, xmlText);
        };
        /**
        * 设置DOM使用的图标
        * @param {DCSoft.Writer.DCStdImageKey} key 图标标号 
        * @param {string} base64String base64String图片对象 
        * @name SetDomImageByBase64String 
        */
        rootElement.SetDomImageByBase64String = function (key, base64String) {
            rootElement.__DCWriterReference.invokeMethod("SetDomImageByBase64String", key, base64String);
        };
        /**
        * 设置DOM使用的图标
        * @param {DCSoft.Writer.DCStdImageKey} key 图标标号 
        * @param {string} fileName 图片文件名
        * @name SetDomImageByFileName 
        */
        rootElement.SetDomImageByFileName = function (key, fileName) {
            rootElement.__DCWriterReference.invokeMethod("SetDomImageByFileName", key, fileName);
        };
        /**
        * 设置文档元素的属性值
        * @param {string} id 元素编号 
        * @param {string} attributeName 属性名
        * @param {string} attributeValue 属性值
        * @returns {boolean} 操作是否成功
        * @name SetElementAttribute 
        */
        rootElement.SetElementAttribute = function (id, attributeName, attributeValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementAttribute", id, attributeName, attributeValue);
        };
        /**
        * 设置单 / 复选框的勾选状态
        * @param {string} id 文档元素编号 
        * @param {boolean} newChecked 新的勾选状态
        * @returns {boolean} 操作是否成功
        * @name SetElementChecked 
        */
        rootElement.SetElementChecked = function (id, newChecked) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementChecked", id, newChecked);
        };
        /**
        * 设置文档元素自定义属性
        * @param {string} id 文档元素编号
        * @param {string} name 属性名
        * @param {string} Value 属性值
        * @returns {boolean} 操作是否成功
        * @name SetElementProperty 
        */
        rootElement.SetElementProperty = function (id, name, Value) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementProperty", id, name, Value);
        };
        /**
        * 设置文档元素文本内容
        * @param {string} id 元素编号或元素的后台.NET引用对象
        * @param {string} text 文本值
        * @returns {boolean} 操作是否成功
        * @name SetElementText 
        */
        rootElement.SetElementText = function (id, text) {
            //wyc20230724添加判断：
            if (DCTools20221228.IsDotnetReferenceElement(id) === true) {
                return rootElement.__DCWriterReference.invokeMethod("SetElementText", id, text);
            } else if (typeof (id) === "string") {
                return rootElement.__DCWriterReference.invokeMethod("SetElementTextByID", id, text);
            }
            return false;
            //return rootElement.__DCWriterReference.invokeMethod("SetElementText", id, text);
        };
        /**
        * 设置文档元素文本内容
        * @param {string} id 元素编号或元素的后台.NET引用对象
        * @param {string} text 文本值
        * @returns {boolean} 操作是否成功
        * @name SetElementTextByID 
        */
        rootElement.SetElementTextByID = function (id, text) {
            //wyc20230724添加判断：
            if (DCTools20221228.IsDotnetReferenceElement(id) === true) {
                return rootElement.__DCWriterReference.invokeMethod("SetElementText", id, text);
            } else if (typeof (id) === "string") {
                return rootElement.__DCWriterReference.invokeMethod("SetElementTextByID", id, text);
            }
            return false;
            //return rootElement.__DCWriterReference.invokeMethod("SetElementTextByID", id, text);
        };
        /**
        * 设置文档元素可见性
        * @param {string} id 文档元素编号
        * @param {boolean} visible 可见性
        * @returns {boolean} 操作是否成功
        * @name SetElementVisible 
        */
        rootElement.SetElementVisible = function (id, visible) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementVisible", id, visible);
        };
        /**
        * 设置全局的JavaScript代码.
        * @param {string} script 代码文本
        * @name SetGlobalJavaScript 
        */
        rootElement.SetGlobalJavaScript = function (script) {
            rootElement.__DCWriterReference.invokeMethod("SetGlobalJavaScript", script);
        };
        /**
        * 设置DCWriter全局选项值
        * @param {string} name 选项名称
        * @param {string} Value 选项值
        * @name SetGlobalOptionValue 
        */
        rootElement.SetGlobalOptionValue = function (name, value) {
            rootElement.__DCWriterReference.invokeMethod("SetGlobalOptionValue", name, value);
        };
        /**
        * 设置全局的页码偏移量
        * @param {number} offset 偏移量
        * @name SetGlobalPageIndexoffset 
        */
        rootElement.SetGlobalPageIndexoffset = function (offset) {
            rootElement.__DCWriterReference.invokeMethod("SetGlobalPageIndexoffset", offset);
        };
        /**
        * 设置文档HTML内容
        * @param {string} html
        * @name SetHtmlText 
        */
        rootElement.SetHtmlText = function (html) {
            rootElement.__DCWriterReference.invokeMethod("SetHtmlText", html);
        };
        /**
        * 设置指定编号的输入域的InnerValue属性值。
        * @param {string} id 输入域编号
        * @param {string} newValue 新的属性值 
        * @returns {boolean} 操作是否成功
        * @name SetInputFieldInnerValue 
        */
        rootElement.SetInputFieldInnerValue = function (id, newValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetInputFieldInnerValue", id, newValue);
        };
        /**
        * 设置输入域选择多个下拉项目
        * @param {string} id 输入域编号
        * @param {string} indexs 从0开始的下拉项目序号，各个序号之间用逗号分开 
        * @returns {boolean} 操作是否修改文档内容
        * @name SetInputFieldSelectedIndexs 
        */
        rootElement.SetInputFieldSelectedIndexs = function (id, indexs) {
            return rootElement.__DCWriterReference.invokeMethod("SetInputFieldSelectedIndexs", id, indexs);
        };
        /**
        * 根据文档元素来设置续打位置
        * @param {DCSoft.Writer.Dom.XTextElement} startElement 起始位置定位元素
        * @param {DCSoft.Printing.JumpPrintPositionMode} startMode 起始位置模式
        * @param {DCSoft.Writer.Dom.XTextElement} endElement 结束位置定位元素
        * @param {DCSoft.Printing.JumpPrintPositionMode} endMode 结束位置模式
        * @name SetJumpPrintByElement 
        */
        rootElement.SetJumpPrintByElement = function (startElement, startMode, endElement, endMode) {
            rootElement.__DCWriterReference.invokeMethod("SetJumpPrintByElement", startElement, startMode, endElement, endMode);
        };
        /**
        * 将下端续打位置移动到指定文档元素的边缘
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @param {boolean} autoSetEndPageIndex 自动设置开始显示页码
        * @param {boolean} useTopPosition true：设置到文档元素的上边缘，false：设置到文档元素的下边缘
        * @returns {boolean} 操作是否成功
        * @name SetJumpPrintEndPositionTo 
        */
        rootElement.SetJumpPrintEndPositionTo = function (element, autoSetEndPageIndex, useTopPosition) {
            return rootElement.__DCWriterReference.invokeMethod("SetJumpPrintEndPositionTo", element, autoSetEndPageIndex, useTopPosition);
        };
        /**
        * 将续打位置移动到指定文档元素的上边缘
        * @param {DCSoft.Writer.Dom.XTextElement} element 文档元素对象 
        * @param {boolean} autoSetStartPageIndex 自动设置开始显示页码
        * @param {boolean} useTopPosition true： 设置到文档元素的上边缘，false： 设置到文档元素的下边缘
        * @returns {boolean} 操作是否成功
        * @name SetJumpPrintPositionTo 
        */
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
        * @name SetOptionValue 
        */
        rootElement.SetOptionValue = function (name, Value) {
            return rootElement.__DCWriterReference.invokeMethod("SetOptionValue", name, Value);
        };
        /**
        * 设置单元格文本值
        * @param {string} tableID 表格编号
        * @param {number} rowIndex 从0开始计算的行号
        * @param {number} colIndex 从0开始计算的列号
        * @param {string} newText 新文本值
        * @returns {boolean} 操作是否成功
        * @name SetTableCellText 
        */
        rootElement.SetTableCellText = function (tableID, rowIndex, colIndex, newText) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellText", tableID, rowIndex, colIndex, newText);
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
        * @name ShowAboutDialog 
        */
        rootElement.ShowAboutDialog = function () {
            rootElement.__DCWriterReference.invokeMethod("ShowAboutDialog");
        };
        /**
        * 对当前选中的签名图片元素进行签名操作
        * @param {DCSoft.Writer.Security.DCSignInputInfo} input 签名操作输入参数
        * @returns {boolean} 操作是否成功
        * @name SignBySignImage 
        */
        rootElement.SignBySignImage = function (input) {
            return rootElement.__DCWriterReference.invokeMethod("SignBySignImage", input);
        };
        /**
        * 对指定的文档元素内容进行签名
        * @param {DCSoft.Writer.Dom.XTextElement} rootElement 容器元素，必须为XTextContainerElement类型
        * @param {DCSoft.Writer.Security.DCSignInputInfo} input 输入的参数
        * @returns {boolean} 操作是否成功
        * @name SignElement 
        */
        rootElement.SignElement = function (rootElement, input) {
            return rootElement.__DCWriterReference.invokeMethod("SignElement", rootElement, input);
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
        * @name UIStartEditContent 
        */
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
        * @name UIStartEditContentSpecifyElement 
        */
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
        * @name UpdateDataSourceForView 
        */
        rootElement.UpdateDataSourceForView = function () {
            return rootElement.__DCWriterReference.invokeMethod("UpdateDataSourceForView");
        };
        /**
        * 更新文档页状态
        * @name UpdatePages 
        */
        rootElement.UpdatePages = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdatePages");
        };
        /**
        * 根据当前元素更新光标
        * @name UpdateTextCaret 
        */
        rootElement.UpdateTextCaret = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdateTextCaret");
        };
        /**
        * 根据指定的文档元素对象更新光标
        * @param {DCSoft.Writer.Dom.XTextElement} element 指定的文档元素对象
        * @name UpdateTextCaretByElement 
        */
        rootElement.UpdateTextCaretByElement = function (element) {
            rootElement.__DCWriterReference.invokeMethod("UpdateTextCaretByElement", element);
        };
        /**
        * 根据当前元素更新光标，而且不会造成用户视图区域的滚动
        * @name UpdateTextCaretWithoutScroll 
        */
        rootElement.UpdateTextCaretWithoutScroll = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdateTextCaretWithoutScroll");
        };
        /**
        * 更新用户历史记录的时间
        * @name UpdateUserInfoSaveTime 
        */
        rootElement.UpdateUserInfoSaveTime = function () {
            rootElement.__DCWriterReference.invokeMethod("UpdateUserInfoSaveTime");
        };
        /**
        * 更新用户历史记录的时间
        * @param {boolean} addNewHistoryInfo 是否追加新的操作记录
        * @name UpdateUserInfoSaveTimeExt 
        */
        rootElement.UpdateUserInfoSaveTimeExt = function (addNewHistoryInfo) {
            rootElement.__DCWriterReference.invokeMethod("UpdateUserInfoSaveTimeExt", addNewHistoryInfo);
        };
        /**
        * 请改用WriteDataFromDataSourceToDocument().
        * @name UpdateViewForDataSource 
        */
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
        * @name UserLogin 
        */
        rootElement.UserLogin = function (userID, userName, permissionLevel) {
            return rootElement.__DCWriterReference.invokeMethod("UserLogin", userID, userName, permissionLevel);
        };
        /**
        * 根据参数进行用户登录
        * @param {string} userID 用户编号
        * @param {string} userName 用户名 
        * @param {string} permissionLevel 用户等级 
        * @returns {boolean} 操作是否成功
        * @name UserLoginByParameter 
        */
        rootElement.UserLoginByParameter = function (userID, userName, permissionLevel) {
            return rootElement.__DCWriterReference.invokeMethod("UserLoginByParameter", userID, userName, permissionLevel);
        };
        /**
        * 根据用户登录信息执行用户登录操作
        * @param {DCSoft.Writer.Security.UserLoginInfo} loginInfo 登录信息 
        * @param {boolean} updateUI 是否更新用户界面
        * @returns {boolean} 操作是否成功
        * @name UserLoginByUserLoginInfo 
        */
        rootElement.UserLoginByUserLoginInfo = function (loginInfo, updateUI) {
            return rootElement.__DCWriterReference.invokeMethod("UserLoginByUserLoginInfo", loginInfo, updateUI);
        };
        /**
        * 视图坐标转换为控件客户区中的坐标
        * @param {number} x X值
         * @param {number} y Y值 
        * @returns {System.Drawing.Point} 新坐标
        * @name ViewPointToClient 
        */
        rootElement.ViewPointToClient = function (x, y) {
            return rootElement.__DCWriterReference.invokeMethod("ViewPointToClient", x, y);
        };
        /**
        * 将数据源中的数据写入到文档中
        * @returns {number} 更新的数据点个数
        * @name WriteDataFromDataSourceToDocument 
        */
        rootElement.WriteDataFromDataSourceToDocument = function () {
            return rootElement.__DCWriterReference.invokeMethod("WriteDataFromDataSourceToDocument");
        };
        /**
        * 将指定名称的文档参数值填充到文档中
        * @param {string} parameterNames 指定的文档参数名称，各个名称之间用英文逗号分开。比如“姓名, 性别, 国籍”，如果为空则更新全部数据源。
        * @returns {number} 更新的数据点个数
        * @name WriteDataFromDataSourceToDocumentSpecifyParameterNames 
        */
        rootElement.WriteDataFromDataSourceToDocumentSpecifyParameterNames = function (parameterNames) {
            return rootElement.__DCWriterReference.invokeMethod("WriteDataFromDataSourceToDocumentSpecifyParameterNames", parameterNames);
        };
        /**
        * 将文档中的数据写入到数据源中
        * @returns {number} 更新的数据点个数
        * @name WriteDataFromDocumentToDataSource 
        */
        rootElement.WriteDataFromDocumentToDataSource = function () {
            return rootElement.__DCWriterReference.invokeMethod("WriteDataFromDocumentToDataSource");
        };



        //以下为对接的添加

        /**
         * 获取文档的页面设置信息
         * @param {gridLineInfo} 获取文档的页面设置信息
         * @name GetDocumentPageSettings 
         */
        rootElement.GetDocumentPageSettings = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentPageSettings");
        };
        /**
         * 设置页面设置
         * @param {gridLineInfo} 设置页面设置
         * @name ChangeDocumentSettings 
         */
        rootElement.ChangeDocumentSettings = function (settingsInfo) {
            rootElement.__DCWriterReference.invokeMethod("ChangeDocumentSettings", settingsInfo);
        };
        /**
         * 打开页面设置弹框
         * @param {options} 页面设置参数
         * @returns
         * @name DocumentSettingsDialog
         */
        rootElement.DocumentSettingsDialog = function (options, callBack = null) {
            WriterControl_Dialog.DocumentSettingsDialog(options, rootElement, callBack);
        }
        /**
         * 设置文档装订线
         * @param {gridLineInfo} 文档装订线参数
         * @name SetDocumentGutter 
         */
        rootElement.SetDocumentGutter = function (gutterInfo) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentGutter", gutterInfo);
        };
        /**
        * 获取文档装订线
        * @param {object} 文档装订线
        * @name GetDocumentGutter 
        */
        rootElement.GetDocumentGutter = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentGutter");
        };
        /**
         * 打开文档装订线弹窗
         * @param {options} 文档装订线参数
         * @returns
         * @name DocumentGutterDialog
         */
        rootElement.DocumentGutterDialog = function (options) {
            WriterControl_Dialog.DocumentGutterDialog(options, rootElement);
        }
        /**
         * 设置文档网格线
         * @param {gridLineInfo} 文档网格线参数
         * @name SetDocumentGridLine 
         */
        rootElement.SetDocumentGridLine = function (gridLineInfo) {
            rootElement.__DCWriterReference.invokeMethod("SetDocumentGridLine", gridLineInfo);
        };
        /**
        * 获取文档网格线
        * @param {object} 文档网格线
        * @name GetDocumentGridLine 
        */
        rootElement.GetDocumentGridLine = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentGridLine");
        };
        /**
         * 打开文档网格线弹窗
         * @param {options} 文档网格线参数
         * @returns
         * @name DocumentGridLineDialog
         */
        rootElement.DocumentGridLineDialog = function (options) {
            WriterControl_Dialog.DocumentGridLineDialog(options, rootElement);
        }

        /**
        * 设置文档水印
        * @param {gridLineInfo} 文档水印
        * @name SetDocumentWatermark 
        */
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
        * @name GetDocumentWatermark 
        */
        rootElement.GetDocumentWatermark = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentWatermark");
        };
        /**
         * 打开水印弹框
         * @param {options} 水印参数
         * @returns
         * @name WatermarkDialog
         */
        rootElement.WatermarkDialog = function (options) {
            WriterControl_Dialog.WatermarkDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 单复选框参数
         * @returns
         * @name CheckboxAndRadioDialog
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
         * @name InputFieldDialog
         */
        rootElement.InputFieldDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextInputFieldElement');
            WriterControl_Dialog.InputFieldDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 按钮属性对话框
         * @returns
         * @name ButtonDialog
         */
        rootElement.ButtonDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.ButtonDialog(options, rootElement);
        }
        /**
         * 
         * @param {options} 分割线属性对话框
         * @returns
         * @name HorizontalLineDialog
         */
        rootElement.HorizontalLineDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.HorizontalLineDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 页码属性对话框
         * @returns
         * @name PageNumberDialog
         */
        rootElement.PageNumberDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.PageNumberDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 文本标签属性对话框
         * @returns
         * @name LabelDialog
         */
        rootElement.LabelDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.LabelDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 二维码属性对话框
         * @returns
         * @name QRCodeDialog
         */
        rootElement.QRCodeDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.QRCodeDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 条形码属性对话框
         * @returns
         * @name BarCodeDialog
         */
        rootElement.BarCodeDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.BarCodeDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 字体选择对话框
         * @returns
         * @name FontSelectionDialog
         */
        rootElement.FontSelectionDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FontSelectionDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 胎心值对话框
         * @returns
         * @name FetalHeartDialog
         */
        rootElement.FetalHeartDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FetalHeartDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 输入1-10之间的数值对话框
         * @returns
         * @name PainIndexDialog
         */
        rootElement.PainIndexDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.PainIndexDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 分数值对话框
         * @returns
         * @name FractionDialog
         */
        rootElement.FractionDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FractionDialog(options, rootElement);
        }

        /**
       * 
       * @param {options} 月经史值对话框
       * @returns
       * @name FourValuesDialog
       */
        rootElement.FourValuesDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FourValuesDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 月经史值1对话框
         * @returns
         * @name FourValues1Dialog
         */
        rootElement.FourValues1Dialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FourValues1Dialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 月经史值对话框
         * @returns
         * @name FourValues2Dialog
         */
        rootElement.FourValues2Dialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.FourValues2Dialog(options, rootElement);
        }
        /**
         * 
         * @param {options} 月经史值对话框
         * @returns
         * @name ThreeValuesDialog
         */
        rootElement.ThreeValuesDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.ThreeValuesDialog(options, rootElement);
        }

        /**
        * 
        * @param {options} 光定位值对话框
        * @returns
        * @name LightPositioningDialog
        */
        rootElement.LightPositioningDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.LightPositioningDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 瞳孔图值对话框
         * @returns
         * @name PupilDialog
         */
        rootElement.PupilDialog = function (options) {
            //var options = rootElement.CurrentElement('XTextButtonElement');
            WriterControl_Dialog.PupilDialog(options, rootElement);
        }

        /**
        * 表格边框
        * @param {options} 
        * @returns
        * @name bordersShadingDialog
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
        * @name borderShadingcellDialog
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
         * @name insertTableDialog
         */
        rootElement.insertTableDialog = function (options) {
            WriterControl_Dialog.insertTableDialog(options, rootElement);
        }

        /**
         * 拆分单元格
         * @param {options} 
         * @returns
         * @name splitCellDialog
         */
        rootElement.splitCellDialog = function (options) {
            WriterControl_Dialog.splitCellDialog(options, rootElement);
        }

        /**
         * 编辑文档批注
         * @param {options} 
         * @returns
         * @name EditDocumentCommentsDialog
         */
        rootElement.EditDocumentCommentsDialog = function (options) {
            WriterControl_Dialog.EditDocumentCommentsDialog(options, rootElement);
        }

        /**
        * 表单模式
        * @param {options} 
        * @returns
        * @name formModeDialog
        */
        rootElement.formModeDialog = function (options) {
            WriterControl_Dialog.formModeDialog(options, rootElement);
        }

        /**
       * 内容保护模式
       * @param {options} 
       * @returns
       * @name contentProtectedModeDialog
       */
        rootElement.contentProtectedModeDialog = function (options) {
            WriterControl_Dialog.contentProtectedModeDialog(options, rootElement);
        }

        /**
         * 段落
         * @param {options} 
         * @returns
         * @name paragraphDialog
         */
        rootElement.paragraphDialog = function (options) {
            WriterControl_Dialog.paragraphDialog(options, rootElement);
        }

        /**
         * 表格
         * @param {options} 
         * @returns
         * @name tableDialog
         */
        rootElement.tableDialog = function (options) {
            WriterControl_Dialog.tableDialog(options, rootElement);
        }
        /**
         * 单元格
         * @param {options} 
         * @returns
         * @name tableCellDialog
         */
        rootElement.tableCellDialog = function (options) {
            WriterControl_Dialog.tableCellDialog(options, rootElement);
        }
        /**
         * 单元行
         * @param {options} 
         * @returns
         * @name tableRowDialog
         */
        rootElement.tableRowDialog = function (options) {
            WriterControl_Dialog.tableRowDialog(options, rootElement);
        }
        /**
        * 单元格网格线
        * @param {options} 
        * @returns
        * @name cellGridlineDialog
        */
        rootElement.cellGridlineDialog = function (options) {
            WriterControl_Dialog.cellGridlineDialog(options, rootElement);
        }
        /**
         * 单元格斜分线
         * @param {options} 
         * @returns
         * @name cellDiagonalLineDialog
         */
        rootElement.cellDiagonalLineDialog = function (options) {
            WriterControl_Dialog.cellDiagonalLineDialog(options, rootElement);
        }
        /**
         * 编辑图片
         * @param {options} 
         * @returns
         * @name imgEditDialog
         */
        rootElement.imgEditDialog = function (options) {
            WriterControl_Dialog.imgEditDialog(options, rootElement);
        }


        /**
         * 用户登录
         * @param {options} 
         * @returns
         * @name loginDialog
         */
        rootElement.loginDialog = function (options) {
            WriterControl_Dialog.loginDialog(options, rootElement);
        }

        /**
         * 
         * @param {options} 图片属性对话框
         * @returns
         * @name ImageDialog
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
        * @name InsertSubDocuments 
        */
        rootElement.InsertSubDocuments = function (subDocumentOption, afterElement) {
            var result = false;
            var needRefresh = false;
            if (typeof (afterElement) === "object" && typeof (afterElement.serializeAsArg) === "function") {
                needRefresh = true;
                result = rootElement.__DCWriterReference.invokeMethod("InsertSubDocuments", subDocumentOption, afterElement);
            } else {
                result = rootElement.__DCWriterReference.invokeMethod("InsertSubDocuments", subDocumentOption, null);
            }

            if (result == true && rootElement) {
                if (needRefresh === true) {
                    var i = setTimeout(function () {
                        clearTimeout(i);
                        rootElement.RefreshDocument();
                    }, 300);
                }
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
        * @name AppendSubDocuments 
        */
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
        * @name CurrentSubDoc 
        */
        rootElement.CurrentSubDoc = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentSubDoc");
        };
        /**
         * 删除指定编号的病程
         * @param {id} 病程编号
         * @returns {boolean} 结果
         * @name DeleteSubDoc 
         */
        rootElement.DeleteSubDoc = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("DeleteSubDoc", id);
        };
        /**
         * 删除当前病程
         * @returns {boolean} 结果
         * @name DeleteCurrentSubDoc 
         */
        rootElement.DeleteCurrentSubDoc = function () {
            return rootElement.__DCWriterReference.invokeMethod("DeleteCurrentSubDoc");
        };
        /**
         * 设置当前病程是否只读
         * @param {isReadOnly} 是否只读
         * @param {backgroundColorValue} 背景色
         * @returns {boolean} 结果
         * @name SetCurrentSubDocumentReadOnly 
         */
        rootElement.SetCurrentSubDocumentReadOnly = function (isReadOnly, backgroundColorValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetCurrentSubDocumentReadOnly", isReadOnly, backgroundColorValue);
        };
        /**
         * 设置指定病程是否只读
         * @param {subID} 编号
         * @param {isReadOnly} 是否只读
         * @param {backgroundColorValue} 背景色
         * @returns {boolean} 结果
         * @name SetSubDocumentReadOnly 
         */
        rootElement.SetSubDocumentReadOnly = function (subID, isReadOnly, backgroundColorValue) {
            return rootElement.__DCWriterReference.invokeMethod("SetSubDocumentReadOnly", subID, isReadOnly, backgroundColorValue);
        };
        /**
         * 追加单个病程
         * @param {options} 参数
         * @returns {boolean} 结果
         * @name LoadSubDocumentFromString 
         */
        rootElement.LoadSubDocumentFromString = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("LoadSubDocumentFromString", options);
        };
        /**
         * 获取病程文档BASE64字符串
         * @param {fileFormat} 格式
         * @param {id} 病程编号
         * @returns {string} 病程内容
         * @name SaveSubDocumentToBase64String 
         */
        rootElement.SaveSubDocumentToBase64String = function (fileFormat, id) {
            return rootElement.__DCWriterReference.invokeMethod("SaveSubDocumentToBase64String", fileFormat, id);
        };

        /**
         * 获取病程文档BASE64字符串
         * @param {options} 参数
         * @returns {string} 病程内容
         * @name SaveSubDocumentToString 
         */
        rootElement.SaveSubDocumentToString = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("SaveSubDocumentToString", options);
        };
        /**
         * 获取文档中的全部病程ID
         * @returns {Array} 病程ID
         * @name GetAllSubDocumentIDs 
         */
        rootElement.GetAllSubDocumentIDs = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetAllSubDocumentIDs");
        };
        /**
         * 根据编号定位病程
         * @returns {boolean} 
         * @name SelectSubDocumentByID 
         */
        rootElement.SelectSubDocumentByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("SelectSubDocumentByID", id);
        };
        /**
         * 根据文档中的序号定位病程
         * @returns {boolean} 
         * @name SelectSubDocument 
         */
        rootElement.SelectSubDocument = function (index) {
            return rootElement.__DCWriterReference.invokeMethod("SelectSubDocument", index);
        };
        /**
         * 设置当前病程只读和颜色
         * @returns {boolean} 
         * @name SetSubDocumentState 
         */
        rootElement.SetSubDocumentState = function (editable, strStyle) {
            return rootElement.__DCWriterReference.invokeMethod("SetSubDocumentState", editable, strStyle);
        };
        /**
        * 设置病程是否跨页
        * @returns {boolean} 
        * @name SubDocCrossPage 
        */
        rootElement.SubDocCrossPage = function (parsubdoc, isCrossams) {
            return rootElement.__DCWriterReference.invokeMethod("SubDocCrossPage", parsubdoc, isCrossams);
        };
        /**
        * 设置文档的违禁关键词
        * @name SetExcludeKeywords 
        */
        rootElement.SetExcludeKeywords = function (keys) {
            rootElement.__DCWriterReference.invokeMethod("SetExcludeKeywords", keys);
        };
        /**
        * 获取文档的违禁关键词
        * @returns {string} 
        * @name GetExcludeKeywords 
        */
        rootElement.GetExcludeKeywords = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetExcludeKeywords");
        };
        /**
        * 获取选择的html
        * @returns {string} 
        * @name SelectionHtml 
        */
        rootElement.SelectionHtml = function (nativeHtml) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionHtml", nativeHtml);
        };
        /**
        * 获取选择的文本
        * @returns {string} 
        * @name SelectionText 
        */
        rootElement.SelectionText = function (clearBorder) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionText", clearBorder);
        };
        /**
        * 获取选择的XML
        * @returns {string} 
        * @name SelectionXml 
        */
        rootElement.SelectionXml = function (containHeaderFooter) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionXml", containHeaderFooter);
        };
        /**
        * 获取选择的json
        * @returns {string} 
        * @name SelectionJson 
        */
        rootElement.SelectionJson = function (containHeaderFooter) {
            return rootElement.__DCWriterReference.invokeMethod("SelectionJson", containHeaderFooter);
        };
        /**
        * 在当前位置插入json内容
        * @returns {int} 
        * @name InsertJson 
        */
        rootElement.InsertJson = function (content) {
            return rootElement.__DCWriterReference.invokeMethod("InsertJson", content);
        };
        /**
        * 在指定的输入域内插入指定格式文档
        * @returns {boolean} 
        * @name InsertContentByInputID 
        */
        rootElement.InsertContentByInputID = function (content, format, elementID, clearold) {
            return rootElement.__DCWriterReference.invokeMethod("InsertContentByInputID", content, format, elementID, clearold);
        };
        /**
       * 在指定的单元格内插入指定格式文档
       * @returns {boolean} 
       * @name InsertContentByTableCellD 
       */
        rootElement.InsertContentByTableCellD = function (content, format, tableID, rowIndex, colIndex, clearold) {
            return rootElement.__DCWriterReference.invokeMethod("InsertContentByTableCellD", content, format, tableID, rowIndex, colIndex, clearold);
        };

        /** wyc20230509和四代接口保持兼容
         * 执行编辑器命令对话框
         * @param {object} Parameter 参数
         * @returns {?} 执行结果
         * @name DCExecuteCommandDialog
         */
        rootElement.DCExecuteCommandDialog = function () {
            return WriterControl_Dialog.DCExecuteCommandDialog(rootElement);
        }
        /** 设置全文行间距(不生效)
        * @name AllLineHeight
        * @param {number} value 行间距
        */
        rootElement.AllLineHeight = function (value) {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'alllineheight', false, value);
        }


        /** 清除所有痕迹
         * @name ComplexViewMode
         */
        rootElement.ComplexViewMode = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'ComplexViewMode', false, null);
        }

        /** 清除所有痕迹：清除痕迹时会将被标记为逻辑删除的内容给去掉逻辑删除的标记，可以显示出来。请在管理员模式下使用。
         * @name ClearAllUserTrace
         */
        rootElement.ClearAllUserTrace = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'ClearAllUserTrace', false, null);
        }

        /** 清除当前用户痕迹
        * @name ClearUserTrace
        */
        rootElement.ClearUserTrace = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'ClearUserTrace', false, null);
        }

        /** 提交用户痕迹:删除所有被逻辑删除的元素。请在管理员模式下使用。
        * @name CommitUserTrace
        */
        rootElement.CommitUserTrace = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'CommitUserTrace', false, null);
        }

        /** 清洁模式
        * @name CleanViewMode
        */
        rootElement.CleanViewMode = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'CleanViewMode', false, null);
        }
        /** 删除表格
        * @name TableDeleteTable
        */
        rootElement.TableDeleteTable = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_DeleteTable', false, null);
        }
        /** 删除行
       * @name TableDeleteRow
       */
        rootElement.TableDeleteRow = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_DeleteRow', false, null);
        }
        /** 删除列
      * @name TableDeleteColumn
      */
        rootElement.TableDeleteColumn = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_DeleteColumn', false, null);
        }

        /** 在上面插入行
         * @name TableInsertRowUp
         */
        rootElement.TableInsertRowUp = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_InsertRowUp', false, null);
        }
        /** 在下面插入行
         * @name TableInsertRowDown
         */
        rootElement.TableInsertRowDown = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_InsertRowDown', false, null);
        }
        /** 在左面插入列
        * @name TableInsertColumnLeft
        */
        rootElement.TableInsertColumnLeft = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_InsertColumnLeft', false, null);
        }
        /** 在右面插入列
        * @name TableInsertColumnRight
        */
        rootElement.TableInsertColumnRight = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_InsertColumnRight', false, null);
        }

        /** 合并单元格
        * @name TableMergeCell
        */
        rootElement.TableMergeCell = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'Table_MergeCell', false, null);
        }

        /** 背景编号
         * @name ShowBackgroundCellID
         */
        rootElement.ShowBackgroundCellID = function () {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", 'ShowBackgroundCellID', false, null);
        }
        /** 表格对齐方式
        * @name TableCellAlign
        * @param {string} Parameter 对齐的方式
        * 枚举：
        * AlignTopLeft：顶端左对齐
        * AlignTopRight：顶端右对齐
        * AlignTopCenter：顶端中间对齐
        * AlignMiddleLeft：垂直居中水平左对齐
        * AlignMiddleRight：垂直居中水平右对齐
        * AlignMiddleCenter：垂直居中水平中间对齐
        * AlignBottomLeft：底端左对齐
        * AlignBottomRight：底端右对齐
        * AlignBottomCenter：底端中间对
       */
        rootElement.TableCellAlign = function (Parameter) {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", Parameter, false, null);
        }



        /** wyc20230509和四代接口保持兼容
         * 执行编辑器命令 
         * @param {string} strCommandName 命令名称
         * @param {boolean} bolShowUI 是否显示用户界面
         * @param {object} Parameter 参数
         * @returns {?} 执行结果
         * @name DCExecuteCommand
         */
        rootElement.DCExecuteCommand = function (strCommandName, bolShowUI, Parameter) {
            // 兼容四代接口EventBeforeExecuteCommand，获取命令的名称，可以阻止命令的执行 lxy20230714
            if (!!rootElement.EventBeforeExecuteCommand && typeof (rootElement.EventBeforeExecuteCommand) == "function") {
                let isCancel = rootElement.EventBeforeExecuteCommand.call(rootElement, strCommandName);
                if (isCancel) {
                    return
                }
            }
            strCommandName += "";
            var result = false;
            switch (strCommandName.toLocaleLowerCase()) {
                /**
                * 兼容四代的设置全文的字体
                *  @name allfontname
                *  @type {command}
                * @param {string} Parameter 字体格式
                 */
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
                    //document.execCommand('copy');
                    rootElement.Copy();
                    break;
                case "paste":
                    /*WriterControl_UI.GetClipboardData(null, rootElement);*/
                    rootElement.Paste();
                    break;
                case 'cut':
                    rootElement.Cut();
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
                case "filenew":
                    //新建的方法
                    rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", strCommandName, bolShowUI, Parameter);
                    return WriterControl_Paint.UpdateViewForWaterMark(rootElement);
                    break;
                default:
                    // 显示用户界面
                    if (bolShowUI == true) {
                        switch (strCommandName.toLocaleLowerCase()) {
                            /**
                          * 插入特殊字符
                          * @name insertspecifycharacter
                          * @type {command.elementproperties}
                          * @param {object} Parameter options
                          * @param {object} rootElement 编辑器元素
                          */
                            case "insertspecifycharacter":
                                WriterControl_Dialog.InsertSpecifyCharacterDialog(Parameter, rootElement, true);
                                break;
                            case "paragraphformat":
                                //段落对话框
                                WriterControl_Dialog.paragraphDialog(Parameter, rootElement, true);
                                break;
                            /**
                             * 表格属性
                             * @name tableproperties
                             * @type {command.elementproperties}
                             * @param {object} Parameter options
                             * @param {object} rootElement 编辑器元素
                             */
                            case "tableproperties":
                                WriterControl_Dialog.tableDialog(Parameter, rootElement, true);
                                break;
                            /**
                             * 表格行属性
                             * @name tablerowproperties
                             * @type {command.elementproperties}
                             * @param {object} Parameter options
                             * @param {object} rootElement 编辑器元素
                             */
                            case "tablerowproperties":
                                WriterControl_Dialog.tableRowDialog(Parameter, rootElement, true);
                                break;
                            case "tablecolumnproperties":
                                WriterControl_Dialog.tableColumnDialog(Parameter, rootElement, true);
                                break;
                            /**
                             * 单元格属性
                             * @name tablecellproperties
                             * @type {command.elementproperties}
                             * @param {object} Parameter options
                             * @param {object} rootElement 编辑器元素
                             */
                            case "tablecellproperties":
                                WriterControl_Dialog.tableCellDialog(Parameter, rootElement, true);
                                break;
                            /**
                             * 拆分单元格
                             * @name table_splitcellext
                             * @type {command.elementproperties}
                             * @param {object} Parameter options
                             * @param {object} rootElement 编辑器元素
                             */
                            case "table_splitcellext":
                                WriterControl_Dialog.splitCellDialog(Parameter, rootElement, true);
                                break;
                            /**
                             * 插入批注
                             * @name insertcomment
                             * @type {command.elementproperties}
                             * @param {object} Parameter options
                             * @param {object} rootElement 编辑器元素
                             */
                            case "insertcomment":
                                WriterControl_Dialog.EditDocumentCommentsDialog(Parameter, rootElement, true);
                                break;
                            case "font":
                                //字体
                                WriterControl_Dialog.FontSelectionDialog(Parameter, rootElement, false);
                                break;
                            /**
                             * 插入表格
                             * @name inserttable
                             * @type {command.elementproperties}
                             * @param {object} Parameter options
                             * @param {object} rootElement 编辑器元素
                             */
                            case "inserttable":
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
                            /**
                           * 单复选框
                           * @name insertcheckboxorradio
                           * @type {command.elementproperties}
                           * @param {object} Parameter options
                           * @param {object} rootElement 编辑器元素
                           */
                            case "insertcheckboxorradio":
                                WriterControl_Dialog.InsertMultipleCheckBoxOrRadioDialog(Parameter, rootElement);
                                break;
                            /**
                          * 标签文本
                          * @name insertlabelelement
                          * @type {command.elementproperties}
                          * @param {object} Parameter options
                          * @param {object} rootElement 编辑器元素
                          */
                            case "insertlabelelement":
                                WriterControl_Dialog.LabelDialog(Parameter, rootElement, true);
                                break;
                            /**
                         * 水平线
                         * @name inserthorizontalline
                         * @type {command.elementproperties}
                         * @param {object} Parameter options
                         * @param {object} rootElement 编辑器元素
                         */
                            case "inserthorizontalline":
                                // 水平线
                                WriterControl_Dialog.HorizontalLineDialog(Parameter, rootElement, true);
                                break;
                            /**
                            * 页码
                            * @name insertpageinfoelement
                            * @type {command.elementproperties}
                            * @param {object} Parameter options
                            * @param {object} rootElement 编辑器元素
                            * @param {boolean} true 是否是插入模式
                            */
                            case "insertpageinfoelement":
                                WriterControl_Dialog.PageNumberDialog(Parameter, rootElement, true);
                                break;
                            /**
                           * 按钮
                           * @name insertbutton
                           * @type {command.elementproperties}
                           * @param {object} Parameter options
                           * @param {object} rootElement 编辑器元素
                           * @param {boolean} true 是否是插入模式
                           */
                            case "insertbutton":
                                // 按钮
                                WriterControl_Dialog.ButtonDialog(Parameter, rootElement, true);
                                break;
                            /**
                            * 二维码
                            * @name inserttdbarcodeelement
                            * @type {command.elementproperties}
                            * @param {object} Parameter options
                            * @param {object} rootElement 编辑器元素
                            * @param {boolean} true 是否是插入模式
                            */
                            case "inserttdbarcodeelement":
                                WriterControl_Dialog.QRCodeDialog(Parameter, rootElement, true);
                                break;
                            /**
                            * 条形码
                            * @name insertbarcodeelement
                            * @type {command.elementproperties}
                            * @param {object} Parameter options
                            * @param {object} rootElement 编辑器元素
                            * @param {boolean} true 是否是插入模式
                            */
                            case "insertbarcodeelement":
                                WriterControl_Dialog.BarCodeDialog(Parameter, rootElement, true);
                                break;
                            /**
                           * 插入图片
                           * @name insertimage
                           * @type {command.elementproperties}
                           * @param {object} Parameter options
                           * @param {object} rootElement 编辑器元素
                           * @param {boolean} true 是否是插入模式
                           */
                            case "insertimage":
                            /**
                           * 插入图片
                           * @name dcinsertimage
                           * @type {command.elementproperties}
                           * @param {object} Parameter options
                           * @param {object} rootElement 编辑器元素
                           * @param {boolean} true 是否是插入模式
                           */
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
                                    /**
                                     * 输入域属性对话框
                                     * @name xtextinputfieldelement
                                     * @type {command.elementproperties}
                                     * @param {object} element 输入域属性
                                     * @param {object} rootElement 编辑器元素
                                     * @param {boolean} false 是否是插入模式
                                     * @param {object} ele ele
                                     */
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
                                    /**
                                     * 医学表达式
                                     * @name xtextnewmedicalexpressionelement
                                     * @type {command.elementproperties}
                                     * @param {object} element 输入域属性
                                     * @param {object} rootElement 编辑器元素
                                     * @param {boolean} false 是否是插入模式
                                     * @param {object} ele ele
                                     */
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
         * @name GetElementProperties
         */
        rootElement.GetElementProperties = function (element) {
            if (element === null) {
                console.log("GetElementProperties:element为空");
                //debugger;
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
         * @name SetElementProperties
         */
        rootElement.SetElementProperties = function (element, options) {
            if (element != null && typeof (element) === "object" && typeof (element.serializeAsArg) === "function") {
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
         * @name InsertImageByJSONText
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
        * @name NewComment
        */
        rootElement.NewComment = function (commentInfo) {
            return rootElement.__DCWriterReference.invokeMethod("NewComment", commentInfo);
        };
        /** 
        * 兼容四代获取批注列表 
        * @returns {Array} 批注列表信息
        * @name getCommentList
        */
        rootElement.getCommentList = function () {
            return rootElement.__DCWriterReference.invokeMethod("getCommentList");
        };
        /** 
        * 兼容四代修改指定批注内容
        * @param {int} index 批注序号
        * @param {string} newContent 批注文本
        * @returns {boolean} 执行结果
        * @name setCommentContent
        */
        rootElement.setCommentContent = function (index, newContent) {
            return rootElement.__DCWriterReference.invokeMethod("setCommentContent", index, newContent);
        };
        /** 
        * 兼容四代删除指定批注内容
        * @param {int} index 批注序号
        * @returns {boolean} 执行结果
        * @name DeleteComment
        */
        rootElement.DeleteComment = function (index) {
            return rootElement.__DCWriterReference.invokeMethod("DeleteComment", index);
        };

        /** 
        * 获取当前批注
        * @returns {boolean} 执行结果
        * @name GetCurrentComment
        */
        rootElement.GetCurrentComment = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentComment");
        };
        /** 
        * 设置当前批注
        * @param {object} index 批注序号
        * @returns {boolean} 执行结果
        * @name SetCurrentComment
        */
        rootElement.SetCurrentComment = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetCurrentComment", parameter);
        };

        /**
        * 兼容四代获取当前单元格
        * @name CurrentTableCell
        */
        rootElement.CurrentTableCell = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentTableCell");
        };
        /** 
        * 兼容四代获取单元格的网格线设置
        * @param {object} parameter 批注序号
        * @returns {object} 执行结果
        * @name GetTableCellGridLineInfo
        */
        rootElement.GetTableCellGridLineInfo = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableCellGridLineInfo", parameter);
        };
        /** 
        * 兼容四代设置单元格网格线
        * @param {int} index 单元格对象
        * @param {int} index 网格线设置
        * @returns {boolean} 执行结果
        * @name SetTableCellGridLineInfo
        */
        rootElement.SetTableCellGridLineInfo = function (cell, settings) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellGridLineInfo", cell, settings);
        };
        /** 
        * 兼容四代设置表格的边框
        * @param {int} index 表格ID/表格属性列表/表格后台引用对象
        * @param {object} settings 网格线设置
        * @returns {boolean} 执行结果
        * @name SetTableBorder
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
       * @name SetTableCellBorder
       */
        rootElement.SetTableCellBorder = function (cell, settings) {
            //wyc20230710采用新写法
            var opt = {
                Style: settings
            };
            rootElement.SetElementProperties(cell, opt);
            //return rootElement.__DCWriterReference.invokeMethod("SetTableCellBorder", cell, settings);
        };
        /** 
        * 兼容四代格式刷
        * @name BeginFormatBrush
        */
        rootElement.BeginFormatBrush = function () {
            rootElement.__DCWriterReference.invokeMethod("BeginFormatBrush");
        };
        /** 
       * 兼容四代撤销
       * @name Undo
       */
        rootElement.Undo = function () {
            rootElement.__DCWriterReference.invokeMethod("Undo");
        };
        /**
        * 段落格式接口
        * @name ParagraphFormat
        */
        rootElement.ParagraphFormat = function (paragraphFormatParameter) {
            rootElement.__DCWriterReference.invokeMethod("ParagraphFormat", paragraphFormatParameter);
        };
        /**
        * 兼容四代关于接口
        * @name AboutDialog 
        * @example AboutDialog()
        */
        rootElement.AboutDialog = function () {
            rootElement.__DCWriterReference.invokeMethod("ShowAboutDialog");
        };
        /**
       * 兼容四代关于接口
       * @name AboutControl 
       * @example AboutControl()
       */
        rootElement.AboutControl = function () {
            rootElement.__DCWriterReference.invokeMethod("ShowAboutDialog");
        };
        /**
         * 兼容第四代接口正文追加内容
         * @param {string} xmlContent xml内容
         * @name AppendBody
         */
        rootElement.AppendBody = function (xmlContent) {
            rootElement.__DCWriterReference.invokeMethod("AppendBody", xmlContent);
        };
        /**
         * 兼容第四代接口清空所有输入域
         * @name ClearAllFields
         */
        rootElement.ClearAllFields = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearAllFields");
        };
        /**
         * 兼容第四代接口清空所有绑定数据源的输入域的值和文本、单选框的选择状态、复选框的选择状态
         * @name ClearAllParameterValue
         */
        rootElement.ClearAllParameterValue = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearAllParameterValue");
        };
        /**
         * 兼容第四代接口清空正文内容
         * @name ClearDocumentBody
         */
        rootElement.ClearDocumentBody = function () {
            rootElement.__DCWriterReference.invokeMethod("ClearDocumentBody");
        };
        /**
         * 兼容第四代接口提交用户痕迹信息
         * @name CommitDocumentUserTrace
         */
        rootElement.CommitDocumentUserTrace = function () {
            rootElement.__DCWriterReference.invokeMethod("CommitDocumentUserTrace");
        };
        /**
         * 获取当前单选框或复选框
         *@returns {object} 执行结果 
         * @name CurrentCheckboxOrRadio
         */
        rootElement.CurrentCheckboxOrRadio = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentCheckboxOrRadio");
        };
        /**
         * 获取当前输入域
         *@returns {object} 执行结果 
         * @name CurrentInputField
         */
        rootElement.CurrentInputField = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentInputField");
        };
        /**
         * 获取当前表格
         *@returns {object} 执行结果 
         * @name CurrentTable
         */
        rootElement.CurrentTable = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentTable");
        };
        /**
         * 获取当前表格行
         *@returns {object} 执行结果 
         * @name CurrentTableRow
         */
        rootElement.CurrentTableRow = function () {
            return rootElement.__DCWriterReference.invokeMethod("CurrentTableRow");
        };
        /**
         * 获取当前选择内容
         *@returns {string} 执行结果 
         * @name DocumentSelection
         */
        rootElement.DocumentSelection = function (format) {
            return rootElement.__DCWriterReference.invokeMethod("DocumentSelection", format);
        };
        /**
         * 移动输入焦点到指定地点
         *@returns {bool} 执行结果 
         * @name FocusAdjacent
         */
        rootElement.FocusAdjacent = function (sWhere, element) {
            //wyc20230710:改成兼容.NET后台引用对象
            if (typeof (element) === "object" && typeof (element.serializeAsArg) === "function") {
                return rootElement.__DCWriterReference.invokeMethod("FocusAdjacent2", sWhere, element);
            } else {
                return rootElement.__DCWriterReference.invokeMethod("FocusAdjacent", sWhere, element);
            }

        };
        /**
         * 此方法用于处理canvas上的resizeObserver监听,并处理EventPageResize事件
         * @param {object} 修改的元素
         * @returns
         * @name CollectrResizeCanvas
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
         * @name DCPaste
         */
        rootElement.DCPaste = function () {
            return rootElement.__DCWriterReference.invokeMethod("DCPaste");
        };
        /**
         * 获取指定编号的元素的文本
         *@returns {object} 元素ID或元素的后台.NET引用对象 
         * @name GetElementTextByID
         */
        rootElement.GetElementTextByID = function (id) {
            //wyc20230726:新增直接传元素后台引用 对象
            if (typeof (id) === "string") {
                return rootElement.__DCWriterReference.invokeMethod("GetElementTextByID", id);
            } else if (DCTools20221228.IsDotnetReferenceElement(id) === true) {
                return rootElement.__DCWriterReference.invokeMethod("GetElementTextByID2", id);
            }
            return null;
        };
        /**
         * 获取所有的输入域
         *@returns {object} 执行结果 
         * @name GetAllInputFields
         */
        rootElement.GetAllInputFields = function (excludeReadonly, excludeHiddenElement, specifyRootElement, nestNode) {
            return rootElement.__DCWriterReference.invokeMethod("GetAllInputFields", excludeReadonly, excludeHiddenElement, specifyRootElement, nestNode);
        };
        /**
         * 获取当前字体
         *@returns {object} 执行结果 
         * @name getFontObject
         */
        rootElement.getFontObject = function () {
            return rootElement.__DCWriterReference.invokeMethod("getFontObject");
        };
        /**
         * 设置当前字体
         *@returns {object} 执行结果 
         * @name setFontObject
         */
        rootElement.setFontObject = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("setFontObject", parameter);
        };
        /**
         * 获取当前字体大小
         *@returns {float} 执行结果 
         * @name getFontSize
         */
        rootElement.getFontSize = function () {
            return rootElement.__DCWriterReference.invokeMethod("getFontSize");
        };
        /**
         * 获取当前文档信息
         *@returns {object} 执行结果 
         * @name GetDocumentInfos
         */
        rootElement.GetDocumentInfos = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDocumentInfos");
        };
        /**
         * 获取标签的链接信息
         *@returns {object} 执行结果 
         * @name GetLabelElementContactSettings
         */
        rootElement.GetLabelElementContactSettings = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetLabelElementContactSettings", parameter);
        };
        /**
         * 获取元素的PrintVisibility属性
         *@returns {object} 执行结果 
         * @name GetElementPrintVisibility
         */
        rootElement.GetElementPrintVisibility = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementPrintVisibility", parameter);
        };
        /**
         * 设置文档的DocumentInfo
         * @name SetDocumentInfos
         */
        rootElement.SetDocumentInfos = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetDocumentInfos", parameter);
        };
        ///**
        // * 设置标签信息
        // * @name SetLabelElementContactSettings
        // */
        //rootElement.SetLabelElementContactSettings = function (label, parameter) {
        //    rootElement.__DCWriterReference.invokeMethod("SetLabelElementContactSettings", label, parameter);
        //};
        /**
         * 获取当前元素信息
         * @name CurrentElement
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
         * @name GetDocumentUserTrackInfos
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
         * @name NavigateByUserTrackInfo
         */
        rootElement.NavigateByUserTrackInfo = function (handle) {
            return rootElement.__DCWriterReference.invokeMethod("NavigateByUserTrackInfo", handle);
        };
        /**
         * 获取表格信息
         * @name GetTableElementById
         */
        rootElement.GetTableElementById = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableElementById", id);
        };
        /**
        * 设置表格属性
        * @name SetTableElementPoperties
        */
        rootElement.SetTableElementPoperties = function (elementID, parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableElementPoperties", elementID, parameter);
        };
        /**
        * 设置表格行属性
        * @name SetTableRowElementPoperties
        */
        rootElement.SetTableRowElementPoperties = function (elementID, rowIndex, parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableRowElementPoperties", elementID, rowIndex, parameter);
        };
        /**
        * 设置表格单元格属性
        * @name SetTableCellElementPoperties
        */
        rootElement.SetTableCellElementPoperties = function (elementID, rowIndex, columnIndex, parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellElementPoperties", elementID, rowIndex, columnIndex, parameter);
        };


        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 获取文档是否被修改
         * @param {object} parameter 第五代下该参数无效
         * @returns 
         * @name getModified
         */
        rootElement.getModified = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("getModified");
        };
        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 重置文档修改状态
         * @param {object} parameter 文档的修改状态
         * @returns 返回操作是否成功
         * @name resetModified
         */
        rootElement.resetModified = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("resetModified", parameter);
        };
        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 重置文档修改状态
         * @returns 返回操作是否成功
         * @name ResetDocumentModified
         */
        rootElement.ResetDocumentModified = function () {
            return rootElement.__DCWriterReference.invokeMethod("resetModified", false);
        };
        /** //wyc20230524:增加与四代编辑器兼容的接口
         * 设置控件只读状态
         * @parameter 布尔值
         * @returns 操作是否成功
         * @name SetControlReadonly
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
         * @name InsertXmlString
         */
        rootElement.InsertXmlString = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("insertXmlString", parameter);
        };


        /** 
         * 兼容四代的接口插入XML
         * @parameter 要插入的文档内容xml字符串，五代接口只接收一个参数其它的忽略
         * @returns 操作是否成功
         * @name InsertXmlBase64String
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
         * @name InsertXmlById
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
         * @name LoadDocumentFromMixString
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
         * @name getHtmlByXMLBase64String
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
         * @name GetElementsByTypeName
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
         * @name getHtmlByFiles
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
         * @name GetPrintPreviewHTMLByMixedFiles
         */
        rootElement.GetPrintPreviewHTMLByMixedFiles = function (options) {
            ////先给默认值
            //var printOptions = {
            //    files: [],
            //    format: "xml",
            //    base64: options.UseBase64 ? options.UseBase64 : 'false',
            //    megedoc: "true",
            //    modefile: "",
            //    splitmode: "none"
            //}
            //if (options.Files && Array.isArray(options.Files)) {
            //    for (var file = 0; file < options.Files.length; file++) {
            //        //解析二维数组
            //        var innerFile = options.Files[file];
            //        if (innerFile && Array.isArray(innerFile) && innerFile.length > 0) {
            //            if (file == 0) {
            //                printOptions.modefile = innerFile[0];
            //            }
            //            for (var innerfile = 0; innerfile < innerFile.length; innerfile++) {
            //                printOptions.files.push(innerFile[innerfile]);
            //            }
            //        }
            //    }
            //}

            //wyc20230701:直接转发
            return rootElement.GetPrintPreviewHTML(options);
        }

        /**
         * 处理打印的html
         * @returns
         * @name PrintPreviewByHtml
         */
        rootElement.PrintPreviewByHtml = function (printHtml) {
            WriterControl_Print.PrintPreview(rootElement, undefined, printHtml);
        }

        /**
         * 获取当前选择的元素类型名称，为属性对话框准备接口
         * @returns 文档的元素类型名称
         * @name GetCurrentElementTypeName
         */
        rootElement.GetCurrentElementTypeName = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentElementTypeName");
        };
        /**
         * 获取文档行为选项
         * @returns 选项
         * @name GetBehaviorOptions
         */
        rootElement.GetBehaviorOptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetBehaviorOptions");
        };
        /**
         * 获取文档编辑选项
         * @returns 选项
         * @name GetEditOptions
         */
        rootElement.GetEditOptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetEditOptions");
        };
        /**
         * 获取文档安全选项
         * @returns 选项
         * @name GetSecurityOptions
         */
        rootElement.GetSecurityOptions = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetSecurityOptions");
        };
        /**
         * 获取文档视图选项
         * @returns 选项
         * @name GetViewOptions
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
         * @name Search
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
         * @name Reaplace
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
         * @name ReplaceAll
         */
        rootElement.ReplaceAll = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("ReplaceAll", options);
        };

        /**
        * 弹出查找&替换设置对话框
        * @param options 查找替换属性
        * @name SearchAndReplaceDialog
        */
        rootElement.SearchAndReplaceDialog = function (options) {
            return WriterControl_Dialog.SearchAndReplaceDialog(options, rootElement);
        }

        /** //wyc20230601:增加与四代编辑器兼容的接口
         * 应用文档选项
         * @returns 操作是否成功
         * @name ApplyDocumentOptions
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
        * @name SetFieldDropListItemByValue
        */
        rootElement.SetFieldDropListItemByValue = function (id, valuestring) {
            return rootElement.__DCWriterReference.invokeMethod("SetFieldDropListItemByValue", id, valuestring);
        }
        /**
        * 获取当前的表单模式类型
        * @param string 表单模式字符串
        * @name FormView
        */
        rootElement.FormView = function () {
            return rootElement.__DCWriterReference.invokeMethod("FormView");
        }

        /**
        * 当前内容保护状态
        * @param string 内容保护字符串
        * @name ProtectType
        */
        rootElement.ProtectType = function () {
            return rootElement.__DCWriterReference.invokeMethod("ProtectType");
        }

        /**
        * 设置指定编号的单选框或复选框是否选中
        * @param string 编号
        * @param bool 是否选中
        * @name SetElementCheckedByID
        */
        rootElement.SetElementCheckedByID = function (id, isChecked) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementCheckedByID", id, isChecked);
        }


        /**wyc20230613兼容四代接口
        * 设置指定元素的自定义属性
        * @param element 指定元素的后台引用对象，也可以是元素ID字符串，也可以元素属性对象
        * @param options 表示为键值对象形式的JSON对象
        * @name SetElementCustomAttributes
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
        * @name GetElementCustomAttributes
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
       * @name SetElementInnerValueStringByID
       */
        rootElement.SetElementInnerValueStringByID = function (id, newValue, newText) {
            return rootElement.__DCWriterReference.invokeMethod("SetElementInnerValueStringByID", id, newValue, newText);
        }
        /**
       * 兼容四代获取元素InnerValue文本
       * @param id 输入域编号
       * @name GetElementInnerValueStringByID
       */
        rootElement.GetElementInnerValueStringByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetElementInnerValueStringByID", id);
        }
        /**
       * 获取当前段落的样式信息
       * @name GetCurrentParagraphStyle
       */
        rootElement.GetCurrentParagraphStyle = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetCurrentParagraphStyle");
        }
        /**
       * 设置当前段落的样式信息
       * @param parameter 样式对象
       * @name SetCurrentParagraphStyle
       */
        rootElement.SetCurrentParagraphStyle = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("SetCurrentParagraphStyle", parameter);
        }

        /**
       * 兼容四代获取所有病程或指定编号的病程
       * @param id 病程编号，可为空
       * @name GetCourseRecords
       */
        rootElement.GetCourseRecords = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("GetCourseRecords", id);
        }


        /**
          * 兼容四代获取表格的自定义属性
          * @param table 表格对象
          * @name GetTableAttribute
          */
        rootElement.GetTableAttribute = function (table) {
            //wyc20230710:更新写法
            var obj = rootElement.GetElementProperties(table);
            if (typeof (obj) === "object") {
                return obj.Attributes;
            }
            return null;
            //return rootElement.__DCWriterReference.invokeMethod("GetElementCustomAttributes", table);
        }
        /**
          * 兼容四代设置表格的自定义属性
          * @param table 表格对象
          * @param option 自定义对象
          * @name SetTableAttribute
          */
        rootElement.SetTableAttribute = function (table, option) {
            //wyc20230710:直接转发请求
            return rootElement.SetElementCustomAttributes(table, option)
            //return rootElement.__DCWriterReference.invokeMethod("SetElementCustomAttributes", table, option);
        }
        /**
          * 兼容四代获取表格行的自定义属性
          * @param table 表格对象
          * @name GetTableRowAttribute
          */
        rootElement.GetTableRowAttribute = function (row) {
            //wyc20230710:更新写法
            var obj = rootElement.GetElementProperties(row);
            if (typeof (obj) === "object") {
                return obj.Attributes;
            }
            return null;
            //return rootElement.__DCWriterReference.invokeMethod("GetTableRowAttribute", row);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param row 表格行对象
          * @param option 自定义对象
          * @name SetTableRowAttribute
          */
        rootElement.SetTableRowAttribute = function (row, option) {
            //wyc20230710:直接转发请求
            return rootElement.SetElementCustomAttributes(row, option)
            //return rootElement.__DCWriterReference.invokeMethod("SetTableRowAttribute", row, option);
        }
        /**
          * 兼容四代获取单元格的自定义属性
          * @param table 表格对象
          * @name GetTableCellAttribute
          */
        rootElement.GetTableCellAttribute = function (cell) {
            //wyc20230710:更新写法
            var obj = rootElement.GetElementProperties(cell);
            if (typeof (obj) === "object") {
                return obj.Attributes;
            }
            return null;
            //return rootElement.__DCWriterReference.invokeMethod("GetTableCellAttribute", cell);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param cell 单元格对象
          * @param option 自定义对象
          * @name SetTableCellAttribute
          */
        rootElement.SetTableCellAttribute = function (cell, option) {
            //wyc20230710:直接转发请求
            return rootElement.SetElementCustomAttributes(cell, option)
            //return rootElement.__DCWriterReference.invokeMethod("SetTableCellAttribute", cell, option);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param element 对象
          * @param breadonly 是否只读,合法值 "True"/"False"/"Inherit"
          * @name SetElementContentReadonly
          */
        rootElement.SetElementContentReadonly = function (element, breadonly) {
            //wyc20230727:直接转发需求
            var opt = {
                ContentReadonly: breadonly
            };
            return rootElement.SetElementProperties(element, opt);
            //return rootElement.__DCWriterReference.invokeMethod("SetElementContentReadonly", element, breadonly);
        }
        /**
          * 兼容四代设置表格行的自定义属性
          * @param element 对象
          * @param visible 是否隐藏 合法值 "true"/"false"/true/false
          * @name SetElementVisibility
          */
        rootElement.SetElementVisibility = function (element, visible) {
            //wyc20230727:直接转发需求
            var opt = {
                Visible: visible
            };
            return rootElement.SetElementProperties(element, opt);
            //return rootElement.__DCWriterReference.invokeMethod("SetElementVisibility", element, visible);
        }

        /**
          * 兼容四代清除输入域的宽度，恢复初始值,大小写和四代一致
          * @name removeSpecifywidth
          */
        rootElement.removeSpecifywidth = function (element) {
            return rootElement.__DCWriterReference.invokeMethod("RemoveSpecifywidth", element);
        }
        /**
          * 兼容四代接口，获取全部或指定名称的单选框或复选框
          * @param type 类型名称：radio或checkbox
          * @param name 指定的元素的name属性（可传空，表示获取所有）
        * @name GetAllCheckboxOrRadio
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
        * @name CASignature
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
        * @name CAReSignature
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
        * @name GetPDFByFiles
        */
        rootElement.GetPDFByFiles = function (options, callback) {
            //wyc20230625:重写逻辑准备调用第四代接口
            var strServicePageUrl = DCTools20221228.GetServicePageUrl(rootElement);
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
        * @name SetLabelElementContactSettings
        */
        rootElement.SetLabelElementContactSettings = function (element, options) {
            return rootElement.SetElementProperties(element, options);
        };
        /**
          * 兼容四代获取改变的元素ID列表
          * @name getModifiedElements
          */
        rootElement.getModifiedElements = function (typename) {
            return rootElement.__DCWriterReference.invokeMethod("GetModifiedElements", typename);
        };

        /** wyc20230724
          * 删除指定的元素
          * @param parameter 元素ID或元素本身的后台.NET引用对象
          * @name DeleteElement
          */
        rootElement.DeleteElement = function (parameter) {
            if (typeof (parameter) === "string") {
                return rootElement.__DCWriterReference.invokeMethod("DeleteElementByID", parameter);
            } else if (DCTools20221228.IsDotnetReferenceElement(parameter) === true) {
                return rootElement.__DCWriterReference.invokeMethod("DeleteElement", parameter);
            }
            return false;
        };

        /**
          * 删除指定编号的元素
          * @name DeleteElementByID
          */
        rootElement.DeleteElementByID = function (id) {
            return rootElement.__DCWriterReference.invokeMethod("DeleteElementByID", id);
        };

        /**wyc20230627自动修复表格列宽使其自适应容器宽度
        * @param tableElement 需要设置的表格元素的ID、元素属性列表或后台.NET引用对象，为空则引用当前表格元素
        * @name AutoFixTableWidth
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
         * @name GetPrintResult
         */
        rootElement.GetPrintResult = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetPrintResult");
        };
        /**
         * 兼容第四代获取文档的总页数
         * @name GetDocumentPageNum
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
        * @name GetPrintPreviewHTML
        */
        rootElement.GetPrintPreviewHTML = function (options, callBack) {
            //wyc20230625:重写逻辑准备调用第四代接口
            var strServicePageUrl = DCTools20221228.GetServicePageUrl(rootElement);
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
         * @name GetXmlContent
         */
        rootElement.GetXmlContent = function () {
            return this.SaveDocumentToString("XML");
        };

        /**
         * 兼容四代接口，获取单元格的数值表达式
         * @name GetTableCellExpression
         */
        rootElement.GetTableCellExpression = function (parameter) {
            return rootElement.__DCWriterReference.invokeMethod("GetTableCellExpression", parameter);
        };
        /**
         * 兼容四代接口，设置单元格的数值表达式
         * @name SetTableCellExpression
         */
        rootElement.SetTableCellExpression = function (parameter, expression, isSelected) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableCellExpression", parameter, expression, isSelected);
        };
        /**
         * 兼容四代接口，保存文档的正文
         * @name SaveBodyDocumentToString
         */
        rootElement.SaveBodyDocumentToString = function (fileFormat) {
            return rootElement.__DCWriterReference.invokeMethod("SaveBodyDocumentToString", fileFormat);
        };
        /**
        * 兼容四代接口，续打模式
        * @name SetJumpPrintMode
        */
        rootElement.SetJumpPrintMode = function (setValue) {
            rootElement.__DCWriterReference.invokeMethod("DCExecuteCommand", "JumpPrintMode", false, setValue);
        };
        /**
        * 兼容四代接口，设置元素的是否打印的属性
        * @name SetElementPrintVisibility
        */
        rootElement.SetElementPrintVisibility = function (parameter, visible) {
            rootElement.__DCWriterReference.invokeMethod("SetElementPrintVisibility", parameter, visible);
        };
        /**
        * 兼容四代接口，设置表格列隐藏
        * @name SetTableColumnVisible
        */
        rootElement.SetTableColumnVisible = function (tableElement, columnIndex, visible) {
            return rootElement.__DCWriterReference.invokeMethod("SetTableColumnVisible", tableElement, columnIndex, visible);
        }
        /**
         * 
         * 为表格复制粘贴获取当前选择的表格和单元格
         * @returns
         * @name GetSelectTableAndCell
         */
        rootElement.GetSelectTableAndCell = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetSelectTableAndCell");
        }

        /**lxy
         * 兼容四代接口SaveDocumentToStringAsync
         * @param fileFormat:数据格式，如：xml
        * @name SaveDocumentToStringAsync
        */
        rootElement.SaveDocumentToStringAsync = function (fileFormat) {
            return rootElement.__DCWriterReference.invokeMethod("SaveDocumentToString", fileFormat);
        }

        /**wyc20230704兼容四代接口
        * 获取元素位置兼容四代接口
        * @param element"可以传元素ID/元素属性列表/元素后台.NET引用"
        * @name GetAbsBoundsInDocument
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
        * @name SetTableHeight
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
        * @name GetTableCell
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
        * @name GetDocumentCustomAttributes
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
        * @name SetDocumentCustomAttributes
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
        /**wyc20230705兼容四代接口
        * 设置文档自定义属性
        * @param scriptstring :要设置的脚本字符串
        * @name SetDocumentGlobalJavaScript
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
        * @name GetDocumentGlobalJavaScript
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
        * @name GetTableRow
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
        * @name GetChartElementDataByID
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
        * @name SetChartElementDataByID
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

        /**lxy20230714
         * 文档中包含不支持的字体
         * @param {function} callback 回调函数
         * @name GetNotSupportFontNames
         */
        rootElement.GetNotSupportFontNames = function () {
            var result = rootElement.__DCWriterReference.invokeMethod("GetNotSupportFontNames");
            return result;
        }

        /**wyc20230720
        * 获取当前表格列对象
        * @name CurrentTableColumn
        */
        rootElement.CurrentTableColumn = function () {
            return rootElement.CurrentElement("XTextTableColumnElement");
        };

        /**wyc20230725
        * 手动执行文档中的全部表达式
        * @name ExecuteAllEffectExpressions
        */
        rootElement.ExecuteAllEffectExpressions = function () {
            return rootElement.__DCWriterReference.invokeMethod("ExecuteAllEffectExpressions");
        };

        /**wyc20230726
        * 易联众的横向扩展列数据的表格数据源绑定专属接口
        * 数据集传数组，格式如下，模板只需制作一个表格，后台会根据数组大小自动扩展表格
        * [
        *   {
        *     AAA: [
        *            {
        *               CCC: "YYY",
        *               DDD: "ZZZ"
        *            }
        *          ]
        *     BBB: "XXX"
        *   }
        * ]
        * AAA：表格绑定起始列设置的数据源绑定路径
        * BBB：表格绑定起始列之前的列中若有需要单独绑值的单元格设置的绑定路径
        * CCC、DDD：表格绑定起始列中单元格设置的绑定路径
        * @param bindname 绑定的数据源名称，模板中必须有一个表格的数据源名称被设置成这个
        * @param datas 绑定的数据集
        * @name BindingColumnExpandingTables
        */
        rootElement.BindingColumnExpandingTables = function (bindname, datas) {
            return rootElement.__DCWriterReference.invokeMethod("BindingColumnExpandingTables", bindname, datas);
        };

        /**wyc20230727
        * 获取文档数据源绑定信息的JSON对象
        * @name GetDataSourceBindingDescriptionsJSON
        */
        rootElement.GetDataSourceBindingDescriptionsJSON = function () {
            return rootElement.__DCWriterReference.invokeMethod("GetDataSourceBindingDescriptionsJSON");
        };


        /**wyc20230727兼容四代接口
        * 获取文档结构化数据的四代BS兼容接口
        * @param options {
        *       FileContentXML: xmlfortest,//1.需要加载处理的原文档XML字符串
                IsUseBase64: false,//2.指定加载和保存的字符串是否是BASE64字符串
                IsBindingData: false,//3. 指定加载文档后是否要做将数据绑定到文档的处理
                Datas: dataobj, //4. 若要绑定数据在这里指定绑定文档所需要的数据集           
                IsReturnFileContent: true, //5.加载并绑定处理完文档后是否将文档保存成字符串返回前端
                IsReturnStruct: true, //6.加载并绑定处理完文档后是否返回加载文档的前端JSON结构               
                OutputElementInnerXML: false, //是否输出元素自身的XML  20220620新增              
                NestedMode: true  //是否输出元素嵌套关系
        * }
        * @name DCFormTransmission
        */
        rootElement.DCFormTransmission = function (options) {
            return rootElement.__DCWriterReference.invokeMethod("DCFormTransmission", options);
        };

        /**
        * 手动刷新某个容器元素 wyc20230801
        * @param obj 指定容器元素的后台.NET引用对象
        * @name EditorRefreshContainerView
        */
        rootElement.EditorRefreshContainerView = function (obj) {
            if (DCTools20221228.IsDotnetReferenceElement(obj) === true) {
                return rootElement.__DCWriterReference.invokeMethod("EditorRefreshContainerView", obj);
            } else {
                return false;
            }
        };


        //rootElement.refreshDocumentOptions();
        document.WriterControl = rootElement;
    }
}

