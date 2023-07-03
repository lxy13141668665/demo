(function (event) {
    event = event || document;
    let rgba = {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
        hsb = {
            h: 0,
            s: 100,
            b: 100
        };

    let Initial = null,
        setTime = null,
        throttle = null;

    function ColorPicker(str) {
        ColorPicker.prototype.Ele = {
            sample: document.querySelector('.sample'),
            ColorPickerContainer: document.querySelector('.ColorPickerContainer'),
            PanelContainer: document.querySelector('.PanelContainer'),
            panel: document.querySelector('.panel'),
            DotOne: document.querySelector('.DotOne'),
            Discoloration: document.querySelector('.Discoloration'),
            DotTwo: document.querySelector('.DotTwo'),
            input: document.querySelectorAll('input'),
            ControlButton: document.querySelector('.control>button'),
            LeftAndRightlSpan: document.querySelectorAll('.LeftAndRight>span'),
            InputBoxOne: document.querySelector('.InputBoxOne'),
            InputBoxTwo: document.querySelector('.InputBoxTwo')
        };
        Initial = str;
        return new ColorPicker.prototype.init(str);
    }
    ColorPicker.prototype.init = function (str) {
        ColorPicker.prototype.initANDsetColor(str);
        return this;
    }

    ColorPicker.prototype.init.prototype = ColorPicker.prototype;

    ColorPicker.prototype.then = function (parameter) {
        ColorPicker.prototype.then.prototype.thenFun = parameter;
    }

    ColorPicker.setColor = function (str) {
        if (ColorPicker.prototype.initANDsetColor) {
            ColorPicker.prototype.initANDsetColor(str);
        } else {
            throw new Error('未调用ColorPicker函数');
        }
    }

    ColorPicker.prototype.initANDsetColor = function (str) {
        if (str.match(/rgb\(|\Rgb\(/g) && str.match(/\)|\);/g) && str.match(/,/g)) {
            if (str.match(/,/g).length === 2) {
                str = str.replace(/rgb\(|\Rgb\(/g, '').replace(/\)|\);/g, '');
                let strArr = str.split(',');
                ColorPicker.prototype.Ele.input[1].value = parseInt(strArr[0]);
                ColorPicker.prototype.Ele.input[2].value = parseInt(strArr[1]);
                ColorPicker.prototype.Ele.input[3].value = parseInt(strArr[2]);
                ColorPicker.prototype.RgbInput();
            }
        } else {
            ColorPicker.prototype.Ele.input[0].value = str;
            ColorPicker.prototype.HexInput();
        }
        ColorPicker.prototype.EventCollection();
    }


    ColorPicker.prototype.hsbToRgb = function (hsb) {
        var rgb = {};
        var h = hsb.h;
        var s = hsb.s * 255 / 100;
        var v = hsb.b * 255 / 100;

        if (s == 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h === 360) h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3
            } else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3
            } else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3
            } else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3
            } else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3
            } else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3
            } else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0
            }
        }

        return {
            r: Math.round(rgb.r),
            g: Math.round(rgb.g),
            b: Math.round(rgb.b)
        };
    }

    ColorPicker.prototype.rgbToHex = function (rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        hex.map(function (str, i) {
            if (str.length == 1) {
                hex[i] = '0' + str;
            }
        });
        return hex.join('');
    }

    ColorPicker.prototype.hexToRgb = function (hex) {
        var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {
            r: hex >> 16,
            g: (hex & 0x00FF00) >> 8,
            b: (hex & 0x0000FF)
        };
    }

    ColorPicker.prototype.hexToHsb = function (hex) {
        return this.rgbToHsb(this.hexToRgb(hex));
    }

    ColorPicker.prototype.rgbToHsb = function (rgb) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
            else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
            else hsb.h = 4 + (rgb.r - rgb.g) / delta;
        } else hsb.h = -1;
        hsb.h *= 60;
        if (hsb.h < 0) hsb.h += 360;
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    }

    ColorPicker.prototype.setValue = function (rgb) {
        ColorPicker.prototype.Ele.input[0].value = "#" + this.rgbToHex(rgb);
        ColorPicker.prototype.Ele.input[1].value = rgb.r;
        ColorPicker.prototype.Ele.input[2].value = rgb.g;
        ColorPicker.prototype.Ele.input[3].value = rgb.b;
    }

    ColorPicker.prototype.changeColor = function () {
        let rgb = this.hsbToRgb(hsb);
        this.setValue(rgb);
        rgba.r = rgb.r;
        rgba.g = rgb.g;
        rgba.b = rgb.b;
        ColorPicker.prototype.Ele.sample.style.backgroundColor = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b +
            ',' + rgba.a + ')';
        clearTimeout(throttle);
        throttle = setTimeout(function () {
            if (ColorPicker.prototype.thenFunExistence('rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')')) {
                ColorPicker.prototype.then.prototype.thenFun('rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')');
            }
            clearTimeout(throttle);
        }, 36);
    }

    ColorPicker.prototype.thenFunExistence = function (ColorData) {
        if (ColorPicker.prototype.then.prototype.thenFun) {
            return true;
        } else {
            clearTimeout(setTime);
            setTime = setTimeout(function () { //延时防止调用thenFun时发生越界
                if (ColorPicker.prototype.thenFunExistence(ColorData)) {
                    ColorPicker.prototype.then.prototype.thenFun(ColorData);
                }
                clearTimeout(setTime);
            }, 5);
        }
        return false;
    }

    ColorPicker.prototype.PanelCalculation = function (x, y) {
        let MaxLeft = Math.max(0, Math.min(x, 216));
        let MaxTop = Math.max(0, Math.min(y, 124));
        hsb.s = 100 * MaxLeft / 216;
        hsb.b = 100 * (124 - MaxTop) / 124;
        this.changeColor();
    }

    ColorPicker.prototype.BarCalculation = function (x) {
        let Left = Math.max(0, Math.min(x, 216));
        hsb.h = 360 * Left / 216;
        let rgb = this.hsbToRgb({
            h: hsb.h,
            s: 100,
            b: 100
        });
        ColorPicker.prototype.Ele.PanelContainer.style.backgroundColor = 'rgba(' + rgb.r + ',' + rgb.g + ',' +
            rgb.b + ',' + rgba.a + ')';
        this.changeColor();
        // rgba.a = X / elem_width;//调透明度的
    }

    ColorPicker.prototype.panelFun = function (event) {
        ColorPicker.prototype.Ele.DotOne.style.top = (event.offsetY - 7.5) + "px";
        ColorPicker.prototype.Ele.DotOne.style.left = (event.offsetX - 7.5) + "px";
        ColorPicker.prototype.PanelCalculation(event.offsetX, event.offsetY);
    }

    ColorPicker.prototype.DiscolorationFun = function (event) {
        ColorPicker.prototype.Ele.DotTwo.style.left = (event.offsetX - 7.5) + "px";
        ColorPicker.prototype.BarCalculation(event.offsetX);
    }

    ColorPicker.prototype.DotOneFun = function (event) {
        ColorPicker.prototype.Ele.panel.removeEventListener("click", ColorPicker.prototype.panelFun);
        let DotOneTop = event.offsetY > 0 ? event.offsetY : 0;
        let DotOneLeft = event.offsetX > 0 ? event.offsetX : 0;
        document.onmousemove = function (e) {
            e.preventDefault();
            let OneTop = e.clientY - (ColorPicker.prototype.Ele.ColorPickerContainer.offsetTop + DotOneTop);
            let OneLeft = e.clientX - (ColorPicker.prototype.Ele.ColorPickerContainer.offsetLeft +
                DotOneLeft);
            OneTop = OneTop <= -7.5 ? -7.5 : OneTop;
            OneTop = OneTop >= 116.5 ? 116.5 : OneTop;
            OneLeft = OneLeft <= -7.5 ? -7.5 : OneLeft;
            OneLeft = OneLeft >= 209.5 ? 209.5 : OneLeft;
            ColorPicker.prototype.Ele.DotOne.style.top = OneTop + "px";
            ColorPicker.prototype.Ele.DotOne.style.left = OneLeft + "px";
            ColorPicker.prototype.PanelCalculation((e.clientX - ColorPicker.prototype.Ele
                .ColorPickerContainer.offsetLeft), (e
                    .clientY - ColorPicker.prototype.Ele.ColorPickerContainer.offsetTop));
        }
        document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
            let delayed = setTimeout(function () {
                ColorPicker.prototype.Ele.panel.addEventListener('click', ColorPicker.prototype
                    .panelFun);
                clearTimeout(delayed);
            }, 10);
        }
    }

    ColorPicker.prototype.DotTwoFun = function (event) {
        ColorPicker.prototype.Ele.Discoloration.removeEventListener("click", ColorPicker.prototype
            .DiscolorationFun);
        let DotTwoLeft = event.offsetX > 0 ? event.offsetX : 0;
        document.onmousemove = function (e) {
            e.preventDefault();
            let TwoLeft = e.clientX - (ColorPicker.prototype.Ele.ColorPickerContainer.offsetLeft +
                DotTwoLeft);
            TwoLeft = TwoLeft <= -7.5 ? -7.5 : TwoLeft;
            TwoLeft = TwoLeft >= 209.5 ? 209.5 : TwoLeft;
            ColorPicker.prototype.Ele.DotTwo.style.left = TwoLeft + "px";
            ColorPicker.prototype.BarCalculation(e.clientX - ColorPicker.prototype.Ele.ColorPickerContainer
                .offsetLeft);
        }
        document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
            let delayed = setTimeout(function () {
                ColorPicker.prototype.Ele.Discoloration.addEventListener('click', ColorPicker
                    .prototype.DiscolorationFun);
                clearTimeout(delayed);
            }, 10);
        }
    }

    ColorPicker.prototype.setDistance = function (hsb) {
        ColorPicker.prototype.Ele.DotOne.style.top = parseInt(((100 - hsb.b) * 124 / 100) - 7.5) + "px";
        ColorPicker.prototype.Ele.DotOne.style.left = parseInt((hsb.s * 216 / 100) - 7.5) + "px";
        ColorPicker.prototype.Ele.DotTwo.style.left = parseInt((hsb.h / 360 * 216) - 7.5) + "px";
        this.PanelCalculation(hsb.s * 216 / 100, (100 - hsb.b) * 124 / 100);
        this.BarCalculation(hsb.h / 360 * 216);
    }

    ColorPicker.prototype.SpecialSymbol = function (str) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
        if (pattern.test(str)) {
            return true;
        }
        return false;
    }

    ColorPicker.prototype.HexInput = function () {
        let ColorPickerThis = ColorPicker.prototype;
        if (!ColorPicker.prototype.Ele.input[0].value) {
            alert('gun')
            return null;
        }
        if (ColorPicker.prototype.Ele.input[0].value[0] !== "#") {
            ThisValuePro = "#" + ColorPicker.prototype.Ele.input[0].value;
        } else {
            ThisValuePro = ColorPicker.prototype.Ele.input[0].value.substring(1);
        }
        if (!ColorPickerThis.SpecialSymbol(ThisValuePro)) {
            if (ThisValuePro.length === 6) {
                ColorPickerThis.setDistance(ColorPickerThis.hexToHsb(ColorPicker.prototype.Ele.input[0].value));
            } else if (ThisValuePro.length === 3) {
                let NewValue = ThisValuePro[0] + ThisValuePro[0] + ThisValuePro[1] + ThisValuePro[1] +
                    ThisValuePro[
                    2] + ThisValuePro[2];
                ColorPickerThis.setDistance(ColorPickerThis.hexToHsb(NewValue));
            }
        }
    }

    ColorPicker.prototype.RgbInput = function (event) {
        let ColorPickerThis = ColorPicker.prototype;
        if (!ColorPickerThis.SpecialSymbol(ColorPickerThis.Ele.input[1].value) && !ColorPickerThis
            .SpecialSymbol(ColorPickerThis.Ele.input[2].value) &&
            !ColorPickerThis.SpecialSymbol(ColorPickerThis.Ele.input[3].value)) {
            if (parseInt(ColorPickerThis.Ele.input[1].value) >= 0 && parseInt(ColorPickerThis.Ele.input[2]
                .value) >= 0 && parseInt(ColorPickerThis.Ele.input[3].value) >=
                0) {
                if (parseInt(ColorPickerThis.Ele.input[1].value) <= 255 && parseInt(ColorPickerThis.Ele.input[2]
                    .value) <= 255 && parseInt(ColorPickerThis.Ele.input[3]
                        .value) <=
                    255) {
                    ColorPickerThis.setDistance(ColorPickerThis.rgbToHsb({
                        r: parseInt(ColorPickerThis.Ele.input[1].value),
                        g: parseInt(ColorPickerThis.Ele.input[2].value),
                        b: parseInt(ColorPickerThis.Ele.input[3].value)
                    }));
                }
            }
        }
    }

    ColorPicker.prototype.EventCollection = function () {
        ColorPicker.prototype.Ele.panel.addEventListener('click', ColorPicker.prototype.panelFun);
        ColorPicker.prototype.Ele.Discoloration.addEventListener('click', ColorPicker.prototype
            .DiscolorationFun);
        ColorPicker.prototype.Ele.DotOne.addEventListener('mousedown', ColorPicker.prototype.DotOneFun);
        ColorPicker.prototype.Ele.DotTwo.addEventListener('mousedown', ColorPicker.prototype.DotTwoFun);
        ColorPicker.prototype.Ele.input[0].addEventListener('input', ColorPicker.prototype.HexInput);
        ColorPicker.prototype.Ele.input[1].addEventListener('input', ColorPicker.prototype.RgbInput);
        ColorPicker.prototype.Ele.input[2].addEventListener('input', ColorPicker.prototype.RgbInput);
        ColorPicker.prototype.Ele.input[3].addEventListener('input', ColorPicker.prototype.RgbInput);
        ColorPicker.prototype.Ele.ControlButton.addEventListener('click', function () {
            ColorPicker.prototype.init(Initial);
        });

        ColorPicker.prototype.Ele.LeftAndRightlSpan[0].addEventListener('click', function () {
            ColorPicker.prototype.Ele.InputBoxTwo.style.display = "none";
            ColorPicker.prototype.Ele.InputBoxOne.style.display = "block";
        });
        ColorPicker.prototype.Ele.LeftAndRightlSpan[1].addEventListener('click', function () {
            ColorPicker.prototype.Ele.InputBoxOne.style.display = "none";
            ColorPicker.prototype.Ele.InputBoxTwo.style.display = "flex";
        });
    }

    event.ColorPicker = ColorPicker;
})(window);