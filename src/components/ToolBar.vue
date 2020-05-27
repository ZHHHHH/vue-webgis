<!--  -->
<template>
  <div>
    <el-button-group class="toolbar">
      <el-button
        type="primary"
        icon="el-icon-s-order"
        style="border:none;margin-right:1px;border-radius: 2px;"
        @click="visible = true"
        >地图图层</el-button
      >
      <el-dropdown trigger="click">
        <el-button
          type="primary"
          icon="el-icon-s-tools"
          style="border:none;border-radius: 2px;"
        >
          工具<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>地图测量</el-dropdown-item>
          <el-dropdown-item>坐标定位</el-dropdown-item>
          <el-dropdown-item>耕地质量</el-dropdown-item>
          <el-dropdown-item>属性查询</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-button-group>

    <JsPanel
      :visible="visible"
      :options="panelOptions"
      @close="visible = false"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        node-key="id"
        ref="tree"
        @check-change="checkchange"
        :default-checked-keys="defaultcheckedkeys"
        icon-class="el-icon-platform-eleme"
        show-checkbox
      >
      </el-tree>
    </JsPanel>
  </div>
</template>

<script>
import "jspanel4/dist/jspanel.min.css";
import { JsPanel } from "vue-js-panel";
import {
  TreeData,
  defaultcheckedkeys,
  changeLayer
} from "../assets/js/layer.js";

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
        headerTitle: "图层树目录",
        theme: "#339999",
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
  mounted() {},
  methods: {
    checkchange: function(node, Checked, childChecked) {
      let nodes = null;
      if (node.hasOwnProperty("layerId")) {
        console.log(this.$refs.tree.getHalfCheckedNodes().concat(node));
        let pnode = this.$refs.tree.getHalfCheckedNodes().concat(node)[0];
        let checknode = this.$refs.tree.getCheckedNodes(true);
        nodes = checknode.filter(x => {
          return pnode.children.some(y => {
            return x.id == y.id;
          });
        });
      }
      changeLayer(node, Checked, nodes);
    }
  }
};
</script>

<style scoped>
.toolbar {
  position: fixed;
  right: 0.3%;
  top: 0.5%;
}
</style>
