// 演示程序使用的JS
"use strict";

/**
 * 处理编辑器控件的显示快捷菜单事件
 */
function Handle_EventShowContextMenu(eventSender, args) {
    //console.log(eventSender);

    let myWriterControl = GetCurrentWriterControl();

    //console.log("为 " + args.ElementType + "显示快捷菜单");
    //console.log(args);
    var typename = args.ElementType;
    if (typename != null && typename != "") {
        typename = typename.toLowerCase();
        var options = [
            {
                label: '撤销',
                exec: () => {
                    console.log('撤销')
                    myWriterControl.DCExecuteCommand('Undo', false, null);
                },
            },
            {
                label: '重做',
                exec: () => {
                    console.log('重做')
                    myWriterControl.DCExecuteCommand('Redo', false, null);
                },
            },
            '-',
            {
                label: '复制(Ctrl+C)',
                exec: () => {
                    console.log('复制(Ctrl+C)')
                    myWriterControl.DCExecuteCommand('Copy', false, null);
                },
            },
            {
                label: '粘贴(Ctrl+V)',
                exec: () => {
                    myWriterControl.DCExecuteCommand('Paste', false, null);
                },
            },
            {
                label: '剪切(Ctrl+X)',
                exec: () => {
                    myWriterControl.DCExecuteCommand('Cut', false, null);
                },
            },
            {
                label: '纯文本复制',
                exec: () => {
                    myWriterControl.DCExecuteCommand('CopyAsText', false, null);
                },
            },
            {
                label: '纯文本粘贴',
                exec: () => {
                    console.log('纯文本粘贴')
                    myWriterControl.DCExecuteCommand('PasteAsText', false, null);
                },
            },
            '-',
            {
                label: '属性',
                exec: () => {
                    myWriterControl.DCExecuteCommand('ElementProperties', true, null);
                },
            },
        ];
        if (typename == "xtexttablecellelement") {//单元格
            var options2 = [
                '-',
                {
                    label: '表格属性',
                    exec: () => {
                        myWriterControl.DCExecuteCommand("tableproperties", true, null);
                    },
                },
                {
                    label: '表格行属性',
                    exec: () => {
                        myWriterControl.DCExecuteCommand("tablerowproperties", true, null);
                    },
                },
                {
                    label: '单元格属性',
                    exec: () => {
                        myWriterControl.DCExecuteCommand("tablecellproperties", true, null);
                    },
                },
                '-',
                {
                    label: '表格行列',
                    exec: () => {
                        
                    },

                    subMenu: [
                        {
                            label: '删除表格行',
                            exec: () => {
                                myWriterControl.DCExecuteCommand("Table_DeleteRow", false, null);
                            },
                        },
                        {
                            label: '删除表格列',
                            exec: () => {
                                myWriterControl.DCExecuteCommand("Table_DeleteColumn", false, null);
                            },
                        },
                        {
                            label: '在上面插入行',
                            exec: () => {
                                myWriterControl.DCExecuteCommand("Table_InsertRowUp", false, null);
                            },
                        },
                        {
                            label: '在下面插入行',
                            exec: () => {
                                myWriterControl.DCExecuteCommand("Table_InsertRowDown", false, null);
                            },
                        },
                        {
                            label: '在左侧插入列',
                            exec: () => {
                                myWriterControl.DCExecuteCommand("Table_InsertColumnLeft", false, null);
                            },
                        },
                        {
                            label: '在右侧插入列',
                            exec: () => {
                                myWriterControl.DCExecuteCommand("Table_InsertColumnRight", false, null);
                            },
                        },
                    ]
                },
                
                '-',
                {
                    label: '合并单元格',
                    exec: () => {
                        myWriterControl.DCExecuteCommand("Table_MergeCell", false, null);
                    },
                },
                {
                    label: '拆分单元格',
                    exec: () => {
                        myWriterControl.DCExecuteCommand("Table_SplitCellExt", true, null);
                    },
                },
                '-',
                {
                    label: '设置单元格网格线',
                    exec: () => {
                        console.log('设置单元格网格线');
                        var cell = myWriterControl.CurrentTableCell();
                        if (cell != null) {
                            var settings = {
                                AlignToGridLine: "True", //文本行对齐到网格线
                                ColorValue: "#000000",  //网格线颜色
                                GridSpanInCM: 1,  //网格线之间的宽度
                                LineStyle: "Solid", //网格线样式
                                LineWidth: 1,  //网格线宽度
                                Printable: "True", //打印预览是否显示
                                Visible: "True", //网格是否显示
                            };
                            myWriterControl.cellGridlineDialog(settings, myWriterControl);
                        }
                    },
                },
                {
                    label: '设置单元格斜分线',
                    exec: () => {
                        console.log('设置单元格斜分线');
                        var cell = myWriterControl.CurrentTableCell();
                        if (cell != null) {
                            myWriterControl.cellDiagonalLineDialog(cell, myWriterControl);
                        }
                    },
                },
                {
                    label: '设置表格边框',
                    exec: () => {
                        myWriterControl.bordersShadingDialog();
                    },
                },
                {
                    label: '设置单元格边框',
                    exec: () => {
                        myWriterControl.borderShadingcellDialog();
                    },
                }
            ];

            options = options.concat(options2);
        }
        else {

        }
        ContextMenu(options, args, eventSender);

    }

    //return { eventSender,orgs }
};

