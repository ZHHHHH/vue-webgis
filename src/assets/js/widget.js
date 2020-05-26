import "../plug/L.Control.MousePosition/L.Control.MousePosition.css";
import "leaflet-minimap/src/Control.MiniMap.css";
import "leaflet-navbar/Leaflet.NavBar.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "font-awesome/css/font-awesome.css";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-geosearch/assets/css/leaflet.css";
import "../plug/leaflet-iconlayers/iconLayers.css";

import store from "@/store";
import "../plug/L.Control.MousePosition/L.Control.MousePosition.js";
import "leaflet-minimap";
import "leaflet-navbar";
import "leaflet-fullscreen";
import "leaflet.locatecontrol";
import "leaflet-toolbar";
import iconLayers from "../plug/leaflet-iconlayers/iconLayers.js";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { createBaseMap, baseMap } from "./main";

//添加比例尺
export function addScale(position) {
  L.control.scale({ position: position }).addTo(store.state.map);
}
//添加鼠标位置控件
export function addMousePosition(position) {
  L.control.mousePosition({ position: position }).addTo(store.state.map);
}
//添加导航栏
export function addNavbar(position) {
  L.control
    .navbar({
      position: position,
      forwardTitle: "返回前一视图",
      backTitle: "返回后一视图",
      homeTitle: "返回默认视图"
    })
    .addTo(store.state.map);
}
//添加定位
export function addLocate(position) {
  L.control
    .locate({
      position: position,
      strings: {
        title: "定位至当前所在位置",
        metersUnit: "米",
        feetUnit: "英尺",
        popup: "你距离到这点不到{distance}{unit}"
      }
    })
    .addTo(store.state.map);
}
//添加全屏
export function addFullscreen(position) {
  store.state.map.addControl(
    new L.Control.Fullscreen({
      title: { false: "进入全屏", true: "退出全屏" },
      position: position
    })
  );
}
//添加鹰眼图;
let minimap;
export function addMinimap(position, config) {
  minimap = L.control.minimap(createBaseMap("TianDiTu.Normal.Map", config), {
    position: position,
    toggleDisplay: true,
    zoomAnimation: true,
    width: 400,
    height: 250
  });
  minimap.addTo(store.state.map);
}
//添加搜索功能
export function AddGeoSearch(position) {
  const searchControl = new GeoSearchControl({
    style: "button",
    showMarker: true,
    showPopup: true,
    searchLabel: "请输入要搜索的地方",
    notFoundMessage: "无结果",
    autoClose: true,
    autoComplete: true,
    keepResult: true,
    provider: new OpenStreetMapProvider(),
    position: position
  });

  store.state.map.addControl(searchControl);
}
//添加底图切换功能
export function AddiconLayers(position, config) {
  var iconLayersControl = iconLayers(baseMap, {
    maxLayersInRow: 4,
    position: position
  });
  iconLayersControl.addTo(store.state.map);
  iconLayersControl.on("activelayerchange", function(e) {
    var baselayer = createBaseMap(
      e.target._layers[e.target._activeLayerId].baseType,
      config
    );
    minimap.changeLayer(baselayer);
  });
}
