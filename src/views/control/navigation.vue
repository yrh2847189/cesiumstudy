
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import {
  Viewer,
  Rectangle,
  ArcGisMapServerImageryProvider,
  Cartesian3,
  Math as CesiumMath,
  Cartographic,
} from "cesium";
import CesiumNavigation from "cesium-navigation-es6";
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
  //  var options = {};
  // options.defaultResetView = Cesium.Rectangle.fromDegrees(71, 3, 90, 14);

  // // extend our view by the cesium navigaton mixin
  // options.enableCompass= true;            //罗盘
  // options.enableZoomControls= false;      //缩放
  // options.enableDistanceLegend= false;    //比例尺
  // options.enableCompassOuterRing= true;   //指南针外环
  // viewer.extend(Cesium.viewerCesiumNavigationMixin, options);
  //当然也可以使用默认的
  // viewer.extend(Cesium.viewerCesiumNavigationMixin, {});

  const options = { duration: 4 };
  // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
  // options.defaultResetView = Rectangle.fromDegrees(80, 22, 130, 50)
  //options.defaultResetView = new Cartographic(CesiumMath.toRadians(111.50623801848565), CesiumMath.toRadians(2.8997206760441205), 8213979.400955964)
  //相机方向
  // const { CesiumMath } =Cesium;
  // options.orientation = {
  //     heading: CesiumMath.toRadians(350.94452087411315),
  //     pitch: CesiumMath.toRadians(-66.6402342251215),
  //     roll: CesiumMath.toRadians(360)
  // }
  //相机延时
  options.duration = 4; //默认为3s

  // // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
   options.enableCompass= true;
  // // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
   options.enableZoomControls= true;

  // // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
  options.enableDistanceLegend = true;
  // // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
   options.enableCompassOuterRing= true;

  // //修改重置视图的tooltip
  // options.resetTooltip = "重置视图";
  // //修改放大按钮的tooltip
  // options.zoomInTooltip = "放大";
  // //修改缩小按钮的tooltip
  // options.zoomOutTooltip = "缩小";

  //如需自定义罗盘控件，请看下面的自定义罗盘控件
  new CesiumNavigation(viewer, options);

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
</style>
