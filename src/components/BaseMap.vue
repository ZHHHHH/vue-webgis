<!--  -->
<template>
  <div></div>
</template>

<script>
import { AddIconLayers } from "../components/Widget";

export default {
  data () {
    return {
      //天地图密钥
      key: "a74f08d0fd4435dd072196ef706aa4d3",
      //天地图底图类型
      TianDiTuBaseType: "TianDiTu.Normal.Map",
      //天地图卫星底图类型
      TianDiTuSatelliteBaseType: "TianDiTu.Satellite.Map",
      //天地图地形底图类型
      TianDiTuTerrainBaseType: "TianDiTu.Terrain.Map",
      //Google底图类型
      GoogleBaseType: "Google.Normal.Map",
      //Google底图类型
      GoogleSatelliteBaseType: "Google.Satellite.Map",
      //高德底图类型
      GaoDeBaseType: "GaoDe.Normal.Map",
      //高德底图类型
      GaoDeSatelliteBaseType: "GaoDe.Satellite.Map",
      //Arcgis底图类型
      ArcgisBaseType: "Arcgis.Normal.Map",
      //Arcgis底图类型
      ArcgisSatelliteBaseType: "Arcgis.Satellite.Map",
      //Geoq底图类型
      GeoqBaseType: "Geoq.Normal.Map",
      //OSM底图类型
      OSMBaseType: "OSM.Normal.Map",
      //百度底图类型
      BaiDuBaseType: "Baidu.Normal.Map",
      //百度底图类型
      BaiduSatelliteBaseType: "Baidu.Satellite.Map",

      //天地图街道
      TianDiTuNormalMap: {},
      //天地图标注
      TianDiTuNormalAnnotion: {},
      //天地图卫星
      TianDiTuSatelliteMap: {},
      //天地图卫星标注
      TianDiTuSatelliteAnnotion: {},
      //天地图地形
      TianDiTuTerrainMap: {},
      //天地图地形标注
      TianDiTuTerrainAnnotion: {},
      //谷歌街道
      GoogleNormalMap: {},
      //谷歌卫星
      GoogleSatelliteMap: {},
      //谷歌卫星标注
      GoogleSatelliteAnnotion: {},
      //高德街道
      GaoDeNormalMap: {},
      //高德卫星
      GaoDeSatelliteMap: {},
      //高德卫星标注
      GaoDeSatelliteAnnotion: {},
      //arcgis街道
      ArcgisNormalMap: {},
      //arcgis卫星
      ArcgisSatelliteMap: {},
      //arcgis卫星标注
      ArcgisSatelliteAnnotion: {},
      //Geoq地图
      GeoqNormalMap: {},
      //午夜蓝
      GeoqNormalPurplishBlue: {},
      //灰色
      GeoqNormalGray: {},
      //暖色
      GeoqNormalWarm: {},
      //水系
      GeoqNormalHydro: {},
      //OSM地图
      OSMNormalMap: {},
      //百度地图
      BaiduNormalMap: {},
      //卫星
      BaiduSatelliteMap: {},
      //标注
      BaiduSatelliteAnnotion: {},

      //天地图图层组
      tianditu_streets: {},
      //天地图地形图层组
      tianditu_terrain: {},
      //天地图卫星图层组
      tianditu_satellite: {},
      //google图层组
      google_streets: {},
      //google卫星图层组
      google_satellite: {},
      //高德图层组
      gaode_streets: {},
      //高德卫星图层组
      gaode_satellite: {},
      //arcgis图层组
      arcgis_streets: {},
      //arcgis卫星图层组
      arcgis_satellite: {},
      //OSM图层组
      osm_streets: {},
      //百度地图图层组
      baidu_streets: {},
      //百度地图卫星地图
      baiud_satellite: {},

      //基础底图配置
      baseMap: [
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
      ]
    };
  },
  created () {
    this.initBaseMap();
    AddIconLayers(baseMap);
  },
  components: {},
  methods: {
    initBaseMap: function () {
      TianDiTuNormalMap = this.createBaseMap(TianDiTuBaseType, key);
      TianDiTuNormalAnnotion = this.createBaseMap(
        "TianDiTu.Normal.Annotion",
        key
      );
      TianDiTuSatelliteMap = this.createBaseMap(TianDiTuSatelliteBaseType, key);
      TianDiTuSatelliteAnnotion = this.createBaseMap(
        "TianDiTu.Satellite.Annotion",
        key
      );
      TianDiTuTerrainMap = this.createBaseMap(TianDiTuTerrainBaseType, key);
      TianDiTuTerrainAnnotion = this.createBaseMap(
        "TianDiTu.Terrain.Annotion",
        key
      );
      GoogleNormalMap = this.createBaseMap(GoogleBaseType);
      GoogleSatelliteMap = this.createBaseMap(GoogleSatelliteBaseType);
      GoogleSatelliteAnnotion = this.createBaseMap("Google.Satellite.Annotion");
      GaoDeNormalMap = this.createBaseMap(GaoDeBaseType);
      GaoDeSatelliteMap = this.createBaseMap(GaoDeSatelliteBaseType);
      GaoDeSatelliteAnnotion = this.createBaseMap("GaoDe.Satellite.Annotion");
      ArcgisNormalMap = this.createBaseMap(ArcgisBaseType);
      ArcgisSatelliteMap = this.createBaseMap(ArcgisSatelliteBaseType);
      ArcgisSatelliteAnnotion = this.createBaseMap("Arcgis.Satellite.Annotion");
      GeoqNormalMap = this.createBaseMap(GeoqBaseType);
      GeoqNormalPurplishBlue = this.createBaseMap("Geoq.Normal.PurplishBlue");
      GeoqNormalGray = this.createBaseMap("Geoq.Normal.Gray");
      GeoqNormalWarm = this.createBaseMap("Geoq.Normal.Warm");
      GeoqNormalHydro = this.createBaseMap("Geoq.Normal.Hydro");
      OSMNormalMap = this.createBaseMap(OSMBaseType);
      BaiduNormalMap = this.createBaseMap(BaiDuBaseType);
      BaiduSatelliteMap = this.createBaseMap(BaiduSatelliteBaseType);
      BaiduSatelliteAnnotion = this.createBaseMap("Baidu.Satellite.Annotion");
      this.initLayerGroup();
    },
    initLayerGroup: function () {
      tianditu_streets = L.layerGroup([
        TianDiTuNormalMap,
        TianDiTuNormalAnnotion
      ]);
      tianditu_terrain = L.layerGroup([
        TianDiTuTerrainMap,
        TianDiTuTerrainAnnotion
      ]);
      tianditu_satellite = L.layerGroup([
        TianDiTuSatelliteMap,
        TianDiTuSatelliteAnnotion
      ]);
      google_streets = L.layerGroup([GoogleNormalMap]);
      google_satellite = L.layerGroup([
        GoogleSatelliteMap,
        GoogleSatelliteAnnotion
      ]);
      gaode_streets = L.layerGroup([GaoDeNormalMap]);
      gaode_satellite = L.layerGroup([
        GaoDeSatelliteMap,
        GaoDeSatelliteAnnotion
      ]);
      arcgis_streets = L.layerGroup([ArcgisNormalMap]);
      arcgis_satellite = L.layerGroup([
        ArcgisSatelliteMap,
        ArcgisSatelliteAnnotion
      ]);
      osm_streets = L.layerGroup([OSMNormalMap]);
      baidu_streets = L.layerGroup([BaiduNormalMap]);
      baiud_satellite = L.layerGroup([
        BaiduSatelliteMap,
        BaiduSatelliteAnnotion
      ]);
    }
  },

  computed: {},

  mounted: {},

  methods: {}
};
export function createBaseMap (MapType, key, maxZoom, minZoom) {
  return L.tileLayer.chinaProvider(MapType, {
    key,
    maxZoom: maxZoom != null ? maxZoom : 18,
    minZoom: minZoom != null ? minZoom : 5
  });
}
</script>
<style scoped></style>
