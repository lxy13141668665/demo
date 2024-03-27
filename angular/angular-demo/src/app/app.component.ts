import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
var xmlstr = `<XTextDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" EditorVersionString="2023.12.30.0"><XElements><Element xsi:type="XTextHeader"><InnerID>6044</InnerID><AcceptTab>true</AcceptTab><XElements><Element xsi:type="XParagraphFlag" StyleIndex="0"><InnerID>6050</InnerID><AutoCreate>true</AutoCreate></Element></XElements></Element><Element xsi:type="XTextBody"><InnerID>6045</InnerID><AcceptTab>true</AcceptTab><XElements><Element xsi:type="XString"><InnerID>6284</InnerID><Text>解放后圣诞节回复接口啥的分开交电话费接口的和个就开始地方换个接口第三方和个就开始地方换个接口打水光可接受的干就开始逗号隔开的机会更健康读后感接口的复合弓的接口返回跟数据库华工科技稍等会顾客就是的这公司客户收到货更深刻的家伙顾客就是自动回复肯定是刚开始读后感山东科技干多久个获得数据开会跟四代接口换个接口是的还给节点凤凰国际开始的换个接口稍等会根据四代甘家口大厦干多久开会跟会计师对方个活动价格华东数控建国后就开始大富豪更深刻接电话公司电话公开圣诞节回公司</Text></Element><Element xsi:type="XParagraphFlag"><InnerID>6049</InnerID><AutoCreate>true</AutoCreate></Element></XElements></Element><Element xsi:type="XTextFooter"><InnerID>6046</InnerID><AcceptTab>true</AcceptTab><XElements><Element xsi:type="XParagraphFlag"><InnerID>6051</InnerID><AutoCreate>true</AutoCreate></Element></XElements></Element></XElements><SerializeParameterValue>true</SerializeParameterValue><ContentStyles><Default xsi:type="DocumentContentStyle"><FontName>宋体</FontName><FontSize>12</FontSize></Default><Styles><Style Index="0"><FontName>宋体</FontName><FontSize>12</FontSize><Align>Center</Align></Style></Styles></ContentStyles><Info><LicenseText>未注册|Unregister</LicenseText><CreationTime>1980-01-01T00:00:00+08:00</CreationTime><LastModifiedTime>2024-01-02T15:36:41+08:00</LastModifiedTime><LastPrintTime>1980-01-01T00:00:00+08:00</LastPrintTime><Operator>DCSoft.Writer Version:2023.12.30.0</Operator><NumOfPage>1</NumOfPage></Info><BodyText>解放后圣诞节回复接口啥的分开交电话费接口的和个就开始地方换个接口第三方和个就开始地方换个接口打水光可接受的干就开始逗号隔开的机会更健康读后感接口的复合弓的接口返回跟数据库华工科技稍等会顾客就是的这公司客户收到货更深刻的家伙顾客就是自动回复肯定是刚开始读后感山东科技干多久个获得数据开会跟四代接口换个接口是的还给节点凤凰国际开始的换个接口稍等会根据四代甘家口大厦干多久开会跟会计师对方个活动价格华东数控建国后就开始大富豪更深刻接电话公司电话公开圣诞节回公司</BodyText><LocalConfig /><PageSettings /></XTextDocument>`;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<button (click)="refreshWriter()">刷新</button>
    <button (click)="FileNew()">新建</button>
    <div id="container"></div>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-learn';
  FileNew() {
    var ctl = document.getElementById('myWriterControl');
    if ((ctl as any).getModified()) {
      let res = confirm('内容已经改变，是否确认要清空？');
      if (res == true) {
        (ctl as any).DCExecuteCommand('FileNew', false, null);
      }
    } else {
      (ctl as any).DCExecuteCommand('FileNew', false, null);
    }
  }
  refreshWriter() {
    var ctl = document.getElementById('myWriterControl');
    (ctl as any).RefreshDocument();
  }
  ngOnInit() {
    (window as any).WriterControl_OnLoad = function (ctl: any) {
      //此方法要写在加载文档的前面
      (ctl as any).DocumentLoad = function (eventSender: any, args: any) {
        console.log('文件加载完毕', 1111111111111);
      };
      (ctl as any).LoadDocumentFromString(xmlstr, 'xml');
      //此方法要写在加载文档的前面
      (ctl as any).ondocumentclick = function (eventSender: any, args: any) {
        console.log('元素点击事件', 1111111111111);
      };
    };
    const scriptUrls = [
      'http://www.dcwriter.cn:8099/ServicePage.aspx?wasmres=dcwriter5.js',
      'http://www.dcwriter.cn:8099/Jquery/jquery-1.7.2.min.js',
    ];
    const scriptPromises = scriptUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    });
    Promise.all(scriptPromises)
      .then(() => {
        console.log(11111111111);
        // //autoCreateControl属性为false时禁止自动加载，true会自动加载
        // var content = `<div id="myWriterControl"  dctype="WriterControlForWASM" autoCreateControl="false">正在加载...</div>`;
        // (document as any).getElementById('container').innerHTML = content;
        // //autoCreateControl属性为true时不需要以下代码
        // var newCtl = document.getElementById('myWriterControl');
        // //  EventBeforeCreateControl方法为js加载完成之后除法，避免window.CreateWriterControlForWASM方法未挂载
        // (newCtl as any).EventBeforeCreateControl = function () {
        //   (window as any).CreateWriterControlForWASM(newCtl); //手动加载编辑器
        // };
      })
      .catch((error) => {
        console.error('Failed to load scripts:', error);
      });
  }

  ngOnDestroy() {
    // 在组件销毁之前执行的逻辑
    console.log('Component destroyed');
  }
}
