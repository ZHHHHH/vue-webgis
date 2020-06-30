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
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ToolBar from "@/components/ToolBar.vue";
import { getMapConfig } from "../assets/js/api";
import { createMap, loadWidget } from "../assets/js/main";
import { loadLayer } from "../assets/js/layer.js";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

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

<style>
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
.leaflet-control-minimap {
  opacity: 0.7;
}
</style>
