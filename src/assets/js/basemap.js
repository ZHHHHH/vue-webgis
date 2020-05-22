import "leaflet.chinatmsproviders";

//天地图密钥
export var key = "a74f08d0fd4435dd072196ef706aa4d3";

//--------------------------地图底图类型---------------------------//
//天地图底图类型
var TianDiTuBaseType = "TianDiTu.Normal.Map";
//天地图卫星底图类型
var TianDiTuSatelliteBaseType = "TianDiTu.Satellite.Map";
//天地图地形底图类型
var TianDiTuTerrainBaseType = "TianDiTu.Terrain.Map";
//Google底图类型
var GoogleBaseType = "Google.Normal.Map";
//Google底图类型
var GoogleSatelliteBaseType = "Google.Satellite.Map";
//高德底图类型
var GaoDeBaseType = "GaoDe.Normal.Map";
//高德底图类型
var GaoDeSatelliteBaseType = "GaoDe.Satellite.Map";
//Arcgis底图类型
var ArcgisBaseType = "Arcgis.Normal.Map";
//Arcgis底图类型
var ArcgisSatelliteBaseType = "Arcgis.Satellite.Map";
//Geoq底图类型
var GeoqBaseType = "Geoq.Normal.Map";
//OSM底图类型
var OSMBaseType = "OSM.Normal.Map";
//百度底图类型
var BaiDuBaseType = "Baidu.Normal.Map";
//百度底图类型
var BaiduSatelliteBaseType = "Baidu.Satellite.Map";

//--------------------------天地图街道-----------------------//
var TianDiTuNormalMap = createBaseMap(TianDiTuBaseType, key),
  //地图标注
  TianDiTuNormalAnnotion = createBaseMap("TianDiTu.Normal.Annotion", key),
  //卫星
  TianDiTuSatelliteMap = createBaseMap(TianDiTuSatelliteBaseType, key),
  //卫星标注
  TianDiTuSatelliteAnnotion = createBaseMap("TianDiTu.Satellite.Annotion", key),
  //地形
  TianDiTuTerrainMap = createBaseMap(TianDiTuTerrainBaseType, key),
  //地形标注
  TianDiTuTerrainAnnotion = createBaseMap("TianDiTu.Terrain.Annotion", key);

//----------------------谷歌街道-----------------------//
var GoogleNormalMap = createBaseMap(GoogleBaseType),
  // 卫星
  GoogleSatelliteMap = createBaseMap(GoogleSatelliteBaseType),
  //卫星标注
  GoogleSatelliteAnnotion = createBaseMap("Google.Satellite.Annotion");

//-----------------高德街道-------------------//
var GaoDeNormalMap = createBaseMap(GaoDeBaseType),
  // 卫星
  GaoDeSatelliteMap = createBaseMap(GaoDeSatelliteBaseType),
  //卫星标注
  GaoDeSatelliteAnnotion = createBaseMap("GaoDe.Satellite.Annotion");

//-----------------Arcgis街道--------------------//
var ArcgisNormalMap = createBaseMap(ArcgisBaseType),
  // 卫星
  ArcgisSatelliteMap = createBaseMap(ArcgisSatelliteBaseType),
  //标注
  ArcgisSatelliteAnnotion = createBaseMap("Arcgis.Satellite.Annotion");

//---------------------Geoq地图-------------------------//
var GeoqNormalMap = createBaseMap(GeoqBaseType),
  // 午夜蓝
  GeoqNormalPurplishBlue = createBaseMap("Geoq.Normal.PurplishBlue"),
  //灰色
  GeoqNormalGray = createBaseMap("Geoq.Normal.Gray"),
  // 暖色
  GeoqNormalWarm = createBaseMap("Geoq.Normal.Warm"),
  // 水系
  GeoqNormalHydro = createBaseMap("Geoq.Normal.Hydro");

//-----------------------OSM地图--------------------//
var OSMNormalMap = createBaseMap(OSMBaseType);

