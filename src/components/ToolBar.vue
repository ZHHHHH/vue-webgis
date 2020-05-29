<!--  -->
<template>
  <div>
    <el-button-group class="toolbar">
      <el-button
        type="primary"
        icon="el-icon-s-grid"
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
          <el-dropdown-item v-for="(item, index) in tools" :key="index">
            <li :class="item.icon"></li>
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-button-group>

    <LayerTree :visible.sync="visible" />
  </div>
</template>

<script>
import LayerTree from "../components/LayerTree";
import { getToolConfig } from "../assets/js/api";

export default {
  data() {
    return {
      visible: false,
      tools: []
    };
  },
  components: {
    LayerTree
  },
  mounted() {
    getToolConfig().then(config => {
      this.tools = config.tools;
    });
  },
  methods: {}
};
</script>

<style scoped>
.toolbar {
  position: fixed;
  right: 0.3%;
  top: 0.5%;
}
</style>
