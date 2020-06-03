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
export function addScale(control) {
  L.control.scale(control.options).addTo(store.state.map);
}
//添加鼠标位置控件
export function addMousePosition(control) {
  L.control.mousePosition(control.options).addTo(store.state.map);
}
//添加导航栏
export function addNavbar(control) {
  L.control.navbar(control.options).addTo(store.state.map);
}
//添加定位
export function addLocate(control) {
  L.control.locate(control.options).addTo(store.state.map);
}
//添加全屏
export function addFullscreen(control) {
  store.state.map.addControl(new L.Control.Fullscreen(control.options));
}
//添加鹰眼图;
let minimap;
export function addMinimap(control, config) {
  minimap = L.control.minimap(
    createBaseMap(control.defaultType, config),
    control.options
  );
  minimap.addTo(store.state.map);
}
//添加搜索功能
export function AddGeoSearch(control) {
  control.options["provider"] = new OpenStreetMapProvider();
  let searchControl = new GeoSearchControl(control.options);
  store.state.map.addControl(searchControl);
}
//添加底图切换功能
export function AddiconLayers(control, config) {
  var iconLayersControl = iconLayers(baseMap, control.options);
  iconLayersControl.addTo(store.state.map);
  iconLayersControl.on("activelayerchange", function(e) {
    var baselayer = createBaseMap(
      e.target._layers[e.target._activeLayerId].baseType,
      config
    );
    minimap.changeLayer(baselayer);
  });
}
