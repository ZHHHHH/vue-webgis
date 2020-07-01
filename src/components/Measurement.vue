<template>
  <div>
    <JsPanel :visible="visible" :options="panelOptions" @close="PanelClose">
      <div style="margin:10px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-s-marketing" @click="Polyline"
            >长度</el-button
          >
          <el-button type="primary" icon="el-icon-s-data" @click="Polygon"
            >面积</el-button
          >
          <el-button type="danger" icon="el-icon-delete-solid" @click="clear"
            >清除</el-button
          >
        </el-button-group>

        <div style="margin-top:10px">
          <label>计量单位：</label>
          <el-select
            v-model="value"
            @change="SelectChange"
            placeholder="请选择"
            size="medium"
            style="width:66%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </JsPanel>
  </div>
</template>
<script>
import "leaflet-draw/dist/leaflet.draw.css";
import store from "@/store";
import "jspanel4/dist/jspanel.min.css";
import { JsPanel } from "vue-js-panel";
import "leaflet-draw";
export default {
  data() {
    return {
      visible: false,
      panelOptions: {
        headerLogo:
          "<li class='el-icon-c-scale-to-original' style='margin-left:8px;cursor:pointer;'></li>",
        headerTitle: "地图测量",
        animateIn: "jsPanelFadeIn",
        theme: "#139ceb",
        contentSize: {
          width: 290,
          height: 130
        },
        headerControls: "closeonly",
        position: {
          my: "right-top",
          at: "right-top",
          offsetX: -10,
          offsetY: 50
        }
      },
      options: null,
      distanceOptions: [
        {
          value: "米",
          label: "米"
        },
        {
          value: "公里",
          label: "公里"
        },
        {
          value: "海里",
          label: "海里"
        },
        {
          value: "丈",
          label: "丈"
        }
      ],
      areaOptions: [
        {
          value: "平方米",
          label: "平方米"
        },
        {
          value: "平方公里",
          label: "平方公里"
        },
        {
          value: "亩",
          label: "亩"
        },
        {
          value: "公顷",
          label: "公顷"
        }
      ],
      value: "公里",
      activeListener: false,
      polyine: null,
      polygon: null,
      measureType: "polyline",
      popups: [],
      measureLayer: []
    };
  },
  components: {
    JsPanel
  },
  mounted() {
    this.options = this.distanceOptions;
    L.drawLocal.draw.handlers.polygon.tooltip.start = "单击开始绘制形状";
    L.drawLocal.draw.handlers.polygon.tooltip.cont = "单击继续绘制形状";
    L.drawLocal.draw.handlers.polygon.tooltip.end =
      "单击继续绘制形状,双击完成绘制";
    L.drawLocal.draw.handlers.polyline.tooltip.start = "单击开始画线";
    L.drawLocal.draw.handlers.polyline.tooltip.cont = "单击继续画线";
    L.drawLocal.draw.handlers.polyline.tooltip.end =
      "单击继续画线,双击完成绘制";
    L.drawLocal.draw.handlers.polyline.error = "错误：形状边缘无法跨越";
  },
  methods: {
    ListenerDrawEvent: function() {
      let keys = [];
      let distanceSum = 0;
      let polyineDisctance = 0;
      let previousLatlng;
      let that = this;
      store.state.map.on("draw:drawvertex", function(e) {
        if (that.measureType == "polygon") {
          return;
        }
        for (let key in e.layers._layers) {
          if (keys.indexOf(key) > -1) {
            continue;
          }
          keys.push(key);
          let content = "";
          if (keys.length == 1) {
            content = "起点";
          } else {
            let latlng = L.latLng(previousLatlng);
            polyineDisctance = latlng.distanceTo(e.layers._layers[key]._latlng);
            distanceSum += polyineDisctance;
            content = that.CalculateDisctance(
              that.value,
              polyineDisctance,
              distanceSum,
              null
            );
          }
          previousLatlng = e.layers._layers[key]._latlng;
          let popup = L.popup({
            closeButton: false,
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false
          })
            .setLatLng(e.layers._layers[key]._latlng)
            .setContent(content)
            .addTo(store.state.map);
          popup["polyineDisctance"] = polyineDisctance;
          popup["distanceSum"] = distanceSum;
          that.popups.push(popup);
        }
      });
      store.state.map.on("draw:created", function(e) {
        that.measureLayer.push(e.layer);
        store.state.map.addLayer(e.layer);
        if (e.layerType == "polygon") {
          let areaSum = L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]);
          let popup = L.popup({
            closeButton: false,
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false
          })
            .setLatLng(e.layer.getCenter())
            .setContent(
              that.CalculateDisctance(that.value, null, null, areaSum)
            )
            .addTo(store.state.map);
          popup["areaSum"] = areaSum;
          that.popups.push(popup);
        } else if (e.layerType == "polyline") {
          let content = that.popups[that.popups.length - 1].getContent();
          if (content.indexOf("总长") == -1) {
            that.popups[that.popups.length - 1].setContent(`总长：${content}`);
          }
          keys.splice(0, keys.length);
        }
      });
    },
    Polyline: function() {
      this.options = this.distanceOptions;
      this.value = "公里";
      this.measureType = "polyline";
      if (this.polygon != null) {
        this.polygon.disable();
      }
      if (this.polyine != null) {
        this.polyine.disable();
      }
      this.polyine = new L.Draw.Polyline(store.state.map, {
        shapeOptions: {
          stroke: true,
          color: "#3388ff",
          weight: 4,
          opacity: 0.5,
          fill: false,
          clickable: true
        }
      });
      this.polyine.enable();
      if (!this.activeListener) {
        this.activeListener = true;
        this.ListenerDrawEvent();
      }
    },
    Polygon: function() {
      this.options = this.areaOptions;
      this.value = "平方米";
      this.measureType = "polygon";
      if (this.polyine != null) {
        this.polyine.disable();
      }
      if (this.polygon != null) {
        this.polygon.disable();
      }
      this.polygon = new L.Draw.Polygon(store.state.map, { showLength: false });
      this.polygon.enable();
      if (!this.activeListener) {
        this.activeListener = true;
        this.ListenerDrawEvent();
      }
    },
    SelectChange: function(value) {
      for (let popup of this.popups) {
        let lastPosition = false;
        let content = popup.getContent();
        if (this.measureType == "polygon" && popup["areaSum"] != null) {
          content = this.CalculateDisctance(
            value,
            null,
            null,
            popup["areaSum"]
          );
        } else if (
          this.measureType == "polyline" &&
          popup["polyineDisctance"] != null
        ) {
          if (content == "起点") {
            continue;
          }
          if (content.indexOf("总长") > -1) {
            lastPosition = true;
          }
          content = this.CalculateDisctance(
            value,
            popup["polyineDisctance"],
            popup["distanceSum"]
          );
          content = lastPosition ? `总长：${content}` : content;
        }
        popup.setContent(content);
      }
    },
    CalculateDisctance: function(
      value,
      polyineDisctance,
      distanceSum,
      areaSum
    ) {
      switch (value) {
        case "米":
          polyineDisctance = polyineDisctance;
          distanceSum = distanceSum;
          break;
        case "公里":
          polyineDisctance = polyineDisctance / 1000;
          distanceSum = distanceSum / 1000;
          break;
        case "海里":
          polyineDisctance = polyineDisctance / 1852;
          distanceSum = distanceSum / 1852;
          break;
        case "丈":
          polyineDisctance = polyineDisctance / 3.33;
          distanceSum = distanceSum / 3.33;
          break;
        case "平方米":
          areaSum = areaSum;
          break;
        case "平方公里":
          areaSum = areaSum / 1000000;
          break;
        case "亩":
          areaSum = areaSum / 666.667;
          break;
        case "公顷":
          areaSum = areaSum / 10000;
          break;
      }
      let content = "";
      if (areaSum > 0) {
        content = `${areaSum.toFixed(2)}${value}`;
      } else {
        content = `${distanceSum.toFixed(
          2
        )}${value}<br/>(+${polyineDisctance.toFixed(2)}${value})`;
      }
      return content;
    },
    PanelClose: function() {
      this.visible = false;
      this.clear();
    },
    clear: function() {
      for (let popup of this.popups) {
        popup.remove();
      }
      for (let layer of this.measureLayer) {
        layer.remove();
      }
    }
  }
};
</script>
<style scoped></style>
