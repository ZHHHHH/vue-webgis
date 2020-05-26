import store from "@/store";
var esri = require("esri-leaflet");
import "../plug/leaflet-tilelayer-wmts/leaflet-tilelayer-wmts.js";

export let TreeData = [];
export let defaultcheckedkeys = [];
export function loadLayer(config) {
  let Maps = config.operationallayers;
  for (var map in Maps) {
    switch (Maps[map].type) {
      case "arcgis_dynamic":
        loadArcgisService(Maps[map]);
        break;
      case "123":
        break;
    }
  }
}

function loadArcgisService(map) {
  var dynamicMapLayer = esri.dynamicMapLayer({
    url: map.url,
    opacity: map.opacity
  });
  if (map.visible) {
    dynamicMapLayer.addTo(store.state.map);
  }

  //获取所有图层信息，构造成json数据用于生成树结点
  dynamicMapLayer.metadata(function(error, metadata) {
    var children = [];
    for (var i = 0; i < metadata.layers.length; i++) {
      let id = i;
      children.push({
        id: id,
        label: metadata.layers[i].name,
        children: ""
      });

      if (map.visible) {
        defaultcheckedkeys.push(id);
      }
    }

    TreeData.push({
      label: map.name,
      children: children
    });

    console.log(TreeData);
  });
}

export function LoadTianDiTuService() {
  //天地图
  var url = "http://t0.tianditu.gov.cn/ter_w/wmts";
  var layer = new L.TileLayer.WMTS(url, {
    tk: "a74f08d0fd4435dd072196ef706aa4d3",
    layer: "ter",
    style: "default",
    tilematrixSet: "w",
    format: "tile"
  });
  console.log(layer);
  //store.state.map.addLayer(layer);
}

function guid() {
  return Number(
    Math.random()
      .toString()
      .substr(3, 3) + Date.now()
  ).toString(36);
}
