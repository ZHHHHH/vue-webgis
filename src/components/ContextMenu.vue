<!--  -->
<template>
  <div>
    <div
      id="perTreeMenu"
      v-if="tmDisplay"
      class="tree_menu"
      :style="{ ...rightMenu }"
    >
      <ul>
        <li
          v-for="(item, index) in contextmenu"
          :key="index"
          @click="callModelFun(item)"
        >
          <i :class="item.icon"></i> {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { getToolConfig } from "../assets/js/api";
export default {
  data() {
    return {
      node: {},
      nodedata: {},
      contextmenu: {},
      tmDisplay: false,
      rightMenu: {}
    };
  },
  mounted() {
    getToolConfig().then(config => {
      this.contextmenu = config.contextmenu;
    });
  },
  methods: {
    callModelFun: function(item) {
      eval(`this.${item.method}()`);
    },
    locate: function() {
      console.log(this.nodedata.layer);
    }
  }
};
</script>

<style scoped>
.tree_menu {
  position: fixed;
  display: block;
  z-index: 20000;
  background-color: #fff;
  padding: 5px 0;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

ul {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
  margin: 0;
  padding: 0 15px;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
}
ul li:hover {
  background-color: #ebeef5;
}
</style>