//----------------------百度地图---------------------//
var BaiduNormalMap = createBaseMap(BaiDuBaseType),
  // 卫星
  BaiduSatelliteMap = createBaseMap(BaiduSatelliteBaseType),
  //标注
  BaiduSatelliteAnnotion = createBaseMap("Baidu.Satellite.Annotion");

//------------------------根据上面的图层进行图层分组--------------------//
//天地图图层组
var tianditu_streets = L.layerGroup([
    TianDiTuNormalMap,
    TianDiTuNormalAnnotion
  ]),
  tianditu_terrain = L.layerGroup([
    TianDiTuTerrainMap,
    TianDiTuTerrainAnnotion
  ]),
  tianditu_satellite = L.layerGroup([
    TianDiTuSatelliteMap,
    TianDiTuSatelliteAnnotion
  ]);

//google图层组
var google_streets = L.layerGroup([GoogleNormalMap]),
  google_satellite = L.layerGroup([
    GoogleSatelliteMap,
    GoogleSatelliteAnnotion
  ]);

//高德图层组
var gaode_streets = L.layerGroup([GaoDeNormalMap]),
  gaode_satellite = L.layerGroup([GaoDeSatelliteMap, GaoDeSatelliteAnnotion]);

//arcgis图层组
var arcgis_streets = L.layerGroup([ArcgisNormalMap]),
  arcgis_satellite = L.layerGroup([
    ArcgisSatelliteMap,
    ArcgisSatelliteAnnotion
  ]);

//OSM层组
var osm_streets = L.layerGroup([OSMNormalMap]);

//百度地图层组
var baidu_streets = L.layerGroup([BaiduNormalMap]),
  baiud_satellite = L.layerGroup([BaiduSatelliteMap, BaiduSatelliteAnnotion]);

//----------------------切换基础底图配置--------------------//
export var baseMap = [
  {
    title: "天地图(街道)",
    layer: tianditu_streets,
    icon: "/static/img/tianditumap.png",
    baseType: TianDiTuBaseType
  },
  {
    title: "天地图(地形)",
    layer: tianditu_terrain,
    icon: "/static/img/tianditudem.png",
    baseType: TianDiTuTerrainBaseType
  },
  {
    title: "天地图(卫星)",
    layer: tianditu_satellite,
    icon: "/static/img/tiandituimage.png",
    baseType: TianDiTuSatelliteBaseType
  },
  {
    title: "Google(街道)",
    layer: google_streets,
    icon: "/static/img/googlemap.png",
    baseType: GoogleBaseType
  },
  {
    title: "Google(卫星)",
    layer: google_satellite,
    icon: "/static/img/googleimage.png",
    baseType: GoogleSatelliteBaseType
  },
  {
    title: "高德地图(街道)",
    layer: gaode_streets,
    icon: "/static/img/baidumap.png",
    baseType: GaoDeBaseType
  },
  // {
  //   title: "高德地图(卫星)",
  //   layer: gaode_satellite,
  //   icon: "",
  //   baseType:GaoDeSatelliteBaseType
  // },
  {
    title: "Arcgis(街道)",
    layer: arcgis_streets,
    icon: "/static/img/arcgis-street.png",
    baseType: ArcgisBaseType
  },
  // {
  //   title: "Arcgis(卫星)",
  //   layer: arcgis_satellite,
  //   icon: "/static/img/bingimage.png"
  //   baseType:ArcgisSatelliteBaseType
  // },
  {
    title: "OSM地图",
    layer: osm_streets,
    icon: "/static/img/osm.png",
    baseType: OSMBaseType
  }
  // {
  //   title: "百度地图(街道)",
  //   layer: baidu_streets,
  //   icon: "/static/img/baidumap.png"
  //   baseType:BaiDuBaseType
  // },
  // {
  //   title: "百度地图(卫星)",
  //   layer: baiud_satellite,
  //   icon: "/static/img/baiduimage.png"
  //   baseType:BaiduSatelliteBaseType
  // }
];

//创建底图
export function createBaseMap(MapType, key, maxZoom, minZoom) {
  return L.tileLayer.chinaProvider(MapType, {
    key,
    maxZoom: maxZoom != null ? maxZoom : 18,
    minZoom: minZoom != null ? minZoom : 5
  });
}
