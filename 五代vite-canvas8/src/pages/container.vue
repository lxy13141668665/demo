<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button size="small" @click="addTab(editableTabsValue)">
        add tab
      </el-button>
    </div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{ item.content }}
        <div id="myWriterControl2" dctype="WriterControlForWASM">
          正在加载...
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    let tabIndex = 2;
    const editableTabsValue = ref("2");
    const editableTabs = ref([
      {
        title: "Tab 1",
        name: "1",
        content: "Tab 1 content",
      },
      {
        title: "Tab 2",
        name: "2",
        content: "Tab 2 content",
      },
    ]);
    const addTab = (targetName) => {
      const newTabName = `${++tabIndex}`;
      editableTabs.value.push({
        title: "New Tab" + tabIndex,
        name: newTabName,
        content: "New Tab" + tabIndex + " content",
      });
      editableTabsValue.value = newTabName;
    };
    const removeTab = (targetName) => {
      const tabs = editableTabs.value;
      let activeName = editableTabsValue.value;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      editableTabsValue.value = activeName;
      editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
    };
    return {
      tabIndex,
      editableTabsValue,
      editableTabs,
      addTab,
      removeTab,
    };
  },
  mounted() {
    window.WriterControl_OnLoad = function (rootElement) {
      console.log(rootElement);
    };
  },
};
</script>
<style></style>
