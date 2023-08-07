//*************************************************************************
//* 项目名称：
//* 当前版本: V 5.3.1
//* 开始时间: 20230703
//* 开发者:李新宇
//* 重要描述:WriterControl_Dialog对话框的静态资源和css样式
//*************************************************************************
//* 最后更新时间:2023-7-3 15:23
//* 最后更新人:李新宇
//*************************************************************************

//对话框的样式
let DIALOGSTYLE = `
    #dialogMark{
        width: 100%;
        height: 100%;
        background-color: #000000;
        position: relative;
        z-index: 10000;
        top: -100%;
        opacity: 0.2;
    }
    #dialogContainer,#dialogContainer1,#dialogContainer2{
        display: block;
        width: 400px;
        overflow: hidden;
        text-align: left;
        margin: 0;
        border: 0;
        border-radius: 6px;
        position: relative;
        top: -160%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;
        user-select: none;
        box-shadow: 0 1px 6px rgba(0,0,0,.15);
        background: #fff;
        box-sizing: border-box;
        font-size: 12px;
    }
    #dialogContainer *,
    #dialogContainer ::after,
    #dialogContainer ::before { 
        box-sizing: border-box;
        margin: 0;
        outline: none;
    }
    #dialogContainer button,
    #dialogContainer input,
    #dialogContainer optgroup,
    #dialogContainer select,
    #dialogContainer textarea {
        line-height: normal;
    }
    #dialogContainer [type=button],
    #dialogContainer [type=reset],
    #dialogContainer [type=submit],
    #dialogContainer button {
        -webkit-appearance: button;
        border-width: 1px;
    }
    #dialogContainer label {
        display: inline-block;
    }
    #dialogContainer table {
        width: 96%;
        margin-left: 2%;
        border-collapse: collapse;
        table-layout: fixed;
    }
    #dialogContainer td,
    #dialogContainer th {
        word-wrap: break-word;
        text-align: center;
        font-size: 12px;
        border: 1px solid black;
    }
    #dialogContainer textarea {
        border: 1px solid #ccc;
        resize: none;
    }
    /* 对话框标头部分 */
    #dialogContainer #dcPanelHeader{
        background: linear-gradient(to bottom,#ffffff 0,#eeeeee 100%);
        padding: 6px;
        position: relative;
        border-bottom: 1px solid #c6c6c6;
    }
    #dialogContainer .dcHeader-title{
        font-size: 12px;
        font-weight: bold;
        color: #0E2D5F;
        height: 16px;
        line-height: 16px;
        padding-left: 18px
    }
    #dialogContainer .dcHeader-tool{
        right: 5px;
        width: auto;
        position: absolute;
        top: 50%;
        margin-top: -8px;
        height: 16px;
        overflow: hidden;
    }
    #dialogContainer .dcHeader-tool a{
        display: inline-block;
        width: 16px;
        height: 16px;
        opacity: 0.6;
        filter: alpha(opacity=60);
        margin: 0 0 0 2px;
        vertical-align: top;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4jWNkgII5IUH/BW/sYCAGvNfwYEhZsw6sF0ys1eH6b2AiyiBvIsTw79sfgkY8vvaJ4cKZ1wzBV74xMoJsduQ5yyCrxcfw89pnolwANuTtL4Zj7BYMLCBny8YpgzV/+fib4f2f/2AFgiyMKBrQxUE0SC8TiAOzGaRIc9NTMD7/+S9cM4gNE4cZxMPPCqbBBrxi+A+2HRl47n4O1gjCIDY6gKmHuOAtxOkgZ213lYQrBWlE1owsB3MJE0wA5jdDXmYUhciaQXIgdTDNKAYgCxID2IWRwuAdExPcEFx+hoUJzKLn7/+iugAEHnz/h+Fn9DABqUEGTI+5hBiQXYGsWYGTCYzRwwRZLeMEM5n/anzYky8fNwuY/vQVVR4k/kyWh+HZqS8MTDxyZgy3PkEUvhXhQlEI0oisGSQPwiDNP9/8YgDpBccdyBXCSmxgRewiEBofAGl+e+8XQ8GpJ4zwBJ+dnf1f9fRGgppB4LapP8PUqVMZGRgYGADODLn9wgQgMgAAAABJRU5ErkJggg==) no-repeat;
    }
    #dialogContainer .dcHeader-tool a:hover{
        opacity: 1;
        filter: alpha(opacity=100);
        background-color: #eaf2ff;
        -moz-border-radius: 3px 3px 3px 3px;
        -webkit-border-radius: 3px 3px 3px 3px;
        border-radius: 3px 3px 3px 3px;
    }
    /* 对话框正文公共样式 */
    #dialogContainer #dcPanelBody{
        padding: 10px;
        background: rgb(250, 250, 250);
        height: 300px;
        color: #000000;
        font-size: 12px;
        overflow: auto;
        border-top-width: 0;
    }
    #dialogContainer #dcPanelBody .dcTitle-line{
        border-top: 1px solid #ccc;
        display: inline-block;
        width: calc(100% - 40px);
        text-align: center;
        vertical-align: middle;
    }
    #dialogContainer #dcPanelBody .dcBody-content{
        padding: 10px 10px 0;
    }
    #dialogContainer .dcNumberbox{
        box-sizing: border-box;
        position: relative;
        border: 1px solid #95B8E7;
        background-color: #fff;
        vertical-align: middle;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        margin: 0;
        padding: 0;
        -moz-border-radius: 5px 5px 5px 5px;
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
    }
    #dialogContainer .dcNumberbox-right{
        position: absolute;
    }
    #dialogContainer .dcNumberbox-icon{
        box-sizing: border-box;
        background: 0 0;
        color: #134da5;
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
        background-position: center center;
        cursor: pointer;
        text-decoration: none;
        outline-style: none;
        opacity: 1.0;
            
    }
    #dialogContainer .dcNumberbox-top,.dcNumberbox-bottom{
        box-sizing: border-box;
        overflow: hidden;
        vertical-align: top;
        margin: 0;
        padding: 0;
        background-color: #E0ECFF;
        position: relative;
        display: block;
        width: 100%;
        height: 50%;
        cursor: pointer;
        opacity: 0.6;
    }
    #dialogContainer .dcNumberbox-arrow-up,.dcNumberbox-arrow-down{
        box-sizing: border-box;
        display: block;
        font-size: 1px;
        color: #444;
        outline-style: none;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAXElEQVR42mNgGAWjYBQMViA77cV/EB4NgJHqgAG1H2Y5KY7Ap55UswY0ANA9T2kgEGsGLnuJdQel+in2AKUBOOABQM0kTE7qGXa1AKUeGK0GRwNghAfAKBgFtAcA6XQOoD36cvIAAAAASUVORK5CYII=) no-repeat 1px center;
        opacity: 1.0;
        cursor: pointer;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-top: -8px;
        margin-left: -8px;
        position: absolute;
        background-color: transparent;
    }
    #dialogContainer .dcNumberbox-arrow-down{
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAXElEQVR42mNgGAWjYBQMViA77cV/EB4NgJHqgAG1H2Y5KY7Ap55UswY0ANA9T2kgEGsGLnuJdQel+in2AKUBOOABQM0kTE7qGXa1AKUeGK0GRwNghAfAKBgFtAcA6XQOoD36cvIAAAAASUVORK5CYII=) no-repeat -15px center;
    }
    #dialogContainer .dcNumberbox-top:hover,.dcNumberbox-bottom:hover{
        opacity: 1.0;
        background-color: #eaf2ff;
    }
    #dialogContainer .dcNumberbox-arrow-up:hover,.dcNumberbox-arrow-up:hover{
        background-color: transparent;
    }
    #dialogContainer .dcNumberbox_input{
        box-sizing: border-box;
        border-radius: 5px 5px 5px 5px;
        font-size: 14px;
        border: 0;
        padding: 0 4px;
        white-space: normal;
        vertical-align: top;
        outline-style: none;
        resize: none;
    }
    /* 设置间距 */
    #dialogContainer .gap-width{
        display: inline-block;
        width: 20px;
    }
    #dialogContainer input[type=checkbox],input[type=radio]{
        vertical-align: middle;
    }
    /* 表格滚动的样式 */
    #dcPanelBody .scroll-table thead tr,
    #dcPanelBody .scroll-table tbody tr {
        box-sizing: border-box;
        table-layout: fixed;
        display: table;
        width: 100%;
    }
    #dcPanelBody .scroll-table thead {
        display: block;
        width: calc(100% - 17px);
        /*这里的17px是滚动条的宽度*/
    }
    #dcPanelBody .scroll-table tbody {
        display: block;
        /* width: calc(100% + 17px); 这里的17px是滚动条的宽度 */
        height: 200px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    #dcPanelBody .blockelement{
        display: block;
    }
    #dcPanelBody .blockElement .fullWidth{
        width: 100%;
        margin: 5px 0;
    }
    /* 对话框底部部分 */
    #dialogContainer #dcPanelFooter,#dialogContainer1 #dcPanelFooter1,#dialogContainer2 #dcPanelFooter2{
        box-sizing: border-box;
        text-align: center;
        background: rgb(250, 250, 250);
        padding: 6px;
        border-top: 1px solid #c6c6c6;
    }
    /* 按钮 */
    #dialogContainer .dclinkbutton,#dialogContainer1 .dclinkbutton,#dialogContainer2 .dclinkbutton{
        box-sizing: border-box;
        text-decoration: none;
        display: inline-block;
        overflow: hidden;
        margin: 0;
        padding: 0;
        cursor: pointer;
        outline: none;
        text-align: center;
        vertical-align: middle;
        line-height: normal;
        border-radius: 5px;
        background: linear-gradient(to bottom,#ffffff 0,#eeeeee 100%);
        background-repeat: repeat-x;
        border: 1px solid #bbb;
        color: #444;
        opacity: 0.9;
        filter: alpha(opacity=90);
        
    }
    #dialogContainer .dclinkbutton:hover{
        color: #000000;
        border: 1px solid #666666;
        filter: none;
        opacity: 1.0;
        filter: alpha(opacity=100);
    }
    #dialogContainer .dcButton-left{
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        overflow: hidden;
        margin: 0;
        padding: 0;
        vertical-align: top;
    }
    #dialogContainer .dcButton-text{
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        width: auto;
        line-height: 28px;
        font-size: 12px;
        padding: 0;
        margin: 0 10px;
    }
    
    /* 页面设置样式 */
    #dcPanelBody.DocumentSettings .setting-section {
        margin-top: 8px;
    }
    #dcPanelBody.DocumentSettings .setting-left {
        display: inline-block;
        width: 88px;
        height: 100%;
        vertical-align: middle;
    }
    #dcPanelBody.DocumentSettings .setting-name {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        line-height: 36px;
    }
    #dcPanelBody.DocumentSettings .setting-right {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    #dcPanelBody.DocumentSettings .radioBtn {
        position: relative;
        display: inline-block;
        line-height: 36px;
        cursor: pointer;
    }
    #dcPanelBody.DocumentSettings .btnSelect {
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        border-style: solid;
        border-width: 1px;
        border-radius: 50%;
        border-color: #d4d4d4;
        box-sizing: border-box;
        vertical-align: top;
    }
    #dcPanelBody.DocumentSettings .setting-right>.radioBtn>span {
        display: inline-block;
        line-height: 36px;
        margin-left: 25px;
        cursor: default;
    }
    #dcPanelBody.DocumentSettings .selected {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border-width: 4px;
        border-style: solid;
        border-color: transparent;
        border-radius: 50%;
        background: #0188fb;
        background-clip: content-box;
        display: none;
    }
    #dcPanelBody.DocumentSettings .setting-select {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    #dcPanelBody.DocumentSettings .select-button {
        width: 182px;
        height: 30px;
        text-indent: 5px;
    }
    #dcPanelBody.DocumentSettings .select-button>option {
        font-size: 14px;
    }
    #dcPanelBody.DocumentSettings .number-input {
        position: relative;
        height: 36px;
        display: inline-block;
    }
    #dcPanelBody.DocumentSettings .pad-input {
        border: 1px solid #d4d4d4;
        font-size: 14px;
        padding: 10px;
        box-sizing: border-box;
        height: 36px;
        outline: none;
    }
    #dcPanelBody.DocumentSettings .pad-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    #dcPanelBody.DocumentSettings .pad-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        /* 有无看不出差别 */
    }
    #dcPanelBody.DocumentSettings .height-top {
        position: absolute;
        top: 1px;
        right: 1px;
        height: 17px;
        width: 12px;
        display: none;
    }
    #dcPanelBody.DocumentSettings .height-top:hover {
        background: #e1e2e3;
    }
    #dcPanelBody.DocumentSettings .width-top {
        position: absolute;
        top: 1px;
        right: 1px;
        height: 17px;
        width: 12px;
        display: none;
    }
    #dcPanelBody.DocumentSettings .width-top:hover {
        background: #e1e2e3;
    }
    #dcPanelBody.DocumentSettings .carrow-top {
        position: absolute;
        top: 50%;
        left: 50%;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 4px solid #8c9093;
        transform: translate(-50%, -50%);
    }
    #dcPanelBody.DocumentSettings .height-bottom {
        position: absolute;
        right: 1px;
        bottom: 1px;
        height: 17px;
        width: 12px;
        background: #f5f5f5;
        display: none;
    }
    #dcPanelBody.DocumentSettings .width-bottom {
        position: absolute;
        right: 1px;
        bottom: 1px;
        height: 17px;
        width: 12px;
        background: #f5f5f5;
        display: none;
    }
    #dcPanelBody.DocumentSettings .carrow-bottom {
        position: absolute;
        top: 50%;
        left: 50%;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-top: 4px solid #8c9093;
        transform: translate(-50%, -50%);
    }
    #dcPanelBody.DocumentSettings .width-bottom:hover {
        background: #e1e2e3;
    }
    #dcPanelBody.DocumentSettings .height-bottom:hover {
        background: #e1e2e3;
    }
    
    /* 网格线样式 */
    #dcPanelBody.DocumentGridLine form {
        padding: 5px 0 0 15px;
    }
    #dcPanelBody.DocumentGridLine form span.txt{
        display: inline-block;
        width: 100px;
    }
    #dcPanelBody.DocumentGridLine form .changewidth [data-text]{
        width: 200px;
        height: 27px;
    }
    
    /* 装订线样式 */
    #dcPanelBody.DocumentGutter .GutterStyleDiv label{
        margin-left: 20px;
    }
    
    /* 单复选框样式,准备复用 */
    #dcPanelBody label.flex {
        display: flex;
    }
    #dcPanelBody label.flex span.dcTitle-text {
        display: inline-block;
        width: 80px;
    }
    #dcPanelBody label.flex .full {
        flex: 1;
    }
    #dcPanelBody .checkboxs {
        margin: 5px 0;
    }
    #dcPanelBody .checkboxs label {
        display: inline-block;
        width: 30%;
        margin-bottom: 5px;
        white-space: nowrap;
    }
    #dcPanelBody .needDialog {
        display: flex;
    }
    #dcPanelBody .needDialog input {
        flex: 1;
        margin-right: 5px;
    }
    #dcPanelBody .Box,#dcPanelBody1 .Box {
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        position: relative;
    }
    #dcPanelBody .Box h6.title,#dcPanelBody1 .Box h6.title {
        margin: 0;
        background-color: #fff;
        position: absolute;
        top: -9px;
        font-size: 12px;
        font-weight: 700;
    }
    
    /* 插入单复选框样式 */
    #dcPanelBody.InsertMultipleCheckBoxOrRadio .IsRadioBox label span {
        vertical-align: middle;
    }
    #dcPanelBody.InsertMultipleCheckBoxOrRadio .IsRadioBox label.firstRadio {
        margin-right: 25px;
    }
    #dcPanelBody.InsertMultipleCheckBoxOrRadio #ListItems {
        border-collapse: collapse;
        font-size: 14px;
        overflow: hidden;
    }
    #dcPanelBody.InsertMultipleCheckBoxOrRadio #ListItems th {
        padding: 5px;
        text-align: left;
    }
    #dcPanelBody.InsertMultipleCheckBoxOrRadio #ListItems td input {
        outline: none;
        border: none;
        padding: 5px;
        width: 100%;
    }
    #dcPanelBody.InsertMultipleCheckBoxOrRadio #ListItems td.delete,
    #dcPanelBody.InsertMultipleCheckBoxOrRadio #ListItems th.last {
        width: 40px;
        text-align: center;
    }
    #dcPanelBody.InsertMultipleCheckBoxOrRadio #ListItems td.delete {
        padding: 0;
        cursor: pointer;
        font-size: 16px;
    }
    
    /* 标签文本样式,复用 */
    #dcPanelBody .blockelement textarea{
        width: 100%;
        height: 160px;
        margin-top: 4px;
        padding: 5px;
        outline: none;
    }
    
    /* 页码样式 */
    #dcPanelBody.HorizontalLineElement ul#ValueType{
        background-color: #fff;
        width: 100%;
        border: 1px solid #000;
        margin: 5px 0;
        padding: 5px;
    }
    #dcPanelBody.HorizontalLineElement ul#ValueType li{
        list-style: none;
        padding: 5px;
    }
    #dcPanelBody.HorizontalLineElement .active{
        background: #0078D7;
        color: #FFFFFF
    }
    #dcPanelBody.HorizontalLineElement .minflex .dcTitle-text{
        min-width: 80px;
        width: auto;
    }
    #dcPanelBody.HorizontalLineElement .Newline{
        width: 100%;
    }
    #dcPanelBody.HorizontalLineElement .Newline input.full{
        width: 100%;
        margin: 5px 0;
    }
    
    /* 按钮样式 */
    #dcPanelBody .imgButtonBox{
        line-height: 40px;
    }
    #dcPanelBody label.imgButtonBox span.dcTitle-text{
        width: 100px;
    }
    #dcPanelBody .imgButtonBox [data-value="img"]{
        position: relative;
        height: 40px;
        overflow: hidden;
    }
    #dcPanelBody .imgButtonBox [data-value="img"] img{
        width: 100%;
        height: 100%;
    }
    #dcPanelBody .imgButtonBox [data-value="img"] [type="file"]{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    #dcPanelBody.ButtonElement .blockelement textarea[data-text="Text"]{
        height: 55px;
    }
    
    /* 二维码样式 */
    #dcPanelBody.QRCodeElement textarea{
        height: 100px;
    }
    
    /* 条形码样式 */
    #dcPanelBody.BarcodeElement label.flex span.dcTitle-text{
        width: 85px;
    }
    
    /* 修改图片属性对话框样式 */
    #dcPanelBody.ImageElement #image_box .imgDiv{
        height: 200px;
        border: 1px solid #000;
        margin: 5px 0;
        user-select: none;
        overflow: scroll;
    }
    
    /* 字体样式 */
    .font-content-dialog{
        display: flex;
        justify-content: space-around;
        margin-bottom: 5px;
    }
    #font-content-dialog #font-ul-content,#font-size-ul-content{
        height:160px;
    }
    .font-style-box{
    
    }
    #dcPanelBody.fontStyleElement .font-box{
        width:46%; 
        height: 100%;
    }
    #dcPanelBody.fontStyleElement .font-box input{
        width: 100%;
     }
    #dcPanelBody.fontStyleElement .ul-content{
        border: 1px solid #666666;
        list-style: none;
        height: 200px;
        padding-left: 0px;
        overflow: auto;
    }
    #dcPanelBody.fontStyleElement .ul-content li{
        padding: 0 5px;
    }
    #dcPanelBody.fontStyleElement #font-check-box{
        margin-top:20px;
    }
    #dcPanelBody.fontStyleElement #font-check-box .font-style-content-dialog{
        margin-top:20px;
    }
    #dcPanelBody.fontStyleElement #font-check-box .font-style-content-dialog .Body-V{
        margin-right:20px;
        display: inline-block;
    }
    #dialogContainer .Body-V input[type=checkbox]{
        vertical-align: text-top;
        margin: 0 2px;
    }
    /* 胎心图值样式 */
    #dialogContainer .FetalHeartElement table{
        width: 100%;
        margin: 0;
        border-collapse: collapse;
        table-layout: inherit;
    }
     #fetal-heart-table td,  #fetal-heart-table th{
        border:none;
    }
    #fetal-heart-table .fetal-heart-table-line-td{
        border:none;
    }
    #fetal-heart-table .fetal-heart-table-input{
        padding-bottom: 5px;
    }
    #fetal-heart-table .fetal-heart-table-input > input{
        width:130px
    }
    #fetal-heart-table .fetal-heart-table-td-border{
        border-color: #000000;
        border-top-style: solid; 
        border-width:3px;
        width:10px;
    }
    #fetal-heart-table .fetal-heart-table-border-right{
        border-color: #000000;
        border-bottom-style: solid;
         border-right-style: solid; 
         border-width:3px;
    }
    #fetal-heart-table .fetal-heart-table-border-left{
        border-color: #000000;
        border-left-style: solid; 
        border-bottom-style: solid; 
        border-width:3px;
    }
    #fetal-heart-table .fetal-heart-table-border-top-right{
        border-top-style: solid; 
        border-right-style: solid; 
        border-width:3px; 
        border-top-color: #000000; 
        border-right-color: #000000;
        width:10px;
    }
    #fetal-heart-table .fetal-heart-table-border-top-left{
        border-top-style: solid; 
        border-left-style: solid; 
        border-width:3px; 
        border-top-color: #000000; 
        border-left-color: #000000;
        width:10px;
    }
    #dialogContainer .FetalHeartElement  #fetal-heart-table  .fetal-heart-table-border-bottom{
        border-color: #000000;
        border-bottom-style: solid; 
        border-width:3px;
    }
    #fetal-heart-table .fetal-heart-table-input.table-input-border-top{
        border-color: #000000; border-width:3px
    }
    /* 0-10之间的数字样式 */
    #dialogContainer #dcPanelBody.PainIndexElement{
        padding: 24px;
    }
    /* 分数值样式 */
    #dialogContainer .FractionElement td, #dialogContainer .FractionElement th{
        border:none;
    }
    #dialogContainer .FractionElement table{
        width:auto;
    }
    /* 月经史值1样式 */
    #dialogContainer .FourValuesElement td, #dialogContainer .FourValuesElement th{
        border:none;
    }
    #dialogContainer #dcPanelBody.FourValuesElement{
        width:100%;
    }
    #dialogContainer #dcPanelBody.FourValuesElement table{
        margin:0;
    }
    /* 月经史值2样式 */
    #dialogContainer #dcPanelBody.FourValues1Element table{
        width:100%;
        margin:0;
    }
    #dialogContainer #dcPanelBody.FourValues1Element td,
    #dialogContainer #dcPanelBody.FourValues1Element th{
        border:none;
    }
    /* 月经史值3样式 */
    #dialogContainer .FourValues2Element td, #dialogContainer .FourValues2Element th{
        border:none;
    }
    #dialogContainer .FourValues2Element table{
        width:100%;
        margin:0;
    }
    /* 月经史值4样式 */
    #dialogContainer .ThreeValuesElement td, #dialogContainer .ThreeValuesElement th{
        border:none;
    }
    /* 瞳孔图值样式 */
    #dialogContainer .PupilElement td, #dialogContainer .PupilElement th{
        border:none;
    }
    /* 光定位值样式 */
    #dialogContainer .LightPositioningElement td, #dialogContainer .LightPositioningElement th{
        border:none;
    }
    /* 恒牙牙位图样式 */
    #dialogContainer .PermanentTeethBitmapElement td, #dialogContainer .PermanentTeethBitmapElement th{
        border:none;
    }
    #dialogContainer .PermanentTeethBitmapElement table{
        margin:0;
    }
    #dialogContainer #dcPanelBody.PermanentTeethBitmapElement{
        width:100%;
    }
    
    /* 乳牙牙位图样式 */
    #dialogContainer .DeciduousTeechElement td, #dialogContainer .DeciduousTeechElement th{
        border:none;
    }
    #dialogContainer .DeciduousTeechElement table{
        margin:0;
    }
    #dialogContainer #dcPanelBody.DeciduousTeechElement{
        width:100%;
    }
    
    /* 执行命令对话框样式 */
    #dcPanelBody.DCExecuteCommandsElement #DCExecuteCommandTable {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        overflow-y: scroll;
    }
    #dcPanelBody.DCExecuteCommandsElement th {
        position: sticky;
        top: 0;
        background-color: #f2f2f2;
    }
    #dcPanelBody.DCExecuteCommandsElement th,
    #dcPanelBody.DCExecuteCommandsElement td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    #dcPanelBody.DCExecuteCommandsElement tr:last-child td {
        border-bottom: 1px solid black;
    }
    #dcPanelBody.DCExecuteCommandsElement tr.ClickLine {
        background-color: #0078D7;
        color: #fff;
    }
    
    /* 查找和替换样式 */
    #dcPanelBody.SearchAndReplace .dcBody-contents {
        display: flex;
    }
    #dcPanelBody.SearchAndReplace .dcBody-contents .Box {
        width: 40%;
    }
    #dcPanelBody.SearchAndReplace .dcBody-contents .checkboxs {
        margin-top: 10px;
        width: 60%;
        padding-left: 20px;
        padding-top: 5px;
    }
    #dcPanelBody.SearchAndReplace .dcBody-contents .Box .dcBody-content {
        display: flex;
        justify-content: space-between;
        height: 100%;
    }
    #dcPanelBody.SearchAndReplace .dcBody-contents .Box .dcBody-content label {
        padding-top: 16px;
    }
    /*批注样式*/ 
    #dcPanelBody.EditDocumentComments{
            display: flex;
        flex-direction: column;
    }
    .InputFieldContent .tab1Content{
        display: flex;
        flex-wrap: wrap;
    }
    .InputFieldContent .tab1Content > label{
        width:50%
    }
    .InputFieldElement .InputFieldContent .tab1Content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab1Content > label{
        width: 48%;
        box-sizing: border-box;
        display: flex;
        height: 20px;
        margin-bottom: 10px;
        line-height: 20px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab1Content > label > input,select{
        width:60%;
        height:20px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab1Content > label > span{
        width:42%;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab1Content > .borderBox{
        width:60%;
        display: flex; 
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab2Content{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab2Content > label{
        width:48%;
        line-height:20px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab3Content{
        display: flex;
        flex-direction: column;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab3Content > label{
        line-height:20px;
        display:flex;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab3Content > label > span{
        width:84px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab3Content > label > input{
        height:20px;
        width:124px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .tab3Content{
        display: flex;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .buttonBox{
        height: 28px;
        width: 100%;
        display: flex;
        line-height: 28px;
        margin-bottom: 18px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .buttonBox > span{
        width: 50px;
        text-align: center;
        background:#e1e1e1;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent .buttonBox > span.active{
        background: #fff;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent #tab2{
        display: flex;
        flex-direction: column;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent #tab2 label{
        line-height:28px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent #tab2 .Check-box{
            display: flex;
            flex-wrap:wrap;       
            padding-left: 20px;
            box-sizing: border-box;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent #tab2 .Check-box > label{
            line-height:22px;
    }
    #dcPanelBody.InputFieldElement .InputFieldContent #tab3 > label{
        margin-bottom:16px;
    }
    
    #dcPanelBody.InputFieldElement .InputFieldContent #tab4 > .Box >label {
        margin-bottom:8px;
    }
    
    #dialogContainer1 .dcHeader-tool,#dialogContainer2 .dcHeader-tool{
        right: 5px;
        width: auto;
        position: absolute;
        top: 25%;
        margin-top: -8px;
        height: 16px;
        overflow: hidden;
    }
    #dialogContainer1 .dcHeader-tool a{
        display: inline-block;
        width: 16px;
        height: 16px;
        opacity: 0.6;
        filter: alpha(opacity=60);
        margin: 0 0 0 2px;
        vertical-align: top;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4jWNkgII5IUH/BW/sYCAGvNfwYEhZsw6sF0ys1eH6b2AiyiBvIsTw79sfgkY8vvaJ4cKZ1wzBV74xMoJsduQ5yyCrxcfw89pnolwANuTtL4Zj7BYMLCBny8YpgzV/+fib4f2f/2AFgiyMKBrQxUE0SC8TiAOzGaRIc9NTMD7/+S9cM4gNE4cZxMPPCqbBBrxi+A+2HRl47n4O1gjCIDY6gKmHuOAtxOkgZ213lYQrBWlE1owsB3MJE0wA5jdDXmYUhciaQXIgdTDNKAYgCxID2IWRwuAdExPcEFx+hoUJzKLn7/+iugAEHnz/h+Fn9DABqUEGTI+5hBiQXYGsWYGTCYzRwwRZLeMEM5n/anzYky8fNwuY/vQVVR4k/kyWh+HZqS8MTDxyZgy3PkEUvhXhQlEI0oisGSQPwiDNP9/8YgDpBccdyBXCSmxgRewiEBofAGl+e+8XQ8GpJ4zwBJ+dnf1f9fRGgppB4LapP8PUqVMZGRgYGADODLn9wgQgMgAAAABJRU5ErkJggg==) no-repeat;
    }
    #dialogContainer2 .dcHeader-tool a{
        display: inline-block;
        width: 16px;
        height: 16px;
        opacity: 0.6;
        filter: alpha(opacity=60);
        margin: 0 0 0 2px;
        vertical-align: top;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4jWNkgII5IUH/BW/sYCAGvNfwYEhZsw6sF0ys1eH6b2AiyiBvIsTw79sfgkY8vvaJ4cKZ1wzBV74xMoJsduQ5yyCrxcfw89pnolwANuTtL4Zj7BYMLCBny8YpgzV/+fib4f2f/2AFgiyMKBrQxUE0SC8TiAOzGaRIc9NTMD7/+S9cM4gNE4cZxMPPCqbBBrxi+A+2HRl47n4O1gjCIDY6gKmHuOAtxOkgZ213lYQrBWlE1owsB3MJE0wA5jdDXmYUhciaQXIgdTDNKAYgCxID2IWRwuAdExPcEFx+hoUJzKLn7/+iugAEHnz/h+Fn9DABqUEGTI+5hBiQXYGsWYGTCYzRwwRZLeMEM5n/anzYky8fNwuY/vQVVR4k/kyWh+HZqS8MTDxyZgy3PkEUvhXhQlEI0oisGSQPwiDNP9/8YgDpBccdyBXCSmxgRewiEBofAGl+e+8XQ8GpJ4zwBJ+dnf1f9fRGgppB4LapP8PUqVMZGRgYGADODLn9wgQgMgAAAABJRU5ErkJggg==) no-repeat;
    }
    #dialogContainer1 .dcHeader-tool a:hover{
        opacity: 1;
        filter: alpha(opacity=100);
        background-color: #eaf2ff;
        -moz-border-radius: 3px 3px 3px 3px;
        -webkit-border-radius: 3px 3px 3px 3px;
        border-radius: 3px 3px 3px 3px;
    }
    #dialogContainer2 .dcHeader-tool a:hover{
        opacity: 1;
        filter: alpha(opacity=100);
        background-color: #eaf2ff;
        -moz-border-radius: 3px 3px 3px 3px;
        -webkit-border-radius: 3px 3px 3px 3px;
        border-radius: 3px 3px 3px 3px;
    }
    #dialogContainer1 .dcHeader-tool,#dialogContainer2 .dcHeader-tool{
        top:14px;
    }
    #dialogContainer1 .dclinkbutton,#dialogContainer2 .dclinkbutton{
        width:36px;
        height:30px;
    }
    #dialogContainer1 #dcPanelBody1,#dialogContainer2 #dcPanelBody2{
        height:500px;
        padding: 10px;
        background: rgb(250, 250, 250);
        height: 300px;
        color: #000000;
        font-size: 12px;
        overflow: auto;
        border-top-width: 0;
        box-sizing:border-box;
    }
    #dcPanelBody1.InputFieldElement .InputFieldContent   #batchPlanTable tbody,
    #batchPlanTable td,
    #batchPlanTable tfoot,
    #batchPlanTable th,
    #batchPlanTable thead,
    #batchPlanTable tr,
    #attr-table-box td,
    #attr-table-box tfoot,
    #attr-table-box th,
    #attr-table-box thead,
    #attr-table-box tr{
        border: 1px solid #d3d3d3;
    }
    .cellGridlineBox,.cellGridlineContent{
        display: flex;
        flex-direction: column;
    }
    .cellGridlineContent{
        margin-left:10px;
    }
    .cellGridlineBox-span{
        width:100px;
        display: inline-block;
        line-height: 30px;
    }
    .cellGridlineBox-input{
        display: inline-block;
        width: 206px;
    }
    
    .cellDiagonalLineBox #slantsplitlinestyle {
        border: 1px solid #858585;
        flex: 1;
        height: 20px;
        line-hright:20px;
    }
    .cellDiagonalLineBox > div{
        display:flex;
    }
    .cellDiagonalLineBox > div > span{
        display:inline-block;
        line-height:50px;
    }
    .cellDiagonalLineBox #None .None,
    .cellDiagonalLineBox #TopLeftOneLine .TopLeftOneLine,
    .cellDiagonalLineBox #TopLeftTwoLines .TopLeftTwoLines,
    .cellDiagonalLineBox #TopRightOneLine .TopRightOneLine,
    .cellDiagonalLineBox #TopRightTwoLines .TopRightTwoLines,
    .cellDiagonalLineBox #BottomRightOneLine .BottomRightOneLine,
    .cellDiagonalLineBox #BottomRigthTwoLines .BottomRigthTwoLines,
    .cellDiagonalLineBox #BottomLeftOneLine .BottomLeftOneLine,
    .cellDiagonalLineBox #BottomLeftTwoLines .BottomLeftTwoLines
    {
        border: 1px solid #858585;
        width:100px;
        height:50px;
        margin: 5px 10px 5px 0;
    }

    /* 图片编辑界面元素 */
    #dialogContainer #dcPanelBody.imgEdit div::-webkit-scrollbar {
        width: 13px;
        height: 13px;
    }
    #dialogContainer #dcPanelBody.imgEdit div::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, .4);
        background-clip: padding-box;
        border: 3px solid transparent;
        border-radius: 7px;
    }
    #dialogContainer #dcPanelBody.imgEdit div::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
    #dialogContainer #dcPanelBody.imgEdit div::-webkit-scrollbar-track {
        background-color: #fff;
    }
    #dialogContainer #dcPanelBody.imgEdit div::-webkit-scrollbar-track:hover {
        background-color: #f8fafc;
    }
    #dialogContainer #dcPanelBody.imgEdit button,
    #dialogContainer #dcPanelBody.imgEdit input {
        padding: 5px;
        font-size: 12px;
        cursor: pointer;
    }
    #dialogContainer #dcPanelBody.imgEdit #wrap {
        cursor: default;
        overflow: auto;
        width: 100%;
        height: 320px;
        border: #666 1px solid;
        background: #999;
        position: relative;
    }
    .InsertSpecifyCharacter .tabButtonItem {
        border: 1px solid #ccc;
        padding: 4px 8px;
        margin-bottom: -1px !important;
        margin-left: -1px !important;
        background: #fff;
        cursor: pointer;
    }
    .InsertSpecifyCharacter .tabButtonItem.active{
        border-bottom:none;
    }
    .InsertSpecifyCharacter #tabButton{
        display: flex;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
    }
   .InsertSpecifyCharacter #tabDomBox{
        border: 1px solid #ccc;
        border-top: 0;
        overflow: auto;
        font-size: 14px;
   }
   .InsertSpecifyCharacter  .tabDomBoxItem{
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        height:440px;
        align-content: flex-start
   }
   .InsertSpecifyCharacter  .tabDomBoxItem .charSpanDomItem{
        width: 10%;
        height: 28px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        display: inline-block;
   }
   .InsertSpecifyCharacter  .tabDomBoxItem .charSpanDomItem:hover{
        color:#9bbbe3;
   }
   .tabDomBoxItem#MedicalCharacters .charSpanDomItem{
        width:14%;
   }
   .EyeballProtrusion .EyeballProtrusionBox{
        width:100%;
        height:100%;
        display:flex;
   }
   .EyeballProtrusion .EyeballProtrusionBox .EyeballProtrusionContainerLeft,
   .EyeballProtrusion .EyeballProtrusionBox .EyeballProtrusionContainerRight{
        width:100px;
        position: absolute; 
        z-index:9;
   }
   .EyeballProtrusion .EyeballProtrusionBox .EyeballProtrusionContainerLeft{
        top: 106px;
        left: 30px;
   }
   .EyeballProtrusion .EyeballProtrusionBox .EyeballProtrusionContainerRight{
        right: 15px;
        top: 106px;
   }
   .EyeballProtrusion .EyeballProtrusionBox .EyeballProtrusionContainerCenter{
        width:100%;
   }
   .EyeballProtrusion .EyeballProtrusionBox .LineBox .line{
        border-top: 2px solid #000;
   }
   .EyeballProtrusion .EyeballProtrusionBox .LineBox {
        position: relative;
        height: 90%;
        left: 0;
        top: 0;
       width: 100%;
   }
   .EyeballProtrusion .EyeballProtrusionBox .LineBox .line.LineCenter{
        width: 180px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -90px !important;
   }
   .EyeballProtrusion .EyeballProtrusionBox .LineBox .line.LineLeftTop{
        position: absolute;
        left: 90px;
        top: 56px;
        width: 70px;
        transform: rotate(45deg);
   }
   .EyeballProtrusion .EyeballProtrusionBox .LineBox .line.LineLeftBottom{
        position: absolute;
        left: 90px;
        top: 106px;
        width: 70px;
        transform: rotate(315deg);
   }
   .EyeballProtrusion .EyeballProtrusionBox .LineBox .line.LineRightTop{
        position: absolute;
        right: 90px;
        top: 56px;
        width: 70px;
        transform: rotate(315deg);
   }
   .EyeballProtrusion .EyeballProtrusionBox .LineBox .line.LineRightBottom{
        position: absolute;
        right: 90px;
        top: 106px;
        width: 70px;
        transform: rotate(45deg);
   }
     .EyeballProtrusion .EyeballProtrusionBox .ValueInput{
        font-size: 14px;
        width: 70px;
        height: 28px;
   }
   .SquintSymbolBox{
        display: flex;
        width: 100%;
        height: 180px;
        justify-content: space-evenly;
   }
   .SquintSymbolLeftContainer{
        width:50%;
        height:100%;
        background:#9bbbe3;
        padding: 10px;
   }
   .ShowView{
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.8);
        position:relative;
   }
   .ShowView .LeftLine{
        width:100%;
        border-top:3px solid #000;
        position:absolute;
        top:50%;
        transform:rotate(-45deg)
   }
  .ShowView  .RightLine{
        width:100%;
        border-top:3px solid #000;
        position:absolute;
        top:50%;
        transform:rotate(45deg)
   }
   .ShowView .CenterRound{
        width:10px;
        height:10px;
        border-radius:50%;
        background:#000;
        position:absolute;
        top:50%;
        left:50%;
        margin-top:-5px !important;
        margin-left:-5px !important;
   }
   #EditorActiveModeSelect{
        background: #f7f7f7;
        position: fixed;
        opacity: 1;
        z-index: 99999999;
        left: 50%;
        width: 220px;
        top: 50%;
        border: 1px solid;
        margin-left: -110px;
        margin-top: -230px;
        font-size: 12px;
        z-index: 10003;
   }
  #EditorActiveModeSelect .EditorActiveItem{
        min-height: 30px;
        line-height: 30px;
   }
  #EditorActiveModeSelect .EditorActiveModeDialogBox{
        width: 100%;
        display: flex;
        justify-content: center;
        border-top: 1px solid #ccc;
        padding: 5px 10px;
        box-sizing: border-box;
    }
  #EditorActiveModeConfom,#EditorActiveModeCancel{
        width: 46px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #c2c2c2;
        border-radius: 5px;
        margin:0 5px;
  }
 #EditorActiveModeSelect .EditorActiveModeHeader{
    width:100%;
    display:flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
    padding:5px;
    box-sizing: border-box;
  }
  #EditorActiveModeSelect .EditorActiveModeHeader > p{
    margin:0;
  }
 #EditorActiveModeSelect .EditorActiveModeCancelButtonIcon{
    width: 16px;
    height: 16px;
    opacity: 0.6;
    filter: alpha(opacity=60);
    margin: 0 0 0 2px;
    vertical-align: top;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4jWNkgII5IUH/BW/sYCAGvNfwYEhZsw6sF0ys1eH6b2AiyiBvIsTw79sfgkY8vvaJ4cKZ1wzBV74xMoJsduQ5yyCrxcfw89pnolwANuTtL4Zj7BYMLCBny8YpgzV/+fib4f2f/2AFgiyMKBrQxUE0SC8TiAOzGaRIc9NTMD7/+S9cM4gNE4cZxMPPCqbBBrxi+A+2HRl47n4O1gjCIDY6gKmHuOAtxOkgZ213lYQrBWlE1owsB3MJE0wA5jdDXmYUhciaQXIgdTDNKAYgCxID2IWRwuAdExPcEFx+hoUJzKLn7/+iugAEHnz/h+Fn9DABqUEGTI+5hBiQXYGsWYGTCYzRwwRZLeMEM5n/anzYky8fNwuY/vQVVR4k/kyWh+HZqS8MTDxyZgy3PkEUvhXhQlEI0oisGSQPwiDNP9/8YgDpBccdyBXCSmxgRewiEBofAGl+e+8XQ8GpJ4zwBJ+dnf1f9fRGgppB4LapP8PUqVMZGRgYGADODLn9wgQgMgAAAABJRU5ErkJggg==) no-repeat;
  }
  #EditorActiveModeSelect  .EditorActiveModeContainer{
     padding: 10px;
     display: flex;
     flex-direction: column;
  }
  #EditorActiveModeButton{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 60%;
    height: 20px;
    border: 1px solid #767676;
    padding: 0 2px;
    box-sizing: border-box;
    border-radius: 2px;
  }
   .dcTool-close{
    background: #cd6b45;
    color: #fff;
    display: inline-block;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    opacity: 0.8;
    font-size: 10px;
    border-radius: 3px;
    cursor: pointer;
    padding-left: 1px;
 }
 .dcTool-close:hover{
      opacity: 1;
 }
 .childrenDialogContainer{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10002;
    background: rgb(0,0,0,0.1);
 }
    `