/**
     * 开启右键菜单
     * @param {Array} options 右键菜单的所有配置
     * [
     *  {
     *  label: '全选',        //名称 
        icon: 'selectall',    //图标
        exec: () => {         //回调函数
            ctl.DCDCExecuteCommand('selectall', true, null)
        },
     *  }
     * ] 
     * @returns
     */
function ContextMenu(options, menuObj, rootElement) {
    if (options != null && Array.isArray(options)) {
        if (menuObj) {
            //获取到包裹元素
            var pageContainer = rootElement.querySelector('[dctype=page-container]');
            //判断是否为打印预览
            if (rootElement.IsPrintPreview()) {
                pageContainer = rootElement.querySelector('[dctype=page-printpreview]');
            }
            //判断是否存在dcContextMenu的元素
            var hasContextMenu = pageContainer.querySelector('#dcContextMenu');
            if (!hasContextMenu) {
                var meunDiv = document.createElement('div');
                meunDiv.setAttribute('id', 'dcContextMenu')
                pageContainer.appendChild(meunDiv);
                meunDiv.innerHTML = `<div class="dcMenu-line"></div>`;
                hasContextMenu = meunDiv;
                //判断是否有css
                var dcHead = document.head;
                //判断是否存在对应的css
                var hasContextMenuCss = dcHead.querySelector('#ContextMenuCss');
                if (!hasContextMenuCss) {
                    var newCssString = `
                    #dcContextMenu{
                        position: absolute;
                        margin: 0;
                        padding: 2px;
                        border-width: 1px;
                        border-style: solid;
                        background-color: #fafafa;
                        border-color: #ddd;
                        color: #444;
                        box-shadow: rgb(204, 204, 204) 2px 2px 3px;
                        min-width: 144px;
                        /* left: 8px;
                        top: 481.672px; 
                        overflow: hidden;*/
                        z-index: 110008;
                        display: none;
                    }
                    #dcContextMenu div.dcMenu-item:hover{
                        color: rgb(0, 0, 0);
                        border-color: rgb(183,210,255);
                        background: rgb(234,242,255);
                    }
                    #dcContextMenu .dcMenu-line{
                        position: absolute;
                        left: 26px;
                        top: 0;
                        height: 100%;
                        font-size: 1px;
                        border-left: 1px solid #ccc;
                        border-right: 1px solid #fff;
                    }
                    #dcContextMenu .dcMenu-item{
                        position: relative;
                        white-space: nowrap;
                        cursor: pointer;
                        margin: 0px;
                        padding: 0px;
                        overflow: hidden;
                        border-width: 1px;
                        border-style: solid;
                        border-color: transparent;
                    }
                    #dcContextMenu .dcMenu-item .dcMenu-text{
                        float: left;
                        padding-left: 28px;
                        padding-right: 20px;
                        font-size: 12px;
                    }

                    #dcContextMenu .dcMenu-icon{
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        left: 2px;
                        top: 50%;
                        margin-top: -8px;
                    }
                    #dcContextMenu .dcMenu-sep{
                        margin: 3px 0px 3px 25px;
                        font-size: 1px;
                        border-top: 1px solid #ccc;
                        border-bottom: 1px solid #fff;
                    }
                    #dcContextMenu .secondaryMenu{
                        position: absolute;
                        z-index: 110011;
                        margin: 0;
                        padding: 2px;
                        border-width: 1px;
                        border-style: solid;
                        border-color: #ddd;
                        min-width: 144px;
                        overflow: hidden;
                        display: none;
                        background-color: #fafafa;
                    }
                    #dcContextMenu .dcMenu-rightarrow {
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        right: 0;
                        top: 50%;
                        margin-top: -8px;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAZ0lEQVR42u2VMQ7AMAgD+f9XeYBHd+mA2IqrJFJ8EkMGrNiCJMIYY86Eh2otDYA7dNgq2/kLEEzwhxDGGrURQxGlN97gUUrxQCU9DM33ALjYQA0vlRGCcPEUjGxdgasfQX+DxphreAA2tk8BzQnbmgAAAABJRU5ErkJggg==) no-repeat -32px center;
                    }`
                    var ContextMenuCss = document.createElement('style');
                    ContextMenuCss.setAttribute('id', 'ContextMenuCss');
                    dcHead.appendChild(ContextMenuCss);
                    ContextMenuCss.innerHTML = newCssString;

                    //页面滚动
                    pageContainer.addEventListener('scroll', function () {
                        var hasContextMenu = rootElement.querySelector('#dcContextMenu');
                        if (hasContextMenu) {
                            hasContextMenu.remove();
                        }
                    })
                    //丢失焦点
                    window.addEventListener('blur', function () {
                        var hasContextMenu = rootElement.querySelector('#dcContextMenu');
                        if (hasContextMenu) {
                            hasContextMenu.remove();
                        }
                    })
                }

            } else {
                //存在时，清空所有item和sep的元素
                var allItem = hasContextMenu.querySelectorAll('.dcMenu-item, .dcMenu-sep');
                for (var i = 0; i < allItem.length; i++) {
                    allItem[i].remove();
                }
            }
            var containerHeight = 0;
            if (Array.isArray(options) && options.length > 0) {
                //根据options显示元素
                for (var option = 0; option < options.length; option++) {
                    if (typeof options[option] == 'object') {
                        var thisItem = insertItem(options[option], hasContextMenu, true);
                        //判断是否存在subMenu，如果需要更多可以使用递归调用
                        if (options[option].subMenu && Array.isArray(options[option].subMenu)) {
                            var secondaryMenu = document.createElement('div');
                            secondaryMenu.setAttribute('class', 'secondaryMenu');
                            secondaryMenu.innerHTML = `<div class="dcMenu-line"></div>`;
                            hasContextMenu.appendChild(secondaryMenu);
                            for (var meun = 0; meun < options[option].subMenu.length; meun++) {
                                insertItem(options[option].subMenu[meun], secondaryMenu, false)
                            }
                            var rightItem = document.createElement('div');
                            rightItem.setAttribute('class', 'dcMenu-rightarrow');
                            thisItem.appendChild(rightItem);
                            //添加事件
                            thisItem.addEventListener('mouseenter', function (e) {
                                //console.log(e)
                                //console.log($(e.target))
                                //找到下一个子元素
                                var targetEle = e.target.nextElementSibling;
                                targetEle.style.top = e.target.offsetTop + 'px';
                                targetEle.style.left = e.target.offsetLeft + e.target.offsetWidth + 'px';
                                targetEle.style.display = 'block';
                            })
                            thisItem.addEventListener('mouseleave', function (e) {
                                var targetEle = e.target.nextElementSibling;
                                targetEle.style.display = 'none';
                            })
                            secondaryMenu.addEventListener('mouseenter', function (e) {
                                var targetEle = e.target.previousElementSibling;
                                e.target.style.top = targetEle.offsetTop + 'px';
                                e.target.style.left = targetEle.offsetLeft + targetEle.offsetWidth + 'px';
                                e.target.style.display = 'block';
                            })
                            secondaryMenu.addEventListener('mouseleave', function (e) {
                                e.target.style.display = 'none';
                            })

                        }
                    } else if (typeof options[option] == 'string' && options[option] == '-') {
                        var sepEle = document.createElement('div');
                        sepEle.setAttribute('class', 'dcMenu-sep');
                        hasContextMenu.appendChild(sepEle);
                        containerHeight += 8;
                    }
                }
                var pageElement = menuObj.PageElement;

                containerHeight = containerHeight ? containerHeight + 6 : 0
                hasContextMenu.style.height = containerHeight + 'px';
                hasContextMenu.style.left = pageElement.offsetLeft + menuObj.X + 'px';
                hasContextMenu.style.top = pageElement.offsetTop + menuObj.Y + 'px';
                hasContextMenu.style.display = 'block';
            }
        }
    }

    //插入内部的item项
    function insertItem(options, hasContextMenu, needHeight) {
        if (typeof options == 'object') {
            var itemEle = document.createElement('div');
            itemEle.setAttribute('class', 'dcMenu-item');
            itemEle.style.cssText = 'height: 30px;';
            hasContextMenu.appendChild(itemEle);
            itemEle.innerHTML = `
                <div class="dcMenu-text" style="height: 30px; line-height: 30px;">${options.label}</div>
                <div class="dcMenu-icon"></div>
            `;
            itemEle.addEventListener('mousedown', function (e) {
                e.stopPropagation();
                e.preventDefault();
            })
            itemEle.onclick
            itemEle.addEventListener('click', function () {
                options.exec();
                hasContextMenu.remove();
            })
            if (needHeight) {
                containerHeight += 30;
            }
            return itemEle;
        } else if (typeof options == 'string' && options == '-') {
            var sepEle = document.createElement('div');
            sepEle.setAttribute('class', 'dcMenu-sep');
            hasContextMenu.appendChild(sepEle);
            if (needHeight) {
                containerHeight += 30;
            }
            return sepEle;
        }
    }
}

