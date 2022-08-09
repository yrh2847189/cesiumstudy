
<template >
  <div id="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import "cesiumvectortile";


Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  90,
  -20,
  110,
  90
);
onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    animation: true, //是否创建动画小器件，左下角仪表
      shouldAnimate:true,// 自动播放
    fullscreenButton: false, //是否显示全屏按钮
    homeButton: false, //是否显示Home按钮
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
  });


      

 var provider=new Cesium.VectorTileImageryProvider({
    source: "http://localhost:3000/static/china/国界线.shp",//or "xxx.shp"
    defaultStyle: {
        outlineColor: "rgb(255,255,255)",
        lineWidth: 2,
        fill: false,
        tileCacheSize: 200
    },
    maximumLevel: 20,
    minimumLevel: 1
});
var layer=viewer.imageryLayers.addImageryProvider(provider);
//  var worldProvider = new VectorTileImageryProvider({
//                 source: 'http://localhost:3000/static/china/国界线.shp',
//                 defaultStyle: {
//                     outlineColor: 'rgb(255,0,0)',
//                     lineWidth: 1,
//                     fill: false,
//                     tileCacheSize: 200,
//                     showMaker: false,
//                     showCenterLabel: true,
//                     fontColor: 'rgba(255,0,0,1)',
//                     labelOffsetX: -10,
//                     labelOffsetY: -5,
//                     fontSize: 13,
//                     fontFamily: '黑体',
//                     centerLabelPropertyName: 'NAME'
//                 },
//                 maximumLevel: 20,
//                 minimumLevel: 1,
//                 simplify: false
//             })
//             worldProvider.readyPromise.then(function () {
//                 worldLayer = viewer.imageryLayers.addImageryProvider(worldProvider)
//             })

  
});
</script>
<style scoped>
#cesiumContainer {
  background: red;
  width: 100%;
  height: 800px;
}
</style>
