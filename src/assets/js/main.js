import "leaflet.chinatmsproviders";
import store from "@/store";
import {
  addScale,
  addMousePosition,
  addNavbar,
  addLocate,
  addFullscreen,
  addMinimap,
  AddGeoSearch,
  AddiconLayers
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
  let basemaps = config.basemaps;
  for (let map in basemaps) {
    if (!basemaps[map].visible) {
      continue;
    }
    let basicmap = createBaseMap(basemaps[map].type, config);
    let annotionmap;
    if (
      basemaps[map].hasOwnProperty("annotion") &&
      basemaps[map].annotion.visible
    ) {
      annotionmap = createBaseMap(basemaps[map].annotion.type, config);
    }

    baseMap.push({
      title: basemaps[map].name,
      layer:
        annotionmap != null
          ? L.layerGroup([basicmap, annotionmap])
          : L.layerGroup([basicmap]),
      icon: basemaps[map].icon,
      baseType: basemaps[map].type
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
  let controls = config.controls;
  for (var control in controls) {
    if (controls[control].visible) {
      switch (controls[control].type) {
        case "scale":
          addScale(controls[control].position);
          break;
        case "mousePosition":
          addMousePosition(controls[control].position);
          break;
        case "navbar":
          addNavbar(controls[control].position);
          break;
        case "locate":
          addLocate(controls[control].position);
          break;
        case "fullscreen":
          addFullscreen(controls[control].position);
          break;
        case "minimap":
          addMinimap(controls[control].position, config);
          break;
        case "geoSearch":
          AddGeoSearch(controls[control].position);
          break;
        case "iconLayers":
          AddiconLayers(controls[control].position, config);
          break;
      }
    }
  }
}
