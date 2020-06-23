<!--  -->
<template>
  <div>
    <JsPanel :visible="visible" :options="panelOptions" @close="setVisible">
      <el-tree
        :data="data"
        :props="defaultProps"
        :default-expand-all="true"
        node-key="id"
        ref="tree"
        @check-change="checkchange"
        :default-checked-keys="defaultcheckedkeys"
        show-checkbox
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span> <img :src="data.icon" /> {{ node.label }}</span>
        </span>
      </el-tree>
    </JsPanel>
    <!-- <ContextMenu ref="ContextMenu" /> -->
  </div>
</template>

<script>
import "jspanel4/dist/jspanel.min.css";
import { JsPanel } from "vue-js-panel";
// import ContextMenu from "../components/ContextMenu";
import { TreeData, defaultcheckedkeys, changeLayer } from "../assets/js/layer";

export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      data: TreeData,
      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultcheckedkeys: defaultcheckedkeys,
      panelOptions: {
        headerLogo:
          "<li class='el-icon-s-grid' style='margin-left:8px;cursor:pointer;'></li>",
        headerTitle: "图层树目录",
        animateIn: "jsPanelFadeIn",
        theme: "#139ceb",
        contentSize: {
          width: 220,
          height: 500
        },
        headerControls: "closeonly",
        position: {
          my: "right-top",
          at: "right-top",
          offsetX: -10,
          offsetY: 50
        }
      }
    };
  },
  components: {
    JsPanel
    // ContextMenu
  },

  methods: {
    setVisible: function() {
      this.$emit("update:visible", false);
    },
    checkchange: function(node, Checked, childChecked) {
      if (node.layer == null) {
        return;
      }
      let layerId = null;
      if (node.hasOwnProperty("layerId")) {
        layerId = node.layerId;
      }
      changeLayer(node, Checked, layerId);
    }
    // rightClick(e, data, node, comp) {
    //   let menu = this.$refs.ContextMenu;
    //   menu.rightMenu = { top: e.pageY + "px", left: e.pageX + "px" };
    //   menu.tmDisplay = true;
    //   menu.node = node;
    //   menu.nodedata = data;
    //   document.onclick = function(ev) {
    //     if (ev.target !== document.getElementById("perTreeMenu")) {
    //       menu.tmDisplay = false;
    //     }
    //   };
    // }
  }
};
</script>
<style scoped></style>
