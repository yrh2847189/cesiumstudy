
<template >
  <el-row>
    <el-switch
      v-model="animation"
      active-color="#13ce66"
      inactive-text="动画"
      @change="animationChange"
    >
    </el-switch>
    <el-switch
      v-model="timeline"
      active-color="#13ce66"
      inactive-text="时间轴"
      @change="timelineChange"
    >
    </el-switch>
    <el-switch
      v-model="baseLayerPicker"
      active-color="#13ce66"
      inactive-text="基础图层"
      @change="baseLayerPickerChangeChange"
    >
    </el-switch>
   
    <el-switch   v-model="fullscreenButton" active-color="#13ce66" inactive-text="全屏按钮" @change="fullscreenButtonChange"> </el-switch>
    <el-switch
      v-model="infoBox"
      active-color="#13ce66"
      inactive-text="信息提示框"
      @change="infoBoxChange"
    >
    </el-switch>
    <el-switch
      v-model="cesiumInfo"
      active-color="#13ce66"
      inactive-text="版权信息"
      @change="cesiumInfoChange"
    >
    </el-switch>
  </el-row>
  <el-row>
    <div id="cesiumContainer"></div>
  </el-row>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";


const animation = ref(true);
const timeline = ref(true);
const infoBox = ref(true);
const cesiumInfo = ref(true);
const baseLayerPicker = ref(true);
const fullscreenButton =ref(true);
var viewer = null;

const animationChange = (e) => {
  if (e == false) {
    //viewer.infoBox.container.style.visibility = "hidden";
    viewer.animation.container.style.visibility = "hidden";
  } else {
    viewer.animation.container.style.visibility = "visible";
  }
};
const fullscreenButtonChange = (e) => {
  if (e == false) {
    //viewer.infoBox.container.style.visibility = "hidden";
    viewer.fullscreenButton.container.style.visibility = "hidden";
  } else {
    viewer.fullscreenButton.container.style.visibility = "visible";
  }
};

const timelineChange = (e) => {
  if (e == false) {
    viewer.timeline.container.style.visibility = "hidden";
  } else {
    viewer.timeline.container.style.visibility = "visible";
  }
};
const infoBoxChange = (e) => {
  if (e == false) {
    viewer.cesiumWidget.creditContainer.style.visibility = "hidden";
    //viewer.infoBox.container.style.visibility = 'hidden';
  } else {
    viewer.cesiumWidget.creditContainer.style.visibility = "visible";
    //  viewer.infoBox.container.style.visibility = 'visible';
  }
};

const baseLayerPickerChangeChange = (e) => {
  const toolbar = viewer._toolbar;
  const elements = toolbar?.getElementsByClassName(
    "cesium-button cesium-toolbar-button"
  );
  let eIndex = 0;
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    if (element.className == "cesium-button cesium-toolbar-button") {
      eIndex = index;
      console.log(element.className);
    }
  }
  //element.className
  if (e == false) {
    elements[eIndex].style.visibility = "visible";
  } else {
    elements[eIndex].style.visibility = "hidden";
  }
};
const cesiumInfoChange = (e) => {
 
  if (e == false) {
    viewer.cesiumWidget.creditContainer.style.visibility = "hidden";
  } else {
    viewer.cesiumWidget.creditContainer.style.visibility = "visible";
    elements[eIndex].style.visibility = "hidden";
  }
};

onMounted(() => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    // geocoder:false,//位置查找工具
    //     homeButton:false,//复位按钮
    //     sceneModePicker:false,//模式切换
    //     baseLayerPicker:true,//图层选择
  });

var options = {
  style: 'normal', // style: img、vec、normal、dark
  crs: 'WGS84' // 使用84坐标系，默认为：BD09
}



  var token = "7b56038c276128a86a5b946404bf4df4";
  // 服务域名
  // 服务负载子域
  var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
  viewer.imageryLayers.removeAll();

// 添加腾讯在线地图
viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
   // 影像图
   url: "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400",
   customTags: {
       sx: function(imageryProvider, x, y, level) {
           return x >> 4;
       },
       sy: function(imageryProvider, x, y, level) {
           return ((1 << level) - y) >> 4
       }
   }
   
}));
// 添加瓦片坐标信息
viewer.imageryLayers.addImageryProvider(new Cesium.TileCoordinatesImageryProvider());
viewer.scene.debugShowFramesPerSecond = true;

// 添加地形数据
// viewer.terrainProvider = Cesium.createWorldTerrain();



  // viewer.imageryLayers.addImageryProvider(
  //   new Cesium.WebMapTileServiceImageryProvider({
  //     //影像底图
  //     url:
  //       "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
  //       token,
  //     subdomains: subdomains,
  //     layer: "tdtImgLayer",
  //     style: "default",
  //     format: "image/jpeg",
  //     tileMatrixSetID: "GoogleMapsCompatible",
  //   })
  // );

  // viewer.imageryLayers.addImageryProvider(
  //   new Cesium.WebMapTileServiceImageryProvider({
  //     //影像注记
  //     url:
  //       "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
  //       token,
  //     subdomains: subdomains,
  //     layer: "tdtCiaLayer",
  //     style: "default",
  //     format: "image/jpeg",
  //     tileMatrixSetID: "GoogleMapsCompatible",
  //   })
  // );

viewer.scene.skyBox.show = false;
viewer.scene.backgroundColor = Cesium.Color.GREEN;

});
</script>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 700px;
}
#cesiumContainer .cesium-viewer-bottom {
  display: none;
}
</style>
