<template>
  <div>
    <div id="map" style="z-index:0"></div>
    <ToolBar />
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import store from "@/store";
import L from "leaflet";
import ToolBar from "@/components/ToolBar.vue";
import { getMapConfig } from "../assets/js/api";
import { createMap, loadWidget } from "../assets/js/main";
import { loadLayer } from "../assets/js/layer.js";

export default {
  data () {
    return {};
  },
  created () { },
  mounted () {
    getMapConfig().then(config => {
      createMap(config.map);
      loadWidget(config.map);
      loadLayer(config.map);
    });
  },
  components: {
    ToolBar
  },
  methods: {}
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
