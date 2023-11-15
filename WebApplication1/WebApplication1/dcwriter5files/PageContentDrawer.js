"use strict";
// 文档内容绘图器

import { DCTools20221228 } from "./DCTools20221228.js";
import { WriterControl_Task } from "./WriterControl_Task.js";
import { DCBinaryReader } from "./DCTools20221228.js";

export class PageContentDrawer {

    /** 获得数据读取器
     * @returns { DCBinaryReader } 数据读取器
     */
    get Reader() {
        return this._Reader;
    }
    /*** 设置数据读取器
     * @param { DCBinaryReader} reader 数据读取器
     */
    set Reader(reader) {
        this._Reader = reader;
    }
    /**
     * 初始化对象
     * @param {HTMLCanvasElement} vCanvasElement 画布对象
     * @param {Uint8Array | DCBinaryReader} vCodes 绘图指令
     */
    constructor(vCanvasElement, vCodes) {
        this.TypeName = "PageContentDrawer";
        //if (vCanvasElement == null) {
        //    throw "画布元素不能为空";
        //}
        //if (vCodes == null) {
        //    throw "绘图指令不能为空";
        //}
        this._Cancel = false;
        this.CreationTime = new Date();
        this.CreationTick = new Date().valueOf() % 10000;
        this.DoubleBuffer = false;
        this.TempElementForDoubleBuffer = null;
        this.AllowClip = true;
        this.RectangleForClear = null;
        this.CanvasElement = vCanvasElement;
        if (vCodes != null) {
            if (vCodes.TypeName = "DCBinaryReader") {
                this._Reader = vCodes;
            }
            else if (vCodes.length > 0) {
                this._Reader = new DCBinaryReader(vCodes);
            }
        }
        this.SaveCount = 0;
        this.PageUnit = 0;
        this.FontTable = new Array();
        this.PenTable = new Array();
        this.BrushTable = new Array();
        this.ColorTable = new Array();
        this.ImageTable = new Array();
        this.Pages = new Array();

        var MySelectPen = function (pen) {
            if (typeof (pen) == "number") {
                pen = this.PenTable[pen];
            }
            var oldPen = new Object();
            oldPen.Color = this.ctx.strokeStyle;
            oldPen.Width = this.ctx.lineWidth;
            this.ctx.strokeStyle = pen.Color;
            this.ctx.lineWidth = pen.Width + "px";
            if (this.ctx.setLineDash) {
                oldPen.LineDashData = this.ctx.getLineDash();
                this.ctx.setLineDash(pen.LineDashData);
            }
            return oldPen;
        };

        var MySelectBrush = function (brush) {
            var oldBrush = this.ctx.fillStyle;
            if (typeof (brush) == "number") {
                brush = this.BrushTable[brush];
            }
            this.ctx.fillStyle = brush;
            return oldBrush;
        };
        //this._offsetX = 0;
        //this._offsetY = 0;
        var SetPageUnit = function (Value) {
            ///*  World : 0, Display : 1, Pixel : 2, Point : 3, Inch : 4, Document : 5, Millimeter : 6, */
            this.PageUnit = Value;
            //switch (Value) {
            //    case 0: this.PageUnitRate = 1; break;
            //    case 1: this.PageUnitRate = 1; break;
            //    case 2: this.PageUnitRate = 1; break;
            //    case 3: this.PageUnitRate = 1.3333333333; break;
            //    case 4: this.PageUnitRate = 96; break;
            //    case 5: this.PageUnitRate = 0.32; break;
            //    case 6: this.PageUnitRate = 3.77952744641642; break;
            //    default:
            //        throw "不支持的单位:" + Value;
            //}
        }
        var _InnerSelectPen = function (pen) {
            var oldPen = new Object();
            oldPen.Color = this.ctx.strokeStyle;
            oldPen.Width = this.ctx.lineWidth;
            this.ctx.strokeStyle = pen.Color;
            this.ctx.lineWidth = pen.Width;
            if (pen.Width > 1) {
                var xx = "xxxxx";
            }
            if (this.ctx.setLineDash) {
                oldPen.LineDashData = this.ctx.getLineDash();
                this.ctx.setLineDash(pen.LineDashData);
            }
            return oldPen;
        }
        // 绘制线段
        var DrawLine = function (pen, x1, y1, x2, y2) {
            var oldPen = _InnerSelectPen.call(this, pen);
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
            _InnerSelectPen.call(this, oldPen);
        }
        // 绘制多条线段
        var DrawLines = function (pen, xyArray) {
            var oldPen = _InnerSelectPen.call(this, pen);
            this.ctx.beginPath();
            this.ctx.moveTo(Math.round(xyArray[0]), Math.round(xyArray[1]));
            var len = xyArray.length;
            for (var iCount = 2; iCount < len; iCount += 2) {
                var x = xyArray[iCount];
                var y = xyArray[iCount + 1];
                this.ctx.lineTo(Math.round(x), Math.round(y));
            }
            this.ctx.stroke();
            _InnerSelectPen.call(this, oldPen);
        }

        var DrawRectangle = function (pen, x, y, width, height) {
            var oldPen = _InnerSelectPen.call(this, pen);
            this.ctx.strokeRect(x, y, width, height);
            _InnerSelectPen.call(this, oldPen);
        }
        var FillRectangle = function (fillStyle, x, y, width, height) {
            var oldStyle = this.ctx.fillStyle;
            this.ctx.fillStyle = fillStyle;
            this.ctx.fillRect(x, y, width, height);
            this.ctx.fillStyle = oldStyle;
        }
        var DrawEllipse = function (pen, x, y, width, height) {
            var oldPen = _InnerSelectPen.call(this, pen);
            if (width == height) {
                // 正圆形
                this.ctx.beginPath();
                this.ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            else {
                //var x = x;
                //var y = y;
                var a = width;
                var b = height;
                var k = 0.5522848;
                var ox = a * k; // 水平控制点偏移量
                var oy = b * k; // 垂直控制点偏移量
                this.ctx.beginPath();
                //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
                this.ctx.moveTo(x - a, y);
                this.ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
                this.ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
                this.ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
                this.ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
                this.ctx.closePath();
                this.ctx.stroke();
            }
            _InnerSelectPen.call(this, oldPen);
        }
        var FillEllipse = function (fillStyle, x, y, width, height) {
            var oldBrush = this.ctx.fillStyle;
            this.ctx.fillStyle = fillStyle;
            //var x = x;
            //var y = y;
            var a = width;
            var b = height;
            var k = 0.5522848;
            var ox = a * k; // 水平控制点偏移量
            var oy = b * k; // 垂直控制点偏移量
            this.ctx.beginPath();
            //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
            this.ctx.moveTo(x - a, y);
            this.ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
            this.ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
            this.ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
            this.ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.fillStyle = oldBrush;
        }
        this._ClipBounds = null;
        var CreateStateBack = function ( drawer ) {
            var list = [
                drawer.ctx.strokeStyle,
                drawer.ctx.lineWidth,
                drawer.ctx.setLineDash ? drawer.ctx.getLineDash() : null,
                drawer.ctx.fillStyle,
                drawer.ctx.font,
                drawer.ctx.getTransform()];
            list.restore = function (drawer) {
                drawer.ctx.strokeStyle = this[0];
                drawer.ctx.lineWidth = this[1];
                if (drawer.ctx.setLineDash) {
                    drawer.ctx.setLineDash(this[2]);
                }
                drawer.ctx.fillStyle = this[3];
                drawer.ctx.font = this[4];
                //var item4 = drawer.ctx.getTransform();
                drawer.ctx.setTransform(this[5]);
            };
            return list;
        };
        var SetClip = function (left, top, width, height) {
            if (this.AllowClip == true) {
                var stateBack = CreateStateBack(this);
                while (this.SaveCount > 0) {
                    this.ctx.restore();
                    this.SaveCount--;
                }
                this.ctx.save();
                this.SaveCount++;
                stateBack.restore.call(stateBack, this);
                this.ctx.beginPath();
                this.ctx.rect(left, top, width+1, height+1);
                this.ctx.clip();
                return;
            }
        };
        var ResetClip = function () {
            if (this.AllowClip == true) {
                var stateBack = CreateStateBack(this);
                while (this.SaveCount > 0) {
                    this.ctx.restore();
                    this.SaveCount--;
                }
                this.ctx.save();
                this.SaveCount++;
                stateBack.restore.call(stateBack, this);
                this.ctx.beginPath();
                this.ctx.rect(-100000, -100000, 200000, 200000);
                this.ctx.clip();
            }
        };

        // 定义绘图函数列表 ******************
        this.Functions = new Array();
        var funcIndex = 0;
        //0 First
        this.Functions[funcIndex++] = function (reader) { return 0; };
        //1 SetCurrentFont
        this.Functions[funcIndex++] = function (reader) {
            this.ctx.font = this.FontTable[reader.ReadInt16()];
        };
        //2 SetCurrentBrush
        this.Functions[funcIndex++] = function (reader) {
            var index = reader.ReadInt16();
            this.ctx.fillStyle = this.BrushTable[index];
            //var oldBrush = this.ctx.fillStyle;
            //if (typeof (brush) == "number") {
            //    brush = this.BrushTable[brush];
            //}
            //this.ctx.fillStyle = brush;
            //return oldBrush;
            //MySelectBrush.call(this, reader.ReadInt16());
        };
        //3 SetCurrentPen
        this.Functions[funcIndex++] = function (reader) {
            MySelectPen.call(this, reader.ReadInt16());
        };
        //4 AddPage
        this.Functions[funcIndex++] = null;
        //5 DrawLine
        this.Functions[funcIndex++] = function (reader) {
            var pIndex = reader.ReadInt16();
            var p4 = this.PenTable[pIndex];
            if (p4 == null) {
                console.log("zzzz");
            }
            DrawLine.call(
                this,
                p4,
                reader.ReadInt32() + 0.5,
                reader.ReadInt32() + 0.5,
                reader.ReadInt32() + 0.5,
                reader.ReadInt32() + 0.5);
        };
        //6 DrawString
        this.Functions[funcIndex++] = function (reader) {
            var str = reader.ReadString();
            var x = reader.ReadInt32();
            var y = reader.ReadInt32();
            var w = reader.ReadInt16();
            this.ctx.fillText(
                str,
                x + 0.5,
                y + 0.5,
                w);
        };
        //7 DrawChar
        this.Functions[funcIndex++] = function (reader) {
            var txt = reader.ReadChar();
            var x = reader.ReadInt32();
            var y = reader.ReadInt32();
            this.ctx.fillText(
                txt,
                x + 0.25,
                y + 0.25);
        };
        //8 DrawRoundRectangle
        this.Functions[funcIndex++] = function (reader) {
            DrawRectangle.call(
                this,
                this.PenTable[reader.ReadInt16()],
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //9 DrawRectangle
        this.Functions[funcIndex++] = function (reader) {
            DrawRectangle.call(
                this,
                this.PenTable[reader.ReadInt16()],
                reader.ReadInt32() + 0.5,
                reader.ReadInt32() + 0.5,
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //10 FillRectangle
        this.Functions[funcIndex++] = function (reader) {
            FillRectangle.call(
                this,
                this.BrushTable[reader.ReadInt16()],
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //11 DrawEllipse
        this.Functions[funcIndex++] = function (reader) {
            DrawEllipse.call(
                this,
                this.PenTable[reader.ReadInt16()],
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //12 FillEllipse
        this.Functions[funcIndex++] = function (reader) {
            FillEllipse.call(
                this,
                this.BrushTable[reader.ReadInt16()],
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //13 CheckVersion
        this.Functions[funcIndex++] = function (reader) {
            if (reader.ReadInt32() != 20221031) {
                throw "系统版本不匹配。"
            }
        };
        //14 SetTransform
        this.Functions[funcIndex++] = function (reader) {
            this.ctx.setTransform(
                reader.ReadSingle(),
                reader.ReadSingle(),
                reader.ReadSingle(),
                reader.ReadSingle(),
                reader.ReadSingle(),
                reader.ReadSingle());
        };
        //15 DrawImageExt
        this.Functions[funcIndex++] = function (reader) {
            var img = this.ImageTable.GetValue(reader.ReadInt16());
            var p1 = reader.ReadInt16();
            var p2 = reader.ReadInt16();
            var p3 = reader.ReadInt16();
            var p4 = reader.ReadInt16();
            var p5 = reader.ReadInt32();
            var p6 = reader.ReadInt32();
            var p7 = reader.ReadInt32();
            var p8 = reader.ReadInt32();
            this.ctx.drawImage(
                img,
                p1,
                p2,
                p3,
                p4,
                p5,
                p6,
                p7,
                p8);
        };

        //16 Save
        this.Functions[funcIndex++] = function (reader) {
            this.ctx.save();
        };
        //17 Restore
        this.Functions[funcIndex++] = function (reader) {
            this.ctx.restore();
        };
        //18 FontTable
        this.Functions[funcIndex++] = function (reader) {
            //this.FontTable = new Array();
            var len = reader.ReadInt16();
            for (var iCount = 0; iCount < len; iCount++) {
                this.FontTable.push(reader.ReadString());
            }
        };
        //19 ColorTable
        this.Functions[funcIndex++] = function (reader) {
            //this.ColorTable = new Array();
            var len = reader.ReadInt16();
            for (var iCount = 0; iCount < len; iCount++) {
                this.ColorTable.push(reader.ReadString());
            }
        };
        //20 PenTable
        this.Functions[funcIndex++] = function (reader) {
            //this.PenTable = new Array();
            var len = reader.ReadInt16();
            for (var iCount = 0; iCount < len; iCount++) {
                var p = new Object();
                p.Color = reader.ReadString();
                p.Width = reader.ReadByte();
                switch (reader.ReadByte()) {
                    /* Solid : 0,Dash : 1,Dot : 2,DashDot : 3,DashDotDot : 4,Custom : 5,*/
                    case 0: p.LineDashData = []; break; // Solid
                    case 1: p.LineDashData = [6, 6]; break; // Dash
                    case 2: p.LineDashData = [3, 3]; break; // Dot
                    case 3: p.LineDashData = [6, 3]; break; // DashDot
                    case 4: p.LineDashData = [6, 3, 3]; break; // DashDotDot
                    default: p.LineDashData = []; break;
                }
                this.PenTable.push(p);
            }
        };
        //21 DrawImageXY
        this.Functions[funcIndex++] = function (reader) {
            this.ctx.drawImage(
                this.ImageTable.GetValue(reader.ReadInt16()),
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //22 DrawImage
        this.Functions[funcIndex++] = function (reader) {
            var imgIndex = reader.ReadInt16();
            var img = this.ImageTable.GetValue(imgIndex);
            this.ctx.drawImage(
                img,
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //23 SetPageUnit
        this.Functions[funcIndex++] = function (reader) {
            SetPageUnit.call(this, reader.ReadByte());
        };

        //24 TranslateTransform
        this.Functions[funcIndex++] = function (reader) {
            var dx = reader.ReadSingle();
            var dy = reader.ReadSingle();
            //this._offsetX = dx;
            //this._offsetY = dy;
            this.ctx.translate(dx, dy);
        };
        //25 RotateTransform
        this.Functions[funcIndex++] = function (reader) {
            this.ctx.rotate(reader.ReadSingle());
        };
        //26 ScaleTransform
        this.Functions[funcIndex++] = function (reader) {
            var sx = reader.ReadSingle();
            var sy = reader.ReadSingle();
            //if (sx != 1 || sy != 1) {
            //    console.log("8");
            //}
            this.ctx.scale(sx, sy);
        };
        //27 SetClip
        this.Functions[funcIndex++] = function (reader) {
            SetClip.call(
                this,
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32(),
                reader.ReadInt32());
        };
        //28 ResetClip
        this.Functions[funcIndex++] = function (reader) {
            ResetClip.call(this);
        };

        this.FunctionIndex_ImageTable = 29;
        //29 ImageTable
        this.Functions[funcIndex++] = function (reader) {
            // 加载图片列表
            var len = reader.ReadInt16();
            //this.ImageTable = new Array();
            this.ImageTable.GetValue = function (index) {
                var imgElement2 = this[index];
                return imgElement2;
            };
            this.ImageTable.loaded = false;
            for (var iCount = 0; iCount < len; iCount++) {
                var imgElemnent = document.createElement("IMG");// new Image();
                imgElemnent.loading = "eager";
                this.ImageTable.push(imgElemnent);
                var strImageHeader = null;
                switch (reader.ReadByte()) {
                    case 0: strImageHeader = "data:image/jpeg;base64,"; break;
                    case 1: strImageHeader = "data:image/png;base64,"; break;
                    case 2: strImageHeader = "data:image/gif;base64,"; break;
                    case 3: strImageHeader = "data:image/bmp;base64,"; break;
                    case 4: strImageHeader = "data:image/png;base64,"; break;
                }
                var bsData = reader.ReadByteArray();
                var txt2 = '';
                var chunk = 8 * 1024;
                for (var i = 0; i < bsData.length / chunk; i++) {
                    txt2 += String.fromCharCode.apply(null, bsData.slice(i * chunk, (i + 1) * chunk));
                }
                txt2 += String.fromCharCode.apply(null, bsData.slice(i * chunk)); 
                var strImageUrl = strImageHeader + btoa(txt2);
                imgElemnent.src = strImageUrl;
            }
        };
        //30 BrushTable
        this.Functions[funcIndex++] = function (reader) {
            var len = reader.ReadInt16();
            this.BrushTable = new Array();
            for (var iCount = 0; iCount < len; iCount++) {
                this.BrushTable.push(reader.ReadString());
            }
        };
        //31 DrawLines
        this.Functions[funcIndex++] = function (reader) {
            var pIndex = reader.ReadInt16();
            var len = reader.ReadInt16();
            var ps = new Array();
            for (var iCount = 0; iCount < len; iCount++) {
                ps.push(reader.ReadInt32());
                ps.push(reader.ReadInt32());
            }
            DrawLines.call(
                this,
                this.PenTable[pIndex],
                ps);
        };
    }
    /** 取消任务 */
    Cancel() {
        this._Cancel = true;
    }
    /**
     * 判断能否吃掉其他任务
     * @param {any} otherTask 其他任务对象
     * @returns {boolean} 能否被其他任务吃掉
     */
    CanEatTask(otherTask) {
        if (otherTask == null
            || otherTask == this
            || otherTask.TypeName != "PageContentDrawer") {
            return false;
        }
        if (this.CanvasElement != null
            && this.RectangleForClear != null
            && this.CanvasElement == otherTask.CanvasElement
            && otherTask.RectangleForClear != null) {
            if (this.RectangleForClear[0] <= otherTask.RectangleForClear[0]
                && this.RectangleForClear[1] <= otherTask.RectangleForClear[1]
                && this.RectangleForClear[0] + this.RectangleForClear[2] >= otherTask.RectangleForClear[0] + otherTask.RectangleForClear[2]
                && this.RectangleForClear[1] + this.RectangleForClear[3] >= otherTask.RectangleForClear[1] + otherTask.RectangleForClear[3]) {
                // 可以吞并任务
                return true;
            }
        }
        return false;
    }

    /** 将自己添加到任务列表中 */
    AddToTask() {
        WriterControl_Task.AddTask(this);
    }
    /**
     * 设置清空区域
     * @param {number} vLeft 区域的左端位置
     * @param {number} vTop 区域的顶端位置
     * @param {number} vWidth 区域的宽度
     * @param {number} vHeight 区域的高度
     */
    SetClearRectangle(vLeft, vTop, vWidth, vHeight) {
        this.RectangleForClear = [vLeft, vTop, vWidth, vHeight];
    }
    ///**
    // * 删除绘图任务
    // * @param {Array} tasks 绘图任务列表
    // * @param {PageContentDrawer} item 要删除的任务对象
    // */
    //__RemoveTask(tasks, item) {
    //    if (tasks != null) {
    //        // 从绘图任务队列中删除对象
    //        var index = tasks.indexOf(this);
    //        if (index >= 0) {
    //            tasks.splice(index, 1);
    //        }
    //    }
    //}

    /**
     * 启用双缓冲功能
     * @param {number} vLeft 绘制区域的坐标
     * @param {number} vTop 绘制区域的坐标
     * @param {number} vWidth 绘制区域的坐标
     * @param {number} vHeight 绘制区域的坐标
     */
    EnableDoubleBuffer(vLeft, vTop, vWidth, vHeight) {
        this.DoubleBuffer = true;
        this.DoubleBufferBounds = [vLeft, vTop, vWidth, vHeight];
    }
    /** 执行绘图任务 */
    RunTask() {
        if (this._Cancel == true) {
            return;
        }
        if (this.Reader == null && typeof (this.EventQueryCodes) == "function") {
            var codes = this.EventQueryCodes.call(this, this);
            if (this._Cancel == true) {
                // 取消任务了
                return;
            }
            if (codes != null) {
                if (codes.TypeName == "DCBinaryReader") {
                    // 传入的已经是一个数据读取器
                    this.Reader = codes;
                }
                else if( codes.length > 0 ) {
                    this.Reader = new DCBinaryReader(codes);
                }
            }
        }
        if (this.Reader == null
            || this.CanvasElement == null
            || this._Cancel == true) {
            return;
        }
        if (this.Reader == null || this._Cancel == true ) {
            return;
        }
        if (this.ImageTable != null && this.ImageTable.length > 0) {
            var tick = new Date().valueOf() - this.CreationTime.valueOf();
            if (tick < 500) {
                // 任务创建尚未有500毫秒，则判断图片是否加载完毕
                for (var iCount = 0; iCount < this.ImageTable.length; iCount++) {
                    var img = this.ImageTable[iCount];
                    if (img.complete == false) {
                        // 还存在图片尚未加载完毕,等待,暂时退出
                        WriterControl_Task.AddTaskFast(this);
                        return false;
                    }
                }
            }
        }
        //var tasks = window.__DCWriter_DrawTasks20221221;
        if (this.DoubleBuffer == true) {
            // 启用双缓冲技术
            if (this.TempElementForDoubleBuffer == null) {
                this.TempElementForDoubleBuffer = document.createElement("CANVAS");
            }
            if (this.TempElementForDoubleBuffer.width != this.CanvasElement.width
                || this.TempElementForDoubleBuffer.height != this.CanvasElement.height) {
                this.TempElementForDoubleBuffer.width = this.CanvasElement.width;// this.DoubleBufferBounds[2];
                this.TempElementForDoubleBuffer.height = this.CanvasElement.height;// this.DoubleBufferBounds[3];
            }
            this.ctx = this.TempElementForDoubleBuffer.getContext("2d");
        }
        else {
            this.ctx = this.CanvasElement.getContext("2d");
        }
        this.ctx.imageSmoothingEnabled = false;
        var thisClass = this;
        this.DrawCodeCount = 0;
        var fLength = thisClass.Functions.length;
        if (this.AllowClip) {
            thisClass.ctx.save();
        }
        //function ParseFunctionIndex(strIndex) {
        //    var names = [
        //        "First",//0,
        //        "SetCurrentFont",//1,
        //        "SetCurrentBrush",//2,
        //        "SetCurrentPen",//3,
        //        "AddPage",//4,
        //        "DrawLine",//5,
        //        "DrawString",//6,
        //        "DrawChar",//7,
        //        "DrawRoundRectangle",//8,
        //        "DrawRectangle",//9,
        //        "FillRectangle",//10,
        //        "DrawEllipse",//11,
        //        "FillEllipse",//12,
        //        "CheckVersion",//13,
        //        "SetTransform",//14,
        //        "DrawImageExt",//15,
        //        "Save",//16,
        //        "Restore",//17,
        //        "FontTable",//18,
        //        "ColorTable",//19,
        //        "PenTable",//20,
        //        "DrawImageXY",//21,
        //        "DrawImage",//22,
        //        "SetPageUnit",//23,
        //        "TranslateTransform",//24,
        //        "RotateTransform",//25,
        //        "ScaleTransform",//26,
        //        "SetClip",//27,
        //        "ResetClip",//28,
        //        "ImageTable",//29,
        //        "BrushTable",//30,
        //        "DrawLines",//31,
        //        "UpdateClearRectangle"];
        //    for (var iCount = names.length - 1; iCount >= 0; iCount--) {
        //        if (strIndex == names[iCount]) {
        //            return iCount;
        //        }
        //    }
        //    return -1;
        //};
        var thisReader = this.Reader;
        this.ctx.imageSmoothingEnabled = true;
        while (thisReader.EOF == false && this._Cancel != true ) {
            //var f1 = thisReader.ReadByte();
            //var f2 = thisReader.ReadByte();
            //if (f1 != 0xff && f2 != 0xff) {
            //    console.log("aaaa222 " + thisReader.Position);
            //}
            var fIndex = thisReader.ReadByte();

            //if (typeof (fIndex) == "number") {
            //    console.log("zzz");
            //}
            //fIndex = ParseFunctionIndex(fIndex);

            if (fIndex == 32) {
                if (this.RectangleForClear != null) {
                    this.ctx.clearRect(
                        this.RectangleForClear[0],
                        this.RectangleForClear[1],
                        this.RectangleForClear[2],
                        this.RectangleForClear[3]);
                    this.RectangleForClear = null;
                }
                continue;
            }
            if (fIndex >= 0 && fIndex < fLength) {
                var func = thisClass.Functions[fIndex];
                if (func == null) {
                    throw "不支持的模块编号:" + fIndex;
                }
                thisClass.DrawCodeCount++;
                func.call(thisClass, thisReader);
                if (fIndex == this.FunctionIndex_ImageTable) {
                    // 遇到图片库，则需要等待图片数据加载完毕，暂时退出
                    WriterControl_Task.AddTaskFast(this);
                    return false;
                }
            }
            else {
                throw "不支持的模块编号:" + fIndex;
            }
        }
        if (thisReader.EOF) {
            // 任务完毕，清空数据
            //this.__RemoveTask(tasks, this);
            if (this.AllowClip) {
                if (this.SaveCount > 0) {
                    while (this.SaveCount > 0) {
                        this.ctx.restore();
                        this.SaveCount--;
                    }
                }
                this.ctx.restore();
            }
            if (this.DoubleBuffer == true && this.TempElementForDoubleBuffer != null) {
                // 提交缓冲的结果
                var ctx2 = this.CanvasElement.getContext("2d");
                var x1 = this.DoubleBufferBounds[0];
                var y1 = this.DoubleBufferBounds[1];
                var w1 = this.DoubleBufferBounds[2];
                var h1 = this.DoubleBufferBounds[3];
                this.DoubleBufferBounds = null;
                ctx2.imageSmoothingEnabled = true;
                ctx2.clearRect(x1,y1,w1,h1);
                ctx2.drawImage(
                    this.TempElementForDoubleBuffer,
                    x1,y1,w1,h1,
                    x1,y1,w1,h1);
                this.TempElementForDoubleBuffer = null;
            }
            if (typeof (this.EventAfterDraw) == "function") {
                // 触发事件
                var func = this.EventAfterDraw;
                this.EventAfterDraw = null;
                func.call(this, this);
            }
            this.CanvasElement = null;
            this.Reader = null;
            this.ctx = null;
            this.ImageTable = null;
            this.BrushTable = null;
            this.ColorTable = null;
            this.FontTable = null;
            return true;
        }
        else {
            return false;
        }
    }
};
