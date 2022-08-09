
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  90,
  -20,
  110,
  90
);
onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    animation: true, //是否创建动画小器件，左下角仪表
      shouldAnimate:true,// 自动播放
    fullscreenButton: false, //是否显示全屏按钮
    homeButton: false, //是否显示Home按钮
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
  });
  const czml = [
  {
    id: "document",
    name: "CZML Model",
    version: "1.0",
  },
  {
    id: "aircraft model",
    name: "Cesium Air",
    position: {
      cartographicDegrees: [-77, 37, 10000],
    },
    model: {
      gltf: "/static/SampleData/models/CesiumAir/Cesium_Air.glb",
      scale: 2.0,
      minimumPixelSize: 128,
    },
  },
];

const dataSourcePromise = viewer.dataSources.add(
  Cesium.CzmlDataSource.load(czml)
);

dataSourcePromise
  .then(function (dataSource) {
    viewer.trackedEntity = dataSource.entities.getById(
      "aircraft model"
    );
  })
  .catch(function (error) {
    window.alert(error);
  });


});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
