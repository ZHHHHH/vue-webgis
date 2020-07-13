import "../plug/leaflet.chinatmsproviders/leaflet.ChineseTmsProviders.js";
import store from "@/store";
import {
  addScale,
  addMousePosition,
  addNavbar,
  addLocate,
  addFullscreen,
  addMinimap,
  AddGeoSearch,
  AddiconLayers,
  AddContextmenu
} from "./widget";
//地图创建
export function createMap(config) {
  let map = L.map("map", {
    center: [config.center.x, config.center.y],
    zoom: config.zoom,
    attributionControl: config.copyright,
    zoomControl: true
  });
  store.commit("setMap", map);
  getBaseMap(config);
}

export let baseMap = [];
//获取底图信息
function getBaseMap(config) {
  for (let map of config.basemaps) {
    if (!map.visible) {
      continue;
    }
    let basicmap = createBaseMap(map.type, config);
    let annotionmap;
    if (map.hasOwnProperty("annotion") && map.annotion.visible) {
      annotionmap = createBaseMap(map.annotion.type, config);
    }

    baseMap.push({
      title: map.name,
      layer:
        annotionmap != null
          ? L.layerGroup([basicmap, annotionmap])
          : L.layerGroup([basicmap]),
      icon: map.icon,
      baseType: map.type
    });
  }
}

//创建底图
export function createBaseMap(type, config) {
  return L.tileLayer.chinaProvider(type, {
    key: config.key,
    maxZoom: config.maxZoom,
    minZoom: config.minZoom
  });
}

//加载地图工具
export function loadWidget(config) {
  for (let control of config.controls) {
    if (!control.visible) {
      continue;
    }
    switch (control.type) {
      case "scale":
        addScale(control);
        break;
      case "mousePosition":
        addMousePosition(control);
        break;
      case "navbar":
        addNavbar(control);
        break;
      case "locate":
        addLocate(control);
        break;
      case "fullscreen":
        addFullscreen(control);
        break;
      case "minimap":
        addMinimap(control, config);
        break;
      case "geoSearch":
        AddGeoSearch(control);
        break;
      case "iconLayers":
        AddiconLayers(control, config);
        break;
      case "contextmenu":
        AddContextmenu(control);
        break;
    }
  }
}