//线的样式列表
let DASHSTYLE = [
    {
        "name": "Solid",
        "show": "——"
    },
    {
        "name": "Dash",
        "show": "-------"
    },
    {
        "name": "Dot",
        "show": "▪▪▪▪▪▪▪"
    },
    {
        "name": "DashDot",
        "show": "-▪-▪-▪-"
    },
    {
        "name": "DashDotDot",
        "show": "-▪▪-▪▪-"
    },
]

//输入域列表格式
let LBSJ = [
    { id: "1", text: "None", Child: [] },
    { id: "2", text: "Numeric", Child: [{ id: "2-1", text: "0.00" }, { id: "2-2", text: "#.00" }, { id: "2-3", text: "c" }, { id: "2-4", text: "e" }, { id: "2-5", text: "f" }, { id: "2-6", text: "g" }, { id: "2-7", text: "r" }, { id: "2-8", text: "FormatedSize" }] },
    { id: "3", text: "Currency", Child: [{ id: "3-1", text: "00.00" }, { id: "3-2", text: "大写中文" }, { id: "3-3", text: "小写中文" }, { id: "3-4", text: "#.00" }, { id: "3-5", text: "c" }] },
    {
        id: "4", text: "DateTime", Child: [{ id: "4-1", text: "yyyy-MM-dd HH:mm:ss" }, { id: "4-2", text: "yyyy-MM-dd" }, { id: "4-3", text: "yyyy-MM-dd hh:mm:ss" }, { id: "4-4", text: "HH:mm:ss" }, { id: "4-5", text: "yyyy年MM月dd日" }, { id: "4-6", text: "yyyy年MM月dd日 HH时mm分ss秒" }, { id: "4-7", text: "d" },
        { id: "4-7", text: "D" }, { id: "4-8", text: "f" }, { id: "4-9", text: "F" }]
    },
]

