//*************************************************************************
//* 项目名称：
//* 当前版本: V 5.3.1
//* 开始时间: 20230802
//* 开发者:李新宇
//* 重要描述:用于演示文档中拖拽元素的事件
//*************************************************************************
//* 最后更新时间:2023-8-2
//* 最后更新人:李新宇
//*************************************************************************
class DragElement {
    constructor(options) {
        this.dragData = null
    }
    LoadDragElementHtml() {
        let DragHtml = ``;
        for (var i = 0; i < this.dragData.length; i++) {
            let item = this.dragData[i]
            DragHtml += `
            <div class="dragElementItem"> 
                <p title="${item.NodeText}" class="dragElementItemNodeText" attrId="${item.id}"><img class="wjjImg" src="../../img/wjj.png"/>${item.NodeText}</p>
                <div id="${item.id}"></div>
            </div>
            `
        }
        document.getElementById('DragElementListContent').innerHTML = DragHtml
    }
    setClickZContainer(e) {
        let { target } = e
        let id = target.getAttribute('attrId')
        if (document.getElementById(id).innerHTML === '') {
            this.dragData.map(item => {
                if (item.id === id) {
                    console.log(item.ChildNodes)
                    let dragChildrenItem = ``
                    item.ChildNodes.map(file => {
                        dragChildrenItem += `
                        <p class="dragChildrenItem"><img class="fileTextImg" src="../../img/shurukuang.png" /><span draggable="true"  title="${file.NodeText}" id="${file.ID}"> ${file.NodeText}</span></p>
                        `
                    })
                    document.getElementById(id).innerHTML = dragChildrenItem
                }
            })
        } else {
            document.getElementById(id).style.display = document.getElementById(id).style.display === 'none' ? 'block' : 'none'
        }
    }
    getDragData() {
        $.ajax({
            url: 'http://115.29.175.38:8080/api/dcdictionaryinfo/dcgetallstandarddatasource',
            success: (data) => {
                if (data && data.Obj && data.Obj.m_StringValue) {
                    let { m_StringValue } = data.Obj
                    let arr = JSON.parse(m_StringValue);
                    //给数据添加id
                    for (var i = 0; i < arr.length; i++) {
                        arr[i]['id'] = (i + new Date().valueOf()).toString()
                    }
                    this.dragData = arr
                    this.LoadDragElementHtml()
                }
            }
        })
    }

}
// export default 