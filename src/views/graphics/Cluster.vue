
<template >
  <el-row>
    <div id="cesiumContainer"></div>
  </el-row>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import ClusterLayer from "../../lib/cluster";
onMounted(() => {
  var viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayerPicker: false,
    timeline: true, // 必须为true显示时间线组件（如不想显示可以使用样式层叠表修改display：none） 否则viewer.timeline.zoomTo会报undefined错误
    homeButton: false,
    fullscreenButton: false,
    infoBox: false,
    sceneModePicker: false,
    navigationInstructionsInitiallyVisible: false,
    navigationHelpButton: false,
    animation: false,
    shouldAnimate: true, // 必须为true开启动画 否则不会达到飞机模型飞行动画效果
  });
  var arcGisMapServerImageryProvider =
    new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    });

  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(arcGisMapServerImageryProvider);

  const arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push({
      x: 114 + Math.random(),
      y: 30 + Math.random(),
    });
  }
  new ClusterLayer(viewer).addData(arr);
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
