
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
  const coefficients = [
    [-0.066550267689383, -0.022088055746048, 0.078835009246127],
    [0.038364097478591, 0.045714300098753, 0.063498904606215],
    [-0.01436536331281, -0.026490613715151, -0.05018940406602],
    [-0.05153278691789, -0.050777795729986, -0.056449044453032],
    [0.043454596136534, 0.046672590104157, 0.05753010764661],
    [-0.00164046627411, 0.001286638231156, 0.007228908989616],
    [-0.042260855700641, -0.046394335094707, -0.057562936365585],
    [-0.004953478914091, -0.000479681664876, 0.008508150106928],
  ];
  const environmentMapURL =
    "https://zouyaoji.top/vue-cesium/SampleData/EnvironmentMap/kiara_6_afternoon_2k_ibl.ktx";
  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(105, 38, 10000)
  );
  var options = {
    url: "https://zouyaoji.top/vue-cesium/SampleData/models/Pawns/Pawns.glb",
    specularEnvironmentMaps: environmentMapURL,
    //sphericalHarmonicCoefficients: coefficients,

    modelMatrix: modelMatrix,
    scale: 10000,
    minimumPixelSize: 128,
    maximumScale: 200000,
    luminanceAtZenith: 0.2,
  };
  var modelEntine = Cesium.Model.fromGltf(options);
  const model = viewer.scene.primitives.add(modelEntine);
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
