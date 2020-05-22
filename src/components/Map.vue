<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import store from "@/store";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addScale, addMousePosition, addNavbar, addLocate, addFullscreen, addMinimap, AddGeoSearch, AddiconLayers } from '../assets/js/widget.js';

export default {
  name: "map",
  data () {
    return {};
  },
  created () {
  },
  mounted () {
    this.initMap();
    addMousePosition();
    addMinimap();
    addScale();
    AddiconLayers();
    addNavbar();
    addLocate();
    addFullscreen();
    AddGeoSearch();
  },
  methods: {
    initMap: function () {
      var map = L.map("map", {
        center: [39.54, 116.23],
        zoom: 8,
        zoomControl: true,
        attributionControl: false
      });
      store.commit('setMap', map);
    }
  }
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
