<script>

export default{
  data(){

  },
  methods: {
    onload(rootElement){
      console.log(1111,rootElement)
    }
  },
  mounted(){
    //第一种给ctl一个函数在div的onload中调用
    // var ctl = document.getElementById('myWriterControl');
    // if(ctl){
    //   ctl.load = this.onload
    // }

    //第二中直接使用回调函数WriterControl_OnLoad
    window.WriterControl_OnLoad = function(rootElement){
      console.log(rootElement);
    }
  }
}
 
</script>

<template>
  <!-- <div id="myWriterControl" dctype="WriterControlForWASM" onload="this.load(this)" >
      正在加载...
  </div> -->
  <div id="myWriterControl" dctype="WriterControlForWASM">
      正在加载...
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
