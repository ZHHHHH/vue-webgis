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
import "leaflet-navbar/Leaflet.NavBar.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "font-awesome/css/font-awesome.css";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-geosearch/assets/css/leaflet.css";

import L from "leaflet";
import iconLayers from "../assets/plug/leaflet-iconlayers/iconLayers.js";
import chinaProvider from "leaflet.chinatmsproviders";
import "../assets/plug/L.Control.MousePosition/L.Control.MousePosition.js";
import minimap from "leaflet-minimap";
import navbar from "leaflet-navbar";
import Fullscreen from "leaflet-fullscreen";
import locate from "leaflet.locatecontrol";
import toolbar from "leaflet-toolbar";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { initMap } from "../assets/js/basemap.js";

export default {
  name: "map",
  data() {
    return {
      map: {}
    };
  },
  mounted() {
    const searchControl = new GeoSearchControl({
      style: "button",
      showMarker: true,
      showPopup: true,
      searchLabel: "请输入要搜索的地方",
      notFoundMessage: "无结果",
      autoClose: true,
      autoComplete: true,
      keepResult: true,
      provider: new OpenStreetMapProvider()
    });
    this.map = initMap(iconLayers, searchControl);
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