/**
 * 处理动态下拉的方法
 * 只要触发此方法就表示为是该元素为动态下拉的操作
 */
//function WriterControl_QueryListItems(sender, args) {
//    /**
//     *  bufferItems: true
//        controlName: null
//        elementID: "field2"
//        elementName: null
//        handled: false
//        kbEntry: null
//        listSourceName: null
//        pageName: null
//        preText: null
//        raiseEvent: true
//        result: []
//        specifyValue: null
//        spellCode: null
//     */
//    console.log(" 动态下拉列表QueryListItems事件  ", args)
//    //在此处进行获取数据的处理，可以用ajax向后台请求，也可以通过listSourceName来分类写数据
//    //判断是否有数据源名listSourceName
//    if (args.listSourceName != null && args.listSourceName.length > 0) {
//        if (args.listSourceName == 'xxxxx') {
//            //此处写死数据
//            var listItems = [
//                {
//                    text: '复制',
//                    value: 'copy'
//                },
//                {
//                    text: '粘贴',
//                    value: 'paste'
//                },
//                {
//                    text: '剪切',
//                    value: 'cut'
//                }
//            ];
//            //此处使用已有的数据方法，不再进行重复书写，客户可以根据自己的数据进行自定义样式修改，只要把数据回给callback就行
//            var callback = function () {
//                if (strNewInnerValue != strOldValue || strNewText != strOldText) {
//                    var ctlRef = DCTools20221228.GetDCWriterReference(containerID);
//                    if (ctlRef != null) {
//                        // 用户确认操作后执行函数
//                        ctlRef.invokeMethod("ApplyCurrentEditorCallBack", strNewText, strNewInnerValue);
//                    }
//                }
//                divContainer.CloseDropdown();
//            }
//            //WriterControl_ListBoxControl.CreateListBoxControl(listItems, callback);
//        }
//    } else {

