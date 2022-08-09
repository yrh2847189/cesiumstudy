
<template >
  <div id="cesiumContainer">
    <div id="slider"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

import * as Cesium from "cesium";
// import 'dvgis/cesium-widget/dist/cesium.widget.min.css'
//import * as Cesium from 'dvgis/cesium-widget/dist/cesium.widget.min.css'

import cesiumContextMenu from "cesium-context-menu";

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
  new cesiumContextMenu(viewer);
// viewer.extend(Cesium.CesiumWidgetMixin);
// viewer.contextMenu.enabled = true
// // add menu item, params: label, callback, context
// viewer.contextMenu.addMenu('测试',()=> { alert('测试') } ) 
// // setting default menu,if setting the property, the lib default setting will be overwrite
// viewer.contextMenu.DEFAULT_MENU = [{
//    label:'',
//    callback:(e)=>{},
//    context:this
// }] 




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
