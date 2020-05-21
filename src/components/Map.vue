<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "../assets/plug/leaflet-iconlayers/iconLayers.css";
import "../assets/plug/L.Control.MousePosition/L.Control.MousePosition.css";
import "leaflet-minimap/src/Control.MiniMap.css";

import L from "leaflet";
import iconLayers from "../assets/plug/leaflet-iconlayers/iconLayers.js";
import chinaProvider from "leaflet.chinatmsproviders";
import "../assets/plug/L.Control.MousePosition/L.Control.MousePosition.js";
import minimap from "leaflet-minimap";
import { initMap } from "../assets/js/basemap.js";

export default {
  name: "map",
  data() {
    return {
      map: {}
    };
  },
  mounted() {
    this.map = initMap(iconLayers);
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
</style>
