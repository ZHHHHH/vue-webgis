import store from "@/store";
import axios from "axios";
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
      case "arcgis_feature":
        loadArcgisFeatureService(Maps[map]);
        break;
      case "wmts":
        loadWMTSService(Maps[map]);
        break;
      case "tms":
        loadTMSService(Maps[map]);
        break;
      case "wms":
        loadWMSService(Maps[map]);
        break;
      case "geojson":
        loadGeoJSONService(Maps[map]);
        break;
    }
  }

  console.log(TreeData);
}

//加载arcgis地图
function loadArcgisService(map) {
  var dynamicMapLayer = esri.dynamicMapLayer({
    url: map.url,
    opacity: map.opacity
  });
  //获取所有图层信息
  dynamicMapLayer.metadata(function(error, metadata) {
    // let arryId = [];
    // for (var i = 0; i < metadata.layers.length; i++) {
    //   layerid.push(metadata.layers[i].id);
    // }

    var children = [];
    for (var i = 0; i < metadata.layers.length; i++) {
      let id = guid();
      children.push({
        id: id,
        label: metadata.layers[i].name,
        children: "",
        layerId: metadata.layers[i].id,
        layer: dynamicMapLayer
      });

      if (map.visible) {
        defaultcheckedkeys.push(id);
      }
    }
    setTreeData(guid(), map.name, children, dynamicMapLayer);
  });
  if (map.visible) {
    dynamicMapLayer.addTo(store.state.map);
  }
}
//加载arcgis要素图层
function loadArcgisFeatureService(map) {
  let feature = esri.featureLayer({ url: map.url });
  if (map.visible) {
    feature.addTo(store.state.map);
  }
  setTreeData(guid(), map.name, null, feature);
}
//加载wmts地图服务
function loadWMTSService(map) {
  var wmts = new L.TileLayer.WMTS(map.url, map.options);
  if (map.visible) {
    store.state.map.addLayer(wmts);
  }
  setTreeData(guid(), map.name, null, wmts);
}
//加载TMS地图
function loadTMSService(map) {
  let tile = L.tileLayer(map.url);
  if (map.visible) {
    tile.addTo(store.state.map);
  }
  setTreeData(guid(), map.name, null, tile);
}
//加载WMS地图
function loadWMSService(map) {
  var wms = L.tileLayer.wms(map.url, map.options);
  if (map.visible) {
    wms.addTo(store.state.map);
  }
  setTreeData(guid(), map.name, null, wms);
}
//加载GEOJSON地图
function loadGeoJSONService(map) {
  axios.get(map.url).then(res => {
    var geojson = L.geoJSON(res.data, {});
    if (map.visible) {
      geojson.addTo(store.state.map);
    }
    setTreeData(guid(), map.name, null, geojson);
  });
}

export function changeLayer(node, isChecked, nodes) {
  if (nodes != null) {
    let arryindex = [];
    for (var index in nodes) {
      arryindex.push(nodes[index].layerId);
    }
    node.layer.setLayers(arryindex);
  }
  if (isChecked) {
    store.state.map.addLayer(node.layer);
  } else {
    store.state.map.removeLayer(node.layer);
  }
}

//构造图层目录树数据
function setTreeData(id, label, children, layer) {
  TreeData.push({
    id: id,
    label: label,
    children: children,
    layer: layer
  });
}
//生成唯一值
function guid() {
  return Number(
    Math.random()
      .toString()
      .substr(3, 3) + Date.now()
  ).toString(36);
}
