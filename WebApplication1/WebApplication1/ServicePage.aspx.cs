using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DCSoft.Writer.Controls;
using DCSoft.Writer.Dom;
using System.IO;
using DCSoft.Writer.Controls;

namespace WebApplication1
{
    public partial class ServicePage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            XTextDocumentList list = new XTextDocumentList();
            

            WebWriterControlServicePageExecuter executer = new WebWriterControlServicePageExecuter();
            executer.EnabledCrossDomain = true;

            //executer.SpecifyWebCommandBlackList = "$blank$";

            //executer.SpecifyWebCommandBlackList = "setregistercodeindex,setregisgercode";

            executer.EventReadFileContent += new DCSoft.Writer.WriterReadFileContentEventHandler(My_ReadFileContent);
            executer.EventSaveFileContent += new DCSoft.Writer.WriterSaveFileContentEventHandler(My_SaveFileContent);
            //executer.RegisterCode = "05E50E21CF605AE39E17D1D97709A9ED135FA9E22BE686E0E8D71BDC6BCFF1EDE491C95FCFE18003DFE4E6CF75B24995BAEB68D20C99D385EA898FE8CA31D2D89A0B678B707FB24B37D4ADFB929F32126793C01BF3C0A24B9F8B1BADD70B4B5B451491FBB60EEF0C4953F4DEE9F08115984D341B93118A026D364BAA3578EEE29BD1F1F4703CC8AB1C5804444AC32FF500DEB84C4D64A89AA6C6CE1C5467FECD78";
            //executer.SetAllowSmallPiecesWhenMergeDocument(true);
            //DCSoft.Writer.Dom.DocumentContentMergerBase.
            executer.HandleService(this);

