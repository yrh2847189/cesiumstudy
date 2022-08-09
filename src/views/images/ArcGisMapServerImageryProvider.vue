
<template >
  <div id="box">
    <div id="cesiumContainer"></div>
    <div id="toolbar">
   
        <el-row>
          <span class="demonstration">透明度</span>
          <el-slider
            v-model="alpha"
            :min="0"
            :max="1"
            :step="0.01"
            @change="alphaChange"
          ></el-slider>
        </el-row>
        
        <el-row>
          <span class="demonstration">亮度</span>
          <el-slider
            v-model="brightness"
            :min="0"
            :max="5"
            :step="0.01"
            @change="brightnessChange"
          ></el-slider>
        </el-row>
     
        <el-row>
          <span class="demonstration">对比度</span>
          <el-slider
            v-model="contrast"
            :min="0"
            :max="5"
            :step="0.01"
            @change="contrastChange"
          ></el-slider>
        </el-row>
  

      <!-- <div id="Position_06">3</div>
            <div id="Position_07">4</div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";

const alpha = ref(1);
const brightness = ref(1);
const contrast = ref(1);

const alphaChange = (alpha) => {
  viewer.imageryLayers._layers.forEach((layer) => {
    layer.alpha = alpha;
  });
};
const brightnessChange = (brightness) => {
  viewer.imageryLayers._layers.forEach((layer) => {
    layer.brightness = brightness;
  });
};
const contrastChange = (contrast) => {
  viewer.imageryLayers._layers.forEach((layer) => {
    layer.contrast = contrast;
  });
};

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  90,
  -20,
  110,
  90
);
let viewer: Cesium.Viewer | null;
onMounted(() => {
  //return;
  viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
  });
  var arcGisMapServerImageryProvider =
    new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    });

  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(arcGisMapServerImageryProvider);
  viewer.camera.flyHome(2);
});
</script>
<style scoped>
.demo-toolbar {
  position: absolute;
  left: 1%;
  top: 1%;
  min-width: 185px;
  z-index: 100;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
}
#cesiumContainer1 {
  width: 100%;
  height: 800px;
  border: 2px solid #0000ff;
  position: relative;
}
#Position_05 {
  width: 100px;
  height: 100px;
  background-color: #ee1414;
  /* position: absolute; */ /* 脱离⽂档流，下⾯盒⼦上来 */
}

#cesiumContainer12 {
  width: 400px;
  height: 400px;
  background: red;
  position: absolute; /*为祖先元素设为相对定位，不设置top等，位置不发生变化*/
}

#box {
  background: red;
  position: relative;
}
#cesiumContainer {
  width: 100%;
  height: 800px;
  background: yellow;
  position: absolute;
  top: 3px;
  left: 3px;
}
#toolbar {
  padding: 10px;
  width: 200px;
  color: white;
  
  position: absolute;
  top: 10px;
  left: 10px;
}

#cesiumContainer .cesium-viewer-bottom {
  display: none;
}
#controlPanel {
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgba(42, 42, 42, 0.8);
  padding: 5px 8px;
  border-radius: 5px;
}
</style>
