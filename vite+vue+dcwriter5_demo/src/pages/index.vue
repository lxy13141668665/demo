<template>
  <div>
    <el-button @click="ShowAboutDialog" type="primary">关于</el-button>
    <el-button @click="FileOpen" type="primary">打开</el-button>
    <el-button @click="ClearContent" type="primary">新建</el-button>
    <el-button @click="changeButton" type="primary">Primary</el-button>
    <div id="myWriterControl" dctype="WriterControlForWASM">正在加载...</div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const name = "asdaasda";
    const visible = ref(false);
    const ctl = reactive({});
    function changeButton() {
      visible.value = !visible.value;
      console.log(visible.value, "=============vi");
    }
    /**获得当前的编辑器控件对象 */
    function GetCurrentWriterControl() {
      return document.getElementById("myWriterControl");
    }
    function FileOpen() {
      let ctl = GetCurrentWriterControl();
      //window.CreateWriterControlForWASM(newCtl);
      ctl.DCExecuteCommand("fileopen");
    }
    function ShowAboutDialog() {
      let ctl = GetCurrentWriterControl();
      ctl.ShowAboutDialog();
    }
    function ClearContent() {
      let ctl = GetCurrentWriterControl();
      ctl.ClearContent();
    }
    return {
      name,
      visible,
      ctl,
      changeButton,
      GetCurrentWriterControl,
      FileOpen,
      ShowAboutDialog,
      ClearContent,
    };
  },
  mounted() {
    console.log(this.name, "======");
    let that = this;
    window.WriterControl_OnLoad = function (rootElement) {
      console.log(that.GetCurrentWriterControl());
      that.ctl = that.GetCurrentWriterControl();
      console.log(that.ctl);
    };
  },
  methods() {},
};
</script>
<style></style>
