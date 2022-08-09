
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
  });
  //baseLayerPicker
  //viewer.cesiumWidget.

  var token = "7b56038c276128a86a5b946404bf4df4";
  // 服务域名
  // 服务负载子域
  var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      //影像底图
      url:
        "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
        token,
      subdomains: subdomains,
      layer: "tdtImgLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
    })
  );

  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      //影像注记
      url:
        "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
        token,
      subdomains: subdomains,
      layer: "tdtCiaLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
    })
  );
  //viewer.camera.flyHome(2);


});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
#cesiumContainer .cesium-viewer-bottom {
  display: none;
}
</style>
