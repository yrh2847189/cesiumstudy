
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";

import GeoTerrainProvider from "../../lib/GeoTerrainProvider.js";

// import  * as cesiumtdt from "cesium-tdt";
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  90,
  -20,
  110,
  90
);
onMounted(() => {

  

  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    animation: false, //是否创建动画小器件，左下角仪表
    fullscreenButton: false, //是否显示全屏按钮
    homeButton: false, //是否显示Home按钮
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
  });
  var token = "7b56038c276128a86a5b946404bf4df4";
  // 服务域名
  // 服务负载子域
  var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

  
  var tdtUrl = "https://t{s}.tianditu.gov.cn/";
  var terrainUrls = new Array();
  for (var i = 0; i < subdomains.length; i++) {
    var url =
      tdtUrl.replace("{s}", subdomains[i]) + "DataServer?T=elv_c&tk=" + token;
    terrainUrls.push(url);
  }

  var provider = new GeoTerrainProvider({
    urls: terrainUrls,
  });

  viewer.terrainProvider = provider;
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