//特殊字符
let SPECIALCHARACTERS = ["、", "。", "·", "ˉ", "ˇ", "¨", "〃", "々", "—", "～", "‖", "…", "‘", "’", "“", "”", "〔", "〕", "〈", "〉",
    "《", "》", "「", "」", "『", "』", "〖", "〗", "【", "】", "±", "×", "÷", "∶", "∧", "∨", "∑", "∏", "∪", "∩", "∈", "∷", "√", "⊥",
    "∥", "∠", "⌒", "⊙", "∫", "∮", "≡", "≌", "≈", "∽", "∝", "≠", "≮", "≯", "≤", "≥", "∞", "∵", "∴", "♂", "♀", "°", "′", "″",
    "℃", "＄", "¤", "￠", "￡", "‰", "§", "№", "☆", "★", "○", "●", "◎", "◇", "◆", "□", "■", "△", "▲", "※", "→", "←", "↑", "↓",
    "〓", "〡", "〢", "〣", "〤", "〥", "〦", "〧", "〨", "〩", "㊣", "㎎", "㎏", "㎜", "㎝", "㎞", "㎡", "㏄", "㏎", "㏑", "㏒", "㏕", "︰"]

//罗马字符
let ROMANCHARACTERS = ["ⅰ", "ⅱ", "ⅲ", "ⅳ", "ⅴ", "ⅵ", "ⅶ", "ⅷ", "ⅸ", "ⅹ", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ",
    "Ⅺ", "Ⅻ"]

