<template>
  <div>
    <JsPanel :visible="visible" :options="panelOptions" @close="closePanel">
      <div style="margin:10px">
        <el-input
          placeholder="请输入经度"
          v-model="lng"
          oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+7)}"
        >
          <template slot="prepend">经度</template>
        </el-input>
        <el-input
          placeholder="请输入纬度"
          v-model="lat"
          oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+7)}"
        >
          <template slot="prepend">纬度</template>
        </el-input>
        <el-button
          type="primary"
          style="margin-left:35%;margin-top:10px"
          @click="locate"
          >确定</el-button
        >
      </div>
    </JsPanel>
  </div>
</template>

<script>
import store from "@/store";
import "jspanel4/dist/jspanel.min.css";
import { JsPanel } from "vue-js-panel";
export default {
  data() {
    return {
      visible: false,
      lat: 0,
      lng: 0,
      marker: null,
      panelOptions: {
        headerLogo:
          "<li class='el-icon-s-promotion' style='margin-left:8px;cursor:pointer;'></li>",
        headerTitle: "坐标定位",
        animateIn: "jsPanelFadeIn",
        theme: "#139ceb",
        contentSize: {
          width: 220,
          height: 160
        },
        headerControls: "closeonly",
        position: {
          my: "right-top",
          at: "right-top",
          offsetX: -10,
          offsetY: 50
        }
      }
    };
  },
  components: {
    JsPanel
  },
  methods: {
    locate: function() {
      this.closeMarker();
      let latlng = [this.lat, this.lng];
      store.state.map.setView(latlng);
      this.marker = L.marker(latlng)
        .addTo(store.state.map)
        .bindPopup(`经度：${this.lng} 纬度：${this.lat}`, {
          closeButton: false,
          autoClose: false,
          closeOnEscapeKey: false
        })
        .openPopup();
    },
    closePanel: function() {
      this.visible = false;
      this.closeMarker();
    },
    closeMarker: function() {
      if (this.marker != null) {
        this.marker.remove();
      }
    }
  }
};
</script>
<style scoped></style>
