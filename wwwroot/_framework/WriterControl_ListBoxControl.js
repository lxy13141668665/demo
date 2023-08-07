//*************************************************************************
//* 项目名称：
//* 当前版本: V 5.3.1
//* 开始时间: 20230601
//* 开发者: 
//* 重要描述: 创建输入域的单选多选下拉列表HTML
//*************************************************************************
//* 最后更新时间: 2023-7-26
//* 最后更新人: xuyiming
//*************************************************************************
"use strict";

export let WriterControl_ListBoxControl = {
    /** 多选框不选择时展示的图片 */
    NoCheckedSvg : '<svg style="vertical-align: baseline;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5Z" fill="rgba(0,0,0,0.6)"></path></svg>',
    /** 多选框选择时展示的图片 */
    CheckedSvg : '<svg style="vertical-align: baseline;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z" fill="rgba(0,0,0,0.6)"></path></svg>',
    /** 获取列表格式化字符串
     * @param {Object} data {includeText:"",includeValue:"",excludeText:"",excludeValue:""}
     */
    GetListValueFormatString: function (inputNode, data) {
        var resultData = {
            Text: data.includeText,
            Value: data.includeValue,
        };
        // inputNode为空
        if (!inputNode) return resultData;
        // 有[includelist],无[excludelist]
        var ListValueFormatString = inputNode.ListValueFormatString;//列表格式化字符串
        // 不是字符串，返回
        if (typeof (ListValueFormatString) != "string") return resultData;
        // 没有存在包含和不包含项目
        if (ListValueFormatString.indexOf("[includelist]") == -1 || ListValueFormatString.indexOf("[excludelist]") == -1) {
            return resultData;
        }
        // replace(/\[includelist\]/g,"")//包含替换
        // replace(/\[excludelist\]/g,"")//不包含替换
        resultData.Text = ListValueFormatString.replace(/\[includelist\]/g, data.includeText).replace(/\[excludelist\]/g, data.excludeText);
        resultData.Value = ListValueFormatString.replace(/\[includelist\]/g, data.includeValue).replace(/\[excludelist\]/g, data.excludeValue);
        if (resultData.Text.slice(0, 2) == "有,") {
            resultData.Text = resultData.Text.slice(2);
        }
        if (resultData.Value.slice(0, 2) == "有,") {
            resultData.Value = resultData.Value.slice(2);
        }
        if (resultData.Text.slice(-2) == ",无") {
            resultData.Text = resultData.Text.slice(0, resultData.Text.length - 2);
        }
        if (resultData.Value.slice(-2) == ",无") {
            resultData.Value = resultData.Value.slice(0, resultData.Value.length - 2);
        }
        return resultData;
    },

    /** 反编译列表格式化字符串 */
    DecompilationListValueFormatString: function (inputNode, data) {
        var resultData = {
            Text: data.Text,
            Value: data.Value,
        };
        // inputNode为空
        if (!inputNode) return resultData;
        // 有[includelist],无[excludelist]
        var ListValueFormatString = inputNode.ListValueFormatString;//列表格式化字符串
        // 不是字符串，返回
        if (typeof (ListValueFormatString) != "string") return resultData;
        // 没有存在包含和不包含项目
        if (ListValueFormatString.indexOf("[includelist]") == -1 || ListValueFormatString.indexOf("[excludelist]") == -1) {
            return resultData;
        }
        var NowText = data.Value || data.Text;//现在的值
        var FormatStr = ListValueFormatString;
        // 第一个字在什么地方
        var OneCharIndex = ListValueFormatString.indexOf(NowText.slice(0, 1));
        if (OneCharIndex > -1) {
            FormatStr = ListValueFormatString.slice(OneCharIndex);
        }
        // 判断当前是否有选中的项
        var listArr1 = FormatStr.split("[");
        var listArr = [];
        for (var i = 0; i < listArr1.length; i++) {
            var listArr2 = listArr1[i].split("]");
            for (var j = 0; j < listArr2.length; j++) {
                if (listArr2[j] != "") {
                    listArr.push(listArr2[j]);
                }
            }
        }
        resultData = {
            Text: GetIncludeText(resultData.Text),
            Value: GetIncludeText(resultData.Value),
        };
        function GetIncludeText(str){
            var textIndexArr = [];
            for (var i = 0; i < listArr.length; i++) {
                if (str.indexOf(listArr[i]) != -1) {
                    textIndexArr.splice(i, 0, [str.indexOf(listArr[i]), listArr[i]]);
                }
            }
            var textArr = [];
            for (var i = 0; i < textIndexArr.length; i++) {
                if (textIndexArr[0][0] != 0) {
                    textArr.push(str.substring(0, textIndexArr[0][0]));
                }
                textArr.push(str.substring(textIndexArr[i][0], textIndexArr[i][0] + textIndexArr[i][1].length));
                if (i + 1 < textIndexArr.length) {
                    textArr.push(str.substring(textIndexArr[i][0] + textIndexArr[i][1].length, textIndexArr[i + 1][0]));
                } else if (i + 1 == textIndexArr.length) {
                    textArr.push(str.substring(textIndexArr[i][0] + textIndexArr[i][1].length));
                }
            }
            var obj = {};
            for (var i = 0; i < listArr.length; i++) {
                obj[listArr[i]] = textArr[i];
            }
            return obj["includelist"] || "";
        }
        return resultData;
    },

    //创建下拉文本的方法
    CreateListBoxControl: function (listItems, callBack, rootElement, divContainer, oldText, oldValue, currentInput, args) {
        var FormatData = this.DecompilationListValueFormatString(currentInput, {
            Text: oldText,
            Value: oldValue
        });
        oldText = FormatData.Text,oldValue = FormatData.Value;
        var listBox = null;
        if (listItems != null && listItems.length > 0) {
            //创建外层包裹元素
            listBox = document.createElement('div');
            listBox.setAttribute('class', 'dcListBox');
            listBox.style.cssText = 'list-style:none;margin:0;padding:2px;positon:absoulte;background-color: #ffffff;color: #444; ';
            //循环解析listItems;
            for (var i = 0; i < listItems.length; i++) {
                var liBox = document.createElement('div');
                liBox.style.cssText = 'height: 30px;line-height: 30px;background-color: transparent;padding: 0 10px;overflow: hidden;white-space: nowrap;cursor: pointer;border-bottom: 1px solid #eee;font-size: 12px';
                if (typeof (listItems[i]) == "string") {
                    liBox.setAttribute("native-text", listItems[i] || "");//赋值内容
                    liBox.setAttribute('value', listItems[i] || "");//value值
                    liBox.innerHTML = listItems[i] || "";//下拉展示内容
                } else {
                    liBox.setAttribute("native-text", listItems[i].Text || "");//赋值内容
                    liBox.setAttribute('value', listItems[i].Value ? listItems[i].Value : listItems[i].Text ? listItems[i].Text : "");//value值
                    liBox.innerHTML = listItems[i].TextInList ? listItems[i].TextInList : (listItems[i].Text || "");//下拉展示内容
                }
                listBox.appendChild(liBox);

                //如果oldValue或者oldText存在,给上样式并将下拉滚动到对应位置
                if (oldValue != null && oldText != null) {
                    if (liBox.getAttribute('value') == oldValue && liBox.getAttribute("native-text") == oldText) {
                        liBox.style.backgroundColor = '#eaf2ff';
                        liBox.style.color = '#000000';
                        liBox.style.outline = '1px solid #b7d2ff';
                        liBox.setAttribute('targetLi', 'true')
                    }
                }
            };
            //对listBox进行判断
            listBox.addEventListener('click', function (e) {
                WriterControl_ListBoxControl.CheckListBox(e, callBack, currentInput)
            });
            listBox.addEventListener('mouseover', function (e) {
                var _target = e.srcElement ? e.srcElement : e.target;
                var allli = listBox.querySelectorAll('div');
                allli.forEach(function (item) {
                    if (item == _target) {
                        item.style.backgroundColor = '#eaf2ff';
                        item.style.color = '#000000';
                        item.style.outline = '1px solid #b7d2ff';
                    } else {
                        item.style.backgroundColor = '#ffffff';
                        item.style.color = '#444';
                        item.style.outline = 'none';
                    }
                });
            });
            //listBox.addEventListener('mouseout', function (e) {
            //    e.target.style.backgroundColor = '#ffffff';
            //    e.target.style.color = '#444';
            //    e.target.style.outline = 'none';
            //});
        }
        WriterControl_ListBoxControl.CreateDropdownCodeArea(listBox, rootElement, divContainer, currentInput, args)
        return listBox;
    },

    CheckListBox: function (e, callBack, currentInput) {
        var _target = e.srcElement ? e.srcElement : e.target ? e.target : e;
        if (_target != null && _target.hasAttribute("native-text")) {
            if (!!callBack && typeof (callBack) == "function") {
                var AssignmentText = _target.getAttribute("native-text");//赋值的Text值
                var AssignmentValue = _target.getAttribute("value");//赋值的Value值
                if (currentInput && currentInput.ListValueFormatString) {//存在格式化字符串
                    var AllListItems = listBox.querySelectorAll("div[native-text]");//所有的下拉列表
                    var ListValueSeparatorChar = currentInput.ListValueSeparatorChar || ",";
                    var excludeText = "", excludeValue = "";
                    for (var i = 0; i < AllListItems.length; i++) {
                        if (AllListItems[i] != _target) {
                            if (excludeText != "") {
                                excludeText += ListValueSeparatorChar;
                            }
                            excludeText += AllListItems[i].getAttribute("native-text");
                            if (excludeValue != "") {
                                excludeValue += ListValueSeparatorChar;
                            }
                            excludeValue += AllListItems[i].getAttribute("value");
                        }
                    }
                    var opt = {
                        includeText: AssignmentText,
                        includeValue: AssignmentValue,
                        excludeText: excludeText,
                        excludeValue: excludeValue
                    };
                    var FormatStrData = WriterControl_ListBoxControl.GetListValueFormatString(currentInput, opt);
                    callBack.call(_target, FormatStrData.Text, FormatStrData.Value);
                } else {
                    callBack.call(_target, AssignmentText, AssignmentValue);
                }
            }
        }
    },

    //创建多选下拉框的方法
    //CreateMultiSelectControl: function (listItems, callBack, oldText, oldValue) {}
    CreateMultiSelectControl: function (listItems, rootElement, divContainer, oldText, oldValue, currentInput, args) {
        var FormatData = this.DecompilationListValueFormatString(currentInput, {
            Text: oldText,
            Value: oldValue
        });
        oldText = FormatData.Text,oldValue = FormatData.Value;
        var meunDiv = null;
        if (listItems != null && Array.isArray(listItems)) {
            meunDiv = document.createElement('div');
            meunDiv.setAttribute('id', 'MultiSelectControl')
            //meunDiv.innerHTML = `<div class="MultiSelect-line"></div>`;
            //判断是否有css
            var dcHead = document.head;
            //判断是否存在对应的css
            var hasContextMenuCss = dcHead.querySelector('#MultiSelectCss');
            //min-width: 144px;
            if (!hasContextMenuCss) {
                var newCssString = `
                #MultiSelectControl{
                    margin: 0;
                    padding: 2px;
                    border-width: 1px;
                    border-style: solid;
                    background-color: #fafafa;
                    border-color: #ddd;
                    color: #444;
                    box-shadow: rgb(204, 204, 204) 2px 2px 3px;
                    overflow: hidden;
                }
                #MultiSelectControl > div:hover{
                    color: rgb(0, 0, 0);
                    border-color: rgb(183,210,255);
                    background: rgb(234,242,255);
                }
                #MultiSelectControl .MultiSelect-line{
                    position: absolute;
                    left: 26px;
                    top: 0;
                    height: 100%;
                    font-size: 1px;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #fff;
                }
                #MultiSelectControl .MultiSelect-item{
                    position: relative;
                    white-space: nowrap;
                    cursor: pointer;
                    margin: 0px;
                    padding: 0px;
                    overflow: hidden;
                    border-width: 1px;
                    border-style: solid;
                    border-color: transparent;
                    border-bottom: 1px solid rgb(238, 238, 238);
                }
                #MultiSelectControl .MultiSelect-item .MultiSelect-text{
                    float: left;
                    padding-left: 28px;
                    font-size: 12px;
                }

                #MultiSelectControl .MultiSelect-icon{
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    left: 2px;
                    top: 50%;
                    margin-top: -8px;
                }
                #MultiSelectControl .MultiSelect-sep{
                    margin: 3px 0px 3px 25px;
                    font-size: 1px;
                    border-top: 1px solid #ccc;
                    border-bottom: 1px solid #fff;
                }`
                var ContextMenuCss = document.createElement('style');
                ContextMenuCss.setAttribute('id', 'MultiSelectCss');
                dcHead.appendChild(ContextMenuCss);
                ContextMenuCss.innerHTML = newCssString;
            }
            var separatorChar = currentInput.ListValueSeparatorChar ? currentInput.ListValueSeparatorChar : ',';//列表项目分割字符
            if (Array.isArray(listItems) && listItems.length > 0) {
                //解析oldText和oldValue
                //给默认值
                if (oldText != null) {
                    oldText = oldText.split(separatorChar);
                }
                if (oldValue != null) {
                    oldValue = oldValue.split(separatorChar)
                }
                //根据listItems显示元素
                for (var option = 0; option < listItems.length; option++) {
                    //if (typeof listItems[option] == 'object') {
                    var itemEle = document.createElement('div');
                    itemEle.setAttribute('class', 'MultiSelect-item');
                    itemEle.style.cssText = 'height: 30px;';
                    meunDiv.appendChild(itemEle);
                    var nativeText = '',//赋值内容
                        innerText = '',//下拉展示内容
                        innerValue = '';//value值
                    if (typeof (listItems[option]) == "string") {
                        innerText = nativeText = innerValue = listItems[option] || "";
                    } else {
                        nativeText = listItems[option].Text || "";
                        innerText = listItems[option].TextInList ? listItems[option].TextInList : (listItems[option].Text || "");
                        innerValue = listItems[option].Value ? listItems[option].Value : listItems[option].Text ? listItems[option].Text : "";
                    }
                    itemEle.innerHTML = `
                        <div class="MultiSelect-text" style="height: 30px; line-height: 30px;" native-text="${nativeText}" value="${innerValue}">${innerText}</div>
                        <div class="MultiSelect-icon">${WriterControl_ListBoxControl.NoCheckedSvg}</div>
                    `;
                    //在此处判断对应坐标的text和value是否一致
                    if (oldText != null && oldValue != null) {
                        var hasIndex = [];
                        oldText.forEach((word, index) => {
                            if (word == nativeText) {
                                hasIndex.push(index);
                            }
                        })
                        if (hasIndex != null && hasIndex.length > 0) {
                            for (var z = 0; z < hasIndex.length; z++) {
                                if (oldValue[hasIndex[z]] == innerValue) {
                                    itemEle.querySelector('.MultiSelect-icon').innerHTML = WriterControl_ListBoxControl.CheckedSvg;
                                    itemEle.setAttribute('targetLi', 'true');
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            //对listBox进行判断
            meunDiv.addEventListener('click', function (e) {
                WriterControl_ListBoxControl.CheckMultiSelect(e, meunDiv, separatorChar, currentInput, rootElement)
            });
        }
        WriterControl_ListBoxControl.CreateDropdownCodeArea(meunDiv, rootElement, divContainer, currentInput, args)
        return meunDiv;
    },

    CheckMultiSelect: function (e, meunDiv, separatorChar, currentInput, rootElement) {
        var _target = e.srcElement ? e.srcElement : e.target ? e.target : e;
        if (_target != null && _target != meunDiv) {
            if (!_target.getAttribute || _target.getAttribute('class') != 'MultiSelect-item') {
                if (_target.getAttribute('class') == 'MultiSelect-line') {
                    return;
                } else if (_target.nodeName == 'INPUT') {
                    e.stopPropagation();
                    e.preventDefault();
                }
                //查找到MultiSelect-item元素
                while (_target) {
                    if (_target.getAttribute && _target.getAttribute('class') == 'MultiSelect-item') {
                        break;
                    }
                    _target = _target.parentElement;
                }
            }
            //在此处进行数据拼接
            if (_target != null && _target.getAttribute && _target.getAttribute('class') == 'MultiSelect-item') {
                //获取到元素并拼接
                var hasChecked = _target.getAttribute('targetLi');
                //如果存在选中则清除页面数据,没有就添加
                if (hasChecked != null) {
                    var iconEle = _target.querySelector('.MultiSelect-icon');
                    _target.removeAttribute('targetLi');
                    iconEle.innerHTML = WriterControl_ListBoxControl.NoCheckedSvg;
                } else {
                    var iconEle = _target.querySelector('.MultiSelect-icon');
                    _target.setAttribute('targetLi', 'true');
                    iconEle.innerHTML = WriterControl_ListBoxControl.CheckedSvg;
                }
                // 以下是赋值的代码
                //获取到所有的值
                var MultiSelectItems = meunDiv.querySelectorAll(".MultiSelect-item");
                var opt = {
                    includeText: "",
                    includeValue: "",
                    excludeText: "",
                    excludeValue: ""
                };
                // 修改顺序代码【暂时没有】
                for (var i = 0; i < MultiSelectItems.length; i++) {
                    var textEle = MultiSelectItems[i].querySelector('.MultiSelect-text');//存储值的元素
                    var LsTxt = textEle.getAttribute("native-text");//Text值
                    var LsValue = textEle.getAttribute("value");//value值
                    if (MultiSelectItems[i].hasAttribute("targetLi")) {//选择的项
                        if (opt.includeText != "") {
                            opt.includeText += separatorChar;
                        }
                        opt.includeText += LsTxt;
                        if (opt.includeValue != "") {
                            opt.includeValue += separatorChar;
                        }
                        opt.includeValue += LsValue;
                    } else {//未选择的项
                        if (opt.excludeText != "") {
                            opt.excludeText += separatorChar;
                        }
                        opt.excludeText += LsTxt;
                        if (opt.excludeValue != "") {
                            opt.excludeValue += separatorChar;
                        }
                        opt.excludeValue += LsValue;
                    }
                }
                var FormatStrData = {
                    Text: opt.includeText,
                    Value: opt.includeValue
                };
                if (currentInput && currentInput.ListValueFormatString) {//存在格式化字符串
                    FormatStrData = WriterControl_ListBoxControl.GetListValueFormatString(currentInput, opt);
                }
                rootElement.SetElementProperties(currentInput, {
                    Text: FormatStrData.Text,
                    InnerValue: FormatStrData.Value
                });
                //if (!!callBack && typeof (callBack) == "function") {
                //    callBack.call(newText, newValue);
                //}
            }
        }
    },

    //创建搜索框的方法 MinCountForDropdownListSpellCodeArea
    CreateDropdownCodeArea: function (listBox, rootElement, divContainer, currentInput, args) {
        if (rootElement == null || divContainer == null || currentInput == null) {
            return
        }
        //判断是否存在下拉数量判断
        var hasMinCount = rootElement.DocumentOptions.BehaviorOptions.MinCountForDropdownListSpellCodeArea
        if (hasMinCount && hasMinCount <= listBox.children.length) {
            if (listBox != null) {
                //在此之前先插入一个搜索框
                var searchSpan = document.createElement('span');
                searchSpan.style.cssText = `
                    position: relative;
                    border: 1px solid #95B8E7;
                    background-color: #fff;
                    vertical-align: middle;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;`;
                var searchInput = document.createElement('input');
                searchInput.style.cssText = `
                    font-size: 12px;
                    border: 0;
                    margin: 0;
                    padding: 4px;
                    white-space: normal;
                    vertical-align: top;
                    outline-style: none;
                    resize: none;
                    padding-top: 0px;
                    padding-bottom: 0px;
                    height: 24px;
                    line-height: 24px;
                    box-sizing: border-box;
                    width: 100px;`;
                searchSpan.appendChild(searchInput);
                //让下拉框获取焦点
                searchInput.onfocus = function () {
                    // 清除编辑器光标
                    var caret = rootElement.querySelector('#divCaret20221213')
                    if (caret != null) {
                        caret.style.display = 'none';
                        clearInterval(caret.handleTimer);
                    }
                };
                searchInput.onkeydown = function (e) {
                    WriterControl_ListBoxControl.ChangeListBoxCheck(rootElement, e, currentInput);
                }
                var eventObj = {
                    Value: '',
                    ElementID: currentInput.ID,
                    ListSourceName: currentInput.InnerListSourceName,
                    NewListItems: [],
                    AddResultItemByTextValue: function (text1, value1) {
                        eventObj.NewListItems.push({
                            Text: text1,
                            Value: value1
                        })
                    },
                    //文本改变后重新显示的数据
                    ChangeSpellCode: function () {
                        if (eventObj.NewListItems != null && eventObj.NewListItems.length > 0) {
                            listBox.innerHTML = '';
                            console.log(listBox)
                            if (currentInput != null && (currentInput.InnerMultiSelect === true || currentInput.InnerMultiSelect == 'true')) {
                                for (var i = 0; i < eventObj.NewListItems.length; i++) {
                                    var itemEle = document.createElement('div');
                                    itemEle.setAttribute('class', 'MultiSelect-item');
                                    itemEle.style.cssText = 'height: 30px;';
                                    listBox.appendChild(itemEle);
                                    var innerText = eventObj.NewListItems[i].Text ? eventObj.NewListItems[i].Text : '';;
                                    var innerValue = eventObj.NewListItems[i].Value ? eventObj.NewListItems[i].Value : '';
                                    itemEle.innerHTML = `
                                            <div class="MultiSelect-text" style="height: 30px; line-height: 30px;" value="${innerValue}">${innerText}</div>
                                            <div class="MultiSelect-icon">${WriterControl_ListBoxControl.noChecked}</div>
                                        `;
                                }
                            } else {
                                for (var i = 0; i < eventObj.NewListItems.length; i++) {
                                    var liBox = document.createElement('div');
                                    liBox.style.cssText = 'height: 30px;line-height: 30px;background-color: transparent;padding: 0 10px;overflow: hidden;white-space: nowrap;cursor: pointer;border-bottom: 1px solid #eee;font-size: 12px';
                                    liBox.innerHTML = eventObj.NewListItems[i].Text ? eventObj.NewListItems[i].Text : '';
                                    liBox.setAttribute('value', eventObj.NewListItems[i].Value ? eventObj.NewListItems[i].Value : '');
                                    listBox.appendChild(liBox);
                                };
                            }

                        }
                    }
                }
                //输入内容改变的时候
                searchInput.oninput = function (e) {
                    //在此处处理listBox
                    if (e.target.value != null && e.target.value.length > 0) {
                        var allLi = null;
                        if (currentInput != null && (currentInput.InnerMultiSelect === true || currentInput.InnerMultiSelect == 'true')) {
                            allLi = listBox.querySelectorAll('.MultiSelect-item');
                        } else {
                            allLi = listBox.querySelectorAll('div');
                        }

                        if (allLi != null && allLi.length > 0) {
                            for (var i = 0; i < allLi.length; i++) {
                                if (allLi[i].innerText.indexOf(e.target.value) < 0) {
                                    allLi[i].style.display = 'none';
                                } else {
                                    allLi[i].style.display = 'block';
                                }
                            }
                        }
                    } else {
                        var allLi = listBox.querySelectorAll('div');
                        if (allLi != null && allLi.length > 0) {
                            //将数据全部显示
                            for (var i = 0; i < allLi.length; i++) {
                                allLi[i].style.display = 'block';
                            }
                        }
                    }
                    eventObj.NewListItems = [];
                    //在此处不调用callback的话将数据再次写入元素
                    if (args.EventChangeSearchInputSpellCode != null && typeof args.EventChangeSearchInputSpellCode == 'function') {
                        eventObj.Value = e.target.value;
                        args.EventChangeSearchInputSpellCode(eventObj);
                    }
                };
                divContainer.appendChild(searchSpan);
                divContainer.style.removeProperty('border-radius');
                //在此处创建一个包裹元素来先显示滚动条
                var containerDiv = document.createElement('div');
                containerDiv.appendChild(listBox);
                containerDiv.setAttribute('class', 'listBoxContainer')
                containerDiv.style.cssText = `
                        max-height: calc(250px - 26px);
                        overflow-y: auto;
                        position: relative;
                    `;
                divContainer.appendChild(containerDiv);
                divContainer.style.width = 'auto';
                divContainer.ShowDropdown();
                searchInput.focus();
                //判断宽度
                var liWidth = divContainer.offsetWidth;
                if (Number(liWidth) > 0) {
                    searchInput.style.width = (liWidth - 2) + 'px';
                }
                var hasTargetLi = listBox.querySelector('[targetLi]');
                if (hasTargetLi != null) {
                    containerDiv.scrollTo(0, hasTargetLi.offsetTop);
                }
            }
        } else {
            if (listBox != null) {
                divContainer.appendChild(listBox);
                divContainer.style.width = 'auto';
                divContainer.ShowDropdown();
                var hasTargetLi = listBox.querySelector('[targetLi]');
                if (hasTargetLi != null) {
                    divContainer.scrollTo(0, hasTargetLi.offsetTop);
                }
            }

        }
            
    },

    //下拉输入域选中
    ChangeListBoxCheck: function (rootElement, e, currentInput) {
        //判断是否存在下拉输入域是否显示
        var hasDropDown = rootElement.querySelector('#divDropdownContainer20230111');
        var txtEdit = rootElement.querySelector('#txtEdit20221213');
        if (hasDropDown && hasDropDown.style.display != 'none' && txtEdit) {
            var isPassword = txtEdit.getAttribute('type');
            if (isPassword != 'password') {
                txtEdit.setAttribute('type', 'password');
            }
            //判断是否为下拉输入域
            var hasListBox = hasDropDown.querySelector('.dcListBox,#MultiSelectControl');
            var boxId = 'dcListBox';
            if (hasListBox.id == 'MultiSelectControl') {
                boxId = 'MultiSelectControl';
            }
            //判断是否为上下键
            if (hasListBox && e != null) {
                //最先判读是否存在moveLi
                var hasTargetLi = hasListBox.querySelectorAll('[moveli]');
                if (hasTargetLi && hasTargetLi.length == 0) {
                    //查找下拉元素内部是否存在targetli属性
                    hasTargetLi = hasListBox.querySelectorAll('[targetli]');
                }
                var targetLi = null;
                var hasNextLi = null;
                if (hasTargetLi && hasTargetLi.length > 0) {
                    targetLi = hasTargetLi[hasTargetLi.length - 1];
                    if (e.keyCode == 38) {
                        //判断是否存在下一个元素
                        hasNextLi = targetLi.previousElementSibling
                    } else if (e.keyCode == 40) {
                        hasNextLi = targetLi.nextElementSibling
                    }
                } else if (hasTargetLi && hasTargetLi.length == 0) {
                    hasNextLi = hasListBox.children[0];
                }
                currentInput = currentInput ? currentInput :rootElement.GetElementProperties(rootElement.CurrentInputField());
                if (e.keyCode == 13) {
                    if (boxId == 'dcListBox') {
                        var callBack = function (strNewText, strNewInnerValue) {
                            // 用户确认操作后执行函数
                            var ctlRef = DCTools20221228.GetDCWriterReference(rootElement.id);
                            if (ctlRef != null) {
                                // 用户确认操作后执行函数
                                ctlRef.invokeMethod("ApplyCurrentEditorCallBack", strNewText, strNewInnerValue);
                            }
                            hasDropDown .CloseDropdown();
                        }
                        WriterControl_ListBoxControl.CheckListBox(targetLi, callBack, currentInput)
                    } else if (boxId == 'MultiSelectControl') {
                        //只做选中
                        WriterControl_ListBoxControl.CheckMultiSelect(targetLi, hasListBox, currentInput.ListValueSeparatorChar ? currentInput.ListValueSeparatorChar : ',', currentInput, rootElement)
                    }
                    return true;
                }
                if (hasNextLi) {
                    if (targetLi) {
                        targetLi.style.backgroundColor = '#ffffff';
                        targetLi.style.color = '#444';
                        targetLi.style.outline = 'none';
                        targetLi.removeAttribute('moveLi');
                    }
                    hasNextLi.style.backgroundColor = '#eaf2ff';
                    hasNextLi.style.color = '#000000';
                    hasNextLi.style.outline = '1px solid #b7d2ff';
                    hasNextLi.setAttribute('moveLi', 'true');
                    //获取到父元素
                    hasListBox.parentElement.scrollTo(0, hasNextLi.offsetTop);
                    
                }
            }
            return true;
        }
        return false;
    },
}