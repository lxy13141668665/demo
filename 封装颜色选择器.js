// 若调用创建方法，只需要传入一个包裹颜色选择器的div和一个回调函数即可
function createdColorPicker(colorParentDiv, callback) {
    // 获取最近使用颜色
    var colorRecentlyUsed = localStorage.getItem('colorRecentlyUsed') || '';
    var colorRecentlyUsedArr = colorRecentlyUsed ? JSON.parse(colorRecentlyUsed) : [];
    if (colorParentDiv) {
        colorParentDiv.innerHTML = colorPickerHTML;
        var styleDIV = document.createElement('style');
        styleDIV.innerHTML = colorPickerSTYLE;
        colorParentDiv.appendChild(styleDIV);

        // 渲染最近使用的颜色
        var RecentlyUsedDiv = document.querySelectorAll('#recentlyUsedDom>.dc_color_box');
        if (colorRecentlyUsedArr && colorRecentlyUsedArr.length) {
            colorRecentlyUsedArr.reverse();//倒序最近颜色
            for (var i = 0; i <= colorRecentlyUsedArr.length; i++) {
                RecentlyUsedDiv[i] && (RecentlyUsedDiv[i].style['background-color'] = colorRecentlyUsedArr[i]);
            }
        }
    }
    var dcColorPicker = document.getElementById('dc_color_picker');
    dcColorPicker.addEventListener('click', function (e) {
        e.stopPropagation();
        if (e.target.classList.contains('dc_color_box')) {
            var colorString = e.target.style['background-color'] || '';
            var setcolorRecentlyUsedArr = colorRecentlyUsed ? JSON.parse(colorRecentlyUsed) : [];
            //防止有重复颜色
            if (setcolorRecentlyUsedArr.indexOf(colorString) !== -1) {
                var index = setcolorRecentlyUsedArr.indexOf(colorString);
                setcolorRecentlyUsedArr.splice(index, 1);
            }
            // 始终只保留最近10次使用的颜色
            if (setcolorRecentlyUsedArr.length >= 10) {
                setcolorRecentlyUsedArr.shift();
            }
            setcolorRecentlyUsedArr.push(colorString);
            localStorage.setItem('colorRecentlyUsed', JSON.stringify(setcolorRecentlyUsedArr));//保存颜色
            callback && callback(colorString)
        }
    })
}

