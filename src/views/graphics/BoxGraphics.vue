
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

  viewer.entities.add({
    name: "box",
    position: Cesium.Cartesian3.fromDegrees(116.543398, 39.881501, 30000),
    box: {
      dimensions: new Cesium.Cartesian3(40000.0, 40000.0, 30000.0),
      material: Cesium.Color.RED,
    },
  });
  viewer.entities.add({
    name: "box",
    position: Cesium.Cartesian3.fromDegrees(115.543398, 38.881501, 30000),
    box: {
      dimensions: new Cesium.Cartesian3(40000.0, 40000.0, 30000.0),
      material: Cesium.Color.BLUE,
    },
  });
  //走廊
  viewer.entities.add({
    name: "corridor",
    corridor: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        115.0, 40.0, 105.0, 40.0, 105.0, 35.0,
      ]),
      width: 200000, //宽度必须设置
      material: Cesium.Color.RED,
    },
  });
  //椎体圆柱体
  viewer.entities.add({
    name: "cylinder",
    position: Cesium.Cartesian3.fromDegrees(116.274913, 38.716066, 0),
    cylinder: {
      length: 50000, // 圆柱体高度
      topRadius: 15000, // 圆柱体顶部半径
      bottomRadius: 30000, // 圆柱体底部半径
      material: Cesium.Color.RED,
    },
  });
  //椭圆
  viewer.entities.add({
    name: "ellipse",
    position: Cesium.Cartesian3.fromDegrees(114.690446, 38.465178, 0),
    ellipse: {
      semiMajorAxis: 40000, // 长轴长度
      semiMinorAxis: 30000, // 短轴长度
      material: Cesium.Color.RED,
    },
  });
  //球体和椭圆体
  viewer.entities.add({
    name: "ellipsoid",
    position: Cesium.Cartesian3.fromDegrees(114.04884, 37.771145, 0),
    ellipsoid: {
      radii: new Cesium.Cartesian3(30000, 30000, 30000), //设置球体的xyz
      material: Cesium.Color.RED,
    },
  });
  //墙
  viewer.entities.add({
    name: "wall",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        -115.0, 50.0, -112.5, 50.0, -110.0, 50.0, -107.5, 50.0, -105.0, 50.0,
        -102.5, 50.0, -100.0, 50.0, -97.5, 50.0, -95.0, 50.0, -92.5, 50.0,
        -90.0, 50.0,
      ]),
      maximumHeights: [
        100000, 200000, 100000, 200000, 100000, 200000, 100000, 200000, 100000,
        200000, 100000,
      ],
      minimumHeights: [
        0, 100000, 0, 100000, 0, 100000, 0, 100000, 0, 100000, 0,
      ],
      material: Cesium.Color.RED,
    },
  });
  //线
  var model = viewer.entities.add({
    name: "polyline",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        115.250413, 35.887456, 117.250413, 35.887456,
      ]),
      width: 10,
      material: Cesium.Color.RED,
    },
  });

  //多边形
  viewer.entities.add({
    name: "polygon",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
        -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
        -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
        -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
      ]),
      height: 0,
      material: Cesium.Color.YELLOW.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.RED,
    },
  });
  //矩形
  viewer.entities.add({
    name: "rectangle",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(-160.0, 0.0, -140.0, 30.0),
      material: Cesium.Color.GREEN.withAlpha(0.5),
      rotation: Cesium.Math.toRadians(45),
      extrudedHeight: 300000.0,
      height: 100000.0,
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  });

  viewer.zoomTo(viewer.entities);
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
