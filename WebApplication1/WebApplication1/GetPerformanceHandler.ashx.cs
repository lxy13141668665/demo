using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using Open_Newtonsoft_Json;
using Open_Newtonsoft_Json.Linq;
using System.IO;


namespace WebApplication1
{
    /// <summary>
    /// GetPerformanceHandler 的摘要说明
    /// </summary>
    public class GetPerformanceHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            JObject InputObj = new JObject();

            string totalMemory = string.Empty;
            string harddriverusage = string.Empty;
            string cpuusage = string.Empty;
            string workingset = string.Empty;

            //总内存
            Microsoft.VisualBasic.Devices.ComputerInfo info = new Microsoft.VisualBasic.Devices.ComputerInfo();
            double d2 = info.TotalPhysicalMemory / 1024f / 1024f / 1024f;
            totalMemory = Math.Round(d2, 2).ToString() + " GB";

            //硬盘
            DriveInfo[] dinfos = System.IO.DriveInfo.GetDrives();
            for (int i = 0; i < dinfos.Length; i++)
            {
                DriveInfo di = dinfos[i];
                if (di.DriveType == DriveType.Fixed)
                {
                    double d = di.TotalSize / 1024f / 1024f / 1024f;
                    d = Math.Round(d, 2);
                    double dd = di.AvailableFreeSpace / 1024f / 1024f / 1024f;//使用  AvailableFreeSpace ，不使用 TotalFreeSpace
                    dd = Math.Round(dd, 2);
                    harddriverusage = harddriverusage + di.Name + "[" + dd.ToString() + "GB/" + d.ToString() + "GB]";
                    if (i != dinfos.Length - 1)
                    {
                        harddriverusage = harddriverusage + " -- ";
                    }
                }
            }

            //CPU使用率
            System.Diagnostics.PerformanceCounter pc = new System.Diagnostics.PerformanceCounter(
                "Processor",
                "% Processor Time",
                "_Total");
            float v = pc.NextValue(); //需要先取一次
            System.Threading.Thread.Sleep(500);
            //v = pc.NextValue();
            cpuusage = Math.Round( pc.NextValue(),2).ToString() + "%";

            //当前使用内存
            pc = new System.Diagnostics.PerformanceCounter(
                "Process",
                "Working Set - Private",
                System.Diagnostics.Process.GetCurrentProcess().ProcessName);
            v = pc.NextValue();
            System.Threading.Thread.Sleep(100);
            v = pc.NextValue();
            v = v / 1024 / 1024;
            v = (float)Math.Round(v, 2);
            workingset = v.ToString() + "MB";

            InputObj["TotalMemory"] = totalMemory;
            InputObj["HardDrivers"] = harddriverusage;
            InputObj["CPUUsage"] = cpuusage;
            InputObj["WorkingSet"] = workingset;

            context.Response.ContentType = "text/plain";
            context.Response.Write(InputObj.ToString());
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}