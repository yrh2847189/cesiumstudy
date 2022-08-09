
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
  //   var entity = viewer.entities.add({
  //     position: Cesium.Cartesian3.fromDegrees(120.9677706, 30.7985748, 2.61),
  //     point: {
  //       color: Cesium.Color.RED, //点位颜色
  //       pixelSize: 10, //像素点大小
  //     },
  //     label: {
  //       text: "测试名称",
  //       font: "14pt Source Han Sans CN", //字体样式
  //       fillColor: Cesium.Color.BLACK, //字体颜色
  //       backgroundColor: Cesium.Color.AQUA, //背景颜色
  //       showBackground: true, //是否显示背景颜色
  //       style: Cesium.LabelStyle.FILL, //label样式
  //       outlineWidth: 2,
  //       verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
  //       horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
  //       pixelOffset: new Cesium.Cartesian2(10, 0), //偏移
  //     },
  //   });
  //viewer.zoomTo(entity);    //居中到该点

  const labels = viewer.scene.primitives.add(new Cesium.LabelCollection());
  const l = labels.add({
    position: Cesium.Cartesian3.fromDegrees(
      113.24884033203125,
      36.313655853271484,
      0
    ),
    text: "测试2",
    font: "24px Helvetica",
  });
  const ll = labels.add({
    position: Cesium.Cartesian3.fromDegrees(116.41, 39.87, 0),
    text: "测试1",
    fillColor: Cesium.Color.RED, //字体颜色
    font: "24px Helvetica",
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
