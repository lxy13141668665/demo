//*************************************************************************
//* 项目名称：
//* 当前版本: V 5.3.1
//* 开始时间: 20230728
//* 开发者:李新宇
//* 重要描述:用于派发病程事件
//*************************************************************************
//* 最后更新时间:2023-7-28
//* 最后更新人:李新宇
//*************************************************************************
// (function () {

// })()
class ColorPicker {
    constructor(options) {
        this.color = null
    }
    LoadColorHtml(parentID) {
        let colorHtml = `
       <div class="color_container">
            <div class="main_wrap"> <!--拾色区域-->
            <div class="main_drag" id="mainDrag"></div>
            <div class="main_con" id="mainCon">
                <div class="left_white_bg bg"></div>
                <div class="bottom_black_bg bg"></div>
            </div>
            </div>
            <div class="side_wrap"> <!--色系区域-->
            <div class="side_drag" id="sideDrag"></div>
            <div class="side_con" id="sideCon"></div>
            </div>
            <div class="show_color" id="findColor"><!--显示区域-->
            <div class="color_full" id="colorFull"></div>
            <div class="color_text" id="colorText">
                R:<input type="text" readonly>
                G:<input type="text" readonly>
                B:<input type="text" readonly>
            </div>
            </div>
        </div>

        `
        document.getElementById(parentID).innerHTML = colorHtml
    }
    fnColorPicker(background) {
        //色系存储数据
        var aColorSeries = {
            r: [255], g: [0], b: [0]
        }
        // if (background && background !== '') {
        //     const [r, g, b] = background.match(/\d+/g).map(Number);
        //     aColorSeries = { r: [r], g: [g], b: [b] }
        //     fnColorFull(`[${r},${g},${b}]`);
        // }
        // console.log(aColorSeries, '==========background')


        //色系数据变化
        var aColorVary = ['g', 'r', 'b', 'g', 'r', 'b'];
        //色系元素
        var eSeries = document.getElementById('sideCon');
        //每个色系颜色变化次数
        var nSeriesLen = Math.floor(eSeries.offsetHeight / 6);
        //每次变化步长值
        var nStep = Math.floor(255 / nSeriesLen);
        //步长值剩余值
        var nStepRemainder = 255 / nSeriesLen - nStep;
        //循环存储色系rgb颜色值
        for (let i = 0; i < aColorVary.length; i++) {
            let add = (i % 2);  //因为高度不能整除，需要使最终色系填满元素
            let nFull = 0; //计算剩余的步长值
            for (let j = 0; j < nSeriesLen + add; j++) {
                nFull += nStepRemainder;
                let nAddStep = nStep;
                if (nFull > 1) {  //剩余步长值超过1时，每次增加步长值加1
                    nAddStep = nStep + 1;
                    nFull = nFull - 1;
                }
                //遍历色系数据对象添加颜色值
                for (let k in aColorSeries) {
                    let nVal = 0;
                    let nOldVal = aColorSeries[k][aColorSeries[k].length - 1];
                    if (k == aColorVary[i]) {
                        if (add == 0) { //判断颜色值改变方向是变大还是变小
                            nVal = nOldVal + nAddStep;
                        } else {
                            nVal = nOldVal - nAddStep;
                        }
                        if (nVal > 255) {  //限制最大值255
                            nVal = 255;
                        } else if (nVal < 0) {  //限制最小值为0
                            nVal = 0;
                        }
                    } else {
                        nVal = nOldVal;
                    }
                    aColorSeries[k].push(nVal);
                }
            }
        }

        //拾色区域颜色
        var aColorMainStore = [];
        //获取拾色区域
        var eMainCon = document.getElementById('mainCon');
        //获取拾色区域的宽度和高度
        var nMainW = eMainCon.offsetWidth;
        var nMainH = eMainCon.offsetHeight;

        function fnColorSet(color) {
            //重置拾色区域颜色数据
            aColorMainStore = [];

            //左侧可变颜色，默认为白色
            var oLeftColor = { r: 255, g: 255, b: 255 };
            //右侧可变颜色，因为color参数是字符串,所以要转换为数组
            var oRightColor = JSON.parse(JSON.stringify(color));
            //底部颜色固定黑色
            var oBottomColor = { r: 0, g: 0, b: 0 };
            //因为色块可变颜色从左上角开始，所以默认设置为白色
            var oMainColor = { r: 255, g: 255, b: 255 };
            //Y轴步长值
            var oYStep = {
                lStep: Math.floor(256 / nMainH),  //左侧从上至下是从白色渐变到黑色，所以固定步长值计算
                lRemainder: 256 / nMainH - Math.floor(256 / nMainH),  //左侧步长剩余值
                lAdd: 0, //渐变过程添加值
            }
            //枚举添加右侧从下至下渐变步长值、剩余值及添加值
            for (let k in oRightColor) {
                oYStep[k + 'Step'] = Math.floor((oRightColor[k] - oBottomColor[k] + 1) / nMainH);
                oYStep[k + 'Remainder'] = (oRightColor[k] - oBottomColor[k] + 1) / nMainH - Math.floor((oRightColor[k] - oBottomColor[k] + 1) / nMainH);
                oYStep[k + 'Add'] = 0;
            }

            //循环每一行色块
            for (let i = 0; i < nMainH; i++) {
                //因为每一列的颜色都是往下加深渐变，所以除第一行之外每行循环都需要修改左侧和右侧颜色
                if (i > 0) {
                    oYStep.lAdd += oYStep.lRemainder;
                    for (let k in oLeftColor) {
                        //修改左侧颜色
                        if (oYStep.lAdd > 1) {
                            oLeftColor[k] = oLeftColor[k] - (oYStep.lStep + 1);
                        } else {
                            oLeftColor[k] = oLeftColor[k] - oYStep.lStep;
                        }
                        //修改右侧颜色
                        oYStep[k + 'Add'] += oYStep[k + 'Remainder'];
                        if (oYStep[k + 'Add'] > 1) {
                            oRightColor[k] = oRightColor[k] - (oYStep[k + 'Step'] + 1);
                            //修改添加值
                            oYStep[k + 'Add'] = oYStep[k + 'Add'] - 1;
                        } else {
                            oRightColor[k] = oRightColor[k] - oYStep[k + 'Step'];
                        }
                    }
                    //修改添加值
                    if (oYStep.lAdd > 1) {
                        oYStep.lAdd = oYStep.lAdd - 1;
                    }
                }

                //每一行的色块颜色单独存到一个新的数组中
                aColorMainStore.push([]);
                //每一次循环色块都要重置为左侧颜色
                oMainColor = JSON.parse(JSON.stringify(oLeftColor));

                //x轴步长值
                let oXStep = {}
                for (let k in oLeftColor) {
                    oXStep[k + 'Step'] = Math.floor((oLeftColor[k] - oRightColor[k]) / nMainW);
                    oXStep[k + 'Remainder'] = (oLeftColor[k] - oRightColor[k]) / nMainW - Math.floor((oLeftColor[k] - oRightColor[k]) / nMainW);
                    oXStep[k + 'Add'] = 0;
                }

                //在每一行中循环每一列色块
                for (let j = 0; j < nMainW; j++) {
                    if (j != 0 && j != nMainW - 1) { //第一个色块颜色和最后一个颜色不需要修改
                        //从左至右渐变颜色
                        for (let k in oMainColor) {
                            //逐步修改颜色
                            oXStep[k + 'Add'] += oXStep[k + 'Remainder'];
                            if (oXStep[k + 'Add'] > 1) {
                                oMainColor[k] = oMainColor[k] - (oXStep[k + 'Step'] + 1);
                                oXStep[k + 'Add'] = oXStep[k + 'Add'] - 1;
                            } else {
                                oMainColor[k] = oMainColor[k] - oXStep[k + 'Step'];
                            }
                        }
                    }
                    if (j == nMainW - 1) {
                        //最后的颜色设置为右侧颜色值
                        oMainColor = JSON.parse(JSON.stringify(oRightColor));
                    }

                    //存储色块颜色
                    aColorMainStore[i].push(JSON.stringify(oMainColor));
                }
            }
        }

        //默认颜色为红色背景
        fnColorSet({ r: 255, g: 0, b: 0 });

        //获取显示颜色块
        var eColorFull = document.getElementById('colorFull');
        var eColorText = document.getElementById('colorText');
        var aColorInput = eColorText.getElementsByTagName('input');
        function fnColorFull(color) {
            //颜色参数是字符串，需要转换为数组
            var color = JSON.parse(color);
            // 修改显示颜色
            eColorFull.style.background = 'rgb(' + color.join(',') + ')';
            //修改RGB颜色值
            for (let i = 0; i < aColorInput.length; i++) {
                aColorInput[i].value = color[i];
            }
        }
        //默认显示白色
        fnColorFull('[233,27,27]')

        //获取色系吸管
        var eSideDrag = document.getElementById('sideDrag');
        //获取吸管高度
        var nSideDragH = eSideDrag.offsetHeight;
        //获取吸管限制高度
        var nSideH = eSeries.offsetHeight - nSideDragH / 2;
        //在色系吸管上绑定鼠标按下事件
        eSideDrag.addEventListener('mousedown', function (event) {
            //初始化鼠标开始拖拽的点击位置
            var nInitY = event.clientY;
            //初始化色系吸管位置
            var nInitTop = this.offsetTop;
            //色系吸管位置
            var nY = null;
            //色系选择颜色
            document.onmousemove = event => {
                //鼠标移动时取消默认行为，避免选中其他元素或文字
                event.preventDefault();
                //根据鼠标设置色系吸管位置
                nY = event.clientY - nInitY + nInitTop;
                //下面的条件限制色系吸管不能超出范围
                if (nY >= nSideH - 1) {
                    nY = nSideH - 1;
                }
                if (nY <= -nSideDragH / 2) {
                    nY = -nSideDragH / 2;
                }
                //因为用的是箭头函数，所以this还是指向滑块，修改滑块位置
                this.style.top = nY + 'px';

                //修改拾色区背景颜色
                let n = nY + nSideDragH / 2;
                this.color = { r: aColorSeries.r[n], g: aColorSeries.g[n], b: aColorSeries.b[n] };
                eMainCon.style.background = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
            }
            //鼠标释放事件
            document.onmouseup = event => {
                document.onmouseup = null;
                document.onmousemove = null;

                //设置拾色区颜色
                this.color && fnColorSet(this.color);
                //获取当前位置颜色
                let oColor = JSON.parse(aColorMainStore[nSY][nSX]);
                //填充显示颜色区域
                fnColorFull(JSON.stringify([oColor.r, oColor.g, oColor.b]));
            }
        });
        //色系元素绑定点击事件
        eSeries.addEventListener('click', function (event) {
            //获取点击位置
            let nY = event.offsetY - nSideDragH / 2;
            //增加过渡样式，使吸管有滑动效果
            eSideDrag.style.transition = '.1s';
            //删除过渡样式
            setTimeout(e => {
                eSideDrag.style.transition = 'inherit';
                //设置拾色区颜色
                this.color && fnColorSet(this.color);
                //获取当前位置颜色
                let oColor = JSON.parse(aColorMainStore[nSY][nSX]);
                //填充显示颜色区域
                fnColorFull(JSON.stringify([oColor.r, oColor.g, oColor.b]));
            }, 100)
            //改变色系吸管位置 
            eSideDrag.style.top = nY + 'px';

            //修改拾色区背景颜色
            let n = nY + nSideDragH / 2;
            this.color = { r: aColorSeries.r[n], g: aColorSeries.g[n], b: aColorSeries.b[n] };
            eMainCon.style.background = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        });

        //获取吸管元素
        var eMainDrag = document.getElementById('mainDrag');
        //aMainColorStore数组中颜色行下标
        var nSX = 0;
        //aMainColorStore数组中颜色列下标
        var nSY = 0;
        //获取吸管高度
        var nMainDragH = eMainDrag.offsetHeight;
        //获取吸管限制宽度
        var nMainLimitW = nMainW - nMainDragH / 2;
        //获取吸管限制高度
        var nMainLimitH = nMainH - nMainDragH / 2;
        eMainDrag.addEventListener('mousedown', function (event) {
            //初始化鼠标开始拖拽的点击位置
            var nInitX = event.clientX;
            var nInitY = event.clientY;
            //初始化吸管位置
            var nInitTop = this.offsetTop;
            var nInitLeft = this.offsetLeft;
            //选中吸管后，在document上绑定鼠标移动事件
            document.onmousemove = event => {
                //鼠标移动时取消默认行为，避免选中其他元素或文字
                event.preventDefault();
                //获取鼠标位置
                let nX = event.clientX - nInitX + nInitLeft;
                let nY = event.clientY - nInitY + nInitTop;
                //以下的条件用于限制吸管不能移出拾色区域
                if (nY >= nMainLimitH - 1) {
                    nY = nMainLimitH - 1;
                }
                if (nY <= -nMainDragH / 2) {
                    nY = -nMainDragH / 2;
                }
                if (nX <= -nMainDragH / 2) {
                    nX = -nMainDragH / 2;
                }
                if (nX >= nMainLimitW - 1) {
                    nX = nMainLimitW - 1;
                }
                //因为用的是箭头函数，所以this还是指向吸管，修改吸管位置
                this.style.top = nY + 'px';
                this.style.left = nX + 'px';
                //颜色赋值,因为没办法选到最后一个颜色，所以加这个公式，这样中间有些颜色选不到
                nSX = nX + nMainDragH / 2;
                nSY = nY + nMainDragH / 2;
                //获取当前位置颜色
                let oColor = JSON.parse(aColorMainStore[nSY][nSX]);
                //填充显示颜色区域
                fnColorFull(JSON.stringify([oColor.r, oColor.g, oColor.b]));
            }
            //松开鼠标后释放document上的事件
            document.onmouseup = event => {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        });
        //拾色区域绑定点击事件
        eMainCon.addEventListener('click', function (event) {
            //获取点击位置
            let nX = event.offsetX - nMainDragH / 2
            let nY = event.offsetY - nMainDragH / 2;
            //增加过渡样式，使吸管有滑动效果
            eMainDrag.style.transition = '.1s';
            //删除过渡样式
            setTimeout(e => {
                eMainDrag.style.transition = 'inherit';
            }, 100)
            //改变拾色吸管位置 
            eMainDrag.style.top = nY + 'px';
            eMainDrag.style.left = nX + 'px';
            //颜色赋值,因为没办法选到最后一个颜色，所以加这个公式，这样中间有些颜色选不到
            nSX = nX + nMainDragH / 2;
            nSY = nY + nMainDragH / 2;
            //获取当前位置颜色
            let oColor = JSON.parse(aColorMainStore[nSY][nSX]);
            //填充显示颜色区域
            fnColorFull(JSON.stringify([oColor.r, oColor.g, oColor.b]));
        });
    }
    getcolor() {
        let background = document.getElementById('colorFull').style.background
        console.log(background, '============background')
        return this.colorRgbToHex(background)
    }
    /*RGB转换为16进制*/
    colorRgbToHex(rgbStr) {
        //十六进制颜色值的正则表达式
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/;
        if (reg.test(rgbStr)) {
            return rgbStr
        } else {
            const rgbArray = rgbStr.replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g, "").split(",");
            let strHex = "#";
            for (let i = 0; i < rgbArray.length; i++) {
                if (i !== 3) {
                    if (rgbArray[i] == "0") {
                        strHex += "00"
                    } else {
                        let newItem = Number(rgbArray[i]).toString(16)
                        if (newItem.length < 2) {
                            newItem = "0" + newItem
                        }
                        strHex += newItem
                    }
                } else {
                    strHex += rgbArray[i] == "0" ? "" : Number(rgbArray[i]) * 100
                }
            }
            return strHex;
        }
    }
}
// export default 