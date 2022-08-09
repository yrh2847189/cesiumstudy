
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
//   const viewer = new Cesium.Viewer("cesiumContainer", {
//     infoBox: false,
//     animation: false, //是否创建动画小器件，左下角仪表
//     fullscreenButton: false, //是否显示全屏按钮
//     homeButton: false, //是否显示Home按钮
//     timeline: false, //是否显示时间轴
//     navigationHelpButton: false, //是否显示右上角的帮助按钮
//   });

var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
        url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    }),
    baseLayerPicker : false
});

  var token = "7b56038c276128a86a5b946404bf4df4";
  // 服务域名
  // 服务负载子域
  var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
//   viewer.imageryLayers.removeAll();
//   viewer.imageryLayers.addImageryProvider(
//     new Cesium.WebMapTileServiceImageryProvider({
//       //影像底图
//       url:
//         "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
//         token,
//       subdomains: subdomains,

//       layer: "tdtImgLayer",
//       style: "default",
//       format: "image/jpeg",
//       tileMatrixSetID: "GoogleMapsCompatible",
//     })
//   );

//   viewer.imageryLayers.addImageryProvider(
//     new Cesium.WebMapTileServiceImageryProvider({
//       //影像注记
//       url:
//         "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
//         token,
//       subdomains: subdomains,
//       layer: "tdtCiaLayer",
//       style: "default",
//       format: "image/jpeg",
//       tileMatrixSetID: "GoogleMapsCompatible",
//     })
//   );
//   var tdtUrl = "https://t{s}.tianditu.gov.cn/";
//   var terrainUrls = new Array();
//   for (var i = 0; i < subdomains.length; i++) {
//     var url =
//       tdtUrl.replace("{s}", subdomains[i]) + "DataServer?T=elv_c&tk=" + token;
//     terrainUrls.push(url);
//   }


const terrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
  url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",

});
viewer.terrainProvider = terrainProvider;

 var target = new Cesium.Cartesian3(300770.50872389384, 5634912.131394585, 2978152.2865545116)
        var offset = new Cesium.Cartesian3(6344.974098678562, -793.3419798081741, 2499.9508860763162)
        viewer.camera.lookAt(target, offset)
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
 });
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
