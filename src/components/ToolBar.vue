<!--  -->
<template>
  <div>
    <el-button-group class="toolbar">
      <el-button
        type="primary"
        icon="el-icon-s-grid"
        style="border:none;margin-right:1px;border-radius: 2px;"
        @click="setLayerTreeVisible"
        >地图图层</el-button
      >
      <el-dropdown trigger="click">
        <el-button
          type="primary"
          icon="el-icon-s-tools"
          style="border:none;border-radius: 2px;"
        >
          工具
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in tools" :key="index">
            <div v-if="item.visible" @click="callModelFun(item)">
              <li :class="item.icon"></li>
              {{ item.name }}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-button-group>

    <LayerTree ref="LayerTree" />
    <Latlng ref="Latlng" />
    <Measurement ref="Measurement" />
  </div>
</template>

<script>
import store from "@/store";
import LayerTree from "../components/LayerTree";
import Latlng from "../components/Latlng";
import Measurement from "../components/Measurement";
import { getToolConfig } from "../assets/js/api";

export default {
  data() {
    return {
      tools: []
    };
  },
  components: {
    LayerTree,
    Latlng,
    Measurement
  },
  mounted() {
    getToolConfig().then(config => {
      this.tools = config.tools;
    });
  },
  methods: {
    setLayerTreeVisible: function() {
      this.$refs.LayerTree.visible = true;
    },
    callModelFun: function(item) {
      eval(`this.${item.method}()`);
    },
    Latlng: function() {
      this.$refs.Latlng.visible = true;
      let center = store.state.map.getCenter();
      this.$refs.Latlng.lat = center.lat.toFixed(6);
      this.$refs.Latlng.lng = center.lng.toFixed(6);
    },
    Measurement: function() {
      this.$refs.Measurement.visible = true;
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
