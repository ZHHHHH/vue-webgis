<!--  -->
<template>
  <div>
    <JsPanel
      :visible="visible"
      :options="panelOptions"
      @close="visible = false"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        :default-expand-all="true"
        :default-checked-keys="defaultcheckedkeys"
        node-key="id"
        ref="tree"
        @check-change="checkchange"
        show-checkbox
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <img :src="data.icon" />
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </JsPanel>
  </div>
</template>

<script>
import "jspanel4/dist/jspanel.min.css";
import { JsPanel } from "vue-js-panel";
import { TreeData, defaultcheckedkeys, changeLayer } from "../assets/js/layer";

export default {
  data() {
    return {
      visible: false,
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
  },
  methods: {
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
  }
};
</script>
<style scoped></style>
