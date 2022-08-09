
<template >
  <div id="cesiumContainer">
    <div id="slider"></div>
  </div>
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
    animation: false, //是否创建动画小器件，左下角仪表
    fullscreenButton: false, //是否显示全屏按钮
    homeButton: false, //是否显示Home按钮
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
  });
  viewer.cesiumWidget.creditContainer.style.visibility = "hidden";

  const layers = viewer.imageryLayers;
  const earthAtNight = layers.addImageryProvider(
    new Cesium.IonImageryProvider({ assetId: 3812 })
  );
  earthAtNight.splitDirection = Cesium.SplitDirection.LEFT; // Only show to the left of the slider.

  // Sync the position of the slider with the split position
  const slider = document.getElementById("slider");
  viewer.scene.splitPosition =
    slider.offsetLeft / slider.parentElement.offsetWidth;

  const handler = new Cesium.ScreenSpaceEventHandler(slider);

  let moveActive = false;

  function move(movement) {
    if (!moveActive) {
      return;
    }

    const relativeOffset = movement.endPosition.x;
    const splitPosition =
      (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
    slider.style.left = `${100.0 * splitPosition}%`;
    viewer.scene.splitPosition = splitPosition;
  }

  handler.setInputAction(function () {
    moveActive = true;
  }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
  handler.setInputAction(function () {
    moveActive = true;
  }, Cesium.ScreenSpaceEventType.PINCH_START);

  handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

  handler.setInputAction(function () {
    moveActive = false;
  }, Cesium.ScreenSpaceEventType.LEFT_UP);
  handler.setInputAction(function () {
    moveActive = false;
  }, Cesium.ScreenSpaceEventType.PINCH_END);
});
</script>
<style scoped>
/* 罗盘定位 */

.compass {
  position: absolute;
  left: 2%;
  top: 2%;
}

/* 比例尺位置 */

.distance-legend {
  position: absolute;
  right: 2%;
  bottom: 6%;
}

/* 缩放位置 */

.navigation-controls {
  position: absolute;
  bottom: 10%;
  right: 2%;
}

#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
#cesiumContainer .cesium-viewer-bottom {
  display: none;
}
#slider {
  position: absolute;
  left: 50%;
  top: 0px;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 9999;
}

#slider:hover {
  cursor: ew-resize;
}
</style>
