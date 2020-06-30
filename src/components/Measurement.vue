<template>
  <div>
    <JsPanel :visible="visible" :options="panelOptions" @close="PanelClose">
      <div style="margin:10px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-s-marketing" @click="Polyline"
            >长度</el-button
          >
          <el-button type="primary" icon="el-icon-s-data" @click="Feature"
            >面积</el-button
          >
          <el-button type="danger" icon="el-icon-delete-solid">清除</el-button>
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
      options: [
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
      value: "公里",
      popups: [],
      measureLayer: []
    };
  },
  components: {
    JsPanel
  },
  mounted() {
    this.ListenerDrawEvent();
  },
  methods: {
    ListenerDrawEvent: function() {
      let keys = [];
      let distanceSum = 0;
      let polyineDisctance = 0;
      let previousLatlng;
      let that = this;
      store.state.map.on("draw:drawvertex", function(e) {
        if (e.layer.type == "polygon") {
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
              distanceSum
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
        if (e.layer.type == "polygon") {
          var area = L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]);
          L.popup({
            closeButton: false,
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false
          })
            .setLatLng(e.layer.getCenter())
            .setContent(`${area}平方`)
            .addTo(store.state.map);
        } else if (e.layer.type == "polyline") {
          let content = that.popups[that.popups.length - 1].getContent();
          if (content.indexOf("总长") == -1) {
            that.popups[that.popups.length - 1].setContent(`总长：${content}`);
          }
          keys.splice(0, keys.length);
        }
      });
    },
    Polyline: function() {
      let polyine = new L.Draw.Polyline(store.state.map, {
        shapeOptions: {
          stroke: true,
          color: "#3388ff",
          weight: 4,
          opacity: 0.5,
          fill: false,
          clickable: true
        }
      });
      polyine.enable();
    },
    Feature: function() {
      let polygon = new L.Draw.Polygon(store.state.map, { showLength: false });
      polygon.enable();
    },
    SelectChange: function(value) {
      for (var key in this.popups) {
        let lastPosition = false;
        let content = this.popups[key].getContent();
        if (content == "起点") {
          continue;
        }
        if (content.indexOf("总长") > -1) {
          lastPosition = true;
        }
        content = this.CalculateDisctance(
          value,
          this.popups[key]["polyineDisctance"],
          this.popups[key]["distanceSum"]
        );
        content = lastPosition ? `总长：${content}` : content;
        this.popups[key].setContent(content);
      }
    },
    CalculateDisctance: function(value, polyineDisctance, distanceSum) {
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
      }
      let content = `${distanceSum.toFixed(
        2
      )}${value}<br/>(+${polyineDisctance.toFixed(2)}${value})`;
      return content;
    },
    PanelClose: function() {
      this.visible = false;
      for (var key in this.popups) {
        this.popups[key].remove();
      }
      for (var key in this.measureLayer) {
        this.measureLayer[key].remove();
      }
    }
  }
};
</script>
<style scoped></style>