//    }
//}

/**
 * 处理编辑器控件的更新工具条按钮状态事件
 * @param {any} eventSender
 * @param {any} args
 */
function Handle_EventUpdateToolarState(eventSender, args) {
    function UpdateCommandUIElement(commandName, uiElement) {
        var info = GetCurrentWriterControl().GetCommandStatus(commandName);
        if (info.Supported == false) {
            // 系统不支持命令
            uiElement.style.backgroundColor = "red";
            uiElement.disabled = true;
        }
        else if (info.Enabled == false) {
            // 命令当前无效
            //uiElement.style.backgroundColor = "lightgray";
            uiElement.style.color = "#999999";
            uiElement.disabled = true;
        }
        else {
            uiElement.style.color = "";
            uiElement.disabled = false;
        }
        if (info.Checked == true) {
            // 命令处于勾选状态
            uiElement.style.border = "1px solid black";
        }
        else {
            uiElement.style.border = "";
        }
    }
    var elements = document.getElementsByTagName("A");
    for (var iCount = 0; iCount < elements.length; iCount++) {
        var element = elements[iCount];
        var cmdName = element.getAttribute("dccommandName");
        if (cmdName != null && cmdName.length > 0) {
            UpdateCommandUIElement(cmdName, element);
        }
    }
    console.log("更新工具条按钮状态");
};