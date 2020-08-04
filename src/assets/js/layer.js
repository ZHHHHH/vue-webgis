import store from "@/store";
import axios from "axios";
var esri = require("esri-leaflet");
import "../plug/leaflet-tilelayer-wmts/leaflet-tilelayer-wmts.js";

export let TreeData = [];
export let defaultcheckedkeys = [];
//根据配置加载图层
export function loadLayer(config) {
  for (let map of config.operationallayers) {
    switch (map.type) {
      case "arcgis_dynamic":
        loadArcgisService(map);
        break;
      case "arcgis_feature":
        loadArcgisFeatureService(map);
        break;
      case "wmts":
        loadWMTSService(map);
        break;
      case "tms":
        loadTMSService(map);
        break;
      case "wms":
        loadWMSService(map);
        break;
      case "geojson":
        loadGeoJSONService(map);
        break;
      case "folder":
        setTreeData(map.id, map.name, findParentNode(map), [], null);
        break;
    }
  }
}
//切换图层
export function changeLayer(node, isChecked, layerId) {
  if (layerId != null) {
    if (isChecked) {
      defaultcheckedkeys.push(node.id);
      node.layer.options.layers.push(layerId);
    } else {
      defaultcheckedkeys.splice(defaultcheckedkeys.indexOf(node.id), 1);
      node.layer.options.layers.splice(
        node.layer.options.layers.indexOf(layerId),
        1
      );
    }
    store.state.map.removeLayer(node.layer);
    node.layer.addTo(store.state.map);
    return;
  }

  if (isChecked) {
    defaultcheckedkeys.push(node.id);
    store.state.map.addLayer(node.layer);
  } else {
    defaultcheckedkeys.splice(defaultcheckedkeys.indexOf(node.id), 1);
    store.state.map.removeLayer(node.layer);
  }
}
//加载arcgis地图
function loadArcgisService(map) {
  var dynamicMapLayer = esri.dynamicMapLayer(map.options);
  if (map.visible) {
    dynamicMapLayer.addTo(store.state.map);
  } else {
    dynamicMapLayer.options.layers = [];
  }

  //获取所有图层信息
  dynamicMapLayer.metadata(function(error, metadata) {
    var children = [];
    for (let i = 0; i < metadata.layers.length; i++) {
      let id = guid();
      children.push({
        id: id,
        label: metadata.layers[i].name,
        children: [],
        layerId: metadata.layers[i].id,
        layer: dynamicMapLayer,
        icon: map.icon
      });
      if (map.visible) {
        defaultcheckedkeys.push(id);
      }
    }
    setTreeData(guid(), map.name, findParentNode(map), children, null);
  });
}
//加载arcgis要素图层
function loadArcgisFeatureService(map) {
  let feature = esri.featureLayer(map.options);
  let id = guid();
  setTreeData(id, map.name, findParentNode(map), [], feature, map.icon);
  if (map.visible) {
    feature.addTo(store.state.map);
    defaultcheckedkeys.push(id);
  }

  var oldId;
  feature.on('click',function(e){
    if(oldId!=null){
      feature.resetFeatureStyle(oldId);
    }
    oldId = e.layer.feature.id;
    feature.setFeatureStyle(e.layer.feature.id, {
      color: '#FF0000',
      weight: 3,
      opacity: 1
    });

    let tr="";
    let properties=e.layer.feature.properties;
    for(let field in properties){
      tr+=`<tr><td>${field}</td><td>${properties[field]}</td></tr>`
    }
    let html=`<table><thead><th>字段</th><th>值</th></thead><tbody>${tr}<tbody></table>`;

    L.popup({maxHeight:400})
    .setLatLng(e.latlng)
    .setContent(html)
    .addTo(store.state.map);
      
  });
}
//加载wmts地图服务
function loadWMTSService(map) {
  var wmts = new L.TileLayer.WMTS(map.url, map.options);
  let id = guid();
  setTreeData(id, map.name, findParentNode(map), [], wmts, map.icon);
  if (map.visible) {
    store.state.map.addLayer(wmts);
    defaultcheckedkeys.push(id);
  }
}
//加载TMS地图
function loadTMSService(map) {
  let tile = L.tileLayer(map.url);
  let id = guid();
  setTreeData(id, map.name, findParentNode(map), [], tile, map.icon);
  if (map.visible) {
    tile.addTo(store.state.map);
    defaultcheckedkeys.push(id);
  }
}
//加载WMS地图
function loadWMSService(map) {
  var wms = L.tileLayer.wms(map.url, map.options);
  let id = guid();
  setTreeData(id, map.name, findParentNode(map), [], wms, map.icon);
  if (map.visible) {
    wms.addTo(store.state.map);
    defaultcheckedkeys.push(id);
  }
}
//加载GEOJSON地图
function loadGeoJSONService(map) {
  axios.get(map.url).then(res => {
    var geojson = L.geoJSON(res.data, {});
    let id = guid();
    setTreeData(id, map.name, findParentNode(map), [], geojson, map.icon);
    if (map.visible) {
      geojson.addTo(store.state.map);
      defaultcheckedkeys.push(id);
    }
  });
}
//找到父节点
function findParentNode(map, data) {
  if (map.pid != null) {
    for (let index in data == null ? TreeData : data) {
      if ((data == null ? TreeData : data)[index].id == map.pid) {
        return (data == null ? TreeData : data)[index].children;
      }
      if ((data == null ? TreeData : data)[index].children.length > 0) {
        let result = findParentNode(
          map,
          (data == null ? TreeData : data)[index].children
        );
        if (result != null) {
          return result;
        }
      }
    }
  }
}

//构造图层目录树数据
function setTreeData(id, label, parent, children, layer, icon) {
  parent = parent == null ? TreeData : parent;
  icon = icon == null ? "/static/img/folder.png" : icon;
  parent.push({
    id: id,
    label: label,
    children: children,
    layer: layer,
    icon: icon
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
