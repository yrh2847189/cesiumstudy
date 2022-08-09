
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
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
    animation: true,
    shouldAnimate: true, // 必须为true开启动画 否则不会达到飞机模型飞行动画效果
  });
  var arcGisMapServerImageryProvider =
    new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    });

  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(arcGisMapServerImageryProvider);
  // viewer.scene.globe.enableLighting = true;

  var flag = true;
  var y = 5;
  var position = Cesium.Cartesian3.fromDegrees(
    116.43299999999988,
    39.915999999999954
  );
  var entity = viewer.entities.add({
    position: position,
    //加载蓝色小圆点
    // point: {
    //     color: Cesium.Color.BLUE,    //点位颜色
    //     pixelSize: 5                //像素点大小
    // },
    billboard: {
      image: "/static/img/bounceMarker.png", // default: undefined
      show: true, // default
      pixelOffset: new Cesium.CallbackProperty(() => {
        if (flag) {
          y = y - 0.5;
          if (y <= 0) {
            flag = false;
          }
        } else {
          y = y + 0.5;
          if (y >= 5) {
            flag = true;
          }
        }
        return new Cesium.Cartesian2(0, y);
      }, false),
    },
  });
  viewer.zoomTo(viewer.entities);
  // viewer.flyTo(entity, {
  //             offset : {
  //                 heading : Cesium.Math.toRadians(0.0),
  //                 pitch : Cesium.Math.toRadians(-25),
  //                 range : 1
  //             }
  //         });
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
