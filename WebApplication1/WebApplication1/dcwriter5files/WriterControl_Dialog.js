//*************************************************************************
//* 项目名称：
//* 当前版本: V 5.3.1
//* 开始时间: 20230601
//* 开发者: 
//* 重要描述:
//*************************************************************************
//* 最后更新时间:2023-7-3 16:19:20
//* 最后更新人:李新宇
//*************************************************************************

"use strict";
import WriteControlDialogStaticResources  from "./WriterControl_DialogStaticResources.js";
var {
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
} = WriteControlDialogStaticResources
export let WriterControl_Dialog = {
    /**
    * 弹出框样式字符串
    */
    InsertSpecifyCharacterObj: {
        SpecialCharacters: SPECIALCHARACTERS,
        RomanCharacters: ROMANCHARACTERS,
        NumericCharacters: NUMERICCHARACTERS,
        MedicalCharacters: MEDICALCHARACTERS
    },

    /**
    * 显示对话框
    * @param {string} strContainerID 编辑器容器元素编号
    * @param {string} strDialogName 对话框的名称
    * @param {any} options 参数
    */
    ShowDialog(strContainerID, strDialogName, options) {
        var rootElement = typeof (strContainerID) == "string" ? document.getElementById(strContainerID) : strContainerID;
        if (rootElement != null) {

            // 这里的对话框名称定义在C#类型 DCSoft.WASMDialogName 中
            switch (strDialogName) {
                case "EditComment":
                    WriterControl_Dialog.EditDocumentCommentsDialog(options, rootElement);
                    break;
            }
        }
    },

    /**
    * 插入绑定数据源元素
    * @param appendNode 把绑定数据源元素插入到该元素位置最后面
    * @param ctl 编辑器元素
    */
    appendValueBindingDiv: function (appendNode) {
        if (!(appendNode instanceof jQuery)) {
            return false;
        }
        var ValueBindingHtml = `
    <div class="dcBody-content">
        <div id="ValueBinding_Box" class="Box">
            <h6 class="title">数据源信息</h6>
            <div class="dcBody-content">
                <label>
                    <input type="checkbox" name="Enabled" data-text="ValueBinding.Enabled" checked="checked">
                    <span class="dcTitle-text">数据源绑定设置有效</span>
                </label>
            </div>
            <form>
                <div class="dcBody-content">
                    <label class="flex">
                        <span class="dcTitle-text">数据源：</span>
                        <input type="text" class="full" name="DataSource" data-text="ValueBinding.DataSource">
                    </label>
                </div>
                <div class="dcBody-content">
                    <label class="flex">
                        <span class="dcTitle-text">格式化：</span>
                        <input type="text" class="full" name="FormatString" data-text="ValueBinding.FormatString">
                    </label>
                </div>
                <div class="dcBody-content">
                    <label class="flex">
                        <span class="dcTitle-text">绑定路径：</span>
                        <input type="text" class="full" name="BindingPath" data-text="ValueBinding.BindingPath">
                    </label>
                </div>
                <div class="dcBody-content">
                    <label class="blockElement">
                        <span class="dcTitle-text">Text的绑定路径(仅适用于输入域元素)：</span>
                        <input type="text" class="fullWidth" name="BindingPathForText" data-text="ValueBinding.BindingPathForText">
                    </label>
                </div>
                <div class="dcBody-content">
                    <label>
                        <input type="checkbox" name="Readonly" data-text="ValueBinding.Readonly">
                        <span class="dcTitle-text">只读，不能回填</span>
                    </label>
                </div>
                <div class="dcBody-content">
                    <label>
                        <input type="checkbox" name="AutoUpdate" data-text="ValueBinding.AutoUpdate">
                        <span class="dcTitle-text">自动更新，当加载文档或数据源发生改变时自动更新数值</span>
                    </label>
                </div>
                <div class="dcBody-content">
                    <label class="flex">
                        <span class="dcTitle-text">执行状态：</span>
                        <select id="ProcessState" data-text="ValueBinding.ProcessState" class="full">
                            <option value="Always">总是执行</option>
                            <option value="Once">只执行一次</option>
                            <option value="Never">不执行</option>
                        </select>
                    </label>
                </div>
            </form>
        </div>
    </div>
        `;
        var ValueBindingDiv = jQuery(ValueBindingHtml);
        var ValueBinding_Box = ValueBindingDiv.find("#ValueBinding_Box");
        var EnabledCheckbox = ValueBinding_Box.find("[data-text=\"ValueBinding.Enabled\"]");
        let that = this;
        // 绑定复选框修改事件
        EnabledCheckbox.off("change");
        EnabledCheckbox.change(function () {
            var formNode = ValueBinding_Box.find("form")[0];
            that.changeFormDisable(formNode, !this.checked);
        });
        appendNode.append(ValueBindingDiv);
    },

    /**
    * 创建水印对话框
    * @param options 水印属性
    * @param ctl 编辑器元素
    */
    WatermarkDialog: function (options, ctl) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时，获取当前的水印数据
            options = ctl.GetDocumentWatermark();
        }
        var watermarkHtml = `
            <div class="dcBody-content">
                <span class="dcTitle-text">倾斜角度:</span>
                <input type="number" value="0" style="width: 50px;outline: none;" name="angle" min="0" max="360"/>
                <span class="gap-width"></span>
                <span class="dcTitle-text">透明度:</span>
                <input type="number" value="0" style="width: 50px;outline: none;" name="alpha" min="0" max="100"/>
            </div>
            <div class="dcBody-content">
                <input type="checkbox" id="repeatCheckbox" name="repeat"/>
                    <label for="repeatCheckbox" class="dcTitle-text">重复平铺，密度(0到1之间):</span>
                <input type="number" value="0" style="width: 50px;outline: none;" name="densityforrepeat" min="0" max="1" step="0.1"/>
            </div>
            <div class="dcBody-content">
                <input type="radio" name="type" id="noWaterType" value="None" checked>
                <label for="noWaterType">无水印</label>
            </div>
            <div class="dcBody-content">
                <input type="radio" name="type" id="imgWaterType" value="Image">
                <label for="imgWaterType">图片水印</label>
                <div class="dcBody-content">
                    <span class="gap-width"></span>
                    <input type="hidden" id="imagedatabase64string" name="imagedatabase64string" value="选择文件" disabled/>
                    <input type="file" disabled accept="image/*">
                </div>
            </div>
            <div class="dcBody-content">
                <input type="radio" name="type" id="textWaterType" value="Text">
                <label for="textWaterType">文字水印</label>
                <div class="dcBody-content">
                    <div style="padding: 0px 5px 5px;">
                        <span class="gap-width"></span>
                        <span class="dcTitle-text">文字：</span>
                        <input type="text" style="width: 250px;height: 18px" name="text" disabled>
                    </div>
                    <div style="padding: 5px;">
                        <span class="gap-width"></span>
                        <span class="dcTitle-text">字体：</span>
                        <input type="text" style="width: 250px;height: 18px" name="font" disabled>
                    </div>
                    <div style="padding: 5px;">
                        <span class="gap-width"></span>
                        <span class="dcTitle-text">颜色：</span>
                        <input type="color" style="width: 250px;height: 18px" name="colorvalue" value="#000000" disabled>
                    </div>
                </div>
            </div>
        `;
        var dialogOptions = {
            title: "水印",
            bodyHeight: 326,
            bodyClass: "Watermark",
            bodyHtml: watermarkHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        // 进行水印类型的切换
        dcPanelBody.find('input[type=radio][name=type]').on('change', function (e) {
            //先将文本和图片的禁用，再根据点击开启
            dcPanelBody.find('input[type=radio]').nextAll('.dcBody-content').find('input,select').attr('disabled', 'disabled');
            jQuery(this).nextAll('.dcBody-content').find('input,select').removeAttr('disabled');
        })
        //图片上传，对文件按钮进行判断
        dcPanelBody.find('input[type=file]').on('change', function (e) {
            var reader = new FileReader()
            var file = e.target.files[0]
            if (file) {
                reader.readAsDataURL(file)
                reader.onloadend = function () {
                    //console.log(reader.result);
                    dcPanelBody.find("#imagedatabase64string").val(reader.result);
                }
            }
        })

        //开始对对话框赋值
        if (options != null && typeof options == 'object') {
            // console.log("处理前的水印数据==>", options)
            options = WriterControl_Dialog.checkWaterValue(options);
            // console.log("当前的水印数据==>", options)
            for (var item in options) {
                var _value = options[item];
                var _input = dcPanelBody.find("[name='" + item + "']");
                var _type = _input.attr("type");
                if (_type == "checkbox") {
                    if (typeof (_value) == "boolean") {
                        _input.prop("checked", _value);
                    }
                } else if (_type == "radio") {
                    if (typeof (_value) == "string") {
                        _input.filter("[value=" + _value + "]").click();
                    }
                } else {
                    _input.val(_value);
                }
            }
        }

        //成功的回调函数
        function successFun() {
            //获取到所有的属性
            var opt = {
                "type": "None",//类型
                "densityforrepeat": "",//水印间隔,0-1之间,允许小数,需要是number
                "repeat": "",//是否重复
                "alpha": "",//透明度,可能是0-255,需要是number
                // "backcolorvalue": "",//颜色值
                "colorvalue": "",//字体颜色值
                "angle": "",//倾斜角度，0-360之间，允许小数,需要是number
                "imagedatabase64string": "",//图片
                "text": "",//文本内容
                "font": ""//字体样式 微软雅黑, 10.5, style=Bold, Italic, Underline, Strikeout
                // "fontname": "",//字体名称
                // "fontsize": ""//字体大小,需要是number
            };
            for (var item in opt) {
                //找到对应的元素
                var _input = dcPanelBody.find("[name='" + item + "']");
                var _type = _input.attr("type");
                if (_type == "checkbox") {
                    opt[item] = _input.prop("checked")
                } else if (_type == "radio") {
                    opt[item] = _input.filter(":checked").val();
                } else {
                    opt[item] = _input.val();
                }
            }
            ctl.SetDocumentWatermark(opt);
            return options;
        }
    },

    /**
    * 处理水印数据
    * @param gridLineInfo 水印属性
    * @return 处理完成的水印数据
    */
    checkWaterValue: function (gridLineInfo) {
        if (!gridLineInfo || typeof (gridLineInfo) != "object") {
            return null;
        }
        var opt = {
            "type": "None",//类型
            "densityforrepeat": "",//水印间隔,0-1之间,允许小数,需要是number
            "repeat": "",//是否重复
            "alpha": "",//透明度,可能是0-255,需要是number
            // "backcolorvalue": "",//颜色值
            "colorvalue": "",//字体颜色值
            "angle": "",//倾斜角度，0-360之间，允许小数,需要是number
            "imagedatabase64string": "",//图片
            "text": "",//文本内容
            "font": ""//字体样式 微软雅黑, 10.5, style=Bold, Italic, Underline, Strikeout
            // "fontname": "",//字体名称
            // "fontsize": ""//字体大小,需要是number
        };
        for (var item in gridLineInfo) {
            var lower_item = item.toLowerCase();//转换为小写字母
            if (Object.hasOwnProperty.call(opt, lower_item)) {
                var _value = gridLineInfo[item];//传入对象的内容
                if (_value == null) {
                    _value = "";
                }
                switch (lower_item) {
                    case "type":
                        _value += "";
                        _value = _value.toLowerCase();
                        switch (_value) {
                            case '1':
                            case 'image':
                                opt[lower_item] = "Image";
                                break;
                            case '2':
                            case 'text':
                                opt[lower_item] = "Text";
                                break;
                            default:
                                opt[lower_item] = "None";
                                break;
                        }
                        break;
                    case 'densityforrepeat':
                    case 'alpha':
                    case 'angle':
                        // case 'fontsize':
                        //确保是数值
                        _value = Number(_value);
                        if (typeof (_value) === 'number' && isNaN(_value)) {
                            // 是NaN
                            _value = 0;
                        }
                        opt[lower_item] = _value;
                        break;
                    case 'backcolorvalue':
                    case 'colorvalue':
                        //判断是否为颜色
                        if (_value) {
                            var reg_str = '';
                            if (/^rgb\(/.test(_value)) {
                                reg_str = "^[rR][gG][Bb][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[\)]{1}$";
                            } else if (/^rgba\(/.test(_value)) {
                                reg_str = "^[rR][gG][Bb][Aa][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[\)]{1}$";
                            } else if (/^#/.test(_value)) {
                                reg_str = "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"
                            } else if (/^hsl\(/.test(_value)) {
                                reg_str = "^[hH][Ss][Ll][\(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*)[\)]$";
                            } else if (/^hsla\(/.test(_value)) {
                                reg_str = "^[hH][Ss][Ll][Aa][\(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*)[\)]$";
                            }
                            var re = new RegExp(reg_str);
                            if (_value.match(re) == null) {
                                _value = "#000000";
                            }
                        } else {
                            _value = "#000000";
                        }
                        opt[lower_item] = _value;
                        break;
                    case 'repeat':
                        //确保是boolean值
                        if (typeof (_value) != "boolean") {
                            _value += "";
                            _value = _value.toLowerCase();
                            if (_value == "true") {
                                _value = true;
                            } else {
                                _value = false;
                            }
                        }
                        opt[lower_item] = _value;
                        break;
                    case 'text':
                    // case 'fontname':
                    case 'font':
                    case 'imagedatabase64string':
                        //只要是纯文本就行
                        _value += "";
                        var BASE64_MARKER = ';base64,'; //声明文件流编码格式
                        if (lower_item == "imagedatabase64string" && _value.indexOf(BASE64_MARKER) > -1) {
                            var base64Index = _value.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
                            _value = _value.substring(base64Index);
                        }
                        opt[lower_item] = _value;
                        break;
                    default:
                        break;
                }
            }
        }
        return opt;
    },

    /**
    * 创建页面设置对话框
    * @param options 页面设置属性
    * @param ctl 编辑器元素
    */
    DocumentSettingsDialog: function (options, ctl, callBack) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时，获取当前的页面设置数据
            options = ctl.GetDocumentPageSettings();
        }
        var DocumentSttingsHtml = `
        <div class="boxSetting">
        <div class="setting-section">
            <div class="setting-left">
                <span class="setting-name">页面方向</span>
            </div>
            <div class="setting-right">
                <div class="radioBtn broadwise">
                    <div class="btnSelect"></div>
                    <span>横向</span>
                    <div class="selected select-left" style="display: none">
                    </div>
                </div>
                <div class="radioBtn endwise" style="margin-left: 23px">
                    <div class="btnSelect"></div>
                    <span>纵向</span>
                    <div class="selected select-right" style="display: block">
                    </div>
                </div>
            </div>
        </div>
        <div class="setting-section">
            <div class="setting-left">
                <span class="setting-name">页面大小</span>
            </div>
            <div class="setting-right">
                <select class="select-button"></select>
            </div>
        </div>
        <div class="setting-section">
            <div class="setting-left">
                <span class="setting-name">页面尺寸</span>
            </div>
            <div class="setting-right"><span
                    style="display: inline-block; width: auto; height: 36px; line-height: 36px; margin-right: 8px;">高</span>
                <div class="number-input height-size" style="width: 66px;margin-left: 25px;"><input type="number"
                        data="PaperHeight" value="" class="pad-input broadwiseNumber" style="width: 100%;">
                    <div class="height-top" style="display: none;">
                        <div class="carrow-top"></div>
                    </div>
                    <div class="height-bottom" style="display: none;">
                        <div class="carrow-bottom"></div>
                    </div>
                </div>  <span
                    style="display: inline-block; width: auto; height: 36px; line-height: 36px; margin-right: 8px; margin-left: 38px;">宽</span>
                <div class="number-input width-size" style="width: 66px;margin-left: 23px;"><input type="number" data="PaperWidth"
                        value="" class="pad-input directionNumber" style="width: 100%;">
                    <div class="width-top">
                        <div class="carrow-top"></div>
                    </div>
                    <div class="width-bottom">
                        <div class="carrow-bottom"></div>
                    </div>
                </div> 
            </div>
        </div>
        <div class="setting-section">
            <div class="setting-left">
                <span class="setting-name">页边距</span>
            </div>
            <div class="setting-right">
                <span style="
  display: inline-block;
  width: auto;
  height: 36px;
  line-height: 36px;
  margin-right: 8px;
">上边距</span>
                <div class="number-input height-size" style="width: 66px">
                    <input type="number" class="pad-input TopMargin" data="TopMargin" value=""
                        style="width: 100%" />
                    <div class="height-top">
                        <div class="carrow-top"></div>
                    </div>
                    <div class="height-bottom">
                        <div class="carrow-bottom"></div>
                    </div>
                </div>
                <span style="
  display: inline-block;
  width: auto;
  height: 36px;
  line-height: 36px;
  margin-right: 8px;
  margin-left: 38px;
">下边距</span>
                <div class="number-input width-size" style="width: 66px">
                    <input type="number" class="pad-input BottomMargin" data="BottomMargin" value=""
                        style="width: 100%" />
                    <div class="width-top">
                        <div class="carrow-top"></div>
                    </div>
                    <div class="width-bottom">
                        <div class="carrow-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="setting-section">
            <div class="setting-left">
                <span class="setting-name"> </span>
            </div>
            <div class="setting-right">
                <span style="
                          display: inline-block;
                          width: auto;
                          height: 36px;
                          line-height: 36px;
                          margin-right: 8px;
                        ">左边距</span>
                <div class="number-input height-size" style="width: 66px">
                    <input type="number" class="pad-input LeftMargin" data="LeftMargin" value=""
                        style="width: 100%" />
                    <div class="height-top">
                        <div class="carrow-top"></div>
                    </div>
                    <div class="height-bottom">
                        <div class="carrow-bottom"></div>
                    </div>
                </div>
                <span style="
                          display: inline-block;
                          width: auto;
                          height: 36px;
                          line-height: 36px;
                          margin-right: 8px;
                          margin-left: 38px;
                        ">右边距</span>
                <div class="number-input width-size" style="width: 66px">
                    <input type="number" class="pad-input RightMargin" data="RightMargin" value=""
                        style="width: 100%" />
                    <div class="width-top">
                        <div class="carrow-top"></div>
                    </div>
                    <div class="width-bottom">
                        <div class="carrow-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        var dialogOptions = {
            title: "页面设置",
            bodyClass: "DocumentSettings",
            bodyHtml: DocumentSttingsHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        var selectList = [{
            "name": "A3",
            "widthmm": 1169,
            "heightmm": 1654,
            "pageName": 8
        }, {
            "name": "A4",
            "widthmm": 827,
            "heightmm": 1169,
            "pageName": 9
        }, {
            "name": "A5",
            "widthmm": 583,
            "heightmm": 827,
            "pageName": 11
        }, {
            "name": "B4",
            "widthmm": 984,
            "heightmm": 1390,
            "pageName": 12
        }, {
            "name": "B5",
            "widthmm": 693,
            "heightmm": 984,
            "pageName": 13
        }, {
            "name": "Custom",
            "widthmm": "",
            "heightmm": "",
            "pageName": 0
        }];
        // console.log(selectList)
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var PaperKind_node = dcPanelBody.find(".select-button");//页面大小
        var PaperHeight_node = dcPanelBody.find("input[data=PaperHeight]");//页面高度
        var PaperWidth_node = dcPanelBody.find("input[data=PaperWidth]");//页面宽度

        // 填充下拉
        for (var i in selectList) {
            var name = selectList[i].name;
            var widthMm = selectList[i].widthmm;
            var heightMm = selectList[i].heightmm;
            PaperKind_node.append(
                `<option value="${name}" dataWidth="${widthMm}" dataHeight="${heightMm}">${name}</option>`
            )
        }
        // 横向纵向的点击事件
        dcPanelBody.find(".radioBtn").on('click', function () {
            jQuery(this).find(".selected").show();
            jQuery(this).siblings(".radioBtn").find(".selected").hide();
        })
        // 页面大小的切换事件
        PaperKind_node.on('change', function () {
            var _option = jQuery(this).find("option:selected");
            if (_option.attr("dataWidth")) {
                PaperWidth_node.val(_option.attr("dataWidth"));
            }
            if (_option.attr("dataHeight")) {
                PaperHeight_node.val(_option.attr("dataHeight"));
            }
            if (_option.val() != "Custom") {
                PaperWidth_node.attr("disabled", "disabled");
                PaperHeight_node.attr("disabled", "disabled");
            } else {
                PaperWidth_node.removeAttr("disabled");
                PaperHeight_node.removeAttr("disabled");
            }
        });

        // ===================================================
        //增加大小的显示与隐藏
        dcPanelBody.find(".number-input").on("hover", function () {
            if (jQuery(this).find("input").is(":disabled")) {
                return;
            }
            jQuery(this).find(".height-top,.height-bottom,.width-top,.width-bottom").toggle();
        });
        dcPanelBody.find(".number-input .height-top,.number-input .width-top").on("click", function () {
            var _input = jQuery(this).parent().find("input");
            var nameVal = _input.val()
            var m = accAdd(nameVal, 0.1);
            _input.val(m);
        });
        dcPanelBody.find(".number-input .height-bottom,.number-input .width-bottom").on("click", function () {
            var _input = jQuery(this).parent().find("input");
            var nameVal = _input.val()
            var m = accSub(nameVal, 0.1);
            _input.val(m);
        });
        //加
        function accAdd(arg1, arg2) {
            var r1, r2, m, c;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            c = Math.abs(r1 - r2);
            m = Math.pow(10, Math.max(r1, r2));
            if (c > 0) {
                var cm = Math.pow(10, c);
                if (r1 > r2) {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", "")) * cm;
                } else {
                    arg1 = Number(arg1.toString().replace(".", "")) * cm;
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
            } else {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", ""));
            }
            return (arg1 + arg2) / m;
        }
        //减
        function accSub(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        }
        // ===================================================
        // 添加默认值
        // console.log("当前页面设置==>", options)
        PageSettingsData(options);

        function PageSettingsData(data) {
            var isChange = typeof (data) == "object";//是否是修改数据
            var obj = {};
            // 横向纵向
            var flag = dcPanelBody.find(".select-right").is(":hidden");//true 横向 | false 纵向
            obj.Landscape = flag;
            if (isChange) {
                if (data.Landscape == true) {
                    // 横向
                    dcPanelBody.find(".select-left").show();
                    dcPanelBody.find(".select-right").hide();
                } else {
                    dcPanelBody.find(".select-left").hide();
                    dcPanelBody.find(".select-right").show();
                }
            }
            // 页面大小
            obj.PaperKind = PaperKind_node.val();
            if (isChange && Object.hasOwnProperty.call(data, "PaperKind")) {
                let PaperKindName = ''
                if (data.PaperKind || data.PaperKind === 0) {
                    selectList.map(item => {
                        if (item.pageName == data.PaperKind || item.name == data.PaperKind) {
                            PaperKindName = item.name
                        }
                    })
                }
                PaperKind_node.val(PaperKindName);
                if (data.PaperKind != "Custom") {
                    PaperWidth_node.attr("disabled", "disabled");
                    PaperHeight_node.attr("disabled", "disabled");
                }
            }
            // 数据
            dcPanelBody.find("[data]").each(function () {
                var _data = jQuery(this).attr("data");

                obj[_data] = jQuery(this).val();
                if (jQuery(this).attr("type") == "number") {
                    obj[_data] -= 0;
                }
                if (isChange && Object.hasOwnProperty.call(data, _data)) {
                    jQuery(this).val(data[_data]);
                }
            });
            if (isChange) {
                return true;
            } else {
                return obj;
            }
        }
        function successFun() {
            var _data = PageSettingsData();
            ctl.ChangeDocumentSettings(_data);
            ctl.RefreshDocument();
            callBack && callBack()
        }
    },

    /**
    * 创建文档网格线设置对话框
    * @param options 文档网格线属性
    * @param ctl 编辑器元素
    */
    DocumentGridLineDialog: function (options, ctl) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时，获取当前的文档网格线数据
            options = ctl.GetDocumentGridLine();
        }
        options = keysToLowerCase(options);
        var opts = {
            "Visible": "",
            "ColorValue": "",
            "LineStyle": "",
            "GridNumInOnePage": "",
            "AlignToGridLine": "",
            "Printable": ""
        };
        for (var i in opts) {
            var low_i = i.toLowerCase();
            if (Object.hasOwnProperty.call(options, low_i)) {
                opts[i] = options[low_i];
            }
        }
        var DocumentGridLineHtml = `
        <div class="dcBody-content">
            <label>
                <input type="checkbox" name="Visible" data-text="Visible">
                <span>绘制网格线</span>
            </label>
        </div>
        <form id="DocumentGridLine_form">
            <div class="dcBody-content">
                <label class="changewidth">
                    <span class="txt">网格线颜色：</span>
                    <input type="color" name="ColorValue" data-text="ColorValue">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="changewidth">
                    <span class="txt">网格线样式：</span>
                    <select name="LineStyle" id="LineStyle" data-text="LineStyle"></select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="changewidth">
                    <span class="txt">每页行数：</span>
                    <input type="number" name="GridNumInOnePage" data-text="GridNumInOnePage" value="0">
                </label>
            </div>
            <div class="dcBody-content">
                <label>
                    <input type="checkbox" name="AlignToGridLine" data-text="AlignToGridLine" checked>
                    <span>文本是否对齐到网格线</span>
                </label>
            </div>
            <div class="dcBody-content">
                <label>
                    <input type="checkbox" name="Printable" data-text="Printable" checked>
                    <span>是否打印网格线</span>
                </label>
            </div>
        </form>
        `;
        var dialogOptions = {
            title: "文档网格线设置",
            bodyClass: "DocumentGridLine",
            bodyHtml: DocumentGridLineHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var LineStyle_node = dcPanelBody.find("#LineStyle");
        let that = this;

        for (var i = 0; i < DASHSTYLE.length; i++) {
            var _DashStyle = DASHSTYLE[i];
            LineStyle_node.append("<option value='" + _DashStyle.name + "'>" + _DashStyle.show + _DashStyle.name + "</option>");
        }
        var DocumentGridLine_form = dcPanelBody.find("form#DocumentGridLine_form")[0];
        // 是否绘制网格线点击事件
        dcPanelBody.find("input[data-text=Visible]").on("click", function () {
            var isVisible = jQuery(this).is(":checked");
            that.changeFormDisable(DocumentGridLine_form, !isVisible);
        });

        function DocumentGridLineData(data) {
            var isChange = typeof (data) == "object";
            var obj = {};
            dcPanelBody.find("[data-text]").each(function () {
                var _el = jQuery(this);
                var _txt = _el.attr("data-text");
                if (this.type == "checkbox") {
                    obj[_txt] = _el.is(":checked");
                    if (isChange) {
                        _el.prop("checked", data[_txt]);
                        if (_txt == "Visible") {
                            //是否绘制网格线
                            that.changeFormDisable(DocumentGridLine_form, !data[_txt]);
                        }
                    }
                } else {
                    obj[_txt] = _el.val();
                    if (this.type == "number") {
                        obj[_txt] -= 0;
                    }
                    if (isChange) {
                        _el.val(data[_txt]);
                    }
                }
            })
            if (isChange) {
                return true;
            } else {
                return obj;
            }
        }
        // console.log("当前文档网格线设置值=>", opts)
        // 添加值
        DocumentGridLineData(opts);
        function successFun() {
            var _data = DocumentGridLineData();
            ctl.SetDocumentGridLine(_data);
            ctl.RefreshDocument();
        }
    },

    /**
    * 创建文档装订线设置对话框
    * @param options 文档装订线属性
    * @param ctl 编辑器元素
    */
    DocumentGutterDialog: function (options, ctl) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时，获取当前的文档装订线数据
            options = ctl.GetDocumentGutter();
        }
        options = keysToLowerCase(options);
        var opts = {
            "ShowGutterLine": "",
            "GutterPosition": "",
            "SwapGutter": "",
            "GutterStyle": ""
        };
        for (var i in opts) {
            var low_i = i.toLowerCase();
            if (Object.hasOwnProperty.call(options, low_i)) {
                opts[i] = options[low_i];
            }
        }
        var DocumentGutterHtml = `<div class="dcBody-content">
                <label>
                    <input type="checkbox" name="ShowGutterLine" data-text="ShowGutterLine">
                    <span>显示装订线</span>
                </label>
            </div>
            <div class="dcBody-content">
                <label>
                    <span class="txt">装订线距离：</span>
                    <input type="number" name="GutterPosition" data-text="GutterPosition" value="0">
                </label>
            </div>
            <div class="dcBody-content">
                <label>
                    <input type="checkbox" name="SwapGutter" data-text="SwapGutter" checked>
                    <span>为双面打印切换装订线</span>
                </label>
            </div>
            <div class="dcBody-content GutterStyleDiv">
                <span>位置</span>
                <label><input type="radio" name="GutterStyle" value="Left" data-text="GutterStyle" checked><span>左</span></label>
                <label><input type="radio" name="GutterStyle" value="Top" data-text="GutterStyle"><span>上</span></label>
                <label><input type="radio" name="GutterStyle" value="Right" data-text="GutterStyle"><span>右</span></label>
            </div>`;
        var dialogOptions = {
            title: "文档装订线设置",
            bodyClass: "DocumentGutter",
            bodyHtml: DocumentGutterHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        GetOrChangeData(dcPanelBody, opts);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            ctl.SetDocumentGutter(_data);
            ctl.RefreshDocument();
        }
    },

    /**
    * 创建单复选框属性对话框
    * @param options 单复选框属性
    * @param ctl 编辑器元素
    */
    CheckboxAndRadioDialog: function (options, ctl, ele) {
        if (!options || typeof (options) != "object" || Object.hasOwnProperty.call(options, "IsRadio") == false) {
            // 当未传入值时，获取当前的单复选框数据
            ele = ctl.CurrentElement("xtextradioboxelement");
            if (ele == null) {
                return false;
            }
            options = ctl.GetElementProperties(ele);
        }
        if (!options) {
            return false;
        }
        var checkboxAndRadioHTML = `
                    <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">编号：</span>
                    <input type="text" class="full" name="ID" data-text="ID">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">名称：</span>
                    <input type="text" class="full" name="Name" data-text="Name">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">文本：</span>
                    <input type="text" class="full" name="Text" data-text="Text">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">数值：</span>
                    <input type="text" class="full" name="Value" data-text="Value">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">提示文本：</span>
                    <input type="text" class="full" name="ToolTip" data-text="ToolTip">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">附加数据：</span>
                    <input type="text" class="full" name="StringTag" data-text="StringTag">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">显示样式：</span>
                    <select id="VisualStyle" class="full" data-text="VisualStyle">
                        <option value="Default">默认样式</option>
                        <option value="CheckBox">复选框样式</option>
                        <option value="RadioBox">单选框样式</option>
                        <option value="SystemDefault">操作系统默认样式</option>
                        <option value="SystemCheckBox">操作系统复选框样式</option>
                        <option value="SystemRadioBox">操作系统单选框样式</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <div class="checkboxs">
                    <label>
                        <input type="checkbox" name="Checked" id="Checked" data-text="Checked">
                        <span>处于选择状态</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Deleteable" id="Deleteable" data-text="Deleteable">
                        <span>可以删除</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Multiline" id="Multiline" data-text="Multiline">
                        <span>文本多行</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Enabled" id="Enabled" data-text="Enabled">
                        <span>对象是否可用</span>
                    </label>
                    <label>
                        <input type="checkbox" name="CheckAlignLeft" id="CheckAlignLeft" data-text="CheckAlignLeft">
                        <span>勾选框左对齐</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Requried" id="Requried" data-text="Requried">
                        <span>必勾项</span>
                    </label>
                    <label>
                        <input type="checkbox" name="CaptionFlowLayout" id="CaptionFlowLayout"
                            data-text="CaptionFlowLayout">
                        <span>文本参与流式排版</span>
                    </label>
                </div>
            </div>
        `;
        var IsRadio = options.IsRadio;//是否是单选框
        var dialogOptions = {
            title: (IsRadio ? "单" : "复") + "选框属性",
            bodyHeight: 455,
            bodyClass: "CheckboxAndRadio",
            bodyHtml: checkboxAndRadioHTML
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        WriterControl_Dialog.appendValueBindingDiv(dcPanelBody);
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        //成功的回调函数
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            ctl.SetElementProperties(ele, _data);
            ctl.RefreshDocument();
        }
    },

    /**
    * 创建插入多个单选框/复选框对话框
    * @param options 单复选框属性
    * @param ctl 编辑器元素
    */
    InsertMultipleCheckBoxOrRadioDialog: function (options, ctl) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时,
            options = {};
        }
        var InsertMultipleCheckBoxOrRadioHtml = `
        <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">名称：</span>
                    <input type="text" class="full" name="Name" data-text="Name">
                </label>
            </div>
            <div class="dcBody-content">
                <form class="Box IsRadioBox">
                    <h6 class="title">类型</h6>
                    <div class="dcBody-content">
                        <label class="firstRadio">
                            <input type="radio" name="Type" data-text="Type" value="radio" checked>
                            <span>单选框</span>
                        </label>
                        <label>
                            <input type="radio" name="Type" data-text="Type" value="checkbox">
                            <span>复选框</span>
                        </label>
                    </div>
                </form>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">显示样式：</span>
                    <select id="VisualStyle" class="full" data-text="VisualStyle">
                        <option value="Default">默认样式</option>
                        <option value="CheckBox">复选框样式</option>
                        <option value="RadioBox">单选框样式</option>
                        <option value="SystemDefault" selected="selected">操作系统默认样式</option>
                        <option value="SystemCheckBox">操作系统复选框样式</option>
                        <option value="SystemRadioBox">操作系统单选框样式</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <div class="checkboxs">
                    <label>
                        <input type="checkbox" name="Deleteable" id="Deleteable" data-text="Deleteable" checked>
                        <span>可以删除</span>
                    </label>
                    <label>
                        <input type="checkbox" name="CheckAlignLeft" id="CheckAlignLeft" data-text="CheckAlignLeft" checked>
                        <span>勾选框左对齐</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Multiline" id="Multiline" data-text="Multiline">
                        <span>文本多行</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Requried" id="Requried" data-text="Requried">
                        <span>必勾项</span>
                    </label>
                </div>
            </div>
            <div class="dcBody-content">
                <form class="Box">
                    <h6 class="title">项目</h6>
                    <table id="ListItems" data-text="ListItems" data-type="Array" class="scroll-table">
                        <thead>
                            <th>编号</th>
                            <th>文本</th>
                            <th>数值</th>
                            <th class="last">操作</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" data-arraytext="ID"></td>
                                <td><input type="text" data-arraytext="Text"></td>
                                <td><input type="text" data-arraytext="Value"></td>
                                <td class="delete" title="删除">×</td>
                            </tr>
                        </tbody>
                        <template class="template_item">
                            <tr>
                                <td><input type="text" data-arraytext="ID"></td>
                                <td><input type="text" data-arraytext="Text"></td>
                                <td><input type="text" data-arraytext="Value"></td>
                                <td class="delete" title="删除">×</td>
                            </tr>
                        </template>
                    </table>
                </form>
            </div>
        `;
        var dialogOptions = {
            title: "插入多个单选框/复选框",
            bodyHeight: 490,
            bodyClass: "InsertMultipleCheckBoxOrRadio",
            bodyHtml: InsertMultipleCheckBoxOrRadioHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        // 增加接口
        dcPanelBody.find("#ListItems").on("input", "input[data-arraytext]", function () {
            var input = jQuery(this);
            var tr = input.parents("tr");
            if (tr.nextAll("tr").length == 0) {
                var ListItems_item = input.parents("table").find("template.template_item")[0];
                tr.after(ListItems_item.content.cloneNode(true));
            }
        });
        dcPanelBody.find("#ListItems").on("click", "td.delete", function () {
            var tr = jQuery(this).parents("tr");
            if (tr.nextAll("tr").length > 0) {
                tr.remove();
            }
        });
        GetOrChangeData(dcPanelBody, opts);

        function successFun() {
            let { Type, Name, VisualStyle, Deleteable, CheckAlignLeft, Multiline, Requried, ListItems } = GetOrChangeData(dcPanelBody);
            for (var i = 0; i < ListItems.length; i++) {
                ListItems[i] = {
                    ...ListItems[i],
                    VisualStyle,
                    Deleteable,
                    CheckAlignLeft,
                    Multiline,
                    Requried,
                }
            }
            var newData = {
                Type,
                Name,
                ListItems
            }
            ctl.DCExecuteCommand("insertcheckboxorradio", false, newData);
        }
    },

    /**
    * 创建文本标签属性对话框
    * @param options 文本标签属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    LabelDialog: function (options, ctl, isInsertMode, ele) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时
            if (isInsertMode == true) {
                options = {};
            } else {
                ele = ctl.CurrentElement('xtextlabelelement');
                if (ele == null) {
                    return false;
                }
                options = ctl.GetElementProperties(ele);
                if (options == null) {
                    return false;
                }
            }
        }
        if (!options) {
            return false;
        }
        if (Object.hasOwnProperty.call(options, "Text") == false) {
            // 当数据中不包含Text时，赋值默认
            options.Text = "标签文本";
        }
        var LabelHtml = `
                    <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">编号：</span>
                    <input type="text" class="full" name="ID" data-text="ID">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">名称：</span>
                    <input type="text" class="full" name="Name" data-text="Name">
                </label>
            </div>
            <div class="dcBody-content">
                <div class="checkboxs">
                    <label>
                        <input type="checkbox" name="AutoSize" id="AutoSize" data-text="AutoSize" checked>
                        <span>自动大小</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Multiline" id="Multiline" data-text="Multiline" checked>
                        <span>自动换行</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Deleteable" id="Deleteable" data-text="Deleteable" checked>
                        <span>能否被删除</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Bold" id="Bold" data-text="Bold" checked>
                        <span>是否加粗</span>
                    </label>
                </div>
            </div>
            <div class="dcBody-content">
                <form class="Box">
                    <h6 class="title">连接模式设置</h6>
                    <div class="dcBody-content">
                        <label class="flex">
                            <span class="dcTitle-text">模式：</span>
                            <select id="ContactAction" data-text="ContactAction" class="full">
                                <option value="Disable">Disable</option>
                                <option value="Normal">Normal</option>
                                <option value="FirstTableRowInPage">FirstTableRowInPage</option>
                                <option value="LasrSectioInpage">LasrSectioInpage</option>
                                <option value="TableRow">TableRow</option>
                                <option value="FirstTableRowInpage">FirstTableRowInpage</option>
                                <option value="LastTableRowInpage">LastTableRowInpage</option>
                            </select>
                        </label>
                    </div>
                    <div class="dcBody-content">
                        <label class="flex">
                            <span class="dcTitle-text">属性名：</span>
                            <input type="text" class="full" name="AttributeNameForContactAction"
                                data-text="AttributeNameForContactAction">
                        </label>
                    </div>
                    <div class="dcBody-content">
                        <label class="flex">
                            <span class="dcTitle-text">连接文本：</span>
                            <input type="text" class="full" name="LinkTextForContactAction"
                                data-text="LinkTextForContactAction">
                        </label>
                    </div>
                </form>
            </div>
            <div class="dcBody-content">
                <label class="blockelement">
                    <div>文本：</div>
                    <div>
                        <textarea data-text="Text" value="标签文本"></textarea>
                    </div>
                </label>
            </div>
        `;
        var dialogOptions = {
            title: "文本标签元素",
            bodyHeight: 475,
            bodyClass: "labelElement",
            bodyHtml: LabelHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("InsertLabelElement", false, _data);
            } else {
                ctl.SetElementProperties(ele, _data);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建水平线/分割线属性对话框
    * @param options 水平线/分割线属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    HorizontalLineDialog: function (options, ctl, isInsertMode, ele) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时
            if (isInsertMode == true) {
                options = {};
            } else {
                ele = ctl.CurrentElement('xtexthorizontallineelement');
                if (ele == null) {
                    return false;
                }
                options = ctl.GetElementProperties(ele);
            }
        }
        if (options == null) {
            return false;
        }
        var HorizontalLineHtml = `
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">编号：</span>
                <input type="text" class="full" name="ID" data-text="ID">
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">颜色：</span>
                <input type="color" class="full" name="Color" data-text="Color">
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">线条样式：</span>
                <select class="full" id="Style" name="Style" data-text="LineStyle">
                    <option value="Solid">Solid</option>
                    <option value="Dash">Dash</option>
                    <option value="Dot">Dot</option>
                    <option value="DashDot">DashDot</option>
                    <option value="DashDotDot">DashDotDot</option>
                </select>
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">线条粗细：</span>
                <input type="number" class="full" name="Width" data-text="LineSize">
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">线条长度：</span>
                <input type="number" class="full" name="Length" data-text="LineLengthInCM">
                <input type="hidden" class="full" name="Unit" data-text="Unit" value="pixel">
            </label>
        </div>
        `;
        var dialogOptions = {
            title: "水平分割线属性",
            bodyHeight: 220,
            bodyClass: "HorizontalLineElement",
            bodyHtml: HorizontalLineHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("InsertHorizontalLine", false, _data);
            } else {
                ctl.SetElementProperties(ele, _data);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建页码属性对话框
    * @param options 页码属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    PageNumberDialog: function (options, ctl, isInsertMode, ele) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时
            if (isInsertMode == true) {
                options = {};
            } else {
                ele = ctl.CurrentElement('xtextpageinfoelement');
                options = ctl.GetElementProperties(ele);
            }
        }
        if (options == null) {
            return false;
        }
        var PageNumberHtml = `
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">编号：</span>
                    <input type="text" class="full" name="ID" data-text="ID">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">宽度：</span>
                    <input type="number" class="full" name="Width" data-text="Width">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">高度：</span>
                    <input type="number" class="full" name="Height" data-text="Height">
                </label>
            </div>
            <div class="dcBody-content">
                <span class="dcTitle-text">内容：</span>
                <input type="hidden" name="ValueType" data-text="ValueType">
                <ul id="ValueType">
                    <li data-value="PageIndex" class="active">页码</li>
                    <li data-value="NumOfPages">总页码</li>
                    <li data-value="LocalPageIndex">本地页码</li>
                    <li data-value="LocalNumOfPages">本地总页码</li>
                </ul>
            </div>
            <div class="dcBody-content" style="display: none;">
                <label class="flex minflex">
                    <span class="dcTitle-text">数字显示格式：</span>
                    <select id="DigitalDisplayFormat" class="full Caption">
                        <option value="None">无</option>
                        <option value="ListNumberStyle" selected>1. 2. 3. 4.</option>
                        <option value="ListNumberStyleArabic1">1, 2, 3, 4,</option>
                        <option value="ListNumberStyleArabic2">1) 2) 3) 4)</option>
                        <option value="ListNumberStyleLowercaseLetter ">a) b) c) d)</option>
                        <option value="ListNumberStyleLowercaseRoman">i) ii) iii) iv)</option>
                        <option value="ListNumberStyleSimpChinNum1">一. 二. 三. 四.</option>
                        <option value="ListNumberStyleSimpChinNum2">一) 二) 三) 四)</option>
                        <option value="ListNumberStyleNumberInCircle">①, ②, ③, ④,</option>
                        <option value="ListNumberStyleTradChinNum1">壹. 贰. 叁. 肆.</option>
                        <option value="ListNumberStyleTradChinNum2">壹) 贰) 叁) 肆)</option>
                        <option value="ListNumberStyleUppercaseLetter">A) B) C) D)</option>
                        <option value="ListNumberStyleUppercaseRoman">I) II) III) IV)</option>
                        <option value="ListNumberStyleZodiac1">甲, 乙, 丙, 丁,</option>
                        <option value="ListNumberStyleZodiac2">子, 丑, 寅, 卯,</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex minflex">
                    <span class="dcTitle-text">格式化字符串：</span>
                    <input type="text" class="full" name="FormatString" data-text="FormatString"
                        list="FormatStringList">
                    <datalist id="FormatStringList">
                        <option value="第[%PageIndex%]页 共[%NumOfPages%]页">第[%PageIndex%]页 共[%NumOfPages%]页</option>
                        <option value="[%PageIndex%]/[%NumOfPages%]">[%PageIndex%]/[%NumOfPages%]</option>
                    </datalist>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="Newline">
                    <span class="dcTitle-text">指定的页码编号文本列表：</span>
                    <input type="text" class="full" name="SpecifyPageIndexTextList"
                        data-text="SpecifyPageIndexTextList">
                </label>
            </div>
        `;
        var dialogOptions = {
            title: "页码属性对话框",
            bodyHeight: 400,
            bodyClass: "HorizontalLineElement",
            bodyHtml: PageNumberHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var ValueTypeInput = dcPanelBody.find("[data-text=ValueType]");
        var lis = dcPanelBody.find("#ValueType li");
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        lis.removeClass("active");
        lis.filter("[data-value='" + ValueTypeInput.val() + "']").addClass("active");
        if (lis.filter(".active").length == 0) {
            lis.eq(0).addClass("active");
        }
        // 页码内容选择
        lis.on('click', function () {
            jQuery(this).siblings("li").removeClass("active");
            jQuery(this).addClass("active");
            ValueTypeInput.val(jQuery(this).attr("data-value"));
        });
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("InsertPageInfoElement", false, _data);
            } else {
                ctl.SetElementProperties(ele, _data);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建按钮属性对话框
    * @param options 按钮属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    ButtonDialog: function (options, ctl, isInsertMode, ele) {
        // ctl.CurrentElement('xtextbuttonelement');
        if (!options || typeof (options) != "object") {
            // 当未传入值时
            if (isInsertMode == true) {
                options = {};
            } else {
                ele = ctl.CurrentElement('xtextbuttonelement');
                if (ele == null) {
                    return false;
                }
                options = ctl.GetElementProperties(ele);
            }
        }
        if (options == null) {
            return false;
        }
        var ButtonHtml = `
        <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">编号：</span>
                    <input type="text" class="full" name="ID" data-text="ID">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">名称：</span>
                    <input type="text" class="full" name="Name" data-text="Name">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">宽度：</span>
                    <input type="number" class="full" name="Width" data-text="Width">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">高度：</span>
                    <input type="number" class="full" name="Height" data-text="Height">
                </label>
            </div>
            <div class="dcBody-content">
                <div class="checkboxs">
                    <label>
                        <input type="checkbox" name="Deleteable" id="Deleteable" data-text="Deleteable" checked>
                        <span>能否被删除</span>
                    </label>
                    <label>
                        <input type="checkbox" name="Enabled" id="Enabled" data-text="Enabled" checked>
                        <span>是否可用</span>
                    </label>
                    <label>
                        <input type="checkbox" name="AutoSize" id="AutoSize" data-text="AutoSize">
                        <span>自动大小</span>
                    </label>
                    <label>
                        <input type="checkbox" name="PrintAsText" id="PrintAsText" data-text="PrintAsText">
                        <span>以文本方式打印</span>
                    </label>
                </div>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">打印时可见：</span>
                    <select id="PrintVisibility" data-text="PrintVisibility" class="full">
                        <option value="Visible">显示</option>
                        <option value="Hidden">隐藏</option>
                        <option value="None">隐藏而且不占位</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">命令文本：</span>
                    <input type="text" class="full" name="CommandName" data-text="CommandName">
                </label>
            </div>
            <div class="dcBody-content" style="color:red;">注：下面图片使用png格式图片</div>
            <div class="dcBody-content">
                <label class="flex imgButtonBox">
                    <span class="dcTitle-text">按钮图片：</span>
                    <button class="full" name="ImgBase64" data-text="ImgBase64" data-value="img">
                        <img src="" alt="">
                        <input type="file" accept="image/*">
                    </button>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex imgButtonBox">
                    <span class="dcTitle-text">按下时图片：</span>
                    <button class="full" name="ImgBase64ForDown" data-text="ImgBase64ForDown" data-value="img">
                        <img src="" alt="">
                        <input type="file" accept="image/*">
                    </button>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex imgButtonBox">
                    <span class="dcTitle-text">鼠标悬停时图片：</span>
                    <button class="full" name="ImgBase64ForOver" data-text="ImgBase64ForOver" data-value="img">
                        <img src="" alt="">
                        <input type="file" accept="image/*">
                    </button>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="blockelement">
                    <div>文本：</div>
                    <div>
                        <textarea data-text="Text"></textarea>
                    </div>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="blockelement">
                    <div>脚本文本：</div>
                    <div>
                        <textarea data-text="ScriptTextForClick"></textarea>
                    </div>
                </label>
            </div>
        `;
        var dialogOptions = {
            title: "按钮属性",
            bodyHeight: 400,
            bodyClass: "ButtonElement",
            bodyHtml: ButtonHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        // 图片的默认赋值
        dcPanelBody.find("[data-value='img']").each(function () {
            var imgNode = jQuery(this).find("img");
            var _val = jQuery(this).val();
            if (_val) {
                var str = _val;
                if (_val.indexOf("base64,") == -1) {
                    str = "data:image/png;base64," + str;
                    jQuery(this).val(str);
                }
                imgNode.attr("src", str);
            } else {
                // 没有内容，隐藏
                imgNode.hide();
            }
        });
        // 图片的提交
        dcPanelBody.find("[data-value='img'] [type='file']").on("change", function () {
            var files = this.files;
            if (files.length == 0) {
                return;
            }
            var btnNode = jQuery(this).parent();
            var imgNode = btnNode.find("img");
            if (files[0] && files[0].type.slice(0, 5) == "image") {
                var fileinfo = files[0];
                var reader = new FileReader();
                reader.readAsDataURL(fileinfo);
                reader.onload = function () {
                    var base64 = reader.result;
                    imgNode.attr("src", base64);
                    imgNode.show();
                    // var str = base64.substr(base64.indexOf("base64,") + 7, base64.length);
                    btnNode.val(base64);
                };
                reader.onerror = function (error) {
                    console.log(error);
                }
            }
        });
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("InsertButton", false, _data);
            } else {
                ctl.SetElementProperties(ele, _data);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建二维码属性对话框
    * @param options 二维码属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    QRCodeDialog: function (options, ctl, isInsertMode, ele) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时
            if (isInsertMode == true) {
                options = {};
            } else {
                ele = ctl.CurrentElement('xtexttdbarcodeelement');
                if (ele == null) {
                    return false;
                }
                options = ctl.GetElementProperties(ele);
            }
        }

        if (options == null) {
            return false;
        }
        var QRCodeHtml = `
                    <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">编号：</span>
                    <input type="text" class="full" name="ID" data-text="ID">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="blockelement">
                    <div>文本：</div>
                    <div>
                        <textarea data-text="Text"></textarea>
                    </div>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">宽度：</span>
                    <input type="number" class="full" name="Width" data-text="Width">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">高度：</span>
                    <input type="number" class="full" name="Height" data-text="Height">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">类型：</span>
                    <select id="BarcodeStyle" data-text="BarcodeStyle" class="full">
                        <option value="QR">QR</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">纠错能力：</span>
                    <select id="ErroeCorrectionLevel" data-text="ErroeCorrectionLevel" class="full">
                        <option value="L">L:7%的字码可被修正</option>
                        <option value="M" selected>M:15%的字码可被修正</option>
                        <option value="Q">Q:25%的字码可被修正</option>
                        <option value="H">H:30%的字码可被修正</option>
                    </select>
                </label>
            </div>
        `;
        var dialogOptions = {
            title: "二维码属性",
            bodyHeight: 420,
            bodyClass: "QRCodeElement",
            bodyHtml: QRCodeHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        WriterControl_Dialog.appendValueBindingDiv(dcPanelBody);
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });

        GetOrChangeData(dcPanelBody, opts);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("InsertTDBarcodeElement", false, _data);
            } else {
                ctl.SetElementProperties(ele, _data);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建条形码属性对话框
    * @param options 条形码属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    BarCodeDialog: function (options, ctl, isInsertMode, ele) {
        if (!options || typeof (options) != "object") {
            // 当未传入值时
            if (isInsertMode == true) {
                options = {};
            } else {
                ele = ctl.CurrentElement('xtextnewbarcodeelement');
                if (ele == null) {
                    return false;
                }
                options = ctl.GetElementProperties(ele);
            }
        }
        if (options == null) {
            return false;
        }
        var BarCodeHtml = `
                    <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">编号：</span>
                    <input type="text" class="full" name="ID" data-text="ID">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">名称：</span>
                    <input type="text" class="full" name="Name" data-text="Name">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">文本内容：</span>
                    <input type="text" class="full" name="Text" data-text="Text">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">宽度：</span>
                    <input type="number" class="full" name="Width" data-text="Width">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">高度：</span>
                    <input type="number" class="full" name="Height" data-text="Height">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">条码样式：</span>
                    <select id="BarcodeStyle" data-text="BarcodeStyle" class="full">
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">文本对齐方式：</span>
                    <select id="TextAlignment" data-text="TextAlignment" class="full">
                        <option value="Near">左对齐</option>
                        <option value="Center" selected="selected">居中对齐</option>
                        <option value="Far">右对齐</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label>
                    <input type="checkbox" name="ShowText" data-text="ShowText" checked="checked">
                    <span class="dcTitle-text">是否显示文本</span>
                </label>
            </div>
        `;
        var dialogOptions = {
            title: "条形码属性",
            bodyHeight: 360,
            bodyClass: "BarcodeElement",
            bodyHtml: BarCodeHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var BarcodeStyleSelect = dcPanelBody.find("select#BarcodeStyle");
        WriterControl_Dialog.appendValueBindingDiv(dcPanelBody);
        var BarcodeStyleArr = [{ "Text": "UPCA" }, { "Text": "UPCE" }, { "Text": "SUPP2" }, { "Text": "SUPP5" }, { "Text": "EAN13" }, { "Text": "EAN8" }, { "Text": "Interleaved2of5" }, { "Text": "I2of5" }, { "Text": "Standard2of5" }, { "Text": "Code39" }, { "Text": "Code39Extended" }, { "Text": "Code93" }, { "Text": "Codabar" }, { "Text": "PostNet" }, { "Text": "BOOKLAND" }, { "Text": "ISBN" }, { "Text": "JAN13" }, { "Text": "MSI_Mod10" }, { "Text": "MSI_2Mod10" }, { "Text": "MSI_Mod11" }, { "Text": "MSI_Mod11_Mod10" }, { "Text": "Modified_Plessey" }, { "Text": "CODE11" }, { "Text": "USD8" }, { "Text": "UCC12" }, { "Text": "UCC13" }, { "Text": "LOGMARS" }, { "Text": "Code128A" }, { "Text": "Code128B" }, { "Text": "Code128C", "Selected": true }];
        var BarcodeStyleSelectHtml = "";
        for (var i = 0; i < BarcodeStyleArr.length; i++) {
            var style_txt = BarcodeStyleArr[i].Text;
            var optHtml = "<option value='" + style_txt + "'";
            if (BarcodeStyleArr[i].Selected == true) {
                optHtml += " selected='selected'";
            }
            optHtml += ">" + style_txt + "</option>";
            BarcodeStyleSelectHtml += optHtml;
        }
        BarcodeStyleSelect.html(BarcodeStyleSelectHtml);
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("InsertBarcodeElement", false, _data);
            } else {
                ctl.SetElementProperties(ele, _data);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建字体选择对话框
    * @param options 字体属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    FontSelectionDialog: function (options, ctl, isInsertMode) {
        if (!options || typeof (options) != "object") {
            options = ctl.getFontObject();
        }
        if (options == null) {
            return false;
        }
        var arrFont = []
        if (window.WriterControl_SupportFontFamilys && window.WriterControl_SupportFontFamilys.length) {
            arrFont = window.WriterControl_SupportFontFamilys;
        } else {
            arrFont = window.WriterControl_SupportFontFamilys = ctl.getSupportFontFamilys();
        }
        var fontFormatHtml = `
                <div class="font-content-dialog" id="font-content-dialog">
                   <div class="font-box">
                        字体(F)：
                        <input type="text" id="font-input" data-text="fontFamily">
                        <ul class="ul-content" id="fontFamilyUl"></ul>
                   </div>
                   <div class="font-box">
                        大小(S)：
                        <input type="text" id="font-size-input" data-text="fontSize">
                        <ul class="ul-content" id="fontSizeUl"></ul>
                   </div>
                </div>  
                <div id="font-check-box">
                    <div class="font-style-content-dialog Box">
                        <h6 class="title">字形</h6>
                        <div class="font-style-box">
                            <div class="Body-V"> <label> <input type="checkbox"  data-text="Bold"  id="Bold">粗体</label></div>
                            <div class="Body-V"> <label> <input type="checkbox"  data-text="Italic" id="Italic">斜体</label></div>
                        </div>
                    </div>  
                    <div class="font-style-content-dialog Box">
                        <h6 class="title">效果</h6>
                        <div class="font-style-box">
                            <div class="Body-V"> <label> <input type="checkbox"  data-text="Underline"  id="Underline">下划线(U)</label></div>
                            <div class="Body-V"> <label> <input type="checkbox"  data-text="Strikeout"  id="Strikeout">删除线(k)</label></div>
                        </div>
                    </div> 
                </div>
            `;
        var dialogOptions = {
            title: "选择字体对话框",
            bodyHeight: 400,
            bodyClass: "fontStyleElement",
            bodyHtml: fontFormatHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);

        // 字号大小
        var dataFontSize = [
            8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72, "初号", "小初", "一号", "小一", "二号", "小二", "三号", "小三", "四号", "小四", "五号", "小五", "六号", "小六", "七号", "八号"
        ];

        var fontFamilyUl = dcPanelBody.find("ul#fontFamilyUl");//字体样式
        var fontFamilyUlHtml = "";
        arrFont.forEach(function (obj) {
            if (obj.ch) {
                var styleStr = "font-family:" + obj.ch + ";";
                if (obj.ch == opts.fontFamily) {
                    styleStr += "background:#0078D7;color:#FFFFFF;";
                }
                fontFamilyUlHtml += "<li class='font-item' style='" + styleStr + "'>" + obj.ch + "</li>";
            }
        });
        fontFamilyUl.html(fontFamilyUlHtml);
        var fontSizeUl = dcPanelBody.find("ul#fontSizeUl");//字体大小
        var fontSizeUlHtml = "";
        dataFontSize.forEach(function (value) {
            if (value) {
                var styleStr = "";
                if (value == opts.fontSize) {
                    styleStr += "background:#0078D7;color:#FFFFFF;";
                }
                fontSizeUlHtml += "<li class='font-item' style='" + styleStr + "'>" + value + "</li>";
            }
        });
        fontSizeUl.html(fontSizeUlHtml);
        dcPanelBody.find("ul#fontFamilyUl li,ul#fontSizeUl li").click(function () {
            var _fontbox = jQuery(this).parents(".font-box");
            _fontbox.find("input").val(jQuery(this).text());
            jQuery(this).css({
                "background": "#0078D7",
                "color": "#FFFFFF"
            }).siblings("li").css({
                "background": "none",
                "color": "black"
            });
        });
        function successFun() {
            // var dialogContainer = jQuery(ctl).children('#dialogContainer');
            // var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
            var _data = GetOrChangeData(dcPanelBody);
            ctl.setFontObject(_data);
        }
    },

    /**
    * 创建图片属性对话框
    * @param options 图片属性
    * @param ctl 编辑器元素
    */
    ImageDialog: function (options, ctl, ele) {
        var ele = null;
        if (!options || typeof (options) != "object") {
            // 当未传入值时
            ele = ctl.CurrentElement('xtextimageelement');
            if (ele == null) {
                return false;
            }
            options = ctl.GetElementProperties(ele);
        }
        var ImageHtml = `
                    <div class="Box">
                <h6 class="title">属性</h6>
                <div class="dcBody-content">
                    <label class="flex">
                        <span class="dcTitle-text">编号：</span>
                        <input type="text" class="full" name="ID" data-text="ID">
                    </label>
                </div>
                <div class="dcBody-content">
                    <label class="flex">
                        <span class="dcTitle-text">宽度：</span>
                        <input type="number" class="full" name="Width" data-text="Width">
                    </label>
                </div>
                <div class="dcBody-content">
                    <label class="flex">
                        <span class="dcTitle-text">高度：</span>
                        <input type="number" class="full" name="Height" data-text="Height">
                    </label>
                </div>
                <div class="dcBody-content">
                    <label>
                        <input type="checkbox" name="SaveContentInFile" data-text="SaveContentInFile" checked="checked">
                        <span class="dcTitle-text">在文档中保存图片数据</span>
                    </label>
                </div>
            </div>
            <div class="Box">
                <h6 class="title">图片内容</h6>
                <div id="image_box" class="dcBody-content">
                    <button id="changeImage" onclick="this.querySelector('input').click()">
                        <span>修改图片</span>
                        <input type="file" style="display: none;" accept="image/*">
                    </button>
                    <div class="imgDiv">
                        <input type="hidden" data-text="Src" data-value="img">
                        <img src="" alt="" id="SrcImg">
                    </div>
                </div>
            </div>
        `;
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var dialogOptions = {
            title: "图片元素",
            bodyHeight: 475,
            bodyClass: "ImageElement",
            bodyHtml: ImageHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        // WriterControl_Dialog.appendValueBindingDiv(dcPanelBody);
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });

        GetOrChangeData(dcPanelBody, opts);
        // 图片的默认赋值
        dcPanelBody.find("[data-value='img']").each(function () {
            var _val = this.value.replace(/[\n\r]/g, "").replace(/ /g, "");
            if (_val) {
                var str = _val;
                if (_val.indexOf("base64,") == -1) {
                    str = "data:image/png;base64," + str;
                    // jQuery(this).val(str);
                }
                jQuery(this).siblings("img#SrcImg").attr("src", str);
            }
        });
        dcPanelBody.find("#changeImage input").change(function () {
            var files = this.files;
            if (files.length == 0) {
                return;
            }
            var image_box = jQuery(this).parents("#image_box:first");
            var imgNode = image_box.find("img#SrcImg");
            var imgInputNode = image_box.find("[data-value=img]");
            if (files[0] && files[0].type.slice(0, 5) == "image") {
                var fileinfo = files[0];
                var reader = new FileReader();
                reader.readAsDataURL(fileinfo);
                reader.onload = function () {
                    var base64 = reader.result;
                    imgNode.attr("src", base64);
                    imgInputNode.val(base64);
                    // imgNode.show();
                    // var str = base64.substr(base64.indexOf("base64,") + 7, base64.length);
                    // btnNode.val(str);
                };
                reader.onerror = function (error) {
                    console.log(error);
                }
            }
        });
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            ctl.SetElementProperties(ele, _data);
            ctl.RefreshDocument();//不刷新看不到效果
        }
    },

    /**
    * 创建输入域属性对话框
    * @param options 输入域属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    InputFieldDialog: function (options, ctl, isInsertMode, ele) {
        if (!isInsertMode) {
            ele = ctl.CurrentInputField();
            if (ele == null) {
                return false;
            }
            options = ctl.GetElementProperties(ele);
        }
        let optionsId = options && options.ID ? options.ID : ''
        var InnerListSourceName = ''
        if (options && options.InnerListSourceName) {
            var InnerListSourceName = options.InnerListSourceName
        }
        var InputFieldHTML = `
    <!-- 选项卡 -->
    <div class="InputFieldContent">
       <p id="InputFieldContentButtonBox" class="buttonBox">
            <span showDomId="tab1" class="tabButton active">常规</span>
            <span showDomId="tab2" class="tabButton">格式</span>
            <span showDomId="tab3" class="tabButton">校验</span>
            <span  showDomId="tab4" class="tabButton">其他</span>
        </p>
      
    <div class="tab-content" style="height: 334px;overflow-y: auto;">
        <!-- 第一个  -->
        <div id="tab1" class="tab" style="display: block;flex: 1;width:100%;height:auto;">
            <div class="Box">
                <h6 class="title">基本属性</h6>
                   <div class="tab1Content">
                        <label>
                            <span> *编号(ID)：</span>
                            <input class="Ipt-i" id="NumberId" data-text="ID" placeholder="" type="text"></input>
                        </label>
                        <label>
                            <span>*名称(Name)：</span>
                            <input class="Ipt-i" id="Name1" data-text="Name" type="text"></input>
                        </label>

                        <label>
                            <span>背景文字：</span>
                            <input class="Ipt-i" id="BackgroundText" data-text="BackgroundText"  type="text"></input>
                        </label>
                        <label>
                            <span>提示文字：</span>
                            <input class="Ipt-i" id="ToolTip" data-text="ToolTip" type="text"></input>
                        </label>
                        <label>
                            <span>边框：</span>
                            <div class="borderBox" style="flex:1;display:flex;justify-content:space-between;"></input>
                                <label style="display: flex;">
                                    <span id="zuo">(左):</span>
                                    <input style="width:40px" class="Ipt-O" id="StartBorderText" data-text="StartBorderText" type="text"></input>
                                </label>
                                <label  style="display: flex;">
                                    <span id="you">(右):</span>
                                    <input style="width:40px" class="Ipt-O" id="EndBorderText" data-text="EndBorderText"  type="text"></input>
                                </label>
                            </div>
                        </label>
                        <label>
                            <span>内容对齐方式：</span>
                            <select id="Alignment" data-text="Alignment">
                                <option value="Near">Near</option>
                                <option value="Center">Center</option>
                                <option value="Far">Far</option>
                            </select>
                        </label>
                        <label>
                            <span>固定宽度：</span>
                            <input class="Ipt-i"  data-text="SpecifyWidth" id="SpecifyWidth" type="number"></input>
                        </label>
                        <label>
                            <span>焦点快捷键：</span>
                            <select id="MoveFocusHotKey" data-text="MoveFocusHotKey">
                                <option value="None">None</option>
                                <option value="Default">Default</option>
                                <option value="Tab">Tab</option>
                                <option value="Enter">Enter</option>
                            </select>
                        </label>
                        <label>
                            <span>标签文本：</span>
                            <input class="Ipt-i" id="LabelText" data-text="LabelText" type="text"></input>
                        </label>
                        <label>
                            <span>单位文本：</span>
                            <input class="Ipt-i" id="UnitText"  data-text="UnitText" type="text"></input>
                        </label>
                        <label>
                            <span>简单级联：</span>
                            <input class="Ipt-i" id="DefaultEventExpression"  data-text="DefaultEventExpression" type="text"></input>
                        </label>
                        <label style="position: relative;">
                            <span>激活模式：</span>
                            <p id="EditorActiveModeButton" data-text="EditorActiveMode" class="Ipt-i"> None</p>
                        </label>
                   </div>
                </div>


                   <div class="Box">
                        <h6 class="title">权限属性：</h6>
                        <div class="tab2Content" >
                            <label>
                                <span>是否只读:</span>
                                <select id="ContentReadonly"  data-text="ContentReadonly" >
                                    <option value="Inherit">继承父级元素</option>
                                    <option value="True">是</option>
                                    <option value="False">否</option>
                                </select>
                            </label>
                            <label>
                                <input style="vertical-align: text-top;" type="checkbox" data-text="Deleteable" name="running" checked="true" id="Deleteable">是否允许被删除</input>
                            </label>
                            <label>
                                <input style="vertical-align: text-top;" type="checkbox" data-text="UserEditable" name="running" checked="true" id="UserEditable">是否可以直接编辑修改内容</input>
                            </label>
                            <label>
                            </label>
                            <label style="display: flex;">
                                <span >输入最大字符数:</span>
                                <input style="width: 120px;"  data-text="MaxInputLength" class="Ipt-i" id="MaxInputLength" type="number" />
                            </label>
                            <label style="display: flex;">
                                <span>加密显示:</span>
                                <select id="ViewEncryptType"  data-text="ViewEncryptType" >
                                    <option value="None">不加密</option>
                                    <option value="Partial">部分加密</option>
                                    <option value="Both">全部加密</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div class="Box">
                        <h6 class="title">赋值属性：</h6>
                        <div class="tab3Content">
                            <label>
                                <span>数据源名称：</span>
                                <input class="Ipt-i" id="DataSource" data-text="Datasource" type="text" />
                            </label>
                            <label style="margin:4px 0;">
                                <span>绑定路径：</span>
                                <input class="Ipt-i" id="BindingPath" data-text="BindingPath" type="text" />
                            </label>
                            <label>
                                <span>Text绑定路径：</span>
                                <input class="Ipt-i" id="BindingPathForText" type="text" data-text="BindingPathForText" />
                            </label>
                        </div>
                    </div>

                    <div class="Box">
                        <h6 class="title">颜色属性：</h6>
                        <div style="line-height: 20px;">
                            <label>
                                <input type="checkbox" id="ExtendColorCheck" />
                                <span>继承文档颜色</span>
                            </label>
                        </div>
                        <div id="colorContainer" class="tab4Content">
                            <label style="margin-right:10px;">
                                <span>文字颜色：</span>
                                <input style="width:20px;height:20px;" data-text="TextColor" class="Ipt-i" type="color" id="TextColor" />
                            </label>
                            <label style="margin-right:10px;">
                                <span>背景文字颜色：</span>
                                <input style="width:20px;height:20px;" data-text="BackgroundTextColor" class="Ipt-i" type="color" id="BackgroundTextColor" />
                            </label>
                        </div>
                    </div>
            </div>

        <!-- 第二个  -->
        <div id="tab2" style="display: none;" class="tab">
            <label>
                <input class="tab2-radio-ipt" type="radio" id="Text" name="myRadioGroup">纯文本元素(Text)</input>
            </label>
            <label>
                <input class="tab2-radio-ipt tab2-check-box-item-parent" id="DropDownList" type="radio" name="myRadioGroup" id="DropdownList">
                下拉列表方式(DorpDownList)</input>
            </label>
            <div class="Box" style="margin-left:18px;width:76%;">
                <h6 class="title">列表方式</h6>
                <div id="tab2-check-box" class="Check-box">
                    <label style="width:30%;margin: 10px 0;">
                        <input class="tab2-check-box-item" type="checkbox" name="runnings" data-text="InnerMultiSelect" id="InnerMultiSelect">是否允许多选</input>
                    </label>
                    <label style="width:30%;margin: 10px 0;">
                        <input class="tab2-check-box-item" type="checkbox" name="runnings" data-text="DynamicListItems" id="DynamicListItems">动态下拉列表</input>
                    </label>
                    <label style="display: flex;">
                    <span  style=" width: 150px;">列表项目分割字符:</span>
                        <select id="ListValueSeparatorChar" data-text="ListValueSeparatorChar">
                            <option value=",">,</option>
                            <option value="、">、</option>
                            <option value="|">|</option>
                            <option value="#">#</option>
                            <option value="*">*</option>
                        </select>
                    </label>
                    <div class="ListValueFormatString" style="display: block;">
                        <label for="ListValueFormatString" title="列表格式化">列表格式化:</label>
                        <input type="text" data-text="ListValueFormatString" name="ListValueFormatString" value="" list="ListValueFormatString" autocomplete="off">
                        <datalist id="ListValueFormatString">
                            <option value="" style="background-color: #eee;"></option>
                            <option value="有[includelist],无[excludelist]" style="background-color: #eee;"></option>
                        </datalist>
                    </div>

                    <label style="width:100%">
                        <span >静态选择项内容：</span>
                        <input type="text" id="StaticSelection" class="tab2-check-box-item" readonly="readonly" name="runnings">
                        <button id="browseTextTableContent" class="browse tab2-check-box-item" name="runnings">浏览</button>
                    </label>
                </div>
            </div>
            
             <label>
                <input class="tab2-radio-ipt" type="radio" name="myRadioGroup" id="DateTime">日期时间格式(DataTime)</input>
            </label>
            <label>
                <input class="tab2-radio-ipt" type="radio" name="myRadioGroup" id="Date">日期格式(Time)</input>
            </label>
            <label>
                <input class="tab2-radio-ipt" type="radio" name="myRadioGroup" id="Numeric">数字类型(Numeric)</input>
            </label>
            <label>
                <input class="tab2-radio-ipt" type="radio" name="myRadioGroup" id="Time">时间格式(Time)</input>
            </label>
            <label>
                <input class="tab2-radio-ipt" type="radio" name="myRadioGroup" id="DateTimeWithoutSecond">日期时间格式(不含秒)(DataTime)</input>
            </label>
            <div > 
                <div class="Box" style="height:300px">
                    <h6 class="title">输出格式：</h6>
                    <div style="display: flex;max-height: 350px;">
                        <div style="flex:1">
                            <span style="display: inline-block;width: 100%;">格式类型:</span>
                            <input class="selection" data-text="DisplayFormat" type="text" id="DisplayFormat">
                            <ul id="UI-1" style="width:154px;border:1px solid #767676;background: #ffffff;"></ul>
                        </div>
                        <div style="flex:1">
                            <span style="display: inline-block;width: 100%;">格式:</span>
                            <input class="selectionRight" type="text" id="selectionRight">
                            <ul id="UI-2" style="width:154px;border:1px solid #767676;background: #ffffff;"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          

        <!-- 第3个  -->
        <div id="tab3"  style="display: none;" class="tab">
            <div style="display: flex;flex-wrap: wrap;margin-bottom: 10px;">
                <label style="width:48%">
                    <input type="checkbox" name="" id="Required" data-text="Required" class="">是否必填</input>
                </label>
                <label style="width:48%">
                    <span style="display: inline-block;margin-right: 12px;">错误提示：</span>
                    <input style="width: 136px;" class="examine" id="CustomMessage" data-text="CustomMessage" type="text" class="" />
                </label>
                <label  style="width:48%;margin-top: 4px;">
                    <span style="display: inline-block;">违禁关键字：</span> 
                    <input style="width: 136px;" id="ExcludeKeywords" data-text="ExcludeKeywords" type="text" />
                </label>
                <label  style="width:48%;margin-top: 4px;">
                    <span style="display: inline-block;">允许关键字：</span> 
                    <input style="width: 136px;" id="IncludeKeywords" data-text="IncludeKeywords" type="text" />
                </label>
            </div>
            <label style="width: 100%;">
                <input class="radio-ipt radio-ipt-choose"  type="radio" name="CheckRule2" id="Text">
                    纯文本格式校验</input>
                <div class="Box changeDisabled" style="margin-top:0;width: 100%;line-height:20px">
                    最小长度：
                    <input type="number" data-text="MinLength" style="margin-left:10px;width: 126px;"  name="runningA" id="MinLength"></input>
                    <br/>最大长度：
                    <input type="number" data-text="MaxLength" style="margin-left:10px;width: 126px;margin-top:4px" name="runningA" id="MaxLength"></input>
                </div>
            </label>
            <label style="width: 100%;line-height:20px">
                <input class="radio-ipt radio-ipt-choose" type="radio" name="CheckRule2" id="Numeric"> 数值格式校验</input>
                    <div class="Box changeDisabled" style="margin-top:0;">
                            <input type="checkbox" data-text="CheckMinValue"/>
                            最小值：
                            <input type="number" style="margin-left:10px;width:126px" data-text="MinValue" name="runningA" id="MinValue"></input>
                        <br/>
                            <input type="checkbox" data-text="CheckMaxValue"/>
                            最大值：
                            <input type="number" style="margin-left:10px;margin-top: 4px;margin-bottom: 4px;width:126px;" data-text="MaxValue" name="runningA" id="MaxValue"></input>
                        <br/>
                            <input type="checkbox" data-text="CheckDecimalDigits"/>
                            最大小数位数：
                            <input type="number" style="margin-left:10px;width:90px;" data-text="MaxDecimalDigits" name="runningA" id="MaxDecimalDigits"></input>
                    </div>
            </label>
            <label style="width: 100%;">
                <input class="radio-ipt radio-ipt-choose" type="radio" name="CheckRule2" id="DateTime"> 日期时间格式校验</input>
                    <div class="Box changeDisabled" style="margin-top:0;">
                       不得早于：<input type="date" data-text="DateTimeMinValue" name="runningB" id="DateTimeMinValue">
                       <br/>
                       不得晚于：<input type="date" style="margin-top: 4px;" data-text="DateTimeMaxValue" name="runningB" id="DateTimeMaxValue">
                    </div>
            </label>
            <label style="width: 100%;">
                <input class="radio-ipt radio-ipt-choose" type="radio" name="CheckRule2" id="RegExpress"> 正则表达式</input>
                    <div class="Box changeDisabled" style="margin-top:0;">
                        <input class="dx-cc" id="RegExpression" data-text="RegExpression" name="runningA" type="text" /> 
                    </div>
            </label>
        </div>

        <!-- 第4个  -->
        <div id="tab4"  style="display: none;" class="tab">
                <div class="Box">
                    <h6 class="title">表达式：</h6>
                    <label class="Input-position-y InputDK">
                        <span>计算表达式：</span>
                        <input data-text="ValueExpression" id="ValueExpression" type="text">
                    </label>
                    <label class="Input-position-y InputDK">
                        <span>可见性表达式：</span>
                        <input data-text="VisibleExpression" id="VisibleExpression" type="text">
                    </label>
                </div>
            <div class="Input-position-y ">
                <span>自定义属性：</span>
                <input type="text " id="Attributes" class="Input-position-m" readonly="readonly">
                <button class="browsess" id="browsess" name="">浏览</button>
            </div>
        </div>
          
    </div>
                            `
        var dialogOptions = {
            title: "文字输入域属性",
            bodyHeight: 400,
            dialogContainerBodyWidth: 500,
            bodyClass: "InputFieldElement",
            bodyHtml: InputFieldHTML
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        domShowAndHide()//默认渲染
        function domShowAndHide() {
            let showDomId = jQuery(ctl).find('#InputFieldContentButtonBox > .tabButton.active').attr('showDomId')
            jQuery(ctl).find('#' + showDomId).siblings().hide()
            jQuery(ctl).find('#' + showDomId).show()
        }
        function changeColorType(checked) {
            let colorContainerColorInput = jQuery(ctl).find('#colorContainer input[type="color"]')
            jQuery(ctl).find('#colorContainer').css('color', checked ? 'grey' : '#000')
            colorContainerColorInput.attr('disabled', checked)
            colorContainerColorInput.css('cursor', checked ? 'no-drop' : 'auto')
        }

        //列表项目分隔符值复显
        if (options && options.ListValueSeparatorChar) {
            document.getElementById('ListValueSeparatorChar').value = options.ListValueSeparatorChar
        }

        //列表格式化值复显
        if (options && options.ListValueFormatString) {
            document.getElementById('ListValueFormatString').value = options.ListValueFormatString
        }

        //颜色属性值复显
        if (options && (!options.BackgroundTextColor && !options.TextColor)) {
            document.getElementById('ExtendColorCheck').checked = true;
            changeColorType(true)
        }
        //激活模式值复显
        if (options && options.EditorActiveMode) {
            jQuery(ctl).find('#EditorActiveModeButton').text(options.EditorActiveMode.length ? options.EditorActiveMode : 'None')
            jQuery(ctl).find('#EditorActiveModeButton').prop('title', options.EditorActiveMode);
        }

        jQuery('#ExtendColorCheck').change(function (e) {
            changeColorType(e.target.checked)
        })

        //激活模式点击
        jQuery(ctl).find('#EditorActiveModeButton').click(function () {
            let editorActiveModeSelectHtml = jQuery(` <div id="childrenDialogContainer" class="childrenDialogContainer"></div>
            <div id="EditorActiveModeSelect" >
                                <div class="EditorActiveModeHeader">
                                    <p>激活模式选项</p>
                                    <p class="EditorActiveModeCancelButtonIcon"></p>
                                </div>
                                <div class="EditorActiveModeContainer">
                                    <label class="EditorActiveItem" style="line-height: 19px;width: 100%;word-wrap: break-word;word-break: normal;">
                                        <input style="margin-right: 4px;" type="checkbox" value="Default"></input>默认激活模式，由文档对象的BehaviorOptions,DefaultEditorActiveMode属性值指定
                                    </label>
                                    <label class="EditorActiveItem">
                                        <input style="margin-right: 4px;" type="checkbox" value="Program"></input>应用程序激活
                                    </label>
                                    <label class="EditorActiveItem">
                                        <input style="margin-right: 4px;" type="checkbox" value="F2"></input>按下F2键激活
                                    </label>
                                    <label class="EditorActiveItem">
                                        <input style="margin-right: 4px;" type="checkbox" value="GotFocus"></input>获得输入焦点时就激活
                                    </label>
                                    <label class="EditorActiveItem">
                                        <input style="margin-right: 4px;" type="checkbox" value="MouseDblClick"></input>鼠标双击就激活
                                    </label>
                                    <label class="EditorActiveItem">
                                        <input style="margin-right: 4px;" type="checkbox" value="MouseClick"></input>鼠标单击就激活
                                    </label>
                                    <label class="EditorActiveItem">
                                        <input style="margin-right: 4px;" type="checkbox" value="MouseRightClick"></input>鼠标右击就激活
                                    </label>
                                    <label class="EditorActiveItem">
                                        <input style="margin-right: 4px;" type="checkbox" value="Enter"></input>键盘Enter键激活
                                    </label>
                                </div>
                                <div class="EditorActiveModeDialogBox">
                                    <p id="EditorActiveModeConfom">确认</p>
                                    <p id="EditorActiveModeCancel">取消</p>
                                </div>
                            </div>`)
            editorActiveModeSelectHtml.appendTo(ctl);
            console.log(jQuery(ctl).find('#EditorActiveModeButton').text())
            if (jQuery(ctl).find('#EditorActiveModeButton').text()) {
                let EditorActiveModeValueArr = jQuery(ctl).find('#EditorActiveModeButton').text()
                let EditorActiveItemArr = jQuery(ctl).find('.EditorActiveItem>input[type="checkbox"]')
                for (var i = 0; i < EditorActiveItemArr.length; i++) {
                    let item = EditorActiveItemArr[i]
                    if (EditorActiveModeValueArr.includes(item.value)) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                }
            }
            jQuery(ctl).find('.EditorActiveModeCancelButtonIcon,#EditorActiveModeCancel').click(function () {
                jQuery(ctl).find("#EditorActiveModeSelect").remove()
                jQuery(ctl).find("#childrenDialogContainer").remove()
            })
            jQuery(ctl).find('#EditorActiveModeConfom').click(function () {
                let EditorActiveItemArr = jQuery(ctl).find('.EditorActiveItem>input[type="checkbox"]')
                let EditorActiveModeValueStr = '';
                for (var i = 0; i < EditorActiveItemArr.length; i++) {
                    let item = EditorActiveItemArr[i]
                    if (item.checked) {
                        EditorActiveModeValueStr += (EditorActiveModeValueStr.length > 1 ? ',' : '') + item.value
                    }
                }
                jQuery(ctl).find('#EditorActiveModeButton').text(EditorActiveModeValueStr.length ? EditorActiveModeValueStr : 'None')
                jQuery(ctl).find('#EditorActiveModeButton').prop('title', EditorActiveModeValueStr);
                jQuery(ctl).find("#EditorActiveModeSelect").remove()
                jQuery(ctl).find("#childrenDialogContainer").remove()

            })
        })

        //tab切换
        jQuery(ctl).find('#InputFieldContentButtonBox > .tabButton').click(function () {
            let tabButtonActive = jQuery(ctl).find('#InputFieldContentButtonBox > .tabButton.active')
            if (tabButtonActive[0] !== this) {
                tabButtonActive.removeClass('active')
                this.className = 'tabButton active'
                domShowAndHide()
            }
        })
        //格式tab单选事件
        jQuery(ctl).find('.tab2-radio-ipt').click(function () {
            let tab2CheckBoxParentNode = document.getElementsByClassName('tab2-check-box-item-parent')[0]
            let tab2CheckList = jQuery(ctl).find('.tab2-check-box-item')
            for (var i = 0; i < tab2CheckList.length; i++) {
                if (tab2CheckBoxParentNode == this) {
                    jQuery(ctl).find(tab2CheckList[i]).removeAttr('disabled')
                } else {
                    jQuery(ctl).find(tab2CheckList[i]).attr('disabled', true)
                }
            }
        })

        //静态属性内容二级弹框
        var AttributesC = []
        if (options && options.ListItems && options.ListItems.length) {
            AttributesC = [...options.ListItems]
        }
        jQuery(ctl).find('#browseTextTableContent').click(function () {
            setBrowseTextTableContent()
        })
        //自定义属性二级弹框
        var AttributesA = {}//接收自定义属性
        if (options && options.Attributes && Object.keys(options.Attributes).length) {
            AttributesA = { ...options.Attributes }
        }
        jQuery(ctl).find('#tab4 #browsess').click(function () {
            setCustomAttributeContent()
        })

        //列表数据
        var lbsj = LBSJ
        //循环创建格式选项卡里的li标签
        var oUl = document.getElementById('UI-1')
        var oUlRight = document.getElementById('UI-2');
        //循环创建li标签
        for (let i = 0; i < lbsj.length; i++) {
            var oLi = document.createElement("li");
            oLi.id = lbsj[i].id;
            oLi.className = "sss"
            oLi.style = "line-height:20px;padding:0 10px;"
            oLi.innerHTML = lbsj[i].text;
            oUl.appendChild(oLi)
        }

        // 给第一个ui的里添加点击事件出现数据
        jQuery(ctl).find('#UI-1 li').on('click', function () {
            if (this.innerHTML == 'None') {
                jQuery(ctl).find("#UI-2").hide()
            } else {
                jQuery(ctl).find("#UI-2").show()
            }
            jQuery(ctl).find(".selection").val(this.innerHTML)
            jQuery(ctl).find(".selectionRight").val('')
            jQuery(ctl).find(".sss").css("background", "none")
            jQuery(ctl).find(".sss").css("color", "black")
            this.style.color = '#ffffff'/*点击的*/
            this.style.backgroundColor = '#4098ff'/*点击的*/
            // this.style = "color:#000000;backgroundColor:#d7e4f2;"
            oUlRight.innerHTML = ''
            for (let i = 0; i < lbsj.length; i++) {
                if (this.id == lbsj[i].id) {
                    var lbsj2 = lbsj[i].Child
                    for (let i = 0; i < lbsj2.length; i++) {
                        var oLi = document.createElement("li");
                        oLi.className = "sss2"
                        oLi.id = lbsj2[i].id;
                        oLi.style = "line-height:20px;padding:0 10px;"
                        oLi.innerHTML = lbsj2[i].text;
                        oUlRight.appendChild(oLi)
                    }
                }
            }
        })

        // 第二个下拉列表上的输入域赋值
        jQuery(ctl).find("#UI-2").delegate('li', 'click', function () {
            jQuery(ctl).find(".sss2").css("background", "none")
            jQuery(ctl).find(".sss2").css("color", "black")
            this.style.color = '#ffffff'/*点击的*/
            this.style.backgroundColor = '#4098ff'/*点击的*/
            jQuery(ctl).find(".selectionRight").val(this.innerHTML)
        })
        //校验表单禁用逻辑-tab3互斥单选
        jQuery(ctl).find('.radio-ipt-choose').click(function (e) {
            let disableChangeElement = document.getElementsByClassName('changeDisabled')
            for (var i = 0; i < disableChangeElement.length; i++) {
                let childrenNode = disableChangeElement[i].children
                for (var j = 0; j < childrenNode.length; j++) {
                    if (disableChangeElement[i].previousElementSibling != this) {
                        jQuery(childrenNode[j]).attr('disabled', true)
                    } else {
                        jQuery(childrenNode[j]).removeAttr('disabled')
                    }
                }
            }
        })

        //根据options渲染页面所需数据
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        if (options) {
            var opts = { ...options };
            dcPanelBody.find("[data-text]").each(function () {
                var _el = jQuery(this);
                var _txt = _el.attr("data-text");
                var low_txt = _txt.toLowerCase();
                var _value = getDown(opts, low_txt);
                if (_value == undefined) {
                    _value = "";
                }
                getDown(opts, _txt, _value);
            });
            GetOrChangeData(dcPanelBody, opts);

            //校验tab渲染options.ValidateStyle
            var dcPanelBody = jQuery(ctl).find('#tab3')
            if (options) {
                var opts = { ...options.ValidateStyle };
                dcPanelBody.find("[data-text]").each(function () {
                    var _el = jQuery(this);
                    var _txt = _el.attr("data-text");
                    var low_txt = _txt.toLowerCase();
                    var _value = getDown(opts, low_txt);
                    if (_value == undefined) {
                        _value = "";
                    }
                    getDown(opts, _txt, _value);
                });
                GetOrChangeData(dcPanelBody, opts);
            }


            //需要特殊处理的值回显
            //自定义属性文本值
            if (options && options.Attributes && Object.keys(options.Attributes)) {
                jQuery(ctl).find("#Attributes").val(Object.keys(options.Attributes).length + "items")
            }
            //静态属性文本值
            if (options && options.ListItems) {
                jQuery(ctl).find("#StaticSelection").val(options.ListItems.length + "items")
            }
            //绑定路径
            if (options && options.ValueBinding) {
                jQuery(ctl).find("#tab1 #BindingPathForText").val(options.ValueBinding.BindingPathForText)
                jQuery(ctl).find("#tab1 #BindingPath").val(options.ValueBinding.BindingPath)
                jQuery(ctl).find("#tab1 #DataSource").val(options.ValueBinding.DataSource)
            }
            //输入校验类型
            if (!(options && options.InnerEditStyle)) {
                options.InnerEditStyle = "Text"  //设置输入域默认类型
            }
            let InnerEditStyleDom = document.getElementsByClassName('tab2-radio-ipt')
            for (var i = 0; i < InnerEditStyleDom.length; i++) {
                if ((InnerEditStyleDom[i].id).toLowerCase() === (options.InnerEditStyle).toLowerCase()) {
                    InnerEditStyleDom[i].checked = true;
                    InnerEditStyleDom[i].click()
                }
            }
            //输出格式
            if (options && options.DisplayFormat) {
                if (options.DisplayFormat.Style) {
                    let liList = jQuery(ctl).find('#UI-1 li');
                    for (var i = 0; i < liList.length; i++) {
                        if (liList[i].innerHTML === options.DisplayFormat.Style) {
                            liList[i].click()
                        }
                    }
                    if (options.DisplayFormat.Format) {
                        let li2List = jQuery(ctl).find('#UI-2 li');
                        for (var i = 0; i < li2List.length; i++) {
                            if (li2List[i].innerHTML === options.DisplayFormat.Format) {
                                li2List[i].click()
                            }
                        }
                    }
                }
            }
            if (!(options && options.DisplayFormat)) {
                jQuery(ctl).find("#UI-2").hide()
            }

            //是否只读
            if (options) {
                jQuery(ctl).find('#tab1 #ContentReadonly').attr('checked', (options.ContentReadonly && options.ContentReadonly == 'True'));
            }
            if (options && options.ValidateStyle && options.ValidateStyle.ValueType) {
                let ValueTypeDomArr = document.getElementsByName('CheckRule2')
                for (var i = 0; i < ValueTypeDomArr.length; i++) {
                    if (ValueTypeDomArr[i].id === options.ValidateStyle.ValueType) {
                        jQuery(ValueTypeDomArr[i]).attr("checked", "checked");
                        jQuery(ValueTypeDomArr[i]).click()
                    }
                }
            }

        }
        // 静态选择内容弹框
        function setBrowseTextTableContent() {
            let staticDialog = jQuery(`
            <div id="BrowseTextTableDialog" class="childrenDialogContainer"></div>
            <div id="dialogContainer1" style="border:1px solid #ccc;z-index:99999;position:fixed;top:50%;left:50%;width:550px;background:#fafafa;">
                <div id="dcPanelHeader1" style="background: #F5F5F5;border-bottom: 1px solid #c6c6c6;font-size: 12px;font-weight: bold;color: #0E2D5F;line-height: 16px;padding-left: 18px;text-align: left;padding: 6px;">
                <span>静态选择项内容</span>
                <div class="cancel3 dcHeader-tool">
                <b class="dcTool-close">✖</b>
            </div>
                </div>
                <div id="dcPanelBody1" style=""></div>
                <div id="dcPanelFooter1" style="background:#F5F5F5">  
                    <button class="dclinkbutton determine3">确认</button> 
                    <button class="dclinkbutton cancel3">取消</button>
                </div>
            </div>
            `)
            staticDialog.appendTo(ctl);

            var watermark1 = `
                <div class="Dictionary" style="text-align:left;margin-bottom:20px;">
                    <span style="margin-left:10px;font-weight:600;font-size:12px">字典来源：</span>
                    <input id="InnerListSourceName" data-text="InnerListSourceName" type="text">
                </div> 
                <div id="staticSvgBox" style="text-align: right;">
                    <svg style="cursor: pointer;width:20px;height:20px;" t="1682241871634" class="icon newlyIncreased" viewBox="0 0 1024 1024" version="1.1" id=""
                        xmlns="http://www.w3.org/2000/svg" p-id="4289" width="200" height="200">
                        <title>添加一行</title>
                        <path d="M544 480v-298.666667h-64v298.666667h-298.666667v64h298.666667v298.666667h64v-298.666667h298.666667v-64h-298.666667z"
                            fill="#61ea6a" p-id="4290"></path></svg>
                    <svg style="cursor: pointer;width:20px;height:20px;" t="1682241967818" class="icon  moveUp" viewBox="0 0 1024 1024" version="1.1" id=""
                        xmlns="http://www.w3.org/2000/svg" p-id="5609" width="200" height="200">
                        <title>向上一行</title>
                        <path d="M489.386667 361.386667a32 32 0 0 1 45.226666 0L813.226667 640 768 685.226667l-256-256-256 256L210.773333 640l278.613334-278.613333z"
                            fill="#1296db" p-id="5610"></path></svg>
                    <svg style="cursor: pointer;width:20px;height:20px;" t="1682241944286" class="icon  MoveDown" viewBox="0 0 1024 1024" version="1.1" id=""
                        xmlns="http://www.w3.org/2000/svg" p-id="5319" width="200" height="200">
                        <title>向下一行</title>
                        <path d="M256 338.773333l256 256 256-256L813.226667 384l-278.613334 278.613333a32 32 0 0 1-45.226666 0L210.773333 384 256 338.773333z"
                            fill="#1296db" p-id="5320"></path></svg>
                    <svg style="cursor: pointer;width:20px;height:20px;" t="1682241933018" class="icon  DeleteIine" viewBox="0 0 1024 1024" version="1.1" id=""
                        xmlns="http://www.w3.org/2000/svg" p-id="5174" width="200" height="200">
                        <title>删除本行</title>
                        <path d="M557.226667 512l256-256L768 210.773333l-256 256-256-256L210.773333 256l256 256-256 256L256 813.226667l256-256 256 256L813.226667 768l-256-256z"
                            fill="#cf514b" p-id="5175"></path></svg>
                    <svg style="cursor: pointer;width:18px;height:18px;" t="1682241953506" class="icon  DeleteAll" viewBox="0 0 1024 1024" version="1.1" id=""
                        xmlns="http://www.w3.org/2000/svg" p-id="5464" width="200" height="200">
                        <title>清空列表项目</title>
                        <path d="M394.666667 128v96h256V128a10.666667 10.666667 0 0 0-10.666667-10.666667H405.333333a10.666667 10.666667 0 0 0-10.666666 10.666667z m-64 96V128c0-41.216 33.450667-74.666667 74.666666-74.666667H640c41.216 0 74.666667 33.450667 74.666667 74.666667v96h213.333333v64h-85.333333V896A74.666667 74.666667 0 0 1 768 970.666667H256A74.666667 74.666667 0 0 1 181.333333 896V288h-85.333333v-64h234.666667z m-85.333334 64V896c0 5.888 4.778667 10.666667 10.666667 10.666667h512a10.666667 10.666667 0 0 0 10.666667-10.666667V288H245.333333z m213.333334 149.333333v320h-64v-320h64z m170.666666 320v-320h-64v320h64z"
                            fill="#d81e06" p-id="5465"></path>
                    </svg>
                </div>
                <table id="batchPlanTable"  class="currentTableDom" style="width:100%;border-collapse:collapse;margin:10px 0;background:#fafafa;" border="1">
                    <tr>
                        <th style="border-width: 1px;" class="on-1">序号</th>
                        <th style="border-width: 1px;" class="on-2">文本</th>
                        <th style="border-width: 1px;" class="on-3">数值</th>
                        <th style="border-width: 1px;" class="on-3">指定列表文本</th>
                    </tr>
                    <tr id="tr_table" class="tr_ab">
                        <td class="on-1"></td>
                        <td><input class="on-2" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" ></input></td>
                        <td><input class="on-3" style="width:100%;height:100%;border:none" type="text" data-arraytext="Value" ></input></td>
                        <td><input  class="tr-s"  style="width:100%;height:100%;border:none" type="text" data-arraytext="TextInList" ></input></td>
                    </tr>
                    <template class="template_item">
                        <tr id="tr_table" class="tr_ab">
                            <td class="on-1"></td>
                            <td><input class="on-2" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" ></input></td>
                            <td><input class="on-3"  style="width:100%;height:100%;border:none" type="text" data-arraytext="Value" ></input></td>
                            <td><input class="tr-s" style="width:100%;height:100%;border:none" type="text" data-arraytext="TextInList" ></input></td>
                        </tr>
                    </template>
                </table>`
            //插入dom结构
            jQuery('#dcPanelBody1').html(watermark1).css('background', '#FAFAFA');
            //优先展示当前用户操作过的列表
            let newListItem = AttributesC.length ? AttributesC : ((options && options.ListItems) || []);
            if (newListItem && newListItem.length) {
                var CDC = $(".tr_ab")[0]
                var hasInnerList = []
                // $("#StaticSelection").val(newListItem.length + "items") //自定义属性个数赋值
                //去除空行，避免无效渲染
                for (var i = 0; i < newListItem.length; i++) {
                    if (Object.values(newListItem[i]).join('').length) {
                        hasInnerList.push(newListItem[i])
                    }
                }
                for (var i = 0; i < hasInnerList.length; i++) {
                    var tr = document.createElement("tr")
                    tr.className = "tr_ab"
                    tr.innerHTML = `<td  class="on-1">${i + 1}</td>
                            <td><input style="width:100%;height:100%;border:none;" class="on-2" type="text" data-arraytext="Text" value="${hasInnerList[i].Text}" ></input> </td>
                            <td><input style="width:100%;height:100%;border:none;" class="on-3" type="text" data-arraytext="Text" value="${hasInnerList[i].Value}" ></input> </td>
                            <td><input style="width:100%;height:100%;border:none;" class="tr-s" type="text" data-arraytext="Text" value="${hasInnerList[i].TextInList || ''}" ></input></td>`
                    CDC.before(tr)
                }
            }
            //数据字典回填
            jQuery(ctl).find('#InnerListSourceName').val(InnerListSourceName)

            //自动增加行
            var dialogContainer = jQuery(ctl).children('#dialogContainer1');
            var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody1');
            dcPanelBody.find("#batchPlanTable").on("input", "input[data-arraytext]", function () {
                var input = jQuery(this);
                var tr = input.parents("tr");
                if (tr.nextAll("tr").length == 0) {
                    var ListItems_item = input.parents("table").find("template.template_item")[0];
                    tr.after(ListItems_item.content.cloneNode(true));
                    let newOn1 = jQuery('.on-1')
                    for (var i = 1; i < newOn1.length; i++) {
                        newOn1[i].innerHTML = (i)
                    }
                }
            });
            //添加自定义属性
            AddCustomProperties()
            //表格行操作 新增
            AddTableRow()
            // 表格行操作 上移
            TableRowMovedUp()
            // 表格行操作 下移
            TableRowDown()
            //表格行操作 删除行
            DeleteLine()
            //表格行操作 全部删除
            DeleteAll()
            // 确认--->收集数据
            jQuery(ctl).find(".determine3").click(function () {
                AttributesC = []
                InnerListSourceName = jQuery(ctl).find('#InnerListSourceName').val()
                for (let i = 0; i < jQuery(ctl).find(".tr_ab").length; i++) {
                    var AttributesB = {}//接收动态列表
                    var ssf = jQuery(ctl).find(".tr_ab")[i].children
                    for (let u = 0; u < ssf.length; u++) {
                        if (ssf[u].children && ssf[u].children[0]) {
                            if (ssf[u].children[0].className == 'on-2') {
                                AttributesB.Text = jQuery(ssf[u].children[0]).val()
                            }
                            if (ssf[u].children[0].className == 'on-3') {
                                AttributesB.Value = jQuery(ssf[u].children[0]).val()
                            }
                            if (ssf[u].children[0].className == 'tr-s') {
                                AttributesB.TextInList = jQuery(ssf[u].children[0]).val()
                            }
                        }
                    }
                    if (Object.values(AttributesB).join('').length) {
                        AttributesC.push(AttributesB)
                    }

                }
                jQuery(ctl).find("#StaticSelection").val(AttributesC.length + " " + "items")
                jQuery(ctl).find("#dialogContainer1").remove()
                jQuery(ctl).find('#BrowseTextTableDialog').remove()
            })
            // 关闭
            jQuery(ctl).find(".cancel3,.dcTool-close").click(function () {
                jQuery(ctl).find("#dialogContainer1").remove()
                jQuery(ctl).find('#BrowseTextTableDialog').remove()

            })
        }
        let that = this
        // 自定义属性弹框
        function setCustomAttributeContent() {
            let customAttributeDialog = jQuery(`
            <div id="CustomAttributeTableDialog" class="childrenDialogContainer"></div>
            <div id="dialogContainer2" style="border:1px solid #ccc;z-index:99999;position:fixed;top:50%;left:50%;width:550px;background:#fafafa;">
                <div id="dcPanelHeader2" style="background: #F5F5F5;border-bottom: 1px solid #c6c6c6;font-size: 12px;font-weight: bold;color: #0E2D5F;line-height: 16px;padding-left: 18px;text-align: left;padding: 6px;">
                <span>自定义属性</span>
                <div class="cancel2 dcHeader-tool">
                    <b class= "dcTool-close">✖</b>
                </div>
                </div>
                <div id="dcPanelBody2" style="margin-top:20px;" class="dcBody-content">
                    <div id="attr-box"  style="margin-bottom:10px;margin-right:10px"></div>
                </div>
                <div id="dcPanelFooter2" style="background:#F5F5F5">  
                    <button class="dclinkbutton determine2">确认</button> 
                    <button class="dclinkbutton cancel2">取消</button>
                </div>
            </div>
            `)
            customAttributeDialog.appendTo(ctl);
            that.attributeComponents("#attr-box", AttributesA)
            //确认
            jQuery(ctl).find(".determine2").click(function () {
                AttributesA = that.attributeComponents_getAttributeObj('#attr-box')
                jQuery(ctl).find("#Attributes").val(Object.values(AttributesA).length + " " + "items")
                jQuery(ctl).find("#dialogContainer2").remove()
                jQuery(ctl).find('#CustomAttributeTableDialog').remove()
            })
            // 关闭
            jQuery(ctl).find(".cancel2,.dcTool-close").click(function () {
                jQuery(ctl).find("#dialogContainer2").remove()
                jQuery(ctl).find('#CustomAttributeTableDialog').remove()
            })
        }
        //表格行操作 全部删除
        function DeleteAll() {
            jQuery(ctl).find(".DeleteAll").on("click", function () {
                if (jQuery(ctl).find("#dcPanelBody1").css("display") == "block") {
                    var CDC = jQuery(ctl).find(".tr_ab")
                    for (let i = 0; i < CDC.length; i++) {
                        CDC[i].remove()
                    }
                    var tr = document.createElement("tr")
                    tr.className = "tr_ab"
                    tr.innerHTML = `
                        <td  class="on-1">1</td>
                        <td><input style="width:100%;height:100%;border:none;" class="on-2" type="text" data-arraytext="Text" value="" ></input> </td>
                        <td><input style="width:100%;height:100%;border:none;" class="on-3" type="text" data-arraytext="Text" value="" ></input> </td>
                        <td><input style="width:100%;height:100%;border:none;" class="tr-s" type="text" data-arraytext="Text" value="" ></input></td>`
                    jQuery(ctl).find("#batchPlanTable").append(tr)
                }
            })

        }
        //表格行操作 删除行
        function DeleteLine() {
            jQuery(ctl).find(".DeleteIine").on("click", function () {
                if (jQuery(ctl).find("#dcPanelBody1").css("display") == "block") {
                    var CDC = jQuery(ctl).find(".tr_ab")
                    for (let i = 0; i < CDC.length; i++) {
                        if (CDC[i].getAttribute("moveh") == "true") {
                            var current = CDC[i]
                            current.remove()
                        }
                    }
                }
            })
        }
        //表格行操作 下移
        function TableRowDown() {
            jQuery(ctl).find(".MoveDown").on("click", function () {
                if (jQuery(ctl).find("#dcPanelBody1").css("display") == "block") {
                    var CDC = jQuery(ctl).find(".tr_ab")
                    for (let i = 0; i < CDC.length; i++) {
                        if (CDC[i].getAttribute("moveh") == "true") {
                            var current = CDC[i]
                            var prev = current.nextElementSibling;
                            console.log(CDC[i].rowIndex);
                            jQuery(prev).after(current)
                        }
                    }
                }
            })
        }
        // 表格行操作 上移
        function TableRowMovedUp() {
            jQuery(ctl).find(".moveUp").on("click", function () {
                if (jQuery(ctl).find("#dcPanelBody1").css("display") == "block") {
                    var CDC = jQuery(ctl).find(".tr_ab")
                    for (let i = 0; i < CDC.length; i++) {
                        if (CDC[i].getAttribute("moveh") == "true") {
                            var current = CDC[i]
                            var prev = current.previousElementSibling;
                            if (CDC[i].rowIndex > 1) {
                                jQuery(prev).before(current)
                            } else {
                                // alert("已经到头部了")
                            }
                        }
                    }
                }
            })
        }
        //表格行操作 新增
        function AddTableRow() {
            jQuery(ctl).find(".newlyIncreased").on("click", function () {
                if (jQuery(ctl).find("#dcPanelBody1").css("display") == "block") {
                    var tr = document.createElement("tr")
                    let newOn1 = jQuery('.on-1')
                    tr.className = "tr_ab"
                    tr.innerHTML = `
                        <td  class="on-1">${newOn1.length}</td>
                        <td><input style="width:100%;height:100%;border:none;" class="on-2" type="text" data-arraytext="Text" value="" ></input> </td>
                        <td><input style="width:100%;height:100%;border:none;" class="on-3" type="text" data-arraytext="Text" value="" ></input> </td>
                        <td><input style="width:100%;height:100%;border:none;" class="tr-s" type="text" data-arraytext="Text" value="" ></input></td>`
                    jQuery(ctl).find("#batchPlanTable").append(tr)
                    return
                } else {
                    return
                }
            })
        }
        //添加自定义属性
        function AddCustomProperties() {
            if (jQuery(ctl).find("#dcPanelBody1").css("display") == "block") {
                jQuery(ctl).find("#batchPlanTable").delegate('.tr_ab', 'click', function () {
                    jQuery(ctl).find(".tr_ab").removeAttr('moveh', false)
                    jQuery(this).attr('moveh', true)
                    // console.log(this);
                })
            }
        }
        // 处理新增单元格的问题
        //绑定事件需要修改
        document.onkeyup = function () {
            if (jQuery(ctl).find("#dcPanelBody1").css("display") == "block") {
                if (jQuery(ctl).find("table").find("tr:last")[0].children[1].children[0].value === '') {
                    return
                } else {
                    var tr = document.createElement("tr")
                    tr.className = "tr_ab"
                    tr.innerHTML = `
                    <td  class="on-1"></td>
                            <td><input style="width:100%;height:100%;border:none;" class="on-2" type="text" data-arraytext="Text" value="" ></input> </td>
                            <td><input style="width:100%;height:100%;border:none;" class="on-3" type="text" data-arraytext="Text" value="" ></input> </td>
                            <td><input style="width:100%;height:100%;border:none;" class="tr-s" type="text" data-arraytext="Text" value="" ></input></td>`
                    jQuery(ctl).find("#batchPlanTable").append(tr)
                }
            } else {
                return
            }

        }

        function successFun() {
            let newOptions = {}
            var dialogContainer = jQuery(ctl).children('#dialogContainer');
            var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
            var dcPanelBodyTab3 = jQuery(dialogContainer).find('#tab3');

            // 获取输入域基本属性
            newOptions = GetOrChangeData(dcPanelBody)

            // 获取输入域校验属性
            newOptions.ValidateStyle = GetOrChangeData(dcPanelBodyTab3)

            // 获取输入域静态资源
            newOptions.Attributes = AttributesA

            //获取输入域静态资源
            newOptions.ListItems = AttributesC.length ? AttributesC : (options && options.ListItems || [])

            //获取输入域格式类型tab2
            let InnerEditStyleArr = jQuery(ctl).find('#tab2>label>input[type="radio"]')
            for (var i = 0; i < InnerEditStyleArr.length; i++) {
                if (InnerEditStyleArr[i].checked) {
                    newOptions['InnerEditStyle'] = InnerEditStyleArr[i].id
                }
            }

            //获取输入域的输出格式
            let newStyle = jQuery(ctl).find("#DisplayFormat").val()
            let newFormat = jQuery(ctl).find("#selectionRight").val()
            if (jQuery(ctl).find("#DisplayFormat").val()) {
                newOptions["DisplayFormat"] = {
                    "Style": newStyle,
                    "Format": newFormat
                }
            }

            //获取输入域的校验类型
            let valueTypeArr = jQuery(ctl).find('#tab3>label>input[type="radio"]')
            for (var i = 0; i < valueTypeArr.length; i++) {
                if (valueTypeArr[i].checked) {
                    newOptions.ValidateStyle['ValueType'] = valueTypeArr[i].id
                }
            }

            // 获取输入域的数据源属性
            let { BindingPath, BindingPathForText, Datasource } = newOptions
            newOptions['ValueBinding'] = { BindingPath, BindingPathForText, Datasource }

            // 获取静态资源弹框的字典来源
            newOptions['InnerListSourceName'] = InnerListSourceName

            //设置文字颜色和背景文字颜色是否为null（null:继承文档默认）
            let ExtendColorCheck = document.getElementById('ExtendColorCheck').checked
            newOptions['TextColor'] = ExtendColorCheck ? null : newOptions['TextColor']
            newOptions['BackgroundTextColor'] = ExtendColorCheck ? null : newOptions.BackgroundTextColor

            //激活模式
            newOptions['EditorActiveMode'] = jQuery(ctl).find('#EditorActiveModeButton').text()

            //删除外层数据源无用数据
            newOptions["BindingPath"] && delete newOptions["BindingPath"]
            newOptions["BindingPathForText"] && delete newOptions["BindingPathForText"]
            newOptions["Datasource"] && delete newOptions["Datasource"]
            console.log('输入域属性：', newOptions)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("InsertInputField", false, newOptions);
            } else {
                ctl.SetElementProperties(ele, newOptions);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    // ======医学表达式-start======
    /**
    * 创建胎心图值对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    FetalHeartDialog: function (options, ctl, isInsertMode, ele) {
        if (options == null) {
            return false;
        }

        let arr = this.stringToObject(options.Values)
        var FetalHeartHtml = `
        <table width="100%" id="fetal-heart-table" cellspacing="0">
            <tr>
                <td rowspan="2" class="fetal-heart-table-line-td" />
                <td align="center" class="fetal-heart-table-input">
                    <input id="Value1" type="text"  data-text="Value1" />
                </td>
                <td rowspan="2" class="fetal-heart-table-border-right" id="main" />
                <td rowspan="2" class="fetal-heart-table-border-left" />
                <td align="center"  class="fetal-heart-table-input">
                    <input id="Value2" type="text"  data-text="Value2" />
                </td>
                <td rowspan="2" class="fetal-heart-table-border-bottom" />
            </tr>
            <tr>
                <td rowspan="2" class="fetal-heart-table-input table-input-border-top" align="center">
                    <input id="Value3" type="text" data-text="Value3" />
                </td>
                <td rowspan="2" class="fetal-heart-table-input table-input-border-top" align="center">
                    <input id="Value4" type="text" data-text="Value4" />
                </td>
            </tr>
            <tr>
                <td rowspan="2" class="fetal-heart-table-td-border" >
                </td>
                <td rowspan="2" class="fetal-heart-table-border-top-right" />
                <td rowspan="2" class="fetal-heart-table-border-top-left" />
                <td rowspan="2" class="fetal-heart-table-td-border" />
            </tr>
            <tr>
                <td align="center" class="fetal-heart-table-input" >
                    <input id="Value5" type="text" data-text="Value5" />
                </td>
                <td align="center" class="fetal-heart-table-input">
                    <input id="Value6" type="text" data-text="Value6" />
                </td>
            </tr>
        </table>`

        var dialogOptions = {
            title: "请输入胎心值",
            bodyHeight: 100,
            bodyClass: "FetalHeartElement",
            bodyHtml: FetalHeartHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var opts = {};
        let that = this;
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建标尺对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    PainIndexDialog: function (options, ctl, isInsertMode, ele) {
        // if (!options || typeof (options) != "object") {
        //     options = ctl.getFontObject();
        // }
        if (options == null) {
            return false;
        }
        let arr = this.stringToObject(options.Values)
        for (var i in arr) {
            arr[i] = arr[i] / 10
        }
        var PainIndexHtml = `
            数字（0-10）：
            <input type="number" id="Value1" data-text="Value1" style="width:120px;"/>
        `
        var dialogOptions = {
            title: "标尺（请输入0到10之间的数字）",
            bodyHeight: 'auto',
            bodyClass: "PainIndexElement",
            bodyHtml: PainIndexHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this;
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            _data.Value1 = _data.Value1 * 10
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }

    },
    /**
        * 创建眼球突出度
        * @param options 医学表达式属性
        * @param ctl 编辑器元素
        * @param isInsertMode 是否是插入模式
        */

    EyeballProtrusionDialog: function (options, ctl, isInsertMode, ele) {
        console.log(options, '=========================眼球突出options')
        let arr = this.stringToObject(options.Values)
        var EyeballProtrusionHtml = `
        <div class="EyeballProtrusionBox"> 
            <div class="EyeballProtrusionContainerLeft">
                <input  data-text="Value1"  class="ValueInput" type="number" />
                <span>mm</span>
            </div>
            <div class="EyeballProtrusionContainerCenter">
                <div calss="CenterInputBox" style="top: 60px;left: 50%;margin-left: -42px;width:100px;position: absolute; z-index:9;">
                    <input  data-text="Value2" class="ValueInput" type="number" />
                    <span>mm</span>
                </div>
                <div class="LineBox">
                    <p class="line LineLeftTop"></p>
                    <p class="line LineLeftBottom"></p>
                    <p class="line LineCenter"></p>
                    <p class="line LineRightTop"></p>
                    <p class="line LineRightBottom"></p>
                </div>
            </div>
            <div class="EyeballProtrusionContainerRight">
                <input  data-text="Value3" class="ValueInput" type="number" />
                <span>mm</span>
            </div>
        </div>
        `
        var dialogOptions = {
            title: "插入眼球突出度",
            bodyHeight: 200,
            dialogContainerBodyWidth: 500,
            bodyClass: "EyeballProtrusion",
            bodyHtml: EyeballProtrusionHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        let that = this
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            console.log(options)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },
    /**
    * 创建斜视符号
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    SquintSymbolDialog: function (options, ctl, isInsertMode, ele) {
        let { Value1 } = this.stringToObject(options.Values)
        var SquintSymbolHtml = `<div class="SquintSymbolBox"> 
                <div class="SquintSymbolLeftContainer">
                    <div class="ShowView LeftShowView">
                        <p  class="LeftLineText LeftLine"></p>
                        <p  class="RightLineText RightLine"></p>
                        <p class="CenterRound"></p>
                        <p class="LeftLineText" style="position: absolute;bottom: 0;left: 10px;font-size: 14px;font-weight: 900;">L</p>
                        <p class="RightLineText" style="position: absolute;bottom: 0;right: 10px;font-size: 14px;font-weight: 900;">R</p>
                    </div>
                </div>
                <div class="SquintSymbolRightContainer Box">
                    <h6 class="title">类型</h6>
                    <form>
                        <label class="RadioLabel" style="width: 100%;line-height: 30px;">
                            <input type="radio" id="L" />
                            <span>L</span>
                        </label>
                        <label class="RadioLabel" style="width: 100%;line-height: 30px;">
                            <input type="radio" id="R" />
                            <span>R</span>
                        </label>
                        <label class="RadioLabel" style="width: 100%;line-height: 30px;">
                            <input type="radio" id="LR" />
                            <span>LR</span>
                        </label>
                    </form>
                </div>
            </div>`
        var dialogOptions = {
            title: "插入斜视符号",
            bodyHeight: 220,
            bodyClass: " SquintSymbol",
            bodyHtml: SquintSymbolHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');

        if (Value1) {
            dcPanelBody.find('.RadioLabel>input[type=radio]').attr('checked', false)
            dcPanelBody.find(`#${Value1}`).attr('checked', true)
            changeShowView(Value1)
        }


        dcPanelBody.find('.RadioLabel>input[type=radio]').change(function (e) {
            dcPanelBody.find('.RadioLabel>input[type=radio]').attr('checked', false)
            this.checked = true
            changeShowView(this.id)
        })
        function changeShowView(value) {
            switch (value) {
                case "L":
                    dcPanelBody.find('.LeftLineText').show()
                    dcPanelBody.find('.RightLineText').hide()
                    break;
                case "R":
                    dcPanelBody.find('.LeftLineText').hide()
                    dcPanelBody.find('.RightLineText').show()
                    break;
                case "LR":
                    dcPanelBody.find('.LeftLineText').show()
                    dcPanelBody.find('.RightLineText').show()
                    break;
            }
        }
        function successFun() {
            let radioArr = dcPanelBody.find('.RadioLabel>input[type=radio]')
            for (var i = 0; i < radioArr.length; i++) {
                if (radioArr[i].checked) {
                    options['Values'] = `Value1:${radioArr[i].id};`
                }
            }
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },
    /**
    * 创建输入分数值对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    FractionDialog: function (options, ctl, isInsertMode, ele) {
        // if (!options || typeof (options) != "object") {
        //     options = ctl.getFontObject();
        // }
        if (options == null) {
            return false;
        }
        let arr = this.stringToObject(options.Values)
        var FractionHtml = `
            <table  cellspacing="0">
            <tr style="text-align: center; vertical-align:middle;">
                <td>
                    A值<input type="text" id="Value1" data-text="Value1" style="width:150px"/>
                </td>
                <td rowspan="2" style="padding-right: 5px">
                <strong>/</strong>
                </td>
                <td>
                </td>
            </tr>
            <tr style="text-align: center; vertical-align:middle;">
                <td>
                </td>
                <td></td>
                <td>
                    B值<input type="text" id="Value2" data-text="Value2"  style="width:150px"/>
                </td>
            </tr>
            </table>
        `
        var dialogOptions = {
            title: "请输入分数值",
            bodyHeight: 'auto',
            bodyClass: "FractionElement",
            bodyHtml: FractionHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);

        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this;
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }

    },

    /**
    * 创建输入月经史值对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    FourValuesDialog: function (options, ctl, isInsertMode, ele) {
        // if (!options || typeof (options) != "object") {
        //     options = ctl.getFontObject();
        // }
        if (options == null) {
            return false;
        }

        let arr = this.stringToObject(options.Values)
        var FourValuesHtml = `
            <table style="width:100%;"  cellspacing="0">
                <tr style="text-align: center">
                    <td rowspan="2" style="padding-bottom: 10px;">初潮年龄<br /><input type="text" placeholder="初潮年龄" id="Value1" data-text="Value1" style="width:120px;"/></td>
                    <td style="border-color: #000000; border-bottom-style: solid; padding-bottom: 5px; border-width:3px;">经期(天)<br /><input type="text" placeholder="经期(天)" id="Value2" data-text="Value2" style="width:120px;"/></td>
                    <td rowspan="2" style="padding-bottom: 25px;">末次月经/<br />绝经年龄 <br /><input type="text" placeholder="末次月经/绝经年龄" id="Value4" data-text="Value4" style="width:120px;"/></td>
                </tr>
                <tr style="text-align: center">
                    <td style="border-color: #000000; border-top-style: solid; border-width:3px;">周期(天)<br /><input type="text" placeholder="周期(天)" id="Value3" data-text="Value3" style="width:120px;"/></td>
                </tr>      
            </table>
        `
        var dialogOptions = {
            title: "请输入月经史值",
            bodyHeight: 108,
            dialogContainerBodyWidth: 500,
            bodyClass: "FourValuesElement",
            bodyHtml: FourValuesHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);

        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this;
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建输入月经史值2对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    FourValues1Dialog: function (options, ctl, isInsertMode, ele) {
        // if (!options || typeof (options) != "object") {
        //     options = ctl.getFontObject();
        // }
        if (options == null) {
            return false;
        }

        let arr = this.stringToObject(options.Values)
        var FourValues1Html = `
        <table style="width:100%;" border="0" cellspacing="0">
            <tbody>
                <tr style="text-align: center">
                    <td style="border-color: #000000;border-right-style: solid;border-width:3px;">初潮年龄</td>
                    <td style="border-color: #000000;border-left-style: solid;border-width:3px;">经期(天)</td>
                </tr>
                <tr style="text-align: center">
                    <td
                        style="border-color: #000000;border-right-style: solid; border-bottom-style: solid;padding-bottom: 5px;border-width:3px;">
                        <input type="text" data-text="Value1" id="Value1"></td>
                    <td
                        style="border-color: #000000;border-left-style: solid; border-bottom-style: solid;padding-bottom: 5px;border-width:3px;">
                        <input type="text" data-text="Value2" id="Value2"></td>
                </tr>
                <tr style="text-align: center">
                    <td style="border-color: #000000;border-right-style: solid; border-top-style: solid;border-width:3px;">末次月经/绝经年龄</td>
                    <td style="border-color: #000000;border-left-style: solid; border-top-style: solid;border-width:3px;">周期(天)</td>
                </tr>
                <tr style="text-align: center">
                    <td style="border-color: #000000;border-right-style: solid;border-width:3px;">
                        <input type="text" data-text="Value3" id="Value3">
                        </td>
                    <td style="border-color: #000000;border-left-style: solid;border-width:3px;">
                        <input type="text"  data-text="Value4" id="Value4">
                        </td>
                </tr>
            </tbody>
        </table>
        `;
        var dialogOptions = {
            title: "请输入月经史值",
            bodyHeight: 150,
            dialogContainerBodyWidth: 500,
            bodyClass: "FourValues1Element",
            bodyHtml: FourValues1Html
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);

        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建输入月经史值3对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    FourValues2Dialog: function (options, ctl, isInsertMode, ele) {
        // if (!options || typeof (options) != "object") {
        //     options = ctl.getFontObject();
        // }
        if (options == null) {
            return false;
        }
        let arr = this.stringToObject(options.Values)
        var FourValues2Html = `
        <table style="width:100%;">
            <tr>
                <td></td>
                <td align="center" style="padding-bottom: 5px">
                    <input id="Value2" data-text="Value2" type="text" style="width:100px;" autocomplete="off"/></td>
                <td></td>
            </tr>
            <tr>
                <td align="center" style="padding-bottom: 5px">
                    <input id="Value1" data-text="Value1"  type="text" style="width:100px;" autocomplete="off"/></td>
                <td></td>
                <td align="center" style="padding-bottom: 5px">
                    <input id="Value3" data-text="Value3" type="text" style="width:100px;"  autocomplete="off"/></td>
            </tr>
            <tr>
                <td></td>
                <td align="center" style="padding-bottom: 5px">
                    <input id="Value4" data-text="Value4" type="text" style="width:100px;" autocomplete="off"/></td>
                <td></td>
            </tr>
        </table>
        `
        var dialogOptions = {
            title: "请输入月经史值",
            bodyHeight: 'auto',
            bodyClass: "FourValues2Element",
            bodyHtml: FourValues2Html
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建输入月经史值4对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    ThreeValuesDialog: function (options, ctl, isInsertMode, ele) {
        // if (!options || typeof (options) != "object") {
        //     options = ctl.getFontObject();
        // }
        if (options == null) {
            return false;
        }
        let arr = this.stringToObject(options.Values)
        var ThreeValuesHtml = `
            <table style="width:auto;" cellspacing="0">
                <tr style="text-align: center; vertical-align:middle;">
                    <td rowspan="2">
                        A值<input type="text" id="Value1" data-text="Value1" style="width:150px"/>
                    </td>
                    <td rowspan="2" style="padding-right: 5px">
                    <strong>/</strong>
                    </td>
                    <td style="border-color: #000000;border-bottom-style: solid;padding-bottom: 5px;border-width:3px;">
                        B值<br />
                    <input type="text" id="Value2" data-text="Value2"  style="width:150px"/>
                    </td>
                </tr>
                <tr style="text-align: center; vertical-align:middle;">
                    <td style="border-color: #000000;border-top-style: solid;border-width:3px;">
                        C值<br />
                    <input type="text" id="Value3" data-text="Value3"  style="width:150px"/>
                    </td>
                </tr>
            </table>
        `
        var dialogOptions = {
            title: "请输入月经史值",
            bodyHeight: 120,
            bodyClass: "ThreeValuesElement",
            bodyHtml: ThreeValuesHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);

        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建输入瞳孔图值对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    PupilDialog: function (options, ctl, isInsertMode, ele) {
        if (options == null) {
            return false;
        }
        let arr = this.stringToObject(options.Values)
        var PupilHtml = `
            <table style="width:auto;" cellspacing="5">
                <tr style="text-align: center">
                    <td><input type="text" id="Value1" data-text="Value1" style="width:120px;" /></td>
                    <td></td>
                    <td><input type="text" id="Value2"  data-text="Value2" style="width:120px;"/></td>
                </tr>
                <tr style="text-align: center">
                    <td><input type="text" id="Value3"  data-text="Value3" style="width:120px;"/></td>
                    <td><input type="text" id="Value4"  data-text="Value4" style="width:120px;"/></td>
                    <td><input type="text" id="Value5"  data-text="Value5" style="width:120px;"/></td>
                </tr>
                <tr style="text-align: center">
                    <td><input type="text" id="Value6" data-text="Value6" style="width:120px;"/></td>
                    <td></td>
                    <td><input type="text" id="Value7"  data-text="Value7"  style="width:120px;" /></td>
                </tr>       
            </table>
        `
        var dialogOptions = {
            title: "请输入瞳孔图值",
            bodyHeight: 'auto',
            bodyClass: "PupilElement",
            bodyHtml: PupilHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);

        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建输入光定位值对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    LightPositioningDialog: function (options, ctl, isInsertMode, ele) {
        if (options == null) {
            return false;
        }
        let arr = this.stringToObject(options.Values)
        var LightPositioningHtml = `
           <table style="width:auto;" cellspacing="5">
                <tr style="text-align: center">
                    <td><input type="text" id="Value1" data-text="Value1" style="width:120px"/></td>
                    <td><input type="text" id="Value2" data-text="Value2" style="width:120px"/></td>
                    <td><input type="text" id="Value3" data-text="Value3" style="width:120px"/></td>
                </tr>
                <tr style="text-align: center">
                    <td><input type="text" id="Value4" data-text="Value4" style="width:120px"/></td>
                    <td><input type="text" id="Value5" data-text="Value5" style="width:120px"td>
                    <td><input type="text" id="Value6" data-text="Value6" style="width:120px"/></td>
                </tr>
                <tr style="text-align: center">
                    <td><input type="text" id="Value7" data-text="Value7" style="width:120px"/></td>
                    <td><input type="text" id="Value8" data-text="Value8" style="width:120px"/></td>
                    <td><input type="text" id="Value9" data-text="Value9" style="width:120px"/></td>
                </tr>       
            </table>
        `
        var dialogOptions = {
            title: "请输入光定位值",
            bodyHeight: 'auto',
            bodyClass: "LightPositioningElement",
            bodyHtml: LightPositioningHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);

        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let that = this
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(arr, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            options.Values = that.ObjectToString(_data)
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 创建恒牙牙位图对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    PermanentTeethBitmapDialog: function (options, ctl, isInsertMode, ele) {
        console.log(options, '=======options')
        if (options == null) {
            return false;
        }
        let arr = Object.values(this.stringToObject(options.Values))
        var PermanentTeethBitmapDialogHtml = `
        <div unselectable="on">
        <!--Table结构，cellspacing控制中间空行 -->
        <div>
            <table style="width:100%; position:relative; padding:0 30px;" cellspacing="0">
                <tr style="position: absolute;width: 100%;padding-left: 50%;">
                    <td><span style="height: 100px;margin-left: -46px;">上颌</span></td>
                </tr>
                <tr style="position: absolute;height: 100%;left: 0;top: 60%;">
                    <td><span style="height: 100px;">牙<br />面</span></td>
                </tr>
                <tr style="text-align: center; border-bottom:1px solid #d3d3d3">
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />三<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />二<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />一<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />二<br />前<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />一<br />前<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">尖<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">侧<br />切<br />牙</span>
                    </td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">中<br />切<br />牙</span>
                    </td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">中<br />切<br />牙</span>
                    </td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">侧<br />切<br />牙</span>
                    </td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">尖<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />一<br />前<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />二<br />前<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />一<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />二<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span
                            style="width:20px; height:100px;">第<br />三<br />磨<br />牙</span></td>
                </tr>
                <tr style="text-align: center" id="P-permanent-tooth"></tr>
                <tr style="text-align: center" id="L-permanent-tooth"></tr>
                <tr style="text-align: center" id="B-permanent-tooth"></tr>
                <tr style="text-align: center" id="D-permanent-tooth"></tr>
                <tr style="text-align: center" id="O-permanent-tooth"></tr>
                <tr style="text-align: center" id="M-permanent-tooth"></tr>
            </table>
        </div>
        <hr style="margin:3px 0" />
        <!--Table结构，cellspacing控制中间空行 -->
        <div>
            <table style="width:100%; background-color:#f0f0f0; padding:0 30px; position:relative;" cellspacing="0">
                <tr style="position: absolute;height: 100%;left: 0;top: 30%;">
                    <td><span style="height: 100px;">右</span></td>
                </tr>
                <tr style="position: absolute;height: 100%;right: 0;top: 30%;">
                    <td><span style="height: 100px;">左</span></td>
                </tr>
                <tr style="text-align: center" id="valueNumberBox1" />
                <tr style="text-align: center" id="valueNumberBox2" />
            </table>
        </div>
        <hr style="margin:3px 0" />
        <!--Table结构，cellspacing控制中间空行 -->
        <div>
            <table style="width:100%; background-color:#f0f0f0; padding:0 30px; position:relative;" cellspacing="0">
                <tr style="position: absolute;height: 100%;left: 0;top: 40%;">
                    <td><span style="height: 100px;">牙<br />面</span></td>
                </tr>
                <tr style="text-align: center" id="M-bottom-permanent-tooth"></tr>
                <tr style="text-align: center" id="O-bottom-permanent-tooth"></tr>
                <tr style="text-align: center" id="D-bottom-permanent-tooth"></tr>
                <tr style="text-align: center" id="B-bottom-permanent-tooth"></tr>
                <tr style="text-align: center" id="L-bottom-permanent-tooth"></tr>
                <tr style="text-align: center" id="P-bottom-permanent-tooth"></tr>
            </table>
        </div>
        <center style="margin: 5px 0;">
            <span>下颌</span>
        </center>
    </div>`
        var dialogOptions = {
            title: "恒牙牙位图",
            bodyHeight: 466,
            dialogContainerBodyWidth: 800,
            bodyClass: "PermanentTeethBitmapElement",
            bodyHtml: PermanentTeethBitmapDialogHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let nameList = NAMELIST
        let idTypeList = IDTYPELIST
        let idList = IDLIST
        let PermanentTeethTop = PERMANENTTEETHTOP
        let PermanentTeethBottom = PERMANENTTEETHBOTTOM
        let PermanentTeethtopList = [...PERMANENTTEETHTOP, ...PERMANENTTEETHBOTTOM]
        PermanentTeethtopList.filter(item => {
            this.PermanentToothPosition(item.idPrefix, item.parentId, item.teethKey, item.isTop)
        })
        this.PermanentToothValueNumber('#valueNumberBox1', 0)
        this.PermanentToothValueNumber('#valueNumberBox2', 16)
        SetValues(arr)
        dcPanelBody.find('td>input.inp').click(function () {
            if (this.getAttribute("dccheck") == "true") {
                for (var n = 1; n < 33; n++) {
                    if (this.name == "a" + n + "") {
                        this.style.cssText = `width:16px; height:16px;border:1px solid #a9a9a9;background-color:${nameList.includes(this.name) ? '#fff' : '#d7e4f2'} `;
                        this.setAttribute("dccheck", "false");
                    } else if (this.getAttribute("id") == "Value" + n + "") {
                        idTypeList.filter(item => {
                            document.getElementById(item + n + "").setAttribute("dccheck", "false");
                            document.getElementById(item + n + "").style.cssText = `width:16px; height:16px;border:1px solid #a9a9a9;background-color: ${idList.includes(this.getAttribute("id")) ? '#fff;' : '#d7e4f2;'}`;
                        })
                    } else {
                    }
                }
            } else {
                for (var n = 1; n < 33; n++) {
                    if (this.name == "a" + n + "") {
                        document.getElementById("Value" + n + "").style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                        document.getElementById("Value" + n + "").setAttribute("dccheck", "true");
                    } else {
                        this.style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                        this.setAttribute("dccheck", "true");
                    }
                }
            }

        })
        function successFun() {
            let newArr = GetCurrentDatas();
            let str = ''
            newArr.filter((item, index) => {
                str += `Value${index}:${item};`
            })
            options.Values = str
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
        function GetCurrentDatas() {
            var jsonObj = new Array();
            for (var n = 0; n < 32; n++) {
                var vall = "";
                var i = n + 1;
                if (document.getElementById("Value" + i + "").getAttribute("dccheck") == "true") {
                    vall = document.getElementById("Value" + i + "").value;
                    //从下标1开始计算
                    for (var j = 1; j < idTypeList.length; j++) {
                        if (document.getElementById(idTypeList[j] + i + "").getAttribute("dccheck") == "true") {
                            vall += document.getElementById(idTypeList[j] + i + "").value;
                        }
                    }
                    jsonObj[n + 1] = vall;
                } else {
                    jsonObj[n + 1] = "";
                }
            }
            return jsonObj;
        }
        function SetValues(values) {
            for (var n = 0; n <= 32; n++) {
                if (values[n]) {
                    document.getElementById("Value" + (n + 1)).style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                    document.getElementById("Value" + (n + 1)).setAttribute("dccheck", "true");
                    (n <= 15 ? PermanentTeethTop : PermanentTeethBottom).filter(item => {
                        if ((values[n]).indexOf(item.teethKey) >= 0) {
                            document.getElementById(item.idPrefix + (n + 1)).style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                            document.getElementById(item.idPrefix + (n + 1)).setAttribute("dccheck", "true");
                        }
                    }
                    )
                }
            }
        }
    },

    /**
    * 创建乳牙牙位图对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    DeciduousTeechDialog: function (options, ctl, isInsertMode, ele) {
        if (options == null) {
            return false;
        }
        let arr = Object.values(this.stringToObject(options.Values))
        var DeciduousTeechHtml = `<div unselectable="on">
            <!--Table结构，cellspacing控制中间空行 -->
            <div>
            <table style="width:100%; position:relative; padding:0 30px;" cellspacing="0" >
            <tr style="position: absolute;width: 100%;padding-left: 50%;"><td><span style="height: 100px;margin-left: -46px;">上颌</span></td></tr>
            <tr style="position: absolute;height: 100%;left: 5px;top: 60%;"><td><span style="height: 100px;">牙<br />面</span></td></tr>
                <tr style="text-align: center; border-bottom:1px solid #d3d3d3">
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">第<br />二<br />乳<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">第<br />一<br />乳<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">乳<br />尖<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">乳<br />侧<br />切<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">乳<br />中<br />切<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">乳<br />中<br />切<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">乳<br />侧<br />切<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">乳<br />尖<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">第<br />一<br />乳<br />磨<br />牙</span></td>
                    <td style="vertical-align: bottom;"><span style="width:20px; height:100px;">第<br />二<br />乳<br />磨<br />牙</span></td>
                </tr>
                <tr style="text-align: center" id="P-teeth-list"></tr>
                <tr style="text-align: center" id="L-teeth-list"></tr>
                <tr style="text-align: center" id="B-teeth-list"></tr>
                <tr style="text-align: center" id="D-teeth-list"></tr>
                <tr style="text-align: center" id="O-teeth-list"></tr>
                <tr style="text-align: center" id="M-teeth-list"></tr>
            </table>
            </div>
            <hr style="margin:3px 0"/>
            <div>
            <table style="width:100%; background-color:#f0f0f0; padding:0 30px; position:relative;" cellspacing="0">
            <tr style="position: absolute;height: 100%;left: 5px;top: 30%;"><td><span style="height: 100px;">右</span></td></tr>
            <tr style="position: absolute;height: 100%;right: 5px;top: 30%;"><td><span style="height: 100px;">左</span></td></tr>
                <tr style="text-align: center" id="roman-top"></tr>
                <tr style="text-align: center"  id="roman-bottom"></tr> 
            </table>
            </div>
            <hr style="margin:3px 0" />
            <!--Table结构，cellspacing控制中间空行 -->
            <div>
            <table style="width:100%; background-color:#f0f0f0; padding:0 30px; position:relative;" cellspacing="0">
            <tr style="position: absolute;height: 100%;left: 5px;top: 40%;"><td><span style="height: 100px;">牙<br />面</span></td></tr>
            <tr style="text-align: center" id="M-bottom-teeth-list"></tr>
            <tr style="text-align: center" id="O-bottom-teeth-list"></tr>
            <tr style="text-align: center" id="D-bottom-teeth-list"></tr>
            <tr style="text-align: center" id="B-bottom-teeth-list"></tr>
            <tr style="text-align: center" id="L-bottom-teeth-list"></tr>
            <tr style="text-align: center" id="P-bottom-teeth-list"></tr>
            </table>
            </div>
            <center style="margin: 5px 0;">
                    <span>下颌</span>
                </center>
            </div>
        `
        var dialogOptions = {
            title: "乳牙牙位图",
            bodyHeight: 466,
            dialogContainerBodyWidth: 800,
            bodyClass: "DeciduousTeechElement",
            bodyHtml: DeciduousTeechHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        let teethPostionTopObj = TEETHPOSTIONTOPOBJ
        //上颌牙位置
        teethPostionTopObj.filter((item) => {
            this.teethPosition(item.idPrefix, item.parentId, item.teethKey)
        })
        // 下颌牙位置
        let teethPostionBottomObj = TEETHPOSTIONBOTTOMOBJ
        //下颌牙位置
        teethPostionBottomObj.filter((item) => {
            this.teethPosition(item.idPrefix, item.parentId, item.teethKey, false)
        })
        //罗马牙位（value值）结构渲染
        this.romanteethPosition(1, '#roman-top')
        this.romanteethPosition(11, '#roman-bottom')
        //值复显
        SetValues(arr)
        dcPanelBody.find('td>input.inp').click(function () {
            let nameArr = ["a1", "a3", "a5", "a6", "a8", "a10", "a11", "a13", "a15", "a16", "a18", "a20"]
            let attributeArr = ["Value1", "Value3", "Value5", "Value6", "Value8", "Value10", "Value11", "Value13", "Value15", "Value16", "Value18", "Value20"]
            if (this.getAttribute("dccheck") == "true") {
                for (var n = 1; n < 21; n++) {
                    if (this.name == "a" + n + "") {
                        this.style.cssText = `width:16px; height:16px;border:1px solid #a9a9a9;background-color: ${nameArr.includes(this.name) ? '#fff;' : '#d7e4f2;'};`;
                        this.setAttribute("dccheck", "false");
                    } else if (this.getAttribute("id") == "Value" + n + "") {
                        ["Value", "a", "b", "c", "d", "e", "f"].filter(item => {
                            document.getElementById(item + n + "").setAttribute("dccheck", "false");
                            document.getElementById(item + n + "").style.cssText = `width:16px; height:16px;border:1px solid #a9a9a9;background-color:${attributeArr.includes(this.getAttribute("id")) ? '#fff;' : '#d7e4f2;'} `;
                        })
                    }
                }
            } else {
                for (var n = 1; n < 21; n++) {
                    if (this.name == "a" + n + "") {
                        document.getElementById("Value" + n + "").style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                        document.getElementById("Value" + n + "").setAttribute("dccheck", "true");
                    } else {
                        this.style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                        this.setAttribute("dccheck", "true");
                    }
                }
            }


        })
        function successFun() {
            let newArr = GetCurrentDatas();
            let str = ''
            newArr.filter((item, index) => {
                str += `Value${index}:${item};`
            })
            options.Values = str
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
        function GetCurrentDatas() {
            var jsonObj = new Array();
            for (var n = 0; n < 20; n++) {
                var vall = "";
                var i = n + 1;
                if (document.getElementById("Value" + i + "").getAttribute("dccheck") == "true") {
                    vall = document.getElementById("Value" + i + "").value;
                    ['a', 'b', 'c', 'd', 'e', 'f'].filter(item => {
                        if (document.getElementById(item + i + "").getAttribute("dccheck") == "true") {
                            vall += document.getElementById(item + i + "").value;
                        }
                    })
                    jsonObj[n + 1] = vall;
                } else {
                    jsonObj[n + 1] = "";
                }
            }
            return jsonObj;
        }
        function SetValues(values) {
            for (var i = 0; i < 20; i++) {
                if (values[i]) {
                    document.getElementById("Value" + (i + 1) + '').style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                    document.getElementById("Value" + (i + 1) + '').setAttribute("dccheck", "true");
                    let teethKeyObject = i <= 9 ? { //上颌牙
                        'P': 'a',
                        'L': 'b',
                        'B': 'c',
                        'D': 'd',
                        'O': 'e',
                        'M': 'f',
                    } : { //下颌牙
                        'M': 'a',
                        'O': 'b',
                        'D': 'c',
                        'B': 'd',
                        'L': 'e',
                        'P': 'f',
                    }
                    for (var key in teethKeyObject) {
                        if ((values[i]).indexOf(key) >= 0) {
                            document.getElementById(teethKeyObject[key] + (i + 1) + '').style.cssText = "width:16px; height:16px;border:1px solid #a9a9a9;background-color: #0078d7;";
                            document.getElementById(teethKeyObject[key] + (i + 1) + '').setAttribute("dccheck", "true");
                        }
                    }
                }
            }
        }

    },

    /**
    * 病变上牙对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    */
    DiseasedTeethTopDialog: function (options, ctl, isInsertMode, ele) {
        if (!isInsertMode && (!options || typeof (options) != "object")) {
            return false
        }
        let arr = this.stringToObject(options.Values)
        var DiseasedTeethTopHtml = `
        <div style="display:flex;height: 100%;align-items: center;position:relative;">
           <div style="width:80px;border-bottom:5px solid #000;transform:rotate(40deg);position:absolute;top:100px;left:50%;margin-left:-70px;"></div>
           <div style="width:80px;border-bottom:5px solid #000;transform:rotate(140deg);position:absolute;top:100px;left:50%;margin-left:-10px;"></div>
           <div style="width:80px;border-bottom:5px solid #000;transform:rotate(90deg);position:absolute;top:164px;left:50%;margin-left:-40px;"></div>
           <input style="position:absolute;width:50px;top:68px;left:50%;margin-left:-25px;" type="text" name="Value1" data-text="Value1" >
           <input style="position:absolute;width:50px;left:32%;" type="text" name="Value2" data-text="Value2" >
           <input style="position:absolute;width:50px;left:54%;" type="text" name="Value3" data-text="Value3" >
        </div>
        `;
        var dialogOptions = {
            title: "病变上牙设置",
            bodyHeight: 300,
            bodyClass: "DiseasedTeethTop",
            bodyHtml: DiseasedTeethTopHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        // //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            let arr = Object.values(GetOrChangeData(dcPanelBody))
            // let newArr = GetCurrentDatas();
            let str = ''
            arr.filter((item, index) => {
                str += `Value${(index + 1) + ""}:${item};`
            })
            options.Values = str
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 病变下牙对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    */
    DiseasedTeethBottonDialog: function (options, ctl, isInsertMode, ele) {
        if (!isInsertMode && (!options || typeof (options) != "object")) {
            return false
        }
        let arr = this.stringToObject(options.Values)
        var DiseasedTeethBottonHtml = `
        <div style="display:flex;height: 100%;align-items: center;">
            <div style="flex:1;padding-right:10px">
                <input style="display:inline-block;width:100%" type="text" name="Value1" data-text="Value1" >
            </div>
            <div style="flex:1;padding-left:10px">
                    <input style="display:inline-block;width:100%;margin-bottom:20px" type="text" name="Value2" data-text="Value2" >
                <p style="border-bottom:6px solid #000"></p>
                    <input style="display:inline-block;width:100%;margin-top:20px" type="text" name="Value3" data-text="Value3" >
            </div>
        </div>
        `;
        var dialogOptions = {
            title: "病变下牙设置",
            bodyHeight: 140,
            bodyClass: "DiseasedTeethBotton",
            bodyHtml: DiseasedTeethBottonHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        // //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        GetOrChangeData(dcPanelBody, arr);
        function successFun() {
            let arr = Object.values(GetOrChangeData(dcPanelBody))
            let str = ''
            arr.filter((item, index) => {
                str += `Value${(index + 1) + ""}:${item};`
            })
            // console.log(str)
            options.Values = str
            if (isInsertMode == true) {
                ctl.DCExecuteCommand("insertmedicalexpression", false, options);
            } else {
                ctl.SetElementProperties(ele, options);
                ctl.RefreshDocument();//不刷新看不到效果
            }
        }
    },

    /**
    * 医学表达式通用值转换方法（字符串转换为对象）
    * @param values 医学表达式values默认值的字符串
    * @return arr 处理完成的对象
    */
    stringToObject: function (values) {
        let arr = {}
        if (values) {
            let newValues = values.split(';')
            newValues.filter(item => {
                if (item) {
                    let keyName = item.slice(0, item.indexOf(':'))
                    let keyvalue = item.slice(item.indexOf(':') + 1, item.length)
                    arr[keyName] = keyvalue
                }
            })
        }
        return arr
    },

    /**
    * 医学表达式通用值转换方法（字符串转换为对象）
    * @param _data 获取的输入库数据
    * @return str 处理完成的字符串
    */
    ObjectToString: function (_data) {
        let str = ''
        for (var i in _data) {
            str += `${i}:${_data[i]};`
        }
        return str
    },

    /**
    * 牙位生成函数
    * @param idPrefix id绑定的前缀
    * @param parentId 父元素id
    * @param teethKey 牙位标识
    * @param isTop 是否为上颌（用于区分上下颌）
    * @return 
    */
    teethPosition: function (idPrefix, parentId, teethKey, isTop = true) {
        let newPTeethList = ''
        let namePArr = isTop ? ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"] : ["a11", "a12", "a13", "a14", "a15", "a16", "a17", "a18", "a19", "a20"]
        let idNum = isTop ? 1 : 11
        for (var i = 0; i < namePArr.length; i++) {
            newPTeethList += `<td><input class="inp" dccheck="false" readonly="readonly" unselectable="on" name="${namePArr[i]}" type="text" id="${idPrefix + (i + idNum) + ""}" value="${teethKey}" style="width:16px; height:16px;border: 1px solid rgb(169, 169, 169);
        background-color: rgb(255, 255, 255); ${[1, 3, 6, 8].includes(i) ? 'border:1px solid #a9a9a9;background-color: #d7e4f2;' : ''}" /></td>`
        }
        jQuery(parentId).append($(newPTeethList))
    },

    /**
    * 恒牙牙位生成函数
    * @param idPrefix id绑定的前缀
    * @param parentId 父元素id
    * @param teethKey 牙位标识
    * @param isTop 是否为上颌（用于区分上下颌）
    * @return 
    */
    PermanentToothPosition: function (idPrefix, parentId, teethKey, isTop = true, ele) {
        let num = isTop ? 1 : 17
        let newRomanTeethList = ''
        for (var i = 0; i < 16; i++) {
            newRomanTeethList += `<td><input class="inp" dccheck="false" readonly="readonly" unselectable="on" name="a${(i + num) + ''}" type="text" id="${idPrefix + (i + num) + ''}" value="${teethKey}" style="width:16px; height:16px;${[1, 3, 5, 7, 8, 10, 12, 14].includes(i) ? 'border:1px solid #a9a9a9;background-color: #d7e4f2;"' : ''}" /></td>`
        }
        jQuery(parentId).append($(newRomanTeethList))
    },

    /**
    * 恒牙牙位图，value值dom生成函数
    */
    PermanentToothValueNumber: function (parentId, valueNum) {
        let newNumberValueHtml = ''
        for (var i = 8; i > 0; i--) {
            newNumberValueHtml += ` <td><input class="inp" dccheck="false" readonly="readonly" unselectable="on"
                            type="text" id="Value${valueNum + (9 - i)}" value="${i}"
                            style="${(i % 2 != 0) ? 'width:16px; height:16px;border:1px solid #a9a9a9;background-color: #d7e4f2;' : 'width:16px; height:16px;'}"
                            /></td>`
        }
        for (var i = 1; i <= 8; i++) {
            newNumberValueHtml += `<td><input class="inp" dccheck="false" readonly="readonly" unselectable="on"
                type="text" id="Value${valueNum + (i + 8)}" value="${i}"
                style="${(i % 2 != 0) ? 'width:16px; height:16px;border:1px solid #a9a9a9;background-color: #d7e4f2;' : 'width:16px; height:16px;'}"
                /></td>`
        }
        jQuery(parentId).append(jQuery(newNumberValueHtml))
        // console.log(jQuery('#valueNumberBox1'))
    },

    /**
    * 罗马数字牙位生成函数
    * @param  id绑定的前缀
    * @param valueNum value值的数字后缀
    * @param parentId 父元素id
    * @return 
    */
    romanteethPosition: function (valueNum, parentId) {
        let newRomanTeethList = ''
        let romanArr = ["Ⅴ", "Ⅳ", "Ⅲ", "Ⅱ", "Ⅰ", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"]
        for (var i = 0; i < romanArr.length; i++) {
            newRomanTeethList += `<td><input class="inp" dccheck="false" readonly="readonly" unselectable="on" type="text" id="Value${i + valueNum + ""}" data-text="Value${i + valueNum + ""}" value="${romanArr[i]}" style="width:16px; height:16px;border: 1px solid rgb(169, 169, 169);
        background-color: rgb(255, 255, 255);${[1, 3, 6, 8].includes(i) ? 'border:1px solid #a9a9a9;background-color: #d7e4f2;' : ''}"/></td>`
        }
        jQuery(parentId).append($(newRomanTeethList))
    },

    /** 
    * 全部的医学表达式对话框
    * @param options 医学表达式属性
    * @param ctl 编辑器元素
    * @param isInsertMode 是否是插入模式
    */
    MedicalExpressionDialog: function (options, ctl, isInsertMode, ele) {
        if (!options) {
            return false;
        }
        options.ExpressionStyle += "";
        // "FourValuesGeneral" 通用公式
        switch (options.ExpressionStyle) {
            // 月经史公式
            case "FourValues":
                WriterControl_Dialog.FourValuesDialog(options, ctl, isInsertMode, ele);
                break;
            // 月经史公式1
            case "FourValues1":
                WriterControl_Dialog.FourValues1Dialog(options, ctl, isInsertMode, ele);
                break;
            // 月经史公式2
            case "FourValues2":
                WriterControl_Dialog.FourValues2Dialog(options, ctl, isInsertMode, ele);
                break;
            // 月经史公式4
            case "ThreeValues":
                WriterControl_Dialog.ThreeValuesDialog(options, ctl, isInsertMode, ele);
                break;
            // 瞳孔
            case "Pupil":
                WriterControl_Dialog.PupilDialog(options, ctl, isInsertMode, ele);
                break;
            // 胎心值
            case "FetalHeart":
                WriterControl_Dialog.FetalHeartDialog(options, ctl, isInsertMode, ele);
                break;
            // 标尺
            case "PainIndex":
                WriterControl_Dialog.PainIndexDialog(options, ctl, isInsertMode, ele);
                break;
            // 眼球突出度
            case "ThreeValues2":
                WriterControl_Dialog.EyeballProtrusionDialog(options, ctl, isInsertMode, ele);
                break;
            // 斜视符号
            case "StrabismusSymbol":
                WriterControl_Dialog.SquintSymbolDialog(options, ctl, isInsertMode, ele);
                break;
            // 恒牙牙位图
            case "PermanentTeethBitmap":
                WriterControl_Dialog.PermanentTeethBitmapDialog(options, ctl, isInsertMode, ele);
                break;
            // 乳牙牙位图
            case "DeciduousTeech":
                WriterControl_Dialog.DeciduousTeechDialog(options, ctl, isInsertMode, ele);
                break;
            // 分数公式
            case "Fraction":
                WriterControl_Dialog.FractionDialog(options, ctl, isInsertMode, ele);
                break;
            // 光定位
            case "LightPositioning":
                WriterControl_Dialog.LightPositioningDialog(options, ctl, isInsertMode, ele);
                break;
            // 病变上牙
            case "DiseasedTeethTop":
                WriterControl_Dialog.DiseasedTeethTopDialog(options, ctl, isInsertMode, ele);
                break;
            // 病变下牙
            case "DiseasedTeethBotton":
                WriterControl_Dialog.DiseasedTeethBottonDialog(options, ctl, isInsertMode, ele);
                break;
            default:
                return ctl.__DCWriterReference.invokeMethod("DCExecuteCommand", 'insertmedicalexpression', false, options);
                break;
        }
        return true;
    },
    // ======医学表达式-end======

    /**
    * 创建表格/单元格边框设置对话框
    * @param options 单元格属性
    * @param ctl 编辑器元素
    */
    borderShadingcellDialog: function (options, ctl) {
        let { title, type } = options
        let ele = null
        if (type && type === 'tableCell') {
            ele = ctl.CurrentTableCell();
        } else if (type && type === 'table') {
            ele = ctl.CurrentTable();
        }
        if (!ele) {
            return
        }
        options = ctl.GetElementProperties(ele);

        let SetTabletyle = options.Style ? options.Style : {}
        var bordersShadingHtml = `
        <div style="display: flex;flex-wrap: wrap;">
            <div class="Box" style="width:150px;flex:1">
                <h6 class="title">边框</h6>
                <div style="display: flex;padding-left: 26px;flex-direction: column">
                    <label style="margin-right:10px">
                        <input type="checkbox" name="BorderTop" data-text="BorderTop" checked="checked">
                        <span class="dcTitle-text">上</span>
                    </label>
                    <label style="margin-right:10px">
                        <input type="checkbox" name="BorderBottom" data-text="BorderBottom" checked="checked">
                        <span class="dcTitle-text">下</span>
                    </label>
                    <label style="margin-right:10px">
                        <input type="checkbox" name="BorderLeft" data-text="BorderLeft" checked="checked">
                        <span class="dcTitle-text">左</span>
                        </label>
                    <label style="margin-right:10px">
                        <input type="checkbox" name="BorderRight" data-text="BorderRight" checked="checked">
                        <span class="dcTitle-text">右</span>
                    </label>
                </div>
            </div>

            <div class="Box" style="margin-top:16px;width:150px;margin-left: 20px;;flex:1">
                <h6 class="title">颜色</h6>
                <div style="display: flex;padding-left: 26px;flex-direction: column">
                    <label style="margin-right:10px">
                        <input type="color" style="width: 18px;height: 18px" data-text="BorderTopColorString" name="BorderTopColorString" >
                        <span class="dcTitle-text">上</span>
                    </label>
                    <label style="margin-right:10px">
                        <input type="color" style="width: 18px;height: 18px" name="BorderBottomColorString" data-text="BorderBottomColorString" >
                        <span class="dcTitle-text">下</span>
                        </label>
                    <label style="margin-right:10px">
                        <input type="color" style="width: 18px;height: 18px" name="BorderLeftColorString" data-text="BorderLeftColorString" >
                        <span class="dcTitle-text">左</span>
                    </label>
                    <label style="margin-right:10px">
                        <input type="color" style="width: 18px;height: 18px" name="BorderRightColorString" data-text="BorderRightColorString"  >
                        <span class="dcTitle-text">右</span>
                    </label>
                </div>
            </div>
                <label style="margin-top:16px;width:100%">
                    <span class="txt">网格线样式：</span>
                    <select style="width: 150px;" name="BorderStyle" id="BorderStyle" data-text="BorderStyle"></select>
                </label>

                <label style="margin-top:16px;width:100%">
                    <span style="width: 72px;display: inline-block;" class="dcTitle-text">宽度: </span>
                    <input style="width: 150px;" type="number" data-text="BorderWidth" name="BorderWidth">
                </label>

        </div>
        `;
        var dialogOptions = {
            title,
            bodyHeight: 240,
            bodyClass: "bordersShading",
            bodyHtml: bordersShadingHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        // //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');


        var LineStyle_node = dcPanelBody.find("#BorderStyle");
        for (var i = 0; i < DASHSTYLE.length; i++) {
            var _DashStyle = DASHSTYLE[i];
            LineStyle_node.append("<option value='" + _DashStyle.name + "'>" + _DashStyle.show + _DashStyle.name + "</option>");
        }
        GetOrChangeData(dcPanelBody, SetTabletyle);
        function successFun() {
            var styleOpt = {
                Style: GetOrChangeData(dcPanelBody)
            };
            if (type && type === 'tableCell') {
                ctl.SetElementProperties(ele, styleOpt);
            } else if (type && type === 'table') {
                ctl.SetTableBorder(ele, styleOpt['Style']);
            }

        }
    },

    /**
    * 插入表格
    * @param options 表格属性
    * @param ctl 编辑器元素
    */
    insertTableDialog: function (options, ctl) {
        // if (!options || typeof (options) != "object") {
        //     return false
        // }
        // options.Values = this.stringToObject(options.Values)

        var insertTableHtml = `
        <div>
            <div style="padding-left:10px;margin-bottom:10px;">
                <label class="flex" style="margin-bottom:11px;">
                    <h6 style="font-size: 12px;font-weight: 600;">编号：</h6>
                    <input type="text" id="TableID" class="" data-text="TableID">
                </label>
                 <label class="flex" style="margin-bottom:11px;">
                    <h6 style="font-size: 12px;font-weight: 600;">行数：</h6>
                    <input type="number" value="2" id="RowCount" class="tableRowAndColumns" data-text="RowCount">
                </label>
                <label class="flex" style="margin-bottom:11px;">
                    <h6 style="font-size: 12px;font-weight: 600;">列数：</h6>
                    <input type="number" value="3" id="ColumnCount" class="tableRowAndColumns" data-text="ColumnCount">
                </label>
            </div>
            <div id="box" class="Box" style="width:100%;height:auto;">
                <h6 class="title">预览</h6>
                <table id="tableBox" style="height:121px;width:100%"></table>
            </div>
        </div>
        `;
        var dialogOptions = {
            title: "插入表格",
            bodyHeight: 'auto',
            bodyClass: "insertTable",
            bodyHtml: insertTableHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        createTable()
        function successFun() {
            let params = GetOrChangeData(dcPanelBody)
            if (!params.RowCount || !params.ColumnCount) {
                return alert('表格行数和列数必须为正整数，且不能为空')
            }
            ctl.DCExecuteCommand('InsertTable', false, params);

        }
        dcPanelBody.find('.tableRowAndColumns').change(function () {
            let rowNum = dcPanelBody.find('#RowCount').val()
            let columnNum = dcPanelBody.find('#ColumnCount').val()
            createTable(rowNum, columnNum)
        })
        function createTable(rowNum = 2, columnNum = 3) {
            var box = document.getElementById("tableBox")
            box.innerHTML && (box.innerHTML = "")
            for (var i = 0; i < rowNum; i++) {
                var tr = document.createElement("tr");
                for (var j = 0; j < columnNum; j++) {
                    var td = document.createElement("td")
                    tr.appendChild(td);
                }
                box.appendChild(tr);
            }
        }
    },

    /**
    * 拆分单元格
    * @param options 单元格属性
    * @param ctl 编辑器元素
    */
    splitCellDialog: function (options, ctl) {
        var splitCellHtml = `
        <div>
            <label class="flex" style="margin-bottom:11px;">
                <h6 style="font-size: 12px;font-weight: 600;">行数(R)：</h6>
                <input type="number" value="1" id="RowNum" class="tableRowAndColumns" data-text="Value2">
            </label>
            <label class="flex" style="margin-bottom:11px;">
                <h6 style="font-size: 12px;font-weight: 600;">列数(C)：</h6>
                <input type="number" value="1" id="ColumnsNum" class="tableRowAndColumns" data-text="Value1">
            </label>
        </div>
        `;
        var dialogOptions = {
            title: "拆分单元格",
            dialogContainerBodyWidth: 250,
            bodyHeight: 100,
            bodyClass: "splitCell",
            bodyHtml: splitCellHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        if (options) {
            let rowstr = options.split(',')[0]
            let columstr = options.split(',')[1]
            dcPanelBody.find('#RowNum').val(rowstr)
            dcPanelBody.find('#ColumnsNum').val(columstr)
        }
        function successFun() {
            let RowNum = dcPanelBody.find('#RowNum').val();
            let columsNum = dcPanelBody.find('#ColumnsNum').val();
            let str = '' + RowNum + ',' + columsNum + ''
            ctl.DCExecuteCommand("Table_SplitCellExt", false, str)
        }

    },
    /**
   * 插入特殊字符
   * @param options 属性
   * @param ctl 编辑器元素
   */
    InsertSpecifyCharacterDialog: function (options, ctl, isInsertMode) {
        let CharacterType = Object.keys(this.InsertSpecifyCharacterObj)
        let value = ''
        var InsertSpecifyCharacterHtml = `
               <div id="tabButton">
                    <p class="tabButtonItem active" style="margin-left:0px !important;" tabId="SpecialCharacters">特殊字符</p>
                    <p class="tabButtonItem" tabId="RomanCharacters">罗马字符</p>
                    <p class="tabButtonItem" tabId="NumericCharacters">数字字符</p>
                    <p class="tabButtonItem" tabId="MedicalCharacters">医学字符</p>
               </div>
               <div id="tabDomBox"></div>
            `;
        var dialogOptions = {
            title: "插入特殊字符",
            dialogContainerBodyWidth: 500,
            bodyHeight: 500,
            bodyClass: "InsertSpecifyCharacter",
            bodyHtml: InsertSpecifyCharacterHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        var TabDomList = ``
        for (var i = 0; i < CharacterType.length; i++) {
            var charSpanDom = ``
            for (var j = 0; j < this.InsertSpecifyCharacterObj[CharacterType[i]].length; j++) {
                charSpanDom += `
                <span class="charSpanDomItem" title="${this.InsertSpecifyCharacterObj[CharacterType[i]][j]}">${this.InsertSpecifyCharacterObj[CharacterType[i]][j]}</span>
                `
            }
            TabDomList += `
                <div class="tabDomBoxItem" style="display:${CharacterType[i] === 'SpecialCharacters' ? '' : 'none'}" id="${CharacterType[i]}">${charSpanDom}</div>
            `
        }
        document.getElementById('tabDomBox').innerHTML = TabDomList
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        dcPanelBody.find(".tabButtonItem").on("click", function () {
            dcPanelBody.find('.tabButtonItem.active').removeClass('active')
            jQuery(this).addClass('active')
            dcPanelBody.find('.tabDomBoxItem').hide()
            dcPanelBody.find(`#${this.getAttribute('tabId')}`).show()
        })
        dcPanelBody.find(".charSpanDomItem").on('click', function () {
            value = '' + this.innerHTML + ''
            console.log(value)
            ctl.DCExecuteCommand("InsertSpecifyCharacter", false, value);
            // 关闭对话框
            var dialogMark = jQuery(ctl).children("#dialogMark");//蒙版元素
            var dialogContainer = jQuery(ctl).children("#dialogContainer");//对话框元素
            dialogMark.remove()
            dialogContainer.remove()
        })
        function successFun() { }
    },

    /**
    * 编辑文档批注
    * @param options 单元格属性
    * @param ctl 编辑器元素
    */
    EditDocumentCommentsDialog: function (options, ctl, isInsertMode) {
        var EditDocumentCommentsHtml = `
            <div id="box" class="Box" style="flex: 1;width:100%;height:auto;">
                <h6 class="title">批注内容</h6>
                 <textarea id="CommentText" style="width:100%;height:100%" data-text="Text" ></textarea>
            </div>
            <div id="box" class="Box" style="width:100%;height:auto;margin: 10px 0;">
                <h6 class="title">颜色设置</h6>
                <label>
                    <span>背景颜色:</span>
                    <input style="width:20px;height:20px;margin-right: 20px;" type="color" value="#f6e6e6" id="BackColor"  data-text="BackColor" />
                </label>
                <label>
                    <span>前景颜色:</span>
                    <input type="color" style="width:20px;height:20px;margin-right: 20px;" value="#121111" id="ForeColor"  data-text="ForeColor" />
                </label>
            </div>
            <div id="box" class="Box" style="width:100%;height:auto;">
                <h6 class="title">作者</h6>
                <p>姓名：<span id="Author" style="color:#636060" data-text="Author"></span></p>
                <p>编号：<span id="AuthorID" style="color:#636060" data-text="AuthorID"></span></p>
            </div>
            `;
        var dialogOptions = {
            title: "编辑文档批注",
            bodyHeight: 400,
            bodyClass: "EditDocumentComments",
            bodyHtml: EditDocumentCommentsHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        if (options) {
            let Author = options.Author || options.author
            dcPanelBody.find('#CommentText').val(options.Text)
            dcPanelBody.find('#Author').text(Author)
            dcPanelBody.find('#AuthorID').text(options.AuthorID)
            dcPanelBody.find('#BackColor').text(options.BackColor)
            dcPanelBody.find('#ForeColor').text(options.ForeColor)
        }

        GetOrChangeData(dcPanelBody, options);

        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            // let str = dcPanelBody.find('#CommentText').val()
            options = {
                ...options,
                ..._data
            }
            if (!isInsertMode) {
                ctl.SetCurrentComment(options)
                ctl.RefreshDocument();
            } else {
                ctl.DCExecuteCommand("insertcomment", false, options);
            }
        }
    },

    /**
    * 表单模式
    * @param options 单元格属性
    * @param ctl 编辑器元素
    */
    formModeDialog: function (options, ctl, isInsertMode) {
        let formMode = ctl.FormView()
        var formModeHtml = `
            <form>
                <label  style="display: block;margin-bottom: 10px;">
                    <input class="radioItem" type="radio" id="formDisable" data-text="formDisable" ${formMode && formMode == 'Disable' && 'checked'} name="Disable">
                    <span>不处于表单视图模式</span>
                </label>
                <label  style="display: block;margin-bottom: 10px;">
                    <input class="radioItem" type="radio" id="formNormal" data-text="formNormal" ${formMode && formMode == 'Normal' && 'checked'} name="Normal">
                    <span>普通表单视图模式</span>
                </label>
                <label  style="display: block;margin-bottom: 10px;">
                    <input class="radioItem" type="radio" id="formStrict" data-text="formStrict" ${formMode && formMode == 'Strict' && 'checked'} name="Strict">
                    <span>严格表单视图模式</span>
                </label>
            </form>
        `;
        var dialogOptions = {
            title: "表单模式",
            bodyHeight: 110,
            bodyClass: "formMode",
            bodyHtml: formModeHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        var newDomArr = document.getElementsByClassName("radioItem")
        jQuery(ctl).find('.radioItem').click(function () {
            for (var i = 0; i < newDomArr.length; i++) {
                newDomArr[i].checked = false
            }
            this.checked = true
        })
        function successFun() {
            for (var i = 0; i < newDomArr.length; i++) {
                if (newDomArr[i].checked) {
                    ctl.ExecuteCommand("FormViewMode", false, newDomArr[i].name);
                }
            }
        }
    },

    /**
    * 内容保护模式
    * @param options 单元格属性
    * @param ctl 编辑器元素
    */
    contentProtectedModeDialog: function (options, ctl, isInsertMode) {
        let contentProtectedMode = ctl.ProtectType()
        var contentProtectedModeHtml = `
           <form>
                <label style="display: block;margin-bottom: 10px;">
                    <input class="radioItem" type="radio" id="Value1" ${contentProtectedMode && contentProtectedMode == 'None' && 'checked'} data-text="Value1"  name="None">
                    <span>不保护内容。</span>
                </label>
                 <label style="display: block;margin-bottom: 10px;">
                    <input class="radioItem" type="radio" id="Value2" ${contentProtectedMode && contentProtectedMode == 'Content' && 'checked'}  data-text="Value2"  name="Content">
                    <span>保护内容，但可以在中间插入新内容。</span>
                </label>
                <label style="display: block;margin-bottom: 10px;">
                    <input class="radioItem" type="radio" id="Value3" ${contentProtectedMode && contentProtectedMode == 'Range' && 'checked'}  data-text="Value3"  name="Range">
                    <span>保护区域，中间不能插入新内容。</span>
                </label>
            </form>
        `;
        var dialogOptions = {
            title: "内容保护模式",
            bodyHeight: 110,
            bodyClass: "contentProtectedMode",
            bodyHtml: contentProtectedModeHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        jQuery(ctl).find('.radioItem').click(function () {
            var newDomArr = document.getElementsByClassName("radioItem")
            for (var i = 0; i < newDomArr.length; i++) {
                newDomArr[i].checked = false
            }
            this.checked = true
        })
        function successFun() {
            var newDomArr = document.getElementsByClassName("radioItem")
            for (var i = 0; i < newDomArr.length; i++) {
                if (newDomArr[i].checked) {
                    console.log(newDomArr[i].name, '============内容保护的模式')
                    ctl.ExecuteCommand("ContentProtect", false, newDomArr[i].name);
                }
            }
        }
    },

    /**
    * 用户登录
    * @param options 单元格属性
    * @param ctl 编辑器元素
    */
    loginDialog: function (options, ctl, isInsertMode) {
        // if (!options || typeof (options) != "object") {
        //     return false
        // }
        var loginHtml = `
           <div>
                <label class="flex" style="margin-bottom:11px;">
                    <span style="font-size: 12px;font-weight: 600;">用户编号：</span>
                    <input type="text" id="Value1" data-text="Value1">
                </label>
                <label class="flex" style="margin-bottom:11px;">
                    <span style="font-size: 12px;font-weight: 600;margin-left: 24px;">姓名：</span>
                    <input type="text" id="Value2" data-text="Value2">
                </label>
                <label class="flex" style="margin-bottom:11px;">
                    <span style="font-size: 12px;font-weight: 600;margin-left: 24px;">等级：</span>
                    <input type="number" id="Value3" data-text="Value3">
                </label>
            </div>
        `;
        var dialogOptions = {
            title: "用户登录",
            bodyHeight: 120,
            dialogContainerBodyWidth: 250,
            bodyClass: "login",
            bodyHtml: loginHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        function successFun() {
            // console.log(jQuery('#textareaBox').val())
        }
    },

    /**
    * 段落
    * @param options 单元格属性
    * @param ctl 编辑器元素
    */
    paragraphDialog: function (options, ctl, isInsertMode) {
        if (!options || typeof (options) != "object") {
            options = ctl.GetCurrentParagraphStyle()
        }
        console.log(options, '==========options')
        var paragraphHtml = `
            <div style="display:flex;flex-wrap:wrap;">
                <label style="display:flex;">
                    <span>段落列表样式:</span>
                    <select style="width: 140px;margin-left:5px;" id="paragraphStyle" class="paragraphStyle" data-text="ParagraphListStyle"></select>
                </label>
               <div style="width:100%;margin: 10px 0;display: flex;flex-wrap: wrap;">
                    <label style="width: 50%;">
                        <span>左侧缩进量:</span>
                        <input style="width: 82px" type="number" id="LeftIndent" data-text="LeftIndent"></input>
                    </label>
                    <label  style="width: 50%;">
                        <span>首行缩进量:</span>
                        <input style="width: 82px" type="number" id="FirstLineIndent" data-text="FirstLineIndent"></input>
                    </label>
                    <label  style="width: 50%;">
                        <span style="width: 64px;display: inline-block;margin-top: 5px;">段落前间距:</span>
                        <input type="number" style="width: 82px" id="SpacingBeforeParagraph" data-text="SpacingBeforeParagraph"></input>
                    </label>
                    <label  style="width: 50%;">
                        <span style="width: 64px;display: inline-block;margin-top: 5px;">段落后间距:</span>
                        <input type="number" style="width: 82px" id="SpacingAfterParagraph" data-text="SpacingAfterParagraph"></input>
                    </label>
               </div>
                <label  style="width:50%;">
                    <span>行距:</span>
                    <select style="width:62%" id="LineSpacingStyle" class="space" data-text="LineSpacingStyle">
                        <option value="SpaceSingle">单倍行距</option>
                        <option value="Space1pt5">1.5倍行距</option>
                        <option value="SpaceDouble">2倍行距</option>
                        <option value="SpaceExactly">最小值</option>
                        <option value="SpaceSpecify">固定值</option>
                        <option value="SpaceMultiple">多倍行距</option>
                    </select>
                </label>
                <label id="LineSpacingBox" style="flex:1;">
                    <span>设置值<span id="LineSpacingUnit"></span>:</span>
                    <input type="number" id="LineSpacing"  style="width:56%;"  data-text="LineSpacing"></input>
                </label>
            </div>
        `;
        var dialogOptions = {
            title: "段落",
            bodyHeight: 140,
            bodyClass: "paragraph",
            bodyHtml: paragraphHtml
        };
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素，复显值
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        //动态生成下拉节点
        let domStr = '';
        BULLETEDLIST.filter(item => {
            domStr += `<option title="${item.title}" value="${item.title}">${item.data}</option>`
        })
        dcPanelBody.find('#paragraphStyle').append(domStr)
        options && options.LineSpacingStyle && showLineSpacFn(options.LineSpacingStyle)
        GetOrChangeData(dcPanelBody, options);
        dcPanelBody.find('#LineSpacingStyle').bind('change', function (e) {
            showLineSpacFn(dcPanelBody.find('#LineSpacingStyle').val())
        })
        function showLineSpacFn(value) {
            if (['SpaceSpecify', 'SpaceMultiple'].includes(value)) {
                dcPanelBody.find('#LineSpacingBox').show()
                dcPanelBody.find('#LineSpacingUnit').innerHTML = value === 'SpaceSpecify' ? '值' : "倍"
            } else {
                dcPanelBody.find('#LineSpacingBox').hide()
            }
        }
        function successFun() {
            let newOptions = GetOrChangeData(dcPanelBody)
            newOptions = {
                ...options,
                ...newOptions
            }
            console.log(newOptions)
            ctl.SetCurrentParagraphStyle(newOptions)
        }
    },

    /**
    * 表格
    * @param options 查找替换属性
    * @param ctl 编辑器元素
    */
    tableDialog: function (options, ctl, isInsertMode) {
        if (!options || typeof (options) != "object") {
            var ele = ctl.CurrentTable();
            options = ctl.GetElementProperties(ele);
            if (options == null) {
                return false;
            }
        }
        let optionsID = (options && options.ID) || ''
        var LabelHtml = `
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text" style="width:84px;">表格ID：</span>
                <input class="full" type="text" data-text="ID" />
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text" style="width:84px;">内容只读保护：</span>
                <select id="" class="full" data-text="ContentReadonly">
                    <option value="Inherit">继承上级设置</option>
                    <option value="True">只读</option>
                    <option value="False">不只读</option>
                </select>
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text" style="width:84px;">启用授权控制：</span>
                <select id="" class="full" data-text="EnablePermission">
                    <option value="Inherit">继承上级设置</option>
                    <option value="True">是</option>
                    <option value="False">否</option>
                </select>
            </label>
        </div> 
        <div class="dcBody-content">
            <div>
                <label>
                    <input type="checkbox"  data-text="AllowUserToResizeRows">
                    <span>用户可调整行高</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox" data-text="AllowUserToResizeColumns">
                    <span> 用户可调整列宽</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox"  data-text="AllowUserInsertRow">
                    <span>用户可新增表格行</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox"  data-text="AllowUserDeleteRow">
                    <span> 用户可删除表格行</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox"  data-text="Deleteable">
                    <span>用户可删除表格</span>
                </label>
            </div> 
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox"  data-text="CompressOwnerLineSpacing">
                    <span>压缩行间距</span>
                </label>
            </div> 
            <div class="Box" style="margin-top:20px">
                <h6 class="title">赋值属性：</h6>
                <div class="tab3Content">
                    <label style="width:100%">
                        <span style="width:26%;display: inline-block;">数据源名称：</span>
                        <input style="width: 70%;" class="Ipt-i" id="DataSource" type="text" />
                    </label>
                    <label style="margin:4px 0;width:100%;">
                        <span style="width:26%;display: inline-block;">绑定路径：</span>
                        <input style="width: 70%;" class="Ipt-i" id="BindingPath"  type="text" />
                    </label>
                </div>
            </div>
            <div style="margin-top:20px;" class="dcBody-content Box">
                <h6 class="title">自定义属性</h6>
                <div id="attr-box"  style="margin-bottom:10px;margin-right:10px"></div>
            </div>  `;

        var dialogOptions = {
            title: "表格属性对话框",
            bodyHeight: 444,
            bodyClass: "labelElement",
            bodyHtml: LabelHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //渲染自定义属性框
        this.attributeComponents("#attr-box", (options && options.Attributes) || {})
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');

        if (options && options.ValueBinding) {
            dcPanelBody.find('#DataSource').val(options.ValueBinding.DataSource || '')
            dcPanelBody.find('#BindingPath').val(options.ValueBinding.BindingPath || '')
        }



        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        let that = this
        function successFun() {
            let Attributes = that.attributeComponents_getAttributeObj('#attr-box')
            var _data = GetOrChangeData(dcPanelBody);
            let DataSource = dcPanelBody.find('#DataSource').val()
            let BindingPath = dcPanelBody.find('#BindingPath').val()
            options = {
                ...options,
                ..._data,
                ValueBinding: {
                    DataSource,
                    BindingPath,
                },
                Attributes
            }
            console.log(options, '=============options')
            ctl.SetTableElementPoperties(optionsID, options)
        }
    },

    /**
    * 单元格
    * @param options 把绑定数据源元素插入到该元素位置最后面
    * @param ctl 编辑器元素
    */
    tableCellDialog: function (options, ctl) {
        var ele = ctl.CurrentTableCell();
        if (!options || typeof (options) != "object") {
            options = ctl.GetElementProperties(ele);
            if (options == null) {
                return false;
            }
        }

        if (options.Style.Align && options.Style.VerticalAlign) {
            //wyc20230711:修改单元格获取水平对齐的逻辑
            var crtpStyle = ctl.GetCurrentParagraphStyle();
            options['Align'] = crtpStyle.Align;
            options['VerticalAlign'] = options.Style.VerticalAlign;
        }

        var LabelHtml = `
        <div class="dcBody-content">
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text" style="width: 84px;">内容只读保护：</span>
                    <select id="" class="full" data-text="ContentReadonly">
                        <option value="Inherit">继承上级设置</option>
                        <option value="True">只读</option>
                        <option value="False">不只读</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text" style="width: 84px;">启用授权控制：</span>
                    <select id="" class="full" data-text="EnablePermission">
                        <option value="Inherit">继承上级设置</option>
                        <option value="True">是</option>
                        <option value="False">否</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text" style="width: 84px;">复制模式：</span>
                    <select id="" class="full" data-text="CloneType">
                        <option value="Default">不复制文档内容</option>
                        <option value="ContentWithClearField">复制但清空输入域</option>
                        <option value="Complete">完整复制</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text" style="width:84px;">焦点快捷键：</span>
                    <select class="full" id="MoveFocusHotKey" data-text="MoveFocusHotKey">
                        <option value="None">None</option>
                        <option value="Default">Default</option>
                        <option value="Tab">Tab</option>
                        <option value="Enter">Enter</option>
                    </select>
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text" style="width:84px;">数值表达式：</span>
                    <input class="full" data-text="ValueExpression" type="text" />
                </label>
            </div>
            <div class="dcBody-content" style="display:flex;">
                <span class="dcTitle-text" style="width: 84px;">对齐方式：</span>
                <div style="width: 256px;">
                    <label style="width:38%;"  for="Align">水平对齐方式:</label>
                    <select style="width: 60%;" id="Align" data-text="Align">
                        <option value="Left">左对齐</option>
                        <option value="Right">右对齐</option>
                        <option value="Center">居中对齐</option>
                    </select>
                    <label style="width:38%;" for="vertical">垂直对齐方式:</label>
                    <select style="width: 60%;margin-bottom: 5px;" id="vertical" data-text="VerticalAlign">
                        <option value="Top">顶端对齐</option>
                        <option value="Bottom">底端对齐</option>
                        <option value="Middle">居中对齐</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="Box" style="margin-top:20px">
            <h6 class="title">赋值属性：</h6>
            <div class="tab3Content">
                <label style="width:100%">
                    <span style="width:26%;display: inline-block;">数据源名称：</span>
                    <input style="width: 70%;" class="Ipt-i" id="DataSource" type="text" />
                </label>
                <label style="margin:4px 0;width:100%;">
                    <span style="width:26%;display: inline-block;">绑定路径：</span>
                    <input style="width: 70%;" class="Ipt-i" id="BindingPath"  type="text" />
                </label>
            </div>
        </div>
        <div style="margin-top:20px;" class="dcBody-content Box">
            <h6 class="title">自定义属性</h6>
            <div id="attr-box" style="margin-bottom:10px;margin-right:10px"></div>
        </div>  `;

        var dialogOptions = {
            title: "单元格属性对话框",
            bodyHeight: 476,
            bodyClass: "labelElement",
            bodyHtml: LabelHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);

        //渲染自定义属性框
        this.attributeComponents("#attr-box", (options && options.Attributes) || {})
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        GetOrChangeData(dcPanelBody, options);
        if (options && options.ValueBinding) {
            dcPanelBody.find('#DataSource').val(options.ValueBinding.DataSource || '')
            dcPanelBody.find('#BindingPath').val(options.ValueBinding.BindingPath || '')
        }
        let that = this
        function successFun() {
            let Attributes = that.attributeComponents_getAttributeObj('#attr-box')
            var _data = GetOrChangeData(dcPanelBody);
            let DataSource = dcPanelBody.find('#DataSource').val()
            let BindingPath = dcPanelBody.find('#BindingPath').val()
            let { Align, VerticalAlign } = _data
            options = {
                ...options,
                ..._data,
                Attributes,
                ValueBinding: {
                    DataSource,
                    BindingPath,
                },
                Style: {
                    Align, VerticalAlign
                }
            }
            delete options.Align
            delete options.VerticalAlign
            ctl.SetElementProperties(ele, options)
        }
    },

    /**
    * 表格行
    * @param options 把绑定数据源元素插入到该元素位置最后面
    * @param ctl 编辑器元素
    */
    tableRowDialog: function (options, ctl) {
        var ele = ctl.CurrentTableRow();
        if (!options || typeof (options) != "object") {

            options = ctl.GetElementProperties(ele);
            if (options == null) {
                return false;
            }
        }
        console.log(options)
        var LabelHtml = `
        <div class="dcBody-content">
            <label class="flex">
                <span class="" style="width: 72px;">固定高度：</span>
                <input class="full" id="SpecifyHeight" type="number" data-text="SpecifyHeight" />
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="" style="width:72px;">复制模式：</span>
                <select id="" class="full" data-text="CloneType">
                    <option value="none">不复制文档内容</option>
                    <option value="ContentWithClearField">复制但清空输入域</option>
                    <option value="Complete">完整复制</option>
                </select>
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="">内容只读保护：</span>
                <select id="" class="full" data-text="ContentReadonly">
                    <option value="Inherit">继承上级设置</option>
                    <option value="True">只读</option>
                    <option value="False">不只读</option>
                </select>
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="">启用授权控制：</span>
                <select id="" class="full" data-text="EnablePermission">
                    <option value="Inherit">继承上级设置</option>
                    <option value="True">是</option>
                    <option value="False">否</option>
                </select>
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="">允许用户调整高度：</span>
                <select id="" class="full" data-text="AllowUserToResizeHeight">
                   <option value="Inherit">继承上级设置</option>
                    <option value="True">是</option>
                    <option value="False">否</option>
                </select>
            </label>
        </div>
        
        <div class="dcBody-content">
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox" name="" id="AlignToGridLine"   data-text="HeaderStyle">
                    <span>在各页顶端以标题形式重复出现</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox" name="" id="AlignToGridLine"   data-text="NewPage">
                    <span>强制分页</span>
                </label>
            </div> 
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox" name="" id="CanSplitByPageLine"   data-text="CanSplitByPageLine">
                    <span>是否允许跨页</span>
                </label>
            </div> 
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox" name="" id="PrintCellBorder"   data-text="PrintCellBorder">
                    <span>打印单元格边框</span>
                </label>
            </div> 
        </div> 
        <div class="Box" style="margin-top:20px">
            <h6 class="title">赋值属性：</h6>
            <div class="tab3Content">
                <label>
                    <span style="width:82px;display: inline-block;">数据源名称：</span>
                    <input class="Ipt-i" id="DataSource" data-text="Datasource" type="text" />
                </label>
                <label style="margin:4px 0;">
                    <span style="width:82px;display: inline-block;">绑定路径：</span>
                    <input class="Ipt-i" id="BindingPath" data-text="BindingPath" type="text" />
                </label>
            </div>
        </div>
        <div class="Box dcBody-content" style="margin-top:20px;">
                <h6 class="title">自定义属性</h6>
                <div id="attr-box" style="margin-bottom:10px;margin-right:10px"></div>
        </div>  
`;
        var dialogOptions = {
            title: "表格行属性对话框",
            bodyHeight: 400,
            bodyClass: "labelElement",
            bodyHtml: LabelHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //渲染自定义属性框
        this.attributeComponents("#attr-box", (options && options.Attributes) || {})

        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        var Box2 = dcPanelBody.find(".dcBody-contentflex").find("#Box2")[0]
        var that = this
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        // 设置禁用
        dialogContainer.find('#Visible').change(function () {
            that.changeFormDisable(Box2, !this.checked)
        })
        GetOrChangeData(dcPanelBody, opts);
        if (options && options.ValueBinding) {
            dcPanelBody.find('#DataSource').val(options.ValueBinding.DataSource || '')
            dcPanelBody.find('#BindingPath').val(options.ValueBinding.BindingPath || '')
        }
        function successFun() {
            let Attributes = that.attributeComponents_getAttributeObj('#attr-box')
            let DataSource = dcPanelBody.find('#DataSource').val()
            let BindingPath = dcPanelBody.find('#BindingPath').val()
            var _data = GetOrChangeData(dcPanelBody);
            options = {
                ...options,
                ..._data,
                Attributes,
                ValueBinding: {
                    DataSource,
                    BindingPath,
                }
            }
            ctl.SetElementProperties(ele, options)
        }
    },

    /**
    * 表格列
    * @param options 把绑定数据源元素插入到该元素位置最后面
    * @param ctl 编辑器元素
    */
    tableColumnDialog: function (options, ctl) {
        var ele = ctl.CurrentTableColumn();
        if (!options || typeof (options) != "object") {
            options = ctl.GetElementProperties(ele);
            if (options == null) {
                return false;
            }
        }
        var LabelHtml = `
         <div class="Box" style="margin-top:20px">
            <h6 class="title">赋值属性：</h6>
            <div class="tab3Content">
                <label>
                    <span style="width:82px;display: inline-block;">数据源名称：</span>
                    <input class="Ipt-i" id="DataSource" data-text="Datasource" type="text" />
                </label>
                <label style="margin:4px 0;">
                    <span style="width:82px;display: inline-block;">绑定路径：</span>
                    <input class="Ipt-i" id="BindingPath" data-text="BindingPath" type="text" />
                </label>
            </div>
        </div>`;
        var dialogOptions = {
            title: "表格列属性对话框",
            bodyHeight: 160,
            bodyClass: "labelElement",
            bodyHtml: LabelHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //渲染自定义属性框
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        if (options && options.ValueBinding) {
            dcPanelBody.find('#DataSource').val(options.ValueBinding.DataSource || '')
            dcPanelBody.find('#BindingPath').val(options.ValueBinding.BindingPath || '')
        }
        function successFun() {
            let DataSource = dcPanelBody.find('#DataSource').val()
            let BindingPath = dcPanelBody.find('#BindingPath').val()
            options = {
                ValueBinding: {
                    DataSource,
                    BindingPath,
                }
            }
            ctl.SetElementProperties(ele, options)
        }
    },

    /**
    * 单元格网格线
    * @param options 属性
    * @param ctl 编辑器元素
    */
    cellGridlineDialog: function (options, ctl, isInsertMode) {
        let cell = ctl.CurrentTableCell()
        if (!cell) {
            return
        }
        options = ctl.GetElementProperties(cell);
        let GridLineOptions = options.GridLine ? options.GridLine : {
            AlignToGridLine: true, //文本行对齐到网格线
            ColorValue: "#000000",  //网格线颜色
            GridSpanInCM: 1,  //网格线之间的宽度
            LineStyle: "Solid", //网格线样式
            LineWidth: 1,  //网格线宽度
            Printable: true, //打印预览是否显示
            Visible: true, //网格是否显示
        }
        var cellGridlineHtml = `
        <div class="cellGridlineBox">
            <div>
                <input id="checkbox" type="checkbox" name="Visible" data-text="Visible">
                <span>网格是否显示</span>
            </div>
            <div id="cellGridlineContent" class="cellGridlineContent Box" style="margin-left: 16px;margin-top: 20px;">
                <h6 class="title">网格线属性</h6>
                <div>
                    <span class="cellGridlineBox-span">网格线样式:</span>
                    <select name="LineStyle" id="LineStyle" data-text="LineStyle"></select>
                </div>
                <div>
                    <span class="cellGridlineBox-span">网格线颜色:</span>
                    <input style="height:20px;" class="cellGridlineBox-input"  type="color" name="Color" data-text="Color">
                </div>
                <div>
                    <span class="cellGridlineBox-span">网格线宽度:</span>
                    <input class="cellGridlineBox-input"  type="number" name="LineWidth" data-text="LineWidth">
                </div>
                <div>
                    <span class="cellGridlineBox-span">网格线之间的宽度:</span>
                    <input class="cellGridlineBox-input" type="number" name="GridSpanInCM" data-text="GridSpanInCM">
                </div>
                <div style="line-height: 26px;">
                    <input type="checkbox" name="AlignToGridLine" data-text="AlignToGridLine">
                    <span>文本行对齐到网格线</span>
                </div>
                <div style="line-height: 26px;">
                    <input type="checkbox" name="Printable" data-text="Printable">
                    <span>打印预览是否显示</span>
                </div>
            </div>
           
        </div>
        `;
        var dialogOptions = {
            title: "单元格网格线",
            bodyClass: "labelElement",
            bodyHtml: cellGridlineHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        for (var i = 0; i < DASHSTYLE.length; i++) {
            dcPanelBody.find('#LineStyle').append("<option value = '" + DASHSTYLE[i].name + "' > " + DASHSTYLE[i].show + DASHSTYLE[i].name + "</option >")
        }

        dcPanelBody.find("input[data-text=Visible]").on("click", function (e) {
            var isVisible = jQuery(this).is(":checked");
            let inputArr = dcPanelBody.find('#cellGridlineContent').find('input')
            dcPanelBody.find('#LineStyle').attr('disabled', !isVisible)
            for (var i = 0; i < inputArr.length; i++) {
                inputArr[i].disabled = !isVisible
            }
        });
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(GridLineOptions, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(GridLineOptions, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, GridLineOptions);

        function successFun() {
            var cell = ctl.CurrentTableCell();
            var _data = GetOrChangeData(dcPanelBody);
            //wyc20230713:该对话框改成只设置网格线不处理其它属性了
            options = {
                GridLine: _data
            };
            //options['GridLine'] = _data/////////////////////////
            ctl.SetElementProperties(cell, options);
        }
    },

    /**
    * 单元格斜分线
    * @param options 属性
    * @param ctl 编辑器元素
    */
    cellDiagonalLineDialog: function (options, ctl, isInsertMode) {
        let cell = ctl.CurrentTableCell()
        if (!cell) {
            return
        }
        options = ctl.GetElementProperties(cell)
        let { SlantSplitLineStyle } = options
        var cellDiagonalLineHtml = `
        <div class="cellDiagonalLineBox">
           <div style="margin:10px 0"> 
                <span style="height: 20px;line-height: 20px;margin: 0 10px 10px 0;">斜分线样式:</span>
                <p id="slantsplitlinestyle" style="padding-left:10px;">None</p>
            </div>
            <div class="slantsplitlinestyle-item" id='None'> 
               <div class="None"></div> 
               <span> None </span>
            </div>
            <div  class="slantsplitlinestyle-item" id='TopLeftOneLine'>
                <div class="TopLeftOneLine">
                    <p style="width: 110px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(26deg);margin-top: 24px;margin-left: -6px;"></p>
                </div>
                <span> TopLeftOneLine </span>
            </div>

            <div  class="slantsplitlinestyle-item" id='TopLeftTwoLines'>
                <div class="TopLeftTwoLines">
                    <p style="width: 104px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(17deg);margin-top: 15px;margin-left: -3px;"></p>
                    <p style="width: 80px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(36deg);margin-top: 8px;margin-left: -6px;"></p>
                </div>
                <span>TopLeftTwoLines</span>
            </div>

            <div  class="slantsplitlinestyle-item" id='TopRightOneLine'>
                <div class="TopRightOneLine">
                    <p style="width: 110px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(-26deg);margin-top: 23px;margin-left: -6px;"></p>
                </div>
                <span>TopRightOneLine</span>
            </div>
            <div  class="slantsplitlinestyle-item" id='TopRightTwoLines'>
                <div class="TopRightTwoLines">
                    <p style="width: 104px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(-17deg);margin-top: 15px;margin-left: -3px;"></p>
                    <p style="width: 80px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(-36deg);margin-top: 8px;margin-left: 25px;"></p>
                </div>
                <span>TopRightTwoLines</span>
            </div>
            <div  class="slantsplitlinestyle-item" id='BottomRightOneLine'>
                <div class="BottomRightOneLine">
                    <p style="width: 110px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(26deg);margin-top: 24px;margin-left: -6px;"></p>
                </div>
                <span>BottomRightOneLine</span>
            </div>
            <div  class="slantsplitlinestyle-item" id='BottomRigthTwoLines'>
                <div class="BottomRigthTwoLines">
                    <p style="width: 89px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(33deg);margin-top: 24px;margin-left: 17px;"></p>
                    <p style="width: 100px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(18deg);margin-top: 6px;margin-left: -2px;"></p>
                </div>
                <span>BottomRigthTwoLines</span>
            </div>
            <div  class="slantsplitlinestyle-item" id='BottomLeftOneLine'>
                <div class="BottomLeftOneLine">
                    <p style="width: 110px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(-26deg);margin-top: 23px;margin-left: -6px;"></p>
                </div>
                <span>BottomLeftOneLine</span>
            </div>
            <div  class="slantsplitlinestyle-item" id='BottomLeftTwoLines'>
                <div class="BottomLeftTwoLines">
                    <p style="width: 92px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(-32deg);margin-top: 24px;margin-left: -8px;"></p>
                    <p style="width: 102px;height: 1px;border-bottom: 1px solid #858585;transform: rotate(345deg);margin-top: 9px;margin-left: -2px;"></p>
                </div>
                <span>BottomLeftTwoLines</span>
            </div>
        </div>
        `;
        var dialogOptions = {
            title: "单元格斜分线",
            bodyClass: "cellDiagonalLine",
            bodyHtml: cellDiagonalLineHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        let slantsplitlinestyleArr = jQuery(ctl).find('.slantsplitlinestyle-item')
        if (SlantSplitLineStyle) {
            for (var i = 0; i < slantsplitlinestyleArr.length; i++) {
                if (slantsplitlinestyleArr[i].id === SlantSplitLineStyle) {
                    slantsplitlinestyleArr[i].style = "background:#d7e4f2;"
                    jQuery(ctl).find('#slantsplitlinestyle').html(slantsplitlinestyleArr[i].id)
                }
            }
        }
        slantsplitlinestyleArr.click(function () {
            for (var i = 0; i < slantsplitlinestyleArr.length; i++) {
                slantsplitlinestyleArr[i].style = "background:#fafafa"
            }
            this.style = "background:#d7e4f2;"
            jQuery(ctl).find('#slantsplitlinestyle').html(this.id)
        })
        function successFun() {
            options['SlantSplitLineStyle'] = jQuery(ctl).find('#slantsplitlinestyle').html()
            ctl.SetElementProperties(cell, options);
        }
    },

    /**
    * 编辑图片对话框
    * @param options 图片属性
    * @param ctl 编辑器元素
    */
    imgEditDialog: function (options, ctl, isInsertMode) {
        console.log(options, '===========图片options')
        if (!options) {
            return false;
        }
        var imgEditHtml = `
        <div id="canvas_box">
            <div id="tools">
                <div class="left">
                    <div class="box">
                        <label for="">
                            <span>填充：</span>
                          <input style="width:30px;height:20px;" type="color" name="fill" id="fill_color">
                        </label>
                        <label for="">
                            <span>边框：</span>
                           <input style="width:30px;height:20px;" type="color" name="stroke" id="stroke_color">
                        </label>
                        <br/>
                        <div style="display: flex;margin: 5px 0;">
                            <button style="margin-right:8px;" class="mouseMode"  value="Rect"><span>矩形</span></button>
                            <button style="margin-right:8px;" class="mouseMode" value="Ellipse"><span>椭圆形</span></button>
                            <button style="margin-right:8px;" class="mouseMode" value="Line"><span>线段</span></button>
                            <button style="margin-right:8px;" class="mouseMode" value="IText"><span>文字</span></button>
                            <button style="margin-right:8px;" id="del"><span>删除</span></button>
                            <button style="margin-right:8px;" class="undoBtn"><span>撤销</span></button>
                            <button style="margin-right:8px;" class="redoBtn"><span>重做</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="wrap">
                <canvas width="300" height="200" id="show_canvas" class="m_canvas">
                    <p>不支持canvas</p>
                </canvas>
            </div>
        </div>`;
        var dialogOptions = {
            title: "编辑图片",
            bodyHeight: 400,
            bodyClass: "imgEdit",
            bodyHtml: imgEditHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        var ActionBackNext = {
            state: {
                // 指针标记当前位置
                pointer: -1,
                // 操作记录
                operateList: [],
                // 深度，记录步骤次数
                // deep: 20,
            },
            constructor(canvas) {
                // 保存 canvas 对象
                this.state['canvas'] = canvas;
                // 绑定键盘事件
                this.bindKeyBoard(canvas);
                // 添加也要保存
                this.operateData();
            },
            /**
             * 修改按钮是否可以用
             * @param canvas
             */
            changeBtnState() {
                // console.log("changeBtnState")
                if (this.state.pointer > 0) {
                    $(".undoBtn").removeAttr("disabled");
                } else {
                    $(".undoBtn").attr("disabled", "disabled");
                }
                if (this.state.pointer + 1 >= this.state.operateList.length) {
                    $(".redoBtn").attr("disabled", "disabled");
                } else {
                    $(".redoBtn").removeAttr("disabled");
                }
            },
            /**
             * 绑定键盘事件
             * @param canvas
             */
            bindKeyBoard(canvas) {
                // $(document).on('keydown', (e) => {
                //   const key = e.originalEvent.keyCode;
                //   switch (key) {
                //     case KeyCode.W: // 上一步
                //       console.log('back');
                //       this.prevStepOperate();
                //       break;
                //     case KeyCode.E: // 下一步
                //       console.log('next');
                //       this.nextStepOperate();
                //       break;
                //   }
                // });
                canvas.on('object:modified', (e) => {
                    // 为了方便保存，调整图形直接触发保存
                    this.operateData();
                });
            },
            /**
             * 操作保存的数据
             */
            operateData() {
                const { canvas, operateList, pointer, deep } = this.state;
                let max = deep;
                let list = [...operateList];
                // 当前状态
                let currentPointer = pointer;
                const json = canvas.toJSON();
                // 更新指针位置
                currentPointer += 1;
                // 考虑到可能存在后续动作，插入队列操作
                list.splice(currentPointer, 0, json);
                if (max && max < list.length) {
                    // 深度存在，则判断当前队列长，超出则从头移出队列
                    list.shift();
                    currentPointer -= 1;
                }
                // 保存数据
                this.setState({
                    operateList: list,
                    pointer: currentPointer,
                });
                this.changeBtnState();
                // console.log('save');
            },
            /**
             * 合并更新
             * @param obj
             */
            setState(obj) {
                this.state = Object.assign(this.state, obj);
            },
            /**
             * 上一步
             */
            prevStepOperate() {
                const { canvas, operateList, pointer } = this.state;
                let list = [...operateList];
                let currentPointer = pointer;
                if (currentPointer > 0) {
                    // 加载前一步
                    currentPointer -= 1;
                    canvas.loadFromJSON(list[currentPointer]).renderAll();
                }
                this.setState({
                    operateList: [...list],
                    pointer: currentPointer
                });
                this.changeBtnState();
            },
            /**
             * 下一步
             */
            nextStepOperate() {
                const { canvas, operateList, pointer } = this.state;
                let list = [...operateList];
                let currentPointer = pointer;
                // 指针移动
                currentPointer += 1;
                if (currentPointer >= list.length) {
                    this.changeBtnState();
                    return;
                }
                canvas.loadFromJSON(list[currentPointer]).renderAll();
                this.setState({
                    operateList: [...list],
                    pointer: currentPointer
                });
                this.changeBtnState();
            },
        };
        var dialogContainer = jQuery(ctl).children("#dialogContainer");
        var dcPanelBody = dialogContainer.find("#dcPanelBody");
        var canvasElement = dcPanelBody.find("#show_canvas")[0];
        var canvas = new fabric.Canvas(canvasElement, {
            containerClass: "canvasElementContainer"
        });
        var img = new Image();
        if (options && options.Src && options.Src.indexOf("http") == 0) {
            img.setAttribute("crossOrigin", "Anonymous");
        }
        img.src = "data:image/png;base64," + options.Src
        img.onload = function () {
            // 设置画布的宽高
            canvas.setDimensions({
                // width: options.Width,
                // height: options.Height,
                width: img.width,
                height: img.height
            });
            if (options && options.Attributes && options.Attributes.inneradditionshape) {
                var loadobj = JSON.parse(options.Attributes.inneradditionshape);
                // console.log(loadobj, loadobj.backgroundImage.src == options.Src, '==============loadobj')
                canvas.loadFromJSON(loadobj, function () {
                    canvas.renderAll();
                    ActionBackNext.constructor(canvas);
                });
            } else {
                // 将base64图片设置成背景
                canvas.setBackgroundImage(img.src, function () {
                    canvas.renderAll();// 刷新画布
                    ActionBackNext.constructor(canvas);
                });
            }
            dcPanelBody.find(".mouseMode").click(handleMouseModeChange);

            // , {
            // scaleX: canvas.width / options.Width, scaleY: canvas.height / options.Height
            // }
        };
        var mouseMode = "Rect";
        /**
        * 监听模式改变事件
        * @param {*} event 事件Event
        * @returns {*} null
        */
        var handleMouseModeChange = function (event) {
            if (!mouseMode) return;
            mouseMode = this.value;
            switch (mouseMode) {
                case "Rect":
                    handleRectMode();
                    break;
                case "Ellipse":
                    handleEllipseMode();
                    break;
                case "Line":
                    handleLineMode();
                    break;
                case "IText":
                    handleTextMode();
                    break;
                default:
                    break
            }
        }
        /**
      * 将所有事件清除掉
      * @returns {*} null
      */
        var clearAllEvents = function () {
            // 在添加事件之前先把该事件清除掉，以免重复添加
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
        }

        /**
        * 监听鼠标矩形事件
        * @returns {*} null
        */
        var handleRectMode = function () {
            clearAllEvents();
            var isMouseDown = false;//是否鼠标按下
            var rect;
            canvas.on('mouse:down', function (options) {
                if (options.target) {
                    return;
                }
                var left = options.pointer.x;
                var top = options.pointer.y;
                let fill = dcPanelBody.find("#fill_color").val()
                let stroke = dcPanelBody.find("#stroke_color").val()
                isMouseDown = true;
                rect = new fabric.Rect({
                    left: left,
                    top: top,
                    fill,
                    stroke,
                    opacity: 0.3
                });
                // 添加矩形到画布上
                canvas.add(rect);
            });
            canvas.on('mouse:move', function (options) {
                if (isMouseDown) {
                    var move_left = options.pointer.x - rect.left;
                    var move_top = options.pointer.y - rect.top;
                    rect.set({
                        width: move_left,
                        height: move_top,
                    });
                    canvas.renderAll();
                }
            });
            canvas.on('mouse:up', function (options) {
                isMouseDown = false;
                console.log(rect, '======rect')
                if (rect.get('width') == 0 || rect.get('height') == 0) {
                    canvas.remove(rect); // 移除这个矩形
                } else {
                    ActionBackNext.operateData();
                }
                clearAllEvents();

            });
        };
        /**
        * 监听鼠标椭圆形事件
        * @returns {*} null
        */
        var handleEllipseMode = function () {
            clearAllEvents();
            var isMouseDown = false;//是否鼠标按下
            var Ellipse;
            var downPointer;
            canvas.on('mouse:down', function (options) {
                if (options.target) {
                    return;
                }
                downPointer = options.pointer;
                var left = options.pointer.x;
                var top = options.pointer.y;
                let fill = dcPanelBody.find("#fill_color").val()
                let stroke = dcPanelBody.find("#stroke_color").val()
                isMouseDown = true;
                Ellipse = new fabric.Ellipse({
                    left,
                    top,
                    fill,
                    stroke,
                    opacity: 0.3
                });
                // 添加椭圆形到画布上
                canvas.add(Ellipse);
            });
            canvas.on('mouse:move', function (options) {
                if (isMouseDown) {
                    var move_left = options.pointer.x - downPointer.x;
                    var move_top = options.pointer.y - downPointer.y;
                    if (move_left != 0 || move_top != 0) {
                        var obj = {
                            left: Math.min(options.pointer.x, downPointer.x),
                            top: Math.min(options.pointer.y, downPointer.y),
                            rx: Math.abs(move_left) / 2,
                            ry: Math.abs(move_top) / 2,
                        }
                        Ellipse.set(obj);
                        canvas.renderAll();
                    }
                }
            });
            canvas.on('mouse:up', function (options) {
                isMouseDown = false;
                if (Ellipse.get('rx') == 0 || Ellipse.get('ry') == 0) {
                    canvas.remove(Ellipse); // 移除这个椭圆形
                } else {
                    ActionBackNext.operateData();
                }
                clearAllEvents();
            });
        }
        /**
        * 监听鼠标线段事件
        * @returns {*} null
        */
        var handleLineMode = function () {
            clearAllEvents();
            var isMouseDown = false;//是否鼠标按下
            var Line;
            var downPointer;
            canvas.on('mouse:down', function (options) {
                if (options.target) {
                    return;
                }
                downPointer = options.pointer;
                // var left = options.pointer.x;
                // var top = options.pointer.y;
                isMouseDown = true;
                // Line = new fabric.Line([left, top],{
                //   stroke: 'black', // 笔触颜色
                // });
                // 添加椭圆形到画布上
                // canvas.add(Line);
            });
            canvas.on('mouse:move', function (options) {
                if (isMouseDown) {
                    var move_left = options.pointer.x - downPointer.x;
                    var move_top = options.pointer.y - downPointer.y;
                    canvas.remove(Line);
                    if (move_left != 0 || move_top != 0) {
                        var obj = {
                            x2: options.pointer.x,
                            y2: options.pointer.y
                        }
                        Line = new fabric.Line([downPointer.x, downPointer.y, obj.x2, obj.y2], {
                            stroke: 'black', // 笔触颜色
                        });
                        // 添加椭圆形到画布上
                        canvas.add(Line);
                        // Line.set(obj);
                        canvas.renderAll();
                    }
                }
            });
            canvas.on('mouse:up', function (options) {
                isMouseDown = false;
                clearAllEvents();
                if (Line) {
                    ActionBackNext.operateData();
                }
            });
        }

        /**
        * 监听鼠标添加文字事件
        * @returns {*} null
        */
        var handleTextMode = function () {
            // 在添加事件之前先把该事件清除掉，以免重复添加
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            // canvas.on('mouse:down', function (options) {
            // });
            // canvas.on('mouse:move', function (options) {
            // });
            canvas.on('mouse:up', function (options) {
                if (options.target) {
                    return;
                }
                var active = canvas.getActiveObject();
                if (active) {
                    return;
                }
                var left = options.pointer.x;
                var top = options.pointer.y;
                var IText = new fabric.IText("默认文字", {
                    left: left,
                    top: top,
                });
                canvas.add(IText);
                clearAllEvents();
                ActionBackNext.operateData();
            });
        };
        // 删除元素
        dcPanelBody.find("#del").click(function () {
            var active = canvas.getActiveObject();
            if (active) {
                canvas.remove(active);
                if (active.type == "activeSelection") {
                    active.getObjects().forEach(function (x) {
                        canvas.remove(x);
                    });
                    canvas.discardActiveObject().renderAll();
                }
                ActionBackNext.operateData();
            }
        });
        dcPanelBody.find(".undoBtn").click(function () {
            ActionBackNext.prevStepOperate();
        });
        dcPanelBody.find(".redoBtn").click(function () {
            ActionBackNext.nextStepOperate();
        });
        function successFun() {
            var data = {
                ID: options.ID,
                Attributes: {
                    inneradditionshape: JSON.stringify(canvas.toJSON()),
                },
            };
            console.log(data, '=============编辑图片data')
            ctl.SetElementProperties(options.ID, data);
            ctl.RefreshDocument();//不刷新看不到效果
        }
    },

    /**
    * 创建执行编辑器命令对话框
    * @param options 执行命令属性
    * @param ctl 编辑器元素
    */
    DCExecuteCommandDialog: function (ctl) {
        var DCExecuteCommandHtml = `
        <div id="DCExecuteCommandTable">
            <table>
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody> </tbody>
            </table>
        </div>
        `;
        var dialogOptions = {
            title: "执行命令对话框",
            bodyHeight: 325,
            dialogContainerBodyWidth: 550,
            bodyClass: "DCExecuteCommandsElement",
            bodyHtml: DCExecuteCommandHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        // 模拟数据
        var mockArray = MOCKARRAY;
        // 根据英文首字母进行排序
        mockArray.sort(function (a, b) {
            return (a.name + '').localeCompare(b.name + '')
        })

        //循环创建元素
        var tbodyHtml = "";
        for (var i = 0; i < mockArray.length; i++) {
            var TRHtml = `
            <tr commandname="${mockArray[i].name}" >
                    <td class="name">${mockArray[i].name}</td>
                    <td class="description">${mockArray[i].description}</td>
            </tr>
            `;
            tbodyHtml += TRHtml;
        }
        dcPanelBody.find("#DCExecuteCommandTable tbody").html(tbodyHtml);
        var opts = {};
        // 所有的表格行
        var trs = dcPanelBody.find("#DCExecuteCommandTable tr[commandname]");
        // tr点击事件 
        trs.click(function () {
            trs.removeClass("ClickLine");
            jQuery(this).addClass("ClickLine");
            var tds = jQuery(this).find("td");
            opts = {
                name: tds.filter(".name").html(),
                description: tds.filter(".description").html()
            };
        });
        // 命令对话框中tr双击事件模拟点击确定按钮
        trs.dblclick(function () {
            var submitValue = dialogContainer.find("#submitValue");
            submitValue.click();
        });
        function successFun() {
            // console.log("successFun -> opts", opts)
            if (opts) {

                if (opts.name === 'AboutControl') {
                    //设置弹框关闭后在弹出alert关于
                    setTimeout(() => {
                        ctl.DCExecuteCommand(opts.name, true);
                    }, 0)
                } else {
                    ctl.DCExecuteCommand(opts.name, true);
                }
            }
        }
    },

    /**
    * 创建查找&替换设置对话框
    * @param options 查找替换属性
    * @param ctl 编辑器元素
    */
    SearchAndReplaceDialog: function (options, ctl) {
        // var options = {
        //     "searchstring": "",//要查找的字符串
        //     "enablereplacestring": "true",//是否启用替换
        //     "replacestring": "李四",//要替换的字符串
        //     "backward": "true",//是否向后替换
        //     "ignorecase": "true",//是否区分大小写
        //     "logundo": "true",//记录撤销操作信息
        //     "excludebackgroundtext": "true",//忽略掉背景文字
        //     "SearchID": "false"//是否限制为查询元素编号
        // }
        // console.log(options);
        var SearchAndReplaceHtml = `
            <style>
            #dialogContainer #dcPanelFooter .foot_btn {
                height: 28px;
                width: 70px;
                border: 1px solid #bbb;
            }
            </style>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">查找内容：</span>
                    <input type="text" id="searchstring" class="searchstring full" data-text="searchstring">
                </label>
            </div>
            <div class="dcBody-content">
                <label class="flex">
                    <span class="dcTitle-text">
                    <label>
                        <input type="checkbox" id="enablereplacestring" data-text="enablereplacestring" >
                        <span>替换为：</span>
                    </label>
                    </span>
                    <input type="text" class="replacestring full" id="replacestring" data-text="replacestring" disabled>
                </label>
            </div>
            <div class="dcBody-contents">
                <form class="Box">
                    <h6 class="title">方向</h6>
                    <div class="dcBody-content">
                        <label >
                            <input type="radio" id="upward" name="radios">
                            <span>向上</span>
                        </label>
                        <label>
                            <input type="radio" id="backward" name="radios" checked>
                            <span>向下</span>
                        </label>
                    </div>
                </form>
                <div class="checkboxs">
                    <label>
                        <input type="checkbox" id="ignorecase" data-text="ignorecase" >
                        <span>不区分大小写</span>
                    </label>
                    <br>
                    <label>
                        <input type="checkbox" id="excludebackgroundtext" data-text="excludebackgroundtext" checked >
                        <span>忽略输入背景文字</span>
                    </label>
                    <br>
                    <label>
                        <input type="checkbox" id="SearchID" data-text="SearchID" >
                        <span>限制为查找文档元素编号</span>
                    </label>
                    <br>
                    <label>
                        <input type="checkbox" id="logundo" data-text="logundo" >
                        <span>记录撤销操作信息</span>
                    </label>
                </div>
            </div>
         
        `;
        var dialogOptions = {
            title: "查找和替换",
            bodyHeight: 196,
            bodyClass: "SearchAndReplace",
            bodyHtml: SearchAndReplaceHtml
        };
        this.pageAppendDialog(ctl, function () { }, dialogOptions);
        //获取对话框元素
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = dialogContainer.find('#dcPanelBody');
        var dcPanelFooter = dialogContainer.find('#dcPanelFooter');
        //重新设置按钮
        dcPanelFooter.html(` 
            <button id="search" class="foot_btn" disabled>查找(s)</button>
            <button id="replace" class="foot_btn" disabled>替换(r)</button>
            <button id="ReplaceAll" class="foot_btn" disabled>全部替换</button>
            <button id="cancel" class="foot_btn">取消(c)</button>
        `);
        var searchInput = dcPanelBody.find("#searchstring");//查找内容输入框
        var replaceCheckbox = dcPanelBody.find("#enablereplacestring");//替换复选框
        var replaceInput = dcPanelBody.find("#replacestring");//替换内容输入框
        var SearchIDBtn = dcPanelBody.find("#SearchID");//限制为查找文档元素编号复选框
        var btns = dcPanelFooter.find("button.foot_btn:not(#cancel)");//查找、替换、全部替换按钮
        // 查找内容输入框输入事件
        searchInput.on("input", function () {
            // 选择查找编号
            if (SearchIDBtn.is(":checked")) {
                // 所有不启用
                btns.prop('disabled', true);
                // 查找按钮需要用查找内容输入框是否为空来判断
                btns.filter("#search").prop('disabled', jQuery(this).val() == "");
                return;
            }
            var isChecked = replaceCheckbox.is(":checked");// 替换复选框是否选择
            if (jQuery(this).val() != "") {
                // 查找内容输入框不为空
                // 替换是否启用来确定按钮是否启用
                btns.prop('disabled', !isChecked);
                btns.filter("#search").prop('disabled', false);//查找按钮一定启用
            } else {
                // 为空
                btns.prop('disabled', true);
            }
        });
        // 替换复选框切换事件
        replaceCheckbox.change(function () {
            var isChecked = jQuery(this).is(":checked");// 替换复选框是否选择
            // 选择查找编号
            if (SearchIDBtn.is(":checked")) {
                return;
            }
            // 设置替换内容输入框是否可用
            replaceInput.prop("disabled", !isChecked);
            // 查找内容输入框不为空
            if (searchInput.val() != "") {
                // 查找内容输入框为空
                btns.filter("#replace,#ReplaceAll").prop("disabled", !isChecked);
            }
        });
        // 限制为查找文档元素编号复选框切换事件
        SearchIDBtn.change(function () {
            var isSearchID = SearchIDBtn.is(":checked");
            dcPanelBody.find("#upward,#backward,#ignorecase,#excludebackgroundtext,#logundo").prop("disabled", isSearchID);
            if (replaceCheckbox.is(":checked")) {
                replaceInput.prop("disabled", isSearchID);
                if (searchInput.val() != "") {
                    btns.filter("#replace,#ReplaceAll").prop("disabled", isSearchID);
                }
            }
        });
        // 按钮点击事件
        dcPanelFooter.find("button.foot_btn").click(function () {
            var _data = GetOrChangeData(dcPanelBody);
            // console.log("successFun -> _data", _data)
            switch (this.id) {
                case "search":
                    // 查找
                    ctl.Search(_data);
                    break;
                case "replace":
                    // 替换
                    ctl.Reaplace(_data);
                    break;
                case "ReplaceAll":
                    // 全部替换
                    ctl.ReplaceAll(_data);
                    break;
                case "cancel":
                    // 取消
                    jQuery(ctl).children("#dialogMark,#dialogContainer").remove();
                    break;
                default:
                    break;
            }
        });
    },

    /**
    * 创建表格属性对话框【没有测试，不要使用】
    * @param options 表格属性
    * @param ctl 编辑器元素
    */
    TableAttributesDialog: function (options, ctl) {
        var TableHtml = `
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">名称：</span>
                <input type="text" class="full" name="" data-text="id">
            </label>
        </div>
 
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">内容只读保护：</span>
                <select id="" class="full" data-text="contentreadonly">
                    <option value="none">继承上级设置</option>
                    <option value="true">只读</option>
                    <option value="false">不只读</option>
                </select>
            </label>
        </div>
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">启用授权控制：</span>
                <select id="" class="full" data-text="enablepermission">
                    <option value="none">继承上级设置</option>
                    <option value="true">是</option>
                    <option value="false">否</option>
                </select>
            </label>
        </div>
 
        <div class="dcBody-content">
            <label class="flex">
                <span class="dcTitle-text">表格宽度：</span>
                <input type="text" class="full" name="" data-text="width">
            </label>
        </div>
        <div class="dcBody-content">
            <div>
                <label>
                    <input type="checkbox"  data-text="allowusertoresizerows">
                    <span>用户可调整行高</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox" data-text="allowusertoresizecolumns">
                    <span> 用户可调整列宽</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox"  data-text="allowuserinsertrow">
                    <span>用户可新增表格行</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox"  data-text="allowuserdeleterow">
                    <span> 用户可删除表格行</span>
                </label>
            </div>
            <div style="margin-top:10px;">
                <label>
                    <input type="checkbox"  data-text="deleteable">
                    <span>用户可删除表格</span>
                </label>
            </div> 
              `;
        var dialogOptions = {
            title: "表格属性对话框",
            bodyHeight: 475,
            bodyClass: "TableElement",
            bodyHtml: TableHtml
        }
        this.pageAppendDialog(ctl, successFun, dialogOptions);
        //获取对话框元素
        var options = {
            id: '111', //编号 id
            attributes: { 11: 11, 22: 22, 33: 33 }, //自定义属性 
            allowusertoresizerows: 'false', //用户可调整行高
            allowusertoresizecolumns: 'false', // 用户可调整列宽 
            allowuserinsertrow: 'false', //用户可新增表格行 
            allowuserdeleterow: 'false', //用户可删除表格行 
            deleteable: 'false',//用户可删除表格 
            contentreadonly: 'true', //内容只读保护 
            enablepermission: 'true', //启用授权控制 
            width: "100"//表格行宽度 
        }
        let that = this
        const arr = Object.entries(options.attributes);
        var dialogContainer = jQuery(ctl).children('#dialogContainer');
        var dcPanelBody = jQuery(dialogContainer).find('#dcPanelBody');
        WriterControl_Dialog.appendValueBindingDiv(dcPanelBody);
        var Box2 = dcPanelBody.find(".dcBody-contentflex").find("#Box2")[0]
        var tbody = dcPanelBody.find("#ListItems").find("tbody")[0]
        if (arr != "") {
            tbody.innerHTML = ""
            for (let i = 0; i < arr.length; i++) {
                var TRHtml = `<tr><td><input  data-arraytext="ID" type="text" value ="${arr[i][0]}"></td><td><input data-arraytext="Text" type="text" value ="${arr[i][1]}"></td><td class="delete" title = "删除">×</td ></tr>`;
                tbody.innerHTML += TRHtml
            }
        }
        // 设置禁用
        dialogContainer.find('#Visible').change(function () {
            that.changeFormDisable(Box2, !this.checked)
        })
        // 增加接口
        dcPanelBody.find("#ListItems").on("input", "input[data-arraytext]", function () {
            var input = jQuery(this);
            var tr = input.parents("tr");
            if (tr.nextAll("tr").length == 0) {
                var ListItems_item = input.parents("table").find("template.template_item")[0];
                tr.after(ListItems_item.content.cloneNode(true));
            }
        });
        dcPanelBody.find("#ListItems").on("click", "td.delete", function () {
            var tr = jQuery(this).parents("tr");
            if (tr.nextAll("tr").length > 0) {
                tr.remove();
            }
        });
        var opts = {};
        dcPanelBody.find("[data-text]").each(function () {
            var _el = jQuery(this);
            var _txt = _el.attr("data-text");
            var low_txt = _txt.toLowerCase();
            var _value = getDown(options, low_txt);
            if (_value == undefined) {
                _value = "";
            }
            getDown(opts, _txt, _value);
        });
        GetOrChangeData(dcPanelBody, opts);
        function successFun() {
            var _data = GetOrChangeData(dcPanelBody);
            console.log("successFun -> _data", _data)
        }
    },

    //自定义属性公共组件
    attributeComponents: function (parentId = '', attributes = {}) {
        let dataList = []
        // 对象转换为数组
        if (attributes && Object.keys(attributes) && Object.keys(attributes).length) {
            let keys = Object.keys(attributes)
            keys.map(item => {
                dataList.push({
                    key: item,
                    val: attributes[item]
                })
            })
        }
        let attrHtml = `
        <div id="${parentId}" class="formBOX" style="width: 100%;">       
          <p style="text-align:right;"> 
            <span id="addButton" style=" margin-right:4px;cursor: pointer;color:#15428b">添加</span>
            <span id="deletButton" style="cursor: pointer;color:#15428b">清空</span>
          </p>  
        <div style="">
            <table id="attr-table-box" class="currentTableDom" style="width: 100%;" border="1">
                <tr>
                    <th style="border-width: 1px;" class="ons-2">名称</th>
                    <th style="border-width: 1px;" class="ons-3">值</th>
                    <th style="border-width: 1px;" class="ons-4">操作</th>
                </tr>
                <tr class="tr_abs" >
                    <td class="ons-2 input-dom"><input class="ons-2" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" ></input></td>
                    <td class="ons-3 input-dom"><input class="ons-3" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" ></input></td>
                    <td class="ons-4 delete-button"  style="cursor: pointer;">删除</td>
                </tr>
            </table>
        </div>
        </div>`
        jQuery('#attr-box').html(attrHtml).css('background', '#FAFAFA');

        if (dataList && dataList.length) {
            var CDC = $(".tr_abs")[0]
            for (var i = 0; i < dataList.length; i++) {
                var tr = document.createElement("tr")
                tr.className = "tr_abs"
                tr.innerHTML = `
                    <td class="ons-2"><input class="ons-2 input-dom" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" value="${dataList[i].key}"></input></td>
                    <td class="ons-3"><input class="ons-3 input-dom" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" value="${dataList[i].val}"></input></td>
                    <td class="ons-4 delete-button"  style="cursor: pointer;">删除</td>`
                CDC.before(tr)
            }
        }
        jQuery('#deletButton').click(function () {
            var CDC = $(".tr_abs")
            for (let i = 0; i < CDC.length; i++) {
                CDC[i].remove()
            }
            $("#attr-table-box").append(tr_template())
        })
        jQuery('#addButton').click(function () {
            let trArr = jQuery('.tr_abs')
            let last = trArr[trArr.length - 1]
            last.after(tr_template());
        })
        jQuery('#attr-table-box').on("input", "input", function () {
            var input = jQuery(this);
            var tr = input.parents("tr");
            if (tr.nextAll("tr").length == 0) {
                tr.after(tr_template());
            }
        });
        jQuery('#attr-table-box').on('click', 'td', function () {
            let trArr = jQuery('.tr_abs')
            if (this.className.includes('delete-button')) {
                if (trArr.length <= 1) {
                    return alert("请最少保留一行单元格")
                }
                this.parentNode.remove()
            }
        })
        //定义表格行公用模板
        var tr_template = function () {
            let templateHtml = `
            <td class="ons-2"><input class="ons-2 input-dom" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" value=""></input></td>
            <td class="ons-3"><input class="ons-3 input-dom" style="width:100%;height:100%;border:none" type="text" data-arraytext="Text" value=""></input></td>
            <td class="ons-4 delete-button"  style="cursor: pointer;">删除</td>`
            var newtr = document.createElement("tr")
            newtr.className = "tr_abs"
            newtr.innerHTML = templateHtml
            return newtr
        }
    },

    //获取自定义属性
    attributeComponents_getAttributeObj: function (parentId = '') {
        let tableBox = jQuery(parentId).find('table')[0];
        let trList = jQuery(tableBox).find('.tr_abs')
        let attributes = {}
        for (var i = 0; i < trList.length; i++) {
            let key = trList[i].children[0].children[0].value
            let val = trList[i].children[1].children[0].value
            if (key !== '' || val !== '') {
                attributes = {
                    ...attributes,
                    [key]: val
                }
            }
        }
        return attributes
    },

    /**
    * 取消浏览器默认事件
    * @param eventObject 事件Event
    */
    completeEvent: function (eventObject) {
        if (eventObject == null) {
            if (window.event) {
                eventObject = window.event;
            }
        }
        if (eventObject != null) {
            eventObject.cancelBubble = true;
            if (eventObject.stopPropagation) {
                eventObject.stopPropagation();
            }
            if (eventObject.stopImmediatePropagation) {
                eventObject.stopImmediatePropagation();
            }
            if (eventObject.preventDefault) {
                eventObject.preventDefault();
            }
            eventObject.returnValue = false;
        }
    },

    /**
    * 创建的对话框方法
    * @param ctl 编辑器元素
    * @param successFun 确定按钮触发事件
    * @param options 对话框一些设置
    */
    pageAppendDialog: function (ctl, successFun, options) {
        //创建包裹html
        var containerInnerHtml = `<div id="dialogMark"></div><div id="dialogContainer">
        <div id="dcPanelHeader">
            <div class="dcHeader-title"></div>
            <div class="dcHeader-tool">
                <b class="dcTool-close">✖</b>
            </div>
        </div>
        <div id="dcPanelBody">
            
        </div>
        <div id="dcPanelFooter">
                <span class="dcButton-left dclinkbutton"  id="submitValue">
                    <span class="dcButton-text">确认</span>
                </span>
            <span class="gap-width"></span>
                <span class="dcButton-left dclinkbutton" id="removeDialog">
                    <span class="dcButton-text">取消</span>
                </span>
        </div>
    </div>`;
        //创建css样式
        var docHead = document.head;
        var dialogLink = docHead.querySelector("style#dialogStyle");
        if (!dialogLink) {
            // 防止多次插入样式元素
            dialogLink = document.createElement("style");
            dialogLink.setAttribute("id", "dialogStyle");
            dialogLink.innerHTML = DIALOGSTYLE;
            docHead.appendChild(dialogLink);
        }
        //确保页面中只有一个对话框元素
        jQuery(ctl).children("#dialogMark").remove();
        jQuery(ctl).children("#dialogContainer").remove();
        //页面中插入对话框
        jQuery(ctl).append(containerInnerHtml);
        // 弹出对话框的同时取消光标和下拉
        var dropdown = ctl.querySelector('#divDropdownContainer20230111');
        var caret = ctl.querySelector('#divCaret20221213')
        if (dropdown != null) {
            dropdown.CloseDropdown();
        }
        if (caret != null) {
            caret.style.display = 'none';
            clearInterval(caret.handleTimer);
        }
        var dialogMark = jQuery(ctl).children("#dialogMark");//蒙版元素
        var dialogContainer = jQuery(ctl).children("#dialogContainer");//对话框元素
        var dcPanelBody = dialogContainer.find('#dcPanelBody');//对话框正文元素
        // 对话框属性设置
        if (options && typeof (options) == "object") {
            // 修改标题数据
            if (options.title) {
                dialogContainer.find('.dcHeader-title').html(options.title);
            }
            // 修改对话框正文元素高度
            if (options.bodyHeight) {
                dcPanelBody.height(options.bodyHeight);
            }
            // 修改对话框元素宽度
            if (options.dialogContainerBodyWidth) {
                dialogContainer.width(options.dialogContainerBodyWidth);
            }
            // 对话框正文元素添加class名称
            if (options.bodyClass) {
                dcPanelBody.addClass(options.bodyClass);
            }
            // 给对话框正文元素赋值
            if (options.bodyHtml) {
                dcPanelBody.html(options.bodyHtml);
            }
        }
        //遮罩层取消掉鼠标事件和键盘事件
        dialogMark.on("mousedown click keydown", function (e) {
            // this.completeEvent(e);
        })
        dialogContainer.on("mousedown click keydown", function (e) {
            e.stopPropagation();
        })
        // 暂时处理在对话框中输入框中会取消光标
        dialogContainer.on("focus", "input", function () {
            var caret = ctl.querySelector('#divCaret20221213')
            if (caret != null) {
                caret.style.display = 'none';
                clearInterval(caret.handleTimer);
            }
        });
        //点击x图标的事件
        var closeIcon = dialogContainer.find(".dcTool-close");
        closeIcon.on("click", function () {
            dialogMark.remove();
            dialogContainer.remove();
        })
        //点击确认的事件
        var submitValue = dialogContainer.find("#submitValue");
        submitValue.on("click", function () {
            !!successFun && typeof (successFun) == "function" && successFun();
            dialogMark.remove();
            dialogContainer.remove();
        })
        //点击取消的事件
        var removeDialog = dialogContainer.find("#removeDialog");
        removeDialog.on("click", function () {
            dialogMark.remove();
            dialogContainer.remove();
        })
    },

    /**
    * 设置form表单元素是否可用
    * @param formNode 表单元素
    * @param isDisable 是否可以使用，true表示不可用
    */
    changeFormDisable: function (formNode, isDisable) {
        if (!formNode || formNode.nodeName != "FORM") {
            return;
        }
        var els = formNode.elements;
        if (els && els.length > 0) {
            for (var i = 0; i < els.length; i++) {
                els[i].disabled = isDisable ? true : false;
            }
        }
    }
};

/**
* 将对象的所有键转换为小写
* @param obj 需要处理的对象
* @return obj 处理完成的对象
*/
var keysToLowerCase = function (obj) {
    var keys = Object.keys(obj);
    var n = keys.length;
    while (n--) {
        var key = keys[n]; // "cache" it, for less lookups to the array
        if (key !== key.toLowerCase()) { // might already be in its lower case version
            obj[key.toLowerCase()] = obj[key] // swap the value to a new lower case key
            delete obj[key] // delete the old key
        }
    }
    return (obj);
}

/**
* 获取或者添加最下面的数据
* @param data 需要处理的对象
* @param txt 键值对中的键，可以是"b.c",获取的是 data["b"]["c"]
* @param value 键值对中的值，可以是"b.c",获取的是 data["b"]["c"]
*/
var getDown = function getDown(data, txt, value) {
    if (!data || typeof (data) != "object") {
        return;
    }
    if (value == undefined) {
        data = keysToLowerCase(JSON.parse(JSON.stringify(data)));
        txt = txt.toLowerCase();
    }
    var _index = txt.indexOf(".");
    if (_index > -1) {
        var objArr = [txt.slice(0, _index), txt.slice(_index + 1, txt.length)];
        if (!data[objArr[0]] && value != undefined) {
            data[objArr[0]] = {};
        }
        return getDown(data[objArr[0]], objArr[1], value);
    } else {
        if (value == undefined) {
            return data[txt];
        } else {
            data[txt] = value;
        }

    }
}

/**
* 获取或者修改数据
* @param dcPanelBody 获取元素的父元素JQUEY对象
* @param data 需要修改的数据
* @return obj 处理完成的对象
*/
var GetOrChangeData = function (dcPanelBody, data, specialTreatmentFunc) {
    if (!dcPanelBody) {
        return;
    }
    var isChange = typeof (data) == "object";
    var obj = {};
    dcPanelBody.find("[data-text]").each(function () {
        var _el = jQuery(this);
        var _txt = _el.attr("data-text");
        if (!!specialTreatmentFunc && typeof (specialTreatmentFunc) == "function") {
            if (specialTreatmentFunc.call(this, _txt, isChange) == false) {
                return true;
            }
        }
        if (this.type == "checkbox") {
            getDown(obj, _txt, _el.is(":checked"));
            if (isChange) {
                var isChecked = getDown(data, _txt);
                if (typeof (isChecked) == "boolean") {
                    _el.prop("checked", isChecked);
                    if (!!_el.change && typeof (_el.change) == "function") {
                        _el.change();
                    }
                }
            }
        } else if (this.type == "radio") {
            if (_el.is(":checked")) {
                getDown(obj, _txt, _el.val());
            }
            if (isChange && _el.val() == getDown(data, _txt)) {
                _el.prop("checked", true);
                if (!!_el.change && typeof (_el.change) == "function") {
                    _el.change();
                }
            }
        } else {
            // 获取或者接受的数据类型
            switch (_el.attr("data-type")) {
                case "Object":
                    //{}
                    break;
                case "Array":
                    //[{}]
                    var tbody = _el.find("tbody");
                    var trs = tbody.find("tr");
                    if (isChange) {
                        var item = _el.find("template.template_item")[0].content;
                        var item_contents = getDown(data, _txt);
                        if (Object.prototype.toString.call(item_contents) === '[object Array]') {
                            // 数据是数组
                            trs.remove();
                            for (var i = 0; i < item_contents.length; i++) {
                                var item_obj = item_contents[i];
                                var clone_item = item.cloneNode(true);
                                var inputs = clone_item.querySelectorAll("[data-arraytext]");
                                for (var j = 0; j < inputs.length; j++) {
                                    var input = inputs[j]
                                    var _arraytext = input.getAttribute("data-arraytext");
                                    input.value = item_obj[_arraytext];
                                }
                                tbody.append(clone_item);
                            }
                            tbody.append(item.cloneNode(true));
                        }
                    } else {
                        var item_arr = [];
                        trs.each(function () {
                            var item_obj = {};
                            var isPush = false;//是否存储
                            jQuery(this).find("[data-arraytext]").each(function () {
                                var _arraytext = jQuery(this).attr("data-arraytext");
                                var _arrayvalue = jQuery(this).val();
                                if (_arrayvalue) {
                                    // 当存在一个数据时就存储
                                    isPush = true;
                                }
                                item_obj[_arraytext] = _arrayvalue;
                            });
                            if (isPush) {
                                item_arr.push(item_obj);
                            }

                        });
                        getDown(obj, _txt, item_arr);
                    }
                    break;
                default:
                    var _value = _el.val();
                    if (this.type == "number") {
                        _value -= 0;
                    }
                    getDown(obj, _txt, _value);
                    if (isChange) {
                        var _value = getDown(data, _txt);
                        if (this.type == "number") {
                            _value = parseFloat(_value);
                        }
                        if (this.nodeName == "SELECT" && _value == "") {
                            // 是下拉，并且值为空
                            return true;
                        }
                        if (_value && typeof (_value) == "object") {
                            _el.val(JSON.stringify(_value));
                        } else {
                            _el.val(_value);
                        }
                    }
                    break;
            }
        }
    })
    if (isChange) {
        return true;
    } else {
        return obj;
    }
}