var colorPickerHTML = `
        <div id="dc_color_picker" class="dc_color_picker">
        <div class="dc_color_picker_default dc_color_box">默认</div>
        <div class="dc_color_picker_choose">
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #f2f0f3;"></div>
                <div class="dc_color_box" style="background-color: #dad8db;"></div>
                <div class="dc_color_box" style="background-color: #bfbdc0;"></div>
                <div class="dc_color_box" style="background-color: #a5a3a6;"></div>
                <div class="dc_color_box" style="background-color: #959396;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #010002;"></div>
                <div class="dc_color_box" style="background-color: #7f7d80;"></div>
                <div class="dc_color_box" style="background-color: #5b595c;"></div>
                <div class="dc_color_box" style="background-color: #3f3d40;"></div>
                <div class="dc_color_box" style="background-color: #272527;"></div>
                <div class="dc_color_box" style="background-color: #09070a;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #4b5265;"></div>
                <div class="dc_color_box" style="background-color: #f5f3f6;"></div>
                <div class="dc_color_box" style="background-color: #cac7cf;"></div>
                <div class="dc_color_box" style="background-color: #86889e;"></div>
                <div class="dc_color_box" style="background-color: #262427;"></div>
                <div class="dc_color_box" style="background-color: #212024;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #3f71fc;"></div>
                <div class="dc_color_box" style="background-color: #e6effb;"></div>
                <div class="dc_color_box" style="background-color: #cadbfd;"></div>
                <div class="dc_color_box" style="background-color: #a0befc;"></div>
                <div class="dc_color_box" style="background-color: #2253ba;"></div>
                <div class="dc_color_box" style="background-color: #182f76;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #3ca4f3;"></div>
                <div class="dc_color_box" style="background-color: #e4faf8;"></div>
                <div class="dc_color_box" style="background-color: #d0edff;"></div>
                <div class="dc_color_box" style="background-color: #a5dcfe;"></div>
                <div class="dc_color_box" style="background-color: #2d74a0;"></div>
                <div class="dc_color_box" style="background-color: #18405b;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #469959;"></div>
                <div class="dc_color_box" style="background-color: #edf8f0;"></div>
                <div class="dc_color_box" style="background-color: #cbe5d4;"></div>
                <div class="dc_color_box" style="background-color: #a2d6b4;"></div>
                <div class="dc_color_box" style="background-color: #337c4f;"></div>
                <div class="dc_color_box" style="background-color: #27472f;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #d63733;"></div>
                <div class="dc_color_box" style="background-color: #fce7ec;"></div>
                <div class="dc_color_box" style="background-color: #f9c9c9;"></div>
                <div class="dc_color_box" style="background-color: #f6979a;"></div>
                <div class="dc_color_box" style="background-color: #941d15;"></div>
                <div class="dc_color_box" style="background-color: #4c110b;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #e98209;"></div>
                <div class="dc_color_box" style="background-color: #faf3eb;"></div>
                <div class="dc_color_box" style="background-color: #f9dcc3;"></div>
                <div class="dc_color_box" style="background-color: #f6b785;"></div>
                <div class="dc_color_box" style="background-color: #ae6203;"></div>
                <div class="dc_color_box" style="background-color: #5b2d0c;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #efc500;"></div>
                <div class="dc_color_box" style="background-color: #f8f9e0;"></div>
                <div class="dc_color_box" style="background-color: #ffefa9;"></div>
                <div class="dc_color_box" style="background-color: #fce261;"></div>
                <div class="dc_color_box" style="background-color: #998208;"></div>
                <div class="dc_color_box" style="background-color: #5c5006;"></div>
            </div>
            <div class="dc_color-group">
                <div class="dc_color_box" style="background-color: #9631dd;"></div>
                <div class="dc_color_box" style="background-color: #fbeafb;"></div>
                <div class="dc_color_box" style="background-color: #edc9fd;"></div>
                <div class="dc_color_box" style="background-color: #cd8eff;"></div>
                <div class="dc_color_box" style="background-color: #54288f;"></div>
                <div class="dc_color_box" style="background-color: #371347;"></div>
            </div>

        </div>
        <div class="dc_color_picker_standard">
            <div class="dc_color_picker_standard_text">标准色</div>
            <div class="dc_color_picker_standard_choose">
                <div class="dc_color_box" style="background-color: #af0308;"></div>
                <div class="dc_color_box" style="background-color: #f10300;"></div>
                <div class="dc_color_box" style="background-color: #f7c003;"></div>
                <div class="dc_color_box" style="background-color: #fffb00;"></div>
                <div class="dc_color_box" style="background-color: #9cd04a;"></div>
                <div class="dc_color_box" style="background-color: #37b246;"></div>
                <div class="dc_color_box" style="background-color: #39b1f7;"></div>
                <div class="dc_color_box" style="background-color: #2372b6;"></div>
                <div class="dc_color_box" style="background-color: #0d1d63;"></div>
                <div class="dc_color_box" style="background-color: #6a319b;"></div>
            </div>
        </div>
        <div class="dc_color_picker_standard">
            <div class="dc_color_picker_standard_text">最近使用</div>
            <div class="dc_color_picker_standard_choose" id="recentlyUsedDom">
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
                <div class="dc_color_box" style="background-color: #ffffff;"></div>
            </div>
        </div>
    </div>
    `;
var colorPickerSTYLE = ` .dc_color_picker {
            width: 260px;
            height: 310px;
            background: #ffffff;
            padding: 10px;
            box-sizing: border-box;
            margin: 0;
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
            position:fixed;
        }

        .dc_color_picker_default.dc_color_box {
            width: 100%;
            height: 26px;
            border: 1px solid #ebebeb;
            text-align: center;
            line-height: 26px;
            font-size: 14px;
            color: #606266;
        }

        .dc_color_picker_choose {
            width: 100%;
            height: 136px;
            padding: 5px 0;
            display: flex;
            justify-content: space-between;
        }

        .dc_color-group {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .dc_color_box {
            width: 18px;
            height: 18px;
            border: 1px solid #ebebeb;
            cursor: pointer;
        }

        .dc_color_picker_standard_text {
            margin: 6px 0;
            font-size: 14px;
            color: #606266;
        }

        .dc_color_picker_standard_choose {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }`;