//数字字符
let NUMERICCHARACTERS = ["⒈", "⒉", "⒊", "⒋", "⒌", "⒍", "⒎", "⒏", "⒐", "⒑", "⒒", "⒓", "⒔", "⒕", "⒖", "⒗", "⒘", "⒙", "⒚", "⒛",
    "⑴", "⑵", "⑶", "⑷", "⑸", "⑹", "⑺", "⑻", "⑼", "⑽", "⑾", "⑿", "⒀", "⒁", "⒂", "⒃", "⒄", "⒅", "⒆", "⒇", "①", "②", "③", "④",
    "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "㈠", "㈡", "㈢", "㈣", "㈤", "㈥", "㈦", "㈧", "㈨", "㈩"]

//医学字符
let MEDICALCHARACTERS = ["RP", "P.O", "INJ.", "MIXT.", "TAD.", "SOL.", "CO.", "PR.", "I.D", "I.V", "I.V.GTT.", "IH", "IM", "O.M", "O.N", "HS.", "AM.", "PM.", "A.C.", "P.C.", "SOS.", "ST.", "QD", "BID", "TID", "QOD", "QH", "Q2H", "Q3H", "MCG", "MG", "G", "ML", "sig", "qd", "bid", "tid", "qid", "qh", "q2h", "q4h", "q6h", "qn", "qod", "biw", "hs", "am", "pm", "St", "DC", "prn", "sos", "ac", "pc", "12n", "12mn", "gtt", "ID", "IH", "IM", "IV", "aa", "et", "Rp.", "sig./S.", "St./Stat.", "Cit.", "s.o.s.", "p.r.n", "a.c.", "p.c.", "a.m.", "p.m.", "q.n.", "h.s.", "q.h.", "q.d.", "B.i.d.", "T.i.d.", "Q.i.d.", "q.4h.", "p.o.", "adus.int.", "adus.ext.", "H.", "im./M.", "iv./V.", "ivgtt.", "Inhal.", "O.D.", "O.L.", "O.S.", "O.U.", "No./N.", "s.s", "ug.", "mg.", "g.", "kg.", "ml.", "L.", "q.s", "Ad.", "Aq.", "Aq.dest.", "Ft.", "Dil", "M.D.S.", "Co./Comp.", "Mist", "Pulv.", "Amp.", "Emul.", "Syr.", "Tr.", "Neb.", "Garg.", "rtt./gutt.", "collyr.", "Ocul.", "Liq.", "Sol.", "Lot.", "Linim.", "Crem.", "Ung.", "Past.", "Ol.", "Enem.", "Supp.", "Tab.", "Pil.", "Caps.", "Inj.", "po", "im", "iv", "ivgtt", "qd", "bid", "tid", "qid", "q8h", "qn", "Rp", "sig", "prn"]

//恒牙牙位图数据==============start================
let NAMELIST = ["a1", "a3", "a5", "a7", "a10", "a12", "a14", "a16", "a17", "a19", "a21", "a23", "a26", "a28", "a30", "a32"]
let IDTYPELIST = ["Value", "a", "b", "c", "d", "e", "f"]
let IDLIST = ["Value1", "Value3", "Value5", "Value7", "Value10", "Value12", "Value14", "Value16", "Value17", "Value19", "Value21", "Value23", "Value26", "Value28", "Value30", "Value32"]
let PERMANENTTEETHTOP = [
    {
        idPrefix: 'a',
        parentId: '#P-permanent-tooth',
        teethKey: 'P',
        isTop: true,
    },
    {
        idPrefix: 'b',
        parentId: '#L-permanent-tooth',
        teethKey: 'L',
        isTop: true
    },
    {
        idPrefix: 'c',
        parentId: '#B-permanent-tooth',
        teethKey: 'B',
        isTop: true
    },
    {
        idPrefix: 'd',
        parentId: '#D-permanent-tooth',
        teethKey: 'D',
        isTop: true
    },
    {
        idPrefix: 'e',
        parentId: '#O-permanent-tooth',
        teethKey: 'O',
        isTop: true
    },
    {
        idPrefix: 'f',
        parentId: '#M-permanent-tooth',
        teethKey: 'M',
        isTop: true
    }]
let PERMANENTTEETHBOTTOM = [{
    idPrefix: 'a',
    parentId: '#M-bottom-permanent-tooth',
    teethKey: 'M',
    isTop: false
},
{
    idPrefix: 'b',
    parentId: '#O-bottom-permanent-tooth',
    teethKey: 'O',
    isTop: false
},
{
    idPrefix: 'c',
    parentId: '#D-bottom-permanent-tooth',
    teethKey: 'D',
    isTop: false
},
{
    idPrefix: 'd',
    parentId: '#B-bottom-permanent-tooth',
    teethKey: 'B',
    isTop: false
},
{
    idPrefix: 'e',
    parentId: '#L-bottom-permanent-tooth',
    teethKey: 'L',
    isTop: false
},
{
    idPrefix: 'f',
    parentId: '#P-bottom-permanent-tooth',
    teethKey: 'P',
    isTop: false
}]
//恒牙牙位图数据 ===========================end============================

//乳牙牙位图数据=============start===================
let TEETHPOSTIONTOPOBJ = [
    {
        idPrefix: 'a',
        parentId: '#P-teeth-list',
        teethKey: 'P'
    },
    {
        idPrefix: 'b',
        parentId: '#L-teeth-list',
        teethKey: 'L'
    },
    {
        idPrefix: 'c',
        parentId: '#B-teeth-list',
        teethKey: 'B'
    },
    {
        idPrefix: 'd',
        parentId: '#D-teeth-list',
        teethKey: 'D'
    },
    {
        idPrefix: 'e',
        parentId: '#O-teeth-list',
        teethKey: 'O'
    },
    {
        idPrefix: 'f',
        parentId: '#M-teeth-list',
        teethKey: 'M'
    },
]
let TEETHPOSTIONBOTTOMOBJ = [
    {
        idPrefix: 'a',
        parentId: '#M-bottom-teeth-list',
        teethKey: 'M'
    },
    {
        idPrefix: 'b',
        parentId: '#O-bottom-teeth-list',
        teethKey: 'O'
    },
    {
        idPrefix: 'c',
        parentId: '#D-bottom-teeth-list',
        teethKey: 'D'
    },
    {
        idPrefix: 'd',
        parentId: '#B-bottom-teeth-list',
        teethKey: 'B'
    },
    {
        idPrefix: 'e',
        parentId: '#L-bottom-teeth-list',
        teethKey: 'L'
    },
    {
        idPrefix: 'f',
        parentId: '#P-bottom-teeth-list',
        teethKey: 'P'
    },
]
//乳牙牙位图数据=============end===================
//段落
let BULLETEDLIST = [{
    data: "无",
    title: "None",
    value: 0
}, {
    data: "1.2.3.4",
    title: "ListNumberStyle",
    value: 1
}, {
    data: "1,2,3,4",
    title: "ListNumberStyleArabic1",
    value: 2
}, {
    data: "1）2）3）4）",
    title: "ListNumberStyleArabic2",
    value: 3
}, {
    data: "a）b）c）d）",
    title: "ListNumberStyleLowercaseLetter",
    value: 4
}, {
    data: "i）ii）iii）iv）",
    title: "ListNumberStyleLowercaseRoman",
    value: 5
}, {
    data: "① ② ③ ④",
    title: "ListNumberStyleNumberInCircle",
    value: 6
}, {
    data: "一.二.三.四",
    title: "ListNumberStyleSimpChinNum1",
    value: 7
}, {
    data: "一）二）三）四",
    title: "ListNumberStyleSimpChinNum2",
    value: 8
}, {
    data: "壹.贰.叁.肆",
    title: "ListNumberStyleTradChinNum1",
    value: 9
}, {
    data: "壹）贰）叁）肆",
    title: "ListNumberStyleTradChinNum2",
    value: 10
}, {
    data: "A）B）C）D",
    title: "ListNumberStyleUppercaseLetter",
    value: 11
}, {
    data: "Ⅰ）Ⅱ）Ⅲ）Ⅳ",
    title: "ListNumberStyleUppercaseRoman",
    value: 12
}, {
    data: "甲,乙,丙,丁",
    title: "ListNumberStyleZodiac1",
    value: 13
}, {
    data: "子,丑,寅,卯",
    title: "ListNumberStyleZodiac2",
    value: 14
}, {
    data: "● Bulletedlist",
    title: "BulletedList",
    value: 10000
}, {
    data: "■ Bulletedlistblock",
    title: "BulletedListBlock",
    value: 10001
}, {
    data: "◆ Bulletedlistdiamond",
    title: "BulletedListDiamond",
    value: 10002

}, {
    data: "✔ BulletedListCheck ",
    title: "BulletedListCheck ",
    value: 10003

}, {
    data: "➢ BulletedListRightArrow",
    title: "BulletedListRightArrow",
    value: 10004
}, {
    data: "◇ BulletedListHollowStar",
    title: "BulletedListHollowStar",
    value: 10005
}]
//模拟数据
let MOCKARRAY = [
    { name: "TablePproperties", description: '表格属性' },
    { name: "TableRowProperties", description: '表格行属性' },
    { name: "TableCellProperties", description: '单元格属性' },
    { name: "InsertComment", description: '插入批注' },
    { name: "AboutControl", description: '显示关于对话框' },
    { name: "AdministratorViewMode", description: '管理员模式' },
    { name: "AlignBottomCenter", description: '单元格底端居中对齐' },
    { name: "AlignBottomLeft", description: '单元格底端左对齐' },
    { name: "AlignBottomRight", description: '单元格底端右对齐' },
    { name: "AlignCenter", description: '段落居中对齐' },
    { name: "AlignDistribute", description: '段落分散对齐' },
    { name: "AlignJustify", description: '段落两端对齐' },
    { name: "AlignLeft", description: '段落左对齐' },
    { name: "AlignMiddleCenter", description: '单元格垂直居中对齐' },
    { name: "AlignMiddleLeft", description: '单元格垂直居中水平左对齐' },
    { name: "AlignMiddleRight", description: '单元格垂直居中水平右对齐' },
    { name: "AlignLeft", description: '段落右对齐' },
    { name: "AlignTopCenter", description: '单元格靠上居中对齐' },
    { name: "AlignTopLeft", description: '单元格靠上左对齐' },
    { name: "AlignTopRight", description: '单元格靠上右对齐' },
    { name: "AttachCurrentUserTrackToBodyContent", description: '正文附加当前用户痕迹' },
    { name: "BackColor", description: '背景色' },
    { name: "Backspace", description: '退格删除' },
    { name: "Bold", description: '粗体' },
    { name: "BulletedList", description: '圆点列表' },
    { name: "CharacterCircle", description: '字符套圈' },
    { name: "CleanViewMode", description: '整洁视图模式' },
    { name: "ClearAllFieldValue", description: '清空所有输入域内容' },
    { name: "ClearAllUserTrace", description: '清空所有用户痕迹' },//结合管理员模式使用
    { name: "ClearBodyContent", description: '清空正文内容' },
    { name: "ClearCurrentFieldValue", description: '清空当前输入域内容' },
    { name: "ClearJumpPrintMode", description: '退出续打模式' },
    { name: "ClearUndo", description: '清除撤销列表' },
    { name: "ClearUserTrace", description: '清除用户痕迹' },//选中内容，开启管理员模式
    { name: "Color", description: '前景色' },
    { name: "CommitUserTrace", description: '提交用户痕迹' },
    { name: "ComplexViewMode", description: '留痕视图模式' },
    { name: "ContentProtect", description: '内容保护' },
    { name: "ConvertContentToField", description: '选中内容转换成输入域' },
    { name: "ConvertFieldToContent", description: '选中的输入域转为文本' },
    { name: "Copy", description: '复制' },
    { name: "CopyAsText", description: '纯文本复制' },
    { name: "CopyWithClearFieldValue", description: '带清空输入域内容的复制' },
    { name: "CtlMoveDown", description: '向下滚动一行' },
    { name: "CtlMoveUp", description: '向上滚动一行' },
    { name: "Cut", description: '剪切' },
    { name: "Delete", description: '删除' },
    { name: "DeleteAbsolute", description: '物理删除' },
    { name: "DeleteAllComment", description: '删除所有批注' },
    { name: "DeleteComment", description: '删除当前批注' },
    { name: "DeleteField", description: '删除文本域' },
    { name: "DeleteLine", description: '删除一行文本' },
    { name: "DeleteRedundant", description: '删除文本后面空白内容' },
    { name: "DesignMode", description: '设计模式' },
    { name: "DisplayWhole", description: '显示所有的隐藏元素' },
    { name: "DocumentValueValidate", description: '对文档中的数据进行校验' },
    { name: "DocumentValueValidateWithCreateDocumentComments", description: '对文档中的数据进行批注式校验' },
    { name: "EditComment", description: '编辑批注' },
    { name: "ElementProperties", description: '元素属性' },
    { name: "EmphasisMark", description: '着重号' },
    { name: "FileCleanPrint", description: '整洁打印' },
    { name: "FileNew", description: '新建文档' },
    { name: "FirstLineIndent", description: '首行缩进' },
    { name: "Font", description: '字体' },
    { name: "FormatBrush", description: '格式刷' },
    { name: "FormViewMode", description: '表单视图' },
    { name: "HideElementMarkAutoHide", description: '隐藏标记为自动隐藏的元素' },
    { name: "InputFieldUnderLine", description: '输入域设置下划线' },
    { name: "InsertBarcodeElement", description: '插入条形码元素' },
    { name: "InsertButton", description: '插入按钮元素' },
    { name: "InsertCheckBox", description: '插入复选框元素' },
    { name: "InsertCheckBoxOrRadio", description: '插入多个单复选框元素' },
    { name: "InsertHorizontalLine", description: '插入水平线元素' },
    { name: "InsertImage", description: '插入图片元素' },
    { name: "InsertInputField", description: '插入输入域元素' },
    { name: "InsertLabelElement", description: '插入标签文本元素' },
    { name: "InsertLineBreak", description: '插入软回车' },
    { name: "InsertNewMedicalExpression", description: '插入医学表达式' },
    { name: "InsertPageBreak", description: '插入分页符' },
    { name: "InsertPageInfo", description: '插入页码元素' },
    { name: "InsertParagrahFlag", description: '插入段落符号元素' },
    { name: "InsertRadioBox", description: '插入单选框元素' },
    { name: "InsertRuler", description: '插入标尺元素' },
    { name: "InsertWhiteSpaceForAlignRight", description: '插入空格使后面的内容右对齐' },
    { name: "Italic", description: '斜体' },
    { name: "JumpPrintMode", description: '续打模式' },
    { name: "MoveDown", description: '向下移动一行' },
    { name: "MoveEnd", description: '移动到行尾' },
    { name: "MoveHome", description: '移动到行首' },
    { name: "MoveLeft", description: '向左移动一列' },
    { name: "MovePageDown", description: '向下翻页' },
    { name: "MovePageUp", description: '向上翻页' },
    { name: "MoveRight", description: '向右移动一列' },
    { name: "MoveUp", description: '向上移动一行' },
    { name: "NumberedList", description: '数字列表' },
    { name: "OffsetJumpPrintMode", description: '偏移续打模式' },
    { name: "ParagraphFormat", description: '段落格式' },
    { name: "Paste", description: '粘贴' },
    { name: "PasteAsText", description: '纯文本粘贴' },
    { name: "ReadViewMode", description: '阅读视图模式' },
    { name: "Redo", description: '重做' },
    { name: "RefreshDocument", description: '刷新文档' },
    { name: "SelectAll", description: '全选' },
    { name: "SelectLine", description: '选中当前行' },
    { name: "ShiftMoveDown", description: '带选择的向下移动一行' },
    { name: "ShiftMoveEnd", description: '带选择的移动到行尾' },
    { name: "ShiftMoveHome", description: '带选择的移动到行首' },
    { name: "ShiftMoveLeft", description: '带选择的向左移动一列' },
    { name: "ShiftMovePageDown", description: '带选择的向下翻页' },
    { name: "ShiftMovePageUp", description: '带选择的向上翻页' },
    { name: "ShiftMoveRight", description: '带选择的向右移动一列' },
    { name: "ShiftMoveUp", description: '带选择的向上移动一行' },
    { name: "ShowBackgroundCellID", description: '显示单元格背景编号' },
    { name: "ShowElementMarkAutoHide", description: '显示被标记为自动隐藏的元素' },
    { name: "SimplifiedSwapTraditional", description: '简体和繁体相互转换' },
    { name: "SimplifiedToTraditional", description: '简体转换为繁体' },
    { name: "Strikeout", description: '删除线' },
    { name: "Subscript", description: '下标' },
    { name: "Superscript", description: '上标' },
    { name: "Table_DeleteColumn", description: '删除表格列' },
    { name: "Table_DeleteRow", description: '删除表格行' },
    { name: "Table_DeleteTable", description: '删除表格' },
    { name: "Table_HeaderRow", description: '标题行' },
    { name: "Table_InsertColumnLeft", description: '向左添加表格列' },
    { name: "Table_InsertColumnRight", description: '向右添加表格列' },
    { name: "Table_InsertRowDown", description: '向下添加表格行' },
    { name: "Table_InsertRowsToPageBottom", description: '文档最后的表格新增表格行，使其延伸到页尾' },
    { name: "Table_InsertRowUp", description: '向上添加表格行' },
    { name: "InsertTable", description: '插入表格' },
    { name: "Table_MergeCell", description: '合并单元格' },
    { name: "Table_SplitCell", description: '拆分单元格' },
    { name: "TraditionalToSimplified", description: '繁体转换为简体' },
    { name: "Underline", description: '下划线' },
    { name: "Undo", description: '撤销' }]

export default {
    DASHSTYLE,
    LBSJ,
    DIALOGSTYLE,
    SPECIALCHARACTERS,
    ROMANCHARACTERS,
    NUMERICCHARACTERS,
    MEDICALCHARACTERS,
    NAMELIST,
    IDTYPELIST,
    IDLIST,
    PERMANENTTEETHTOP,
    PERMANENTTEETHBOTTOM,
    TEETHPOSTIONTOPOBJ,
    TEETHPOSTIONBOTTOMOBJ,
    BULLETEDLIST,
    MOCKARRAY
}
