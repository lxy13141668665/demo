//*************************************************************************
//* 项目名称：首页的dom树功能
//* 当前版本: V 2023-11-23 00:00:00
//* 开始时间: 20231123
//* 开发者:李新宇
//* 重要描述:用于首页-演示程序-dom树功能的js
//*************************************************************************
//* 最后更新时间:2023-11-23
//* 最后更新人:李新宇
//*************************************************************************
class DomTree {
    constructor(DomTreeParentID) {
        this.ctl = null;
        this.domStructure = null;
        this.DomTreeElementBox = document.getElementById(DomTreeParentID);

        this.domStyle = `
        .dc_itemName{
            display: inline-block;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border:1px solid #979a9b;
        }
        .dc_domTreeTitltle{
            display: inline-block;
            padding: 2px 20px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .expandCollapse{
            display: inline-block;
            height: 16px;
            width: 16px;
            border-radius: 3px;
            border: 1px solid #ccc;
            line-height: 12px;
            text-align: center;
            font-size: 16px;
        }
        .parentElement{
            border-left: 1px solid rgb(159, 159, 159);
            margin-top: 10px;
        }
        .parentElement .dc_itemName{
            margin-left:-10px;
            background: #fff;
        }
      .parentElement .dc_itemName.XTextTableElement{
            background: #418245;
            color: #fff;

        }
        .parentElement .dc_itemName.XTextInputFieldElement,.parentElement .dc_itemName.XTextParagraphFlagElement{
            background: #FFF;
            color: #2b2724;
        }
         .parentElement .dc_itemName.XTextInputFieldElement{
            color:#328ec9;
         }
         .parentElement .dc_itemName.XTextTableCellElement{
           background: #f5940e;
           color: #fff;
         }
         .parentElement .dc_itemName.XTextTableRowElement{
            background:#b94b45;
            color: #fff;
         }
         .dc_NativeHandle_TypeName{
            cursor: pointer;
         }
        
        `
    }
    addEventListerFunction(ctl) {
        ctl = GetCurrentWriterControl();
        var that = this;
        this.DomTreeElementBox.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (e && e.target && e.target.className) {
                let className = e.target.className;
                let clickedElement = e.target;
                if (className.indexOf('expandCollapse') !== -1) {
                    var parent = clickedElement.parentNode;
                    var isShow = parent.parentNode.getAttribute('isShow')
                    console.log(isShow, (typeof isShow))
                    //设置子元素的显示隐藏
                    var siblings = that.getSiblings(parent.parentNode, clickedElement.parentNode) || []
                    siblings.filter(item => {
                        item.style.display = isShow === 'true' ? 'none' : 'block';
                    })
                    if (siblings && siblings.length) {
                        parent.parentNode.setAttribute('isShow', !(isShow === 'true'))
                        parent.parentNode.style['border-left'] = isShow === 'true' ? '0' : '1px solid rgb(159, 159, 159)'
                        //设置展开收起按钮的状态
                        if (clickedElement) {
                            clickedElement.innerHTML = isShow === 'true' ? '+' : '-';
                            clickedElement.style['line-height'] = isShow === 'true' ? '16px' : '12px';
                        }
                    }

                }
                else if (className.indexOf('dc_NativeHandle_TypeName') !== -1) {

                    if (clickedElement.getAttribute('NativeHandle')) {
                        var nativeHandle = clickedElement.getAttribute('NativeHandle');
                        nativeHandle = Number(nativeHandle);
                        //点击dom树展开右侧属性列表
                        document.getElementById('unfoldButton').click()
                        var clickCurrentElementOptions = ctl.GetElementProperties(nativeHandle)
                        console.log(clickCurrentElementOptions)
                        clickCurrentElementOptions && rightOptionContainer.renderFormContainer(ctl, clickCurrentElementOptions);
                    }
                }
            }
        })
    }
    getSiblings(parent, clickedElement) {
        var siblings = [];
        // 遍历父节点的所有子节点
        for (var i = 0; i < parent.childNodes.length; i++) {
            var node = parent.childNodes[i];

            // 排除当前点击元素本身
            if (node !== clickedElement && node.nodeType === 1) {
                siblings.push(node);

            }
        }

        return siblings
    }
    initDom(ctl) {
        this.domStructure = this.getDocumentDomStructure(ctl);
        this.addEventListerFunction(ctl)
        console.log(this.domStructure, "==============this.domStructure");
        if (ctl && this.domStructure) {
            this.DomTreeElementBox = document.getElementById("DomTreeElementListContent");
            this.DomTreeElementBox.innerHTML = null;
            //先给定上中下三个模块
            this.DomTreeElementBox.innerHTML = `
            <div id="dc_DomTreeHeaderBox"><span class="dc_itemName dc_domTreeTitltle"> <span class="expandCollapse">-</span>Header</span></div>
            <div id="dc_DomTreeBodyBox"><span class="dc_itemName dc_domTreeTitltle"> <span class="expandCollapse">-</span>Body</span></div>
            <div id="dc_DomTreeFooterBox"><span class="dc_itemName dc_domTreeTitltle"> <span class="expandCollapse">-</span>Footer</span></div>
        `;
            var dialogLink = this.DomTreeElementBox.querySelector("style#dcDomTreeStyle");
            if (!dialogLink) {
                // 防止多次插入样式元素
                dialogLink = ctl.ownerDocument.createElement("style");
                dialogLink.setAttribute("id", "dcDomTreeStyle");
                dialogLink.innerHTML = this.domStyle;
                this.DomTreeElementBox.appendChild(dialogLink);
            }

            var dc_DomTreeHeaderBox = document.getElementById("dc_DomTreeHeaderBox");
            var dc_DomTreeBodyBox = document.getElementById("dc_DomTreeBodyBox");
            var dc_DomTreeFooterBox = document.getElementById("dc_DomTreeFooterBox");
            this.renderNodes(this.domStructure.Header, dc_DomTreeHeaderBox);
            this.renderNodes(this.domStructure.Body, dc_DomTreeBodyBox);
            this.renderNodes(this.domStructure.Footer, dc_DomTreeFooterBox);
        }
    }
    renderNodes(data, parentElement) {
        var dataItem = []
        if (data && data.Rows && data.Rows.length) {
            dataItem = data.Rows;
        } else if (data && data.Cells && data.Cells.length) {
            dataItem = data.Cells;
        } else if (data && data.Elements && data.Elements.length) {
            dataItem = data.Elements;
        }
        dataItem.forEach(item => {
            var expandCollapse = '';
            //给dom列表增加一个展开收起的按钮
            if (item && ((item.Rows && item.Rows.length) || (item.Cells && item.Cells.length) || (item.Elements && item.Elements.length))) {
                expandCollapse = `
                    <span class="expandCollapse">-</span>
                `
            }
            const elementDom = document.createElement("div");
            elementDom.className = "elementDom"
            elementDom.innerHTML = `
            <div class="dc_itemName ${item.TypeName}">
                ${expandCollapse}
                <span class="dc_NativeHandle_TypeName" NativeHandle="${item.NativeHandle}"> ${item.NativeHandle + " - " + item.TypeName}</span>
            </div>
            `
            parentElement.appendChild(elementDom);
            parentElement.setAttribute('isShow', 'true');
            parentElement.className = "parentElement"
            elementDom.style['margin-left'] = 50 + 'px';
            try {
                this.renderNodes(item, elementDom);
            } catch (error) {
                console.log(error)
            }

        });

    }

    getDocumentDomStructure(ctl) {
        return ctl.GetDocumentDomStructure() || null;
    }
}
