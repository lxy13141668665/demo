//*************************************************************************
//* 项目名称：
//* 当前版本: 
//* 开始时间:
//* 开发者:
//* 重要描述:
//*************************************************************************
//* 最后更新时间: 20230710
//* 最后更新人:zhangbin
//*************************************************************************

"use strict";
import { DCTools20221228 } from "./DCTools20221228.js";
import { PageContentDrawer } from "./PageContentDrawer.js";
import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { WriterControl_Print } from "./WriterControl_Print.js";
import { WriterControl_Rule } from "./WriterControl_Rule.js";
import { WriterControl_UI } from "./WriterControl_UI.js";
import { DCBinaryReader } from "./DCTools20221228.js";

export let WriterControl_IO = {
    /**
    * 从一个字符串中加载文档
    * @param {object} rootElement 编辑器控件对象
    * @param {string} strData 文件内容
    * @param {string} strFormat 文件格式
    * @returns {boolean} 操作是否成功
    */
    LoadDocumentFromString: function (rootElement, strData, strFormat, specifyLoadPart, isbase64string) {
        //在此处清除掉光标的事件
        if (rootElement) {
            var divCaret = rootElement.querySelector('#divCaret20221213');
            if (divCaret) {
                divCaret.style.display = "none";
                window.clearInterval(divCaret.handleTimer);
            }
        }
        //rootElement.__DCWriterReference.invokeMethod("SetColor2", "#eeeeff" , "2023-1-2 9:1:19" , 3);
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
        rootElement.__WaterMarkData = null;
        WriterControl_Print.ClosePrintPreview(rootElement, false);
        rootElement.__LastLoadDocumentTime = new Date().valueOf();
        var result = null;
        if (specifyLoadPart == null &&
            isbase64string == null &&
            WriterControl_IO.PrepareLoadDocumentXmlReader(strData, rootElement.__DCWriterReference) == true) {
            // 以快速XMLReader的模式加载文档
            result = rootElement.__DCWriterReference.invokeMethod("LoadDocumentFromInnerXmlReader");
        }
        else {
            if (isbase64string === true) {
                result = rootElement.__DCWriterReference.invokeMethod("LoadDocumentFromBase64String", strData, strFormat, specifyLoadPart);
            } else {
                result = rootElement.__DCWriterReference.invokeMethod("LoadDocumentFromString", strData, strFormat, specifyLoadPart);
            }
        }



        rootElement.TempElementForDoubleBuffer = null;
        WriterControl_Rule.InvalidateView(rootElement, "hrule");
        WriterControl_Rule.InvalidateView(rootElement, "vrule");
        WriterControl_Paint.InvalidateAllView(rootElement);
        tick = new Date().valueOf() - tick;
        WriterControl_Paint.UpdateViewForWaterMark(rootElement);
        console.log("加载文档花费毫秒:" + tick);

        try {
            //存储加载文档花费毫秒，用于提供给性能页面
            let indexPerformanceTiming = {}
            if (window.localStorage.getItem('indexPerformanceTiming')) {
                indexPerformanceTiming = {
                    ...JSON.parse(window.localStorage.getItem('indexPerformanceTiming'))
                }
            }
            indexPerformanceTiming['documentTiming'] = [...(indexPerformanceTiming.documentTiming || [])]
            indexPerformanceTiming['documentTiming'].push({
                title: "加载文档花费毫秒",
                useTime: tick,
                id: rootElement.id
            })
            window.localStorage.setItem('indexPerformanceTiming', JSON.stringify(indexPerformanceTiming))
        } catch (error) {

        }
        return result;
    },

    /**
    * 从一个字符串中加载文档
    * @param {object} rootElement 编辑器控件对象
    * @param {string} strData 文件内容
    * @param {string} strFormat 文件格式
    * @returns {boolean} 操作是否成功
    */
    AddDocumentByText: function (rootElement, strData, strFormat) {
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
        rootElement.__WaterMarkData = null;
        WriterControl_Print.ClosePrintPreview(rootElement, false);
        rootElement.__LastLoadDocumentTime = new Date().valueOf();
        var result = null;
        if (WriterControl_IO.PrepareLoadDocumentXmlReader(strData, rootElement.__DCWriterReference) == true) {
            // 以快速XMLReader的模式加载文档
            result = rootElement.__DCWriterReference.invokeMethod("AddDocumentByInnerXmlReader");
        }
        else {
            result = rootElement.__DCWriterReference.invokeMethod("AddDocumentByText", strData, strFormat);
        }
        rootElement.TempElementForDoubleBuffer = null;
        WriterControl_Rule.InvalidateView(rootElement, "hrule");
        WriterControl_Rule.InvalidateView(rootElement, "vrule");
        WriterControl_Paint.InvalidateAllView(rootElement);
        tick = new Date().valueOf() - tick;
        WriterControl_Paint.UpdateViewForWaterMark(rootElement);
        console.log("加载文档花费毫秒:" + tick);
        return result;
    },

    /**
    * 下载文件
    * @param {object} rootElement 编辑器控件对象
    * @param {string} strFormat 文件格式
    * @param {string} strFileName 指定的文件名
    * @returns {boolean} 操作是否成功
    */
    DownLoadFile: function (rootElement, strFormat, strFileName) {
        if (strFormat == null || strFormat.length == 0) {
            strFormat = "xml";
        }
        else {
            strFormat = strFormat.trim().toLowerCase();
        }
        strFileName = rootElement.__DCWriterReference.invokeMethod("GetRuntimeFileName", strFileName);
        if (strFormat == "xml"
            || strFormat == "htm"
            || strFormat == "html"
            || strFormat == "json"
            || strFormat == "text") {
            // 这些文件格式可以在本地生成
            var strResult = rootElement.__DCWriterReference.invokeMethod("SaveDocumentToString", strFormat);
            if (strFileName == null || strFileName.length == 0) {
                strFileName = new Date().getTime();//文件名
            }
            var strBlobType = "text/xml";
            if (strFormat == "xml") {
                strFileName = strFileName + ".xml";
                strBlobType = "text/xml";
            }
            else if (strFormat == "rtf") {
                strFileName = strFileName + ".rtf";
                strBlobType = "application/rtf";
            }
            else if (strFormat == "text") {
                strFileName = strFileName + ".txt";
                strBlobType = "text/plain";
            }
            else if (strFormat == "json") {
                strFileName = strFileName + ".json";
                strBlobType = "application/json";
            }
            else if (strFormat == "html" || strFormat == "htm") {
                strFileName = strFileName + ".html";
                strBlobType = "text/html";
            }
            let blob = new Blob([strResult], { type: strBlobType });
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            //console.log(file.name, "文件名");
            downloadElement.download = strFileName;// file.name; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
            return true;
        }
        else if (strFormat == "longimg") {
            // 保存为长图片
            var bsData = rootElement.__DCWriterReference.invokeMethod("WASMCreateLongBmp", true, 1, false);
            if (bsData == null || bsData.length == 0) {
                return false;
            }
            var tempElement = document.createElement("CANVAS");
            var reader = new DCBinaryReader(bsData);
            tempElement.width = reader.ReadInt16();
            tempElement.height = reader.ReadInt16();
            var drawer = new PageContentDrawer(tempElement, reader);
            drawer.EventAfterDraw = function () {
                var strUrl = tempElement.toDataURL("image/png", 1);
                let downloadElement = document.createElement("a");
                downloadElement.href = strUrl;
                //console.log(file.name, "文件名");
                downloadElement.download = strFileName;// file.name; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
            };
            drawer.AddToTask();
            return true;
        }
        else if (strFormat == "pdf" || strFormat == "rtf") {
            // PDF,rtf,图片格式无法本地生成，必须要依赖服务器
            var strServicePageUrl = DCTools20221228.GetServicePageUrl(rootElement);
            if (strServicePageUrl == null || strServicePageUrl.length == 0) {
                console.log("DCWriter:未配置ServicePageUrl,无法生成文件" + strFormat);
                return false;
            }
            // 此处对应的服务器代码在 DCWriterForASPNET\Writer\Controls\Web\WC_WASM.cs
            var strUrl = strServicePageUrl + "?wasm=downloadfile&format=" + strFormat + "&dcbid2022=" + DCTools20221228.GetClientID();
            if (strFileName != null && strFileName.length > 0) {
                strUrl = strUrl + "&filename=" + decodeURI(strFileName);
            }
            //var postData = rootElement.__DCWriterReference.invokeMethod("InnerForDownloadFile");
            var postData = rootElement.__DCWriterReference.invokeMethod("InnerForDownloadFile");
            var strDataType = null;
            if (strFormat == "pdf") {
                strDataType = "application/pdf";
                strFileName = strFileName + ".pdf";
            }
            else if (strFormat == "rtf") {
                strDataType = "application/msword;charset=utf-8";
                strFileName = strFileName + ".rtf";
            }
            else if (strFormat == "longimg") {
                strDataType = "image/png";
                strFileName = strFileName + ".png";
            }
            var xhr = new XMLHttpRequest();
            xhr.open("POST", strUrl, true);
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (this.status == 200) {
                    var blob = this.response;
                    let downloadElement = document.createElement("a");
                    let href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = strFileName;// file.name; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                }
            };
            xhr.send(postData);
            return true;
        }
        else {
            console.log("DCWriter:不支持的文件格式:" + strFormat);
        }
        return false;
    },

    /**
     * 准备以XMLReader的方式加载文档XML内容
     * @param {string} strXML XML字符串
     * @param {any} dcwriterRef DCWriter控件的引用
     * @returns {Array} 字符串数据数组
     */
    PrepareLoadDocumentXmlReader: function (strXML, dcwriterRef) {
        if (dcwriterRef == null) {
            // 参数为空，不处理
            return false;
        }
        if (strXML == null || strXML.length == 0) {
            // 参数为空，不处理
            return false;
        }
        var strHeader = strXML.substring(0, 200);
        if (strHeader.indexOf("<XTextDocument") < 0
            && strHeader.indexOf("<DCDocument2022") < 0) {
            // 不是标准的XML，不处理。
            return false;
        }
        if (strHeader.indexOf("HasEncrypted=") > 0) {
            // 该XML具有透明加密部分，不处理。
            return false;
        }
        var starTick = new Date().valueOf();
        var index933 = strHeader.indexOf("?>");
        if (index933 > 0) {
            // 去掉XML声明头
            var headerLen = strHeader.length;
            strHeader = strHeader.substring(index933 + 2).trim();
            strXML = strHeader + strXML.substring(headerLen);
        }
        var tick = new Date().valueOf();
        var tick2 = tick;
        var pr = new DOMParser();
        var xmldoc = pr.parseFromString(strXML, "text/xml");//"application/xml" "text/xml"
        if (xmldoc.documentElement.nodeName == "html") {
            // 解析错误
            return false;
        }
        var binaryDataArray = new Array();
        tick2 = new Date().valueOf() - tick2;
        var strTable = new Array();
        var strTableValues = new Array();
        var idNames = new Set();
        var GetStringIndex = function (txt, isName) {
            if (txt == null || txt.length == 0) {
                return -1;
            }
            //var index = strTable.indexOf( txt );//[ txt ];
            //if(index <0){
            //    strTable.push( txt );
            //    index = strTable.length - 1;
            //}
            var index = strTable[txt];
            if (typeof (index) == "undefined") {
                index = strTableValues.length;
                strTableValues.push(txt);
                strTable[txt] = index;
            }
            if (isName == true) {
                idNames.add(index);
            }
            //if (strTableValues[ index ] != txt )
            //{
            //    var len4 = txt;
            //}
            return index;
        };
        var funcOutputAttributes = function (attributes, array) {
            var attrLen = attributes.length;
            array.push(attrLen);
            for (var iCount = 0; iCount < attrLen; iCount++) {
                var attr = attributes[iCount];
                array.push(GetStringIndex(attr.localName, true));
                array.push(GetStringIndex(attr.nodeValue, false));
            }
        };
        var funcOutputNodes = function (firstNode, array) {
            //var nodeLen = nodes.length;
            array.push(0);
            var lenIndex = array.length - 1;
            array.push(0);
            var outputLength = 0;
            //for (var iCount = 0; iCount < nodeLen; iCount++) {
            var preNode = null;
            for (var node = firstNode; node != null; node = node.nextSibling) {
                //var node = nodes[iCount];
                var nodeType = node.nodeType;
                if (nodeType == 1) {
                    // 元素
                    funcOutputOneNode(node, array);
                    outputLength++;
                }
                else if (nodeType == 3) {
                    // #text
                    var strText = node.nodeValue;
                    if (strText.charCodeAt(0) == 13 || strText.charCodeAt(0) == 10) {
                        if (preNode == null || preNode.nodeType == 1) {
                            var nextNode = node.nextSibling;
                            if (nextNode == null || nextNode.nodeType == 1) {
                                if (strText.trim().length == 0) {
                                    // 为一个无意义的空行
                                    continue;
                                }
                            }
                        }
                    }
                    else if (node.nextSibling != null
                        && strText.charCodeAt(0) == 32
                        && node.nextSibling.nodeType != 3
                        && strText.trim().length == 0) {
                        // 为第一个元素间空白,忽略
                        continue;
                    }
                    array.push(0);
                    array.push(GetStringIndex(node.nodeValue, false));
                    outputLength++;
                }
                preNode = node;
            }//for
            array[lenIndex] = outputLength;
            array[lenIndex + 1] = array.length - 1;
        };
        /**@param { HTMLElement} rootNode
         @param {Array} array*/
        var funcOutputOneNode = function (rootNode, array) {
            var attrLen = 0;
            if (rootNode.hasAttributes()) {
                attrLen = rootNode.attributes.length;
            }
            var firstChild = rootNode.firstChild;
            if (attrLen == 0 && firstChild == null) {
                // 没有任何数据
                array.push(1);//ElementType.EmptyElement
                array.push(GetStringIndex(rootNode.nodeName, true));
            }
            else if (attrLen == 0 && firstChild != null) {
                // 没有属性，有子节点
                if (firstChild.nodeType == 3 && firstChild.nextSibling == null) {
                    // 只有一个文本数据
                    array.push(2);//ElementType.ElementString
                    array.push(GetStringIndex(rootNode.nodeName, true));
                    var strNodeValue = firstChild.nodeValue;
                    if (strNodeValue.length > 1024 * 5
                        && rootNode.nodeName == "ImageDataBase64String") {
                        // 这是一个比较大的BASE64字符串,提前进行转换
                        var bsData = DCTools20221228.FromBase64String(strNodeValue);
                        array.push(GetStringIndex("$BINARY_" + binaryDataArray.length));
                        binaryDataArray.push(bsData);
                    }
                    else {
                        array.push(GetStringIndex(firstChild.nodeValue, false));
                    }
                    return;
                }
                array.push(3);// ElementType.ElementNoAttribute
                array.push(GetStringIndex(rootNode.nodeName, true));
                funcOutputNodes(firstChild, array);
            }
            else if (attrLen > 0 && firstChild == null) {
                // 有属性，没有子节点
                array.push(4);// ElementType.ElementNoChild
                array.push(GetStringIndex(rootNode.nodeName, true));
                funcOutputAttributes(rootNode.attributes, array);
            }
            else {
                // 有属性有子节点
                array.push(5);//ElementType.ElementFull
                array.push(GetStringIndex(rootNode.nodeName, true));
                funcOutputAttributes(rootNode.attributes, array);
                funcOutputNodes(firstChild, array);
            }
        };
        var list = new Array();
        funcOutputOneNode(xmldoc.documentElement, list);
        var tickSpan = new Date().valueOf() - starTick;
        //strTable.push( list.toString());
        var byteIndexs = new Uint8Array(new Int32Array(list).buffer);
        var byteIndexNames = new Uint8Array(new Int32Array(idNames).buffer);
        //alert("处理XML毫秒:" + tick2 + "/" + tick + "   " + byteIndexs.length );
        strTable = null;
        list = null;
        idNames = null;
        // 传递二进制的参数
        dcwriterRef.invokeMethod("ClearInnerXmlReader");
        dcwriterRef.invokeMethod("AddBianryDataForXmlReader", byteIndexs);
        dcwriterRef.invokeMethod("AddBianryDataForXmlReader", byteIndexNames);
        if (binaryDataArray.length > 0) {
            // 设置预先解析出的二进制数据
            for (var iCount = 0; iCount < binaryDataArray.length; iCount++) {
                dcwriterRef.invokeMethod("AddBianryDataForXmlReader", binaryDataArray[iCount]);
            }
        }
        dcwriterRef.invokeMethod("CreateInnerXmlReader", strTableValues);
        strTableValues = null;
        return true;
    },

}