<!--  -->
<template>
  <div></div>
</template>

<script>
import "../assets/plug/leaflet-iconlayers/iconLayers.css";
import "../assets/plug/L.Control.MousePosition/L.Control.MousePosition.css";
import "leaflet-minimap/src/Control.MiniMap.css";
import "leaflet-navbar/Leaflet.NavBar.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "font-awesome/css/font-awesome.css";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-geosearch/assets/css/leaflet.css";

import iconLayers from "../assets/plug/leaflet-iconlayers/iconLayers.js";
import "../assets/plug/L.Control.MousePosition/L.Control.MousePosition.js";
import minimap from "leaflet-minimap";
import navbar from "leaflet-navbar";
import Fullscreen from "leaflet-fullscreen";
import locate from "leaflet.locatecontrol";
import toolbar from "leaflet-toolbar";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

import { createBaseMap } from "../components/BaseMap";

export default {
  data () {
    return {
      minimap: {}
    };
  },
  props: {
    map: {
      type: Object,
      required: true
    }
  },

  created () {
    this.addScale();
    this.addMousePosition();
    this.addNavbar();
    this.addLocate();
    this.addFullscreen();
    this.addMinimap();
    this.AddGeoSearch();
  },
  components: {},

  methods: {
    //添加比例尺
    addScale: function () {
      L.control.scale({ position: "bottomright" }).addTo(this.map);
    },
    //添加鼠标位置控件
    addMousePosition: function () {
      L.control.mousePosition().addTo(this.map);
    },
    //添加导航栏
    addNavbar: function () {
      L.control
        .navbar({
          position: "topleft",
          forwardTitle: "返回前一视图",
          backTitle: "返回后一视图",
          homeTitle: "返回默认视图"
        })
        .addTo(this.map);
    },
    //添加定位
    addLocate: function () {
      L.control
        .locate({
          position: "topleft",
          strings: {
            title: "定位至当前所在位置",
            metersUnit: "米",
            feetUnit: "英尺",
            popup: "你距离到这点不到{distance}{unit}"
          }
        })
        .addTo(this.map);
    },
    //添加全屏
    addFullscreen: function () {
      this.map.addControl(
        new L.Control.Fullscreen({
          title: { false: "进入全屏", true: "退出全屏" }
        })
      );
    },
    //添加鹰眼图;
    addMinimap: function () {
      this.minimap = L.control.minimap(
        createBaseMap("TianDiTu.Normal.Map", key),
        {
          position: "bottomright",
          toggleDisplay: true,
          zoomAnimation: true,
          width: 400,
          height: 250
        }
      );
      this.minimap.addTo(this.map);
    },
    //添加搜索功能
    AddGeoSearch: function () {
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
      this.map.addControl(searchControl);
    }
  },

  computed: {},

  mounted: {},

  methods: {}
};

export function AddIconLayers () {
  var iconLayersControl = iconLayers(baseMap, {
    maxLayersInRow: 4,
    position: "bottomleft"
  });
  iconLayersControl.addTo(this.map);
  iconLayersControl.on("activelayerchange", function (e) {
    var baselayer = createBaseMap(
      e.target._layers[e.target._activeLayerId].baseType,
      key
    );
    this.minimap.changeLayer(baselayer);
  });
}
</script>
<style scoped></style>