            //Response.Write("sdfsdfsfafdsafsaf");
        }

        protected void Page_PreInit(object sender, EventArgs e)
        {
            //XTextLabelElement label = new XTextLabelElement();
            //label.GetDisplayText(0);

            
        }

        //protected void Page_PreLoad(object sender, EventArgs e)
        //{
        //    string header = Request.Headers.Get("origin");
        //    if(header == null  || header.Length == 0)
        //    {
        //        header = "*";
        //    }

        //    Response.AddHeader(
        //            "Access-Control-Allow-Credentials",
        //            "true");
        //    //wyc20220512：添加chrome新策略
        //    Response.AddHeader(
        //        "Access-Control-Allow-Private-Network",
        //        "true");
        //    ///////////////////////////////
        //    //wyc2022830：添加允许前端设置的自定义请求头
        //    Response.AddHeader(
        //        "Access-Control-Expose-Headers",
        //        "dcversion");
        //    ///////////////////////////////
        //    Response.AddHeader("P3P", "CP=CAO PSA OUR");
        //    Response.AddHeader(
        //        "Access-Control-Allow-Origin", header);
        //    Response.AddHeader(
        //        "Access-Control-Allow-Methods",
        //        "POST,GET,PUT,DELETE,OPTIONS");
        //    Response.AddHeader(
        //        "Access-Control-Allow-Headers",
        //        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        //    Response.AddHeader(
        //        "Access-Control-Max-Age",
        //        "0");
        //    ///*Origin,No-Cache,X-Requested-With,If-Modified-Since,Pragma,Last-Modified,Cache-Control,Expires,Content-Type,X-E4M-With,userId,token*/
        //    //var str_Origin_No_Cache_X_Requested_Wit680 = "h7ujrKWj4oG//JGyt72z+4D0iL6tqLuslISGzrOMko/EoIzGoYKKhpaYl5fZpp+Zm5zWq46cmZJhLU5id3ErSmdtY21laGojU3Bxe3E4VXh2bWh0cDFbZ1BIUEZXCWVIRl1PRVgAelZAVB5rGXACehVuU09UEUtMJTMLJ2gxKSwtJw==";
        //    //var bsOrigin_No_Cache_X_Requested_Wit680 = Convert.FromBase64String(str_Origin_No_Cache_X_Requested_Wit680);
        //    //for (int i99087 = 0; i99087 < 130; i99087++)
        //    //{ bsOrigin_No_Cache_X_Requested_Wit680[i99087] = (byte)(bsOrigin_No_Cache_X_Requested_Wit680[i99087] ^ (200 + i99087)); }
        //    //str_Origin_No_Cache_X_Requested_Wit680 = System.Text.Encoding.UTF8.GetString(bsOrigin_No_Cache_X_Requested_Wit680);
        //    ///********************************************/

        //    //host.SetResponseHeader(
        //    //    "Access-Control-Allow-Credentials",
        //    //    "true");

        //    Response.AddHeader(
        //        "Access-Control-Allow-Headers",
        //        "Origin,No-Cache,X-Requested-With,If-Modified-Since,Pragma,Last-Modified,Cache-Control,Expires,Content-Type,X-E4M-With,userId,token");

        //    Response.AddHeader("XDomainRequestAllowed", "1");
        //}


        private void My_ReadFileContent(object sender, DCSoft.Writer.WriterReadFileContentEventArgs args)
        {
            
            if(args.FileName=="前端传来的某个值")
            {
                XTextDocument doc = new XTextDocument();
                doc.LoadFromFile("你加载的文档XML的本地全路径", "xml");

                foreach (DocumentContentStyle style in doc.ContentStyles.Styles)
                {
                    if (style.FontSize == 9)
                    {
                        style.FontSize = 9.1f;
                    }
                }
                args.ResultBinary = doc.SaveToBinary("xml");
            }

            if(args.FileName == "TESTLOADMULIPLY")
            {
                string[] files = Directory.GetFiles(
                    this.MapPath("/BIGFILES"),
                    "*.xml");
                XTextDocument document = null;
                if (files.Length > 0)
                {
                    document = new XTextDocument();
                    for (int i = 0; i < files.Length; i++)
                    {
                        if (i == 0)
                        {
                            document.LoadFromFile(files[i], "xml");
                        }else
                        {
                            document.LoadUseAppendModeFromFileName(files[i], "xml");
                        }
                    }
                }
                args.ResultBinary = document.SaveToBinary("xml");
            }
            else if(args.FileName == "TESTLOADSINGLE")
            {
                string filename = this.Server.MapPath("BIGFILE.xml");
                if (System.IO.File.Exists(filename))
                {
                    args.ResultBinary = System.IO.File.ReadAllBytes(filename);
                }
            }
            else if (args.FileName != "LoadSavedFile")
            {
                string filename = this.Server.MapPath(args.FileName);
                args.ResultBinary = File.ReadAllBytes(filename);
            }
            else
            {
                string filename = this.Server.MapPath("aaa20190410.xml");
                args.ResultBinary = File.ReadAllBytes(filename);
                args.Message = "加载保存的文档";
            }

            ////加载主文档
            //XTextDocument doc1 = new XTextDocument();
            //doc1.LoadFromFile("主文档文件名", "xml");

            ////合并其它文档
            //doc1.AppendChildElement(new XTextPageBreakElement());//让下面的文档另起一页
            //doc1.LoadUseAppendModeFromFileName("第二个文档的文件名", "xml");
            //doc1.AppendChildElement(new XTextPageBreakElement());//让下面的文档另起一页
            //doc1.LoadUseAppendModeFromFileName("第三个文档的文件名", "xml");

            ////返回前端
            //args.ResultBinary = doc1.SaveToBinary("xml");

        }

        private void My_SaveFileContent(object sender, DCSoft.Writer.WriterSaveFileContentEventArgs args)
        {
            string filename = this.Server.MapPath("aaa20190410.xml");
            args.Document.RefreshDocument();
            args.Document.SaveToFile(filename, args.FileFormat);
            args.Message = "汪汪汪";
            args.Result = true;
            
        }
    }
}