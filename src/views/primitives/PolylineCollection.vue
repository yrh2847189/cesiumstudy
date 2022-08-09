
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

  const polylines = viewer.scene.primitives.add(
    new Cesium.PolylineCollection()
  );
  polylines.add({
    positions: Cesium.Cartesian3.fromDegreesArray([
      117.41, 39.87, 116.5, 39.87, 116.6, 39.87, 116.7, 39.87,
    ]),
    material: new Cesium.Material({
      fabric: {
        type: "Color",
        uniforms: {
          color: Cesium.Color.YELLOW,
        },
      },
    }),
    width: 2,
  });
  polylines.add({
    positions: Cesium.Cartesian3.fromDegreesArray([
      117.41, 39.0, 116.5, 39.1, 116.6, 39.2, 116.7, 39.87,
    ]),
    material: new Cesium.Material({
      fabric: {
        type: "Color",
        uniforms: {
          color: Cesium.Color.RED,
        },
      },
    }),
    width: 2,
  });
 
  viewer.camera.setView({
         // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination:Cesium.Cartesian3.fromDegrees(117.41,  39.0, 600000.0),
               orientation:{
                  heading: 6.283185307179586,
                  // 视角
                  pitch: -1.5686521559334161,
                  roll: 0,
              }
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
