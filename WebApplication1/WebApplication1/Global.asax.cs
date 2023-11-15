using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace WebApplication1
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            // 设置数据文件保存路径,将在该目录下创建类似dcsoft_serverlog_20200601.dat数据文件
            // 每天一个文件。这个文件可以用于在线分析，也可以复制到他处进行离线分析。
            DCSoft.DCWebServerLog.StartSpecifyWorkDirectory(this.Server.MapPath("."));
            
        }
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            // 开始记录一次请求
            DCSoft.DCWebServerLog.BeginRequest(
                this.Request,
                this.Request.RawUrl,
                this.Request.ContentLength);
        }
        protected void Application_EndRequest(object sender, EventArgs e)
        {
            // 结束一次记录
            DCSoft.DCWebServerLog.EndRequest(this.Request, 0);
        }
        protected void Application_Error(object sender, EventArgs e)
        {
            // 记录一次错误信息
            DCSoft.DCWebServerLog.SetErrorMessage(this.Request, this.Server.GetLastError());
        }
        protected void Session_Start(object sender, EventArgs e)
        {
            // 开始创建一个客户端连接信息，累计ASP.NET并发数
            DCSoft.DCWebServerLog.SessionStart(
                this.Session.SessionID,
                this.Session.Timeout);
        }
        protected void Session_End(object sender, EventArgs e)
        {
            // 结束一个客户端连接信息，更新ASP.NET并发数。
            DCSoft.DCWebServerLog.SessionEnd(this.Session.SessionID);
        }
    }
}