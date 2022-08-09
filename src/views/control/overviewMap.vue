
<template >
  <div id="box">
    <div id="cesiumContainer"></div>
    <div id="overviewContainer"></div>
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
let viewer: Cesium.Viewer | null;
onMounted(() => {
  //return;
  viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
  });
  var arcGisMapServerImageryProvider =
    new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    });

  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(arcGisMapServerImageryProvider);
  viewer.camera.flyHome(2);

  const overViewer = new Cesium.Viewer("overviewContainer", {
    homeButton: false,
    vrButton: false,
    fullscreenButton: false,
    animation: false,
    geocoder: false,
    timeline: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    infoBox: false,
    baseLayerPicker: false,
    selectionIndicator: false,
  });

  var overLayer = new Cesium.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  });
  overViewer.cesiumWidget.creditContainer.style.display = "none";
  overViewer.imageryLayers.addImageryProvider(overLayer);

  let control = overViewer.scene.screenSpaceCameraController;
  control.enableRotate = false;
  control.enableTranslate = false;
  control.enableZoom = false;
  control.enableTilt = false;
  control.enableLook = false;
  let syncViewer = function () {
    overViewer.camera.flyTo({
      destination: viewer.camera.position,
      orientation: {
        heading: viewer.camera.heading,
        pitch: viewer.camera.pitch,
        roll: viewer.camera.roll,
      },
      duration: 0.0,
    });
  };

  viewer.scene.preRender.addEventListener(syncViewer);
});
</script>
<style scoped>
#box {
  background: red;
  position: relative;
}
#cesiumContainer {
  width: 100%;
  height: 800px;
  background: yellow;
  position: absolute;
  top: 3px;
  left: 3px;
}
#overviewContainer {
border:#3f4854 5px solid;

  height: 200px;
  width: 200px;
  color: white;
  position: absolute;
  right: 10px;
  top: 500px;
}

#cesiumContainer .cesium-viewer-bottom {
  display: none;
}

</style>
